import { PageBanner, BlogDetail } from "@/components";
import { blogDetailData } from "@/data";

export default function BlogDetailsPage() {
  return (
    <main className="w-full">
      <PageBanner
        title={blogDetailData.title.toUpperCase()}
        breadcrumb={blogDetailData.title}
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: blogDetailData.title },
        ]}
      />
      <BlogDetail data={blogDetailData} />
    </main>
  );
}
