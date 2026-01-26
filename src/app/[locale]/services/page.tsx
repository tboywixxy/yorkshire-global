// src/app/[locale]/services/page.tsx
import type { Metadata } from "next";
import Script from "next/script";
import ServicesPage from "./ServicesPage";

export const metadata: Metadata = {
  title: "Services | Cybersecurity, SSDLC & Delivery Consulting",
  description:
    "Yorkshire Global Consulting Inc. provides cybersecurity services, Secure Software Development Lifecycle (SSDLC) implementation, business analysis, project management, and strategy consulting.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | Yorkshire Global Consulting Inc.",
    description:
      "Cybersecurity, SSDLC/secure development, business analysis, project management, and strategy consulting.",
    url: "/services",
    siteName: "Yorkshire Global Consulting Inc.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Yorkshire Global Consulting Inc.",
    description:
      "Cybersecurity, SSDLC/secure development, business analysis, project management, and strategy consulting.",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Services",
    url: "https://YOUR_DOMAIN.com/services",
    isPartOf: {
      "@type": "WebSite",
      name: "Yorkshire Global Consulting Inc.",
      url: "https://YOUR_DOMAIN.com",
    },
    about: [
      "Cybersecurity Services",
      "Secure Software Development Lifecycle (SSDLC)",
      "Business Analysis",
      "Project Management",
      "Strategy Consulting",
    ],
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://YOUR_DOMAIN.com/" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://YOUR_DOMAIN.com/services" },
    ],
  };

  return (
    <>
      <Script
        id="jsonld-services"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="jsonld-services-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <ServicesPage />
    </>
  );
}
