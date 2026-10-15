export type GalleryGroup = { heading: string; kind: string; alt: string; href?: string; imgs: string[] };

/** Shared by the visible gallery, image metadata and image sitemap. */
const aiStills = Array.from({ length: 31 }, (_, i) => `/stills/ai/1/${i + 1}.jpg`);
const filmStills = ["/stills/1/1.jpg", "/stills/1/2.jpg", "/stills/1/4.jpg", "/stills/1/5.jpg", "/stills/1/6.jpg", "/stills/1/7.jpg", "/stills/1/8.jpg", "/stills/1/27.jpg", "/stills/1/43.jpg", "/stills/1/46.jpg", "/stills/1/a.jpg", "/stills/1/b.jpg"];
const ssaruStills = ["/stills/ssaru/1.jpg", "/stills/ssaru/2.jpg"];
const perfStills = ["/stills/2/1.jpg", "/stills/2/2.jpg", "/stills/2/3.jpg"];
const fashionStills = ["/stills/fashion/1.jpg", "/stills/fashion/2.jpg", "/stills/fashion/3.jpg", "/stills/fashion/6.jpg", "/stills/fashion/7.jpg", "/stills/fashion/8.jpg", "/stills/fashion/9.jpg", "/stills/fashion/12.jpg"];
const teslahStills = ["/stills/teslah/web-1.jpg", "/stills/teslah/web-2.jpg", "/stills/teslah/3.jpg", "/stills/teslah/web-4.jpg", "/stills/teslah/web-5.jpg", "/stills/teslah/web-6.jpg", "/stills/teslah/web-7.jpg", "/stills/teslah/web-8.jpg", "/stills/teslah/web-9.jpg"];
const otamatsuriStills = ["/stills/otamatsuri/web-1.jpg", "/stills/otamatsuri/web-2.jpg", "/stills/otamatsuri/web-3.jpg", "/stills/otamatsuri/web-4.jpg", "/stills/otamatsuri/web-5.jpg", "/stills/otamatsuri/web-6.jpg", "/stills/otamatsuri/web-7.jpg", "/stills/otamatsuri/web-8.jpg"];

const maxusStills = ["d90-golden", "d90-dirt", "t60-highway", "wheel", "t60-sun", "d90-front", "t60-yard", "d90-palms", "d90-bank"].map((n) => `/stills/maxus/${n}.jpg`);

export const galleryGroups: GalleryGroup[] = [
  { heading: "Nataka Inc on set", kind: "Our marketing video shoot", alt: "Nataka Inc marketing production on location", imgs: ["/stills/nataka-on-set/nataka-inc-camera-crew-content-shoot.jpg", "/stills/nataka-on-set/nataka-inc-marketing-video-presenter.jpg", "/stills/nataka-on-set/nataka-inc-content-production-on-location.jpg", "/stills/nataka-on-set/nataka-inc-social-content-production-team.jpg"] },
  { heading: "MAXUS Kenya", kind: "Launch films and social", alt: "MAXUS Kenya vehicle photographed by Nataka Inc, automotive content in Nairobi, Kenya", imgs: maxusStills },
  { heading: "Teslah", kind: "Music video", href: "/work/teslah-music-video", alt: "Teslah music video still by Nataka Inc, music video production in Nairobi, Kenya", imgs: teslahStills },
  { heading: "Otamatsuri", kind: "Festival promo film", href: "/work/otamatsuri-promo-film", alt: "Otamatsuri cinematic film still by Nataka Inc, film and video production in Nairobi, Kenya", imgs: otamatsuriStills },
  { heading: "AI studio visuals", kind: "AI-generated images", alt: "AI-generated studio visual from the Nataka Inc portfolio", imgs: aiStills },
  { heading: "Film and campaign", kind: "Stills", alt: "Nataka Inc film and campaign still, video production company in Nairobi, Kenya", imgs: filmStills },
  { heading: "Artist campaigns", kind: "Ssaru", alt: "Nataka Inc artist campaign still, Nairobi, Kenya", imgs: ssaruStills },
  { heading: "Performance", kind: "Live", alt: "Nataka Inc performance still, Nairobi, Kenya", imgs: perfStills },
  { heading: "Fashion editorial", kind: "Studio", alt: "Nataka Inc fashion editorial still, creative agency in Nairobi, Kenya", imgs: fashionStills },
];

