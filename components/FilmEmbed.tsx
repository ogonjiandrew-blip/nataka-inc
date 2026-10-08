"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "@phosphor-icons/react";

/**
 * A YouTube film framed like the rest of the work: the poster sits in a
 * rounded screen and the player only loads when someone presses play, so the
 * page stays fast and no YouTube cookies are set until then.
 */
export default function FilmEmbed({
  youTubeId,
  poster,
  title,
}: {
  youTubeId: string;
  poster: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative isolate">
      {/* Room light behind the screen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-[8%] -inset-y-[18%] -z-10 bg-[radial-gradient(50%_50%_at_50%_55%,rgb(var(--c-ember)/0.5),rgb(var(--c-ember)/0.12)_50%,transparent_75%)]"
      />
      <div className="relative aspect-video overflow-hidden rounded-[22px] md:rounded-[28px] bg-ink-50 ring-1 ring-white/10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youTubeId}?autoplay=1&rel=0&playsinline=1`}
            title={title}
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 block w-full text-left"
            aria-label={`Play ${title}`}
          >
            <Image
              src={poster}
              alt=""
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              quality={88}
              className="object-cover scale-[1.02] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 flex h-16 w-16 md:h-20 md:w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink/40 text-white ring-1 ring-white/30 backdrop-blur-md transition-[transform,background-color,color] duration-300 group-hover:scale-110 group-hover:bg-signal group-hover:text-on-signal group-hover:ring-signal"
            >
              <Play size={22} weight="fill" />
            </span>
            <span className="absolute left-5 bottom-5 md:left-8 md:bottom-7 font-mono text-[11px] uppercase tracking-[0.14em] text-cream/80">
              Play the film
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
