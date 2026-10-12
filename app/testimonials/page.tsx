import { PageBanner, Testimonials } from "@/components";
import { testimonialsData } from "@/data";

export default function TestimonialsPage() {
  return (
    <main className="w-full">
      <PageBanner />
      <Testimonials data={testimonialsData} />
    </main>
  );
}
