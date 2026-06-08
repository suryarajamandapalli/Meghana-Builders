"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Only show when user scrolls past 50% of the scrollable height
      if (totalHeight > 0 && scrollY > totalHeight / 2) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-4 rounded-full bg-primary dark:bg-[#11385B] hover:bg-primary-hover dark:hover:bg-blue-600 text-white shadow-xl flex items-center justify-center cursor-pointer group transition-colors duration-300"
          aria-label="Scroll to top"
        >
          {/* Construction/Crane pulley themed upward arrow */}
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* crane wire/hook representation */}
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5M5 12l7-7 7 7" />
          </svg>

          {/* Blueprint grid pattern overlay on hover */}
          <span className="absolute inset-0 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
