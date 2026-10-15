import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PHONE_DISPLAY, waLink } from "@/lib/whatsapp";

const url = "https://www.natakainc.com/privacy";
const title = "Privacy Notice | Nataka Inc";
const description =
  "How Nataka Inc collects, uses and protects the details you share through our Facebook and Instagram forms, WhatsApp, email and website, and how to use your rights under Kenya's Data Protection Act 2019.";
const updated = "15 October 2026";
const EMAIL = "ogonjiandrew@gmail.com";

const sections: { n: string; title: string; body: string[] }[] = [
  {
    n: "01",
    title: "Who we are",
    body: [
      `Nataka Inc ("Nataka", "we") is a media and marketing agency in Westlands, Nairobi, Kenya. We decide how the details you send us are used, so we are responsible for them under the Data Protection Act 2019.`,
      `Contact for anything in this notice: ${EMAIL} or WhatsApp ${PHONE_DISPLAY}.`,
    ],
  },
  {
    n: "02",
    title: "What we collect",
    body: [
      "When you fill in one of our forms on Facebook or Instagram, message us on WhatsApp, email us or use this website, we collect what you choose to give us: your name, phone or WhatsApp number, email address, company, job title, and your answers to our questions, such as your role, what you need help with, your budget range and your timing.",
      "From Meta we also receive the name of the ad or form you responded to, so we know which message brought you in. We do not ask for sensitive personal data, such as health, religion or financial account details.",
    ],
  },
  {
    n: "03",
    title: "Why we use it",
    body: [
      "To reply to your enquiry, quote for and deliver our services, and keep proper business records.",
      "We only contact you about the enquiry you made. We will not add you to newsletters or other promotions unless you tell us you want them, and you can say stop at any time.",
    ],
  },
  {
    n: "04",
    title: "Our legal basis",
    body: [
      "Your consent, which you give when you submit a form or message us; our legitimate interest in answering business enquiries; and, once you become a client, the contract between us and our legal duties, such as tax records.",
    ],
  },
  {
    n: "05",
    title: "Who sees it",
    body: [
      "Only the Nataka team members handling your enquiry or project. We use trusted providers to run our tools: Meta (Facebook, Instagram and WhatsApp), Google (email and documents) and Vercel (website hosting). They process data for us under their own terms and safeguards.",
      "We never sell or rent your details, and we never share them with other advertisers.",
    ],
  },
  {
    n: "06",
    title: "Where it is stored",
    body: [
      "Some of these providers store data on servers outside Kenya. We only use established providers that protect personal data to the standard Kenyan law expects for transfers abroad.",
    ],
  },
  {
    n: "07",
    title: "How long we keep it",
    body: [
      "If your enquiry does not become a project, we delete your details within 12 months of our last conversation. If you become a client, we keep project and billing records for as long as the contract and Kenyan tax law require.",
    ],
  },
  {
    n: "08",
    title: "Your rights",
    body: [
      "Under the Data Protection Act 2019 you can ask what we hold about you, ask us to correct it or delete it, object to how we use it, and withdraw your consent at any time. Send the request by email or WhatsApp and we will reply within 14 days.",
      "If you are not happy with our answer, you can complain to the Office of the Data Protection Commissioner at odpc.go.ke.",
    ],
  },
  {
    n: "09",
    title: "Keeping it safe",
    body: [
      "We take reasonable technical and organisational measures to protect your details, including limiting access to the people who need it for your enquiry.",
    ],
  },
  {
    n: "10",
    title: "Changes",
    body: [
      "Our services are for businesses and organisations, and we do not knowingly collect details from anyone under 18. If this notice changes, we will update the date below.",
    ],
  },
];

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "article" },
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="min-h-screen text-cream font-sans">
      <Navbar />

      <section className="px-6 md:px-12 pt-36 md:pt-48 pb-10 md:pb-14 max-w-7xl mx-auto">
        <p className="font-sans font-medium text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-cream/70 mb-6">
          Privacy notice
        </p>
        <h1 className="font-heading font-extrabold uppercase stretch-wide tracking-[-0.025em] leading-[0.95] text-[clamp(2.2rem,6vw,5.6rem)] max-w-[17ch] [text-wrap:balance]">
          <span className="text-white">Your details, </span>
          <span className="text-accent-dark">handled with care</span>
          <span className="text-signal">.</span>
        </h1>
        <p className="mt-7 font-sans text-cream/75 text-base md:text-lg leading-relaxed max-w-[58ch]">
          What we collect when you contact Nataka, why, who sees it and how to ask us to change or delete it.
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-cream/50">Updated {updated}</p>
      </section>

      <section aria-label="Privacy notice" className="px-6 md:px-12 pb-24 md:pb-32 max-w-7xl mx-auto">
        <ol className="border-t border-white/10">
          {sections.map((s) => (
            <li key={s.n} className="grid grid-cols-12 gap-x-6 gap-y-3 py-8 md:py-10 border-b border-white/10">
              <span className="col-span-12 md:col-span-1 font-mono text-xs text-cream/50 md:pt-2 tabular-nums">{s.n}</span>
              <h2 className="col-span-12 md:col-span-4 font-heading font-bold uppercase stretch-semi text-white tracking-[-0.01em] leading-tight text-[clamp(1.15rem,2vw,1.6rem)]">
                {s.title}
              </h2>
              <div className="col-span-12 md:col-span-7 space-y-4">
                {s.body.map((p, i) => (
                  <p key={i} className="font-sans text-cream/70 text-base leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 font-sans text-sm text-cream/65">
          <a href={`mailto:${EMAIL}?subject=Privacy%20request`} className="hover:text-accent transition-colors">
            Email a privacy request
          </a>
          <a
            href={waLink(`Source: ${url}\nHi Nataka, I have a privacy request about my details: `)}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            WhatsApp a privacy request
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
