"use client";

const marqueeLogos = [
  {
    name: "Crain's Award",
    src: "https://www.clunegc.com/wp-content/uploads/2025/11/Crains-Award-Header-white-768x766.png",
  },
  {
    name: "ENR Midwest",
    src: "https://www.clunegc.com/wp-content/uploads/2025/11/ENR-Midwest-white.png",
  },
  {
    name: "Merit Awards",
    src: "https://www.clunegc.com/wp-content/uploads/2025/11/MERIT-AWARDS-white.png",
  },
  {
    name: "Best Places to Work",
    src: "https://www.clunegc.com/wp-content/uploads/2025/11/2022_best_places_to_work-white.png",
  },
  {
    name: "Best Managed",
    src: "https://www.clunegc.com/wp-content/uploads/2025/11/bestmanaged-white.png",
  },
  {
    name: "LA Business Journal",
    src: "https://www.clunegc.com/wp-content/uploads/2025/11/la-business-journal-white.png",
  },
];

export default function Marquee() {
  // Duplicate the list of logos to create the infinite loop effect
  const doubleLogos = [...marqueeLogos, ...marqueeLogos, ...marqueeLogos];

  return (
    <section className="bg-charcoal text-white py-20 border-t border-gray-900 overflow-hidden cursor-section select-none">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-10">
        <span className="text-xs uppercase text-primary tracking-widest font-semibold block mb-2">
          Recognition
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Awards & Recognition
        </h2>
      </div>

      {/* Infinite scrolling marquee track */}
      <div className="relative w-full flex items-center overflow-hidden py-4 bg-black/20">
        <div className="animate-marquee-slow flex gap-16 md:gap-24 items-center whitespace-nowrap">
          {doubleLogos.map((logo, idx) => (
            <div
              key={`${logo.name}-${idx}`}
              className="w-24 md:w-32 h-16 md:h-20 flex items-center justify-center grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-300 shrink-0"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="max-w-full max-h-full object-contain filter invert"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
