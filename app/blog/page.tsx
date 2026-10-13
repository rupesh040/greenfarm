import { Blog, PageBanner } from "@/components";
import { blogData } from "@/data";

export default function BlogPage() {
  return (
    <main className="w-full">
      <PageBanner />
      <Blog data={blogData} />
    </main>
  );
}