// Scene descriptions checked against the published portfolio frames, 16 Oct 2026.
const descriptions: Record<string, string> = {
  "/stills/nataka-on-set/nataka-inc-camera-crew-content-shoot.jpg": "A presenter and camera operator filming Nataka Inc's own marketing video on location",
  "/stills/nataka-on-set/nataka-inc-marketing-video-presenter.jpg": "A presenter wearing a lapel microphone during Nataka Inc's marketing video shoot",
  "/stills/nataka-on-set/nataka-inc-content-production-on-location.jpg": "On-location presenter footage from Nataka Inc's own social marketing video production",
  "/stills/nataka-on-set/nataka-inc-social-content-production-team.jpg": "The presenter and camera crew on Nataka Inc's marketing content shoot",
  "/stills/maxus/d90-golden.jpg": "MAXUS D90 on a rocky rise at sunset, from Nataka Inc's automotive films for MAXUS Kenya",
  "/stills/maxus/d90-dirt.jpg": "Front view of a white MAXUS D90 on a murram road in golden light, a Nataka Inc campaign still",
  "/stills/maxus/t60-highway.jpg": "MAXUS pickup on a highway in warm evening light, from Nataka Inc's automotive content",
  "/stills/maxus/wheel.jpg": "Close-up of a MAXUS steering wheel in a Nataka Inc automotive film",
  "/stills/maxus/t60-sun.jpg": "Low-angle view of a white MAXUS pickup under a blue sky, a Nataka Inc production still",
  "/stills/maxus/d90-front.jpg": "White MAXUS D90 outside a city building, from Nataka Inc's films for MAXUS Kenya",
  "/stills/maxus/t60-yard.jpg": "White MAXUS pickup parked in a paved yard, a Nataka Inc automotive film still",
  "/stills/maxus/d90-palms.jpg": "White MAXUS D90 beside palms and a city building, a Nataka Inc campaign frame",
  "/stills/maxus/d90-bank.jpg": "Side view of a white MAXUS D90 on an urban street, from the Nataka Inc portfolio",
  "/stills/teslah/web-1.jpg": "Teslah leaning toward the camera in a dark teal-lit music video scene by Nataka Inc",
  "/stills/teslah/web-2.jpg": "Close-up of Teslah performing in a Nataka Inc studio music video",
  "/stills/teslah/web-4.jpg": "Blue fabric moving through a studio performance frame from Teslah's Nataka Inc music video",
  "/stills/teslah/web-5.jpg": "Teslah standing against a pale blue studio backdrop, a Nataka Inc music video still",
  "/stills/teslah/web-6.jpg": "Full-length studio performance portrait of Teslah in blue, from Nataka Inc's music video",
  "/stills/teslah/web-7.jpg": "Teslah seated in a studio performance scene, a music video frame by Nataka Inc",
  "/stills/teslah/web-8.jpg": "A seated performer holding another performer in a dark studio, from Teslah's Nataka Inc music video",
  "/stills/teslah/web-9.jpg": "Three performers seated against a magenta studio backdrop, from Teslah's Nataka Inc music video",
  "/stills/otamatsuri/web-1.jpg": "A costumed character seen in warm backlight, from Nataka Inc's Otamatsuri promo film",
  "/stills/otamatsuri/web-2.jpg": "Two costumed characters in an orange-lit scene from Nataka Inc's Otamatsuri promo film",
  "/stills/otamatsuri/web-3.jpg": "Close-up of costume detail in the Otamatsuri festival promo film by Nataka Inc",
  "/stills/otamatsuri/web-4.jpg": "Two characters beside a lake in Nataka Inc's Otamatsuri festival promo film",
  "/stills/otamatsuri/web-5.jpg": "Close-up of a character wearing round sunglasses, from Nataka Inc's Otamatsuri film",
  "/stills/otamatsuri/web-6.jpg": "A character in a white wig looking upward, from Nataka Inc's Otamatsuri promo film",
  "/stills/otamatsuri/web-7.jpg": "Portrait of a character in a white wig, a frame from Nataka Inc's Otamatsuri promo film",
  "/stills/otamatsuri/web-8.jpg": "A costumed performer in warm sunset light, from the Otamatsuri film by Nataka Inc",
  "/stills/ssaru/1.jpg": "Ssaru performing in a red-and-blue-lit music video scene, from the Nataka Inc portfolio",
  "/stills/ssaru/2.jpg": "A red costume and suspended fragments in a music video frame from the Nataka Inc portfolio",
};

export const galleryImages = galleryGroups.flatMap((group) => group.imgs.map((src, i) => ({
  src,
  id: src.replace(/^\//, "").replace(/[^a-z0-9]+/gi, "-"),
  title: `${group.heading} — frame ${String(i + 1).padStart(2, "0")}`,
  caption: descriptions[src] ?? `${group.heading}, ${group.kind.toLowerCase()}, frame ${i + 1} from the Nataka Inc portfolio.`,
  group: group.heading,
  kind: group.kind,
  href: group.href,
})));

