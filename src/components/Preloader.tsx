"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setFade(true);
      setTimeout(() => setLoading(false), 800);
    };

    if (document.readyState === "complete") {
      setTimeout(handleLoad, 1000); // Give minimum 1s display time
    } else {
      window.addEventListener("load", handleLoad);
      const timeout = setTimeout(handleLoad, 2500); // 2.5s backup timeout
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(timeout);
      };
    }
  }, []);

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
