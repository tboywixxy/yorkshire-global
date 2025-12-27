// app/industries/page.tsx
import type { Metadata } from "next";
import Script from "next/script";
import IndustriesPage from "./IndustriesPage";

export const metadata: Metadata = {
  title: "Industries We Serve | Yorkshire Global Consulting Inc.",
  description:
    "Industries supported by Yorkshire Global Consulting Inc., including healthcare, finance, technology, public sector, gaming, and SMEs—focused on cybersecurity, secure delivery, and operational clarity.",
  alternates: { canonical: "/industries" },
  openGraph: {
    title: "Industries We Serve | Yorkshire Global Consulting Inc.",
    description:
      "Tailored consulting for cybersecurity, secure delivery, and structured execution across multiple industries.",
    url: "/industries",
    siteName: "Yorkshire Global Consulting Inc.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries We Serve | Yorkshire Global Consulting Inc.",
    description:
      "Tailored consulting for cybersecurity, secure delivery, and structured execution across multiple industries.",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Industries We Serve",
    url: "https://YOUR_DOMAIN.com/industries",
    isPartOf: {
      "@type": "WebSite",
      name: "Yorkshire Global Consulting Inc.",
      url: "https://YOUR_DOMAIN.com",
    },
    about: ["Cybersecurity", "Secure Delivery", "Business Analysis", "Project Management"],
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://YOUR_DOMAIN.com/" },
      { "@type": "ListItem", position: 2, name: "Industries", item: "https://YOUR_DOMAIN.com/industries" },
    ],
  };

  return (
    <>
      <Script
        id="jsonld-industries"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="jsonld-industries-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <IndustriesPage />
    </>
  );
}
