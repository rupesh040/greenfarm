import { PageBanner, BlogDetail } from "@/components";
import { getBlogDetail, blogData, blogDetailData, slugify } from "@/data";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  const blogItems = blogData.items || [];
  const latestBlogs = blogDetailData.latestBlogs || [];

  const params: { id: string }[] = [
    { id: slugify(blogDetailData.title) },
    { id: blogDetailData.id },
  ];

  blogItems.forEach((item) => {
    params.push({ id: slugify(item.title) });
    params.push({ id: item.id });
  });

  latestBlogs.forEach((item) => {
    params.push({ id: slugify(item.title) });
    params.push({ id: item.id });
  });

  return params;
}

export const instant = false;

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params;
  const blog = getBlogDetail(id);

  return (
    <main className="w-full">
      <PageBanner
        title={blog.title.toUpperCase()}
        breadcrumb={blog.title}
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: blog.title },
        ]}
      />
      <BlogDetail data={blog} />
    </main>
  );
}

