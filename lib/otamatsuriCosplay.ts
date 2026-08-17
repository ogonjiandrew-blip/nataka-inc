/*
 * Otamatsuri cosplay scroll — the frame-by-frame data for
 * /community/otamatsuri-cosplay-nairobi.
 *
 * HONESTY RULES FOR THIS FILE:
 *  1. Every description may only claim what is actually visible in the frame,
 *     plus facts we already publish elsewhere (Nataka directed and produced the
 *     Otamatsuri promo film, it was shot in and around Nairobi with Kenyan
 *     cosplayers). No invented set anecdotes, no invented names.
 *  2. Otamatsuri is organised by Movie Jabber, not by Nataka. Never word
 *     anything as if Nataka runs the festival.
 *  3. HOUSE RULE for all Otamatsuri copy: no em dashes anywhere.
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

const BASE = "/stills/otamatsuri/community";

/**
 * Sequenced as a scroll, not as a folder: the knight opens it, the craft
 * close-ups sit in the middle, the Survey Corps run closes it out.
 */
export const cosplayFrames: CosplayFrame[] = [
  {
    slug: "the-oath",
    src: `${BASE}/1.jpg`,
    jp: "誓いの剣",
    romaji: "Chikai no Tsurugi",
    title: "The Oath",
    description:
      "A knight in blue and silver lifts a gold hilted sword over a green Kenyan valley while rain streaks the frame. Every plate on that armour was shaped and fitted by hand. This is the opening beat of the Otamatsuri film Nataka Inc directed in Nairobi, and it sets the rule for everything after it: cosplay lit and framed like cinema.",
    alt: "Otamatsuri cosplay in Nairobi: a knight cosplayer in blue and silver armour raises a gold hilted sword above a green Kenyan valley in the rain",
  },
  {
    slug: "sword-to-the-sky",
    src: `${BASE}/2.jpg`,
    jp: "天を指す",
    romaji: "Ten wo Sasu",
    title: "Sword to the Sky",
    description:
      "Pulled all the way back, the same cosplayer becomes one small figure against a washed out sky, forest and water behind her. Cosplay photography in Nairobi almost always happens in a crowd. Here the crowd is gone and the costume has to hold an entire widescreen frame on its own, which it does.",
    alt: "Wide shot of a Kenyan knight cosplayer holding a sword to the sky above a forest and lake outside Nairobi",
  },
  {
    slug: "looking-up",
    src: `${BASE}/12.jpg`,
    jp: "仰ぐ",
    romaji: "Aogu",
    title: "Looking Up",
    description:
      "Close on the knight, wig pulled loose, eyes up at something outside the frame. Nothing here is a pose held for a phone camera. The performance runs while the camera rolls, which is why the expression lands first and the costume second.",
    alt: "Close up of a Kenyan cosplayer in a pale wig and blue cloak looking upward, from the Otamatsuri film shot in Nairobi",
  },
  {
    slug: "wind",
    src: `${BASE}/14.jpg`,
    jp: "風",
    romaji: "Kaze",
    title: "Wind",
    description:
      "Wind takes the wig across her face and the frame goes cold and quiet. Most cosplay shoots fight the wind. On this one we let it win, because a strand of hair across one eye does more for a character than a clean, tidy portrait ever will.",
    alt: "Cosplay portrait with pale wig hair blown across the face, shot on location near Nairobi for Otamatsuri",
  },
  {
    slug: "hair-and-light",
    src: `${BASE}/13.jpg`,
    jp: "髪と光",
    romaji: "Kami to Hikari",
    title: "Hair and Light",
    description:
      "A macro frame: lash line, nose ring, pale strands crossing blown out highlights. Shot close enough that the makeup, the skin and the wig fibre all read separately. This is the detail layer of a cosplay shoot, and it is usually the first thing that gets skipped.",
    alt: "Extreme close up of a cosplayer's eye and nose ring with wig strands across the frame, Otamatsuri cosplay Nairobi",
  },
  {
    slug: "the-crimson-blade",
    src: `${BASE}/5.jpg`,
    jp: "紅の刃",
    romaji: "Kurenai no Yaiba",
    title: "The Crimson Blade",
    description:
      "Red hair, a horned headdress and a scratch built greatsword, all of it cut, layered and painted by the cosplayer. Look at the taped edges on the blade and the ribbing on the helm. That is Kenyan prop making done with a craft knife and patience, photographed properly for once.",
    alt: "Kenyan cosplayer in a handmade horned headdress holding a scratch built greatsword, Otamatsuri cosplay in Nairobi",
  },
  {
    slug: "behind-the-mask",
    src: `${BASE}/15.jpg`,
    jp: "面の奥",
    romaji: "Men no Oku",
    title: "Behind the Mask",
    description:
      "One eye through the slats of the headdress, lit red on one side and green on the other. A hard frame to get right. The costume covers most of the face, so the light has to do the acting and the eye has to land exactly in the gap.",
    alt: "Close up of a cosplayer's eye seen through a handmade headdress, lit red and green, from the Otamatsuri film",
  },
  {
    slug: "backlight",
    src: `${BASE}/16.jpg`,
    jp: "逆光",
    romaji: "Gyakko",
    title: "Backlight",
    description:
      "The sun drops behind her and the whole costume turns into an edge. Handmade armour, a heavy blade, and a Nairobi evening doing the job of a studio backlight. If you only ever see one frame from this shoot, we would like it to be this one.",
    alt: "Backlit sunset frame of a Kenyan cosplayer in handmade armour holding a large blade, Otamatsuri cosplay Nairobi",
  },
  {
    slug: "the-eye",
    src: `${BASE}/6.jpg`,
    jp: "瞳",
    romaji: "Hitomi",
    title: "The Eye",
    description:
      "Almost black, one catchlight, one iris. Frames like this get cut into the film to hold a beat before an action move. In a cosplay edit they buy tension for free, and they cost nothing but a long lens and a performer patient enough to hold still.",
    alt: "Extreme close up of an eye in low light, a cutaway frame from the Otamatsuri cosplay film shot in Kenya",
  },
  {
    slug: "round-glasses",
    src: `${BASE}/3.jpg`,
    jp: "丸眼鏡",
    romaji: "Marumegane",
    title: "Round Glasses",
    description:
      "Not every character in the film carries a sword. Round wire glasses, a beard, a blue shirt, played completely straight. Anime casts run on contrast, and a cosplay film shot in Kenya needs that contrast just as much as the source material it grew out of.",
    alt: "Close up of a character in round wire glasses and a blue shirt from the Otamatsuri cosplay film, Nairobi",
  },
  {
    slug: "through-the-glass",
    src: `${BASE}/11.jpg`,
    jp: "眼鏡越し",
    romaji: "Megane-goshi",
    title: "Through the Glass",
    description:
      "Closer still: the bridge of the frames, the pitting on the metal, the skin behind the lens. Costume work has to survive a camera this close, and cheap props never do. Here it holds.",
    alt: "Macro shot of round wire rimmed glasses on a character's face, detail frame from the Otamatsuri film in Kenya",
  },
  {
    slug: "straightening-up",
    src: `${BASE}/10.jpg`,
    jp: "襟を正す",
    romaji: "Eri wo Tadasu",
    title: "Straightening Up",
    description:
      "Braces, a leopard print tie being pulled into place, a watch, a lake behind. One small gesture held for a full frame. The best cosplay footage is rarely the big hero pose. It is the two seconds where a character does something completely ordinary in costume.",
    alt: "Detail shot of a character straightening a leopard print tie over a blue shirt and tan braces, Otamatsuri film Kenya",
  },
  {
    slug: "three-three-ways",
    src: `${BASE}/9.jpg`,
    jp: "三者三様",
    romaji: "Sansha Sanyo",
    title: "Three, Three Ways",
    description:
      "Three characters in one frame and not one of them from the same world: handmade red armour on the left, the man in the blue shirt in the middle, a Survey Corps jacket and red scarf on the right. This is what a Kenyan cosplay lineup actually looks like when everyone brings their own build.",
    alt: "Three Kenyan cosplayers in different costumes standing together by a lake, Otamatsuri cosplay in Nairobi",
  },
  {
    slug: "the-clash",
    src: `${BASE}/4.jpg`,
    jp: "交錯",
    romaji: "Kosaku",
    title: "The Clash",
    description:
      "Mid swing. Blade out, gear cables loose, weight dropped into the back foot. Action in cosplay is a stunt problem and a timing problem before it is a photography problem. Shoot it at the wrong shutter and it dies on the page, so we shot for the frame you are looking at.",
    alt: "Action frame of an Attack on Titan Survey Corps cosplayer mid swing against another character, shot in Kenya",
  },
  {
    slug: "departure",
    src: `${BASE}/7.jpg`,
    jp: "出立",
    romaji: "Shuttatsu",
    title: "Departure",
    description:
      "A Survey Corps jacket walking away into low fog, wings of freedom across the back, ODM gear strapped down both legs. Shot on a farm road outside Nairobi. The emblem does all the recognition work, which leaves the frame free to just be a person leaving.",
    alt: "Attack on Titan Survey Corps cosplayer walking away into fog on a farm road near Nairobi, Kenya",
  },
  {
    slug: "two-blades",
    src: `${BASE}/8.jpg`,
    jp: "二刀",
    romaji: "Nito",
    title: "Two Blades",
    description:
      "Low angle, both blades drawn, sky doing everything behind. The harness, the canisters and the grips are all built by hand and then worn for hours at a time. Cosplay this heavy is a physical job long before it is a photograph.",
    alt: "Low angle shot of a Survey Corps cosplayer with both blades drawn against a pale sky, Otamatsuri cosplay Kenya",
  },
  {
    slug: "gearing-up",
    src: `${BASE}/17.jpg`,
    jp: "支度",
    romaji: "Shitaku",
    title: "Gearing Up",
    description:
      "Golden hour, blades in hand, checking the rig before the next run. Nairobi light at this hour lasts about half an hour and then it is gone, which is a good enough reason to build a whole shoot day around it.",
    alt: "Cosplayer in a Survey Corps uniform checking ODM gear at golden hour in Nairobi, from the Otamatsuri film",
  },
  {
    slug: "maintenance",
    src: `${BASE}/18.jpg`,
    jp: "整備",
    romaji: "Seibi",
    title: "Maintenance",
    description:
      "Crouched at a stone wall in full sepia, cables coiled, gear across the hip. A deliberately quiet frame. A cosplay film needs a breath before it swings again, and this is the breath.",
    alt: "Survey Corps cosplayer crouched beside a stone wall adjusting handmade ODM gear, Otamatsuri cosplay Nairobi",
  },
  {
    slug: "standoff",
    src: `${BASE}/19.jpg`,
    jp: "対峙",
    romaji: "Taiji",
    title: "Standoff",
    description:
      "The last frame: two cosplayers against a Nairobi sunset, one crouched over the gear, one standing with the blade over the shoulder. Two builds, two fandoms, one skyline. Otamatsuri cosplay in a single picture.",
    alt: "Two Kenyan cosplayers facing off in silhouette against a Nairobi sunset, closing frame of the Otamatsuri film",
  },
];

/** 1 to 19 in kanji numerals, for the 其の◯ seal on each panel. */
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
