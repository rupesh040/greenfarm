import { PageBanner, ProductDetail } from "@/components";
import { getProductDetail, productsData } from "@/data";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return (productsData.items || []).map((item) => ({
    id: item.id,
  }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProductDetail(id);

  return (
    <main className="w-full">
      <PageBanner
        title={product.title.toUpperCase()}
        breadcrumb={product.title}
      />
      <ProductDetail data={product} />
    </main>
  );
}