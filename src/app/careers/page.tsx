"use client";

import { useState } from "react";
import { UserCheck, Star, HeartHandshake, Briefcase, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const benefits = [
  {
    title: "100% Employee-Owned (ESOP)",
    icon: UserCheck,
    description: "Every eligible employee receives annual contributions of Meghana stock at zero cost, building long-term wealth directly linked to company success.",
  },
  {
    title: "Comprehensive Health & Wellness",
    icon: Star,
    description: "Competitive medical, dental, and vision insurance coverage, plus health savings accounts (HSA) and employee assistance resources.",
  },
  {
    title: "Family-Oriented Culture",
    icon: HeartHandshake,
    description: "We host family events, community volunteer outreach projects, and offer paid parental leave policies to support your life outside work.",
  },
  {
    title: "Career Advancement & Training",
    icon: Briefcase,
    description: "Continuous learning programs, tuition assistance, and leadership coaching courses to support internal promotions and career paths.",
  },
];

const jobs = [
  { title: "Assistant Project Manager", location: "Chicago, IL", department: "Project Management" },
  { title: "Superintendent", location: "Los Angeles, CA", department: "Superintendents" },
  { title: "MEP Coordinator", location: "Dallas-Fort Worth, TX", department: "MEP Engineering" },
  { title: "EHS Safety Manager", location: "New York, NY", department: "Safety & Compliance" },
];

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resumeName, setResumeName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setSelectedJob(null);
        setName("");
        setEmail("");
        setResumeName("");
      }, 3000);
    }
  };

  return (
    <div className="bg-white dark:bg-[#0B0F19] text-black dark:text-white min-h-screen pt-32 pb-24 px-6 lg:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Header Block */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs uppercase text-primary tracking-widest font-semibold block">
              Careers
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-black dark:text-white leading-none uppercase">
              Become An Owner
            </h1>
          </div>
          <div className="lg:col-span-7">
            <p className="text-gray-600 dark:text-gray-300 text-base font-light leading-relaxed">
              At Meghana Builders & Developers Pvt. Ltd., we value a family-oriented culture where we support and challenge our employee owners to perform at their absolute best. Because we are 100% employee-owned, when the company succeeds, our people succeed directly.
            </p>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12 border-t border-b border-gray-100 dark:border-white/10">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <motion.div 
                key={b.title} 
                className="flex gap-4 items-start p-4 bg-gray-50 dark:bg-white/5 rounded border border-gray-100 dark:border-white/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="p-3 bg-primary/10 text-primary rounded-sm shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold tracking-tight text-black dark:text-white">{b.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-light leading-relaxed">{b.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Open Positions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Jobs List (Left 7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white">Open Positions</h2>
            <div className="space-y-4">
              {jobs.map((job, idx) => (
                <motion.div
                  key={job.title}
                  onClick={() => setSelectedJob(job.title)}
                  className={`p-5 rounded-sm border transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                    selectedJob === job.title
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-primary/50"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-base text-black dark:text-white group-hover:text-primary transition-colors">
                      {job.title}
                    </h4>
                    <p className="text-xs text-gray-550 dark:text-gray-400 font-light">
                      {job.department} • {job.location}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-550 group-hover:text-primary transition-transform duration-300 group-hover:translate-x-1" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Application Form Drawer/Box (Right 5 Columns) */}
          <motion.div 
            className="lg:col-span-5 bg-gray-50 dark:bg-black/30 p-8 border border-gray-200 dark:border-white/10 rounded-sm h-fit"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {selectedJob ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-black dark:text-white">Apply for Role</h3>
                  <span className="text-xs text-primary font-semibold block mt-1">
                    {selectedJob}
                  </span>
                </div>

                {!isSubmitted ? (
                  <form onSubmit={handleApply} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400">Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white dark:bg-charcoal border border-gray-200 dark:border-gray-800 rounded-sm text-sm text-black dark:text-white focus:border-primary outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white dark:bg-charcoal border border-gray-200 dark:border-gray-800 rounded-sm text-sm text-black dark:text-white focus:border-primary outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400">Resume File Name</label>
                      <input
                        type="text"
                        placeholder="resume.pdf"
                        required
                        value={resumeName}
                        onChange={(e) => setResumeName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white dark:bg-charcoal border border-gray-200 dark:border-gray-800 rounded-sm text-sm text-black dark:text-white focus:border-primary outline-none placeholder:text-gray-400 dark:placeholder:text-gray-600"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors mt-2 cursor-pointer"
                    >
                      Submit Application
                    </button>
                  </form>
                ) : (
                  <div className="py-8 text-center space-y-2">
                    <p className="text-primary font-bold">Application Submitted!</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-light">
                      Thank you for applying. Our talent acquisition team will contact you soon.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16 space-y-4">
                <Briefcase className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto" />
                <h3 className="text-base font-bold text-black dark:text-white">Select a position</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-light max-w-xs mx-auto">
                  Click on any open job role on the left to see description details and apply directly.
                </p>
              </div>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
