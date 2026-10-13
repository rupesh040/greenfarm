import { ClientTestimonials, PageBanner, Team } from "@/components";
import { teamData, testimonialsData } from "@/data";

export default function TeamPage() {
  return (
    <main className="w-full">
      <PageBanner />
      <Team data={teamData} />
      <ClientTestimonials data={testimonialsData} />
    </main>
  );
}
