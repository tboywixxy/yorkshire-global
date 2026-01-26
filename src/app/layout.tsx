// src/app/layout.tsx
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // ✅ app/[locale]/layout.tsx will render <html> and <body>
  return children;
}
