"use client";

/**
 * SphereGallery — Phantom.land-style spherical gallery.
 *
 * Camera sits at the centre of a sphere; project cards are arranged on the
 * inner surface. Left-click + drag (or wheel / touch) rotates the sphere with
 * lenis-style damped easing and release inertia. Clicking a card animates a
 * detail overlay in with GSAP.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import gsap from "gsap";

type Project = {
  client: string;
  title: string;
  tags: string[];
  year: string;
  image: string;
};

const PROJECTS: Project[] = [
  { client: "SSARU X FATHERMOH", title: "KWANINI", tags: ["MUSIC VIDEO", "DIRECTION"], year: "2026", image: "/stills/4/1.jpg" },
  { client: "SSARU X FATHERMOH", title: "KWANINI", tags: ["FILM", "GRADE"], year: "2026", image: "/stills/4/2.jpg" },
  { client: "SSARU X FATHERMOH", title: "KWANINI", tags: ["MUSIC VIDEO", "EDIT"], year: "2026", image: "/stills/4/4.jpg" },
  { client: "SSARU X FATHERMOH", title: "KWANINI", tags: ["PORTRAIT", "STILL"], year: "2026", image: "/stills/4/5.jpg" },
  { client: "SSARU X FATHERMOH", title: "KWANINI", tags: ["CAMPAIGN", "CONTENT"], year: "2026", image: "/stills/4/6.jpg" },
  { client: "SSARU X FATHERMOH", title: "KWANINI", tags: ["MUSIC VIDEO", "3D"], year: "2026", image: "/stills/4/7.jpg" },
  { client: "NATAKA", title: "CAMPAIGN FILM", tags: ["FILM", "CAMPAIGN"], year: "2024", image: "/stills/1/1.jpg" },
  { client: "NATAKA", title: "CAMPAIGN FILM", tags: ["EXPERIENCE", "FILM"], year: "2024", image: "/stills/1/2.jpg" },
  { client: "NATAKA", title: "NARRATIVE WORK", tags: ["FILM", "DRAMA"], year: "2024", image: "/stills/1/4.jpg" },
  { client: "NATAKA", title: "NARRATIVE WORK", tags: ["FILM", "STORY"], year: "2024", image: "/stills/1/5.jpg" },
  { client: "NATAKA", title: "NARRATIVE WORK", tags: ["PRODUCTION"], year: "2023", image: "/stills/1/6.jpg" },
  { client: "NATAKA", title: "FILM & DRAMA", tags: ["FILM", "EVENT"], year: "2023", image: "/stills/1/7.jpg" },
  { client: "NATAKA", title: "FILM & DRAMA", tags: ["FILM", "CONTENT"], year: "2023", image: "/stills/1/8.jpg" },
  { client: "NATAKA", title: "FILM & DRAMA", tags: ["DOCUMENTARY"], year: "2023", image: "/stills/1/27.jpg" },
  { client: "NATAKA", title: "STREET STORIES", tags: ["FILM", "CULTURE"], year: "2024", image: "/stills/1/43.jpg" },
  { client: "NATAKA", title: "STREET STORIES", tags: ["CAMPAIGN", "OOH"], year: "2024", image: "/stills/1/46.jpg" },
  { client: "NATAKA", title: "NAIROBI LIGHT", tags: ["FILM", "GRADE"], year: "2025", image: "/stills/1/a.jpg" },
  { client: "NATAKA", title: "NAIROBI LIGHT", tags: ["FILM", "MOTION"], year: "2025", image: "/stills/1/b.jpg" },
  { client: "NATAKA", title: "NATAKA VIDEO", tags: ["MUSIC VIDEO"], year: "2024", image: "/stills/2/1.jpg" },
  { client: "NATAKA", title: "NATAKA VIDEO", tags: ["MUSIC VIDEO", "EDIT"], year: "2024", image: "/stills/2/2.jpg" },
  { client: "NATAKA", title: "NATAKA VIDEO", tags: ["PERFORMANCE"], year: "2024", image: "/stills/2/3.jpg" },
  { client: "SSARU", title: "ARTIST CAMPAIGN", tags: ["PR", "ARTIST"], year: "2024", image: "/stills/ssaru/1.jpg" },
  { client: "SSARU", title: "ARTIST CAMPAIGN", tags: ["BRAND", "ARTIST"], year: "2024", image: "/stills/ssaru/2.jpg" },

  // ── Films ──
  { client: "VIJANA BARUBARU", title: "ZA MABUDA", tags: ["FILM", "DIRECTION"], year: "2026", image: "/videos/za-mabuda-poster.jpg" },
  { client: "VIJANA BARUBARU", title: "ZA MABUDA", tags: ["PERIOD", "DRAMA"], year: "2026", image: "/stills/1/43.jpg" },
  { client: "NATAKA", title: "SAVE HER", tags: ["MUSIC VIDEO"], year: "2026", image: "/videos/save-her-poster.jpg" },
  { client: "NATAKA", title: "COOL IN SCHOOL", tags: ["MUSIC VIDEO", "COLOUR"], year: "2026", image: "/videos/cool-in-school-poster.jpg" },
  { client: "SARIT CENTRE", title: "YOUR CITY", tags: ["BRAND", "COMMERCIAL"], year: "2026", image: "/videos/sarit-poster.jpg" },
  { client: "NATAKA", title: "OPEN AUDITIONS", tags: ["BRAND FILM", "PROMO"], year: "2026", image: "/videos/nataka-promo-poster.jpg" },
  { client: "SSARU X FATHERMOH", title: "KWANINI", tags: ["TEASER", "MOTION"], year: "2026", image: "/videos/kwanini-teaser-poster.jpg" },

  // ── Fashion Editorial ──
  { client: "NATAKA STUDIO", title: "EDITORIAL", tags: ["FASHION", "STUDIO"], year: "2026", image: "/stills/fashion/6.jpg" },
  { client: "NATAKA STUDIO", title: "EDITORIAL", tags: ["FASHION", "PORTRAIT"], year: "2026", image: "/stills/fashion/1.jpg" },
  { client: "NATAKA STUDIO", title: "EDITORIAL", tags: ["FASHION", "STILL"], year: "2026", image: "/stills/fashion/2.jpg" },
  { client: "NATAKA STUDIO", title: "EDITORIAL", tags: ["FASHION", "LIGHT"], year: "2026", image: "/stills/fashion/12.jpg" },
  { client: "NATAKA STUDIO", title: "EDITORIAL", tags: ["FASHION", "STYLE"], year: "2026", image: "/stills/fashion/8.jpg" },
  { client: "NATAKA STUDIO", title: "EDITORIAL", tags: ["FASHION", "BOLD"], year: "2026", image: "/stills/fashion/7.jpg" },
  { client: "NATAKA STUDIO", title: "EDITORIAL", tags: ["FASHION", "STREET"], year: "2026", image: "/stills/fashion/3.jpg" },
  { client: "NATAKA STUDIO", title: "EDITORIAL", tags: ["FASHION", "CAMPAIGN"], year: "2026", image: "/stills/fashion/9.jpg" },
];

/* Sphere layout */
const RADIUS = 20;
const ROWS = [
  { phi: -0.72, count: 10 },
  { phi: -0.36, count: 13 },
  { phi: 0.0,  count: 14 },
  { phi: 0.36, count: 13 },
  { phi: 0.72, count: 10 },
];

