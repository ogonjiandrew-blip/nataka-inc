"use client";

const services = [
  { label: "Video Production", href: "/services/video-production-nairobi" },
  { label: "Corporate Video", href: "/services/corporate-video-production-kenya" },
  { label: "Music Videos", href: "/services/music-video-production-nairobi" },
  { label: "Brand Strategy", href: "/services/brand-strategy-kenya" },
  { label: "Social Media Marketing", href: "/services/social-media-marketing-kenya" },
  { label: "Digital Marketing", href: "/services/digital-marketing-nairobi" },
  { label: "Event Video", href: "/services/event-video-production-kenya" },
  { label: "Automotive Marketing", href: "/services/automotive-marketing-kenya" },
  { label: "All Services →", href: "/services" },
];

const company = [
  { label: "Work", href: "/#work" },
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
              NATAKA<span className="text-teal">.</span>INC
            </span>
            <p className="font-sans text-white/60 text-xs leading-relaxed max-w-[220px]">
              Media &amp; marketing agency in Nairobi, Kenya. Film, music videos, brand
              strategy and campaigns for brands that refuse to be ignored.
            </p>
          </div>

          <div>
            <h3 className="font-sans text-[10px] text-teal tracking-widest uppercase mb-4">Services</h3>
            <ul className="space-y-2.5">
              {services.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="font-sans text-xs text-white/50 hover:text-teal transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-[10px] text-teal tracking-widest uppercase mb-4">Company</h3>
            <ul className="space-y-2.5">
              {company.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="font-sans text-xs text-white/50 hover:text-teal transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-[10px] text-teal tracking-widest uppercase mb-4">Contact</h3>
            <ul className="space-y-2.5 font-sans text-xs text-white/50">
              <li>
                <a href="mailto:andrew@natakainc.com" className="hover:text-teal transition-colors">
                  andrew@natakainc.com
                </a>
              </li>
              <li>
                <a href="tel:+254725107294" className="hover:text-teal transition-colors">
                  +254 725 107 294
                </a>
              </li>
              <li className="text-white/55">Westlands, Nairobi, Kenya</li>
            </ul>
            <div className="flex gap-4 mt-5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[10px] text-white/55 tracking-widest uppercase hover:text-teal transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-sans text-white/55 text-[11px] tracking-wider">
            © {new Date().getFullYear()} Nataka Inc. All rights reserved.
          </p>
          <p className="font-sans text-white/50 text-[11px] tracking-wider">
            Made in Nairobi. Built to travel.
          </p>
        </div>

      </div>
    </footer>
  );
}
