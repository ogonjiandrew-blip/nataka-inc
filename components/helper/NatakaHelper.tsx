"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { PaperPlaneRight, X } from "@phosphor-icons/react";
import HelperGirl, { type Eyes, type Mouth } from "@/components/helper/HelperGirl";
import { onWakeRequest, setHelperMode } from "@/lib/helperStore";
import { waLink } from "@/lib/whatsapp";

const STORAGE = "nataka-helper-v1";
const SCROLL_MS = 15000; // how long someone browses before she says hello
const IDLE_MS = 14000; // no answer for this long and she goes to nap
// Pages with their own call to action or a live experience: no greeting there
const SKIP = ["/live", "/booth-control", "/otamatsuri-experience", "/otamatsuri-2026", "/campaign-brief"];

type Phase = "waiting" | "arriving" | "greeting" | "leaving" | "asleep" | "waking";
type Bubble = "closed" | "typing" | "open" | "bye";
type Spark = { id: number; x: number; y: number; s: number; c: string };

const wait = (ms: number) => new Promise((r) => window.setTimeout(r, ms));
const BOUNCY = { type: "spring" as const, stiffness: 520, damping: 17, mass: 0.8 };

/**
 * Mochi, the site helper. After 15 seconds of browsing she flies in, waves and
 * offers the four things people come here for. If nobody answers, or they say
 * no, she yawns, flies to the WhatsApp button and naps there as a dango. Tapping
 * the dango wakes her up again.
 *
 * Motion is physical rather than keyframed where it can be: she banks and
 * stretches with her real velocity, her hair and the bunny's ears follow through
 * on a spring fed by that velocity (and by how fast the page scrolls), and every
 * hop has anticipation, stretch, squash and settle.
 */
