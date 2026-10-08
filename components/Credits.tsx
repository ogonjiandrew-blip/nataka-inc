/** Credit line under the hero: names already credited elsewhere on the site, nothing invented. */
const credits = ["Ssaru x Fathermoh", "Vijana Barubaru ft. Scar Mkadinali", "Sarit Centre", "Teslah"];

export default function Credits() {
  return (
    <section aria-label="Recent credits" className="border-y border-white/8 bg-ink-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 md:py-7 flex flex-col md:flex-row md:items-center gap-3 md:gap-12">
        <p className="font-mono text-xs text-cream/60 shrink-0">Recent credits</p>
        <ul className="flex flex-wrap gap-x-8 md:gap-x-12 gap-y-2">
          {credits.map((c) => (
            <li key={c} className="font-heading font-semibold text-sm md:text-base text-cream/75 tracking-tight">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
