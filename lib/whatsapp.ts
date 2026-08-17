export const WHATSAPP_NUMBER = "254725107294";

/**
 * Builds a wa.me link with a prefilled first message.
 * Every CTA that names a goal should carry that goal into the chat —
 * a first message that says WHAT they want is worth far more than "Hi".
 * Messages end mid-sentence on purpose: the visitor completes the blank,
 * which turns the opener into a qualified brief instead of "how much?".
 */
export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
