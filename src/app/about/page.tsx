"use client";

import { Award, ShieldCheck, Landmark } from "lucide-react";
import { motion } from "framer-motion";
import { useCMS } from "@/context/CMSContext";

export default function AboutPage() {
  const { cmsData } = useCMS();
  const timelineEvents = cmsData.timelineEvents || [];
  const leaders = cmsData.leaders || [];

  return (
    <div className="bg-white dark:bg-[#0B0F19] text-black dark:text-white min-h-screen pt-32 pb-24 px-6 lg:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Header Block */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs uppercase text-primary dark:text-sky-400 tracking-widest font-semibold block">
              About Us
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-black dark:text-white leading-none uppercase">
              {cmsData.aboutTitle || "Our Story"}
            </h1>
          </div>
          <div className="lg:col-span-7">
            <p className="text-gray-600 dark:text-gray-300 text-base font-light leading-relaxed">
              {cmsData.aboutText}
            </p>
          </div>
        </motion.div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-b border-gray-100 dark:border-white/10">
          {/* Safety */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="p-3 bg-primary/10 text-primary dark:bg-white/10 dark:text-sky-300 w-fit rounded-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-black dark:text-white">EHS Safety Excellence</h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs font-light leading-relaxed">
              Our safety teams measure and evaluate hazard mitigation plans daily to ensure everyone on our jobsites returns home safely. Our EMR rating stands at .64.
            </p>
          </motion.div>

          {/* ESOP */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-3 bg-primary/10 text-primary dark:bg-white/10 dark:text-sky-300 w-fit rounded-sm">
              <Landmark className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-black dark:text-white">Employee Owned (ESOP)</h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs font-light leading-relaxed">
              Since 2013, Meghana has been 100% employee-owned. Our structure means every project manager, engineer, and administrator owns a direct stake in client success.
            </p>
          </motion.div>

          {/* Reach */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="p-3 bg-primary/10 text-primary dark:bg-white/10 dark:text-sky-300 w-fit rounded-sm">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-black dark:text-white">National Reach</h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs font-light leading-relaxed">
              We coordinate nationwide accounts across 8 regional hubs. Our teams maintain consistency in schedules and vendor negotiations across the U.S.
            </p>
          </motion.div>
        </div>

        {/* Timeline Section */}
        <div className="space-y-12">
          <div className="space-y-3">
            <span className="text-xs uppercase text-primary dark:text-sky-400 tracking-widest font-semibold block">
              Timeline
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white">Milestones</h2>
          </div>
          <div className="relative border-l border-gray-200 dark:border-white/10 ml-4 pl-8 space-y-12">
            {timelineEvents.map((evt, idx) => (
              <motion.div 
                key={`${evt.year}-${idx}`} 
                className="relative space-y-2"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                {/* Year tag circle */}
                <span className="absolute -left-12 top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary dark:bg-sky-500 text-white text-[10px] font-bold shadow-md">
                  {evt.year}
                </span>
                <h4 className="text-lg font-bold text-black dark:text-white">{evt.title}</h4>
                <p className="text-gray-500 dark:text-gray-300 text-xs font-light max-w-xl leading-relaxed">
                  {evt.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Leadership Grid */}
        <div className="space-y-12">
          <div className="space-y-3">
            <span className="text-xs uppercase text-primary dark:text-sky-400 tracking-widest font-semibold block">
              Team
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white">Leadership</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaders.map((leader, idx) => (
              <motion.div 
                key={`${leader.name}-${idx}`} 
                className="p-6 border border-gray-100 dark:border-white/10 rounded-sm bg-white dark:bg-[#0d1322] space-y-4 shadow-sm hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -5 }}
              >
                <div>
                  <h4 className="font-bold text-lg text-black dark:text-white">{leader.name}</h4>
                  <span className="text-[10px] uppercase text-primary dark:text-sky-400 font-semibold tracking-wider block mt-1">
                    {leader.role}
                  </span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-xs font-light leading-relaxed">
                  {leader.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
