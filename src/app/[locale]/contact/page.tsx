// src/app/[locale]/contact/page.tsx
import type { Metadata } from "next";
import Script from "next/script";
import ContactPage from "@/src/app/[locale]/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact | Yorkshire Global Consulting Inc.",
  description:
    "Contact Yorkshire Global Consulting Inc. for cybersecurity, SSDLC, business analysis, project management, and strategy consulting. Based in Ontario, Canada.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Yorkshire Global Consulting Inc.",
    description:
      "Request a consultation for cybersecurity, secure delivery, and structured execution. Ontario, Canada.",
    url: "/contact",
    siteName: "Yorkshire Global Consulting Inc.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Yorkshire Global Consulting Inc.",
    description:
      "Request a consultation for cybersecurity, secure delivery, and structured execution. Ontario, Canada.",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact",
    url: "https://YOUR_DOMAIN.com/contact",
    isPartOf: {
      "@type": "WebSite",
      name: "Yorkshire Global Consulting Inc.",
      url: "https://YOUR_DOMAIN.com",
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://YOUR_DOMAIN.com/" },
      { "@type": "ListItem", position: 2, name: "Contact", item: "https://YOUR_DOMAIN.com/contact" },
    ],
  };

  return (
    <>
      <Script
        id="jsonld-contact"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="jsonld-contact-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <ContactPage />
    </>
  );
}
