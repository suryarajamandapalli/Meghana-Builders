"use client";

import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const officeDetails = [
  {
    city: "Chicago",
    address: "10 South Riverside Plaza, Suite 2200, Chicago, IL 60606",
    phone: "312-726-6103",
    email: "info@meghanabuilders.com",
    head: "Dave Hall - Chief Executive Officer",
  },
  {
    city: "Los Angeles",
    address: "725 South Figueroa Street, Suite 300, Los Angeles, CA 90017",
    phone: "213-723-1881",
    email: "la@meghanabuilders.com",
    head: "Robert K. - Executive VP / Regional Head",
  },
  {
    city: "New York",
    address: "655 Third Avenue, 10th Floor, New York, NY 10017",
    phone: "212-682-1789",
    email: "ny@meghanabuilders.com",
    head: "Sean B. - Regional President",
  },
  {
    city: "Atlanta",
    address: "999 Peachtree Street NE, Suite 725, Atlanta, GA 30309",
    phone: "404-972-8403",
    email: "atlanta@meghanabuilders.com",
    head: "Brian K. - Vice President",
  },
  {
    city: "Phoenix",
    address: "2555 East Camelback Road, Suite 520, Phoenix, AZ 85016",
    phone: "480-690-5917",
    email: "phoenix@meghanabuilders.com",
    head: "Mark S. - Vice President",
  },
  {
    city: "Dallas-Fort Worth",
    address: "2100 McKinney Ave, Suite 1401, Dallas, TX 75201",
    phone: "972-972-8403",
    email: "dfw@meghanabuilders.com",
    head: "Tony R. - Executive Vice President",
  },
  {
    city: "San Francisco",
    address: "1 Post Street, Suite 300, San Francisco, CA 94104",
    phone: "415-653-0449",
    email: "sf@meghanabuilders.com",
    head: "Matt P. - Vice President",
  },
  {
    city: "Washington, DC",
    address: "1919 Gallows Rd, Suite 350, Vienna, VA 22182",
    phone: "703-962-1814",
    email: "dc@meghanabuilders.com",
    head: "John G. - Vice President / Regional Lead",
  },
];

export default function OfficesPage() {
  return (
    <div className="bg-white dark:bg-[#0B0F19] text-black dark:text-white min-h-screen pt-32 pb-24 px-6 lg:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Title Block */}
        <motion.div 
          className="space-y-4 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-black dark:text-white leading-none uppercase">
            Our Offices
          </h1>
          <p className="text-gray-605 dark:text-gray-300 text-sm font-light leading-relaxed">
            With office hubs positioned in key metro areas across the United States, Meghana Builders & Developers Pvt. Ltd. is structured to coordinate national accounts and serve local client interests.
          </p>
        </motion.div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {officeDetails.map((office, idx) => (
            <motion.div
              key={office.city}
              id={office.city.toLowerCase().replace(/[^a-z]/g, "")}
              className="scroll-mt-24 p-8 border border-gray-100 dark:border-white/10 hover:border-primary/30 rounded-sm bg-white dark:bg-[#0d1322] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
            >
              <div className="space-y-6">
                {/* Office Header */}
                <div className="border-b border-gray-100 dark:border-white/10 pb-4">
                  <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white">
                    {office.city}
                  </h2>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-semibold block mt-1">
                    {office.head}
                  </span>
                </div>

                {/* Office Info */}
                <div className="space-y-4 text-xs text-gray-600 dark:text-gray-300 font-light">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{office.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary shrink-0" />
                    <a href={`tel:${office.phone}`} className="hover:text-primary hover:underline transition-colors">
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary shrink-0" />
                    <a href={`mailto:${office.email}`} className="hover:text-primary hover:underline transition-colors">
                      {office.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-8 mt-auto">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    office.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] uppercase font-bold text-gray-800 dark:text-gray-300 hover:text-primary tracking-widest transition-colors"
                >
                  <span>Google Maps Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
