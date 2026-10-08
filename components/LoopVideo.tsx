"use client";

import { useEffect, useRef } from "react";

/**
 * A muted background loop that actually keeps playing. It plays regardless of
 * reduced-motion (Andrew's standing call for the site's autoplay video).
 * Browsers pause muted autoplay to save power, on tab switches and under data
 * saver, and a one-shot play() rejects silently, so this re-kicks playback
 * every second while the clip should be running. Every clip used here also
 * carries a silent audio track, which keeps Chrome from treating it as
 * pausable "video-only background media".
 *
 * `lazy` clips (anything below the fold) only load and play while on screen.
 */
export default function LoopVideo({
  src,
  poster,
  lazy = false,
  className = "absolute inset-0 h-full w-full object-cover",
}: {
  src: string;
  poster: string;
  lazy?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true; // the attribute alone is not enough for some autoplay policies
    let visible = !lazy;
    const kick = () => {
      if (visible && video.paused && document.visibilityState === "visible") video.play().catch(() => {});
    };

    let observer: IntersectionObserver | undefined;
    if (lazy) {
      observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible) kick();
          else video.pause();
        },
        { rootMargin: "200px 0px" },
      );
      observer.observe(video);
    }

    kick();
    const id = window.setInterval(kick, 1000);
    document.addEventListener("visibilitychange", kick);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", kick);
      observer?.disconnect();
    };
  }, [lazy]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay={!lazy}
      muted
      loop
      playsInline
      preload={lazy ? "none" : "auto"}
      aria-hidden="true"
      className={className}
    />
  );
}
