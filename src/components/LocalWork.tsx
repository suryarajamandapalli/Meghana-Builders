"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LocalWork() {
  return (
    <section className="relative w-full bg-white dark:bg-[#0B0F19] py-24 md:py-32 overflow-hidden border-b border-gray-100 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Image with Scroll Reveal */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] md:aspect-[1.4] shadow-2xl group cursor-pointer">
              {/* Overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

              {/* Image */}
              <motion.img
                src="/meghana-10.jpeg"
                alt="Meghana Villa Community - Vemulawada"
                className="w-full h-full object-cover transform duration-700 ease-out group-hover:scale-105"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8 }}
              />

              {/* Image caption badge */}
              <div className="absolute bottom-4 left-4 z-20 bg-[#11385B]/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <p className="text-xs font-bold uppercase tracking-widest">Meghana Villas</p>
                <p className="text-[10px] text-white/70">Vemulawada, Telangana</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Typography */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8 lg:pl-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              {/* Badge */}
              <span className="text-xs uppercase font-extrabold tracking-[0.25em] text-[#11385B] block">
                Vemulawada, Telangana
              </span>

              {/* Main Heading */}
              <h2 className="text-black dark:text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.15]">
                Built For Your<br className="hidden md:inline" />
                <span className="font-semibold text-gray-900 dark:text-gray-100"> Community</span>
              </h2>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="md:pl-16 lg:pl-24 space-y-6"
            >
              <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl font-light leading-relaxed">
                Together we can grow communities, strengthen economies, and improve lives.
                Near the sacred Vemulawada Temple and well-connected by bypass roads — Meghana Villas
                delivers homes that give you the classiness you expect, priced perfectly.
              </p>

              <div className="w-12 h-[2px] bg-[#11385B]" />

              {/* Proximity Highlights */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Collectorate", time: "5 Min" },
                  { label: "Vemulawada Temple", time: "5 Min" },
                  { label: "Bus Stand", time: "3 Min" },
                  { label: "Nandi Circle", time: "1 Min" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#11385B] shrink-0" />
                    <span className="text-xs text-gray-600 dark:text-gray-400 font-light">
                      <strong className="font-semibold text-black dark:text-white">{item.time}</strong> to {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-3 text-xs uppercase font-extrabold tracking-widest text-[#11385B] hover:opacity-80 transition-opacity group"
              >
                <span>Book a Visit Today</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background Subtle Accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50/30 dark:bg-blue-950/10 rounded-full blur-3xl -z-10" />
    </section>
  );
}
