"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCMS } from "@/context/CMSContext";

export default function FeaturedBuild() {
  const { cmsData } = useCMS();

  return (
    <section className="relative w-full bg-[#0B0F19] text-white border-b border-white/10 overflow-hidden py-16 px-6 lg:px-12 font-sans">
      {/* Subtle blueprint grid in the background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="border-r border-b border-white" />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Top Header block: typographically styled like Edifis */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-8">
          <div>
            <h2 className="text-white text-[clamp(40px,7vw,110px)] font-extrabold tracking-tighter leading-none select-none uppercase">
              MEGHANA
            </h2>
          </div>
          <div className="text-right">
            <h3 className="text-white text-[clamp(28px,4.5vw,70px)] font-bold tracking-tighter leading-none select-none uppercase text-white/90">
              THE PASSION IS BUILT-IN
            </h3>
          </div>
        </div>

        {/* Thin horizontal line separator */}
        <div className="w-full h-[1px] bg-white/20" />

        {/* Bottom grid elements */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          
          {/* Left Column: Featured Space Card (4 cols) */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 border border-white/10 rounded-xl p-4 bg-white/5 backdrop-blur-sm shadow-lg max-w-md w-full">
            <div className="relative aspect-[4/3] w-full sm:w-1/2 lg:w-full overflow-hidden rounded-lg">
              <img
                src="/meghana-9.jpeg"
                alt="Meghana Featured Gated Community"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <span className="absolute bottom-2 left-2 bg-[#11385B] text-white text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                Featured Space
              </span>
            </div>
            <div className="flex flex-col justify-between flex-grow space-y-3 pt-2">
              <div>
                <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider block mb-1">
                  Premium Plots & Villas
                </span>
                <h4 className="text-lg font-bold text-white tracking-tight">
                  Vemulawada Gated Community
                </h4>
              </div>
              <div className="flex items-center justify-between text-xs text-white/50 pt-2 border-t border-white/10">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  Bookings Open
                </span>
                <span>Vemulawada</span>
              </div>
            </div>
          </div>

          {/* Center Column: Description paragraph (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:px-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-sky-400 block">
              Real-estate development driven by purpose
            </span>
            <p className="text-white/80 text-sm md:text-base font-light leading-relaxed">
              At Meghana Builders, we bring passion and purpose to everything we build – from premium residential gated communities that make room for your dreams to luxury villas and commercial structures that help Vemulawada grow. Our commitment to excellence, transparency, and Vastu compliance is built-in.
            </p>
          </div>

          {/* Right Column: Menu links list (3 cols) */}
          <div className="lg:col-span-3 w-full">
            <ul className="flex flex-col w-full text-sm font-semibold uppercase tracking-wider">
              {([
                { name: "Our Projects", href: "/projects" },
                { name: "Our Sectors", href: "/sectors" },
                { name: "About Us", href: "/about" },
                { name: "Contact Us", href: "/contact" },
              ] as const).map((link, i) => (
                <li key={i} className="border-b border-white/10 last:border-b-0">
                  <Link
                    href={link.href}
                    className="flex justify-between items-center py-4 text-white/60 hover:text-white transition-colors group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
