/**
 * Otamatsuri Experience — the booth's anime-video questionnaire.
 *
 * Every anime/power combination maps to a premade Seedance prompt. The page
 * never generates anything itself: it assembles a WhatsApp message the
 * customer sends from their own phone, and the booth operator copies the
 * prompt into Higgsfield (Seedance fast · 480p · 9:16 · up to 15s) together
 * with the customer's booth photo.
 *
 * Prompt doctrine comes from OTAMATSURI-BOOTH/PROMPTING.md: live-action
 * anime — the world is anime, the photography is real. Practical effects a
 * crew could rig, never digital-effects vocabulary; real skin, film grain,
 * identity locked to the input photo. Prompts describe the worlds instead of
 * naming the shows, so the generated frames stay free of franchise titles.
 */

export interface Power {
  id: string;
  label: string;
  jp: string;
  tagline: string;
  scene: string;
}

export interface AnimeWorld {
  id: string;
  label: string;
  jp: string;
  sub: string;
  accent: string;
  /** Poster frame in /public/otamatsuri-experience — a real render, not stock. */
  poster: string;
  /**
   * The invented series title printed on the customer's episode card.
   *
   * Original inventions, deliberately not real anime names: the booth sells
   * these, and putting a real studio's title on a paid product is the one part
   * that turns a photo booth into a target. Same call as the print booth's
   * PROMPTING.md.
   */
  title: { jp: string; romaji: string; en: string };
  /**
   * Costume and set signature, prepended to every power in this world.
   *
   * This is the single strongest lever on "which anime is this?" — a viewer
   * reads the outfit and the landmarks before they read the action. Written
   * as genre wardrobe a costume department would build (pirate coat, scouting
   * harness, flak jacket), never as a replica of a specific character, which
   * keeps a paid product clear of any franchise's trademarked designs.
   */
  signature: string;
  powers: Power[];
}

export const BOOTH_WHATSAPP = "254117386206";

/** Shared tail — texture rules that keep the render photoreal. */
const REALISM_TAIL =
  "Handheld camera with subtle micro-shake and a brief autofocus hunt, organic 35mm film grain, lifted milky blacks, restrained saturation. Real skin with visible pores, never smoothed or airbrushed. The person's face stays exactly the same throughout, no warping, no morphing. No text, no subtitles, no watermark.";

