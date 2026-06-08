"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Download, Play, Image as ImageIcon, Video, FileText, ZoomIn, Eye } from "lucide-react";
import { useCMS } from "@/context/CMSContext";

// All gallery photos
const photos = [
  { src: "/meghana-1.jpeg", alt: "Meghana Builders - Premium Construction", caption: "Premium Residential Construction" },
  { src: "/meghana-2.jpeg", alt: "Meghana Villa Exterior", caption: "Villa Exterior & Landscaping" },
  { src: "/meghana-3.jpeg", alt: "Meghana Commercial Development", caption: "Commercial Development" },
  { src: "/meghana-4.jpeg", alt: "Meghana Villa Interior", caption: "Villa Interior - Living Room" },
  { src: "/meghana-5.jpeg", alt: "Meghana Architecture & Design", caption: "Architecture & Design Excellence" },
  { src: "/meghana-6.jpeg", alt: "Meghana Modern Construction", caption: "Modern Construction Quality" },
  { src: "/meghana-7.jpeg", alt: "Meghana Project Delivery", caption: "On-time Project Delivery" },
  { src: "/meghana-8.jpeg", alt: "Meghana Quality Build", caption: "Quality Craftsmanship" },
  { src: "/meghana-9.jpeg", alt: "Meghana Villas Vemulawada", caption: "Meghana Villas - Vemulawada" },
  { src: "/meghana-10.jpeg", alt: "Meghana Community Development", caption: "Gated Community - Near Vemulawada Temple" },
  { src: "/meghana-11.jpeg", alt: "Meghana Eco Friendly Park", caption: "Eco-Friendly Park & Green Spaces" },
  { src: "/meghana-12.jpeg", alt: "Meghana Security & CCTV", caption: "24/7 Gated Security System" },
  { src: "/meghana-13.jpeg", alt: "Meghana Elevation Architecture", caption: "Architectural Elevation Design" },
  { src: "/meghana-14.jpeg", alt: "Meghana Plot Layout", caption: "Premium Plot Layout" },
  { src: "/meghana-15.jpeg", alt: "Meghana Amenities", caption: "Modern Amenities & Facilities" },
  { src: "/meghana-16.jpeg", alt: "Meghana Partnership Development", caption: "Partnership & Development" },
];

// Videos
const videos = [
  { src: "/meghana-video-1.mp4", thumb: "/meghana-1.jpeg", title: "Meghana Builders - Project Overview", duration: "~2 min" },
  { src: "/meghana-video-2.mp4", thumb: "/meghana-5.jpeg", title: "Villa Construction Progress", duration: "~1 min" },
  { src: "/meghana-video-3.mp4", thumb: "/meghana-9.jpeg", title: "Meghana Villas - Vemulawada", duration: "~2 min" },
  { src: "/meghana-video-4.mp4", thumb: "/meghana-10.jpeg", title: "Gated Community Tour", duration: "~30 sec" },
  { src: "/meghana-video-5.mp4", thumb: "/meghana-11.jpeg", title: "Green Spaces & Amenities", duration: "~3 min" },
  { src: "/meghana-video-6.mp4", thumb: "/meghana-13.jpeg", title: "Architecture Showcase", duration: "~1 min" },
];

// Brochures
const brochures = [
  {
    title: "Meghana Builders Brochure",
    description: "Full company brochure with all projects, services, and capabilities.",
    file: "/brochures/meghana-builders-brochure.pdf",
    thumb: "/meghana-3.jpeg",
    pages: "Multi-page",
    size: "~4 MB",
  },
  {
    title: "Meghana Villa Brochure",
    description: "Detailed villa brochure with floor plans, amenities, and specifications.",
    file: "/brochures/meghana-villa-brochure.pdf",
    thumb: "/meghana-4.jpeg",
    pages: "Full Brochure",
    size: "~3 MB",
  },
  {
    title: "Villa Brochure — 2 Pages",
    description: "Quick summary brochure, ideal for sharing with family and friends.",
    file: "/brochures/meghana-villa-brochure-2page.pdf",
    thumb: "/meghana-2.jpeg",
    pages: "2 Pages",
    size: "~1 MB",
  },
];

type Tab = "photos" | "videos" | "brochures";

