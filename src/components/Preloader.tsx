"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Preloader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Show preloader on route change
    setLoading(true);
    setFade(false);

    // Keep preloader visible for 900ms so it doesn't flash too fast
    const timeout = setTimeout(() => {
      setFade(true);
      const fadeTimeout = setTimeout(() => {
        setLoading(false);
      }, 500); // 500ms fade animation duration
      return () => clearTimeout(fadeTimeout);
    }, 900);

    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0B0F19] flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${
        fade ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Premium Minimal Spinner */}
        <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-white animate-spin" />
        <span className="text-[9px] text-white/30 tracking-[0.4em] uppercase font-bold animate-pulse">
          Meghana
        </span>
      </div>
    </div>
  );
}
