import { PageBanner, Faq } from "@/components";
import { faqData } from "@/data";

export default function FaqsPage() {
  return (
    <main className="w-full">
      <PageBanner
        title="FREQUENTLY ASKED QUESTIONS"
        breadcrumb="FAQs"
      />
      <Faq data={faqData} />
    </main>
  );
}
