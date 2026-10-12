import { About, PageBanner } from "@/components";
import { aboutData } from "@/data";

export default function Contact() {
  return (
    <main className="w-full">
      <PageBanner />
      <About data={aboutData} />
    </main>
  );
}
