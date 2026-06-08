"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ref, set, onValue } from "firebase/database";
import { database } from "@/lib/firebase";

export interface CMSData {
  // Hero Section
  heroTitle: string;
  heroTagline: string;
  
  // Theme Colors
  primaryColor: string;
  primaryHoverColor: string;

  // Contact Info & Addresses
  contactPhone: string;
  contactEmail: string;
  hqAddress: string;
  hyderabadAddress: string;
  karimnagarAddress: string;

  // Portfolio items
  dynamicPhotos: Array<{ src: string; alt: string; caption: string }>;
  dynamicVideos: Array<{ src: string; thumb: string; title: string; duration: string }>;
  dynamicBrochures: Array<{ title: string; description: string; file: string; thumb: string; pages: string; size: string }>;

  // About Page
  aboutTitle: string;
  aboutText: string;
  timelineEvents: Array<{ year: string; title: string; description: string }>;
  leaders: Array<{ name: string; role: string; description: string }>;

  // Sectors Page
  sectorsTitle: string;
  sectorsDescription: string;
  sectorsList: Array<{ id: string; name: string; tagline: string; description: string; stats: string; image: string; iconName: string }>;

  // Contact Page Offices
  contactTitle: string;
  contactDescription: string;
  offices: Array<{ city: string; phone: string; address: string }>;
}

