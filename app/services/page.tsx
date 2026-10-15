import { Servicesection, PageBanner } from "@/components";
import { servicesData } from "@/data";

export default function Services() {
  return (
    <main className="w-full">
      <PageBanner />
      <Servicesection data={servicesData} />
    </main>
  );
}