const CARD_W = 5.2;
const CARD_H = 6.5;
const TEX_W = 512;
const TEX_H = 640;

/** Draw a phantom-style card: dark tile, mono labels, cover-cropped image */
function drawCard(ctx: CanvasRenderingContext2D, img: HTMLImageElement, p: Project) {
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, TEX_W, TEX_H);

  // image area — cover crop
  const ix = 14, iy = 64, iw = TEX_W - 28, ih = 460;
  const scale = Math.max(iw / img.width, ih / img.height);
  const sw = iw / scale, sh = ih / scale;
  const sx = (img.width - sw) / 2, sy = (img.height - sh) / 2;
  ctx.drawImage(img, sx, sy, sw, sh, ix, iy, iw, ih);

  // subtle vignette on the image
  const grad = ctx.createLinearGradient(0, iy, 0, iy + ih);
  grad.addColorStop(0, "rgba(10,10,10,0.25)");
  grad.addColorStop(0.2, "rgba(10,10,10,0)");
  grad.addColorStop(0.8, "rgba(10,10,10,0)");
  grad.addColorStop(1, "rgba(10,10,10,0.25)");
  ctx.fillStyle = grad;
  ctx.fillRect(ix, iy, iw, ih);

  // top labels
  ctx.font = "600 17px 'Courier New', monospace";
  ctx.fillStyle = "rgba(240,237,230,0.55)";
  ctx.textBaseline = "top";
  ctx.fillText(p.client, 16, 26);
  const tw = ctx.measureText(p.title).width;
  ctx.fillStyle = "rgba(240,237,230,0.85)";
  ctx.fillText(p.title, TEX_W - 16 - tw, 26);

  // bottom: tag pills + year
  let tx = 16;
  const ty = iy + ih + 26;
  ctx.font = "600 15px 'Courier New', monospace";
  for (const tag of p.tags) {
    const w = ctx.measureText(tag).width + 24;
    ctx.strokeStyle = "rgba(240,237,230,0.28)";
    ctx.lineWidth = 1.5;
    roundRect(ctx, tx, ty, w, 32, 16);
    ctx.stroke();
    ctx.fillStyle = "rgba(240,237,230,0.66)";
    ctx.fillText(tag, tx + 12, ty + 9);
    tx += w + 10;
  }
  ctx.fillStyle = "rgba(240,237,230,0.4)";
  const yw = ctx.measureText(p.year).width;
  ctx.fillText(p.year, TEX_W - 16 - yw, ty + 9);
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export default function SphereGallery() {
  const mountRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Project | null>(null);
  const [loaded, setLoaded] = useState(false);
  const selectedRef = useRef<Project | null>(null);
  // iOS requires a user gesture before granting motion-sensor access
  const [needsMotionTap, setNeedsMotionTap] = useState(false);
  const [gyroActive, setGyroActive] = useState(false);
  const enableGyroRef = useRef<(() => void) | null>(null);

  const closeOverlay = useCallback(() => {
    if (!overlayRef.current) return;
    gsap.to(overlayRef.current, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => {
        setSelected(null);
        selectedRef.current = null;
      },
    });
  }, []);

  /* Animate overlay in whenever a card is selected */
  useEffect(() => {
    if (selected && overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 0.75, ease: "power4.inOut" }
      );
      const inner = overlayRef.current.querySelectorAll("[data-reveal]");
      gsap.fromTo(
        inner,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, delay: 0.35, ease: "power3.out" }
      );
    }
  }, [selected]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;

    /* ── Scene ── */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    scene.fog = new THREE.Fog(0x050505, RADIUS * 0.9, RADIUS * 1.6);

    const camera = new THREE.PerspectiveCamera(
      62,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 0.001);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    /* ── Build cards ── */
    const meshes: THREE.Mesh[] = [];
    const geometry = new THREE.PlaneGeometry(CARD_W, CARD_H);

    (async () => {
      // load all unique images once
      const cache = new Map<string, HTMLImageElement>();
      await Promise.all(
        Array.from(new Set(PROJECTS.map((p) => p.image))).map(async (src) => {
          try { cache.set(src, await loadImage(src)); } catch { /* skip broken */ }
        })
      );
      if (disposed) return;

      let idx = 0;
      for (const row of ROWS) {
        for (let i = 0; i < row.count; i++) {
          const project = PROJECTS[idx % PROJECTS.length];
          idx++;
          const img = cache.get(project.image);
          if (!img) continue;

          const canvas = document.createElement("canvas");
          canvas.width = TEX_W;
          canvas.height = TEX_H;
          const ctx = canvas.getContext("2d")!;
          drawCard(ctx, img, project);

          const texture = new THREE.CanvasTexture(canvas);
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

          const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0,
            side: THREE.FrontSide,
          });
          const mesh = new THREE.Mesh(geometry, material);

          // spherical position — stagger alternate rows half a step
          const offset = (ROWS.indexOf(row) % 2) * (Math.PI / row.count);
          const theta = (i / row.count) * Math.PI * 2 + offset;
          const phi = row.phi;
          mesh.position.set(
            RADIUS * Math.cos(phi) * Math.sin(theta),
            RADIUS * Math.sin(phi),
            RADIUS * Math.cos(phi) * Math.cos(theta)
          );
          mesh.lookAt(0, 0, 0);
          mesh.userData = { project, baseScale: 1 };
          group.add(mesh);
          meshes.push(mesh);

          // staggered fade-in
          gsap.to(material, {
            opacity: 1,
            duration: 1.2,
            delay: 0.4 + Math.random() * 1.2,
            ease: "power2.out",
          });
        }
      }
      setLoaded(true);
    })();

    /* ── Drag / inertia state ── */
    let targetYaw = 0;
    let targetPitch = 0;
    let yaw = 0;
    let pitch = 0;
    let velYaw = 0;
    let velPitch = 0;
    let dragging = false;
    let moved = 0;
    let lastX = 0;
    let lastY = 0;
    const PITCH_LIMIT = 0.55;

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(-10, -10);
    let hovered: THREE.Mesh | null = null;

    /* ── Device-orientation control (YouTube-360 style, mobile only) ──
       Pan the phone left/right (alpha) to look around; tilt it up/down
       (beta) to look up/down. Deltas are measured from the orientation
       the phone had when the gallery opened, and feed the same damped
       targets the drag uses — so touch and motion work together. */
    let gyroYaw = 0;
    let gyroPitch = 0;
    let baseAlpha: number | null = null;
    let baseBeta: number | null = null;
    let gyroAttached = false;

    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha == null || e.beta == null) return;
      if (baseAlpha === null || baseBeta === null) {
        baseAlpha = e.alpha;
        baseBeta = e.beta;
        setGyroActive(true);
      }
      // shortest-path alpha delta, unwrapped to -180…180
      let dA = e.alpha - baseAlpha;
      if (dA > 180) dA -= 360;
      if (dA < -180) dA += 360;
      // panning the phone right turns the view right
      gyroYaw = THREE.MathUtils.degToRad(dA);
      // tilting the phone up looks up
      gyroPitch = THREE.MathUtils.clamp(
        THREE.MathUtils.degToRad(e.beta - baseBeta),
        -PITCH_LIMIT,
        PITCH_LIMIT
      );
    };

    const attachGyro = () => {
      if (gyroAttached) return;
      gyroAttached = true;
      window.addEventListener("deviceorientation", onOrientation);
    };

    // ?gyro=1 forces motion control on for testing in desktop emulators
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      new URLSearchParams(window.location.search).has("gyro");
    if (isTouchDevice) {
      const DOE = DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<string>;
      };
      if (typeof DOE.requestPermission === "function") {
        // iOS — needs a tap to grant sensor access
        setNeedsMotionTap(true);
        enableGyroRef.current = () => {
          DOE.requestPermission!()
            .then((state) => {
              if (state === "granted") attachGyro();
            })
            .catch(() => {/* user declined — drag still works */})
            .finally(() => setNeedsMotionTap(false));
        };
      } else {
        // Android — no permission needed
        attachGyro();
      }
    }

    const onPointerDown = (e: PointerEvent) => {
      if (selectedRef.current) return;
      dragging = true;
      moved = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      velYaw = 0;
      velPitch = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / mount.clientWidth) * 2 - 1;
      pointer.y = -(e.clientY / mount.clientHeight) * 2 + 1;

      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      moved += Math.abs(dx) + Math.abs(dy);
      lastX = e.clientX;
      lastY = e.clientY;

      const sYaw = dx * 0.0028;
      const sPitch = dy * 0.0022;
      targetYaw += sYaw;
      targetPitch = THREE.MathUtils.clamp(targetPitch - sPitch, -PITCH_LIMIT, PITCH_LIMIT);
      velYaw = sYaw;
      velPitch = -sPitch;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;

      // click (not drag) → open card
      if (moved < 6 && !selectedRef.current) {
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(meshes);
        if (hits.length > 0) {
          const mesh = hits[0].object as THREE.Mesh;
          const project = mesh.userData.project as Project;
          // punch the card toward the camera, then open overlay
          gsap.to(mesh.scale, { x: 1.12, y: 1.12, z: 1.12, duration: 0.25, ease: "power2.out", yoyo: true, repeat: 1 });
          gsap.to(camera, {
            fov: 50,
            duration: 0.7,
            ease: "power3.inOut",
            onUpdate: () => camera.updateProjectionMatrix(),
          });
          selectedRef.current = project;
          setSelected(project);
        }
      } else {
        // release inertia
        velYaw *= 14;
        velPitch *= 14;
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (selectedRef.current) return;
      targetYaw += e.deltaY * 0.00045;
      targetPitch = THREE.MathUtils.clamp(targetPitch + e.deltaX * 0.0002, -PITCH_LIMIT, PITCH_LIMIT);
    };

    mount.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    mount.addEventListener("wheel", onWheel, { passive: true });

    /* ── Render loop — lenis-style damping ── */
    let raf = 0;
    const clock = new THREE.Clock();

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(clock.getDelta(), 0.05);

      // idle auto-drift — off once device motion is steering
      if (!dragging && !selectedRef.current && baseAlpha === null) {
        targetYaw += 0.018 * dt;
      }

      // inertia decay
      if (!dragging) {
        targetYaw += velYaw * dt * 4;
        targetPitch = THREE.MathUtils.clamp(targetPitch + velPitch * dt * 4, -PITCH_LIMIT, PITCH_LIMIT);
        velYaw *= 0.94;
        velPitch *= 0.94;
      }

      // damped easing toward target (drag/inertia + device orientation)
      yaw += (targetYaw + gyroYaw - yaw) * 0.07;
      pitch += (THREE.MathUtils.clamp(targetPitch + gyroPitch, -PITCH_LIMIT, PITCH_LIMIT) - pitch) * 0.07;
      group.rotation.y = yaw;
      group.rotation.x = pitch;

      // hover scale
      if (!dragging && !selectedRef.current) {
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(meshes);
        const hit = hits.length ? (hits[0].object as THREE.Mesh) : null;
        if (hit !== hovered) {
          if (hovered) gsap.to(hovered.scale, { x: 1, y: 1, z: 1, duration: 0.4, ease: "power2.out" });
          if (hit) gsap.to(hit.scale, { x: 1.06, y: 1.06, z: 1.06, duration: 0.4, ease: "power2.out" });
          hovered = hit;
          mount.style.cursor = hit ? "pointer" : "grab";
        }
      }

      renderer.render(scene, camera);
    };
    tick();

    /* reset fov when overlay closes */
    const fovWatcher = setInterval(() => {
      if (!selectedRef.current && camera.fov !== 62) {
        gsap.to(camera, {
          fov: 62,
          duration: 0.7,
          ease: "power3.inOut",
          onUpdate: () => camera.updateProjectionMatrix(),
        });
      }
    }, 300);

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      clearInterval(fovWatcher);
      mount.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      mount.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("deviceorientation", onOrientation);
      meshes.forEach((m) => {
        (m.material as THREE.MeshBasicMaterial).map?.dispose();
        (m.material as THREE.MeshBasicMaterial).dispose();
      });
      geometry.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full h-[100dvh] bg-[#050505] overflow-hidden select-none">
      {/* WebGL mount */}
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* ── Phantom-style HUD ── */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {/* top-left logo */}
        <a
          href="/"
          className="pointer-events-auto absolute top-6 left-6 md:left-10 font-nataka font-black text-lg text-white tracking-tight hover:text-teal transition-colors"
        >
          NATAKA<span className="text-teal">.</span>INC
        </a>

        {/* top-centre description */}
        <p className="hidden md:block absolute top-7 left-1/2 -translate-x-1/2 font-mono text-[10px] text-white/60 tracking-wider uppercase leading-relaxed text-left max-w-[300px]">
          Nataka is a Nairobi-based creative
          <br />
          agency crafting film, music videos
          <br />
          &amp; campaigns for bold brands.
        </p>

        {/* top-right clock + CTA */}
        <div className="absolute top-6 right-6 md:right-10 flex items-center gap-6">
          <div className="hidden md:block font-mono text-[10px] text-white/60 tracking-wider uppercase text-right leading-relaxed">
            <span className="inline-block w-2 h-2 rounded-full bg-teal mr-2 align-middle" />
            Nairobi, KE&nbsp;&nbsp;<LocalTime />
          </div>
          <a
            href="/#contact"
            className="pointer-events-auto font-sans text-xs font-semibold text-ink bg-cream rounded-full px-6 py-3 hover:bg-teal transition-colors duration-300"
          >
            Let&apos;s Talk
          </a>
        </div>

        {/* bottom-centre pill nav */}
        <nav className="pointer-events-auto absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center bg-white/10 backdrop-blur-md rounded-full p-1.5">
          <span className="font-sans text-xs font-semibold text-ink bg-cream rounded-full px-6 py-2.5">
            Work
          </span>
          <a href="/#about" className="font-sans text-xs font-medium text-white/80 px-6 py-2.5 hover:text-teal transition-colors">
            About
          </a>
          <a href="/#contact" className="font-sans text-xs font-medium text-white/80 px-6 py-2.5 hover:text-teal transition-colors">
            Contact
          </a>
        </nav>

        {/* bottom-left hint */}
        <p className="hidden md:block absolute bottom-8 left-10 font-mono text-[10px] text-white/35 tracking-wider uppercase">
          Drag to explore — click a card to open
        </p>

        {/* iOS motion permission — Apple requires a tap before sensor access */}
        {needsMotionTap && (
          <button
            onClick={() => enableGyroRef.current?.()}
            className="pointer-events-auto absolute bottom-24 left-1/2 -translate-x-1/2 font-mono text-[11px] text-ink bg-teal tracking-widest uppercase rounded-full px-6 py-3 shadow-lg shadow-teal/20"
          >
            ⊕ Enable 360° Motion
          </button>
        )}

        {/* 360° active indicator (mobile) */}
        {gyroActive && (
          <span className="absolute bottom-24 left-1/2 -translate-x-1/2 font-mono text-[10px] text-teal/80 tracking-[0.3em] uppercase">
            ◉ 360° — Move your phone
          </span>
        )}
      </div>

      {/* loading veil */}
      <div
        className={`absolute inset-0 z-20 bg-[#050505] flex items-center justify-center transition-opacity duration-1000 ${
          loaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <span className="font-mono text-xs text-white/50 tracking-[0.3em] uppercase animate-pulse">
          Loading Gallery
        </span>
      </div>

      {/* ── Detail overlay — basic template, animated in with GSAP ── */}
      {selected && (
        <div
          ref={overlayRef}
          className="absolute inset-0 z-30 bg-ink overflow-y-auto"
          style={{ clipPath: "inset(100% 0 0 0)" }}
        >
          <div className="min-h-full flex flex-col">
            <div className="flex items-center justify-between px-6 md:px-10 py-6">
              <span className="font-nataka font-black text-lg text-white tracking-tight">
                NATAKA<span className="text-teal">.</span>INC
              </span>
              <button
                onClick={closeOverlay}
                className="font-mono text-[11px] text-white/60 tracking-widest uppercase hover:text-teal transition-colors border border-white/20 rounded-full px-5 py-2.5 hover:border-teal"
              >
                Close ✕
              </button>
            </div>

            <div className="flex-1 px-6 md:px-10 pb-16 max-w-6xl mx-auto w-full">
              <p data-reveal className="font-mono text-[11px] text-teal tracking-widest uppercase mb-4">
                {selected.client} · {selected.year}
              </p>
              <h1 data-reveal className="font-geist font-black text-[clamp(2.5rem,8vw,6rem)] text-white uppercase leading-none mb-8">
                {selected.title}
              </h1>

              <div data-reveal className="relative aspect-[16/9] overflow-hidden mb-8 bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div data-reveal className="flex flex-wrap gap-3 mb-10">
                {selected.tags.map((t) => (
                  <span key={t} className="font-mono text-[10px] text-white/60 tracking-widest uppercase border border-white/20 rounded-full px-4 py-2">
                    {t}
                  </span>
                ))}
              </div>

              <p data-reveal className="font-sans text-cream/60 text-base leading-relaxed max-w-2xl mb-12">
                A project by Nataka Inc — directed, produced and finished in Nairobi.
                {selected.title === "KWANINI"
                  ? " Read the full case study, or get in touch about your own project."
                  : " Full case study coming soon. For project enquiries, get in touch."}
              </p>

              <div data-reveal className="flex flex-wrap gap-4">
                {selected.title === "KWANINI" && (
                  <a
                    href="/work/ssaru-fathermoh-kwanini"
                    className="font-geist font-black text-xs text-ink bg-teal px-8 py-4 uppercase tracking-widest hover:bg-teal-light transition-colors"
                  >
                    View Case Study
                  </a>
                )}
                <a
                  href="/#contact"
                  className={`font-geist font-black text-xs px-8 py-4 uppercase tracking-widest transition-colors ${
                    selected.title === "KWANINI"
                      ? "text-white border border-white/25 hover:border-teal hover:text-teal"
                      : "text-ink bg-teal hover:bg-teal-light"
                  }`}
                >
                  Start a Project
                </a>
                <button
                  onClick={closeOverlay}
                  className="font-geist font-black text-xs text-white/60 px-4 py-4 uppercase tracking-widest hover:text-teal transition-colors"
                >
                  Back to Gallery
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Live Nairobi clock, ticks every 30s */
function LocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Africa/Nairobi",
        }) + " GMT+3"
      );
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);
  return <span>{time}</span>;
}
