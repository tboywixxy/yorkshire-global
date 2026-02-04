import type { Metadata } from "next";
import AboutIntroSection from "./AboutIntroSection";
import MissionVisionValuesSection from "./MissionVisionValuesSection";
import CapabilitiesSection from "./CapabilitiesSection";
import ApproachSection from "./ApproachSection";
import SectorsSection from "./SectorsSection";
import AboutCTA from "./AboutCTA";

export const metadata: Metadata = {
  title: "About Yorkshire Global Consulting Inc.",
  description:
    "Yorkshire Global Consulting Inc. is an Ontario-based consulting firm delivering technology consulting, cybersecurity, business process reengineering, business analysis, project management, and enterprise solution deployment.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Yorkshire Global Consulting Inc.",
    description:
      "Ontario-based consulting firm delivering technology consulting, cybersecurity, and execution-focused delivery support.",
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Yorkshire Global Consulting Inc.",
    description:
      "Ontario-based consulting firm delivering technology consulting, cybersecurity, and execution-focused delivery support.",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutIntroSection />
      <MissionVisionValuesSection />
      <CapabilitiesSection />
      <ApproachSection />
      <SectorsSection />

      {/* ✅ translated CTA */}
      <AboutCTA />
    </>
  );
}
