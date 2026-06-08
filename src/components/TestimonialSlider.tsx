"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Quote } from "lucide-react";

const testimonials = [
  {
    author: "Rajesh Kumar",
    role: "Villa Owner",
    project: "Meghana Villas – Vemulawada",
    quote: "The quality of construction is exceptional. The team was highly professional and the Vastu compliance was done with great care. My family couldn't be happier with our new home near the temple.",
    image: "/meghana-4.jpeg",
  },
  {
    author: "Srinivas Reddy",
    role: "Plot Owner",
    project: "Meghana Gated Community",
    quote: "I invested in a plot and the experience was seamless from start to finish. The underground infrastructure, black top roads, and security setup are world-class. Highly recommend Meghana Builders.",
    image: "/meghana-9.jpeg",
  },
  {
    author: "Priya Lakshmi",
    role: "Homeowner",
    project: "Meghana Villas – 3BHK",
    quote: "What impressed me most was their attention to detail — from the eco-friendly park to the children's play area. Meghana truly understands what makes a community great.",
    image: "/meghana-10.jpeg",
  },
  {
    author: "Venkat Sharma",
    role: "Real Estate Investor",
    project: "Meghana Builders Partnership",
    quote: "As an investor, I've worked with many builders. Meghana stands out for their transparency, timely delivery, and uncompromising quality. A truly reliable partner.",
    image: "/meghana-16.jpeg",
  },
  {
    author: "Anitha Devi",
    role: "Happy Resident",
    project: "Meghana Villas",
    quote: "Living near Vemulawada Temple was always my dream. Meghana made it a reality with a beautiful villa, great security, and a wonderful community of neighbors. Life is peaceful here.",
    image: "/meghana-2.jpeg",
  },
];

export default function TestimonialSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      const timer = setTimeout(checkScroll, 100);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        clearTimeout(timer);
      };
    }
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const cardEl = container.firstElementChild as HTMLElement;
      const cardWidth = cardEl ? cardEl.clientWidth + 24 : container.clientWidth;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white dark:bg-[#0B0F19] text-black dark:text-white py-24 px-6 lg:px-12 border-t border-gray-100 dark:border-white/10 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header Block */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs uppercase text-[#11385B] dark:text-[#4A9DD4] tracking-widest font-semibold block">
              Testimonials
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-black dark:text-white">
              What Our Clients Say
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 px-6 py-3 bg-[#11385B] hover:bg-primary-hover text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <span>See All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Slider Navigation */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScroll("left")}
                disabled={!canScrollLeft}
                className={`p-3 rounded-full border transition-all ${
                  !canScrollLeft
                    ? "border-gray-100 dark:border-white/5 text-gray-300 dark:text-gray-600 pointer-events-none"
                    : "border-gray-200 dark:border-white/20 hover:border-[#11385B] dark:hover:border-white text-black dark:text-white hover:text-[#11385B] dark:hover:text-white"
                }`}
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleScroll("right")}
                disabled={!canScrollRight}
                className={`p-3 rounded-full border transition-all ${
                  !canScrollRight
                    ? "border-gray-100 dark:border-white/5 text-gray-300 dark:text-gray-600 pointer-events-none"
                    : "border-gray-200 dark:border-white/20 hover:border-[#11385B] dark:hover:border-white text-black dark:text-white hover:text-[#11385B] dark:hover:text-white"
                }`}
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden w-full">
          <div
            ref={sliderRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4 w-full"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="w-[85vw] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start group flex flex-col justify-between border border-gray-100 dark:border-white/10 hover:border-gray-200 dark:hover:border-white/20 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 relative aspect-[9/12]"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30 z-10" />
                  <img
                    src={t.image}
                    alt={t.author}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 p-7 flex flex-col justify-between h-full text-white">
                  <div className="space-y-4">
                    <Quote className="w-8 h-8 text-[#4A9DD4] rotate-180 opacity-80" />
                    <p className="text-sm font-light leading-relaxed text-gray-200 line-clamp-6">
                      {t.quote}
                    </p>
                  </div>

                  <div className="space-y-1 border-t border-white/15 pt-5">
                    <cite className="not-italic text-sm font-bold block text-white">
                      {t.author}
                    </cite>
                    <span className="text-xs text-[#4A9DD4] font-medium block">{t.role}</span>
                    <span className="text-[10px] text-white/50 font-light uppercase tracking-wider block">
                      {t.project}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
