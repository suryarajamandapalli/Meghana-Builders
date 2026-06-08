"use client";

import Link from "next/link";
import { useCMS } from "@/context/CMSContext";

export default function Footer() {
  const { isAdmin, logout } = useCMS();

  return (
    <footer className="bg-[#11385B] text-white relative overflow-hidden border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-y-0">
          
          {/* Top Left: Logo */}
          <div className="md:col-span-3 py-10 md:pr-8 md:border-r border-white/15 flex items-center justify-start">
            <Link href="/" className="inline-block">
              <img
                src="/logo/FINAL LOGO-09-white.png"
                alt="Meghana Builders & Developers Logo"
                className="h-14 md:h-16 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Top Middle: Nav Links */}
          <div className="md:col-span-6 py-10 md:px-8 md:border-r border-white/15 flex items-center justify-start">
            <nav className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm md:text-base font-semibold tracking-wide text-white">
              <Link href="/about" className="hover:text-white/70 transition-colors">
                Our Company
              </Link>
              <Link href="/sectors" className="hover:text-white/70 transition-colors">
                Our Services
              </Link>
              <Link href="/projects" className="hover:text-white/70 transition-colors">
                Our Projects
              </Link>
              <Link href="/portfolio" className="hover:text-white/70 transition-colors">
                Portfolio
              </Link>
              <Link href="/contact" className="hover:text-white/70 transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Top Right: Social Icons */}
          <div className="md:col-span-3 py-10 md:pl-8 flex items-center justify-start md:justify-end gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center hover:bg-white hover:text-[#11385B] transition-all duration-300"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center hover:bg-white hover:text-[#11385B] transition-all duration-300"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center hover:bg-white hover:text-[#11385B] transition-all duration-300"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center hover:bg-white hover:text-[#11385B] transition-all duration-300"
              aria-label="YouTube"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.002 3.002 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>

        </div>

        {/* Horizontal Line Divider */}
        <div className="border-t border-white/15 w-full"></div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-y-0">
          
          {/* Bottom Left: Copyright */}
          <div className="md:col-span-3 py-10 md:pr-8 md:border-r border-white/15 flex flex-col justify-start text-xs text-white/60 font-light leading-relaxed">
            <p>© 2026 Meghana Builders & Developers Pvt. Ltd.</p>
            <p>All rights reserved.</p>
          </div>

          {/* Bottom Middle: Tagline */}
          <div className="md:col-span-6 py-10 md:px-8 md:border-r border-white/15 flex flex-col justify-start text-xs text-white/60 font-light leading-relaxed">
            <p className="font-semibold text-white/95 mb-2">Meghana Builders &amp; Developers Pvt. Ltd.</p>
            <p className="max-w-xl">
              Building premium, Vastu-compliant homes and communities across Telangana since 2000. Committed to structural excellence and customer trust.
            </p>
            <Link href="/about" className="mt-3 inline-block hover:underline text-white font-medium transition-colors">
              Quality & Safety Policy
            </Link>
          </div>

          {/* Bottom Right: Legal Navigation */}
          <div className="md:col-span-3 py-10 md:pl-8 flex items-start justify-start md:justify-end">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/60 md:justify-end">
              <Link href="#fraud-alert" className="hover:underline hover:text-white transition-colors">
                Fraud Alert
              </Link>
              <span className="text-white/20">|</span>
              <Link href="/privacy-policy" className="hover:underline hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span className="text-white/20">|</span>
              <Link href="#cookie-settings" className="hover:underline hover:text-white transition-colors">
                Cookie Settings
              </Link>
              <span className="text-white/20">|</span>
              {isAdmin ? (
                <button onClick={logout} className="hover:underline hover:text-rose-400 text-rose-300 transition-colors font-medium cursor-pointer">
                  Admin Logout
                </button>
              ) : (
                <Link href="/admin" className="hover:underline hover:text-white transition-colors">
                  Admin Login
                </Link>
              )}
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
