import { PageBanner, Team } from "@/components";
import { teamData } from "@/data";

export default function TeamPage() {
  return (
    <main className="w-full">
      <PageBanner />
      <Team data={teamData} />
    </main>
  );
}
