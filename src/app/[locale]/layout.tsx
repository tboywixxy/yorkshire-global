import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";

import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import ThemeProvider from "@/src/components/ThemeProvider";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import RouteLoadingOverlay from "@/src/components/RouteLoadingOverlay";
import FirstLoadSplash from "@/src/components/FirstLoadSplash";

import { locales } from "@/src/navigation"; // your locales array

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yorkshire Global Consulting Inc.",
  description: "Secure • Analyze • Deliver • Transform"
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // ✅ validate locale
  const supported = (locales as readonly string[]).includes(locale);
  if (!supported) notFound();

  // ✅ CRITICAL: tell next-intl what locale this request is using
  // must happen BEFORE getMessages / useTranslations
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        {/* ✅ pass locale explicitly to avoid any ambiguity */}
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <FirstLoadSplash />
            <Navbar />
            <RouteLoadingOverlay />
            <main className="min-h-[60vh] pt-14">{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
