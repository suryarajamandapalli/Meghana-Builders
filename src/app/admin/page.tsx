"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCMS, CMSData } from "@/context/CMSContext";
import {
  Lock, Save, LogOut, ArrowLeft, RefreshCw, CheckCircle, AlertCircle,
  Plus, Trash2, Image as ImageIcon, Video, FileText,
  User, Calendar, Info, Layers, Phone, Loader2
} from "lucide-react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AdminPage() {
  const { cmsData, updateCMSData, resetCMSData, isAdmin, login, logout } = useCMS();
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "about" | "sectors" | "contact" | "portfolio">("general");
  const [portfolioTab, setPortfolioTab] = useState<"photos" | "videos" | "brochures">("photos");
  const [isUploading, setIsUploading] = useState(false);

  // Local state for single text fields
  const [form, setForm] = useState({
    heroTitle: cmsData.heroTitle,
    heroTagline: cmsData.heroTagline,
    contactPhone: cmsData.contactPhone,
    contactEmail: cmsData.contactEmail,
    hqAddress: cmsData.hqAddress,
    hyderabadAddress: cmsData.hyderabadAddress,
    karimnagarAddress: cmsData.karimnagarAddress,
    primaryColor: cmsData.primaryColor || "#11385B",
    primaryHoverColor: cmsData.primaryHoverColor || "#1E4E7A",
    aboutTitle: cmsData.aboutTitle || "Our Story",
    aboutText: cmsData.aboutText || "",
    sectorsTitle: cmsData.sectorsTitle || "Industry Sectors",
    sectorsDescription: cmsData.sectorsDescription || "",
    contactTitle: cmsData.contactTitle || "Get Started",
    contactDescription: cmsData.contactDescription || "",
  });

  // Local states for array lists to allow direct editing
  const [timelineEvents, setTimelineEvents] = useState(cmsData.timelineEvents || []);
  const [leaders, setLeaders] = useState(cmsData.leaders || []);
  const [sectorsList, setSectorsList] = useState(cmsData.sectorsList || []);
  const [offices, setOffices] = useState(cmsData.offices || []);

  // Form states for adding new items
  const [newTimeline, setNewTimeline] = useState({ year: "", title: "", description: "" });
  const [newLeader, setNewLeader] = useState({ name: "", role: "", description: "" });
  const [newSector, setNewSector] = useState({ id: "", name: "", tagline: "", description: "", stats: "", image: "", iconName: "Building" });
  const [newOffice, setNewOffice] = useState({ city: "", phone: "", address: "" });

  // Portfolio local addition states
  const [newPhoto, setNewPhoto] = useState<{ src: string; alt: string; caption: string; fileObj: File | null }>({ src: "", alt: "", caption: "", fileObj: null });
  const [newVideo, setNewVideo] = useState<{ src: string; thumb: string; title: string; duration: string; videoObj: File | null; thumbObj: File | null }>({ src: "", thumb: "", title: "", duration: "", videoObj: null, thumbObj: null });
  const [newBrochure, setNewBrochure] = useState<{ title: string; description: string; file: string; thumb: string; pages: string; size: string; fileObj: File | null; thumbObj: File | null }>({ title: "", description: "", file: "", thumb: "", pages: "", size: "", fileObj: null, thumbObj: null });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(passwordInput);
    if (success) {
      setLoginError(false);
      setPasswordInput("");
      syncLocalState();
    } else {
      setLoginError(true);
    }
  };

  const syncLocalState = () => {
    setForm({
      heroTitle: cmsData.heroTitle,
      heroTagline: cmsData.heroTagline,
      contactPhone: cmsData.contactPhone,
      contactEmail: cmsData.contactEmail,
      hqAddress: cmsData.hqAddress,
      hyderabadAddress: cmsData.hyderabadAddress,
      karimnagarAddress: cmsData.karimnagarAddress,
      primaryColor: cmsData.primaryColor || "#11385B",
      primaryHoverColor: cmsData.primaryHoverColor || "#1E4E7A",
      aboutTitle: cmsData.aboutTitle || "Our Story",
      aboutText: cmsData.aboutText || "",
      sectorsTitle: cmsData.sectorsTitle || "Industry Sectors",
      sectorsDescription: cmsData.sectorsDescription || "",
      contactTitle: cmsData.contactTitle || "Get Started",
      contactDescription: cmsData.contactDescription || "",
    });
    setTimelineEvents(cmsData.timelineEvents || []);
    setLeaders(cmsData.leaders || []);
    setSectorsList(cmsData.sectorsList || []);
    setOffices(cmsData.offices || []);
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    updateCMSData({
      ...form,
      timelineEvents,
      leaders,
      sectorsList,
      offices,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all CMS content and colors to default settings?")) {
      resetCMSData();
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  };

  // Helpers

  // Timeline list operations
  const addTimelineEvent = () => {
    if (!newTimeline.year || !newTimeline.title) return;
    const updated = [...timelineEvents, newTimeline];
    setTimelineEvents(updated);
    setNewTimeline({ year: "", title: "", description: "" });
  };

  const removeTimelineEvent = (idx: number) => {
    const updated = timelineEvents.filter((_, i) => i !== idx);
    setTimelineEvents(updated);
  };

  // Leaders list operations
  const addLeader = () => {
    if (!newLeader.name || !newLeader.role) return;
    const updated = [...leaders, newLeader];
    setLeaders(updated);
    setNewLeader({ name: "", role: "", description: "" });
  };

  const removeLeader = (idx: number) => {
    const updated = leaders.filter((_, i) => i !== idx);
    setLeaders(updated);
  };

  // Sectors list operations
  const addSector = () => {
    if (!newSector.name || !newSector.id) return;
    const updated = [...sectorsList, newSector];
    setSectorsList(updated);
    setNewSector({ id: "", name: "", tagline: "", description: "", stats: "", image: "", iconName: "Building" });
  };

  const removeSector = (idx: number) => {
    const updated = sectorsList.filter((_, i) => i !== idx);
    setSectorsList(updated);
  };

  // Offices list operations
  const addOffice = () => {
    if (!newOffice.city || !newOffice.phone) return;
    const updated = [...offices, newOffice];
    setOffices(updated);
    setNewOffice({ city: "", phone: "", address: "" });
  };

  const removeOffice = (idx: number) => {
    const updated = offices.filter((_, i) => i !== idx);
    setOffices(updated);
  };

  // Portfolio items additions
  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    let src = newPhoto.src || "/meghana-1.jpeg";

    if (newPhoto.fileObj) {
      try {
        const fileRef = ref(storage, `portfolio/photos/${Date.now()}_${newPhoto.fileObj.name}`);
        await uploadBytes(fileRef, newPhoto.fileObj);
        src = await getDownloadURL(fileRef);
      } catch (err) {
        console.error("Upload error:", err);
        alert("Failed to upload photo to storage. Make sure Firebase Storage rules allow writing.");
        setIsUploading(false);
        return;
      }
    }

    const newItem = {
      src,
      alt: newPhoto.alt || "Uploaded Portfolio Image",
      caption: newPhoto.caption || "Residential Development",
    };
    const updatedPhotos = [...(cmsData.dynamicPhotos || []), newItem];
    updateCMSData({ dynamicPhotos: updatedPhotos });
    setNewPhoto({ src: "", alt: "", caption: "", fileObj: null });
    setIsUploading(false);
    alert("Photo added to portfolio!");
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    let src = newVideo.src;
    let thumb = newVideo.thumb || "/meghana-1.jpeg";

    try {
      if (newVideo.videoObj) {
        const vidRef = ref(storage, `portfolio/videos/${Date.now()}_${newVideo.videoObj.name}`);
        await uploadBytes(vidRef, newVideo.videoObj);
        src = await getDownloadURL(vidRef);
      }
      if (newVideo.thumbObj) {
        const thumbRef = ref(storage, `portfolio/thumbnails/${Date.now()}_${newVideo.thumbObj.name}`);
        await uploadBytes(thumbRef, newVideo.thumbObj);
        thumb = await getDownloadURL(thumbRef);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload video assets.");
      setIsUploading(false);
      return;
    }

    if (!src) {
      alert("Please provide a video file upload or a video URL.");
      setIsUploading(false);
      return;
    }

    const newItem = {
      src,
      thumb,
      title: newVideo.title || "Uploaded Video Walkthrough",
      duration: newVideo.duration || "~1 min",
    };
    const updatedVideos = [...(cmsData.dynamicVideos || []), newItem];
    updateCMSData({ dynamicVideos: updatedVideos });
    setNewVideo({ src: "", thumb: "", title: "", duration: "", videoObj: null, thumbObj: null });
    setIsUploading(false);
    alert("Video added to portfolio!");
  };

  const handleAddBrochure = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    let fileUrl = newBrochure.file;
    let thumb = newBrochure.thumb || "/meghana-1.jpeg";

    try {
      if (newBrochure.fileObj) {
        const pdfRef = ref(storage, `portfolio/brochures/${Date.now()}_${newBrochure.fileObj.name}`);
        await uploadBytes(pdfRef, newBrochure.fileObj);
        fileUrl = await getDownloadURL(pdfRef);
      }
      if (newBrochure.thumbObj) {
        const thumbRef = ref(storage, `portfolio/thumbnails/${Date.now()}_${newBrochure.thumbObj.name}`);
        await uploadBytes(thumbRef, newBrochure.thumbObj);
        thumb = await getDownloadURL(thumbRef);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload brochure assets.");
      setIsUploading(false);
      return;
    }

    if (!fileUrl) {
      alert("Please upload a PDF file or enter a PDF file path.");
      setIsUploading(false);
      return;
    }
    const newItem = {
      title: newBrochure.title || "Project Brochure",
      description: newBrochure.description || "Specifications, floor plans, and layouts.",
      file: fileUrl,
      thumb,
      pages: newBrochure.pages || "Multi-page",
      size: newBrochure.size || "~2 MB",
    };
    const updatedBrochures = [...(cmsData.dynamicBrochures || []), newItem];
    updateCMSData({ dynamicBrochures: updatedBrochures });
    setNewBrochure({ title: "", description: "", file: "", thumb: "", pages: "", size: "", fileObj: null, thumbObj: null });
    setIsUploading(false);
    alert("PDF Brochure added to portfolio!");
  };

  const handleDeletePhoto = (idx: number) => {
    const list = [...(cmsData.dynamicPhotos || [])];
    list.splice(idx, 1);
    updateCMSData({ dynamicPhotos: list });
  };

  const handleDeleteVideo = (idx: number) => {
    const list = [...(cmsData.dynamicVideos || [])];
    list.splice(idx, 1);
    updateCMSData({ dynamicVideos: list });
  };

  const handleDeleteBrochure = (idx: number) => {
    const list = [...(cmsData.dynamicBrochures || [])];
    list.splice(idx, 1);
    updateCMSData({ dynamicBrochures: list });
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-36 h-36 bg-[#11385B] rounded-full blur-3xl opacity-40 pointer-events-none" />
          
          <div className="flex flex-col items-center mb-8 text-center relative z-10">
            <div className="w-16 h-16 rounded-full bg-[#11385B] border border-white/20 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Admin CMS Login</h1>
            <p className="text-white/60 text-xs mt-2 uppercase tracking-widest">Meghana Builders & Developers</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5 relative z-10">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-bold text-white/70 block">
                CMS Password
              </label>
              <input
                type="password"
                placeholder="Enter admin password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#11385B] focus:ring-1 focus:ring-[#11385B] transition-colors"
                required
              />
            </div>

            {loginError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Invalid credentials. Please try again.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#11385B] hover:bg-[#1E4E7A] text-white font-semibold text-sm rounded-lg uppercase tracking-wider transition-colors cursor-pointer"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F19] text-black dark:text-white pt-24 pb-16 px-6 lg:px-12 font-sans transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 dark:border-white/10 pb-6">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#11385B] dark:text-sky-400 block mb-1">
              CMS Configuration Settings
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight">Admin Control Panel</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer text-gray-600 dark:text-gray-300"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-white/10 pb-2">
          {([
            { id: "general", label: "General & Branding", icon: Info },
            { id: "about", label: "About Page", icon: Calendar },
            { id: "sectors", label: "Sectors Page", icon: Layers },
            { id: "contact", label: "Contact & Offices", icon: Phone },
            { id: "portfolio", label: "Portfolio Assets", icon: ImageIcon },
          ] as const).map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#11385B] text-white shadow-md dark:bg-white dark:text-[#11385B]"
                    : "bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Master Form */}
        <form onSubmit={handleSaveAll} className="space-y-6">

          {/* TAB 1: GENERAL */}
          {activeTab === "general" && (
            <div className="space-y-6">
              {/* Branding and Colors */}
              <div className="bg-white dark:bg-[#0d1322] border border-gray-100 dark:border-white/5 rounded-xl p-6 shadow-sm space-y-6">
                <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-100 dark:border-white/5 pb-2 text-[#11385B] dark:text-sky-400">
                  Branding Themes & Colors
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                      Primary Theme Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={form.primaryColor}
                        onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
                        className="w-12 h-10 border border-gray-200 dark:border-white/10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={form.primaryColor}
                        onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
                        className="flex-grow px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                      Primary Hover Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={form.primaryHoverColor}
                        onChange={(e) => setForm({ ...form, primaryHoverColor: e.target.value })}
                        className="w-12 h-10 border border-gray-200 dark:border-white/10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={form.primaryHoverColor}
                        onChange={(e) => setForm({ ...form, primaryHoverColor: e.target.value })}
                        className="flex-grow px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Hero Title</label>
                    <input
                      type="text"
                      value={form.heroTitle}
                      onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-black dark:text-white"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Hero Tagline</label>
                    <input
                      type="text"
                      value={form.heroTagline}
                      onChange={(e) => setForm({ ...form, heroTagline: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-black dark:text-white"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* General Contact */}
              <div className="bg-white dark:bg-[#0d1322] border border-gray-100 dark:border-white/5 rounded-xl p-6 shadow-sm space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-100 dark:border-white/5 pb-2 text-[#11385B] dark:text-sky-400">
                  Global Contact Info (Header/Footer)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Contact Phone</label>
                    <input
                      type="text"
                      value={form.contactPhone}
                      onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-black dark:text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Contact Email</label>
                    <input
                      type="email"
                      value={form.contactEmail}
                      onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-black dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Vemulawada HQ Address</label>
                    <textarea
                      value={form.hqAddress}
                      onChange={(e) => setForm({ ...form, hqAddress: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-xs h-20 resize-none text-black dark:text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Hyderabad Branch Address</label>
                    <textarea
                      value={form.hyderabadAddress}
                      onChange={(e) => setForm({ ...form, hyderabadAddress: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-xs h-20 resize-none text-black dark:text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Karimnagar Branch Address</label>
                    <textarea
                      value={form.karimnagarAddress}
                      onChange={(e) => setForm({ ...form, karimnagarAddress: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-xs h-20 resize-none text-black dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ABOUT */}
          {activeTab === "about" && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#0d1322] border border-gray-100 dark:border-white/5 rounded-xl p-6 shadow-sm space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-100 dark:border-white/5 pb-2 text-[#11385B] dark:text-sky-400">
                  About Story Header
                </h2>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">About Section Title</label>
                  <input
                    type="text"
                    value={form.aboutTitle}
                    onChange={(e) => setForm({ ...form, aboutTitle: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-black dark:text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">About Section Paragraph Description</label>
                  <textarea
                    rows={4}
                    value={form.aboutText}
                    onChange={(e) => setForm({ ...form, aboutText: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-black dark:text-white"
                  />
                </div>
              </div>

              {/* Milestones / Timeline List */}
              <div className="bg-white dark:bg-[#0d1322] border border-gray-100 dark:border-white/5 rounded-xl p-6 shadow-sm space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-100 dark:border-white/5 pb-2 text-[#11385B] dark:text-sky-400">
                  Timeline Milestones
                </h2>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {timelineEvents.map((evt, idx) => (
                    <div key={idx} className="flex gap-2 p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg items-start">
                      <input
                        type="text"
                        value={evt.year}
                        onChange={(e) => {
                          const updated = [...timelineEvents];
                          updated[idx].year = e.target.value;
                          setTimelineEvents(updated);
                        }}
                        className="w-16 px-2 py-1 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-xs font-bold text-center"
                        placeholder="Year"
                      />
                      <div className="flex-grow space-y-1">
                        <input
                          type="text"
                          value={evt.title}
                          onChange={(e) => {
                            const updated = [...timelineEvents];
                            updated[idx].title = e.target.value;
                            setTimelineEvents(updated);
                          }}
                          className="w-full px-2 py-1 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-xs font-semibold"
                          placeholder="Event Title"
                        />
                        <textarea
                          value={evt.description}
                          onChange={(e) => {
                            const updated = [...timelineEvents];
                            updated[idx].description = e.target.value;
                            setTimelineEvents(updated);
                          }}
                          className="w-full px-2 py-1 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-xs h-12 resize-none"
                          placeholder="Description"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeTimelineEvent(idx)}
                        className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded cursor-pointer transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add timeline item */}
                <div className="p-4 bg-gray-50 dark:bg-white/5 border border-dashed border-gray-300 dark:border-white/15 rounded-xl space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#11385B] dark:text-sky-400">Add New Milestone</h3>
                  <div className="grid grid-cols-4 gap-2">
                    <input
                      type="text"
                      placeholder="Year (e.g. 2026)"
                      value={newTimeline.year}
                      onChange={(e) => setNewTimeline({ ...newTimeline, year: e.target.value })}
                      className="px-3 py-1.5 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-xs col-span-1"
                    />
                    <input
                      type="text"
                      placeholder="Milestone Title"
                      value={newTimeline.title}
                      onChange={(e) => setNewTimeline({ ...newTimeline, title: e.target.value })}
                      className="px-3 py-1.5 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-xs col-span-3"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Milestone Description details..."
                    value={newTimeline.description}
                    onChange={(e) => setNewTimeline({ ...newTimeline, description: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-xs"
                  />
                  <button
                    type="button"
                    onClick={addTimelineEvent}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Insert Milestone</span>
                  </button>
                </div>
              </div>

              {/* Leadership List */}
              <div className="bg-white dark:bg-[#0d1322] border border-gray-100 dark:border-white/5 rounded-xl p-6 shadow-sm space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-100 dark:border-white/5 pb-2 text-[#11385B] dark:text-sky-400">
                  Leadership Team
                </h2>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {leaders.map((leader, idx) => (
                    <div key={idx} className="flex gap-2 p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg items-start">
                      <div className="flex-grow space-y-1.5">
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={leader.name}
                            onChange={(e) => {
                              const updated = [...leaders];
                              updated[idx].name = e.target.value;
                              setLeaders(updated);
                            }}
                            className="w-full px-2 py-1 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-xs font-bold"
                            placeholder="Name"
                          />
                          <input
                            type="text"
                            value={leader.role}
                            onChange={(e) => {
                              const updated = [...leaders];
                              updated[idx].role = e.target.value;
                              setLeaders(updated);
                            }}
                            className="w-full px-2 py-1 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-xs font-semibold"
                            placeholder="Role/Title"
                          />
                        </div>
                        <textarea
                          value={leader.description}
                          onChange={(e) => {
                            const updated = [...leaders];
                            updated[idx].description = e.target.value;
                            setLeaders(updated);
                          }}
                          className="w-full px-2 py-1 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-xs h-12 resize-none"
                          placeholder="Description Bio"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLeader(idx)}
                        className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded cursor-pointer transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Leader Item */}
                <div className="p-4 bg-gray-50 dark:bg-white/5 border border-dashed border-gray-300 dark:border-white/15 rounded-xl space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#11385B] dark:text-sky-400">Add New Member</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={newLeader.name}
                      onChange={(e) => setNewLeader({ ...newLeader, name: e.target.value })}
                      className="px-3 py-1.5 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Role (e.g. Director)"
                      value={newLeader.role}
                      onChange={(e) => setNewLeader({ ...newLeader, role: e.target.value })}
                      className="px-3 py-1.5 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-xs"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Short bio description..."
                    value={newLeader.description}
                    onChange={(e) => setNewLeader({ ...newLeader, description: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-xs"
                  />
                  <button
                    type="button"
                    onClick={addLeader}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Insert Member</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SECTORS */}
          {activeTab === "sectors" && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#0d1322] border border-gray-100 dark:border-white/5 rounded-xl p-6 shadow-sm space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-100 dark:border-white/5 pb-2 text-[#11385B] dark:text-sky-400">
                  Sectors Page Intro
                </h2>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Sectors Page Title</label>
                  <input
                    type="text"
                    value={form.sectorsTitle}
                    onChange={(e) => setForm({ ...form, sectorsTitle: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-black dark:text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Description Paragraph</label>
                  <textarea
                    rows={3}
                    value={form.sectorsDescription}
                    onChange={(e) => setForm({ ...form, sectorsDescription: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-black dark:text-white"
                  />
                </div>
              </div>

              {/* Sectors List */}
              <div className="bg-white dark:bg-[#0d1322] border border-gray-100 dark:border-white/5 rounded-xl p-6 shadow-sm space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-100 dark:border-white/5 pb-2 text-[#11385B] dark:text-sky-400">
                  Sectors List
                </h2>

                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {sectorsList.map((sec, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg space-y-2 relative">
                      <button
                        type="button"
                        onClick={() => removeSector(idx)}
                        className="absolute top-3 right-3 p-1.5 text-rose-500 hover:bg-rose-500/10 rounded cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-3 gap-2 pr-8">
                        <input
                          type="text"
                          value={sec.name}
                          onChange={(e) => {
                            const updated = [...sectorsList];
                            updated[idx].name = e.target.value;
                            setSectorsList(updated);
                          }}
                          className="px-2 py-1 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-xs font-bold"
                          placeholder="Sector Name"
                        />
                        <input
                          type="text"
                          value={sec.tagline}
                          onChange={(e) => {
                            const updated = [...sectorsList];
                            updated[idx].tagline = e.target.value;
                            setSectorsList(updated);
                          }}
                          className="px-2 py-1 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-xs"
                          placeholder="Tagline"
                        />
                        <input
                          type="text"
                          value={sec.stats}
                          onChange={(e) => {
                            const updated = [...sectorsList];
                            updated[idx].stats = e.target.value;
                            setSectorsList(updated);
                          }}
                          className="px-2 py-1 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-xs font-semibold"
                          placeholder="Stats tag"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={sec.image}
                          onChange={(e) => {
                            const updated = [...sectorsList];
                            updated[idx].image = e.target.value;
                            setSectorsList(updated);
                          }}
                          className="px-2 py-1 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-[10px]"
                          placeholder="Image Path (e.g. /meghana-1.jpeg)"
                        />
                        <input
                          type="text"
                          value={sec.iconName}
                          onChange={(e) => {
                            const updated = [...sectorsList];
                            updated[idx].iconName = e.target.value;
                            setSectorsList(updated);
                          }}
                          className="px-2 py-1 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-[10px]"
                          placeholder="Lucide Icon (e.g. Cpu, Building)"
                        />
                        <span className="text-[10px] text-gray-400 self-center">ID: {sec.id}</span>
                      </div>

                      <textarea
                        value={sec.description}
                        onChange={(e) => {
                          const updated = [...sectorsList];
                          updated[idx].description = e.target.value;
                          setSectorsList(updated);
                        }}
                        className="w-full px-2 py-1 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-xs h-16 resize-none"
                        placeholder="Detailed sector text description..."
                      />
                    </div>
                  ))}
                </div>

                {/* Add Sector Form */}
                <div className="p-4 bg-gray-50 dark:bg-white/5 border border-dashed border-gray-300 dark:border-white/15 rounded-xl space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#11385B] dark:text-sky-400">Add New Sector Block</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Name (e.g. Luxury Villas)"
                      value={newSector.name}
                      onChange={(e) => setNewSector({ ...newSector, name: e.target.value, id: e.target.value.toLowerCase().replace(/ /g, "-") })}
                      className="px-3 py-1.5 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Tagline tagline"
                      value={newSector.tagline}
                      onChange={(e) => setNewSector({ ...newSector, tagline: e.target.value })}
                      className="px-3 py-1.5 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Stats Tag"
                      value={newSector.stats}
                      onChange={(e) => setNewSector({ ...newSector, stats: e.target.value })}
                      className="px-3 py-1.5 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Image relative path (e.g. /meghana-1.jpeg)"
                      value={newSector.image}
                      onChange={(e) => setNewSector({ ...newSector, image: e.target.value })}
                      className="px-3 py-1.5 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Lucide Icon (e.g. Building, Cpu, HeartPulse)"
                      value={newSector.iconName}
                      onChange={(e) => setNewSector({ ...newSector, iconName: e.target.value })}
                      className="px-3 py-1.5 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-xs"
                    />
                  </div>
                  <textarea
                    placeholder="Full detailed sector description..."
                    value={newSector.description}
                    onChange={(e) => setNewSector({ ...newSector, description: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-xs h-16 resize-none"
                  />
                  <button
                    type="button"
                    onClick={addSector}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Insert Sector</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CONTACT & OFFICES */}
          {activeTab === "contact" && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#0d1322] border border-gray-100 dark:border-white/5 rounded-xl p-6 shadow-sm space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-100 dark:border-white/5 pb-2 text-[#11385B] dark:text-sky-400">
                  Contact Page Headers
                </h2>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Contact Title</label>
                  <input
                    type="text"
                    value={form.contactTitle}
                    onChange={(e) => setForm({ ...form, contactTitle: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-black dark:text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Description Text</label>
                  <textarea
                    rows={3}
                    value={form.contactDescription}
                    onChange={(e) => setForm({ ...form, contactDescription: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-black dark:text-white"
                  />
                </div>
              </div>

              {/* Regional Office Contacts */}
              <div className="bg-white dark:bg-[#0d1322] border border-gray-100 dark:border-white/5 rounded-xl p-6 shadow-sm space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-100 dark:border-white/5 pb-2 text-[#11385B] dark:text-sky-400">
                  Office Locations & Contacts
                </h2>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {offices.map((office, idx) => (
                    <div key={idx} className="flex gap-2 p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg items-start">
                      <div className="flex-grow space-y-1.5">
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={office.city}
                            onChange={(e) => {
                              const updated = [...offices];
                              updated[idx].city = e.target.value;
                              setOffices(updated);
                            }}
                            className="w-full px-2 py-1 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-xs font-bold"
                            placeholder="Office City/Region Name"
                          />
                          <input
                            type="text"
                            value={office.phone}
                            onChange={(e) => {
                              const updated = [...offices];
                              updated[idx].phone = e.target.value;
                              setOffices(updated);
                            }}
                            className="w-full px-2 py-1 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-xs font-semibold"
                            placeholder="Phone Number"
                          />
                        </div>
                        <input
                          type="text"
                          value={office.address}
                          onChange={(e) => {
                            const updated = [...offices];
                            updated[idx].address = e.target.value;
                            setOffices(updated);
                          }}
                          className="w-full px-2 py-1 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-xs"
                          placeholder="Office Full Address"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeOffice(idx)}
                        className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded cursor-pointer transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Office Item */}
                <div className="p-4 bg-gray-50 dark:bg-white/5 border border-dashed border-gray-300 dark:border-white/15 rounded-xl space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#11385B] dark:text-sky-400">Add New Office Contact</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Office City (e.g. Vemulawada HQ)"
                      value={newOffice.city}
                      onChange={(e) => setNewOffice({ ...newOffice, city: e.target.value })}
                      className="px-3 py-1.5 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      value={newOffice.phone}
                      onChange={(e) => setNewOffice({ ...newOffice, phone: e.target.value })}
                      className="px-3 py-1.5 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-xs"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Full street address..."
                    value={newOffice.address}
                    onChange={(e) => setNewOffice({ ...newOffice, address: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded text-xs"
                  />
                  <button
                    type="button"
                    onClick={addOffice}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Insert Office</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PORTFOLIO (Handles its own separate Firebase upload, kept here for dashboard parity) */}
          {activeTab === "portfolio" && (
            <div className="bg-white dark:bg-[#0d1322] border border-gray-100 dark:border-white/5 rounded-xl p-6 shadow-sm space-y-6">
              <div className="border-b border-gray-100 dark:border-white/5 pb-3">
                <h2 className="text-lg font-bold tracking-tight">Portfolio Asset Uploader</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Add new assets (images, videos, or brochures) directly to your live portfolio. Files are processed locally.
                </p>
              </div>

              {/* Media Tab Selector */}
              <div className="flex gap-2 border-b border-gray-100 dark:border-white/10 pb-0">
                {([
                  { key: "photos", label: "Photos & Images", count: cmsData.dynamicPhotos.length },
                  { key: "videos", label: "Videos", count: cmsData.dynamicVideos.length },
                  { key: "brochures", label: "Brochures & PDFs", count: cmsData.dynamicBrochures.length },
                ] as const).map(({ key, label, count }) => (
                  <button
                    type="button"
                    key={key}
                    onClick={() => setPortfolioTab(key)}
                    className={`px-4 py-2 text-xs font-bold border-b-2 transition-all -mb-px cursor-pointer ${
                      portfolioTab === key
                        ? "border-[#11385B] text-[#11385B] dark:text-white dark:border-white"
                        : "border-transparent text-gray-500 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    <span>{label}</span>
                    <span className="ml-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-white/10">
                      {count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Photos Panel */}
              {portfolioTab === "photos" && (
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-lg space-y-4">
                    <h3 className="text-xs uppercase tracking-wider font-extrabold text-[#11385B] dark:text-sky-400 flex items-center gap-2">
                      <Plus className="w-4 h-4" /> Add New Photo
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Photo Title / Alt</label>
                        <input
                          type="text"
                          placeholder="e.g. Villa Front View"
                          value={newPhoto.alt}
                          onChange={(e) => setNewPhoto({ ...newPhoto, alt: e.target.value })}
                          className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Caption Description</label>
                        <input
                          type="text"
                          placeholder="e.g. Modern gated community villa elevation"
                          value={newPhoto.caption}
                          onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
                          className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-xs"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Upload File</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setNewPhoto({ ...newPhoto, fileObj: file });
                            }
                          }}
                          className="w-full text-xs text-gray-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">OR Enter Image URL / Path</label>
                        <input
                          type="text"
                          placeholder="e.g. /meghana-1.jpeg"
                          value={newPhoto.src}
                          onChange={(e) => setNewPhoto({ ...newPhoto, src: e.target.value })}
                          className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-xs"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddPhoto}
                      disabled={isUploading}
                      className="px-4 py-2 bg-[#11385B] text-white text-xs font-semibold uppercase tracking-wider rounded cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isUploading && <Loader2 className="w-4 h-4 animate-spin" />}
                      {isUploading ? "Uploading..." : "Add Photo"}
                    </button>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-gray-400">Uploaded Photos</h4>
                    {cmsData.dynamicPhotos.length === 0 ? (
                      <p className="text-xs text-gray-400 italic">No custom photos uploaded yet.</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {cmsData.dynamicPhotos.map((photo, index) => (
                          <div key={index} className="flex gap-3 p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg items-center">
                            <img src={photo.src} alt={photo.alt} className="w-12 h-12 rounded object-cover" />
                            <div className="flex-grow min-w-0">
                              <p className="text-xs font-bold truncate">{photo.alt}</p>
                              <p className="text-[10px] text-gray-400 truncate">{photo.caption}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDeletePhoto(index)}
                              className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Videos Panel */}
              {portfolioTab === "videos" && (
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-lg space-y-4">
                    <h3 className="text-xs uppercase tracking-wider font-extrabold text-[#11385B] dark:text-sky-400">Add New Video</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Video Title"
                        value={newVideo.title}
                        onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                        className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Duration (e.g. ~1 min)"
                        value={newVideo.duration}
                        onChange={(e) => setNewVideo({ ...newVideo, duration: e.target.value })}
                        className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400 block font-bold">Video File / URL</label>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setNewVideo({ ...newVideo, videoObj: file });
                            }
                          }}
                          className="text-xs text-gray-500 mb-2"
                        />
                        <input
                          type="text"
                          placeholder="OR Video Path"
                          value={newVideo.src}
                          onChange={(e) => setNewVideo({ ...newVideo, src: e.target.value })}
                          className="w-full px-3 py-2 bg-white border dark:bg-white/5 dark:border-white/10 rounded text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400 block font-bold">Cover Image Thumbnail</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setNewVideo({ ...newVideo, thumbObj: file });
                            }
                          }}
                          className="text-xs text-gray-500 mb-2"
                        />
                        <input
                          type="text"
                          placeholder="OR Thumbnail Path"
                          value={newVideo.thumb}
                          onChange={(e) => setNewVideo({ ...newVideo, thumb: e.target.value })}
                          className="w-full px-3 py-2 bg-white border dark:bg-white/5 dark:border-white/10 rounded text-xs"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddVideo}
                      disabled={isUploading}
                      className="px-4 py-2 bg-[#11385B] text-white text-xs font-semibold uppercase tracking-wider rounded cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isUploading && <Loader2 className="w-4 h-4 animate-spin" />}
                      {isUploading ? "Uploading..." : "Add Video"}
                    </button>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-gray-400">Uploaded Videos</h4>
                    {cmsData.dynamicVideos.length === 0 ? (
                      <p className="text-xs text-gray-400 italic">No custom videos uploaded yet.</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {cmsData.dynamicVideos.map((video, index) => (
                          <div key={index} className="flex gap-3 p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg items-center">
                            <img src={video.thumb} alt={video.title} className="w-12 h-12 rounded object-cover" />
                            <div className="flex-grow min-w-0">
                              <p className="text-xs font-bold truncate">{video.title}</p>
                              <p className="text-[10px] text-gray-400">{video.duration}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDeleteVideo(index)}
                              className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Brochures Panel */}
              {portfolioTab === "brochures" && (
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-lg space-y-4">
                    <h3 className="text-xs uppercase tracking-wider font-extrabold text-[#11385B] dark:text-sky-400">Add New PDF Brochure</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Brochure Title"
                        value={newBrochure.title}
                        onChange={(e) => setNewBrochure({ ...newBrochure, title: e.target.value })}
                        className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Description summary"
                        value={newBrochure.description}
                        onChange={(e) => setNewBrochure({ ...newBrochure, description: e.target.value })}
                        className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400 block font-bold">Brochure PDF</label>
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setNewBrochure({ ...newBrochure, fileObj: file, size: `~${(file.size / (1024 * 1024)).toFixed(1)} MB` });
                            }
                          }}
                          className="text-xs text-gray-500 mb-2"
                        />
                        <input
                          type="text"
                          placeholder="OR PDF Path"
                          value={newBrochure.file}
                          onChange={(e) => setNewBrochure({ ...newBrochure, file: e.target.value })}
                          className="w-full px-3 py-2 bg-white border dark:bg-white/5 dark:border-white/10 rounded text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400 block font-bold">Cover Image Thumbnail</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setNewBrochure({ ...newBrochure, thumbObj: file });
                            }
                          }}
                          className="text-xs text-gray-500 mb-2"
                        />
                        <input
                          type="text"
                          placeholder="OR Thumbnail Path"
                          value={newBrochure.thumb}
                          onChange={(e) => setNewBrochure({ ...newBrochure, thumb: e.target.value })}
                          className="w-full px-3 py-2 bg-white border dark:bg-white/5 dark:border-white/10 rounded text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400 block font-bold">Pages tag / Size tag</label>
                        <input
                          type="text"
                          placeholder="Pages tag (e.g. 4 Pages)"
                          value={newBrochure.pages}
                          onChange={(e) => setNewBrochure({ ...newBrochure, pages: e.target.value })}
                          className="w-full px-3 py-2 bg-white border dark:bg-white/5 dark:border-white/10 rounded text-xs mb-2"
                        />
                        <input
                          type="text"
                          placeholder="Size (e.g. ~2 MB)"
                          value={newBrochure.size}
                          onChange={(e) => setNewBrochure({ ...newBrochure, size: e.target.value })}
                          className="w-full px-3 py-2 bg-white border dark:bg-white/5 dark:border-white/10 rounded text-xs"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddBrochure}
                      disabled={isUploading}
                      className="px-4 py-2 bg-[#11385B] text-white text-xs font-semibold uppercase tracking-wider rounded cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isUploading && <Loader2 className="w-4 h-4 animate-spin" />}
                      {isUploading ? "Uploading..." : "Add PDF Brochure"}
                    </button>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-gray-400">Uploaded Brochures</h4>
                    {cmsData.dynamicBrochures.length === 0 ? (
                      <p className="text-xs text-gray-400 italic">No custom brochures uploaded yet.</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {cmsData.dynamicBrochures.map((brochure, index) => (
                          <div key={index} className="flex gap-3 p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg items-center">
                            <img src={brochure.thumb} alt={brochure.title} className="w-12 h-12 rounded object-cover" />
                            <div className="flex-grow min-w-0">
                              <p className="text-xs font-bold truncate">{brochure.title}</p>
                              <p className="text-[10px] text-gray-400 truncate">{brochure.pages} | {brochure.size}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDeleteBrochure(index)}
                              className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Save Status Banner */}
          {saveSuccess && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center gap-2 font-medium">
              <CheckCircle className="w-5 h-5 shrink-0 animate-bounce" />
              <span>All CMS updates successfully saved and published!</span>
            </div>
          )}

          {/* Master Save Button */}
          {activeTab !== "portfolio" && (
            <div className="flex items-center gap-4 justify-end pt-4 border-t border-gray-200 dark:border-white/10">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#11385B] hover:bg-[#1E4E7A] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-lg shadow-[#11385B]/20 dark:bg-white dark:text-[#11385B] dark:hover:bg-white/90"
              >
                <Save className="w-4 h-4" />
                <span>Save & Publish Changes</span>
              </button>
            </div>
          )}

        </form>
      </div>
    </div>
  );
}
