/*
 * Otamatsuri cosplay scroll — the frame-by-frame data for
 * /community/otamatsuri-cosplay-nairobi.
 *
 * HONESTY RULES FOR THIS FILE:
 *  1. Every description may only claim what is actually visible in the frame,
 *     plus facts we already publish elsewhere (Nataka directed and produced
 *     the Otamatsuri film, it was shot around Nairobi with Kenyan cosplayers).
 *     No invented set anecdotes, no invented names, no invented venues.
 *  2. Otamatsuri is organised by Movie Jabber, not by Nataka. Never word
 *     anything as if Nataka runs the festival.
 *  3. HOUSE RULE for all Otamatsuri copy: no em dashes.
 *  4. Talk up the cosplayers and the craft. Never build Nataka up by running
 *     down how the scene has been photographed before.
 *
 * The earlier promo-film set was removed from this page on request. Those 19
 * frames still live in /public/stills/otamatsuri/community and are still used
 * by the community page hero, film strips and wallpapers, and the copy for
 * them is recoverable from git history if it is ever wanted back.
 */

export type CosplayFrame = {
  /** Stable id, used for the deep link hash and the lightbox */
  slug: string;
  src: string;
  /** Japanese title shown in the vertical mount strip */
  jp: string;
  /** Romaji reading, set small under the kanji */
  romaji: string;
  /** English title */
  title: string;
  /** The paragraph that sits under the frame */
  description: string;
  /** Alt text. Written for a screen reader first, search second. */
  alt: string;
};

const BASE = "/stills/otamatsuri/vol001";

/**
 * Sequenced as a scroll, not as a folder: the staircase establishes, the
 * detail and portrait frames sit in the middle, the action pays off, and the
 * two daylight builds lift it at the end.
 */
export const cosplayFrames: CosplayFrame[] = [
  {
    slug: "arrival",
    src: `${BASE}/arrival.jpg`,
    jp: "参上",
    romaji: "Sanjo",
    title: "Arrival",
    description:
      "A Survey Corps cosplayer at the top of a shopping centre staircase in Nairobi, ODM gear strapped down both thighs, the whole centre lit and empty behind him. The rig is handmade, canisters, grips and holsters included, and it is worn standing for hours at a time.",
    alt: "Otamatsuri cosplay in Nairobi: a Kenyan cosplayer in an Attack on Titan Survey Corps uniform and handmade ODM gear on a lit shopping centre staircase at night",
  },
  {
    slug: "the-rig",
    src: `${BASE}/the-rig.jpg`,
    jp: "装",
    romaji: "Yosooi",
    title: "The Rig",
    description:
      "Close on the uniform: wings of freedom on the chest and the shoulder, the belt rig cinched, gas canisters and grips sitting on the hip. This is the part of a costume that takes the longest to build, and it is worth a frame entirely to itself.",
    alt: "Detail of a handmade Attack on Titan Survey Corps uniform and ODM gear belt rig, Otamatsuri cosplay Kenya",
  },
  {
    slug: "red-light",
    src: `${BASE}/red-light.jpg`,
    jp: "紅灯",
    romaji: "Koto",
    title: "Red Light",
    description:
      "Blade over the shoulder, red light raking across the jacket, warm lanterns thrown out of focus behind. The wings of freedom sit on both shoulders and the sleeve, cut and applied by hand like the rest of the uniform.",
    alt: "Kenyan cosplayer in a Survey Corps jacket holding a blade over the shoulder under red light, Otamatsuri film shot in Nairobi",
  },
  {
    slug: "flare",
    src: `${BASE}/flare.jpg`,
    jp: "閃光",
    romaji: "Senko",
    title: "Flare",
    description:
      "A hard backlight blows out behind him and the whole figure drops to an outline with a rim of light around the head. Ordinary Nairobi lighting doing the job of a film lamp, which happens more often than people expect.",
    alt: "Cosplayer silhouetted against a bright backlight with lens flare, Otamatsuri film frame shot in Nairobi",
  },
  {
    slug: "the-distance",
    src: `${BASE}/the-distance.jpg`,
    jp: "間合い",
    romaji: "Maai",
    title: "The Distance",
    description:
      "Close on a face in red light with the costume collar just inside the frame. Held tight and held quiet, the way an anime cuts to a face a beat before it cuts to the fight.",
    alt: "Extreme close up of a cosplayer's face lit red, a held beat from the Otamatsuri film shot in Nairobi",
  },
  {
    slug: "night-fight",
    src: `${BASE}/night-fight.jpg`,
    jp: "夜戦",
    romaji: "Yasen",
    title: "Night Fight",
    description:
      "Two cosplayers mid move under shopfront light, ODM gear on one and an orange jacket on the other. A Nairobi shopping centre standing in for a city street, which is exactly the kind of substitution that makes a small production look large.",
    alt: "Two cosplayers in an action pose under shopfront lights at night in Nairobi, Otamatsuri film frame",
  },
  {
    slug: "showdown",
    src: `${BASE}/showdown.jpg`,
    jp: "対決",
    romaji: "Taiketsu",
    title: "Showdown",
    description:
      "Two characters nose to nose, one in a Survey Corps jacket, one in an orange and black jacket with a wrapped blade across the back. Both of them shouting. Cosplay is performance as much as it is construction, and this frame is all performance.",
    alt: "Two cosplayers shouting face to face in costume, an Otamatsuri film frame shot in Nairobi Kenya",
  },
  {
    slug: "the-mask",
    src: `${BASE}/the-mask.jpg`,
    jp: "面",
    romaji: "Men",
    title: "The Mask",
    description:
      "A green horned helmet, a respirator and a grey hood, shot from below against a blank sky. Every panel, strap and buckle on that helmet was cut, shaped and fitted by hand, and it reads cleanly even this close to the lens.",
    alt: "Close up of a handmade green horned helmet and respirator cosplay mask against a pale sky, Otamatsuri cosplay Nairobi",
  },
  {
    slug: "rooftop",
    src: `${BASE}/rooftop.jpg`,
    jp: "屋上",
    romaji: "Okujo",
    title: "Rooftop",
    description:
      "Daylight on a Nairobi rooftop, and two builds that could not be less alike: a teal horned helmet and a large blue and coral axe on the left, a grey coat and a respirator on the right. Both weapons shaped and painted by hand.",
    alt: "Two Kenyan cosplayers on a Nairobi rooftop with a handmade axe and a respirator mask costume, Otamatsuri cosplay",
  },
  {
    slug: "crimson-clouds",
    src: `${BASE}/crimson-clouds.jpg`,
    jp: "紅の雲",
    romaji: "Kurenai no Kumo",
    title: "Crimson Clouds",
    description:
      "Red clouds on a black robe, chin lifted, shot from below into a white sky. High key and almost weightless, sitting completely apart from the night frames around it, and a good place to end.",
    alt: "Kenyan cosplayer in a black robe with red cloud pattern shot from below against a bright sky, Otamatsuri cosplay in Nairobi",
  },
];

/** 1 to 19 in kanji numerals, for the 第◯ seal on each panel. */
const KANJI_DIGITS = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];

export function kanjiNumeral(n: number): string {
  if (n < 10) return KANJI_DIGITS[n];
  if (n === 10) return "十";
  if (n < 20) return `十${KANJI_DIGITS[n - 10]}`;
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  return `${KANJI_DIGITS[tens]}十${ones ? KANJI_DIGITS[ones] : ""}`;
}

/** The faint kanji watermark that sits behind every third panel. */
export const watermarkKanji = ["祭", "刃", "布", "光", "写", "縁"];
