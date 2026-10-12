import {
  Hero,
  About,
  Servicesection,
  Features,
  Products,
  Milestones,
  Testimonials,
  Blog,
} from "@/components";
import ScrollAnim from "@/components/ScrollAnim";
import {
  heroData,
  aboutData,
  servicesData,
  featuresData,
  productsData,
  milestonesData,
  testimonialsData,
  blogData,
} from "@/data";

export default function Home() {
  return (
    <div className="w-full">
      <Hero data={heroData} />

      <ScrollAnim>
        <About data={aboutData} />
      </ScrollAnim>

      <ScrollAnim>
        <Servicesection data={servicesData} />
      </ScrollAnim>

      <ScrollAnim>
        <Features data={featuresData} />
      </ScrollAnim>

      <ScrollAnim>
        <Products data={productsData} />
      </ScrollAnim>

      <ScrollAnim>
        <Milestones data={milestonesData} />
      </ScrollAnim>

      <ScrollAnim>
        <Testimonials data={testimonialsData} />
      </ScrollAnim>

      <ScrollAnim>
        <Blog data={blogData} />
      </ScrollAnim>
    </div>
  );
}
