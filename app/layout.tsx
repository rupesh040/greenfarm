import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components";
import content from "@/data/content.json";
import { SiteContent, NavbarData } from "@/types";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "GreenFarm | Agriculture & Organic",
  description:
    "Fresh organic produce, sustainable farming solutions, and bulk agricultural deals directly from GreenFarm.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = (content as unknown as SiteContent).Agriculture;
  const template = site.templateComponents["template-1"];
  const sections = site.sections;

  const topbarVariant = template.shared.Topbar;
  const headerVariant = template.shared.Header;
  const footerVariant = template.shared.Footer;

  const topBarData = sections.Topbar.variants[topbarVariant];
  const headerData = sections.Header.variants[headerVariant];
  const footerData = sections.Footer.variants[footerVariant];

  const navbarData: NavbarData = {
    topBar: topBarData,
    brand: headerData.brand,
    navLinks: headerData.navLinks,
    ctaButton: headerData.ctaButton,
    enquiryModal: headerData.enquiryModal,
  };

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-gray-900 selection:bg-emerald-100 selection:text-emerald-900 scroll-smooth">
        <Navbar initialData={navbarData} />
        <main className="w-full flex-1">{children}</main>
        <Footer data={footerData} />
      </body>
    </html>
  );
}
