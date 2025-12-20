// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RouteLoadingOverlay from "@/components/RouteLoadingOverlay"; // ✅ add

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
          <Navbar />
          <RouteLoadingOverlay /> {/* ✅ add */}
          <main className="min-h-[60vh] pt-14">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
