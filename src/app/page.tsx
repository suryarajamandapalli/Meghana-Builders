"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";

import ScrollSequence from "@/components/ScrollSequence";
import LocalWork from "@/components/LocalWork";
import CultureTabs from "@/components/CultureTabs";
import MapSection from "@/components/MapSection";
import SafetySection from "@/components/SafetySection";
import TestimonialSlider from "@/components/TestimonialSlider";

import { motion } from "framer-motion";

export default function Home() {
  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="flex flex-col w-full min-h-screen overflow-hidden">
      {/* 1. Main Hero Section with Autoplay Video & Slide-out drawer */}
      <HeroSection />

      {/* 2. Viewport-Locked Parallax Scroll Sequence with Mission Statement */}
      <ScrollSequence />

      {/* 3. Local Work Section - Villa Community near Vemulawada Temple */}
      <motion.div {...fadeUp}>
        <LocalWork />
      </motion.div>

      {/* 4. Why Meghana - Promise Tabs */}
      <motion.div {...fadeUp}>
        <CultureTabs />
      </motion.div>

      {/* 5. India Map & Office Locations */}
      <motion.div {...fadeUp}>
        <MapSection />
      </motion.div>

      {/* 6. Track Record - Stats & Project Highlights */}
      <motion.div {...fadeUp}>
        <SafetySection />
      </motion.div>

      {/* 7. Client Testimonials */}
      <motion.div {...fadeUp}>
        <TestimonialSlider />
      </motion.div>

      {/* 8. Bottom Architectural Banner */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="w-full relative h-[40vw] min-h-[280px] max-h-[480px] overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10" />
        <img
          src="/meghana-13.jpeg"
          alt="Meghana Builders & Developers - Premium Construction Elevation"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </motion.div>
    </div>
  );
}
