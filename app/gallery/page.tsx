import { Gallery, PageBanner } from "@/components";
import { galleryData } from "@/data";

export default function GalleryPage() {
  return (
    <main className="w-full">
      <PageBanner />
      <Gallery data={galleryData} />
    </main>
  );
}
