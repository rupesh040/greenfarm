import { PageBanner, ProductDetail } from "@/components";
import { getProductDetail, productsData, slugify } from "@/data";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return (productsData.items || []).flatMap((item) => [
    { id: slugify(item.title) },
    { id: item.id },
  ]);
}

export const instant = false;

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProductDetail(id);

  return (
    <main className="w-full">
      <PageBanner
        title={product.title.toUpperCase()}
        breadcrumb={product.title}
        breadcrumbs={[
          { label: "Our Products", href: "/products" },
          { label: product.title },
        ]}
      />
      <ProductDetail data={product} />
    </main>
  );
}