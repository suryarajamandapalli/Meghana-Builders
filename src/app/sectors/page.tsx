"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { useCMS } from "@/context/CMSContext";

export default function SectorsPage() {
  const { cmsData } = useCMS();
  
  const sectorsList = cmsData.sectorsList || [];
  const sectorsTitle = cmsData.sectorsTitle || "Industry Sectors";
  const sectorsDescription = cmsData.sectorsDescription || "";

  return (
    <div className="bg-white dark:bg-[#0B0F19] text-black dark:text-white min-h-screen pt-32 pb-24 px-6 lg:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Intro Header */}
        <motion.div 
          className="space-y-4 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-black dark:text-white leading-none uppercase">
            {sectorsTitle}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-light leading-relaxed">
            {sectorsDescription}
          </p>
        </motion.div>

        {/* Sector Blocks */}
        <div className="space-y-24">
          {sectorsList.map((sector, index) => {
            // Resolve icon dynamically from Lucide library
            const Icon = (Icons as any)[sector.iconName] || Icons.Building;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={sector.id || index}
                id={sector.id}
                className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
              >
                {/* Text Block */}
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 text-primary dark:bg-white/10 dark:text-sky-300 rounded-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs uppercase text-primary dark:text-sky-400 font-bold tracking-wider">
                      {sector.stats}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white">
                      {sector.name}
                    </h2>
                    <p className="text-primary dark:text-sky-400 text-sm font-medium tracking-tight">
                      {sector.tagline}
                    </p>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm font-light leading-relaxed">
                    {sector.description}
                  </p>

                  <div className="pt-2">
                    <Link
                      href="/projects"
                      className="inline-flex items-center gap-3 px-6 py-3 bg-charcoal dark:bg-[#11385B] hover:bg-primary text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      <span>Explore Sector Projects</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Image Block */}
                <div
                  className={`lg:col-span-6 relative aspect-[16/10] overflow-hidden rounded-sm bg-gray-55 shadow-lg ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <img
                    src={sector.image}
                    alt={sector.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
