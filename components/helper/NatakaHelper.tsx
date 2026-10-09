"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  AnimatePresence,
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import { PaperPlaneRight, X } from "@phosphor-icons/react";
import HelperGirl, { type Eyes, type Mouth } from "@/components/helper/HelperGirl";
import { DangoWarmup } from "@/components/helper/HelperDango";
import { bumpPill, markMorph, onWakeRequest, setHelperMode } from "@/lib/helperStore";
import {
  CRUISE,
  FALL,
  RISE,
  clamp,
  jellyX,
  jellyY,
  kick,
  slowOver,
  smooth,
  smoothPath,
  stretchAlong,
  type Bezier,
  type Pt,
} from "@/components/helper/softBody";
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
// Mochi's jelly: a firm squash and two small wobbles (the dango is softer)
const JELLY = { stiffness: 420, damping: 13 };
const CROUCH: Bezier = [0.3, 0, 0.6, 1];

/**
 * Mochi, the site helper. After 15 seconds of browsing she flies in (with a
 * loop), waves and offers the four things people come here for. If nobody
 * answers, or they say no, she yawns, flies to the WhatsApp button, lands on it
 * and squashes down into a sleeping dango. Tapping the dango wakes her up again.
 *
 * Motion follows the dango in the Clannad ending: she keeps her volume, stretches
 * along the way she is travelling, crouches before a hop, hangs at the top, lands
 * with a squash and wobbles back like jelly. Flights are one smooth path, never a
 * string of stops. Hair, clips, ears and her head follow through on springs fed
 * by her real speed and acceleration.
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
  const [burst, setBurst] = useState(0);
  const [hearts, setHearts] = useState(0);
  const [poof, setPoof] = useState<{ id: number; x: number; y: number; small?: boolean } | null>(null);
  const [warm, setWarm] = useState(false);

  const dockRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<Phase>("waiting");
  const idleRef = useRef<number>();
  const busyRef = useRef(false); // an expression beat is playing; idle fidgets wait
  const fidgetRef = useRef(false); // a fidget is playing; tickles wait, hover reactions do not

  /* ---------- motion values ---------- */
  const x = useMotionValue(0); // where her feet are, from the dock's centre and bottom
  const y = useMotionValue(0);
  const hopY = useMotionValue(0); // hops on top of the flight
  const floatY = useMotionValue(0); // the idle hover, part of her motion so her hair follows it
  const rot = useMotionValue(0); // deliberate tilts, twirls, the loop
  const size = useMotionValue(1);
  const jelly = useMotionValue(0); // + squash, - stretch, from her feet

  // written every frame by the rig while she is on screen
  const velX = useMotionValue(0);
  const velY = useMotionValue(0);
  const stretch = useMotionValue("none");
  const headX = useMotionValue(0);
  const headY = useMotionValue(0);
  const bankTarget = useMotionValue(0);

  const { scrollY } = useScroll();
  const vScroll = useVelocity(scrollY);

  // she leans into the direction she is flying
  const bank = useSpring(bankTarget, { stiffness: 170, damping: 18 });
  const rotate = useTransform([rot, bank], ([a, b]) => (a as number) + (b as number));
  const sx = useTransform([size, jelly], ([s, j]) => (s as number) * jellyX(clamp(j as number, -0.4, 0.45)));
  const sy = useTransform([size, jelly], ([s, j]) => (s as number) * jellyY(clamp(j as number, -0.4, 0.45)));
  const yTotal = useTransform([y, hopY, floatY], ([a, b, c]) => (a as number) + (b as number) + (c as number));
  // follow-through for hair, clips and bunny ears
  const swaySource = useTransform([velX, velY, vScroll], ([a, b, d]) =>
    clamp((a as number) / 110 + (b as number) / 80 + (d as number) / 160, -24, 24),
  );
  const sway = useSpring(swaySource, { stiffness: 150, damping: 6, mass: 0.6 });
  // where she is looking, -1..1 on each axis, softened by a spring; the head tilts with it
  const lookX = useSpring(0, { stiffness: 120, damping: 14 });
  const lookY = useSpring(0, { stiffness: 120, damping: 14 });
  const tilt = useTransform(lookX, (v) => v * 6);
  // her shadow stays on the floor: smaller as she rises, wider when she squashes, gone when she flies off
  const shadowScale = useTransform([hopY, floatY, jelly], ([h, f, j]) =>
    (1 - clamp(-((h as number) + (f as number)) / 70, 0, 0.5)) * jellyX(clamp(j as number, -0.4, 0.45)),
  );
  const shadowOpacity = useTransform([y, hopY, floatY], ([a, h, f]) =>
    0.5 * (1 - clamp(Math.abs(a as number) / 40, 0, 1)) * (1 - clamp(-((h as number) + (f as number)) / 90, 0, 0.6)),
  );

  const go = useCallback((p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  /* ---------- geometry ---------- */
  const dockBox = () => dockRef.current?.getBoundingClientRect();
  // where her feet go on the WhatsApp button, in screen space
  const pillFeet = (): Pt => {
    const pill = document.querySelector("[data-wa-pill]")?.getBoundingClientRect();
    if (pill && pill.width > 0) return { x: pill.right - 52, y: pill.top + 8 };
    return { x: window.innerWidth - 76, y: window.innerHeight - 64 };
  };
  // a screen point as an offset of her feet from the dock
  const toOff = (p: Pt): Pt => {
    const r = dockBox();
    return r ? { x: p.x - (r.left + r.width / 2), y: p.y - r.bottom } : { x: 0, y: 0 };
  };

  /* ---------- physical beats ---------- */
  // hit her jelly: positive squashes, negative stretches; it springs back with a wobble
  const squish = (v: number) => kick(jelly, v, JELLY);
  const hop = async (h = 14) => {
    if (reduce) return;
    await animate(jelly, 0.14, { duration: 0.1, ease: CROUCH }); // crouch
    squish(-4.5); // the crouch springs into a stretch as she leaves the ground
    const up = 0.17 + h / 160;
    await animate(hopY, -h, { duration: up, ease: RISE }); // fast launch, hang at the top
    await animate(hopY, 0, { duration: up * 0.8, ease: FALL }); // fast fall
    squish(3 + h / 5); // squash, wobble, settle
  };
  // walk a smooth path at an even pace (or slower over a stretch of it); `onStep` gets the distance 0..1
  const fly = (
    path: ReturnType<typeof smoothPath>,
    o: { speed: number; min: number; max: number; ease?: Bezier; slow?: ReturnType<typeof slowOver>; onStep?: (s: number) => void },
  ) =>
    animate(0, 1, {
      duration: clamp((path.total * (o.slow?.stretchTime ?? 1)) / o.speed, o.min, o.max),
      ease: o.ease ?? CRUISE,
      onUpdate: (u) => {
        const s = o.slow ? o.slow.warp(u) : u;
        const q = path.at(s);
        x.set(q.x);
        y.set(q.y);
        o.onStep?.(s);
      },
    });

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
    try {
      window.sessionStorage.setItem(STORAGE, "met");
    } catch {}
    const r = dockBox();
    if (!r || reduce) {
      x.set(0);
      y.set(0);
      setVisible(true);
      await greet(false);
      return;
    }
    // She swoops in from the top right, loops once, and comes down onto her spot
    const W = window.innerWidth;
    const H = window.innerHeight;
    const cx = r.left + r.width / 2;
    const by = r.bottom;
    const R = clamp(Math.min(W, H) * 0.085, 44, 86);
    const lc = { x: Math.max(cx + 150, W * 0.42), y: clamp(H * 0.45, R + 90, by - 260) };
    const path = smoothPath(
      [
        { x: W + 90, y: -70 },
        { x: W * 0.76, y: H * 0.2 },
        { x: lc.x + R * 1.7, y: lc.y + R * 0.75 },
        { x: lc.x, y: lc.y + R },
        { x: lc.x - R, y: lc.y },
        { x: lc.x, y: lc.y - R },
        { x: lc.x + R, y: lc.y },
        { x: lc.x - R * 0.2, y: lc.y + R * 1.15 },
        { x: cx + 46, y: by - 150 },
        { x: cx, y: by },
      ].map((p) => ({ x: p.x - cx, y: p.y - by })),
    );
    const loopIn = path.knot(3);
    const loopOut = path.knot(7);
    const start = path.at(0);
    x.set(start.x);
    y.set(start.y);
    rot.set(0);
    setVisible(true);
    setFlying(true);
    // the loop is a real loop-de-loop: she eases over it and her body turns all the way round with the path
    await fly(path, {
      speed: 950,
      min: 2.3,
      max: 3.4,
      slow: slowOver(loopIn, loopOut, 1.7),
      onStep: (s) => rot.set(360 * smooth((s - loopIn) / (loopOut - loopIn))),
    });
    rot.set(0);
    setFlying(false);
    squish(6.5); // touch down: squash and wobble
    await wait(380);
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
    // the dango mounts on the button unseen while she yawns, so turning into it never stalls
    setHelperMode("landing");
    await wait(reduce ? 0 : 500);

    const feet = pillFeet();
    if (!reduce) {
      const t = toOff(feet);
      const s0 = { x: x.get(), y: y.get() };
      const H = window.innerHeight;
      const path = smoothPath([
        s0,
        { x: s0.x + 24, y: s0.y - 90 },
        { x: (s0.x + t.x) / 2, y: Math.min(s0.y, t.y) - clamp(H * 0.32, 160, 300) },
        { x: t.x - 36, y: t.y - 110 },
        t,
      ]);
      // crouch, spring into the air, arc over the page, shrinking as she goes
      await animate(jelly, 0.16, { duration: 0.14, ease: CROUCH });
      squish(-5);
      setFlying(true);
      await fly(path, { speed: 900, min: 1.25, max: 2.1, ease: [0.42, 0, 0.6, 0.86], onStep: (s) => size.set(1 - 0.34 * smooth(s)) });
      setFlying(false);
      // she lands on the button and squashes down into the dango
      squish(8);
      await wait(70);
    }
    markMorph();
    bumpPill(1);
    setPoof({ id: Date.now(), x: feet.x, y: feet.y - 16, small: true });
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
    const feet = pillFeet();
    const t = toOff(feet);
    // she comes out of the dango's stretch, already rising
    setEyes("surprised");
    setMouth("o");
    x.set(reduce ? 0 : t.x);
    y.set(reduce ? 0 : t.y);
    size.set(reduce ? 1 : 0.66);
    rot.set(0);
    hopY.set(0);
    jelly.set(reduce ? 0 : -0.3);
    setPoof({ id: Date.now(), x: feet.x, y: feet.y - 16, small: true });
    setHelperMode("awake");
    setVisible(true);
    if (!reduce) {
      const H = window.innerHeight;
      const path = smoothPath([
        t,
        { x: t.x - 14, y: t.y - 170 },
        { x: t.x * 0.45, y: Math.min(t.y, 0) - clamp(H * 0.3, 150, 280) },
        { x: 44, y: -130 },
        { x: 0, y: 0 },
      ]);
      // a beat at the button so you see her spring out of the dango, then off at cruising speed
      squish(-2);
      await wait(110);
      setFlying(true);
      await fly(path, { speed: 950, min: 1.3, max: 2.1, onStep: (s) => size.set(0.66 + 0.34 * smooth(s)) });
      setFlying(false);
      squish(6);
      await wait(360);
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

  // Once, soon after the page loads and while nothing else is busy, draw her and the dango
  // unseen for a moment: the browser compiles their painted look then, instead of stalling
  // for a fraction of a second on the frame she first appears.
  useEffect(() => {
    if (SKIP.includes(pathname)) return;
    type Idle = (cb: () => void, o?: { timeout: number }) => number;
    const idle: Idle = (window as unknown as { requestIdleCallback?: Idle }).requestIdleCallback ?? ((cb) => window.setTimeout(cb, 600));
    let off: number;
    const t = window.setTimeout(
      () =>
        idle(
          () => {
            setWarm(true);
            off = window.setTimeout(() => setWarm(false), 700);
          },
          { timeout: 4000 },
        ),
      1500,
    );
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(off);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showGirl = visible && (phase === "arriving" || phase === "greeting" || phase === "leaving" || phase === "waking");

  // The idle hover: a slow bob while she waits at her spot, still while she flies
  useEffect(() => {
    if (!showGirl || flying || reduce) {
      const c = animate(floatY, 0, { duration: 0.25 });
      return () => c.stop();
    }
    const c = animate(floatY, -6, { duration: 1.3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" });
    return () => c.stop();
  }, [showGirl, flying, reduce, floatY]);

  // Eyes follow the pointer
  useEffect(() => {
    if (!visible) return;
    const onMove = (e: PointerEvent) => {
      if (flying) return;
      const r = dockBox();
      if (!r) return;
      const cx = r.left + r.width / 2 + x.get();
      const cy = r.bottom - r.width * 0.5 + y.get();
      lookX.set(clamp((e.clientX - cx) / 260, -1, 1));
      lookY.set(clamp((e.clientY - cy) / 260, -1, 1));
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, flying]);

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

  // Fidgets while she waits for an answer: glances, tilts, smiles, hops, a little twirl
  useEffect(() => {
    if (phase !== "greeting" || reduce) return;
    let t: number;
    const loop = () => {
      t = window.setTimeout(async () => {
        if (!busyRef.current && !fidgetRef.current) {
          fidgetRef.current = true;
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
            animate(rot, -7, { type: "spring", stiffness: 120, damping: 10 });
            await wait(520);
            await animate(rot, 0, { type: "spring", stiffness: 200, damping: 9 });
          } else if (pick === 2) {
            setEyes("happy");
            setMouth("grin");
            await wait(700);
            setEyes("open");
            setMouth("smile");
          } else if (pick === 3) {
            await hop(12);
          } else {
            // wind up, spin past a full turn and spring back to it, with a hop under it
            await animate(rot, -14, { duration: 0.16, ease: "easeOut" });
            await Promise.all([animate(rot, 360, { type: "spring", stiffness: 140, damping: 13 }), hop(8)]);
            rot.set(0);
          }
          fidgetRef.current = false;
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

  useEffect(() => () => window.clearTimeout(idleRef.current), []);

  /* ---------- micro reactions ---------- */
  const tickle = async () => {
    if (busyRef.current || fidgetRef.current || phaseRef.current !== "greeting") return;
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

  const chipVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.8 },
    show: { opacity: 1, y: 0, scale: 1, transition: BOUNCY },
  };

  return (
    <>
      {/* Sparkle trail, in screen space behind her */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9978]">
        <Trail active={flying && showGirl && !reduce} x={x} y={y} dockRef={dockRef} />
      </div>

      {/* The puff when she turns into the dango or back: a ring around the change, in front of the button */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9981]">
        <AnimatePresence>
          {poof && (
            <motion.span
              key={poof.id}
              className="absolute block"
              style={{ left: poof.x, top: poof.y }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: poof.small ? 0.6 : 0.85, ease: "easeOut" }}
              onAnimationComplete={() => setPoof(null)}
            >
              {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                const a = (i / 7) * Math.PI * 2 - Math.PI / 2;
                const d = poof.small ? 10 : 14; // puff size
                const r0 = poof.small ? 22 : 12; // starts around the change, not over it
                const r1 = poof.small ? 42 : 34;
                return (
                  <motion.span
                    key={i}
                    className="absolute block rounded-full bg-white/90 blur-[1px]"
                    style={{ width: d + (i % 3) * 4, height: d + (i % 3) * 4, left: -(d + (i % 3) * 4) / 2, top: -(d + (i % 3) * 4) / 2 }}
                    initial={{ x: Math.cos(a) * r0, y: Math.sin(a) * r0 * 0.75, scale: 0.4 }}
                    animate={{ x: Math.cos(a) * r1, y: Math.sin(a) * r1 * 0.75 - 6, scale: [0.4, 1.15, 0.6] }}
                    transition={{ default: { type: "spring", stiffness: 200, damping: 16 }, scale: { duration: 0.55, ease: "easeOut" } }}
                  />
                );
              })}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* The one-off warm-up drawing (see above): 1% opacity so it is really painted, never seen */}
      {warm && !showGirl && (
        <div aria-hidden="true" className="pointer-events-none fixed bottom-5 left-3 z-[1] flex w-[86px] items-end opacity-[0.01] md:bottom-7 md:left-7 md:w-[106px]">
          <HelperGirl lookX={lookX} lookY={lookY} tilt={tilt} sway={sway} className="h-auto w-full" />
          <div className="absolute bottom-0 left-0">
            <DangoWarmup />
          </div>
        </div>
      )}

      {/* Her dock, bottom left; she flies relative to it */}
      <div ref={dockRef} className="pointer-events-none fixed bottom-5 left-3 z-[9979] w-[86px] md:bottom-7 md:left-7 md:w-[106px]">
        <AnimatePresence>
          {showGirl && (
            <motion.span
              key="shadow"
              aria-hidden="true"
              className="absolute -bottom-1.5 left-[22%] block h-2.5 w-[56%] rounded-[50%] bg-black/60 blur-[3px]"
              style={{ x, scaleX: shadowScale, opacity: shadowOpacity }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showGirl && (
            <motion.div
              key="girl"
              className="pointer-events-auto relative cursor-pointer"
              style={{ x, y: yTotal }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              transition={{ duration: 0.15 }}
              onMouseEnter={tickle}
              onClick={tickle}
            >
              <Rig
                x={x}
                y={y}
                hopY={hopY}
                floatY={floatY}
                velX={velX}
                velY={velY}
                stretch={stretch}
                headX={headX}
                headY={headY}
                bankTarget={bankTarget}
                lookX={lookX}
                lookY={lookY}
                flying={flying}
              />
              {/* stretch along her path, lean, then squash from her feet */}
              <motion.div style={{ transform: stretch, originX: 0.5, originY: 0.55 }}>
                <motion.div style={{ rotate, originX: 0.5, originY: 0.6 }}>
                  <motion.div style={{ scaleX: sx, scaleY: sy, originX: 0.5, originY: 1 }}>
                    {/* idle sway, on the compositor (globals.css) */}
                    <div className={reduce ? undefined : "mochi-sway"}>
                      <div className={reduce ? undefined : "mochi-rock"}>
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
                          headX={headX}
                          headY={headY}
                          className="h-auto w-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* two tiny sparkles orbiting her while she waits */}
              {phase === "greeting" && !reduce && (
                <span aria-hidden="true" className="mochi-orbit pointer-events-none absolute left-1/2 top-[42%] block h-0 w-0">
                  {[0, 180].map((deg) => (
                    <span key={deg} className="absolute block" style={{ transform: `rotate(${deg}deg)` }}>
                      <span className="absolute block" style={{ left: 58, top: -6 }}>
                        <span className="mochi-twinkle block" style={{ animationDelay: deg ? "-0.45s" : "0s" }}>
                          <Star className="h-2.5 w-2.5" color={deg ? "#BFEFF6" : "#FFE08A"} />
                        </span>
                      </span>
                    </span>
                  ))}
                </span>
              )}

              {/* sparkle burst on happy beats */}
              {burst > 0 && !reduce && (
                <span key={burst} aria-hidden="true" className="pointer-events-none absolute inset-0">
                  {[[-16, 8], [98, 4], [-8, 58], [102, 50], [44, -16], [70, -10]].map(([bx, by], i) => (
                    <motion.span
                      key={i}
                      className="absolute block"
                      style={{ left: `${bx}%`, top: `${by}%` }}
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
                            if (!reduce) animate(rot, 0, { type: "spring", stiffness: 500, damping: 12, velocity: -60 });
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

/**
 * Runs every frame while Mochi is on screen: measures her real velocity, then
 * stretches her along it, banks her into turns, lets her eyes lead while she
 * flies, and moves her head on its own damped spring so it lags when she
 * speeds up and carries on for a moment when she stops.
 */
function Rig({
  x,
  y,
  hopY,
  floatY,
  velX,
  velY,
  stretch,
  headX,
  headY,
  bankTarget,
  lookX,
  lookY,
  flying,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  hopY: MotionValue<number>;
  floatY: MotionValue<number>;
  velX: MotionValue<number>;
  velY: MotionValue<number>;
  stretch: MotionValue<string>;
  headX: MotionValue<number>;
  headY: MotionValue<number>;
  bankTarget: MotionValue<number>;
  lookX: MotionValue<number>;
  lookY: MotionValue<number>;
  flying: boolean;
}) {
  const st = useRef({ init: false, px: 0, py: 0, vx: 0, vy: 0, hx: 0, hy: 0, hvx: 0, hvy: 0 });
  const flyingRef = useRef(flying);
  flyingRef.current = flying;

  const step = useCallback(
    (_t: number, delta: number) => {
      const s = st.current;
      const dt = clamp(delta / 1000, 1 / 240, 1 / 20);
      const X = x.get();
      const Y = y.get() + hopY.get() + floatY.get();
      // first frame, or a jump (she reappears somewhere else): no fake speed
      if (!s.init || Math.hypot(X - s.px, Y - s.py) > 260) {
        Object.assign(s, { init: true, px: X, py: Y, vx: 0, vy: 0 });
      }
      const rvx = (X - s.px) / dt;
      const rvy = (Y - s.py) / dt;
      s.px = X;
      s.py = Y;
      // velocity smoothed over ~45 ms so the stretch never flickers
      const k = 1 - Math.exp(-dt / 0.045);
      const dvx = (rvx - s.vx) * k;
      const dvy = (rvy - s.vy) * k;
      s.vx += dvx;
      s.vy += dvy;
      velX.set(s.vx);
      velY.set(s.vy);
      stretch.set(Math.hypot(s.vx, s.vy) < 25 ? "none" : stretchAlong(s.vx, s.vy, 5500, 0.18));
      bankTarget.set(clamp(s.vx / 1500, -1, 1) * 12);
      if (flyingRef.current) {
        lookX.set(clamp(s.vx / 700, -1, 1));
        lookY.set(clamp(s.vy / 700, -1, 1));
      }
      // head inertia: a damped spring pushed the opposite way to every change of speed
      s.hvx += (-300 * s.hx - 18 * s.hvx) * dt - 0.2 * dvx;
      s.hvy += (-300 * s.hy - 18 * s.hvy) * dt - 0.3 * dvy;
      s.hx = clamp(s.hx + s.hvx * dt, -5, 5);
      s.hy = clamp(s.hy + s.hvy * dt, -6, 6);
      headX.set(s.hx);
      headY.set(s.hy);
    },
    [x, y, hopY, floatY, velX, velY, stretch, headX, headY, bankTarget, lookX, lookY],
  );
  useAnimationFrame(step);
  return null;
}

/**
 * Sparkles shed behind her while she flies. Plain DOM nodes with a CSS
 * animation (globals.css), added and removed outside React, so the trail never
 * re-renders anything and runs on the compositor.
 */
function Trail({ active, x, y, dockRef }: { active: boolean; x: MotionValue<number>; y: MotionValue<number>; dockRef: RefObject<HTMLDivElement> }) {
  const layer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!active) return;
    let n = 0;
    const id = window.setInterval(() => {
      const r = dockRef.current?.getBoundingClientRect();
      const host = layer.current;
      if (!r || !host) return;
      const c = ["#FFE6A3", "#BFEFF6", "#FFC9D8"][n++ % 3];
      const el = document.createElement("span");
      el.className = "mochi-spark";
      el.style.left = `${r.left + r.width / 2 + x.get() + (Math.random() - 0.5) * 26}px`;
      el.style.top = `${r.bottom - r.width * 0.42 + y.get() + (Math.random() - 0.5) * 18}px`;
      el.style.setProperty("--s", (0.6 + Math.random() * 0.7).toFixed(2));
      el.innerHTML = `<svg viewBox="0 0 20 20" width="12" height="12"><path d="${STAR}" fill="${c}"/></svg>`;
      const drop = () => el.remove();
      el.addEventListener("animationend", drop);
      window.setTimeout(drop, 1200);
      host.appendChild(el);
    }, 65);
    return () => window.clearInterval(id);
  }, [active, x, y, dockRef]);
  return <div ref={layer} className="absolute inset-0" />;
}

const STAR = "M10 0 L 12.4 7.6 L 20 10 L 12.4 12.4 L 10 20 L 7.6 12.4 L 0 10 L 7.6 7.6 Z";

function Star({ className, color }: { className?: string; color: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <path d={STAR} fill={color} />
    </svg>
  );
}
