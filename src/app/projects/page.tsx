"use client";

import { useState } from "react";
import { ArrowRight, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  "All",
  "Office",
  "Mission Critical",
  "Retail",
  "Healthcare & Lifesciences",
  "Hospitality",
];

const projects = [
  {
    title: "Qualtrics Headquarters",
    category: "Office",
    location: "Chicago, IL",
    image: "/meghana-14.jpeg",
    sqft: "120,000 sq ft",
  },
  {
    title: "Cyrus One Data Center",
    category: "Mission Critical",
    location: "Dallas, TX",
    image: "/meghana-15.jpeg",
    sqft: "450,000 sq ft",
  },
  {
    title: "Deltek Corporate Office",
    category: "Office",
    location: "Vienna, VA",
    image: "/meghana-16.jpeg",
    sqft: "85,000 sq ft",
  },
  {
    title: "Tecovas SoHo Retail",
    category: "Retail",
    location: "New York, NY",
    image: "/meghana-2.jpeg",
    sqft: "12,000 sq ft",
  },
  {
    title: "Yeti flagship Experience",
    category: "Retail",
    location: "Austin, TX",
    image: "/meghana-4.jpeg",
    sqft: "24,000 sq ft",
  },
  {
    title: "Grand Seiko Boutique",
    category: "Retail",
    location: "Beverly Hills, CA",
    image: "/meghana-3.jpeg",
    sqft: "6,500 sq ft",
  },
  {
    title: "Blues Cafe & Lounge",
    category: "Hospitality",
    location: "Chicago, IL",
    image: "/meghana-9.jpeg",
    sqft: "18,000 sq ft",
  },
  {
    title: "Chicago Mission Critical Facility",
    category: "Mission Critical",
    location: "Chicago, IL",
    image: "/meghana-7.jpeg",
    sqft: "320,000 sq ft",
  },
  {
    title: "Confidential Financial HQ",
    category: "Office",
    location: "New York, NY",
    image: "/meghana-8.jpeg",
    sqft: "210,000 sq ft",
  },
  {
    title: "Metro Healthcare Hub",
    category: "Healthcare & Lifesciences",
    location: "Phoenix, AZ",
    image: "/meghana-12.jpeg",
    sqft: "145,000 sq ft",
  },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="bg-white dark:bg-[#0B0F19] text-black dark:text-white min-h-screen pt-32 pb-24 px-6 lg:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Title Section */}
        <motion.div 
          className="space-y-4 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-black dark:text-white leading-none uppercase">
            Projects Portfolio
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-light leading-relaxed">
            Discover a showcase of our construction achievements across commercial interiors, mission-critical facilities, healthcare, and retail spaces nationwide.
          </p>
        </motion.div>

        {/* Filter Navigation */}
        <motion.div 
          className="flex flex-wrap items-center gap-2 border-b border-gray-100 dark:border-white/10 pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Filter className="w-4 h-4 text-gray-400 mr-2" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === category
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                key={project.title}
                className="group relative flex flex-col justify-end bg-gray-900 overflow-hidden aspect-[4/5] rounded-sm shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Image background */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-95" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Content info overlay */}
                <div className="relative z-10 p-8 text-white space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded inline-block">
                    {project.category}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-light mt-1 flex gap-2">
                      <span>{project.location}</span>
                      <span>•</span>
                      <span>{project.sqft}</span>
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2 flex items-center gap-2 text-xs uppercase font-semibold text-white tracking-widest">
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
