import rawContent from "./content.json";
import type {
  SiteContent,
  NavbarData,
  HeroData,
  AboutData,
  ServicesData,
  WhyChooseUsData,
  ProductsData,
  MilestonesData,
  TestimonialsData,
  BlogData,
  FooterData,
  ProductDetailData,
  FaqData,
  GalleryData,
  TeamData,
  ServiceDetailData,
  ContactData,
  MissionVisionData,
  BlogDetailData,
  PageBannerData,
  PageBannerConfig,
} from "@/types";

export const content = rawContent as unknown as SiteContent;
export const site = content.Agriculture;
export const sections = site.sections;
export const template = site.templateComponents["template-1"];

export const heroData: HeroData = sections.Banner.variants.AgricultureBanner1;
export const aboutData: AboutData = sections.About.variants.AgricultureAbout1;
export const servicesData: ServicesData = sections.Services.variants.AgricultureServices1;
export const featuresData: WhyChooseUsData = sections.WhyChooseUs.variants.AgricultureWhyChooseUs1;
export const productsData: ProductsData = sections.Products.variants.AgricultureProducts1;
export const milestonesData: MilestonesData = sections.CompanyStatistics.variants.AgricultureStats1;
export const testimonialsData: TestimonialsData = sections.Testimonial.variants.AgricultureTestimonial1;
export const blogData: BlogData = sections.Blog.variants.AgricultureBlog1;
export const faqData: FaqData = sections.Faq.variants.AgricultureFaq1;
export const galleryData: GalleryData = sections.Gallery.variants.AgricultureGallery1;
export const teamData: TeamData = sections.Team.variants.AgricultureTeam1;
export const pageBannersData: Record<string, PageBannerData> =
  (sections.PageBanners?.variants?.Default as unknown as Record<string, PageBannerData>) || {};
export const pageBannersConfig: PageBannerConfig =
  (sections.PageBanners?.variants?.Default?.config as unknown as PageBannerConfig) || {
    homeBreadcrumb: { label: "Home", href: "/" },
    parentBreadcrumbs: {
      services: { label: "Services", href: "/services" },
      "service-details": { label: "Services", href: "/services" },
      products: { label: "Our Products", href: "/products" },
      blog: { label: "Blog", href: "/blog" },
      "blog-details": { label: "Blog", href: "/blog" },
    },
    defaultImage: "/page-banner.webp",
    defaultTitle: "ABOUT US",
    defaultBreadcrumb: "About Us",
    imagePosition: "center center",
    ariaLabels: { breadcrumb: "Breadcrumb" },
  };
export const missionVisionData: MissionVisionData =
  sections.MissionVision?.variants?.AgricultureMissionVision1 as MissionVisionData;
export const blogDetailData: BlogDetailData =
  sections.BlogDetail?.variants?.AgricultureBlogDetail1 as BlogDetailData;

export const contactData: ContactData =
  sections.Contact?.variants?.AgricultureContact1 as ContactData;

const topBarVariant = template.shared.Topbar;
const headerVariant = template.shared.Header;
const footerVariant = template.shared.Footer;

export const footerData: FooterData = sections.Footer.variants[footerVariant];

export const navbarData: NavbarData = {
  topBar: sections.Topbar.variants[topBarVariant],
  brand: sections.Header.variants[headerVariant].brand,
  navLinks: sections.Header.variants[headerVariant].navLinks,
  ctaButton: sections.Header.variants[headerVariant].ctaButton,
  enquiryModal: sections.Header.variants[headerVariant].enquiryModal,
};

export const bannerData = heroData;
export const statsData = milestonesData;
export const whyChooseUsData = featuresData;

export const productDetailData: ProductDetailData =
  sections.ProductDetail?.variants?.AgricultureProductDetail1 as ProductDetailData;

export const serviceDetailData: ServiceDetailData =
  sections.ServiceDetail?.variants?.AgricultureServiceDetail1 as ServiceDetailData;

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function getProductDetail(idOrSlug: string): ProductDetailData {
  const directMatch =
    sections.ProductDetail?.items?.[idOrSlug] ||
    sections.ProductDetail?.variants?.[idOrSlug];
  if (directMatch) return directMatch;

  const cleanQuery = idOrSlug.toLowerCase().trim();
  const item = productsData.items?.find(
    (p) =>
      p.id.toLowerCase() === cleanQuery ||
      slugify(p.title) === cleanQuery ||
      p.title.toLowerCase().replace(/\s+/g, "-") === cleanQuery
  );
  if (!item) return productDetailData;

  const slug = slugify(item.title);

  return {
    ...productDetailData,
    id: slug,
    category: item.badge ? `${item.badge} Produce` : "100% Organic",
    title: item.title,
    description: item.description,
    detailedDescription: [
      `Cultivated using sustainable, eco-conscious farming practices, our ${item.title.toLowerCase()} is grown in nutrient-rich organic soil under optimal sunlight and natural spring irrigation.`,
      `Hand-inspected at daily morning harvest and packed in breathable eco-friendly packaging to ensure uncompromised purity, crisp natural texture, and exceptional farm-fresh taste from our fields directly to your table.`,
    ],
    images: [
      { src: item.image, alt: item.title },
      ...(productDetailData?.images ? productDetailData.images.slice(1) : []),
    ],
    overview: {
      ...productDetailData?.overview,
      title: `${item.title} Overview`,
      description: `${item.description} Our ${item.title.toLowerCase()} is cultivated under rigorous sustainable and organic farming standards, hand-inspected for exceptional flavor, firmness, and pure freshness.`,
      image: item.image,
      imageAlt: item.title,
    },
    specifications: {
      title: "Specifications",
      rows: [
        { label: "Product Name", value: item.title },
        { label: "Pricing", value: item.price || "$12.00 / box" },
        { label: "Grade", value: item.badge || "Premium Organic" },
        ...(productDetailData?.specifications?.rows ? productDetailData.specifications.rows.slice(1) : []),
      ],
    },
  };
}

