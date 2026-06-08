"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useCMS } from "@/context/CMSContext";

export default function CinemaTextSequence() {
  const { cmsData } = useCMS();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create a scroll sequence that acts like cinema end cards
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Fast scroll effect to mimic rolling credits
  const textY = useTransform(scrollYProgress, [0, 1], ["40vh", "-40vh"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative h-[120vh] bg-black w-full overflow-hidden flex flex-col items-center justify-center">
      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        className="text-center px-6 max-w-5xl mx-auto flex flex-col items-center justify-center"
      >
        <h2 className="text-white text-[clamp(40px,6vw,90px)] font-bold tracking-tight leading-tight mb-6">
          {cmsData.heroTitle || "Meghana Builders"}
        </h2>
        <p className="text-[#4A9DD4] text-2xl md:text-4xl font-semibold tracking-[0.2em] uppercase mb-12">
          {cmsData.heroTagline || "Build your dreams."}
        </p>
        <p className="text-white/60 text-xl md:text-2xl font-light uppercase tracking-widest">
          What do you want to build?
        </p>
      </motion.div>
    </section>
  );
}
