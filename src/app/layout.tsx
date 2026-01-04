// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ThemeProvider from "@/src/components/ThemeProvider";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import RouteLoadingOverlay from "@/src/components/RouteLoadingOverlay";
import FirstLoadSplash from "@/src/components/FirstLoadSplash"; // ✅ NEW

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yorkshire Global Consulting Inc.",
  description: "Secure • Analyze • Deliver • Transform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {/* ✅ shows ONLY once per tab session (first site open) */}
          <FirstLoadSplash />

          <Navbar />

          {/* ✅ shows only when your overlay logic decides there's real loading */}
          <RouteLoadingOverlay />

          <main className="min-h-[60vh] pt-14">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
