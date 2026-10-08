/** Credit line under the hero: names already credited elsewhere on the site, nothing invented. */
const credits = ["dance10fikshun", "MAXUS Kenya", "ChiQ", "Ssaru x Fathermoh", "Sarit Centre", "Vijana Barubaru", "Scar Mkadinali", "Teslah"];

export default function Credits() {
  return (
    <section aria-label="Recent credits" className="px-6 md:px-12 pt-12 md:pt-16 max-w-7xl mx-auto">
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-cream/45">Credits include</p>
      <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-10 md:gap-x-16 gap-y-3">
        {credits.map((c) => (
          <li
            key={c}
            className="font-heading font-bold uppercase stretch-semi text-xs md:text-sm tracking-[0.12em] text-cream/60"
          >
            {c}
          </li>
        ))}
      </ul>
    </section>
  );
}
