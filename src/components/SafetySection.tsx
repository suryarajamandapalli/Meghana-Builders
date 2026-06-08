"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SafetySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const [projects, setProjects] = useState("0");
  const [sqft, setSqft] = useState("0");
  const [years, setYears] = useState("0");
  const [families, setFamilies] = useState("0");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    // Project statistics count-up animation
    const statsObj = { projects: 0, sqft: 0, years: 0, families: 0 };

    gsap.to(statsObj, {
      projects: 50,
      sqft: 500,
      years: 25,
      families: 200,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container,
        start: "top 75%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        setProjects(Math.round(statsObj.projects).toString());
        setSqft(Math.round(statsObj.sqft).toString());
        setYears(Math.round(statsObj.years).toString());
        setFamilies(Math.round(statsObj.families).toString());
      },
    });

    // Image reveal animation
    if (imageRef.current) {
      const mask = imageRef.current.querySelector(".reveal-mask");
      const img = imageRef.current.querySelector("img");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        mask,
        { xPercent: -100 },
        { xPercent: 100, duration: 1.2, ease: "power3.inOut" }
      );
      tl.fromTo(
        img,
        { scale: 1.15 },
        { scale: 1, duration: 1.2, ease: "power2.out" },
        0.3
      );
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-white dark:bg-[#0B0F19] text-black dark:text-white py-24 px-6 lg:px-12 border-t border-gray-100 dark:border-white/10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Copy & Animated Stats */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-4">
            <span className="text-xs uppercase text-[#11385B] tracking-widest font-semibold block">
              Our Track Record
            </span>
            <h2 className="text-[clamp(32px,4.5vw,56px)] font-bold tracking-tight leading-none text-black dark:text-white">
              Delivering Excellence Across Every Project.
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm font-light leading-relaxed max-w-lg">
              With decades of experience in architectural design and construction, Meghana Builders & Developers Pvt. Ltd.
              has transformed countless plots into homes and communities. Our commitment to quality,
              Vastu compliance, and customer satisfaction drives everything we build.
              <br />
              <br />
              From the temple city of Vemulawada to Hyderabad and beyond, our work speaks for itself.
            </p>
          </div>

          {/* Animated Statistics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-t border-b border-gray-100 dark:border-white/10">
            <div className="space-y-1">
              <span className="text-[clamp(32px,3vw,44px)] font-extrabold text-[#11385B] leading-none block">
                {projects}+
              </span>
              <span className="text-[10px] uppercase text-gray-500 dark:text-gray-400 tracking-wider font-semibold block">
                Projects Delivered
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[clamp(32px,3vw,44px)] font-extrabold text-black dark:text-white leading-none block">
                {sqft}K+
              </span>
              <span className="text-[10px] uppercase text-gray-500 dark:text-gray-400 tracking-wider font-semibold block">
                Sq. Ft. Built
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[clamp(32px,3vw,44px)] font-extrabold text-black dark:text-white leading-none block">
                {years}+
              </span>
              <span className="text-[10px] uppercase text-gray-500 dark:text-gray-400 tracking-wider font-semibold block">
                Years Experience
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[clamp(32px,3vw,44px)] font-extrabold text-black dark:text-white leading-none block">
                {families}+
              </span>
              <span className="text-[10px] uppercase text-gray-500 dark:text-gray-400 tracking-wider font-semibold block">
                Happy Families
              </span>
            </div>
          </div>

          {/* Project Highlights */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Project Highlights</h3>
            <ul className="space-y-2">
              {[
                "Surrounding Compound Wall & Security Gated Community",
                "Black Top Roads, Footpath & Avenue Trees",
                "Children's Park, CCTV & Intercom Security",
                "Underground Water, Electrical & Drainage Systems",
                "100% Vastu True North Plots",
                "Fire Fighting System & Ample Visitor Parking",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300 font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#11385B] mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 px-6 py-3 bg-[#11385B] hover:bg-primary-hover text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              View Our Projects
            </Link>
          </div>
        </div>

        {/* Right Column: Image with Slide Reveal Overlay */}
        <div ref={imageRef} className="lg:col-span-6 relative aspect-[3/2] overflow-hidden rounded-xl bg-gray-100 dark:bg-white/5 shadow-xl">
          <div className="reveal-mask absolute inset-0 bg-[#11385B] z-20 pointer-events-none" />
          <img
            src="/meghana-6.jpeg"
            alt="Meghana Builders & Developers Pvt. Ltd. Premium Construction"
            className="w-full h-full object-cover relative z-10"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
