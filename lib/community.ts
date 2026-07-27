/*
 * Community data — Otamatsuri drops, wallpapers and the Kenya anime/K-pop scene radar.
 *
 * HONESTY RULE FOR THIS FILE: nothing here may claim a date, a turnout or a
 * release that hasn't actually happened. Unconfirmed items carry status "tba"
 * and render as "date to be announced" — never as a fake countdown.
 */

export type Wallpaper = {
  slug: string;
  title: string;
  /** Full-resolution 1080x1920 download */
  file: string;
  /** Lightweight grid preview */
  preview: string;
};

export const wallpapers: Wallpaper[] = [
  { slug: "the-oath",    title: "The Oath",    file: "/wallpapers/the-oath.jpg",    preview: "/wallpapers/preview/the-oath.jpg" },
  { slug: "standoff",    title: "Standoff",    file: "/wallpapers/standoff.jpg",    preview: "/wallpapers/preview/standoff.jpg" },
  { slug: "crimson",     title: "Crimson",     file: "/wallpapers/crimson.jpg",     preview: "/wallpapers/preview/crimson.jpg" },
  { slug: "skyward",     title: "Skyward",     file: "/wallpapers/skyward.jpg",     preview: "/wallpapers/preview/skyward.jpg" },
  { slug: "golden-hour", title: "Golden Hour", file: "/wallpapers/golden-hour.jpg", preview: "/wallpapers/preview/golden-hour.jpg" },
  { slug: "windswept",   title: "Windswept",   file: "/wallpapers/windswept.jpg",   preview: "/wallpapers/preview/windswept.jpg" },
];

export type DropStatus = "live" | "soon" | "tba";

export type Drop = {
  chapter: string;
  title: string;
  kind: string;
  status: DropStatus;
  blurb: string;
  href?: string;
};

export const dropStatusLabel: Record<DropStatus, string> = {
  live: "Out now",
  soon: "Ahead of release",
  tba: "Locked",
};

export const drops: Drop[] = [
  {
    chapter: "01",
    title: "First Frames",
    kind: "Stills",
    status: "live",
    blurb:
      "The first look at the Otamatsuri shoot — cosplay, props and Kenyan locations, graded and framed like a feature film.",
    href: "/work/otamatsuri-promo-film",
  },
  {
    chapter: "02",
    title: "The Wallpaper Drop",
    kind: "Phone wallpapers",
    status: "live",
    blurb:
      "Six frames from the shoot, cut and branded for your lock screen. Free, no email, no catch — just take them.",
    href: "#wallpapers",
  },
  {
    chapter: "03",
    title: "The Promo Film",
    kind: "Film",
    status: "soon",
    blurb:
      "The full cinematic promo Nataka directed and produced for the festival. Finished and waiting on the festival's release date.",
  },
  {
    chapter: "04",
    title: "Untitled",
    kind: "—",
    status: "tba",
    blurb:
      "The next chapter isn't announced yet. The community hears about it before the algorithm does.",
  },
];

export type EventStatus = "confirmed" | "recurring" | "tba";

export type SceneEvent = {
  name: string;
  kind: "anime" | "kpop";
  venue: string;
  status: EventStatus;
  /** Only ever set when a date is genuinely confirmed by the organiser */
  date?: string;
  note: string;
  /** What Nataka's involvement actually is — omitted when there is none */
  nataka?: string;
};

export const eventStatusLabel: Record<EventStatus, string> = {
  confirmed: "Confirmed",
  recurring: "Recurring",
  tba: "Date TBA",
};

export const sceneEvents: SceneEvent[] = [
  {
    name: "Otamatsuri",
    kind: "anime",
    venue: "Kenya",
    status: "tba",
    note:
      "An anime and otaku festival built for Kenya's cosplay scene. The release date is the festival's to announce.",
    nataka: "Nataka directed and produced the promo film.",
  },
  {
    name: "K-pop Festa",
    kind: "kpop",
    venue: "KALRO Garden, Nairobi",
    status: "recurring",
    note:
      "Hosted by the Kenyan K-pop Fan Club and drawing around 1,000 fans, with prizes presented by the Korean Ambassador.",
  },
  {
    name: "K-Pop Fest KE",
    kind: "kpop",
    venue: "Nairobi",
    status: "recurring",
    note:
      "Kenya's first K-Pop Fest — pulled together in about two weeks and still drew 300+ people. Demand outran the planning.",
  },
  {
    name: "Comic Con",
    kind: "anime",
    venue: "Nairobi",
    status: "recurring",
    note:
      "Where a lot of Nairobi's cosplay and dance crews actually perform. Dates come from the organisers each year.",
  },
];
