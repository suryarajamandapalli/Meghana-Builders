"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { useCMS } from "@/context/CMSContext";

export default function HeroSection() {
  const { cmsData } = useCMS();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [preloadStage, setPreloadStage] = useState<'video' | 'transitioning' | 'hero'>('video');
  const [isDark, setIsDark] = useState(false);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  // Sync theme changes dynamically
  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Preloader stage timers
  useEffect(() => {
    // 4.2 seconds play time
    const fadeTimer = setTimeout(() => {
      setPreloadStage('transitioning');
    }, 4200);

    // Fade transition complete
    const endTimer = setTimeout(() => {
      setPreloadStage('hero');
    }, 5200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, []);

  // GSAP Animations when hero is revealed
  useEffect(() => {
    if (preloadStage !== 'hero') return;

    // Scroll indicator pulse animation
    gsap.to(".scroll-down-line", {
      y: 15,
      repeat: -1,
      duration: 1.5,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Stagger headline words on mount
    const words = headlineRef.current?.querySelectorAll(".word-inner");
    if (words) {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo(
        words,
        { y: "105%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.2, stagger: 0.12, ease: "power4.out" }
      );
      if (subRef.current) {
        tl.fromTo(
          subRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.5"
        );
      }
    }
  }, [preloadStage]);

  return (
    <>
      {/* 1. Fullscreen Preloader Overlay */}
      {preloadStage !== 'hero' && (
        <div
          className={`fixed inset-0 z-[100] bg-[#0B0F19] flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${
            preloadStage === 'transitioning' ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {/* Circular mask showing only the logo spinning, cropping out the right-side text */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden flex items-center justify-center bg-[#7e7e7e] shadow-2xl border-4 border-white/15">
            <video
              autoPlay
              muted
              playsInline
              className="absolute w-[220%] h-[110%] max-w-none object-cover left-[-45%] top-[-5%]"
            >
              <source src="/BG Video.mp4" type="video/mp4" />
            </video>
          </div>
          <p className="mt-8 text-white/50 text-[10px] tracking-[0.3em] uppercase font-bold animate-pulse">
            Meghana Builders
          </p>
        </div>
      )}

      {/* 2. Main Hero Section */}
      <section className="relative h-screen w-full bg-white dark:bg-[#0B0F19] text-black dark:text-white transition-colors duration-500 overflow-hidden flex items-center justify-center">
        {/* Large Watermark Monogram behind the text */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none">
          <img
            src="/logo/FINAL LOGO-02.png"
            alt="Meghana Builders Watermark"
            className={`w-[85vw] h-[85vw] max-w-[550px] max-h-[550px] object-contain transition-all duration-500 ${
              isDark ? "brightness-0 invert opacity-[0.06]" : "opacity-[0.035]"
            }`}
          />
        </div>

        {/* Grid overlay lines */}
        <div className="absolute inset-0 grid grid-cols-4 pointer-events-none z-10 opacity-[0.04] dark:opacity-[0.08] transition-opacity duration-500">
          <div className="border-r border-black dark:border-white h-full" />
          <div className="border-r border-black dark:border-white h-full" />
          <div className="border-r border-black dark:border-white h-full" />
          <div className="h-full" />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-6 lg:px-12 flex flex-col justify-between h-full pt-28 pb-12">
          <div className="my-auto space-y-8">
            {/* Main Headline */}
            <div ref={headlineRef}>
              <h1 className="text-black dark:text-white text-[clamp(36px,5.5vw,80px)] font-bold tracking-tight leading-tight transition-colors duration-500">
                <span className="block overflow-hidden py-1">
                  <span className="block word-inner">{cmsData.heroTitle}</span>
                </span>
              </h1>
              <p className="block overflow-hidden">
                <span 
                  className="block word-inner text-sm md:text-base font-semibold tracking-[0.2em] uppercase mt-2 transition-colors duration-500"
                  style={{ color: isDark ? "#38bdf8" : (cmsData.primaryColor || "#11385B") }}
                >
                  {cmsData.heroTagline}
                </span>
              </p>
            </div>

            {/* Sub CTA Button */}
            <div ref={subRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-3 transition-all duration-300 text-base md:text-lg font-medium uppercase tracking-wide border-b-2 pb-2"
                style={{ 
                  color: isDark ? "#ffffff" : (cmsData.primaryColor || "#11385B"),
                  borderColor: isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(17, 56, 91, 0.3)" 
                }}
              >
                <span>What do you want to build?</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* Scroll Down Line Indicator */}
          <div className="flex flex-col items-center mx-auto text-black/40 dark:text-white/40 text-[10px] uppercase tracking-widest font-semibold gap-2 transition-colors duration-500">
            <span>Scroll</span>
            <div className="relative w-[1px] h-10 bg-black/15 dark:bg-white/15 overflow-hidden">
              <div className="scroll-down-line absolute top-0 left-0 w-full h-4 bg-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* Full-screen Drawer Overlay (Unchanged functionally) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 overflow-y-auto"
          >
            {/* Close Button */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex justify-end">
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="flex items-center gap-2 text-white/60 hover:text-white uppercase text-xs font-semibold tracking-widest transition-colors py-2"
              >
                <span>Close</span>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-16 min-h-[calc(100vh-100px)] flex flex-col justify-center">
              <h2 className="text-white text-3xl md:text-4xl font-light uppercase tracking-wider mb-2">
                What We Build
              </h2>
              <p className="text-white/40 text-sm font-light mb-12">
                Choose a sector to explore our work in detail.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {/* 01 Residential */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="group flex flex-col border border-white/10 rounded-2xl overflow-hidden bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="/meghana-1.jpeg"
                      alt="Meghana Premium Villas"
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest text-sky-400">01</span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow space-y-3">
                    <h3 className="text-white text-2xl font-bold tracking-tight">Premium Villas</h3>
                    <p className="text-gray-400 text-sm font-light leading-relaxed flex-grow">
                      Vastu-compliant 3BHK premium villas in Vemulawada — near the sacred temple city.
                      1,066 to 1,400 sq. ft. with gated security, green park, and full infrastructure.
                    </p>
                    <Link
                      href="/projects"
                      onClick={() => setIsDrawerOpen(false)}
                      className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-white hover:text-sky-400 transition-colors group/link mt-2"
                    >
                      <span>View Projects</span>
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>

                {/* 02 Plots */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 }}
                  className="group flex flex-col border border-white/10 rounded-2xl overflow-hidden bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="/meghana-9.jpeg"
                      alt="Meghana Dream Plots"
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest text-sky-400">02</span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow space-y-3">
                    <h3 className="text-white text-2xl font-bold tracking-tight">Dream Plots</h3>
                    <p className="text-gray-400 text-sm font-light leading-relaxed flex-grow">
                      Gated community plots from 122 to 329 sq. yds. — Vastu true north, black top roads,
                      underground electrical, and full boundary compound wall.
                    </p>
                    <Link
                      href="/sectors"
                      onClick={() => setIsDrawerOpen(false)}
                      className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-white hover:text-sky-400 transition-colors group/link mt-2"
                    >
                      <span>Explore Sectors</span>
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>

                {/* 03 Partnership */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.26 }}
                  className="group flex flex-col border border-white/10 rounded-2xl overflow-hidden bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="/meghana-16.jpeg"
                      alt="Meghana Partnership"
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest text-sky-400">03</span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow space-y-3">
                    <h3 className="text-white text-2xl font-bold tracking-tight">Partnership</h3>
                    <p className="text-gray-400 text-sm font-light leading-relaxed flex-grow">
                      We collaborate with landowners, investors, and community stakeholders to deliver
                      premium construction services that redefine quality across Telangana.
                    </p>
                    <Link
                      href="/contact"
                      onClick={() => setIsDrawerOpen(false)}
                      className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-white hover:text-sky-400 transition-colors group/link mt-2"
                    >
                      <span>Collaborate With Us</span>
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