export default function PortfolioPage() {
  const { cmsData } = useCMS();
  const allPhotos = [...photos, ...(cmsData.dynamicPhotos || [])];
  const allVideos = [...videos, ...(cmsData.dynamicVideos || [])];
  const allBrochures = [...brochures, ...(cmsData.dynamicBrochures || [])];

  const [activeTab, setActiveTab] = useState<Tab>("photos");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activePdf, setActivePdf] = useState<string | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIdx === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setLightboxIdx((i) => i !== null ? Math.min(i + 1, allPhotos.length - 1) : null);
      if (e.key === "ArrowLeft") setLightboxIdx((i) => i !== null ? Math.max(i - 1, 0) : null);
      if (e.key === "Escape") setLightboxIdx(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIdx, allPhotos.length]);

  // Lock body scroll when lightbox/video/pdf is open
  useEffect(() => {
    if (lightboxIdx !== null || activeVideo !== null || activePdf !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIdx, activeVideo, activePdf]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0F19] text-black dark:text-white pt-24 transition-colors duration-300">
      {/* Page Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#11385B]/80 to-[#11385B]/95 z-10" />
        <img
          src="/meghana-13.jpeg"
          alt="Portfolio Hero"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center px-6">
          <span className="text-xs uppercase tracking-widest font-bold text-white/70 mb-3">Meghana Builders & Developers</span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Portfolio</h1>
          <p className="text-white/70 mt-3 text-sm md:text-base font-light max-w-xl">
            Explore our project gallery, walkthrough videos, and download our brochures.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-12 border-b border-gray-100 dark:border-white/10 pb-0">
          {([
            { key: "photos", label: "Photos", icon: ImageIcon, count: allPhotos.length },
            { key: "videos", label: "Videos", icon: Video, count: allVideos.length },
            { key: "brochures", label: "Brochures & PDFs", icon: FileText, count: allBrochures.length },
          ] as const).map(({ key, label, icon: Icon, count }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all duration-200 -mb-px ${
                activeTab === key
                  ? "border-[#11385B] text-[#11385B] dark:text-white dark:border-white"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
              <span className={`ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                activeTab === key ? "bg-[#11385B] text-white dark:bg-white dark:text-[#11385B]" : "bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400"
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* PHOTOS TAB */}
        {activeTab === "photos" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {allPhotos.map((photo, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.04, duration: 0.4 }}
                  className="break-inside-avoid group relative overflow-hidden rounded-xl cursor-pointer bg-gray-100 dark:bg-white/5 shadow-sm hover:shadow-xl transition-all duration-300"
                  onClick={() => setLightboxIdx(idx)}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-auto object-cover block transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs font-medium truncate">{photo.caption}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* VIDEOS TAB */}
        {activeTab === "videos" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {allVideos.map((video, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                className="group relative overflow-hidden rounded-xl bg-gray-100 dark:bg-white/5 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setActiveVideo(video.src)}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumb}
                    alt={video.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-6 h-6 text-[#11385B] ml-1" fill="#11385B" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded font-medium">
                    {video.duration}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm text-black dark:text-white">{video.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Meghana Builders & Developers</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* BROCHURES TAB */}
        {activeTab === "brochures" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {allBrochures.map((brochure, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#0d1322] shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Cover Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 dark:bg-white/5">
                  <img
                    src={brochure.thumb}
                    alt={brochure.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    <span className="bg-[#11385B] text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      PDF
                    </span>
                    <span className="bg-black/50 text-white text-[10px] px-2 py-0.5 rounded font-medium">
                      {brochure.pages}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col flex-grow space-y-3">
                  <h3 className="font-bold text-base text-black dark:text-white">{brochure.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-light leading-relaxed flex-grow">
                    {brochure.description}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-white/10">
                    <span className="text-xs text-gray-400 dark:text-gray-500">{brochure.size}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActivePdf(brochure.file)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#11385B] text-[#11385B] dark:border-white/20 dark:text-white hover:bg-[#11385B] hover:text-white dark:hover:bg-white dark:hover:text-[#11385B] rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>
                      <a
                        href={brochure.file}
                        download
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#11385B] hover:bg-primary-hover text-white rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-wider transition-all duration-200"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* PHOTO LIGHTBOX */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm gallery-lightbox flex items-center justify-center"
            onClick={() => setLightboxIdx(null)}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxIdx(null)}
              className="absolute top-5 right-5 z-10 p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/60 text-xs uppercase tracking-widest">
              {lightboxIdx + 1} / {allPhotos.length}
            </div>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIdx((i) => i !== null ? Math.max(i - 1, 0) : null); }}
              disabled={lightboxIdx === 0}
              className="absolute left-4 md:left-8 p-3 text-white/60 hover:text-white disabled:opacity-20 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-5xl max-h-[85vh] mx-16 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={allPhotos[lightboxIdx].src}
                alt={allPhotos[lightboxIdx].alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              <p className="text-white/70 text-sm mt-3 text-center">{allPhotos[lightboxIdx].caption}</p>
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIdx((i) => i !== null ? Math.min(i + 1, allPhotos.length - 1) : null); }}
              disabled={lightboxIdx === allPhotos.length - 1}
              className="absolute right-4 md:right-8 p-3 text-white/60 hover:text-white disabled:opacity-20 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-5 right-5 z-10 p-2 text-white/80 hover:text-white"
              aria-label="Close video"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-4xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={activeVideo}
                controls
                autoPlay
                className="w-full h-full rounded-xl shadow-2xl bg-black"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF MODAL PREVIEW */}
      <AnimatePresence>
        {activePdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setActivePdf(null)}
          >
            {/* Action Buttons */}
            <div className="absolute top-5 right-5 z-10 flex gap-2">
              <a
                href={activePdf}
                download
                className="p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors flex items-center justify-center cursor-pointer"
                title="Download PDF"
                onClick={(e) => e.stopPropagation()}
              >
                <Download className="w-5 h-5" />
              </a>
              <button
                onClick={() => setActivePdf(null)}
                className="p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-5xl h-[85vh] bg-white rounded-xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`${activePdf}#toolbar=1`}
                className="w-full h-full border-none"
                title="PDF Brochure Preview"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
