import { PageBanner, ServiceDetail } from "@/components";
import { getServiceDetail, servicesData, serviceDetailData, slugify } from "@/data";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  const mainSlugs = (servicesData.items || []).flatMap((item) => [
    { id: slugify(item.title) },
    { id: item.id },
  ]);
  const sidebarSlugs = (serviceDetailData.sidebarServices || []).flatMap((item) => [
    { id: item.id },
    { id: slugify(item.title) },
  ]);
  return [...mainSlugs, ...sidebarSlugs];
}

export const instant = false;

export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params;
  const service = getServiceDetail(id);

  return (
    <main className="w-full">
      <PageBanner
        title={service.title.toUpperCase()}
        breadcrumb={service.title}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />
      <ServiceDetail data={service} />
    </main>
  );
}

