# NATAKA LIVE — booth runbook

Double-click **`START-BOOTH.bat`**. That is the whole launch.

It disables sleep/screen-blanking, serves the production build on port 3005, and opens
Chrome fullscreen kiosk at `/live?booth=1` with the camera pre-approved. Closing Chrome
(ALT+F4) shuts the server down and restores your power settings.

---

## Before doors open

| # | Check | Why |
|---|---|---|
| 1 | **Camera is producing video** — a7 IV connected (USB webcam mode or Cam Link), or OBS open with **Start Virtual Camera** pressed | This laptop enumerates **only "OBS Virtual Camera"**. With OBS closed, that device exists but sends nothing and the mirror shows "Camera found, but it isn't sending video." |
| 2 | Do **not** run OBS and the browser on the same capture device | Windows gives a capture device to one consumer. Route a7 IV → OBS → Virtual Camera → browser, or browser-direct. Never both. |
| 3 | `DECART_API_KEY` in `nataka-inc/.env.local` | Without it the AI tab says "offline". Instant Looks still run. |
| 4 | Decart credit loaded for the day | See budget table below. |
| 5 | Dedicated 4G/5G router, tested at the venue | WebRTC needs ~2-4 Mbps sustained **upload**. Festival wifi will not hold it. |
| 6 | Laptop on mains power | The .bat kills sleep timers, not a flat battery. |

---

## Running it

- **Instant Looks** = free, 60fps, on-device, works with the internet completely down.
  This is your all-day crowd magnet. Leave it on between paying guests.
- **AI Engine** = billed per second. Fire it only for a paying guest, in short bursts.
  Two modes, switchable live:

  | Mode | Model | Rate | What it does |
  |---|---|---|---|
  | **FULL** | `lucy-2.5` (1280×720) | KES 2.60/sec | Costume, character, whole world. The tuxedo/astronaut transformations. |
  | **CHEAP · HALF PRICE** | `lucy-restyle-2` (1280×704) | **KES 1.30/sec** | Restyles the frame, keeps the person. Anime cel, oil paint, comic ink, neon, watercolour, gold hour. |

  Each mode carries its own presets — a style-transfer model asked for a tuxedo gives
  you a mushy tuxedo, so the chips change with the mode. **Run CHEAP as the default
  and upsell FULL**, and the AI half of your day costs half as much.
- The mirror **auto-sleeps after 45s idle** ("Mirror asleep — saving credit"). Tap
  **Wake the mirror** for the next guest.
- Booth mode hides the free-text prompt box. Guests get the six curated presets only.
- **Source** dropdown appears when more than one camera is present — pick the a7 IV.

## Cost meter

Top-right of the viewfinder, booth mode only. Shows AI seconds and running KES. It reads
Decart's own `generationTick` (active generation time), so it is real spend, not a guess.

---

## If it breaks

| Symptom | Fix |
|---|---|
| "Camera found, but it isn't sending video" | Open OBS → **Start Virtual Camera**. Or close the app holding the camera. |
| "No camera on this device" | Connect the a7 IV / Cam Link. |
| "Reconnecting — hold still" | Normal. It retries 5× on its own. Uplink blip. |
| "AI engine unreachable" + Retry | Uplink is properly down. **Switch to Instant Looks and keep trading** while you fix the router. |
| "AI credit finished" | Top up Decart. Instant Looks keeps the booth alive meanwhile. |
| Whole page unresponsive | ALT+F4, double-click `START-BOOTH.bat` again. ~15s to recover. |

**The golden rule: Instant Looks needs no key, no credit and no internet. If anything at
all goes wrong with the AI, switch tab and the booth keeps earning.**