const DEFAULT_CMS_DATA: CMSData = {
  heroTitle: "Meghana Builders",
  heroTagline: "Build your dreams.",
  contactPhone: "+91-7096666669",
  contactEmail: "info@meghanabuilders.com",
  hqAddress: "Beside Reddy Bhavan, Near Nandi Kaman, Vemulawada, Telangana",
  hyderabadAddress: "Hyderabad, Telangana, India",
  karimnagarAddress: "Karimnagar, Telangana, India",
  primaryColor: "#11385B",
  primaryHoverColor: "#1E4E7A",
  dynamicPhotos: [],
  dynamicVideos: [],
  dynamicBrochures: [],

  // About Page Defaults
  aboutTitle: "Our Story",
  aboutText: "We are a national, employee-owned general contractor managing over $5 billion in projects annually. We combine deep technical experience with a people-first approach. Guided by a strict ethical code and a promise to pursue your perfect project, Meghana is more than a builder. We are a trusted partner.",
  timelineEvents: [
    {
      year: "1997",
      title: "Company Founded",
      description: "Meghana Builders & Developers Pvt. Ltd. begins operations in Chicago with a focus on tenant interior general contracting, committed to delivering high-quality commercial spaces.",
    },
    {
      year: "2003",
      title: "National Footprint",
      description: "Meghana expands nationally, opening offices in Los Angeles and New York to service Fortune 500 accounts in premier commercial markets.",
    },
    {
      year: "2013",
      title: "100% Employee Ownership",
      description: "Meghana transitions into a fully Employee-Owned Company (ESOP). Every employee owner receives a stake in the company, reinforcing a culture of shared accountability.",
    },
    {
      year: "2026",
      title: "Brand Refresh & Expansion",
      description: "Unveiled a brand refresh emphasizing momentum and digital coordination. Operating in 8 cities, managing over $5 billion in construction volume annually.",
    },
  ],
  leaders: [
    {
      name: "Dave Hall",
      role: "Chief Executive Officer",
      description: "Leads Meghana's national corporate strategy, operations, and cultural vision.",
    },
    {
      name: "Sean Brandon",
      role: "Regional President",
      description: "Directs East Coast operations, client delivery, and strategic expansions.",
    },
    {
      name: "Tony Rymar",
      role: "Executive VP - Mission Critical",
      description: "Coordinates large-scale technical infrastructure and data center project lines.",
    },
    {
      name: "Brian K. Smith",
      role: "VP - Environmental Health & Safety",
      description: "Maintains Meghana's industry-leading safety rating and field protocol updates.",
    },
  ],

  // Sectors Page Defaults
  sectorsTitle: "Industry Sectors",
  sectorsDescription: "Meghana Builders & Developers Pvt. Ltd. delivers general contracting services across specialized corporate, technology, medical, and commercial niches.",
  sectorsList: [
    {
      id: "mission-critical",
      name: "Mission Critical",
      tagline: "Building high-performance data centers with zero downtime.",
      description: "As one of the top data center contractors in the U.S., Meghana Builders & Developers Pvt. Ltd. specializes in the construction of mission-critical facilities, infrastructure upgrades, and disaster recovery hubs. We manage complex electrical/mechanical designs and high-density MEP coordination to deliver reliable power and cooling specifications.",
      stats: "Over 10M sq ft constructed",
      image: "/meghana-7.jpeg",
      iconName: "Cpu",
    },
    {
      id: "office",
      name: "Corporate Office",
      tagline: "Premium interior buildouts reflecting company identities.",
      description: "Meghana is a national leader in corporate tenant interiors and corporate office renovations. We collaborate with designers and architects to craft bespoke headquarters, collaborative open spaces, and modern conference rooms. Our team ensures high-quality acoustic, aesthetic, and functional finishes.",
      stats: "Over 150M sq ft constructed",
      image: "/meghana-14.jpeg",
      iconName: "Building",
    },
    {
      id: "healthcare",
      name: "Healthcare & Lifesciences",
      tagline: "Highly technical medical labs and clinical environments.",
      description: "Medical facilities require exceptional quality controls and compliance measures. Meghana constructs clean rooms, pharmaceutical laboratories, imaging clinics, and ambulatory outpatient centers. We strictly manage contamination protocols and specialized gas/electrical lines.",
      stats: "100% compliance record",
      image: "/meghana-12.jpeg",
      iconName: "HeartPulse",
    },
    {
      id: "aviation",
      name: "Aviation & Airport",
      tagline: "Active terminal modernizations under tight regulations.",
      description: "We operate under rigorous FAA and TSA security parameters to execute terminal renovations, baggage handling expansions, passenger lounges, and ticket counter buildouts. Our phased scheduling keeps airport operations active with minimal passenger interruption.",
      stats: "24/7 active site execution",
      image: "/meghana-1.jpeg",
      iconName: "Plane",
    },
    {
      id: "retail",
      name: "Retail",
      tagline: "High-end flagship stores in premier locations.",
      description: "Brand presentation is everything. Meghana executes luxury retail buildouts, boutique store rollouts, and flagship experiences. We focus on premium storefront glazing, custom millwork, and custom architectural lighting layouts to match branding guidelines.",
      stats: "Premium SoHo & Beverly Hills delivery",
      image: "/meghana-2.jpeg",
      iconName: "ShoppingBag",
    },
    {
      id: "hospitality",
      name: "Hospitality & Entertainment",
      tagline: "Sophisticated hotels, gaming studios, and cafes.",
      description: "From boutique hotels and wellness lounges to soundproof gaming/recording studios, we combine structural acoustics with premium materials to build spaces that engage and relax customers. Our work includes custom bars, commercial kitchens, and bespoke fixtures.",
      stats: "Acoustic STC rating expertise",
      image: "/meghana-9.jpeg",
      iconName: "UtensilsCrossed",
    },
  ],

  // Contact Page Defaults
  contactTitle: "Get Started",
  contactDescription: "Ready to start your next commercial interior or mission-critical build? Drop us a line below or contact one of our regional offices directly.",
  offices: [
    { city: "Vemulawada HQ", phone: "+91-7096666669", address: "Beside Reddy Bhavan, Near Nandi Kaman, Vemulawada, Telangana, 505302" },
    { city: "Hyderabad Office", phone: "+91-7096666669", address: "Madhapur Tech Zone, Hyderabad, Telangana, India" },
    { city: "Karimnagar Office", phone: "+91-7096666669", address: "Collectorate Road, Karimnagar, Telangana, India" },
  ],
};

