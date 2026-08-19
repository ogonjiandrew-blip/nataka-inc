/*
 * The WhatsApp join block.
 *
 * WHY THIS EXISTS: ranking for "Otamatsuri" sends a traffic spike for one
 * weekend a year and then it leaves. This converts that spike into an audience
 * we can reach for free, forever.
 *
 * THE RULE THAT MUST NOT BE BROKEN: the photos live on the site FIRST and in
 * WhatsApp SECOND. WhatsApp is invisible to Google. If the recap gallery only
 * ever exists in the group, we forfeit the exact keyword we built this page to
 * win. Site = the public, indexable archive. WhatsApp = full-resolution files,
 * raw clips and early access for people who actually want them.
 *
 * WHAT THIS IS NOT: a photo-delivery mechanism. NATAKA WAVE is a community for
 * Kenya's anime, cosplay and K-pop scene. Photos are one thing it carries, not
 * the reason it exists. Do not gate entry on having been photographed: that
 * locks out almost everyone in the scene and a scene cannot be founded on a
 * rule that excludes it.
 *
 * WHERE THE EXCLUSIVITY LIVES: not in a rope at the door. Kenyan anime fans and
 * cosplayers are already a minority subculture that carries a social cost. The
 * feeling to hit is "you're not weird, you're early", and it works by
 * self-selection. The people it is for recognise themselves in the copy;
 * everyone else scrolls past, which is the intended outcome.
 *
 * The real gift here is not free files. It is being taken seriously: these are
 * people who spend months and real money on builds and have never had a proper
 * camera pointed at them. The copy is written to that, not to the giveaway.
 */

/**
 * The NATAKA WAVE Channel.
 *
 * Deliberately a Channel and not the group: this link sits on a public page
 * that is built to rank, so strangers will arrive. In a group every member can
 * see every other member's phone number, and this audience skews young. In a
 * channel, followers cannot see each other or us, and we cannot see them.
 * Nobody gets their number harvested off a page we published.
 *
 * The community groups are the room where people actually talk. This is the
 * front door to it.
 *
 * null until it is a real link. Same house rule as FILM_UPLOAD_DATE: a dead
 * join button is worse than no join button, so while this is null the whole
 * block renders nothing.
 */
export const WHATSAPP_INVITE: string | null =
  "https://whatsapp.com/channel/0029Vb8yZb3F6smpKQZNQI1t";

/*
 * QR for the link above, generated from that exact URL and inlined rather than
 * loaded as a file: it is ~2KB, it stays perfectly crisp at any size, it costs
 * no extra request, and it never goes stale against the link because they are
 * regenerated together.
 *
 * IF THE LINK EVER CHANGES, REGENERATE THIS. They are one unit:
 *   npx -y qrcode -t svg -o qr.svg "<the new url>"
 * Then scan the result once with a real phone before shipping. A QR that
 * renders is not the same as a QR that resolves.
 */
const QR_PATH =
  "M4 4.5h7m2 0h1m1 0h1m2 0h1m3 0h4m1 0h1m2 0h7M4 5.5h1m5 0h1m4 0h1m3 0h2m3 0h2m4 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m1 0h2m1 0h2m1 0h1m1 0h1m1 0h4m1 0h2m1 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m1 0h1m1 0h2m6 0h5m3 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m1 0h1m3 0h1m1 0h3m1 0h4m1 0h1m2 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m1 0h1m1 0h1m1 0h1m4 0h2m1 0h2m4 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M12 11.5h1m7 0h1m4 0h2M4 12.5h1m1 0h5m3 0h4m3 0h1m4 0h2m2 0h5M4 13.5h3m1 0h1m6 0h1m1 0h2m2 0h3m2 0h2m2 0h2m1 0h3M4 14.5h5m1 0h1m1 0h2m3 0h3m1 0h1m2 0h1m3 0h1m3 0h1m1 0h2M5 15.5h2m1 0h2m1 0h1m5 0h1m1 0h4m1 0h3m3 0h1m1 0h4M7 16.5h2m1 0h2m1 0h1m1 0h1m2 0h1m1 0h1m2 0h4m1 0h1m2 0h3m2 0h1M6 17.5h3m3 0h1m2 0h1m1 0h1m1 0h1m1 0h3m1 0h3m1 0h2m2 0h4M4 18.5h4m1 0h2m3 0h1m2 0h4m1 0h1m1 0h2m3 0h4m2 0h1M6 19.5h3m2 0h3m5 0h1m2 0h1m2 0h1m1 0h8M4 20.5h1m1 0h1m2 0h3m1 0h1m4 0h2m1 0h1m1 0h1m2 0h1m2 0h1m1 0h2m3 0h1M4 21.5h2m2 0h2m3 0h1m3 0h2m1 0h1m1 0h6m1 0h3m1 0h4M5 22.5h1m1 0h6m2 0h1m1 0h4m1 0h1m1 0h2m5 0h2m1 0h1M4 23.5h4m1 0h1m1 0h1m4 0h1m2 0h2m2 0h4m1 0h7m1 0h1M5 24.5h1m2 0h3m1 0h2m4 0h2m2 0h2m1 0h2m2 0h1m3 0h1M4 25.5h2m2 0h1m2 0h1m5 0h1m1 0h2m3 0h4m6 0h1m1 0h1M4 26.5h1m1 0h1m1 0h3m2 0h1m1 0h2m5 0h1m1 0h2m2 0h2m5 0h1M4 27.5h1m1 0h3m2 0h1m1 0h1m1 0h1m1 0h2m1 0h1m4 0h1m1 0h1m1 0h4m1 0h2M4 28.5h1m2 0h1m2 0h1m2 0h3m2 0h1m2 0h1m6 0h6m1 0h1M12 29.5h1m2 0h2m1 0h1m1 0h5m3 0h1m3 0h1m1 0h3M4 30.5h7m2 0h2m1 0h2m1 0h1m1 0h1m2 0h1m2 0h2m1 0h1m1 0h1m1 0h1M4 31.5h1m5 0h1m1 0h3m5 0h4m1 0h1m1 0h2m3 0h3M4 32.5h1m1 0h3m1 0h1m1 0h1m2 0h1m2 0h1m1 0h1m3 0h3m1 0h6M4 33.5h1m1 0h3m1 0h1m1 0h2m2 0h1m2 0h1m1 0h2m1 0h1m3 0h2m2 0h1m2 0h2M4 34.5h1m1 0h3m1 0h1m1 0h2m3 0h1m1 0h3m4 0h1m3 0h2m2 0h1M4 35.5h1m5 0h1m2 0h1m1 0h3m1 0h1m2 0h4m1 0h1m1 0h1m2 0h3M4 36.5h7m1 0h1m1 0h2m3 0h1m1 0h1m1 0h1m2 0h1m1 0h1m1 0h2m1 0h1m1 0h1";

