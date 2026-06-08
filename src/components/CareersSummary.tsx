"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

export default function CareersSummary() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headline1Ref = useRef<HTMLHeadingElement>(null);
  const headline2Ref = useRef<HTMLHeadingElement>(null);
  const text1Ref = useRef<HTMLParagraphElement>(null);
  const text2Ref = useRef<HTMLParagraphElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Text fade-ups
    const animateText = (trigger: any, target: any) => {
      gsap.fromTo(
        target,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: trigger,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    };

    if (headline1Ref.current) animateText(headline1Ref.current, headline1Ref.current);
    if (headline2Ref.current) animateText(headline2Ref.current, headline2Ref.current);
    if (text1Ref.current) animateText(text1Ref.current, text1Ref.current);
    if (text2Ref.current) animateText(text2Ref.current, text2Ref.current);

    // Image reveal masks
    const animateReveal = (element: HTMLDivElement | null) => {
      if (!element) return;
      const mask = element.querySelector(".reveal-mask");
      const img = element.querySelector("img");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
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
    };

    animateReveal(img1Ref.current);
    animateReveal(img2Ref.current);
  }, []);

  return (
    <section ref={sectionRef} className="bg-white dark:bg-[#0B0F19] text-black dark:text-white py-24 px-6 lg:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-32">
        {/* Part 1: Intro Text Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6">
            <h2
              ref={headline1Ref}
              className="text-[clamp(36px,5vw,72px)] font-bold tracking-tight leading-none text-black dark:text-white max-w-lg"
            >
              Building spaces that inspire, endure, and enhance modern living.
            </h2>
          </div>
          <div className="lg:col-span-6 space-y-6">
            <p ref={text1Ref} className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed font-light">
              Meghana Builders & Developers Pvt. Ltd. is an architectural and construction firm dedicated to shaping spaces that inspire, endure, and enhance modern living. With a forward-thinking approach and a passion for design innovation, we bring together creativity, functionality, and precision to deliver exceptional architectural solutions. From concept to completion, every project reflects a balance between aesthetic vision and structural integrity — redefining how architecture meets human experience.
            </p>
            <div className="flex items-center gap-6 text-sm font-semibold tracking-wider uppercase">
              <Link href="/contact" className="hover:text-primary dark:hover:text-sky-400 transition-colors line-draw active">
                Start a Conversation
              </Link>
              <span className="text-gray-300 dark:text-gray-600">/</span>
              <Link href="/projects" className="text-primary dark:text-sky-400 hover:text-primary-hover dark:hover:text-sky-300 transition-colors line-draw active">
                View Projects
              </Link>
            </div>
          </div>
        </div>

        {/* Part 2: Villas Teaser */}
        <div className="bg-[#11385B] dark:bg-[#0d1322] border dark:border-white/10 text-white p-8 md:p-16 rounded-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs uppercase text-white/60 tracking-widest font-semibold block">
              Meghana Villas — Vemulawada
            </span>
            <h2
              ref={headline2Ref}
              className="text-[clamp(28px,4vw,48px)] font-bold tracking-tight leading-none text-white"
            >
              Premium 3BHK Villas. Your Dream Home Awaits.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <p ref={text2Ref} className="text-white/70 text-sm font-light leading-relaxed">
              Beside Reddy Bhavan, near Nandi Kaman, Vemulawada — our flagship villa project offers 1,066 to 1,400 sq. ft. premium 3BHK homes. Vastu-compliant planning, gated security, children's play area, eco-friendly park, CCTV, underground services, and easy access to the renowned Vemulawada Temple.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-white/10">
              <div className="space-y-1">
                <span className="text-2xl font-extrabold text-white block">3 BHK</span>
                <span className="text-[10px] uppercase text-white/50 tracking-wider block">Villa Type</span>
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-extrabold text-white block">1,400</span>
                <span className="text-[10px] uppercase text-white/50 tracking-wider block">Sq. Ft. Max</span>
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-extrabold text-white block">5 min</span>
                <span className="text-[10px] uppercase text-white/50 tracking-wider block">To Temple</span>
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-extrabold text-white block">100%</span>
                <span className="text-[10px] uppercase text-white/50 tracking-wider block">Vastu True</span>
              </div>
            </div>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-6 py-3 bg-white text-[#11385B] hover:bg-white/90 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <span>Book a Visit Today</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Part 3: Split Image Reveals */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Left: Logo/Brand Image */}
          <div
            ref={img1Ref}
            className="md:col-span-4 relative h-[300px] md:h-[450px] overflow-hidden rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center"
          >
            <div className="reveal-mask absolute inset-0 bg-[#11385B] z-20 pointer-events-none" />
            <img
              src="/logo/FINAL LOGO-05.png"
              alt="Meghana Builders Logo"
              className="w-4/5 h-auto object-contain relative z-10 opacity-70 invert dark:invert-0 transition-all duration-300"
            />
          </div>

          {/* Right: Project Photo */}
          <div
            ref={img2Ref}
            className="md:col-span-8 relative h-[300px] md:h-[450px] overflow-hidden rounded-xl bg-gray-900"
          >
            <div className="reveal-mask absolute inset-0 bg-[#11385B] z-20 pointer-events-none" />
            <img
              src="/meghana-11.jpeg"
              alt="Meghana Builders Premium Construction"
              className="w-full h-full object-cover relative z-10"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
