import { About, PageBanner } from "@/components";
import { aboutData } from "@/data";

export default function AboutPage() {
  return (
    <main className="w-full">
      <PageBanner />
      <About data={aboutData} />
    </main>
  );
}
