import { About, Features, MissionVision, PageBanner, ClientTestimonials } from "@/components";
import { aboutData, featuresData, missionVisionData, testimonialsData } from "@/data";

export default function AboutPage() {
  return (
    <main className="w-full">
      <PageBanner />
      <About data={aboutData} showCta={false} />
      <MissionVision data={missionVisionData} />
      <Features data={featuresData} />
      <ClientTestimonials data={testimonialsData} />
    </main>
  );
}