export function getServiceDetail(idOrSlug?: string): ServiceDetailData {
  if (!idOrSlug) return serviceDetailData;

  const directMatch =
    sections.ServiceDetail?.items?.[idOrSlug] ||
    sections.ServiceDetail?.variants?.[idOrSlug];
  if (directMatch) return directMatch;

  const cleanQuery = idOrSlug.toLowerCase().trim();

  const matchedSidebar = serviceDetailData?.sidebarServices?.find(
    (s) =>
      s.id.toLowerCase() === cleanQuery ||
      slugify(s.title) === cleanQuery ||
      s.href.replace(/^\/services\//, "").toLowerCase() === cleanQuery ||
      s.title.toLowerCase().replace(/\s+/g, "-") === cleanQuery
  );

  const matchedMain = servicesData.items?.find(
    (s) =>
      s.id.toLowerCase() === cleanQuery ||
      slugify(s.title) === cleanQuery ||
      s.title.toLowerCase().replace(/\s+/g, "-") === cleanQuery
  );

  if (!matchedSidebar && !matchedMain) {
    return serviceDetailData;
  }

  const title = matchedSidebar?.title || matchedMain?.title || serviceDetailData.title;
  const description = matchedMain?.description || serviceDetailData.shortDescription;
  const activeSlug = slugify(title);

  return {
    ...serviceDetailData,
    id: activeSlug,
    title: title,
    shortDescription: description,
    overviewDescription: `Our ${title} service is designed to help farmers, home gardeners and agricultural businesses adopt sustainable and chemical-free farming practices. Our experts analyze your land, soil condition and farming goals to provide practical solutions that improve productivity, ensure long-term soil health and support a greener environment.`,
    sidebarServices: serviceDetailData?.sidebarServices?.map((s) => {
      const isMatch =
        s.id.toLowerCase() === cleanQuery ||
        slugify(s.title) === cleanQuery ||
        s.href.replace(/^\/services\//, "").toLowerCase() === cleanQuery ||
        s.title.toLowerCase().replace(/\s+/g, "-") === cleanQuery;
      return {
        ...s,
        href: `/services/${slugify(s.title)}`,
        active: isMatch,
      };
    }),
  };
}

export function getBlogDetail(idOrSlug?: string): BlogDetailData {
  if (!idOrSlug) return blogDetailData;

  const directMatch =
    sections.BlogDetail?.items?.[idOrSlug] ||
    sections.BlogDetail?.variants?.[idOrSlug];
  if (directMatch) return directMatch;

  const cleanQuery = idOrSlug.toLowerCase().trim();

  if (
    cleanQuery === blogDetailData.id.toLowerCase() ||
    cleanQuery === slugify(blogDetailData.title) ||
    cleanQuery === "b1" ||
    cleanQuery === "how-to-start-organic-vegetable-farming-at-home"
  ) {
    return blogDetailData;
  }

  const matchedBlog = blogData.items?.find(
    (b) =>
      b.id.toLowerCase() === cleanQuery ||
      slugify(b.title) === cleanQuery ||
      b.title.toLowerCase().replace(/\s+/g, "-") === cleanQuery
  );

  const matchedLatest = blogDetailData.latestBlogs?.find(
    (b) =>
      b.id.toLowerCase() === cleanQuery ||
      slugify(b.title) === cleanQuery ||
      b.title.toLowerCase().replace(/\s+/g, "-") === cleanQuery
  );

  if (matchedBlog) {
    return {
      ...blogDetailData,
      id: slugify(matchedBlog.title),
      title: matchedBlog.title,
      category: matchedBlog.category,
      date: matchedBlog.date + " 2025",
      author: matchedBlog.author || blogDetailData.author,
      heroImage: matchedBlog.image || blogDetailData.heroImage,
      heroImageAlt: matchedBlog.title,
      paragraphs: [
        matchedBlog.description,
        ...blogDetailData.paragraphs.slice(1),
      ],
    };
  }

  if (matchedLatest) {
    return {
      ...blogDetailData,
      id: slugify(matchedLatest.title),
      title: matchedLatest.title,
      category: matchedLatest.category,
      date: matchedLatest.date,
      heroImage: matchedLatest.image || blogDetailData.heroImage,
      heroImageAlt: matchedLatest.title,
    };
  }

  return blogDetailData;
}

export default content;
