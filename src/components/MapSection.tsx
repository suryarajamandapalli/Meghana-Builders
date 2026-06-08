"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Phone, MapPin, Mail, ZoomIn, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCMS } from "@/context/CMSContext";

export default function MapSection() {
  const { cmsData } = useCMS();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeOffice, setActiveOffice] = useState<string | null>(null);

  const offices = [
    {
      name: "Vemulawada (HQ)",
      address: cmsData.hqAddress,
      phone: cmsData.contactPhone,
      email: cmsData.contactEmail,
      badge: "Headquarters",
    },
    {
      name: "Hyderabad",
      address: cmsData.hyderabadAddress,
      phone: cmsData.contactPhone,
      email: "hyderabad@meghanabuilders.com",
      badge: "Regional Office",
    },
    {
      name: "Karimnagar",
      address: cmsData.karimnagarAddress,
      phone: cmsData.contactPhone,
      email: "karimnagar@meghanabuilders.com",
      badge: "Regional Office",
    },
  ];

  return (
    <section className="bg-white dark:bg-[#0B0F19] text-black dark:text-white py-24 px-6 lg:px-12 border-t border-gray-100 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-[0.25em] text-[#11385B] dark:text-sky-400 block">
              Layout Master Plan
            </span>
            <h2 className="text-[clamp(32px,4vw,56px)] font-bold tracking-tight leading-none text-black dark:text-white">
              Gated Community Layout Plan
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm font-light max-w-xl leading-relaxed">
              Explore the proposed residential layout for our premium gated community in Vemulawada, featuring 100% Vastu-compliant plots with modern underground drainage, water, and electrical infrastructure.
            </p>
          </div>
          <div className="lg:col-span-6 flex lg:justify-end">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-6 py-3 bg-[#11385B] hover:bg-primary-hover text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>Book a Plot / Villa Visit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

          {/* Master Layout Map Graphic */}
          <div className="lg:col-span-8 relative group bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center min-h-[350px] md:min-h-[500px]">
            <img
              src="/layout-map-horizontal.jpg"
              alt="Meghana Gated Community Master Plan Layout Map"
              className="w-full h-full object-contain rotate-180 group-hover:scale-[1.02] transition-transform duration-500 cursor-pointer"
              onClick={() => setIsLightboxOpen(true)}
            />
            
            {/* Click to expand overlay */}
            <div 
              className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center cursor-pointer pointer-events-none"
              onClick={() => setIsLightboxOpen(true)}
            >
              <div className="px-4 py-2 bg-[#11385B]/90 text-white rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
                <ZoomIn className="w-4 h-4" />
                <span>Zoom Master Plan</span>
              </div>
            </div>
            
            {/* Layout Label */}
            <span className="absolute bottom-4 left-4 bg-black/60 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full backdrop-blur-sm">
              Proposed Layout Plan
            </span>
          </div>

          {/* Office Cards List */}
          <div className="lg:col-span-4 space-y-4 flex flex-col justify-center">
            <h3 className="text-xs uppercase font-extrabold tracking-widest text-[#11385B] dark:text-sky-400 block mb-1">
              Contact & Locations
            </h3>
            
            {offices.map((office) => {
              const isActive = activeOffice === office.name;
              return (
                <div
                  key={office.name}
                  className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "border-[#11385B] bg-[#11385B]/5 shadow-md"
                      : "border-gray-100 dark:border-white/10 bg-white dark:bg-[#0d1322] hover:border-gray-200 dark:hover:border-white/20"
                  }`}
                  onMouseEnter={() => setActiveOffice(office.name)}
                  onMouseLeave={() => setActiveOffice(null)}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className={`text-[10px] uppercase tracking-widest font-bold block mb-1 ${isActive ? "text-[#11385B] dark:text-sky-400" : "text-gray-400 dark:text-gray-500"}`}>
                          {office.badge}
                        </span>
                        <h4 className={`font-bold text-base transition-colors ${isActive ? "text-[#11385B] dark:text-white" : "text-black dark:text-white"}`}>
                          {office.name}
                        </h4>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-light flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                      {office.address}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-light flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      {office.phone}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-light flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      {office.email}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* CTA Card */}
            <div className="p-5 rounded-xl bg-[#11385B] text-white space-y-3 shadow-md">
              <h4 className="font-semibold text-base">Ready to Build?</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Contact our sales desk to book a site visit at Vemulawada or request pricing for plots/villas.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-white/80 transition-colors"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-5 right-5 z-10 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-6xl max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/layout-map-horizontal.jpg"
                alt="Meghana Master Plan Layout Map"
                className="max-w-full max-h-[80vh] object-contain rotate-180 rounded-lg shadow-2xl bg-white"
              />
              <p className="text-white/70 text-xs md:text-sm mt-4 text-center tracking-wide font-light">
                Proposed Layout of Sy. No. 3381 - Vemulawada. Gated community layout plan with 100% Vastu compliance.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
