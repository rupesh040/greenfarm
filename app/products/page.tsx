import { productsData} from "@/data";
import { Products, PageBanner} from "@/components";

export default function ProductsPage() {
  return (
    <main className="w-full">
      <PageBanner />
      <Products data={productsData} variant="grid" />
    </main>
  );
}
