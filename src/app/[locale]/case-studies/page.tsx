// src/app/[locale]/case-studies/page.tsx
import type { Metadata } from "next";
import Script from "next/script";
import CaseStudiesPage from "./CaseStudiesPage";

export const metadata: Metadata = {
  title: "Case Studies | Yorkshire Global Consulting Inc.",
  description:
    "High-level case studies showing how Yorkshire Global Consulting Inc. supports secure delivery, cybersecurity improvements, and structured project execution.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case Studies | Yorkshire Global Consulting Inc.",
    description: "Examples of secure delivery, cybersecurity risk reduction, and project recovery outcomes.",
    url: "/case-studies",
    siteName: "Yorkshire Global Consulting Inc.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Yorkshire Global Consulting Inc.",
    description: "Examples of secure delivery, cybersecurity risk reduction, and project recovery outcomes."
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Case Studies",
    url: "https://YOUR_DOMAIN.com/case-studies",
    isPartOf: {
      "@type": "WebSite",
      name: "Yorkshire Global Consulting Inc.",
      url: "https://YOUR_DOMAIN.com"
    },
    about: ["Cybersecurity", "Secure Software Development Lifecycle (SSDLC)", "Project Management"]
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://YOUR_DOMAIN.com/" },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://YOUR_DOMAIN.com/case-studies" }
    ]
  };

  return (
    <>
      <Script
        id="jsonld-case-studies"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="jsonld-case-studies-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <CaseStudiesPage />
    </>
  );
}