export default function WhatsAppJoin({
  heading = "The Only One.",
  eyebrow = "Nataka Wave",
}: {
  heading?: string;
  eyebrow?: string;
}) {
  if (!WHATSAPP_INVITE) return null;

  return (
    <section
      id="whatsapp"
      className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24"
    >
      <div className="border border-white/10 bg-white/[0.02] p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-otaku" />
              <p className="font-sans text-otaku-light text-[10px] tracking-widest2 uppercase font-medium">
                {eyebrow}
              </p>
            </div>

            {/*
              The emotional load is carried by the first paragraph, not the
              headline. It names a private experience precisely enough that the
              reader feels recognised: being the only one in the room. The turn
              is "We did." The last line hands the scene back to them, because
              a community people feel they belong to is one they own.

              No em dashes anywhere in this copy. House rule for Otamatsuri work.
            */}
            <h2 className="font-geist font-black text-[clamp(1.5rem,4.5vw,3rem)] text-white uppercase leading-none mb-6">
              You Were Never{" "}
              <span className="font-display font-semibold italic normal-case text-otaku block">
                {heading}
              </span>
            </h2>

            <p className="font-sans text-white/75 text-sm md:text-base leading-relaxed mb-5 max-w-xl">
              You were the only one in your class who watched it. The only one in
              the estate who got the reference. You spent months building armour
              in a country that doesn&apos;t sell the materials, and nobody ever
              shot it properly.
            </p>
            <p className="font-sans text-white text-sm md:text-base leading-relaxed mb-5 max-w-xl">
              We did. And there are more of you than you think.
            </p>
            <p className="font-sans text-white/60 text-sm leading-relaxed mb-5 max-w-xl">
              Con dates, build help, meet-ups, and every frame we shoot, dropped
              here first at full resolution before any of it goes public.
            </p>
            <p className="font-display italic text-otaku-light text-sm md:text-base leading-relaxed mb-8 max-w-xl">
              This scene isn&apos;t ours. It&apos;s yours. We just brought the camera.
            </p>

            <a
              href={WHATSAPP_INVITE}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-3 font-geist font-black text-xs text-ink bg-[#25D366] px-8 py-4 uppercase tracking-widest hover:bg-[#3ee07c] transition-colors duration-200"
            >
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="w-4 h-4 shrink-0"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.898 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
              </svg>
              Come In
            </a>
          </div>

          {/* Desktop only: on a phone you cannot scan a code with the same
              phone that is displaying it. The button above is the mobile path. */}
          <figure className="hidden lg:block shrink-0">
            <div className="bg-white p-3">
              <svg
                viewBox="0 0 41 41"
                shapeRendering="crispEdges"
                width={190}
                height={190}
                role="img"
                aria-label="QR code to follow the NATAKA WAVE WhatsApp channel, Kenya's anime and cosplay community"
                className="block"
              >
                <path fill="#ffffff" d="M0 0h41v41H0z" />
                <path stroke="#0B0B0B" d={QR_PATH} />
              </svg>
            </div>
            <figcaption className="font-sans text-white/40 text-[10px] tracking-widest uppercase text-center mt-3">
              Scan to join
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
