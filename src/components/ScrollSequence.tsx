"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

export default function ScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const pinWrapper = pinWrapperRef.current;
    const col1 = col1Ref.current;
    const col2 = col2Ref.current;
    const col3 = col3Ref.current;
    const overlay = overlayRef.current;
    const text = textRef.current;
    const cta = ctaRef.current;

    if (!container || !pinWrapper || !col1 || !col2 || !col3 || !overlay || !text || !cta) return;

    // Create the master timeline linked to scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=1500",
        pin: pinWrapper,
        scrub: true,
        anticipatePin: 1,
      },
    });

    // Parallax scrolling of columns
    tl.to(col1, { yPercent: -20, ease: "none" }, 0);
    tl.to(col2, { yPercent: 20, ease: "none" }, 0);
    tl.to(col3, { yPercent: -15, ease: "none" }, 0);

    // Dim the background images
    tl.to(overlay, { opacity: 0.88, ease: "power1.inOut" }, 0.05);

    // Fade up mission text letter-by-letter
    const charSpans = text.querySelectorAll(".text-char");
    if (charSpans.length > 0) {
      tl.fromTo(
        charSpans,
        { opacity: 0, y: 3 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.005,
          ease: "none",
        },
        0.15
      );
    }

    // Fade up CTAs
    tl.fromTo(
      cta,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, ease: "power2.out" },
      0.88
    );

    // Hold at the end
    tl.to({}, { duration: 0.8 });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={containerRef} className="relative bg-charcoal w-full h-[200vh]">
      <div
        ref={pinWrapperRef}
        className="w-full h-screen overflow-hidden flex items-center justify-center"
      >
        {/* Parallax Image Columns Grid */}
        <div className="absolute inset-0 grid grid-cols-3 gap-4 md:gap-8 p-4 md:p-8 opacity-60">
          {/* Column 1 */}
          <div ref={col1Ref} className="flex flex-col gap-4 md:gap-8 h-[150%]">
            <div className="relative w-full aspect-[3/4] md:aspect-[2/3] rounded-sm overflow-hidden bg-gray-900">
              <img
                src="/meghana-1.jpeg"
                alt="Meghana Builders Construction Site"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative w-full aspect-[3/4] md:aspect-[2/3] rounded-sm overflow-hidden bg-gray-900">
              <img
                src="/meghana-2.jpeg"
                alt="Meghana Premium Residential"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative w-full aspect-[3/4] md:aspect-[2/3] rounded-sm overflow-hidden bg-gray-900">
              <img
                src="/meghana-3.jpeg"
                alt="Meghana Commercial Development"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Column 2 */}
          <div
            ref={col2Ref}
            className="flex flex-col gap-4 md:gap-8 h-[150%] -translate-y-[20%]"
          >
            <div className="relative w-full aspect-[3/4] md:aspect-[2/3] rounded-sm overflow-hidden bg-gray-900">
              <img
                src="/meghana-4.jpeg"
                alt="Meghana Villa Interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative w-full aspect-[3/4] md:aspect-[2/3] rounded-sm overflow-hidden bg-gray-900">
              <img
                src="/meghana-5.jpeg"
                alt="Meghana Architecture Design"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative w-full aspect-[3/4] md:aspect-[2/3] rounded-sm overflow-hidden bg-gray-900">
              <img
                src="/meghana-6.jpeg"
                alt="Meghana Modern Workspace"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Column 3 */}
          <div ref={col3Ref} className="flex flex-col gap-4 md:gap-8 h-[150%]">
            <div className="relative w-full aspect-[3/4] md:aspect-[2/3] rounded-sm overflow-hidden bg-gray-900">
              <img
                src="/meghana-7.jpeg"
                alt="Meghana Project Delivery"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative w-full aspect-[3/4] md:aspect-[2/3] rounded-sm overflow-hidden bg-gray-900">
              <img
                src="/meghana-8.jpeg"
                alt="Meghana Quality Construction"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative w-full aspect-[3/4] md:aspect-[2/3] rounded-sm overflow-hidden bg-gray-900">
              <img
                src="/meghana-9.jpeg"
                alt="Meghana Villas Vemulawada"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Dark Overlay Mask */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black opacity-30 z-10 pointer-events-none"
        />

        {/* Central Overlay Content */}
        <div className="absolute inset-0 flex items-center justify-center z-20 max-w-5xl mx-auto px-6">
          <div className="flex flex-col items-center justify-center text-center space-y-10 w-full">
            <div className="flex flex-col justify-center items-center text-center space-y-10">
              <h2
                ref={textRef}
                className="text-white text-[clamp(24px,4.5vw,48px)] font-bold tracking-tight leading-relaxed select-none max-w-4xl flex flex-wrap justify-center text-center"
              >
                {"Meghana's mission is to redefine the future of architecture and construction through innovation, sustainability, and excellence — creating meaningful spaces that connect people, culture, and community."
                  .split(" ")
                  .map((word, wordIdx) => (
                    <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
                      {word.split("").map((char, charIdx) => (
                        <span key={charIdx} className="text-char opacity-0 inline-block">
                          {char}
                        </span>
                      ))}
                    </span>
                  ))}
              </h2>

              <div ref={ctaRef} className="flex gap-6 justify-center opacity-0">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-lg shadow-black/30"
                >
                  <span>Our Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-white hover:bg-white hover:text-black text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-lg shadow-black/30"
                >
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
