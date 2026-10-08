const services = [
  { label: "Brand Promotion", href: "/services/brand-promotion-kenya" },
  { label: "Video Production", href: "/services/video-production-nairobi" },
  { label: "AI Video Production", href: "/services/ai-video-production-kenya" },
  { label: "The Nataka AI Standard", href: "/ai-standard" },
  { label: "Corporate Video", href: "/services/corporate-video-production-kenya" },
  { label: "Music Videos", href: "/services/music-video-production-nairobi" },
  { label: "Brand Strategy", href: "/services/brand-strategy-kenya" },
  { label: "Social Media Marketing", href: "/services/social-media-marketing-kenya" },
  { label: "Digital Marketing", href: "/services/digital-marketing-nairobi" },
  { label: "Event Video", href: "/services/event-video-production-kenya" },
  { label: "Automotive Marketing", href: "/services/automotive-marketing-kenya" },
  { label: "All services", href: "/services" },
];

const company = [
  { label: "Pricing", href: "/work-with-us" },
  { label: "Campaign Brief Builder", href: "/campaign-brief" },
  { label: "Work", href: "/#work" },
  { label: "Community", href: "/community" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/#about" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/natakainc/" },
  { label: "TikTok", href: "https://www.tiktok.com/@natakainc" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/128374044" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/8 px-6 md:px-12 pt-16 pb-10">
      <div className="max-w-7xl mx-auto">

        {/* Top — brand + link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">

          <div className="col-span-2 md:col-span-1">
            <span className="font-nataka font-black text-xl text-white tracking-tight uppercase block mb-4">
              NATAKA<span className="text-signal">.</span>INC
            </span>
            <p className="font-sans text-cream/60 text-sm leading-relaxed max-w-[260px]">
              Media and marketing agency in Nairobi, Kenya. Campaigns, films, music
              videos and AI video for brands and artists.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs text-cream/60 mb-4">Services</h3>
            <ul className="space-y-2.5">
              {services.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="font-sans text-sm text-cream/65 hover:text-accent transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs text-cream/60 mb-4">Company</h3>
            <ul className="space-y-2.5">
              {company.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="font-sans text-sm text-cream/65 hover:text-accent transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs text-cream/60 mb-4">Contact</h3>
            <ul className="space-y-2.5 font-sans text-sm text-cream/65">
              <li>
                <a href="mailto:andrew@natakainc.com" className="hover:text-accent transition-colors">
                  andrew@natakainc.com
                </a>
              </li>
              <li>
                <a href="tel:+254117386206" className="hover:text-accent transition-colors">
                  +254 117 386 206
                </a>
              </li>
              <li>Westlands, Nairobi, Kenya</li>
            </ul>
            <div className="flex gap-4 mt-5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-cream/65 hover:text-accent transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-sans text-cream/45 text-xs">
            © {new Date().getFullYear()} Nataka Inc. All rights reserved.
          </p>
          <p className="font-sans text-cream/45 text-xs">
            Made in Nairobi. Built to travel.
          </p>
        </div>

      </div>
    </footer>
  );
}