export const animeWorlds: AnimeWorld[] = [
  {
    id: "one-piece",
    label: "One Piece",
    jp: "海賊",
    sub: "The deck of a pirate ship on the open sea",
    accent: "#E8442E",
    poster: "/otamatsuri-experience/world-one-piece.jpg",
    title: { jp: "大海ノ王", romaji: "TAIKAI NO Ō", en: "King of the Open Sea" },
    signature:
      "They wear a pirate crew outfit: an open sleeveless red coat over a bare chest or plain shirt, a wide yellow sash knotted at the waist, cropped trousers and a wide-brimmed straw hat with a red band, worn or slung on the back. They stand on the sunlit wooden deck of a huge wooden sailing galleon in the open tropical sea — thick mast and rigging ropes, canvas sails overhead, stacked barrels and coiled rope, a carved figurehead at the bow, endless blue water and a big sky all around.",
    powers: [
      {
        id: "fire",
        label: "Fire",
        jp: "炎",
        tagline: "A wall of flame taller than the sails",
        scene:
          "They swing one arm and a towering wall of real orange fire erupts across the deck, taller than the sails behind them, embers and ash drifting past the lens, heat ripple bending the air. Fire is the only light source. Camera pushes in slowly from slightly below eye level so they tower in frame.",
      },
      {
        id: "lightning",
        label: "Lightning",
        jp: "雷",
        tagline: "Storm king of the open sea",
        scene:
          "The sky above the ship turns to black storm. They stand at the bow, raise one arm, and forked lightning strikes the mast behind them in rapid flashes, each strike lighting the whole deck white, rain hammering the boards and streaking the lens, their soaked coat whipping in the wind. They stare down the lens, jaw set. One slow push-in from slightly below eye level.",
      },
      {
        id: "darkness",
        label: "Darkness",
        jp: "闇",
        tagline: "The dark that swallows the deck",
        scene:
          "Dusk falls over the ship. Thick black smoke pours up out of the deck boards around them and is pulled inward toward their open hand. Barrels and coiled rope drag across the deck toward the darkness, the daylight visibly dimming until only their face is lit by a single swinging lantern. Camera pushes in slowly toward their lit face.",
      },
      {
        id: "gum-gum",
        label: "Gum-Gum",
        jp: "ゴム",
        tagline: "The punch that crosses the whole ship",
        scene:
          "Wide shot with their whole body in frame on the left side and the stack of barrels on the right side of the same frame. They wind up and throw a punch, and their arm stretches impossibly long like rubber, shooting across the deck from left to right and smashing through the barrels in a burst of splinters, then snapping back to normal length with a whip-crack that rocks their shoulder. The camera never moves and never follows the arm: the person stays fully visible in frame the entire time, with both the person and the barrels in the same shot throughout. Only the arm stretches, the rest of their body stays exactly normal. Low camera angle.",
      },
    ],
  },
  {
    id: "dragon-ball",
    label: "Dragon Ball Z",
    jp: "戦",
    sub: "A cracked wasteland built for battle",
    accent: "#F5C542",
    poster: "/otamatsuri-experience/world-dragon-ball.jpg",
    title: { jp: "閃光ノ拳", romaji: "SENKŌ NO KEN", en: "Fist of Radiance" },
    signature:
      "They wear a torn martial arts gi: a bright orange sleeveless top and orange trousers over a blue undershirt, a blue sash tied at the waist, blue wristbands and dark boots, the fabric ripped and dust-stained from fighting. They stand on a vast cracked dry lakebed under a huge open sky, jagged rock spires and a blast crater behind them, loose gravel and dust across the ground.",
    powers: [
      {
        id: "kamehameha",
        label: "Kamehameha",
        jp: "波",
        tagline: "The beam that splits the wasteland",
        scene:
          "Three-quarter side view, in a wide low stance, their whole body clearly visible on the left of frame. For the first two seconds: hands cupped together at their hip, a blue-white sphere charging between the two joined palms. Then for the whole remaining eight seconds: they thrust both arms straight out sideways across the frame, hands still pressed palm against palm, and one single thick column of white-blue light fires out of the joined palms and keeps firing continuously, travelling low and level parallel to the ground, straight across the frame from left to right and out to the horizon. Dust kicks up along the ground under the beam. The person stays clearly visible and correctly exposed the entire time, never blown out, never hidden behind the light, never silhouetted. The air behind their back stays clear, nothing explodes behind them. The camera is locked off and does not move.",
      },
      {
        id: "super-saiyan-2",
        label: "Super Saiyan 2",
        jp: "超",
        tagline: "Gold hair, lightning, a crater underfoot",
        scene:
          "They scream up at the sky as their hair whips upward and flashes to spiked gold, sharp arcs of blue lightning strobing around their body, wind pressure blasting dust away from their feet in a widening crater ring, small stones lifting off the ground and floating around them. Jaw clenched, neck straining. One slow quarter orbit around them.",
      },
      {
        id: "kaioken",
        label: "Kaioken",
        jp: "界",
        tagline: "Crimson heat that cracks the ground",
        scene:
          "They crouch into a fighting stance as a roaring crimson glow like road-flare light wraps their whole body, steam pouring off their shoulders, the ground under their feet cracking outward, rings of dust pulsing away with each surge of the red light. Muscles tensed, teeth gritted, eyes locked on the lens. Camera pushes in slow and low.",
      },
    ],
  },
  {
    id: "attack-on-titan",
    label: "Attack on Titan",
    jp: "壁",
    sub: "Walls, wires and steam",
    accent: "#A3B18A",
    poster: "/otamatsuri-experience/world-attack-on-titan.jpg",
    title: { jp: "壁ノ咆哮", romaji: "KABE NO HŌKŌ", en: "Roar of the Wall" },
    signature:
      "They wear the full leather harness of a scouting corps soldier: thick brown straps crossing the chest and over both shoulders and down both thighs, heavy buckles, a white shirt and dark jacket underneath, steel gas canisters and twin blade grips at the hips, and a short hooded cloak snapping in the wind. Behind them stands a colossal grey stone defensive wall running out of frame, a town of red-tiled roofs far below half-drowned in cold morning fog.",
    powers: [
      {
        id: "titan",
        label: "Titan Transformation",
        jp: "巨",
        tagline: "The lightning strike and what rises after",
        scene:
          "They raise one hand to their mouth and bite down, and a bolt of lightning strikes on them with an explosion of white steam, leaving them standing unharmed in the foreground with the cloak whipping. Through the rolling steam behind them a colossal skeletal giant rises into frame, steaming muscle knitting over its ribs as it towers out of the top of frame. Camera tilts up slowly from the person to the giant.",
      },
      {
        id: "scouts",
        label: "Scout Regiment",
        jp: "翼",
        tagline: "Wires out, blades drawn, rooftops below",
        scene:
          "They stand on a clay-tile rooftop below the wall with twin steel blades drawn, morning fog in the streets. They fire two anchor wires into a stone tower ahead and launch off the roof, swinging low through the fog between old stone buildings, cloak snapping, gas thrusters hissing white jets at their hips. Camera follows behind them in one continuous tracking move.",
      },
      {
        id: "garrison",
        label: "Garrison Regiment",
        jp: "砲",
        tagline: "Cannon fire from the top of the wall",
        scene:
          "They stand on top of the wall itself at dawn, fog rolling far below. Down the wall line behind them a row of heavy iron cannons fires in sequence, each blast throwing white smoke and shaking the stone underfoot. They hold position calmly at the very edge, cloak flaring in the wind, staring down the lens. Slow push-in from slightly below eye level.",
      },
      {
        id: "military-police",
        label: "Military Police",
        jp: "憲",
        tagline: "The interior city bows when you walk",
        scene:
          "They walk slowly toward camera down a cobbled interior-city street inside the walls, the harness worn over a crisp pale dress uniform jacket, flanked by two riders on horseback and tall hanging banners, morning light cutting through stone arches. They draw a polished blade and level it straight at the lens without breaking stride, boots echoing on the cobbles. One steady backward-tracking shot at chest height.",
      },
    ],
  },
  {
    id: "fullmetal",
    label: "Fullmetal Alchemist",
    jp: "錬",
    sub: "Clap, and the world obeys",
    accent: "#D6B77F",
    poster: "/otamatsuri-experience/world-fullmetal.jpg",
    title: { jp: "鋼ノ代償", romaji: "HAGANE NO DAISHŌ", en: "The Price of Steel" },
    signature:
      "They wear a long crimson hooded coat over a black jacket and black trousers, white gloves marked with a red circular sigil, and heavy boots; one forearm is plated in dull articulated steel. They stand in the stone plaza of an early-1900s European industrial town — soot-stained brick buildings, iron lamp posts, cobbles underfoot, chalk transmutation circles drawn on the flagstones, overcast grey daylight.",
    powers: [
      {
        id: "earth",
        label: "Earth Alchemy",
        jp: "地",
        tagline: "Stone spears erupt where your palms land",
        scene:
          "They clap both hands together with a crack and slam their palms onto the flagstones. Blue-white sparks jump from the contact point and the ground answers: stone ripples outward like liquid, then a ring of jagged rock spears erupts from the ground around them, dust and grit blasting past the lens, pebbles raining back down. They rise slowly from the crouch, palms still smoking. Camera pushes in low through the dust.",
      },
      {
        id: "flame",
        label: "Flame Alchemy",
        jp: "焔",
        tagline: "One snap of the fingers, the air ignites",
        scene:
          "Night falls on the plaza. They raise one gloved hand and snap their fingers. The air itself ignites: a whip of real fire tears across the plaza in a line away from them and detonates into a rolling orange fireball against the far brick wall, ash and embers drifting past the lens. Fire is the only light source, flickering across their face. They lower the hand slowly, unflinching. One slow push-in.",
      },
      {
        id: "metal-body",
        label: "Metal Body",
        jp: "鋼",
        tagline: "Living steel, human eyes",
        scene:
          "Inside a machine workshop off the plaza, grinding sparks in the background, dark chrome metal flows up over their arms and chest like liquid and hardens into plated steel armour with riveted seams, while their face stays completely human, bare and unchanged above it. They clench a newly plated fist and steam vents from the joints, stray sparks bouncing off the plating. Camera orbits a quarter turn around them.",
      },
    ],
  },
  {
    id: "naruto",
    label: "Naruto",
    jp: "忍",
    sub: "A hidden village of rooftops and forest",
    accent: "#FF8A3D",
    poster: "/otamatsuri-experience/world-naruto.jpg",
    title: { jp: "影ノ螺旋", romaji: "KAGE NO RASEN", en: "Spiral of Shadows" },
    signature:
      "They wear a ninja village outfit: a dark green sleeveless flak vest with front pouches over a long-sleeved orange and black jacket, bandaged forearms, a weapons pouch strapped to one thigh, open-toed sandals, and a metal forehead plate on a dark cloth band tied across the brow. They stand in a hidden village at the edge of dense forest — tall straight cedar trunks, wooden training posts, tiled village rooftops visible through the trees.",
    powers: [
      {
        id: "rasengan",
        label: "Rasengan",
        jp: "螺",
        tagline: "A sphere of wind spinning in your palm",
        scene:
          "At dusk in the clearing they hold one palm up as a churning sphere of compressed wind and water spins to life in their hand, whipping their sleeve and hair upward, leaves and dust spiralling around their arm, the sphere glowing pale blue and lighting their face from below. They drop into a sprint and drive the sphere into a cedar trunk, which bursts into a spiral of splinters. One fast push-in on the strike.",
      },
      {
        id: "chidori",
        label: "Chidori",
        jp: "雷",
        tagline: "Lightning screaming in your fist",
        scene:
          "Night over the village. They crouch on a tiled rooftop gripping one wrist as their hand erupts in crackling white lightning, arcs snapping down to the tiles and fizzing out, the strobing light flickering hard across their face. They break into a sprint along the rooftop ridge, dragging the lightning hand low behind them, tiles sparking in their wake. Camera tracks alongside them at speed.",
      },
      {
        id: "shadow-clone",
        label: "Shadow Clone",
        jp: "影",
        tagline: "Three more of you step out of the smoke",
        scene:
          "They make a cross-shaped hand seal. A burst of white theatrical smoke erupts beside them and three identical copies of the exact same person step out of the smoke and land in fighting stances around them, all four sharing the same face, hair and outfit, each moving independently. The smoke drifts off through the cedars. One slow pull-back to fit all four in frame.",
      },
    ],
  },
];

