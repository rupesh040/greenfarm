import { Contact, PageBanner } from "@/components";
import { contactData } from "@/data";

export default function ContactPage() {
  return (
    <main className="w-full">
      <PageBanner title="CONTACT US" breadcrumb="Contact Us" />
      <Contact data={contactData} />
    </main>
  );
}