interface CMSContextType {
  cmsData: CMSData;
  updateCMSData: (newData: Partial<CMSData>) => void;
  resetCMSData: () => void;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [cmsData, setCmsData] = useState<CMSData>(DEFAULT_CMS_DATA);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Load Admin state
    const adminSession = localStorage.getItem("meghana-admin-session");
    if (adminSession === "active") {
      setIsAdmin(true);
    }

    // Live sync from Firebase Realtime Database
    const cmsRef = ref(database, "cmsData");
    const unsubscribe = onValue(cmsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setCmsData({
          ...DEFAULT_CMS_DATA,
          ...data,
          dynamicPhotos: data.dynamicPhotos || [],
          dynamicVideos: data.dynamicVideos || [],
          dynamicBrochures: data.dynamicBrochures || [],
          timelineEvents: data.timelineEvents || DEFAULT_CMS_DATA.timelineEvents,
          leaders: data.leaders || DEFAULT_CMS_DATA.leaders,
          sectorsList: data.sectorsList || DEFAULT_CMS_DATA.sectorsList,
          offices: data.offices || DEFAULT_CMS_DATA.offices,
        });
      } else {
        // Fallback to local storage if Firebase is empty, then write to Firebase
        const savedData = localStorage.getItem("meghana-cms-data");
        if (savedData) {
          try {
            const parsed = JSON.parse(savedData);
            const merged = {
              ...DEFAULT_CMS_DATA,
              ...parsed,
            };
            setCmsData(merged);
            set(cmsRef, merged);
          } catch (e) {
            console.error("Error parsing local storage fallback:", e);
          }
        } else {
          // Initialize Firebase with defaults
          set(cmsRef, DEFAULT_CMS_DATA);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const updateCMSData = (newData: Partial<CMSData>) => {
    const updated = { ...cmsData, ...newData };
    setCmsData(updated);
    localStorage.setItem("meghana-cms-data", JSON.stringify(updated));

    // Save to Firebase
    set(ref(database, "cmsData"), updated).catch((err) => {
      console.error("Firebase write error:", err);
    });
  };

  const resetCMSData = () => {
    setCmsData(DEFAULT_CMS_DATA);
    localStorage.removeItem("meghana-cms-data");

    // Reset Firebase
    set(ref(database, "cmsData"), DEFAULT_CMS_DATA).catch((err) => {
      console.error("Firebase reset error:", err);
    });
  };

  const login = (password: string): boolean => {
    if (password === "Meghana@2026") {
      setIsAdmin(true);
      localStorage.setItem("meghana-admin-session", "active");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("meghana-admin-session");
  };

  // Inject styles for dynamic colors
  useEffect(() => {
    if (!isMounted) return;
    
    const styleId = "meghana-cms-dynamic-styles";
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    const primary = cmsData.primaryColor || "#11385B";
    const hover = cmsData.primaryHoverColor || "#1E4E7A";

    styleElement.innerHTML = `
      :root {
        --primary: ${primary} !important;
        --primary-hover: ${hover} !important;
        --color-primary: ${primary} !important;
        --color-primary-hover: ${hover} !important;
      }
      .bg-primary {
        background-color: ${primary} !important;
      }
      .hover\\:bg-primary-hover:hover {
        background-color: ${hover} !important;
      }
      .text-primary {
        color: ${primary} !important;
      }
      .border-primary {
        border-color: ${primary} !important;
      }
      .hover\\:text-primary:hover {
        color: ${primary} !important;
      }
      .hover\\:border-primary:hover {
        border-color: ${primary} !important;
      }
      .bg-primary\\/10 {
        background-color: ${primary}1a !important; /* 10% opacity */
      }
      .bg-primary\\/20 {
        background-color: ${primary}33 !important; /* 20% opacity */
      }
      .border-primary\\/20 {
        border-color: ${primary}33 !important;
      }
    `;
  }, [cmsData.primaryColor, cmsData.primaryHoverColor, isMounted]);

  return (
    <CMSContext.Provider
      value={{
        cmsData: isMounted ? cmsData : DEFAULT_CMS_DATA,
        updateCMSData,
        resetCMSData,
        isAdmin: isMounted ? isAdmin : false,
        login,
        logout,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
}
