import React from "react";
import {
  Hero,
  About,
  Services,
  Features,
  Products,
  Milestones,
  Testimonials,
  Blog,
} from "@/components";
import content from "@/data/content.json";
import { SiteContent } from "@/types";

export default function Home() {
  const site = (content as unknown as SiteContent).Agriculture;
  const sections = site.sections;

  return (
    <div className="w-full">
      <Hero data={sections.Banner.variants.AgricultureBanner1} />
      <About data={sections.About.variants.AgricultureAbout1} />
      <Services data={sections.Services.variants.AgricultureServices1} />
      <Features data={sections.WhyChooseUs.variants.AgricultureWhyChooseUs1} />
      <Products data={sections.Products.variants.AgricultureProducts1} />
      <Milestones data={sections.CompanyStatistics.variants.AgricultureStats1} />
      <Testimonials data={sections.Testimonial.variants.AgricultureTestimonial1} />
      <Blog data={sections.Blog.variants.AgricultureBlog1} />
    </div>
  );
}
