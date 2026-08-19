import type { Metadata } from "next";
import BoothControl from "@/components/experience/BoothControl";

export const metadata: Metadata = {
  title: { absolute: "Booth Control" },
  description: "Internal.",
  // Never index the gate, and never follow anything from it.
  robots: { index: false, follow: false, nocache: true },
};

/**
 * The approval screen. Password-gated, unlisted, noindex.
 *
 * This is the till. Nothing generates until someone here presses Approve, so
 * the page is the difference between a paid booth and strangers running our
 * generator for free. The prompts are visible here and on no customer's
 * screen.
 */
export default function BoothControlPage() {
  return (
    <main className="bg-ink text-cream min-h-screen">
      <BoothControl />
    </main>
  );
}
