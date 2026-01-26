// src/app/[locale]/page.tsx
import React from "react";
import Script from "next/script";
import CTA from "@/src/components/CTA";

import HeroSlider from "./HeroSlider";
import WhoWeAreSection from "./WhoWeAreSection";
import ServicesPreviewSection from "./ServicesPreviewSection";
import IndustriesSection from "./IndustriesSection";

export const metadata = {
  title: "Cybersecurity, Secure Delivery & Consulting | Yorkshire Global Consulting Inc.",
  description:
    "Yorkshire Global Consulting Inc. helps organizations strengthen cybersecurity, improve secure delivery, and execute projects with confidence—supporting governance, compliance, analysis, and delivery.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Yorkshire Global Consulting Inc.",
    description:
      "Cybersecurity, secure delivery, business analysis, and project management for organizations across industries.",
    url: "/",
    siteName: "Yorkshire Global Consulting Inc.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yorkshire Global Consulting Inc.",
    description:
      "Cybersecurity, secure delivery, business analysis, and project management for organizations across industries.",
  },
};

export default function HomePage() {
  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Yorkshire Global Consulting Inc.",
    url: "https://YOUR_DOMAIN_HERE.com",
    description: "Cybersecurity, secure delivery, business analysis, and project management services.",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Ontario",
      addressCountry: "CA",
    },
  };

  const jsonLdSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Yorkshire Global Consulting Inc.",
    url: "https://YOUR_DOMAIN_HERE.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://YOUR_DOMAIN_HERE.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Script
        id="jsonld-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
      />
      <Script
        id="jsonld-site"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSite) }}
      />

      <HeroSlider />
      <WhoWeAreSection />
      <ServicesPreviewSection />
      <IndustriesSection />

      <CTA title="Ready to strengthen your organization?" subtitle="Contact our team today." buttonText="Contact our team" buttonHref="/contact" />
    </>
  );
}
