"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function VideoShowcase() {
  return (
    <div className="flex flex-col w-full bg-black relative z-10">
      {/* First Video */}
      <section className="h-screen w-full relative overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover"
        >
          <source src="/3.mp4" type="video/mp4" />
        </video>
      </section>

      {/* Second Video */}
      <section className="h-screen w-full relative overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover"
        >
          <source src="/2.mp4" type="video/mp4" />
        </video>
      </section>

      {/* Third Video */}
      <section className="h-screen w-full relative overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover"
        >
          <source src="/4.mp4" type="video/mp4" />
        </video>
      </section>
    </div>
  );
}
