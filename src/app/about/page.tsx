import CTA from "@/components/CTA";
import AboutIntroSection from "./AboutIntroSection";
import MissionVisionValuesSection from "./MissionVisionValuesSection";
import CapabilitiesSection from "./CapabilitiesSection";
import ApproachSection from "./ApproachSection";
import SectorsSection from "./SectorsSection";

export default function AboutPage() {
  return (
    <>
      <AboutIntroSection />
      <MissionVisionValuesSection />
      <CapabilitiesSection />
      <ApproachSection />
      <SectorsSection />

      <CTA
        title="Want to learn how we can support your team?"
        subtitle="Tell us what you’re working on, and we’ll respond with next steps."
      />
    </>
  );
}
