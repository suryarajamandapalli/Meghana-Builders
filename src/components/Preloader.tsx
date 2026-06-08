"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Preloader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Show preloader on route change
    setLoading(true);
    setFade(false);
    setProgress(0);

    // Animate progress bar from 0 to 100
    const duration = 1400; // 1.4s to reach 100%
    const intervalTime = 15; // update every 15ms
    const totalSteps = duration / intervalTime;
    let step = 0;

    const progressInterval = setInterval(() => {
      step++;
      const currentProgress = Math.min(Math.round((step / totalSteps) * 100), 100);
      setProgress(currentProgress);
      if (step >= totalSteps) {
        clearInterval(progressInterval);
      }
    }, intervalTime);

    // Keep preloader visible for 1800ms so it doesn't flash too fast and looks premium
    const timeout = setTimeout(() => {
      setFade(true);
      const fadeTimeout = setTimeout(() => {
        setLoading(false);
      }, 600); // 600ms fade animation duration
      return () => clearTimeout(fadeTimeout);
    }, 1800);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0B0F19] flex flex-col items-center justify-center transition-opacity duration-600 ease-in-out ${
        fade ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6 max-w-xs w-full px-6">
        {/* Logo container with scale-in and pulse animation */}
        <div className="relative w-48 h-20 flex items-center justify-center animate-pulse duration-[3000ms]">
          <img
            src="/logo/FINAL LOGO-09-white.png"
            alt="Meghana Builders Logo"
            className="object-contain max-w-full max-h-full"
          />
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-full space-y-2">
          <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-white/40 tracking-[0.3em] uppercase font-bold">
            <span>Loading</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
