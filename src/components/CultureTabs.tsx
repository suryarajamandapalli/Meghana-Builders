"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface TabItem {
  id: string;
  num: string;
  label: string;
  badge: string;
  title: string;
  description: string;
  image: string;
}

const CULTURAL_TABS: TabItem[] = [
  {
    id: "vastu",
    num: "01",
    label: "Vastu Design",
    badge: "Vastu Shastra Compliant",
    title: "Planning as per Vastu",
    description: "Every home we build follows traditional Vastu principles, ensuring harmonious living spaces that bring positive energy, well-being, and prosperity to our residents.",
    image: "/meghana-1.jpeg",
  },
  {
    id: "quality",
    num: "02",
    label: "Premium Quality",
    badge: "Quality Construction",
    title: "Precision & Craftsmanship",
    description: "From concept to completion, every project reflects a balance between aesthetic vision and structural integrity — redefining how architecture meets the human experience.",
    image: "/meghana-5.jpeg",
  },
  {
    id: "community",
    num: "03",
    label: "Community",
    badge: "Community & Connectivity",
    title: "Near Vemulawada Temple",
    description: "Our Meghana Villas are strategically located near the sacred Sri Raja Rajeshwara Swami Temple and key civic landmarks, giving residents access to a thriving spiritual and social community.",
    image: "/meghana-10.jpeg",
  },
  {
    id: "safety",
    num: "04",
    label: "Security",
    badge: "Safety & Security",
    title: "24/7 Gated Community Security",
    description: "Meghana developments feature CCTV surveillance, intercom connectivity, fire fighting systems, and a compound wall for a completely secure, gated community living experience.",
    image: "/meghana-12.jpeg",
  },
  {
    id: "sustainability",
    num: "05",
    label: "Sustainability",
    badge: "Eco-Friendly Development",
    title: "Eco-Friendly Parks & Green Spaces",
    description: "Our layouts include meticulously crafted greenery, eco-friendly parks, and avenue trees — providing a lush, sustainable retreat for morning walks and quiet evenings.",
    image: "/meghana-11.jpeg",
  },
  {
    id: "lifestyle",
    num: "06",
    label: "Lifestyle",
    badge: "Modern Amenities",
    title: "Modern Amenities, Timeless Peace",
    description: "From children's play areas and ample visitor parking to underground electrical and drainage systems — Meghana delivers every modern amenity for a truly premium lifestyle.",
    image: "/meghana-15.jpeg",
  },
];

export default function CultureTabs() {
  const [activeIdx, setActiveIdx] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const menuEl = menuRef.current;
    if (!menuEl) return;

    let lastScrollTime = 0;
    const cooldown = 400;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastScrollTime < cooldown) return;

      if (e.deltaY > 0) {
        setActiveIdx((prev) => {
          if (prev < CULTURAL_TABS.length - 1) {
            lastScrollTime = now;
            return prev + 1;
          }
          return prev;
        });
      } else if (e.deltaY < 0) {
        setActiveIdx((prev) => {
          if (prev > 0) {
            lastScrollTime = now;
            return prev - 1;
          }
          return prev;
        });
      }
    };

    menuEl.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      menuEl.removeEventListener("wheel", onWheel);
    };
  }, []);

  const activeTab = CULTURAL_TABS[activeIdx];

  return (
    <section className="w-full bg-[#f8fafc] dark:bg-[#0b0f19] py-24 md:py-32 overflow-hidden border-b border-gray-100 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">

        {/* Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#11385B] dark:text-[#38bdf8] block mb-3">
              Why Meghana
            </span>
            <h2 className="text-black dark:text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]">
              Our <span className="font-semibold text-gray-900 dark:text-gray-100">Promise</span>
            </h2>
          </div>
          <div className="lg:col-span-8 lg:pt-6">
            <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-3xl">
              At Meghana Builders & Developers, architecture is not just about building structures —
              it's about creating meaningful spaces that connect people, culture, and environment.
              Every home tells a story of purpose and progress.
            </p>
          </div>
        </div>

        {/* Interactive Tabs Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

          {/* Left Column: Vertical Nav Card */}
          <div className="lg:col-span-3 flex">
            <div ref={menuRef} className="w-full bg-[#11385B] dark:bg-[#0d1322] border border-[#11385B] dark:border-white/10 text-white rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden select-none">
              {/* Decorative background shape */}
              <div className="absolute -right-24 -bottom-24 w-60 h-60 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-1 relative z-10 flex flex-col justify-between h-full">
                {CULTURAL_TABS.map((tab, idx) => {
                  const isActive = idx === activeIdx;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveIdx(idx)}
                      className={`w-full text-left py-4 px-4 rounded-xl flex items-center gap-4 group transition-all duration-300 relative ${
                        isActive
                          ? "bg-white dark:bg-white/10 text-[#11385B] dark:text-[#38bdf8] font-semibold"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <motion.div
                          layoutId="active-bar"
                          className="absolute left-0 top-1/4 bottom-1/4 w-[4px] bg-[#11385B] dark:bg-[#38bdf8] rounded-r-md"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}

                      <span className={`text-xs tracking-wider transition-colors ${
                        isActive ? "text-[#11385B] dark:text-[#38bdf8]" : "text-white/40"
                      }`}>
                        {tab.num}
                      </span>

                      <span className="text-sm md:text-base tracking-wide transition-all group-hover:translate-x-1">
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Animated Detail Box */}
          <div className="lg:col-span-9 bg-white dark:bg-[#0d1322] border border-gray-100 dark:border-white/10 rounded-2xl shadow-sm p-8 md:p-12 flex items-center overflow-hidden min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center w-full"
              >
                {/* Text Details */}
                <div className="md:col-span-7 space-y-6 flex flex-col justify-center">
                  <span className="text-[10px] md:text-xs font-extrabold tracking-[0.2em] text-[#11385B] dark:text-[#38bdf8] uppercase block">
                    {activeTab.badge}
                  </span>

                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-950 dark:text-white tracking-tight leading-[1.2]">
                    {activeTab.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 font-light leading-relaxed text-sm md:text-base">
                    {activeTab.description}
                  </p>

                  <div className="pt-4">
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-3 text-xs uppercase font-extrabold tracking-widest text-[#11385B] dark:text-[#38bdf8] hover:opacity-80 transition-opacity group"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </a>
                  </div>
                </div>

                {/* Tab Specific Image */}
                <div className="md:col-span-5">
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="relative overflow-hidden rounded-xl aspect-[4/3] shadow-lg bg-gray-50 border border-gray-100 dark:border-white/10"
                  >
                    <img
                      src={activeTab.image}
                      alt={activeTab.title}
                      className="w-full h-full object-cover transform hover:scale-105 duration-700"
                      loading="lazy"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
