import { PageBanner, ServiceDetail } from "@/components";
import { getServiceDetail, servicesData, serviceDetailData } from "@/data";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  const ids = [
    ...(servicesData.items || []).map((item) => ({ id: item.id })),
    ...(serviceDetailData.sidebarServices || []).map((item) => ({ id: item.id })),
  ];
  return ids;
}

export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params;
  const service = getServiceDetail(id);

  return (
    <main className="w-full">
      <PageBanner
        title={service.title.toUpperCase()}
        breadcrumb={service.title}
      />
      <ServiceDetail data={service} />
    </main>
  );
}