export default function NatakaHelper() {
  const pathname = usePathname();
  const router = useRouter();
  // Andrew's standing call (as with the hero reel and BTS popup): the animation always runs,
  // even when the OS asks for reduced motion.
  const reduce = false;

  const [phase, setPhase] = useState<Phase>("waiting");
  const [bubble, setBubble] = useState<Bubble>("closed");
  const [line, setLine] = useState("");
  const [typed, setTyped] = useState(0);
  const [visible, setVisible] = useState(false);
  const [eyes, setEyes] = useState<Eyes>("open");
  const [mouth, setMouth] = useState<Mouth>("cat");
  const [waving, setWaving] = useState(false);
  const [flying, setFlying] = useState(false);
  const [blink, setBlink] = useState(false);
  const [blush, setBlush] = useState(false);
  const [question, setQuestion] = useState("");
  const [trail, setTrail] = useState<Spark[]>([]);
  const [burst, setBurst] = useState(0);
  const [hearts, setHearts] = useState(0);
  const [poof, setPoof] = useState<{ id: number; x: number; y: number } | null>(null);

  const dockRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<Phase>("waiting");
  const idleRef = useRef<number>();
  const busyRef = useRef(false); // an expression beat is playing; idle fidgets wait

  /* ---------- motion values ---------- */
  const x = useMotionValue(0); // flight offset from the dock
  const y = useMotionValue(0);
  const hopY = useMotionValue(0); // small hops on top of the flight
  const rot = useMotionValue(0); // deliberate tilts
  const size = useMotionValue(1);
  const squashX = useMotionValue(1);
  const squashY = useMotionValue(1);

  const vx = useVelocity(x);
  const vy = useVelocity(y);
  const vHop = useVelocity(hopY);
  const { scrollY } = useScroll();
  const vScroll = useVelocity(scrollY);

  // Bank into turns, from horizontal speed
  const bank = useSpring(useTransform(vx, [-1800, 0, 1800], [20, 0, -20]), { stiffness: 170, damping: 16 });
  const rotate = useTransform([rot, bank], ([a, b]) => (a as number) + (b as number));
  // Stretch along the direction of travel, squash on impacts
  const stretch = useTransform([vx, vy, vHop], ([a, b, c]) => Math.min(0.14, Math.hypot(a as number, (b as number) + (c as number)) / 9000));
  const scaleX = useTransform([size, squashX, stretch], ([s, q, t]) => (s as number) * (q as number) * (1 - (t as number) * 0.6));
  const scaleY = useTransform([size, squashY, stretch], ([s, q, t]) => (s as number) * (q as number) * (1 + (t as number)));
  const yTotal = useTransform([y, hopY], ([a, b]) => (a as number) + (b as number));
  // Follow-through for hair, clips and bunny ears
  const swaySource = useTransform([vx, vy, vHop, vScroll], ([a, b, c, d]) =>
    Math.max(-24, Math.min(24, (a as number) / 110 + ((b as number) + (c as number)) / 80 + (d as number) / 160)),
  );
  const sway = useSpring(swaySource, { stiffness: 150, damping: 6, mass: 0.6 });
  // Where she is looking, -1..1 on each axis, softened by a spring; the head tilts with it
  const lookX = useSpring(0, { stiffness: 120, damping: 14 });
  const lookY = useSpring(0, { stiffness: 120, damping: 14 });
  const tilt = useTransform(lookX, (v) => v * 6);

  const go = useCallback((p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  /* ---------- geometry ---------- */
  const dockBox = () => dockRef.current?.getBoundingClientRect();
  const pillTarget = () => {
    const pill = document.querySelector("[data-wa-pill]")?.getBoundingClientRect();
    if (pill) return { x: pill.right - 16 - 33, y: pill.top - 12 };
    return { x: window.innerWidth - 70, y: window.innerHeight - 96 };
  };
  const toOffset = (pt: { x: number; y: number }) => {
    const r = dockBox();
    if (!r) return { dx: 0, dy: 0 };
    return { dx: pt.x - (r.left + r.width / 2), dy: pt.y - (r.top + r.height / 2) };
  };

  /* ---------- physical beats ---------- */
  const squash = (strength = 1) =>
    Promise.all([
      animate(squashY, [1, 1 - 0.2 * strength, 1 + 0.1 * strength, 1 - 0.04 * strength, 1], { duration: 0.6, ease: "easeOut" }),
      animate(squashX, [1, 1 + 0.18 * strength, 1 - 0.08 * strength, 1 + 0.03 * strength, 1], { duration: 0.6, ease: "easeOut" }),
    ]);
  const hop = async (h = 14) => {
    if (reduce) return;
    // anticipation, launch, fall, land, settle
    await Promise.all([animate(squashY, 0.86, { duration: 0.09 }), animate(squashX, 1.1, { duration: 0.09 })]);
    animate(squashY, 1, { duration: 0.12 });
    animate(squashX, 1, { duration: 0.12 });
    await animate(hopY, [0, -h, 0], { duration: 0.42, ease: [0.33, 0, 0.67, 1], times: [0, 0.45, 1] });
    await squash(0.7);
  };

  /* ---------- sparkle trail while she flies ---------- */
  const trailTimer = useRef<number>();
  const startTrail = () => {
    if (reduce) return;
    let n = 0;
    trailTimer.current = window.setInterval(() => {
      const r = dockBox();
      if (!r) return;
      const id = Date.now() + n++;
      const p = {
        id,
        x: r.left + r.width / 2 + x.get() + (Math.random() - 0.5) * 26,
        y: r.top + r.height * 0.7 + y.get() + (Math.random() - 0.5) * 18,
        s: 0.6 + Math.random() * 0.7,
        c: ["#FFE6A3", "#BFEFF6", "#FFC9D8"][n % 3],
      };
      setTrail((t) => [...t.slice(-22), p]);
      window.setTimeout(() => setTrail((t) => t.filter((q) => q.id !== id)), 800);
    }, 65);
  };
  const stopTrail = () => window.clearInterval(trailTimer.current);

  /* ---------- talking: typewriter text with a moving mouth ---------- */
  const say = async (text: string) => {
    setLine(text);
    if (reduce) {
      setTyped(text.length);
      return;
    }
    setTyped(0);
    for (let i = 1; i <= text.length; i++) {
      setTyped(i);
      await wait(text[i - 1] === " " ? 14 : 24);
    }
  };
  const talking = (bubble === "open" || bubble === "bye") && typed < line.length;

  /* ---------- the beats ---------- */
  const resetIdle = useCallback(() => {
    window.clearTimeout(idleRef.current);
    if (phaseRef.current !== "greeting") return;
    idleRef.current = window.setTimeout(() => sleep("idle"), IDLE_MS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const greet = async (again: boolean) => {
    go("greeting");
    setHelperMode("awake");
    busyRef.current = true;
    setEyes("surprised");
    setMouth("o");
    await hop(10);
    setEyes("happy");
    setMouth("grin");
    setWaving(true);
    setBurst((b) => b + 1);
    await wait(1400);
    setWaving(false);
    setEyes("open");
    setMouth("smile");
    setBubble("typing");
    await wait(reduce ? 0 : 650);
    setBubble("open");
    await say(again ? "I'm awake! What can I help you with?" : "Hi, I'm Mochi! Need a hand finding something?");
    busyRef.current = false;
    resetIdle();
  };

  const arrive = async () => {
    if (phaseRef.current !== "waiting") return;
    go("arriving");
    setVisible(true);
    try {
      window.sessionStorage.setItem(STORAGE, "met");
    } catch {}
    await wait(30);
    const r = dockBox();
    if (!r || reduce) {
      x.set(0);
      y.set(0);
    } else {
      const x0 = window.innerWidth - r.left + 60;
      const y0 = -(r.top + r.height + 60);
      x.set(x0);
      y.set(y0);
      setFlying(true);
      startTrail();
      const opts = { duration: 2.7, ease: "easeInOut" as const, times: [0, 0.24, 0.44, 0.6, 0.82, 1] };
      await Promise.all([
        animate(x, [x0, x0 * 0.62, x0 * 0.42, x0 * 0.3, x0 * 0.1, 0], opts),
        animate(y, [y0, y0 * 0.5, y0 * 0.76, y0 * 0.42, y0 * 0.06, 0], opts),
        animate(rot, [0, -6, 14, -8, 3, 0], opts),
      ]);
      stopTrail();
      setFlying(false);
      await squash(1);
    }
    await greet(false);
  };

  const sleep = async (why: "idle" | "no" | "done") => {
    if (phaseRef.current !== "greeting") return;
    go("leaving");
    window.clearTimeout(idleRef.current);
    busyRef.current = true;
    if (why === "no") {
      setEyes("open");
      setMouth("pout");
      setBubble("bye");
      await say("Okay! I'll nap on the WhatsApp button. Tap me if you need me.");
      setMouth("smile");
      await wait(900);
    } else if (why === "done") {
      setEyes("wink");
      setMouth("grin");
      setBurst((b) => b + 1);
      setBubble("bye");
      await say("Happy to help! I'll be on the WhatsApp button.");
      await wait(900);
    } else {
      setBubble("bye");
      setEyes("sleepy");
      setMouth("yawn");
      await say("I'll be on the WhatsApp button if you need me.");
      await wait(900);
    }
    setBubble("closed");
    setEyes("sleepy");
    setMouth("yawn");
    await wait(reduce ? 0 : 500);

    const target = pillTarget();
    const { dx, dy } = toOffset(target);
    if (!reduce) {
      await hop(8);
      setFlying(true);
      startTrail();
      const opts = { duration: 1.5, ease: "easeInOut" as const };
      await Promise.all([
        animate(x, [x.get(), dx * 0.5, dx], opts),
        animate(y, [y.get(), Math.min(0, dy) - 90, dy], opts),
        animate(size, [1, 1, 0.55], opts),
      ]);
      stopTrail();
      setFlying(false);
    }
    setPoof({ id: Date.now(), x: target.x, y: target.y });
    setVisible(false);
    setHelperMode("asleep");
    try {
      window.sessionStorage.setItem(STORAGE, "asleep");
    } catch {}
    go("asleep");
    busyRef.current = false;
  };

  const wake = async () => {
    if (phaseRef.current !== "asleep") return;
    go("waking");
    const target = pillTarget();
    setPoof({ id: Date.now(), x: target.x, y: target.y });
    setHelperMode("awake");
    setEyes("surprised");
    setMouth("o");
    const { dx, dy } = toOffset(target);
    x.set(reduce ? 0 : dx);
    y.set(reduce ? 0 : dy);
    size.set(reduce ? 1 : 0.55);
    rot.set(0);
    setVisible(true);
    if (!reduce) {
      await wait(200);
      setFlying(true);
      startTrail();
      const opts = { duration: 1.35, ease: "easeInOut" as const };
      await Promise.all([
        animate(x, [dx, dx * 0.5, 0], opts),
        animate(y, [dy, Math.min(0, dy) - 110, 0], opts),
        animate(size, [0.55, 1.06, 1], opts),
      ]);
      stopTrail();
      setFlying(false);
      await squash(0.9);
    }
    await greet(true);
  };

  /* ---------- actions in the bubble ---------- */
  const openWhatsApp = (text: string) => {
    window.open(waLink(`Source: natakainc.com${pathname} (Mochi)\n${text}`), "_blank", "noopener,noreferrer");
  };
  const choose = (what: "quote" | "work" | "ai" | "prices") => {
    if (what === "quote") openWhatsApp("Hi Nataka, I'd like a quote. My company, the goal and our target date: ");
    if (what === "work") {
      if (pathname === "/") document.getElementById("work")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      else router.push("/#work");
    }
    if (what === "ai") router.push("/services/ai-video-production-kenya");
    if (what === "prices") router.push("/work-with-us");
    sleep("done");
  };
  const ask = (e: React.FormEvent) => {
    e.preventDefault();
    const q = question.trim();
    if (!q) return;
    openWhatsApp(`Hi Nataka, a question from your website: ${q}`);
    setQuestion("");
    sleep("done");
  };

  /* ---------- triggers ---------- */
  // Already met this session: she starts asleep on the WhatsApp button
  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(STORAGE)) {
        go("asleep");
        setHelperMode("asleep");
      }
    } catch {}
  }, [go]);

  // 15 seconds of browsing (counted from the first scroll, only while the tab is visible)
  useEffect(() => {
    if (phase !== "waiting" || SKIP.includes(pathname)) return;
    let started = false;
    let elapsed = 0;
    let last = 0;
    const onScroll = () => {
      if (started) return;
      started = true;
      last = performance.now();
    };
    const id = window.setInterval(() => {
      if (!started) return;
      const now = performance.now();
      if (document.visibilityState === "visible") elapsed += now - last;
      last = now;
      if (elapsed >= SCROLL_MS) {
        window.clearInterval(id);
        arrive();
      }
    }, 250);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearInterval(id);
      window.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, pathname]);

  // The dango was tapped
  useEffect(() => onWakeRequest(() => wake()));

  // Eyes follow the pointer
  useEffect(() => {
    if (!visible) return;
    const onMove = (e: PointerEvent) => {
      const r = dockBox();
      if (!r) return;
      const cx = r.left + r.width / 2 + x.get();
      const cy = r.top + r.height * 0.58 + y.get();
      lookX.set(Math.max(-1, Math.min(1, (e.clientX - cx) / 260)));
      lookY.set(Math.max(-1, Math.min(1, (e.clientY - cy) / 260)));
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  // Blinks, sometimes doubled
  useEffect(() => {
    if (!visible || reduce) return;
    let t: number;
    const loop = () => {
      t = window.setTimeout(async () => {
        setBlink(true);
        await wait(110);
        setBlink(false);
        if (Math.random() < 0.28) {
          await wait(130);
          setBlink(true);
          await wait(100);
          setBlink(false);
        }
        loop();
      }, 2000 + Math.random() * 3000);
    };
    loop();
    return () => window.clearTimeout(t);
  }, [visible, reduce]);

  // Fidgets while she waits for an answer: glances, tilts, squints, hops, a little twirl
  useEffect(() => {
    if (phase !== "greeting" || reduce) return;
    let t: number;
    const loop = () => {
      t = window.setTimeout(async () => {
        if (!busyRef.current) {
          const pick = Math.floor(Math.random() * 5);
          if (pick === 0) {
            lookX.set(-0.95);
            lookY.set(-0.3);
            await wait(520);
            lookX.set(0.8);
            await wait(480);
            lookX.set(0);
            lookY.set(0);
          } else if (pick === 1) {
            await animate(rot, [0, -7, 2, 0], { duration: 1, ease: "easeInOut" });
          } else if (pick === 2) {
            setEyes("happy");
            setMouth("grin");
            await wait(700);
            setEyes("open");
            setMouth("smile");
          } else if (pick === 3) {
            await hop(12);
          } else {
            await animate(rot, [0, 360], { duration: 0.75, ease: [0.45, 0, 0.2, 1] });
            rot.set(0);
            await squash(0.6);
          }
        }
        loop();
      }, 2600 + Math.random() * 2600);
    };
    loop();
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, reduce]);

  // Esc sends her off to nap
  useEffect(() => {
    if (phase !== "greeting") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && sleep("no");
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(
    () => () => {
      window.clearTimeout(idleRef.current);
      window.clearInterval(trailTimer.current);
    },
    [],
  );

  /* ---------- micro reactions ---------- */
  const tickle = async () => {
    if (busyRef.current || phaseRef.current !== "greeting") return;
    busyRef.current = true;
    setBlush(true);
    setEyes("happy");
    setMouth("grin");
    setHearts((h) => h + 1);
    await hop(16);
    await wait(350);
    setBlush(false);
    setEyes("open");
    setMouth("smile");
    busyRef.current = false;
    resetIdle();
  };
  const hoverOption = (kind: "quote" | "work" | "ai" | "prices" | "no" | null) => {
    resetIdle();
    if (busyRef.current) return;
    if (kind === null) {
      setEyes("open");
      setMouth("smile");
      lookX.set(0);
      lookY.set(0);
      animate(rot, 0, BOUNCY);
      return;
    }
    // she leans toward the bubble and reacts to the option
    lookX.set(0.5);
    lookY.set(-1);
    animate(rot, 5, BOUNCY);
    if (kind === "quote" || kind === "ai") {
      setEyes("sparkle");
      setMouth("grin");
    } else if (kind === "no") {
      setEyes("open");
      setMouth("pout");
    } else {
      setEyes("open");
      setMouth("smile");
    }
  };

  const showGirl = visible && (phase === "arriving" || phase === "greeting" || phase === "leaving" || phase === "waking");
  const chipVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.8 },
    show: { opacity: 1, y: 0, scale: 1, transition: BOUNCY },
  };

  return (
    <>
      {/* Sparkle trail and poof, in screen space */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9978]">
        <AnimatePresence>
          {trail.map((p) => (
            <motion.span
              key={p.id}
              className="absolute block"
              style={{ left: p.x, top: p.y }}
              initial={{ opacity: 0.95, scale: p.s, rotate: 0 }}
              animate={{ opacity: 0, scale: 0.15, rotate: 120, y: 14 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Star className="h-3 w-3 -translate-x-1/2 -translate-y-1/2" color={p.c} />
            </motion.span>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {poof && (
            <motion.span
              key={poof.id}
              className="absolute block"
              style={{ left: poof.x, top: poof.y }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.85, ease: "easeOut" }}
              onAnimationComplete={() => setPoof(null)}
            >
              {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                const a = (i / 7) * Math.PI * 2;
                return (
                  <motion.span
                    key={i}
                    className="absolute block -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 blur-[1px]"
                    style={{ width: 16 + (i % 3) * 5, height: 16 + (i % 3) * 5 }}
                    initial={{ x: 0, y: 0, scale: 0.3 }}
                    animate={{ x: Math.cos(a) * 30, y: Math.sin(a) * 22 - 6, scale: 1.25 }}
                    transition={{ type: "spring", stiffness: 220, damping: 14 }}
                  />
                );
              })}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Her dock, bottom left; the girl flies relative to it */}
      <div ref={dockRef} className="pointer-events-none fixed bottom-5 left-3 z-[9979] w-[86px] md:bottom-7 md:left-7 md:w-[106px]">
        <AnimatePresence>
          {showGirl && (
            <motion.div
              key="girl"
              className="pointer-events-auto relative cursor-pointer"
              style={{ x, y: yTotal, rotate, scaleX, scaleY, originY: 1 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              onMouseEnter={tickle}
              onClick={tickle}
            >
              {/* floor shadow that breathes with the float */}
              {!flying && (
                <motion.span
                  aria-hidden="true"
                  className="absolute -bottom-2 left-1/2 block h-2.5 w-[60%] -translate-x-1/2 rounded-[50%] bg-black/35 blur-[3px]"
                  animate={reduce ? undefined : { scaleX: [1, 0.8, 1], opacity: [0.55, 0.3, 0.55] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              {/* layered idle float: three loops on different rhythms */}
              <motion.div animate={reduce || flying ? undefined : { y: [0, -6, 0] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}>
                <motion.div animate={reduce || flying ? undefined : { x: [0, 2.5, 0, -2.5, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}>
                  <motion.div animate={reduce || flying ? undefined : { rotate: [-1.6, 1.6, -1.6] }} transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }} style={{ originY: 1 }}>
                    <HelperGirl
                      eyes={eyes}
                      mouth={mouth}
                      waving={waving}
                      flying={flying}
                      blink={blink}
                      blush={blush}
                      talking={talking}
                      lookX={lookX}
                      lookY={lookY}
                      tilt={tilt}
                      sway={sway}
                      className="h-auto w-full"
                    />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* two tiny sparkles orbiting her while she waits */}
              {phase === "greeting" && !reduce && (
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-[42%] block h-0 w-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                >
                  {[0, 180].map((deg) => (
                    <motion.span
                      key={deg}
                      className="absolute block"
                      style={{ rotate: deg, x: 0, y: 0 }}
                    >
                      <motion.span
                        className="absolute block"
                        style={{ left: 58, top: -6 }}
                        animate={{ opacity: [0.2, 1, 0.2], scale: [0.6, 1, 0.6] }}
                        transition={{ duration: 1.8, repeat: Infinity, delay: deg / 360 }}
                      >
                        <Star className="h-2.5 w-2.5" color={deg ? "#BFEFF6" : "#FFE08A"} />
                      </motion.span>
                    </motion.span>
                  ))}
                </motion.span>
              )}

              {/* sparkle burst on happy beats */}
              {burst > 0 && !reduce && (
                <span key={burst} aria-hidden="true" className="pointer-events-none absolute inset-0">
                  {[[-16, 8], [98, 4], [-8, 58], [102, 50], [44, -16], [70, -10]].map(([sx, sy], i) => (
                    <motion.span
                      key={i}
                      className="absolute block"
                      style={{ left: `${sx}%`, top: `${sy}%` }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0.5], rotate: [0, 60], y: [0, -6] }}
                      transition={{ duration: 0.85, delay: i * 0.05, ease: "easeOut" }}
                    >
                      <Star className="h-3.5 w-3.5" color={i % 2 ? "#BFEFF6" : "#FFE08A"} />
                    </motion.span>
                  ))}
                </span>
              )}

              {/* hearts when she is tickled */}
              {hearts > 0 && !reduce && (
                <span key={`h${hearts}`} aria-hidden="true" className="pointer-events-none absolute inset-0">
                  {[30, 62].map((hx, i) => (
                    <motion.svg
                      key={i}
                      viewBox="0 0 20 18"
                      className="absolute h-3.5 w-4"
                      style={{ left: `${hx}%`, top: "4%" }}
                      initial={{ opacity: 0, y: 0, scale: 0.3 }}
                      animate={{ opacity: [0, 1, 0], y: -30, x: i ? 8 : -8, scale: 1.1 }}
                      transition={{ duration: 1.1, delay: i * 0.12, ease: "easeOut" }}
                    >
                      <path d="M10 17 C 3 12, 0 8, 2 4 C 4 0, 9 1, 10 5 C 11 1, 16 0, 18 4 C 20 8, 17 12, 10 17 Z" fill="#FFB3C7" stroke="#E6A1B6" strokeWidth="1.4" />
                    </motion.svg>
                  ))}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Speech bubble, above her */}
      <AnimatePresence>
        {showGirl && bubble !== "closed" && (
          <motion.div
            key="bubble"
            role="dialog"
            aria-modal="false"
            aria-label="Mochi, the Nataka helper"
            className="fixed bottom-[124px] left-3 z-[9979] w-[min(300px,calc(100vw-24px))] md:bottom-[154px] md:left-7"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.5, y: 24, rotate: -4 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: 14, transition: { duration: 0.18 } }}
            transition={{ type: "spring", stiffness: 420, damping: 15, mass: 0.8 }}
            style={{ originX: 0.12, originY: 1 }}
            onPointerMove={resetIdle}
          >
            <div className="relative rounded-[22px] border border-[#F3C6D4] bg-[#FFF7FA] p-4 text-[#4A2E3D] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.75)]">
              {/* tail pointing at Mochi */}
              <span aria-hidden="true" className="absolute -bottom-[7px] left-9 h-3.5 w-3.5 rotate-45 border-b border-r border-[#F3C6D4] bg-[#FFF7FA]" />

              {bubble === "typing" ? (
                <div className="flex h-6 items-center gap-1.5 pl-1" aria-label="Mochi is typing">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="block h-2 w-2 rounded-full bg-[#E6A1B6]"
                      animate={{ y: [0, -6, 0], scale: [1, 1.15, 1] }}
                      transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.1, ease: "easeOut" }}
                    />
                  ))}
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-sans text-[14px] font-semibold leading-snug" aria-live="polite">
                      {line.slice(0, typed)}
                      <span className="sr-only">{line.slice(typed)}</span>
                    </p>
                    {bubble === "open" && (
                      <motion.button
                        type="button"
                        onClick={() => sleep("no")}
                        aria-label="Close the helper"
                        whileHover={{ rotate: 90, scale: 1.1 }}
                        whileTap={{ scale: 0.85 }}
                        transition={BOUNCY}
                        className="-mr-1 -mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#B98AA0] hover:bg-[#FBE3EB] hover:text-[#4A2E3D]"
                      >
                        <X size={14} weight="bold" />
                      </motion.button>
                    )}
                  </div>

                  {bubble === "open" && (
                    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06, delayChildren: 0.15 }}>
                      <div className="mt-3 flex flex-wrap gap-2" onMouseLeave={() => hoverOption(null)}>
                        <motion.button
                          variants={chipVariants}
                          whileHover={{ y: -3, scale: 1.05, rotate: -2 }}
                          whileTap={{ scale: 0.92 }}
                          type="button"
                          onClick={() => choose("quote")}
                          onMouseEnter={() => hoverOption("quote")}
                          onFocus={() => hoverOption("quote")}
                          className="rounded-full bg-signal px-3.5 py-2 font-heading text-[11px] font-bold uppercase tracking-[0.12em] text-on-signal"
                        >
                          Get a quote
                        </motion.button>
                        {(
                          [
                            ["work", "See our work"],
                            ["ai", "AI video"],
                            ["prices", "Prices"],
                          ] as const
                        ).map(([k, label], i) => (
                          <motion.button
                            key={k}
                            variants={chipVariants}
                            whileHover={{ y: -3, scale: 1.05, rotate: i % 2 ? 2 : -2 }}
                            whileTap={{ scale: 0.92 }}
                            type="button"
                            onClick={() => choose(k)}
                            onMouseEnter={() => hoverOption(k)}
                            onFocus={() => hoverOption(k)}
                            className="rounded-full border border-[#F3C6D4] bg-white px-3.5 py-2 font-heading text-[11px] font-bold uppercase tracking-[0.12em] text-[#4A2E3D] hover:bg-[#FBE3EB]"
                          >
                            {label}
                          </motion.button>
                        ))}
                      </div>

                      <motion.form
                        variants={chipVariants}
                        onSubmit={ask}
                        className="mt-3 flex items-center gap-2 rounded-full border border-[#F3C6D4] bg-white py-1 pl-4 pr-1 focus-within:border-[#E6A1B6]"
                      >
                        <label htmlFor="mochi-q" className="sr-only">
                          Ask us a question
                        </label>
                        <input
                          id="mochi-q"
                          value={question}
                          onFocus={() => {
                            resetIdle();
                            setEyes("open");
                            setMouth("o");
                            lookX.set(-0.3);
                            lookY.set(-1);
                          }}
                          onBlur={() => setMouth("smile")}
                          onChange={(e) => {
                            setQuestion(e.target.value);
                            resetIdle();
                            // a little nod with every keystroke
                            if (!reduce) animate(rot, [0, -3, 0], { duration: 0.22 });
                          }}
                          maxLength={240}
                          placeholder="Ask anything, we reply on WhatsApp"
                          className="min-w-0 flex-1 bg-transparent font-sans text-[13px] text-[#4A2E3D] placeholder:text-[#B98AA0] focus:outline-none"
                        />
                        <motion.button
                          whileHover={{ scale: 1.12, rotate: -12 }}
                          whileTap={{ scale: 0.88 }}
                          transition={BOUNCY}
                          type="submit"
                          aria-label="Send on WhatsApp"
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F7C7D6] text-[#4A2E3D] hover:bg-[#F3B3C7]"
                        >
                          <PaperPlaneRight size={14} weight="fill" />
                        </motion.button>
                      </motion.form>

                      <motion.button
                        variants={chipVariants}
                        type="button"
                        onClick={() => sleep("no")}
                        onMouseEnter={() => hoverOption("no")}
                        onFocus={() => hoverOption("no")}
                        className="mt-2.5 font-sans text-[12px] font-medium text-[#B98AA0] underline-offset-4 hover:text-[#4A2E3D] hover:underline"
                      >
                        No thanks
                      </motion.button>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Star({ className, color }: { className?: string; color: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <path d="M10 0 L 12.4 7.6 L 20 10 L 12.4 12.4 L 10 20 L 7.6 12.4 L 0 10 L 7.6 7.6 Z" fill={color} />
    </svg>
  );
}
