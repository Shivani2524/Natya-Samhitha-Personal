import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Providers } from "@/components/providers";
import { AppShell } from "@/components/app-shell";
import { OfflineIndicator } from "@/components/offline-indicator";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Natya Samhitha — Classical Dance Knowledge",
  description:
    "A structured knowledge retrieval system for classical dancers, inspired by the Natya Shastra. Search shlokas, mudras, rasas, and abhinaya techniques.",
  keywords: [
    "Natya Shastra",
    "classical dance",
    "mudra",
    "rasa",
    "abhinaya",
    "bharatanatyam",
    "shloka",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FBF8F1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FBF8F1]">
        <Providers>
          <OfflineIndicator />
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}

