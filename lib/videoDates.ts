/**
 * Publication dates used by video structured data, shared across pages.
 * Do not derive publication dates from a project year or the current build date.
 *
 * Kwanini and Za Mabuda use the original publishers' YouTube uploadDate metadata,
 * checked on 2026-10-18 and expressed in Nairobi time:
 * https://www.youtube.com/watch?v=4oXe4H8vxbI
 * https://www.youtube.com/watch?v=wn9uNx62tuU
 *
 * The remaining records retain the site's existing calendar dates. Their source
 * records have day precision only; 00:00:00+03:00 is the start-of-day convention,
 * not a claim that the original release happened at exactly midnight.
 */
export const videoUploadDates = {
  zaMabuda: "2026-01-07T10:00:06+03:00",
  kwanini: "2026-06-05T12:00:06+03:00",
  saveHer: "2026-01-20T00:00:00+03:00",
  coolInSchool: "2026-02-10T00:00:00+03:00",
  yourCity: "2026-02-20T00:00:00+03:00",
  openAuditions: "2026-01-05T00:00:00+03:00",
  aanother: "2026-10-08T00:00:00+03:00",
} as const;
