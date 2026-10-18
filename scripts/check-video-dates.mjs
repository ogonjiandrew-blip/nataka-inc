import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

// Check the actual built JSON-LD rather than just the source constants.
const root = join(process.cwd(), ".next/server/app");
function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? htmlFiles(path) : path.endsWith(".html") ? [path] : [];
  });
}
function videos(value) {
  if (!value || typeof value !== "object") return [];
  const types = Array.isArray(value["@type"]) ? value["@type"] : [value["@type"]];
  return [
    ...(types.includes("VideoObject") ? [value] : []),
    ...Object.values(value).flatMap(videos),
  ];
}

const counts = new Map();
const kwaniniDates = new Set();
let total = 0;
for (const file of htmlFiles(root)) {
  const route = relative(root, file).split(sep).join("/");
  for (const match of readFileSync(file, "utf8").matchAll(/<script\b[^>]*\btype="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    for (const video of videos(JSON.parse(match[1]))) {
      const label = `${route}: ${video.name}`;
      assert.match(video.uploadDate ?? "", /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:Z|[+-](?:0\d|1[0-4]):[0-5]\d)$/, `${label}: uploadDate needs an ISO timestamp with timezone`);
      const date = video.uploadDate.slice(0, 10);
      assert.equal(new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10), date, `${label}: invalid calendar date`);
      assert.ok(Number.isFinite(Date.parse(video.uploadDate)), `${label}: invalid datetime`);
      if (video.name.startsWith("Kwanini")) kwaniniDates.add(video.uploadDate);
      counts.set(route, (counts.get(route) ?? 0) + 1);
      total++;
    }
  }
}
assert.equal(counts.get("gallery.html"), 6, "Keep all six gallery video entries");
assert.equal(counts.get("services/ai-video-production-kenya.html"), 3, "Keep all three AI video entries");
assert.equal(counts.get("work/ssaru-fathermoh-kwanini.html"), 1, "Keep the Kwanini video entry");
assert.equal(kwaniniDates.size, 1, "Kwanini publication date must agree across pages");
console.log(`PASS: ${total} rendered VideoObjects have valid timezone-qualified dates; all affected entries retained.`);
