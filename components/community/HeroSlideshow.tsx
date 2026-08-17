"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cosplayFrames } from "@/lib/otamatsuriCosplay";

/*
 * The hero cross fades through every frame in the scroll, two seconds a hold.
 *
 * Three things worth knowing about how this is built:
 *
 * 1. Frames mount progressively. Ten 1920px hero images is a lot to push at a
 *    visitor on Kenyan mobile data, so only the current frame and the one after
 *    it are in the DOM at first. Each new frame gets a full two seconds to load
 *    before it is needed, and once mounted it stays, so the second lap is
 *    seamless and nothing pops.
 *
 * 2. The timer is set in an effect, never in render, so the server and client
 *    markup match and reduced motion can be honoured without a hydration
 *    mismatch. Anyone who asks the OS for less motion simply keeps frame one.
 *
 * 3. The whole stack is decorative. Every one of these images appears again
 *    further down the page with its real alt text and its own description, so
 *    the slideshow carries empty alts and is hidden from assistive tech rather
 *    than read out ten times.
 */

const HOLD_MS = 2000;

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  // How far down the list we have mounted. Only ever grows.
  const [mountedUpTo, setMountedUpTo] = useState(1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      // Do not burn through the reel in a background tab
      if (document.hidden) return;
      setIndex((prev) => (prev + 1) % cosplayFrames.length);
    }, HOLD_MS);

    return () => clearInterval(id);
  }, []);

  // Keep one frame of runway ahead of whatever is showing
  useEffect(() => {
    setMountedUpTo((m) => Math.max(m, Math.min(index + 1, cosplayFrames.length - 1)));
  }, [index]);

  return (
    <div className="absolute inset-0" aria-hidden>
      {cosplayFrames.slice(0, mountedUpTo + 1).map((frame, i) => (
        <Image
          key={frame.slug}
          src={frame.src}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          quality={80}
          className={`object-cover transition-opacity duration-[900ms] ease-in-out ${
            i === index ? "opacity-60" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
