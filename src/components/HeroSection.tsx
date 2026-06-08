"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { useCMS } from "@/context/CMSContext";

export default function HeroSection() {
  const { cmsData } = useCMS();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const overlayOpacity = useTransform(scrollY, [0, 600], [0.0, 0.7]);
  const textY = useTransform(scrollY, [0, 800], [0, -400]);
  const textOpacity = useTransform(scrollY, [0, 200, 500, 800], [0, 1, 1, 0]);

  useEffect(() => {
    // Scroll indicator pulse
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
      const tl = gsap.timeline({ delay: 0.3 });
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
  }, []);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videos = ["/bg-video.mp4", "/2.mp4", "/3.mp4", "/4.mp4"];

  const handleVideoEnded = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  return (
    <>
      <section className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center">
        {/* Video background */}
        <div className="absolute inset-0 z-0">
          <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-black z-10" />
          <video
            key={currentVideoIndex}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover"
          >
            <source src={videos[currentVideoIndex]} type="video/mp4" />
          </video>
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 grid grid-cols-4 pointer-events-none z-10 opacity-[0.07]">
          <div className="border-r border-white h-full" />
          <div className="border-r border-white h-full" />
          <div className="border-r border-white h-full" />
          <div className="h-full" />
        </div>

        {/* Hero Content - Cinema Text Roll */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center pointer-events-none">
          <motion.div 
            style={{ y: textY, opacity: textOpacity }}
            className="text-center px-6 max-w-5xl mx-auto flex flex-col items-center justify-center mt-32"
          >
            <div ref={headlineRef}>
              <h1 className="text-white text-[clamp(40px,6vw,90px)] font-bold tracking-tight leading-tight mb-6">
                <span className="block overflow-hidden py-1">
                  <span className="block word-inner">{cmsData.heroTitle || "Meghana Builders"}</span>
                </span>
              </h1>
              <p className="block overflow-hidden">
                <span className="block word-inner text-[#4A9DD4] text-2xl md:text-4xl font-semibold tracking-[0.2em] uppercase mb-12">
                  {cmsData.heroTagline || "Build your dreams."}
                </span>
              </p>
            </div>
            
            <div ref={subRef} className="opacity-0 translate-y-6">
              <p className="text-white/80 text-xl md:text-2xl font-light uppercase tracking-widest">
                What do you want to build?
              </p>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 z-20 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/40 text-[10px] uppercase tracking-widest font-semibold gap-2">
          <span>Scroll</span>
          <div className="relative w-[1px] h-10 bg-white/15 overflow-hidden">
            <div className="scroll-down-line absolute top-0 left-0 w-full h-4 bg-[#4A9DD4]" />
          </div>
        </div>
      </section>

      {/* Full-screen Drawer Overlay */}
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
                    <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest text-[#4A9DD4]">01</span>
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
                      className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-white hover:text-[#4A9DD4] transition-colors group/link mt-2"
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
                    <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest text-[#4A9DD4]">02</span>
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
                      className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-white hover:text-[#4A9DD4] transition-colors group/link mt-2"
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
                    <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest text-[#4A9DD4]">03</span>
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
                      className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-white hover:text-[#4A9DD4] transition-colors group/link mt-2"
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
