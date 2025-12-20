import React from "react";
import CTA from "@/components/CTA";

import HeroSlider from "./HeroSlider";
import WhoWeAreSection from "./WhoWeAreSection";
import ServicesPreviewSection from "./ServicesPreviewSection";
import IndustriesSection from "./IndustriesSection";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <WhoWeAreSection />
      <ServicesPreviewSection />
      <IndustriesSection />

      <CTA
        title="Ready to strengthen your organization?"
        subtitle="Contact our team today."
        buttonText="Contact our team"
        buttonHref="/contact"
      />
    </>
  );
}
