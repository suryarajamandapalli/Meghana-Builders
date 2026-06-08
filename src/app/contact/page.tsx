"use client";

import { useState } from "react";
import { Send, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

const offices = [
  { city: "Chicago", phone: "312-726-6103", address: "10 South Riverside Plaza, Suite 2200" },
  { city: "Los Angeles", phone: "213-723-1881", address: "725 South Figueroa Street, Suite 300" },
  { city: "New York", phone: "212-682-1789", address: "655 Third Avenue, 10th Floor" },
  { city: "Dallas-Fort Worth", phone: "972-972-8403", address: "2100 McKinney Ave, Suite 1401" },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sector, setSector] = useState("Office");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        setName("");
        setEmail("");
        setSector("Office");
        setMessage("");
      }, 4000);
    }
  };

  return (
    <div className="bg-white dark:bg-[#0B0F19] text-black dark:text-white min-h-screen pt-32 pb-24 px-6 lg:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Header */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs uppercase text-primary dark:text-sky-400 tracking-widest font-semibold block">
              Contact
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-black dark:text-white leading-none uppercase">
              Get Started
            </h1>
          </div>
          <div className="lg:col-span-7">
            <p className="text-gray-600 dark:text-gray-400 text-base font-light leading-relaxed">
              Ready to start your next commercial interior or mission-critical build? Drop us a line below or contact one of our regional offices directly.
            </p>
          </div>
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form panel (Left 7 Columns) */}
          <motion.div 
            className="lg:col-span-7 p-8 md:p-12 border border-gray-100 dark:border-white/10 rounded-sm bg-gray-50/50 dark:bg-white/5 shadow-sm"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold tracking-tight mb-8 text-black dark:text-white">Start a Conversation</h2>

            {!isSent ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-charcoal border border-gray-200 dark:border-gray-800 rounded-sm text-sm text-black dark:text-white focus:border-primary outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-charcoal border border-gray-200 dark:border-gray-800 rounded-sm text-sm text-black dark:text-white focus:border-primary outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400">Project Sector</label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-charcoal border border-gray-200 dark:border-gray-800 rounded-sm text-sm text-black dark:text-white focus:border-primary outline-none transition-colors"
                  >
                    <option value="Office">Corporate Office Interiors</option>
                    <option value="Mission Critical">Mission Critical / Data Center</option>
                    <option value="Retail">Retail Flagships</option>
                    <option value="Healthcare">Healthcare & Lifesciences</option>
                    <option value="Hospitality">Hospitality & Leisure</option>
                    <option value="Other">Other Construction Inquiries</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400">Project Description</label>
                  <textarea
                    rows={6}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your project goals, timelines, and scale..."
                    className="w-full px-4 py-3 bg-white dark:bg-charcoal border border-gray-200 dark:border-gray-800 rounded-sm text-sm text-black dark:text-white focus:border-primary outline-none transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-600"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="py-20 text-center space-y-3">
                <p className="text-primary dark:text-sky-400 text-2xl font-bold">Inquiry Sent Successfully!</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-light max-w-md mx-auto leading-relaxed">
                  Thank you for contacting Meghana Builders & Developers Pvt. Ltd.. Our regional development team will review your inquiry and get back to you within 24 hours.
                </p>
              </div>
            )}
          </motion.div>

          {/* Quick Contact Info (Right 5 Columns) */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white">Regional Contacts</h2>
            <div className="space-y-6">
              {offices.map((office, idx) => (
                <motion.div 
                  key={office.city} 
                  className="flex gap-4 items-start pb-6 border-b border-gray-100 dark:border-white/10 last:border-b-0"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div className="p-3.5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-sm shrink-0">
                    <MapPin className="w-5 h-5 text-primary dark:text-sky-400" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-base text-black dark:text-white">{office.city}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{office.address}</p>
                    <p className="text-xs text-primary dark:text-sky-400 font-medium flex items-center gap-1.5 pt-1">
                      <Phone className="w-3.5 h-3.5 text-primary dark:text-sky-400" />
                      <span>{office.phone}</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
