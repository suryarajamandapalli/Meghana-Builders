import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { CMSProvider } from "@/context/CMSContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Meghana Builders & Developers | Premier Construction & Real Estate",
  description:
    "Meghana Builders & Developers Pvt. Ltd. delivers premium residential apartments, commercial spaces, and infrastructure projects defined by quality, innovation, and trust.",
  openGraph: {
    title: "Meghana Builders & Developers | Premier Construction & Real Estate",
    description:
      "Meghana Builders & Developers Pvt. Ltd. delivers premium residential apartments, commercial spaces, and infrastructure projects defined by quality, innovation, and trust.",
    url: "https://meghanabuilders.com/",
    siteName: "Meghana Builders & Developers Pvt. Ltd.",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <CMSProvider>
          <SmoothScrollProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <ScrollToTop />
          </SmoothScrollProvider>
        </CMSProvider>
      </body>
    </html>
  );
}

