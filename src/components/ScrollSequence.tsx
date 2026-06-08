"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the container relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Calculate different parallax translation distances for each column
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-[#0B0F19] text-white flex items-center justify-center py-20"
    >
      {/* Parallax Image Columns Grid in the background */}
      <div className="absolute inset-0 grid grid-cols-3 gap-4 md:gap-8 p-4 md:p-8 opacity-40 z-0 select-none pointer-events-none">
        
        {/* Column 1 - scrolls up */}
        <motion.div style={{ y: y1 }} className="flex flex-col gap-4 md:gap-8 h-[130%]">
          <div className="relative w-full aspect-[3/4] md:aspect-[2/3] rounded-lg overflow-hidden bg-gray-900">
            <img
              src="/meghana-1.jpeg"
              alt="Meghana Builders Construction Site"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative w-full aspect-[3/4] md:aspect-[2/3] rounded-lg overflow-hidden bg-gray-900">
            <img
              src="/meghana-2.jpeg"
              alt="Meghana Premium Residential"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Column 2 - scrolls down */}
        <motion.div style={{ y: y2 }} className="flex flex-col gap-4 md:gap-8 h-[130%] -translate-y-[15%]">
          <div className="relative w-full aspect-[3/4] md:aspect-[2/3] rounded-lg overflow-hidden bg-gray-900">
            <img
              src="/meghana-4.jpeg"
              alt="Meghana Villa Interior"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative w-full aspect-[3/4] md:aspect-[2/3] rounded-lg overflow-hidden bg-gray-900">
            <img
              src="/meghana-5.jpeg"
              alt="Meghana Architecture Design"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Column 3 - scrolls up slightly slower */}
        <motion.div style={{ y: y3 }} className="flex flex-col gap-4 md:gap-8 h-[130%]">
          <div className="relative w-full aspect-[3/4] md:aspect-[2/3] rounded-lg overflow-hidden bg-gray-900">
            <img
              src="/meghana-7.jpeg"
              alt="Meghana Project Delivery"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative w-full aspect-[3/4] md:aspect-[2/3] rounded-lg overflow-hidden bg-gray-900">
            <img
              src="/meghana-8.jpeg"
              alt="Meghana Quality Construction"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Dark Overlay Mask for contrast */}
      <div className="absolute inset-0 bg-[#0B0F19]/60 z-10 pointer-events-none" />

      {/* Central Overlay Content */}
      <div className="relative inset-0 flex items-center justify-center z-20 max-w-5xl mx-auto px-6 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#0B0F19]/75 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-2xl flex flex-col items-center justify-center text-center space-y-8 shadow-2xl max-w-3xl w-full"
        >
          <h2 className="text-white text-base md:text-2xl lg:text-3xl font-light tracking-wide leading-relaxed max-w-2xl">
            Meghana's mission is to redefine the future of architecture and construction through innovation, sustainability, and excellence — creating meaningful spaces that connect people, culture, and community.
          </h2>

          <div className="w-12 h-[2px] bg-sky-400" />

          <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 px-6 py-3 bg-[#11385B] hover:bg-[#1b4e7e] text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
            >
              <span>Our Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-6 py-3 border border-white hover:bg-white hover:text-black text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
