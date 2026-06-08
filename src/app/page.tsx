"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";

import ScrollSequence from "@/components/ScrollSequence";
import CinemaTextSequence from "@/components/CinemaTextSequence";
import VideoShowcase from "@/components/VideoShowcase";
import LocalWork from "@/components/LocalWork";
import CultureTabs from "@/components/CultureTabs";
import MapSection from "@/components/MapSection";
import SafetySection from "@/components/SafetySection";
import TestimonialSlider from "@/components/TestimonialSlider";

import { motion } from "framer-motion";

export default function Home() {
  const revealLeft = {
    initial: { opacity: 0, x: -120, y: 40, scale: 0.9, rotateY: -15, filter: "blur(12px)" },
    whileInView: { opacity: 1, x: 0, y: 0, scale: 1, rotateY: 0, filter: "blur(0px)" },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 1.2, type: "spring" as const, bounce: 0.3 }
  };

  const revealRight = {
    initial: { opacity: 0, x: 120, y: 40, scale: 0.9, rotateY: 15, filter: "blur(12px)" },
    whileInView: { opacity: 1, x: 0, y: 0, scale: 1, rotateY: 0, filter: "blur(0px)" },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 1.2, type: "spring" as const, bounce: 0.3 }
  };

  return (
    <div className="flex flex-col w-full min-h-screen overflow-hidden">
      {/* 1. Main Hero Section with Autoplay Video & Slide-out drawer */}
      <HeroSection />

      {/* 2. Cinema Text Sequence (rolls up from bottom like end cards) */}
      <CinemaTextSequence />

      {/* 3. Fullscreen Video Showcase */}
      <VideoShowcase />

      {/* 4. Viewport-Locked Parallax Scroll Sequence */}
      <ScrollSequence />

      {/* 3. Local Work Section - Villa Community near Vemulawada Temple */}
      <motion.div {...revealLeft}>
        <LocalWork />
      </motion.div>

      {/* 4. Why Meghana - Promise Tabs */}
      <motion.div {...revealRight}>
        <CultureTabs />
      </motion.div>

      {/* 5. India Map & Office Locations */}
      <motion.div {...revealLeft}>
        <MapSection />
      </motion.div>

      {/* 6. Track Record - Stats & Project Highlights */}
      <motion.div {...revealRight}>
        <SafetySection />
      </motion.div>

      {/* 7. Client Testimonials */}
      <motion.div {...revealLeft}>
        <TestimonialSlider />
      </motion.div>

      {/* 8. Bottom Architectural Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
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
