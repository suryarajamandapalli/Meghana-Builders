"use client";

import Link from "next/link";
import { ArrowRight, Cpu, Building, HeartPulse, Plane, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";

const sectors = [
  {
    id: "mission-critical",
    name: "Mission Critical",
    icon: Cpu,
    tagline: "Building high-performance data centers with zero downtime.",
    description:
      "As one of the top data center contractors in the U.S., Meghana Builders & Developers Pvt. Ltd. specializes in the construction of mission-critical facilities, infrastructure upgrades, and disaster recovery hubs. We manage complex electrical/mechanical designs and high-density MEP coordination to deliver reliable power and cooling specifications.",
    stats: "Over 10M sq ft constructed",
    image: "/meghana-7.jpeg",
  },
  {
    id: "office",
    name: "Corporate Office",
    icon: Building,
    tagline: "Premium interior buildouts reflecting company identities.",
    description:
      "Meghana is a national leader in corporate tenant interiors and corporate office renovations. We collaborate with designers and architects to craft bespoke headquarters, collaborative open spaces, and modern conference rooms. Our team ensures high-quality acoustic, aesthetic, and functional finishes.",
    stats: "Over 150M sq ft constructed",
    image: "/meghana-14.jpeg",
  },
  {
    id: "healthcare",
    name: "Healthcare & Lifesciences",
    icon: HeartPulse,
    tagline: "Highly technical medical labs and clinical environments.",
    description:
      "Medical facilities require exceptional quality controls and compliance measures. Meghana constructs clean rooms, pharmaceutical laboratories, imaging clinics, and ambulatory outpatient centers. We strictly manage contamination protocols and specialized gas/electrical lines.",
    stats: "100% compliance record",
    image: "/meghana-12.jpeg",
  },
  {
    id: "aviation",
    name: "Aviation & Airport",
    icon: Plane,
    tagline: "Active terminal modernizations under tight regulations.",
    description:
      "We operate under rigorous FAA and TSA security parameters to execute terminal renovations, baggage handling expansions, passenger lounges, and ticket counter buildouts. Our phased scheduling keeps airport operations active with minimal passenger interruption.",
    stats: "24/7 active site execution",
    image: "/meghana-1.jpeg",
  },
  {
    id: "retail",
    name: "Retail",
    icon: ShoppingBag,
    tagline: "High-end flagship stores in premier locations.",
    description:
      "Brand presentation is everything. Meghana executes luxury retail buildouts, boutique store rollouts, and flagship experiences. We focus on premium storefront glazing, custom millwork, and custom architectural lighting layouts to match branding guidelines.",
    stats: "Premium SoHo & Beverly Hills delivery",
    image: "/meghana-2.jpeg",
  },
  {
    id: "hospitality",
    name: "Hospitality & Entertainment",
    icon: UtensilsCrossed,
    tagline: "Sophisticated hotels, gaming studios, and cafes.",
    description:
      "From boutique hotels and wellness lounges to soundproof gaming/recording studios, we combine structural acoustics with premium materials to build spaces that engage and relax customers. Our work includes custom bars, commercial kitchens, and bespoke fixtures.",
    stats: "Acoustic STC rating expertise",
    image: "/meghana-9.jpeg",
  },
];

export default function SectorsPage() {
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
            Industry Sectors
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-light leading-relaxed">
            Meghana Builders & Developers Pvt. Ltd. delivers general contracting services across specialized corporate, technology, medical, and commercial niches.
          </p>
        </motion.div>

        {/* Sector Blocks */}
        <div className="space-y-24">
          {sectors.map((sector, index) => {
            const Icon = sector.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={sector.id}
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
