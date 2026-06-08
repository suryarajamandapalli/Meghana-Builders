"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Set initial positions
    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });

    const xSetter = gsap.quickSetter(cursor, "x", "px");
    const ySetter = gsap.quickSetter(cursor, "y", "px");

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      xSetter(e.clientX);
      ySetter(e.clientY);

      // Rotate the compass cursor slightly based on movement or time
      gsap.to(cursor.querySelector(".cursor-svg"), {
        rotation: e.clientX * 0.1 + e.clientY * 0.1,
        duration: 1,
        ease: "power2.out",
      });
    };

    // Show/hide logic depending on section hover
    const handleMouseEnterSection = () => {
      setIsVisible(true);
      gsap.to(cursor, {
        scale: 1,
        opacity: 0.8,
        duration: 0.4,
        ease: "back.out(1.7)",
      });
    };

    const handleMouseLeaveSection = () => {
      setIsVisible(false);
      gsap.to(cursor, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    };

    // Interactive element hovers (buttons, links)
    const handleMouseEnterInteractive = () => {
      setIsHovered(true);
      gsap.to(cursor, {
        scale: 1.5,
        backgroundColor: "rgba(210, 45, 31, 0.1)",
        borderColor: "#FF5C4E",
        duration: 0.3,
      });
      gsap.to(cursor.querySelector(".cursor-svg path"), {
        fill: "#FF5C4E",
        duration: 0.3,
      });
    };

    const handleMouseLeaveInteractive = () => {
      setIsHovered(false);
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "currentColor",
        duration: 0.3,
      });
      gsap.to(cursor.querySelector(".cursor-svg path"), {
        fill: "currentColor",
        duration: 0.3,
      });
    };

    // Add listeners
    window.addEventListener("mousemove", handleMouseMove);

    // Apply custom cursor interactions for elements in '.cursor-section'
    const cursorSections = document.querySelectorAll(".cursor-section");
    cursorSections.forEach((sec) => {
      sec.addEventListener("mouseenter", handleMouseEnterSection);
      sec.addEventListener("mouseleave", handleMouseLeaveSection);
    });

    const interactives = document.querySelectorAll("a, button, [role='button'], .interactive");
    interactives.forEach((item) => {
      item.addEventListener("mouseenter", handleMouseEnterInteractive);
      item.addEventListener("mouseleave", handleMouseLeaveInteractive);
    });

    // Re-check elements on DOM mutations (dynamic routes or client page renders)
    const observer = new MutationObserver(() => {
      const currentSections = document.querySelectorAll(".cursor-section");
      currentSections.forEach((sec) => {
        sec.removeEventListener("mouseenter", handleMouseEnterSection);
        sec.removeEventListener("mouseleave", handleMouseLeaveSection);
        sec.addEventListener("mouseenter", handleMouseEnterSection);
        sec.addEventListener("mouseleave", handleMouseLeaveSection);
      });

      const currentInteractives = document.querySelectorAll("a, button, [role='button'], .interactive");
      currentInteractives.forEach((item) => {
        item.removeEventListener("mouseenter", handleMouseEnterInteractive);
        item.removeEventListener("mouseleave", handleMouseLeaveInteractive);
        item.addEventListener("mouseenter", handleMouseEnterInteractive);
        item.addEventListener("mouseleave", handleMouseLeaveInteractive);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cursorSections.forEach((sec) => {
        sec.removeEventListener("mouseenter", handleMouseEnterSection);
        sec.removeEventListener("mouseleave", handleMouseLeaveSection);
      });
      interactives.forEach((item) => {
        item.removeEventListener("mouseenter", handleMouseEnterInteractive);
        item.removeEventListener("mouseleave", handleMouseLeaveInteractive);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`cursor-follower fixed hidden md:flex border border-primary text-primary pointer-events-none z-[9999] rounded-full justify-center align-center transition-all ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ width: "80px", height: "80px" }}
    >
      <svg
        className="cursor-svg w-12 h-12 overflow-visible select-none pointer-events-none text-primary"
        viewBox="0 0 161 161"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M32.0419 94.2132V84.6231L20.4145 91.4412V73.0015C20.4145 70.5824 18.4437 68.6197 16.0339 68.6197C13.624 68.6197 11.6532 70.591 11.6532 73.0015V91.4412L0.0258184 84.6231V94.2132L16.0425 103.597L32.0591 94.2132H32.0419ZM9.69089 72.9929C9.69089 69.4978 12.531 66.6569 16.0252 66.6569C19.5195 66.6569 22.3596 69.4978 22.3596 72.9929V88.0236L32.0333 82.3505V72.9929C32.0333 64.1432 24.8641 56.9722 16.0166 56.9722C7.16918 56.9722 0 64.1432 0 72.9929V82.3505L9.67366 88.0236V72.9929H9.69089Z" fill="currentColor"></path>
        <path d="M128.478 66.3556V75.9456L140.105 69.1276V87.5673C140.105 89.9863 142.076 91.9491 144.486 91.9491C146.896 91.9491 148.867 89.9777 148.867 87.5673V69.1276L160.494 75.9456V66.3556L144.478 56.9722L128.461 66.3556H128.478ZM150.829 87.5673C150.829 91.0624 147.989 93.9033 144.495 93.9033C141.001 93.9033 138.16 91.0624 138.16 87.5673V72.5366L128.487 78.2097V87.5673C128.487 96.417 135.656 103.588 144.503 103.588C153.351 103.588 160.52 96.417 160.52 87.5673V78.2097L150.846 72.5366V87.5673H150.829Z" fill="currentColor"></path>
        <path d="M56.0101 124.231L49.2282 117.448L45.82 130.49L32.7812 117.448C31.0685 115.735 28.2886 115.735 26.5845 117.448C24.8805 119.161 24.8719 121.942 26.5845 123.646L39.6233 136.688L26.5845 140.097L33.3665 146.881L51.3195 142.189L56.0101 124.231ZM25.2075 125.041C22.7374 122.57 22.7374 118.55 25.2075 116.079C27.6775 113.608 31.6968 113.608 34.1668 116.079L44.7872 126.702L47.6188 115.847L41.0004 109.227C34.7435 102.968 24.605 102.968 18.3567 109.227C12.0998 115.485 12.0998 125.626 18.3567 131.876L24.9751 138.496L35.8279 135.664L25.2075 125.041Z" fill="currentColor"></path>
        <path d="M104.508 36.3286L111.29 43.1122L114.698 30.0701L127.737 43.1122C129.449 44.8253 132.229 44.8253 133.933 43.1122C135.646 41.399 135.646 38.6185 133.933 36.914L120.895 23.8719L133.933 20.4628L127.151 13.6792L109.198 18.3709L104.508 36.3286ZM135.31 35.5194C137.78 37.99 137.78 42.0103 135.31 44.481C132.84 46.9517 128.821 46.9517 126.351 44.481L115.731 33.8579L112.899 44.7134L119.517 51.3334C125.774 57.5919 135.913 57.5919 142.161 51.3334C148.418 45.075 148.418 34.934 142.161 28.6841L135.543 22.064L124.69 24.8963L135.31 35.5194Z" fill="currentColor"></path>
        <path d="M94.18 128.51H84.5924L91.4088 140.14H72.9737C70.5552 140.14 68.593 142.112 68.593 144.522C68.593 146.932 70.5638 148.904 72.9737 148.904H91.4088L84.5924 160.534H94.18L103.561 144.513L94.18 128.493V128.51ZM72.9737 150.867C69.4794 150.867 66.6393 148.026 66.6393 144.531C66.6393 141.035 69.4794 138.195 72.9737 138.195H88.0006L82.3289 128.519H72.9737C64.1262 128.519 56.957 135.69 56.957 144.539C56.957 153.389 64.1262 160.56 72.9737 160.56H82.3289L88.0006 150.884H72.9737V150.867Z" fill="currentColor"></path>
        <path d="M66.3303 32.05H75.9179L69.1016 20.4197H87.5366C89.9551 20.4197 91.9173 18.4483 91.9173 16.0379C91.9173 13.6275 89.9465 11.6561 87.5366 11.6561H69.1016L75.9179 0.0258249H66.3303L56.9492 16.0465L66.3303 32.0672V32.05ZM87.5452 9.69335C91.0394 9.69335 93.8796 12.5342 93.8796 16.0293C93.8796 19.5244 91.0394 22.3653 87.5452 22.3653H72.5183L78.19 32.0414H87.5452C96.3927 32.0414 103.562 24.8704 103.562 16.0207C103.562 7.17099 96.3927 0 87.5452 0H78.19L72.5183 9.67611H87.5452V9.69335Z" fill="currentColor"></path>
      </svg>
    </div>
  );
}
