"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ref, set, onValue } from "firebase/database";
import { database } from "@/lib/firebase";

export interface CMSData {
  heroTitle: string;
  heroTagline: string;
  contactPhone: string;
  contactEmail: string;
  hqAddress: string;
  hyderabadAddress: string;
  karimnagarAddress: string;
  primaryColor: string;
  primaryHoverColor: string;
  dynamicPhotos: Array<{ src: string; alt: string; caption: string }>;
  dynamicVideos: Array<{ src: string; thumb: string; title: string; duration: string }>;
  dynamicBrochures: Array<{ title: string; description: string; file: string; thumb: string; pages: string; size: string }>;
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
