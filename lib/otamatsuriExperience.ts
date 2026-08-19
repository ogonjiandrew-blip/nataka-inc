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
  powers: Power[];
}

export const BOOTH_WHATSAPP = "254798868047";

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
    powers: [
      {
        id: "fire",
        label: "Fire",
        jp: "炎",
        tagline: "A wall of flame taller than the sails",
        scene:
          "The person from the input photo, exact same face and hair, stands on the wooden deck of a huge pirate sailing ship at sea, wearing an open dark coat. They swing one arm and a towering wall of real orange fire erupts across the deck, taller than the sails behind them, embers and ash drifting past the lens, heat ripple bending the air. Fire is the only light source. Camera pushes in slowly from slightly below eye level so they tower in frame.",
      },
      {
        id: "lightning",
        label: "Lightning",
        jp: "雷",
        tagline: "Storm king of the open sea",
        scene:
          "The person from the input photo, exact same face and hair, stands at the bow of a wooden pirate ship under a black storm sky. They raise one arm and forked lightning strikes the mast behind them in rapid flashes, each strike lighting the whole deck white, rain hammering the boards and streaking the lens, their soaked coat whipping in the wind. They stare down the lens, jaw set. One slow push-in from slightly below eye level.",
      },
      {
        id: "darkness",
        label: "Darkness",
        jp: "闇",
        tagline: "The dark that swallows the deck",
        scene:
          "The person from the input photo, exact same face and hair, stands on a pirate ship deck at dusk as thick black smoke pours up out of the boards around them and is pulled inward toward their open hand. Barrels and coiled rope drag across the deck toward the darkness, the daylight visibly dimming until only their face is lit by a single swinging lantern. Camera pushes in slowly toward their lit face.",
      },
      {
        id: "gum-gum",
        label: "Gum-Gum",
        jp: "ゴム",
        tagline: "The punch that crosses the whole ship",
        scene:
          "Wide shot of the person from the input photo, exact same face and hair, standing on a pirate ship deck with their whole body in frame on the left side, a stack of wooden barrels on the right side of the same frame. They wind up and throw a punch, and their arm stretches impossibly long like rubber, shooting across the deck from left to right and smashing through the barrels in a burst of splinters, then snapping back to normal length with a whip-crack that rocks their shoulder. The camera never moves and never follows the arm: the person stays fully visible in frame the entire time, with both the person and the barrels in the same shot throughout. Only the arm stretches, the rest of their body stays exactly normal. Low camera angle.",
      },
    ],
  },
  {
    id: "dragon-ball",
    label: "Dragon Ball Z",
    jp: "戦",
    sub: "A cracked wasteland built for battle",
    accent: "#F5C542",
    powers: [
      {
        id: "kamehameha",
        label: "Kamehameha",
        jp: "波",
        tagline: "The beam that splits the wasteland",
        scene:
          "Three-quarter side view of the person from the input photo, exact same face and hair, in a wide low stance on cracked rocky ground, their whole body clearly visible on the left of frame. For the first two seconds: hands cupped together at their hip, a blue-white sphere charging between the two joined palms. Then for the whole remaining eight seconds: they thrust both arms straight out sideways across the frame, hands still pressed palm against palm, and one single thick column of white-blue light fires out of the joined palms and keeps firing continuously, travelling low and level parallel to the ground, straight across the frame from left to right and out to the horizon. Dust kicks up along the ground under the beam. The person stays clearly visible and correctly exposed the entire time, never blown out, never hidden behind the light, never silhouetted. The air behind their back stays clear, nothing explodes behind them. The camera is locked off and does not move.",
      },
      {
        id: "super-saiyan-2",
        label: "Super Saiyan 2",
        jp: "超",
        tagline: "Gold hair, lightning, a crater underfoot",
        scene:
          "The person from the input photo, exact same face, screams up at the sky in a rocky wasteland as their hair whips upward and flashes to spiked gold, sharp arcs of blue lightning strobing around their body, wind pressure blasting dust away from their feet in a widening crater ring, small stones lifting off the ground and floating around them. Jaw clenched, neck straining. One slow quarter orbit around them.",
      },
      {
        id: "kaioken",
        label: "Kaioken",
        jp: "界",
        tagline: "Crimson heat that cracks the ground",
        scene:
          "The person from the input photo, exact same face and hair, crouches into a fighting stance in a rocky wasteland as a roaring crimson glow like road-flare light wraps their whole body, steam pouring off their shoulders, the ground under their feet cracking outward, rings of dust pulsing away with each surge of the red light. Muscles tensed, teeth gritted, eyes locked on the lens. Camera pushes in slow and low.",
      },
    ],
  },
  {
    id: "attack-on-titan",
    label: "Attack on Titan",
    jp: "壁",
    sub: "Walls, wires and steam",
    accent: "#A3B18A",
    powers: [
      {
        id: "titan",
        label: "Titan Transformation",
        jp: "巨",
        tagline: "The lightning strike and what rises after",
        scene:
          "The person from the input photo, exact same face, raises one hand to their mouth in a green hooded scouting cloak, and a bolt of lightning strikes down on them with an explosion of white steam, leaving them standing unharmed in the foreground with the cloak whipping. Through the rolling steam behind them a colossal skeletal giant rises into frame, steaming muscle knitting over its ribs as it towers out of the top of frame. Camera tilts up slowly from the person to the giant.",
      },
      {
        id: "scouts",
        label: "Scout Regiment",
        jp: "翼",
        tagline: "Wires out, blades drawn, rooftops below",
        scene:
          "The person from the input photo, exact same face, stands on a clay-tile rooftop in a green hooded cloak over a leather harness, twin steel blades drawn, morning fog in the streets below. They fire two anchor wires into a stone tower ahead and launch off the roof, swinging fast and low through the fog between old stone buildings, cloak snapping, gas thrusters hissing white jets at their hips. Camera follows behind them in one continuous tracking move.",
      },
      {
        id: "garrison",
        label: "Garrison Regiment",
        jp: "砲",
        tagline: "Cannon fire from the top of the wall",
        scene:
          "The person from the input photo, exact same face, stands on top of a massive fifty-meter stone wall at dawn in a military jacket with a rose crest, fog rolling far below. Down the wall line behind them a row of iron cannons fires in sequence, each blast throwing white smoke and shaking the stone underfoot. They hold position calmly at the very edge, coat flaring in the wind, staring down the lens. Slow push-in from slightly below eye level.",
      },
      {
        id: "military-police",
        label: "Military Police",
        jp: "憲",
        tagline: "The interior city bows when you walk",
        scene:
          "The person from the input photo, exact same face, walks slowly toward camera down a cobbled old-city street in a crisp white-and-green military uniform with a green unicorn crest, flanked by two riders on horseback and tall hanging banners, morning light cutting through stone arches. They draw a polished blade and level it straight at the lens without breaking stride, boots echoing on the cobbles. One steady backward-tracking shot at chest height.",
      },
    ],
  },
  {
    id: "fullmetal",
    label: "Fullmetal Alchemist",
    jp: "錬",
    sub: "Clap, and the world obeys",
    accent: "#D6B77F",
    powers: [
      {
        id: "earth",
        label: "Earth Alchemy",
        jp: "地",
        tagline: "Stone spears erupt where your palms land",
        scene:
          "The person from the input photo, exact same face and hair, claps both hands together with a crack and slams their palms onto a stone plaza floor. Blue-white sparks jump from the contact point and the ground answers: stone ripples outward like liquid, then a ring of jagged rock spears erupts from the ground around them, dust and grit blasting past the lens, pebbles raining back down. They rise slowly from the crouch, palms still smoking. Camera pushes in low through the dust.",
      },
      {
        id: "flame",
        label: "Flame Alchemy",
        jp: "焔",
        tagline: "One snap of the fingers, the air ignites",
        scene:
          "The person from the input photo, exact same face and hair, stands in a scorched stone courtyard wearing white gloves marked with a red sigil, raises one hand, and snaps their fingers. The air itself ignites: a whip of real fire tears across the courtyard in a line and detonates into a rolling orange fireball behind them, ash and embers drifting past the lens. Fire is the only light source, flickering across their face. They lower the hand slowly, unflinching. One slow push-in.",
      },
      {
        id: "metal-body",
        label: "Metal Body",
        jp: "鋼",
        tagline: "Living steel, human eyes",
        scene:
          "The person from the input photo, exact same face, stands in a workshop full of grinding sparks as dark chrome metal flows up over their arms and chest like liquid, hardening into plated steel armor with riveted seams, while their face stays completely human and unchanged above it. They clench a newly plated fist and steam vents from the joints, stray sparks bouncing off the plating. Camera orbits a quarter turn around them.",
      },
    ],
  },
  {
    id: "naruto",
    label: "Naruto",
    jp: "忍",
    sub: "A hidden village of rooftops and forest",
    accent: "#FF8A3D",
    powers: [
      {
        id: "rasengan",
        label: "Rasengan",
        jp: "螺",
        tagline: "A sphere of wind spinning in your palm",
        scene:
          "The person from the input photo, exact same face and hair, stands in a forest clearing at dusk in a ninja flak jacket, holding one palm up as a churning sphere of compressed wind and water spins to life in their hand, whipping their sleeve and hair upward, leaves and dust spiraling around their arm, the sphere glowing pale blue and lighting their face from below. They drop into a sprint and drive the sphere into a tree trunk, which bursts into a spiral of splinters. One fast push-in on the strike.",
      },
      {
        id: "chidori",
        label: "Chidori",
        jp: "雷",
        tagline: "Lightning screaming in your fist",
        scene:
          "The person from the input photo, exact same face and hair, crouches on a village rooftop at night gripping one wrist as their hand erupts in crackling white lightning, arcs snapping down to the tin roof and fizzing out, the strobing light flickering hard across their face. They break into a sprint along the rooftop ridge, dragging the lightning hand low behind them, roof tiles sparking in their wake. Camera tracks alongside them at speed.",
      },
      {
        id: "shadow-clone",
        label: "Shadow Clone",
        jp: "影",
        tagline: "Three more of you step out of the smoke",
        scene:
          "The person from the input photo, exact same face and hair, stands in a forest clearing and makes a cross-shaped hand seal. A burst of white theatrical smoke erupts beside them and three identical copies of the exact same person step out of the smoke and land in fighting stances around them, all four sharing the same face, hair and outfit, each moving independently. The smoke drifts off through the trees. One slow pull-back to fit all four in frame.",
      },
    ],
  },
];

export function buildPrompt(power: Power): string {
  return `${power.scene} ${REALISM_TAIL}`;
}

export function buildWhatsAppUrl(name: string, world: AnimeWorld, power: Power): string {
  const message = [
    "🎌 OTAMATSURI BOOTH — AI ANIME VIDEO",
    `Name: ${name.trim()}`,
    `World: ${world.label} · Power: ${power.label}`,
    "",
    "— PROMPT (Seedance fast · 480p · 9:16 · up to 15s) —",
    buildPrompt(power),
  ].join("\n");
  return `https://wa.me/${BOOTH_WHATSAPP}?text=${encodeURIComponent(message)}`;
}
