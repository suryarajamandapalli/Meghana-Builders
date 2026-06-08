"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Search, Sun, Moon, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const navItemVariants = {
  hidden: { y: -25, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 240, damping: 18 },
  },
};

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/sectors", label: "Sectors" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
];

// Searchable site content
const SEARCH_DATA = [
  { title: "Home", desc: "Meghana Builders & Developers — Making a Difference", href: "/", category: "Page" },
  { title: "Projects", desc: "Explore our premium residential and commercial projects", href: "/projects", category: "Page" },
  { title: "Portfolio", desc: "Browse our photo gallery, videos, and downloadable brochures", href: "/portfolio", category: "Page" },
  { title: "Sectors", desc: "Residential villas, plots, gated communities and more", href: "/sectors", category: "Page" },
  { title: "About Us", desc: "Learn about Meghana Builders & Developers Pvt. Ltd.", href: "/about", category: "Page" },
  { title: "Contact Us", desc: "Get in touch with Meghana Builders — Vemulawada HQ", href: "/contact", category: "Contact" },
  { title: "Meghana Villas", desc: "Premium 3BHK villas in Vemulawada, 1066–1400 sq.ft., Vastu compliant", href: "/projects", category: "Project" },
  { title: "Dream Plots", desc: "Gated community plots 122–329 sq.yds. with black top roads", href: "/projects", category: "Project" },
  { title: "Vemulawada HQ", desc: "Beside Reddy Bhavan, Near Nandi Kaman, Vemulawada, Telangana", href: "/contact", category: "Office" },
  { title: "Download Brochure", desc: "Download Meghana Builders or Villa brochure as PDF", href: "/portfolio", category: "Resource" },
  { title: "Photo Gallery", desc: "View construction and project photos from Meghana Builders", href: "/portfolio", category: "Resource" },
  { title: "Videos", desc: "Watch walkthrough videos of Meghana villa and plot projects", href: "/portfolio", category: "Resource" },
  { title: "Vastu Compliant Homes", desc: "All Meghana homes are 100% Vastu true north aligned", href: "/projects", category: "Feature" },
  { title: "Security & CCTV", desc: "24/7 gated security, CCTV and intercom in all developments", href: "/sectors", category: "Feature" },
  { title: "Eco-Friendly Park", desc: "Avenue trees, children's park, and green spaces in every layout", href: "/sectors", category: "Feature" },
  { title: "Underground Services", desc: "Underground electrical, water and drainage systems in all projects", href: "/sectors", category: "Feature" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDark, setIsDark] = useState(false);

  // Init theme
  useEffect(() => {
    const saved = localStorage.getItem("meghana-theme");
    // Default to light (false) unless explicitly saved as "dark"
    const dark = saved === "dark";
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  // Track scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery("");
  }, [pathname]);

  // Close search on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setIsSearchOpen(false); setSearchQuery(""); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("meghana-theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  };

  const isHome = pathname === "/";
  const isDarkPage = pathname === "/contact";
  const isDarkBg = !isScrolled && (isHome || isDarkPage);

  // Header background
  const headerBg = isScrolled
    ? "bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md text-black dark:text-white border-b border-gray-100 dark:border-white/10 shadow-sm"
    : isDarkPage
    ? "bg-[#0B0F19] text-white"
    : isHome
    ? "bg-transparent text-white"
    : "bg-white dark:bg-[#0B0F19] text-black dark:text-white border-b border-gray-100 dark:border-white/10";

  // Live search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return SEARCH_DATA.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [searchQuery]);

  const handleSearchResultClick = (href: string) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    router.push(href);
  };

  const categoryColors: Record<string, string> = {
    Page: "bg-blue-500/20 text-blue-300",
    Project: "bg-emerald-500/20 text-emerald-300",
    Office: "bg-orange-500/20 text-orange-300",
    Resource: "bg-purple-500/20 text-purple-300",
    Feature: "bg-[#11385B]/40 text-[#4A9DD4]",
    Contact: "bg-rose-500/20 text-rose-300",
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerBg}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo/final-logo-02.png"
              alt="Meghana Builders & Developers Logo"
              className="h-10 md:h-12 w-auto object-contain transition-all duration-300"
            />
          </Link>

          {/* Desktop Nav */}
          <motion.nav
            variants={navContainerVariants}
            initial="hidden"
            animate="show"
            className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium"
          >
            {NAV_LINKS.map((link) => (
              <motion.div key={link.href} variants={navItemVariants}>
                <Link
                  href={link.href}
                  className={`py-1.5 px-3.5 relative group overflow-hidden flex items-center justify-center rounded-sm font-semibold tracking-wide border border-transparent transition-colors ${
                    pathname === link.href
                      ? "text-[#11385B] font-bold"
                      : "text-[#11385B] hover:text-[#4A9DD4]"
                  }`}
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    {link.label}
                  </span>
                  <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out -z-0" />
                </Link>
              </motion.div>
            ))}

            {/* Theme Toggle */}
            <motion.div variants={navItemVariants} className="flex items-center ml-1">
              <button
                onClick={toggleTheme}
                className="hover:text-primary transition-colors p-2 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-white"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className={`w-5 h-5 ${isDarkBg ? "text-white" : "text-gray-700 dark:text-white"}`} />}
              </button>
            </motion.div>

            {/* Search Icon */}
            <motion.div variants={navItemVariants} className="flex items-center">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hover:text-primary transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-white"
                aria-label="Open Search"
              >
                <Search className={`w-5 h-5 ${isDarkBg ? "text-white" : "text-gray-700 dark:text-white"}`} />
              </button>
            </motion.div>

            {/* Contact CTA */}
            <motion.div variants={navItemVariants} className="flex items-center ml-2">
              <Link
                href="/contact"
                className="px-5 py-2 bg-primary hover:bg-primary-hover text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Contact
              </Link>
            </motion.div>
          </motion.nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 lg:hidden">
            <button onClick={toggleTheme} className="p-2 text-gray-700 dark:text-white" aria-label="Toggle Theme">
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-gray-700 dark:text-white" />}
            </button>
            <button onClick={() => setIsSearchOpen(true)} className="p-2 text-gray-700 dark:text-white" aria-label="Search">
              <Search className="w-5 h-5 text-gray-700 dark:text-white" />
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-700 dark:text-white" aria-label="Menu">
              {isMobileMenuOpen ? <X className="w-6 h-6 text-gray-700 dark:text-white" /> : <Menu className="w-6 h-6 text-gray-700 dark:text-white" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-20 bg-[#0B0F19] text-white z-40 overflow-y-auto px-6 py-8 flex flex-col justify-between"
          >
            <div className="space-y-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-2xl font-semibold hover:text-sky-300 transition-colors ${
                    pathname === link.href ? "text-sky-400 font-bold" : "text-white/80"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-12 border-t border-gray-800">
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full py-3 text-center bg-primary hover:bg-primary-hover text-white rounded-full uppercase tracking-wider text-sm font-semibold transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/92 backdrop-blur-md z-50 flex flex-col items-center pt-28 px-6"
          >
            {/* Close */}
            <button
              onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
              className="absolute top-8 right-8 text-white/60 hover:text-white p-2 transition-colors"
              aria-label="Close search"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="w-full max-w-2xl">
              {/* Search input */}
              <div className="relative border-b-2 border-[#11385B] pb-3 mb-2">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-[#4A9DD4]" />
                <input
                  type="text"
                  placeholder="Search projects, services, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-white text-xl md:text-2xl border-none outline-none pl-10 font-light placeholder:text-white/25"
                  autoFocus
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Results */}
              <AnimatePresence mode="wait">
                {searchQuery.trim() === "" && (
                  <motion.p
                    key="hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-white/30 text-sm mt-4 font-light text-center"
                  >
                    Try "villas", "plots", "gallery", "contact", "brochure"…
                  </motion.p>
                )}

                {searchQuery.trim() !== "" && searchResults.length === 0 && (
                  <motion.p
                    key="no-results"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-white/40 text-sm mt-6 text-center"
                  >
                    No results for <span className="text-white font-semibold">"{searchQuery}"</span>. Try a different keyword.
                  </motion.p>
                )}

                {searchResults.length > 0 && (
                  <motion.ul
                    key="results"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 space-y-2"
                  >
                    {searchResults.map((result, idx) => (
                      <motion.li
                        key={result.href + result.title}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04 }}
                      >
                        <button
                          onClick={() => handleSearchResultClick(result.href)}
                          className="w-full text-left flex items-center justify-between gap-4 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${categoryColors[result.category] || "bg-white/10 text-white/60"}`}>
                              {result.category}
                            </span>
                            <div className="min-w-0">
                              <p className="text-white font-semibold text-sm truncate">{result.title}</p>
                              <p className="text-white/50 text-xs truncate">{result.desc}</p>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white shrink-0 group-hover:translate-x-1 transition-all" />
                        </button>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