/**
 * Identity + costume/set signature + the power action + texture rules.
 *
 * Order matters: the model weights what it reads first, so the person and
 * their wardrobe land before the effect. That is what makes a viewer name the
 * anime inside the first second instead of just seeing "someone with powers".
 */
export function buildPrompt(world: AnimeWorld, power: Power): string {
  return [
    "The person from the input photo, exact same face and hair.",
    world.signature,
    power.scene,
    REALISM_TAIL,
  ].join(" ");
}

/**
 * Episode number for the customer's card. Derived from the combination rather
 * than randomised so it is stable between server and client render, and so the
 * same pick always prints the same episode.
 */
export function episodeNumber(world: AnimeWorld, power: Power): string {
  let n = 0;
  for (const ch of world.id + power.id) n = (n * 31 + ch.charCodeAt(0)) % 96;
  return String(n + 3).padStart(2, "0");
}

export function buildWhatsAppUrl(name: string, world: AnimeWorld, power: Power): string {
  const message = [
    "🎌 OTAMATSURI BOOTH — AI ANIME VIDEO",
    `Name: ${name.trim()}`,
    `World: ${world.label} · Power: ${power.label}`,
    "",
    "— PROMPT (Seedance fast · 480p · 9:16 · up to 15s) —",
    buildPrompt(world, power),
  ].join("\n");
  return `https://wa.me/${BOOTH_WHATSAPP}?text=${encodeURIComponent(message)}`;
}
