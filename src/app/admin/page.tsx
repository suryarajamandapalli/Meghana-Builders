"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCMS, CMSData } from "@/context/CMSContext";
import { Lock, Save, LogOut, ArrowLeft, RefreshCw, CheckCircle, AlertCircle, Plus, Trash2, Image as ImageIcon, Video, FileText } from "lucide-react";

export default function AdminPage() {
  const { cmsData, updateCMSData, resetCMSData, isAdmin, login, logout } = useCMS();
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Local form states
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
  });

  // Portfolio local addition states
  const [activeManagerTab, setActiveManagerTab] = useState<"photos" | "videos" | "brochures">("photos");
  
  // Add states for new items
  const [newPhoto, setNewPhoto] = useState({ src: "", alt: "", caption: "", fileBase64: "" });
  const [newVideo, setNewVideo] = useState({ src: "", thumb: "", title: "", duration: "", videoBase64: "", thumbBase64: "" });
  const [newBrochure, setNewBrochure] = useState({ title: "", description: "", file: "", thumb: "", pages: "", size: "", fileBase64: "", thumbBase64: "" });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(passwordInput);
    if (success) {
      setLoginError(false);
      setPasswordInput("");
      syncFormState();
    } else {
      setLoginError(true);
    }
  };

  const syncFormState = () => {
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
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCMSData(form);
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

  // Convert File to Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Portfolio items additions
  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    const src = newPhoto.fileBase64 || newPhoto.src || "/meghana-1.jpeg";
    const newItem = {
      src,
      alt: newPhoto.alt || "Uploaded Portfolio Image",
      caption: newPhoto.caption || "Residential Development",
    };
    
    const updatedPhotos = [...(cmsData.dynamicPhotos || []), newItem];
    updateCMSData({ dynamicPhotos: updatedPhotos });
    setNewPhoto({ src: "", alt: "", caption: "", fileBase64: "" });
    alert("Photo added to portfolio!");
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    const src = newVideo.videoBase64 || newVideo.src || "";
    const thumb = newVideo.thumbBase64 || newVideo.thumb || "/meghana-1.jpeg";
    
    if (!src) {
      alert("Please provide a video file upload or a video URL.");
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
    setNewVideo({ src: "", thumb: "", title: "", duration: "", videoBase64: "", thumbBase64: "" });
    alert("Video added to portfolio!");
  };

  const handleAddBrochure = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = newBrochure.fileBase64 || newBrochure.file || "";
    const thumb = newBrochure.thumbBase64 || newBrochure.thumb || "/meghana-1.jpeg";

    if (!file) {
      alert("Please upload a PDF file or enter a PDF file path.");
      return;
    }

    const newItem = {
      title: newBrochure.title || "Project Brochure",
      description: newBrochure.description || "Specifications, floor plans, and layouts.",
      file,
      thumb,
      pages: newBrochure.pages || "Multi-page",
      size: newBrochure.size || "~2 MB",
    };

    const updatedBrochures = [...(cmsData.dynamicBrochures || []), newItem];
    updateCMSData({ dynamicBrochures: updatedBrochures });
    setNewBrochure({ title: "", description: "", file: "", thumb: "", pages: "", size: "", fileBase64: "", thumbBase64: "" });
    alert("PDF Brochure added to portfolio!");
  };

  // Delete dynamic items
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
      <div className="max-w-4xl mx-auto space-y-12">
        
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
              title="Reset all fields to default values"
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

        {/* Form 1: Branding and Colors */}
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Section 1: Themes & Colors */}
          <div className="bg-white dark:bg-[#0d1322] border border-gray-100 dark:border-white/5 rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-100 dark:border-white/5 pb-2 text-[#11385B] dark:text-sky-400">
              Theme Colors Configuration
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">
                  Primary Theme Color (Navy Blue default: #11385B)
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
                    className="flex-grow px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-black dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">
                  Primary Hover Color (default: #1E4E7A)
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
                    className="flex-grow px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-black dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Section 2: General Branding */}
          <div className="bg-white dark:bg-[#0d1322] border border-gray-100 dark:border-white/5 rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-100 dark:border-white/5 pb-2 text-[#11385B] dark:text-sky-400">
              Hero & Branding Content
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">
                  Hero Title
                </label>
                <input
                  type="text"
                  value={form.heroTitle}
                  onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-black dark:text-white"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">
                  Hero Tagline (Build your dreams tagline)
                </label>
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

          {/* Section 3: Contact Info */}
          <div className="bg-white dark:bg-[#0d1322] border border-gray-100 dark:border-white/5 rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-100 dark:border-white/5 pb-2 text-[#11385B] dark:text-sky-400">
              Corporate Contact Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={form.contactPhone}
                  onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-black dark:text-white"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-black dark:text-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">
                Headquarters Address (Vemulawada)
              </label>
              <textarea
                value={form.hqAddress}
                onChange={(e) => setForm({ ...form, hqAddress: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm h-20 resize-none text-black dark:text-white"
                required
              />
            </div>
          </div>

          {/* Section 4: Branch Offices */}
          <div className="bg-white dark:bg-[#0d1322] border border-gray-100 dark:border-white/5 rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-100 dark:border-white/5 pb-2 text-[#11385B] dark:text-sky-400">
              Regional Office Locations
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">
                  Hyderabad Office Address
                </label>
                <input
                  type="text"
                  value={form.hyderabadAddress}
                  onChange={(e) => setForm({ ...form, hyderabadAddress: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-black dark:text-white"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">
                  Karimnagar Office Address
                </label>
                <input
                  type="text"
                  value={form.karimnagarAddress}
                  onChange={(e) => setForm({ ...form, karimnagarAddress: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-black dark:text-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* Save Status Banner */}
          {saveSuccess && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center gap-2 font-medium">
              <CheckCircle className="w-5 h-5 shrink-0 animate-bounce" />
              <span>General branding and colors updated successfully!</span>
            </div>
          )}

          {/* Save Button */}
          <div className="flex items-center gap-4 justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#11385B] hover:bg-[#1E4E7A] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-lg shadow-[#11385B]/20"
            >
              <Save className="w-4 h-4" />
              <span>Save & Publish General Info</span>
            </button>
          </div>

        </form>

        {/* Form 2: Portfolio Uploader CMS */}
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
              { key: "photos", label: "Photos & Images", icon: ImageIcon, count: cmsData.dynamicPhotos.length },
              { key: "videos", label: "Videos", icon: Video, count: cmsData.dynamicVideos.length },
              { key: "brochures", label: "Brochures & PDFs", icon: FileText, count: cmsData.dynamicBrochures.length },
            ] as const).map(({ key, label, icon: Icon, count }) => (
              <button
                key={key}
                onClick={() => setActiveManagerTab(key)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all duration-200 -mb-px cursor-pointer ${
                  activeManagerTab === key
                    ? "border-[#11385B] text-[#11385B] dark:text-white dark:border-white"
                    : "border-transparent text-gray-500 hover:text-black dark:hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{label}</span>
                <span className="ml-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-white/10">
                  {count}
                </span>
              </button>
            ))}
          </div>

          {/* TAB CONTENT: PHOTOS */}
          {activeManagerTab === "photos" && (
            <div className="space-y-6">
              {/* Add form */}
              <form onSubmit={handleAddPhoto} className="p-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-lg space-y-4">
                <h3 className="text-xs uppercase tracking-wider font-extrabold text-[#11385B] dark:text-sky-400 flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Add New Photo
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Photo Title / Alt Text
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Villa Front View"
                      value={newPhoto.alt}
                      onChange={(e) => setNewPhoto({ ...newPhoto, alt: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-xs text-black dark:text-white"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Caption Description
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Modern gated community villa elevation"
                      value={newPhoto.caption}
                      onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-xs text-black dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Upload File
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const base64 = await fileToBase64(file);
                          setNewPhoto({ ...newPhoto, fileBase64: base64 });
                        }
                      }}
                      className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      OR Enter Image URL / Relative Path
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. /meghana-1.jpeg"
                      value={newPhoto.src}
                      onChange={(e) => setNewPhoto({ ...newPhoto, src: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-xs text-black dark:text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-[#11385B] text-white text-xs font-semibold uppercase tracking-wider rounded cursor-pointer hover:bg-[#1E4E7A] transition-colors"
                >
                  Add Photo
                </button>
              </form>

              {/* Dynamic items list */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-400">Uploaded Photos</h4>
                {cmsData.dynamicPhotos.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">No custom photos uploaded yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {cmsData.dynamicPhotos.map((photo, index) => (
                      <div key={index} className="flex gap-3 p-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-lg items-center">
                        <img src={photo.src} alt={photo.alt} className="w-12 h-12 rounded object-cover" />
                        <div className="flex-grow min-w-0">
                          <p className="text-xs font-bold truncate text-black dark:text-white">{photo.alt}</p>
                          <p className="text-[10px] text-gray-400 truncate mt-0.5">{photo.caption}</p>
                        </div>
                        <button
                          onClick={() => handleDeletePhoto(index)}
                          className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded cursor-pointer transition-colors"
                          title="Delete photo"
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

          {/* TAB CONTENT: VIDEOS */}
          {activeManagerTab === "videos" && (
            <div className="space-y-6">
              {/* Add form */}
              <form onSubmit={handleAddVideo} className="p-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-lg space-y-4">
                <h3 className="text-xs uppercase tracking-wider font-extrabold text-[#11385B] dark:text-sky-400 flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Add New Video
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Video Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Villa Interior Tour"
                      value={newVideo.title}
                      onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-xs text-black dark:text-white"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Duration String
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ~1 min 30 sec"
                      value={newVideo.duration}
                      onChange={(e) => setNewVideo({ ...newVideo, duration: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-xs text-black dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Video File / URL
                    </label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const base64 = await fileToBase64(file);
                          setNewVideo({ ...newVideo, videoBase64: base64 });
                        }
                      }}
                      className="w-full text-xs text-gray-500 mb-2"
                    />
                    <input
                      type="text"
                      placeholder="OR Enter Video URL (e.g. /meghana-video-1.mp4)"
                      value={newVideo.src}
                      onChange={(e) => setNewVideo({ ...newVideo, src: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-xs text-black dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Thumbnail Image File / URL
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const base64 = await fileToBase64(file);
                          setNewVideo({ ...newVideo, thumbBase64: base64 });
                        }
                      }}
                      className="w-full text-xs text-gray-500 mb-2"
                    />
                    <input
                      type="text"
                      placeholder="OR Enter Thumbnail Path (e.g. /meghana-2.jpeg)"
                      value={newVideo.thumb}
                      onChange={(e) => setNewVideo({ ...newVideo, thumb: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-xs text-black dark:text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-[#11385B] text-white text-xs font-semibold uppercase tracking-wider rounded cursor-pointer hover:bg-[#1E4E7A] transition-colors"
                >
                  Add Video
                </button>
              </form>

              {/* Dynamic items list */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-400">Uploaded Videos</h4>
                {cmsData.dynamicVideos.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">No custom videos uploaded yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {cmsData.dynamicVideos.map((video, index) => (
                      <div key={index} className="flex gap-3 p-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-lg items-center">
                        <img src={video.thumb} alt={video.title} className="w-12 h-12 rounded object-cover" />
                        <div className="flex-grow min-w-0">
                          <p className="text-xs font-bold truncate text-black dark:text-white">{video.title}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{video.duration}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteVideo(index)}
                          className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded cursor-pointer transition-colors"
                          title="Delete video"
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

          {/* TAB CONTENT: BROCHURES */}
          {activeManagerTab === "brochures" && (
            <div className="space-y-6">
              {/* Add form */}
              <form onSubmit={handleAddBrochure} className="p-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-lg space-y-4">
                <h3 className="text-xs uppercase tracking-wider font-extrabold text-[#11385B] dark:text-sky-400 flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Add New PDF Brochure
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Brochure Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Meghana Villa Master Brochure"
                      value={newBrochure.title}
                      onChange={(e) => setNewBrochure({ ...newBrochure, title: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-xs text-black dark:text-white"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Description
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Floor layouts, site plans and amenities details"
                      value={newBrochure.description}
                      onChange={(e) => setNewBrochure({ ...newBrochure, description: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-xs text-black dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Brochure PDF File / URL
                    </label>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const base64 = await fileToBase64(file);
                          setNewBrochure({ ...newBrochure, fileBase64: base64, size: `~${(file.size / (1024 * 1024)).toFixed(1)} MB` });
                        }
                      }}
                      className="w-full text-xs text-gray-500 mb-2"
                    />
                    <input
                      type="text"
                      placeholder="OR PDF Path (e.g. /brochures/my-file.pdf)"
                      value={newBrochure.file}
                      onChange={(e) => setNewBrochure({ ...newBrochure, file: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-xs text-black dark:text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Cover Thumbnail File / URL
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const base64 = await fileToBase64(file);
                          setNewBrochure({ ...newBrochure, thumbBase64: base64 });
                        }
                      }}
                      className="w-full text-xs text-gray-500 mb-2"
                    />
                    <input
                      type="text"
                      placeholder="OR Thumbnail Path (e.g. /meghana-3.jpeg)"
                      value={newBrochure.thumb}
                      onChange={(e) => setNewBrochure({ ...newBrochure, thumb: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-xs text-black dark:text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Pages Tag / Size Tag
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 4 Pages"
                      value={newBrochure.pages}
                      onChange={(e) => setNewBrochure({ ...newBrochure, pages: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-xs text-black dark:text-white mb-2"
                    />
                    <input
                      type="text"
                      placeholder="e.g. ~2 MB"
                      value={newBrochure.size}
                      onChange={(e) => setNewBrochure({ ...newBrochure, size: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-xs text-black dark:text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-[#11385B] text-white text-xs font-semibold uppercase tracking-wider rounded cursor-pointer hover:bg-[#1E4E7A] transition-colors"
                >
                  Add PDF Brochure
                </button>
              </form>

              {/* Dynamic items list */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-400">Uploaded Brochures</h4>
                {cmsData.dynamicBrochures.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">No custom brochures uploaded yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {cmsData.dynamicBrochures.map((brochure, index) => (
                      <div key={index} className="flex gap-3 p-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-lg items-center">
                        <img src={brochure.thumb} alt={brochure.title} className="w-12 h-12 rounded object-cover" />
                        <div className="flex-grow min-w-0">
                          <p className="text-xs font-bold truncate text-black dark:text-white">{brochure.title}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5 truncate">{brochure.pages} | {brochure.size}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteBrochure(index)}
                          className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded cursor-pointer transition-colors"
                          title="Delete brochure"
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
      </div>
    </div>
  );
}
