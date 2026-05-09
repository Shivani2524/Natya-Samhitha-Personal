import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Cinzel,
  Lora,
  Tiro_Devanagari_Sanskrit,
  JetBrains_Mono,
} from "next/font/google";
import { Providers } from "@/components/providers";
import { OfflineIndicator } from "@/components/offline-indicator";
import { Sidebar } from "@/components/layout/Sidebar";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-nav",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const tiroDevanagari = Tiro_Devanagari_Sanskrit({
  variable: "--font-sanskrit",
  weight: "400",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Natya Samhitha — नाट्य संहिता | Explore the Wisdom of Natya Shastra",
  description:
    "A premium AI-powered scholarly assistant for exploring the Natya Shastra — the ancient Sanskrit treatise on classical Indian performing arts by Bharata Muni. Search slokas, rasas, mudras, and abhinaya techniques.",
  keywords: [
    "Natya Shastra",
    "Bharata Muni",
    "classical dance",
    "Bharatanatyam",
    "mudra",
    "rasa",
    "navarasas",
    "abhinaya",
    "sloka",
    "Sanskrit",
    "tandava",
    "lasya",
    "Natya Samhitha",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0F0204",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`
        ${cormorantGaramond.variable}
        ${cinzel.variable}
        ${lora.variable}
        ${tiroDevanagari.variable}
        ${jetbrainsMono.variable}
        h-full antialiased
      `}
    >
      <body className="min-h-full flex flex-col md:flex-row h-screen overflow-hidden">
        <Providers>
          <OfflineIndicator />
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
            <main className="flex-1 flex flex-col relative overflow-y-auto">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
