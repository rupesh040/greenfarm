import { PageBanner, ServiceDetail } from "@/components";
import { serviceDetailData } from "@/data";

export default function ServiceDetailsPage() {
  return (
    <main className="w-full">
      <PageBanner
        title={serviceDetailData.title.toUpperCase()}
        breadcrumb={serviceDetailData.title}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: serviceDetailData.title },
        ]}
      />
      <ServiceDetail data={serviceDetailData} />
    </main>
  );
}
