import { Servicesection, PageBanner, Blog, ClientTestimonials } from "@/components";
import { servicesData, blogData, testimonialsData } from "@/data";

const Service = Servicesection;

export default function Services() {
  return (
    <main className="w-full">
      <PageBanner />
      <Servicesection data={servicesData} />
     <ClientTestimonials data={testimonialsData} />
      <Blog data={blogData}/>
    </main>
  );
}
