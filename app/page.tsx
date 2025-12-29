import CTA from "@/components/landingpage/cta";
import DemoSection from "@/components/landingpage/demosection";
import Hero from "@/components/landingpage/hero";
import HowItWorks from "@/components/landingpage/howitworks";
import Pricingsection from "@/components/landingpage/pricingsection";
import Image from "next/image";

export default function Page() {
  return (
    <div>
      <Hero />
      <DemoSection />
      <HowItWorks />
      <Pricingsection />
      <CTA/>
    </div>
  );
}
