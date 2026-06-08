"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";

import ScrollSequence from "@/components/ScrollSequence";
import LocalWork from "@/components/LocalWork";
import CultureTabs from "@/components/CultureTabs";
import MapSection from "@/components/MapSection";
import SafetySection from "@/components/SafetySection";
import TestimonialSlider from "@/components/TestimonialSlider";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen overflow-hidden">
      {/* 1. Main Hero Section with Autoplay Video & Slide-out drawer */}
      <HeroSection />

      {/* 2. Viewport-Locked Parallax Scroll Sequence with Mission Statement */}
      <ScrollSequence />

      {/* 3. Local Work Section - Villa Community near Vemulawada Temple */}
      <LocalWork />


      {/* 5. Why Meghana - Promise Tabs */}
      <CultureTabs />

      {/* 6. India Map & Office Locations */}
      <MapSection />

      {/* 7. Track Record - Stats & Project Highlights */}
      <SafetySection />

      {/* 8. Client Testimonials */}
      <TestimonialSlider />

      {/* 9. Bottom Architectural Banner */}
      <div className="w-full relative h-[40vw] min-h-[280px] max-h-[480px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10" />
        <img
          src="/meghana-13.jpeg"
          alt="Meghana Builders & Developers - Premium Construction Elevation"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </div>
    </div>
  );
}
