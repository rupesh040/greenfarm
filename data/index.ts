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
export const pageBannersData = sections.PageBanners?.variants?.Default || {};

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

export const productDetailData: ProductDetailData = {
  id: "p1",
  sectionId: "product-detail",
  category: "100% Organic",
  title: "Fresh Vegetables",
  description:
    "Crisp organic greens, broccoli, carrots & colorful bell peppers hand-harvested at peak morning freshness from our certified sustainable farm fields.",
  images: [
    {
      src: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80",
      alt: "Fresh Vegetables Harvest",
    },
    {
      src: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=1200&q=80",
      alt: "Crisp Organic Farm Greens",
    },
    {
      src: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=1200&q=80",
      alt: "Farm Fresh Carrots",
    },
    {
      src: "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=1200&q=80",
      alt: "Green Vegetables Box",
    },
  ],
  imageBadges: [
    { id: "b1", icon: "leaf", label: "100% Organic" },
    { id: "b2", icon: "sprout", label: "Pure Quality" },
  ],
  highlights: [
    { id: "h1", icon: "leaf", label: "100% Organic" },
    { id: "h2", icon: "flask", label: "Zero Chemicals" },
    { id: "h3", icon: "sprout", label: "Naturally Grown" },
    { id: "h4", icon: "hand", label: "Hand Picked" },
  ],
  enquiry: {
    label: "Enquiry Now",
    href: "/contact",
  },
  overview: {
    title: "Product Overview",
    description:
      "Our fresh vegetables are grown using strictly organic, non-GMO farming practices. Cultivated with mineral-rich mountain spring water and natural compost, each crop is nurtured without chemical pesticides or synthetic growth accelerators to preserve authentic flavors and vital nutrients.",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Organic Vegetable Harvest",
  },
  keyFeatures: {
    title: "Key Features",
    items: [
      {
        id: "kf1",
        icon: "leaf",
        text: "100% Certified organic cultivation without synthetic additives",
      },
      {
        id: "kf2",
        icon: "sprout",
        text: "Harvested fresh daily before sunrise to lock in vitality",
      },
      {
        id: "kf3",
        icon: "layers",
        text: "Packed in breathable, biodegradable eco-friendly materials",
      },
      {
        id: "kf4",
        icon: "droplet",
        text: "Irrigated with purified natural spring water sources",
      },
    ],
  },
  specifications: {
    title: "Specifications",
    rows: [
      { label: "Origin", value: "GreenFarm Organic Sanctuary, Sector 4" },
      { label: "Farming Method", value: "100% Regenerative Biological Farming" },
      { label: "Shelf Life", value: "7 to 10 Days at recommended 4°C - 8°C" },
      { label: "Packaging", value: "Recyclable eco-crate or breathable pack" },
      { label: "Certification", value: "USDA Organic & EcoCert Verified" },
      { label: "Storage", value: "Keep cool, dry and away from direct sunlight" },
    ],
  },
  benefits: {
    title: "Quality & Benefits",
    items: [
      {
        id: "bn1",
        image:
          "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80",
        imageAlt: "Vital Nutrition",
        title: "Vital Nutrition",
        description:
          "Packed with active minerals, vitamins, and antioxidants for optimal health.",
      },
      {
        id: "bn2",
        image:
          "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=400&q=80",
        imageAlt: "Natural Taste",
        title: "Natural Taste",
        description:
          "Crisp and juicy with the authentic sweetness of farm-grown soil.",
      },
      {
        id: "bn3",
        image:
          "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400&q=80",
        imageAlt: "Soil Friendly",
        title: "Soil Friendly",
        description:
          "Farming methods that replenish soil health and protect local wildlife.",
      },
      {
        id: "bn4",
        image:
          "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=400&q=80",
        imageAlt: "Direct Dispatch",
        title: "Direct Dispatch",
        description:
          "Guaranteed same-day harvesting and dispatch straight to your pantry.",
      },
    ],
  },
  availability: {
    title: "Availability & Delivery",
    items: [
      {
        id: "av1",
        icon: "truck",
        label: "Delivery Time",
        value: "Express delivery within 24 hours",
      },
      {
        id: "av2",
        icon: "pin",
        label: "Source Farm",
        value: "GreenFarm Organic Sanctuary",
      },
      {
        id: "av3",
        icon: "package",
        label: "Packaging Type",
        value: "100% Biodegradable cartons",
      },
    ],
  },
};

export function getProductDetail(id: string): ProductDetailData {
  const item = productsData.items?.find((p) => p.id === id);
  if (!item) return productDetailData;

  return {
    ...productDetailData,
    id: item.id,
    category: item.badge ? `${item.badge} Produce` : "100% Organic",
    title: item.title,
    description: item.description,
    images: [
      { src: item.image, alt: item.title },
      ...productDetailData.images.slice(1),
    ],
    overview: {
      ...productDetailData.overview,
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
        ...productDetailData.specifications.rows.slice(1),
      ],
    },
  };
}

export const serviceDetailData: ServiceDetailData = {
  id: "organic-farm-consultation",
  badge: "Our Services",
  title: "Organic Farm Consultation",
  shortDescription:
    "Get expert guidance to start or improve your organic farm. We provide personalized consultation on soil preparation, crop selection, organic practices and sustainable farming methods.",
  enquiryButtonText: "Enquiry Now",
  heroImage: "/services/consultation-hero.jpg",
  overviewTitle: "Service Overview",
  overviewDescription:
    "Our Organic Farm Consultation service is designed to help farmers, home gardeners and agricultural businesses adopt sustainable and chemical-free farming practices. Our experts analyze your land, soil condition and farming goals to provide practical solutions that improve productivity, ensure long-term soil health and support a greener environment. Whether you are starting a new farm or want to switch to organic methods, we guide you at every step with personalized recommendations.",
  overviewImage: "/services/soil-overview.jpg",
  benefitsTitle: "Key Benefits",
  benefits: [
    {
      id: "b1",
      title: "Healthy Soil",
      description: "Improves soil fertility and maintains long-term soil health.",
      icon: "sprout",
    },
    {
      id: "b2",
      title: "Better Crop Quality",
      description: "Get higher yield with chemical-free produce.",
      icon: "apple",
    },
    {
      id: "b3",
      title: "Cost-Effective",
      description: "Reduces input cost with natural farming methods.",
      icon: "coins",
    },
    {
      id: "b4",
      title: "Sustainable Farming",
      description: "Supports eco-friendly and sustainable agriculture.",
      icon: "leaf",
    },
    {
      id: "b5",
      title: "Expert Guidance",
      description: "Personalized solutions for your land and crops.",
      icon: "hand",
    },
    {
      id: "b6",
      title: "Environment Friendly",
      description: "Helps in conserving natural resources.",
      icon: "globe",
    },
  ],
  whyChooseTitle: "Why Choose Our Service",
  whyChooseDescription:
    "We combine practical knowledge with hands-on experience to provide reliable and result-oriented organic farming consultation. Our focus is on natural solutions, long-term productivity and the overall health of your land, crops and environment.",
  whyChooseImage: "/services/field-consultation.jpg",
  whyChoosePoints: [
    "Experienced agricultural experts",
    "Tailored solutions for your farm",
    "Focus on organic and natural methods",
    "Support at every stage",
    "Commitment to sustainable and greener farming",
  ],
  sidebarServices: [
    {
      id: "organic-farm-consultation",
      title: "Organic Farm Consultation",
      image: "/services/soil-overview.jpg",
      href: "/services/organic-farm-consultation",
    },
    {
      id: "vertical-farming",
      title: "Vertical Farming Solutions",
      image:
        "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=200&q=80",
      href: "/services/vertical-farming",
    },
    {
      id: "container-gardening",
      title: "Custom Container Gardening",
      image:
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=200&q=80",
      href: "/services/container-gardening",
    },
    {
      id: "garden-maintenance",
      title: "Garden Maintenance Plans",
      image:
        "https://images.unsplash.com/photo-1592417817098-8f3d69106093?auto=format&fit=crop&w=200&q=80",
      href: "/services/garden-maintenance",
    },
    {
      id: "organic-fertilizer",
      title: "Organic Fertilizer Supply",
      image:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=200&q=80",
      href: "/services/organic-fertilizer",
    },
    {
      id: "crop-rotation",
      title: "Crop Rotation Planning",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=200&q=80",
      href: "/services/crop-rotation",
    },
    {
      id: "natural-pest-control",
      title: "Natural Pest Control",
      image:
        "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=200&q=80",
      href: "/services/natural-pest-control",
    },
  ],
  helpCard: {
    title: "Need Help?",
    description: "Our team is here to guide you with the best organic farming solutions.",
  },
};

export function getServiceDetail(id?: string): ServiceDetailData {
  if (!id) return serviceDetailData;

  const matchedSidebar = serviceDetailData.sidebarServices?.find(
    (s) => s.id === id || s.title.toLowerCase().replace(/\s+/g, "-") === id.toLowerCase()
  );

  const matchedMain = servicesData.items?.find((s) => s.id === id);

  if (!matchedSidebar && !matchedMain) {
    return serviceDetailData;
  }

  const title = matchedSidebar?.title || matchedMain?.title || serviceDetailData.title;
  const description = matchedMain?.description || serviceDetailData.shortDescription;

  return {
    ...serviceDetailData,
    id: id,
    title: title,
    shortDescription: description,
    overviewDescription: `Our ${title} service is designed to help farmers, home gardeners and agricultural businesses adopt sustainable and chemical-free farming practices. Our experts analyze your land, soil condition and farming goals to provide practical solutions that improve productivity, ensure long-term soil health and support a greener environment.`,
    sidebarServices: serviceDetailData.sidebarServices?.map((s) => ({
      ...s,
      active: s.id === id || s.title.toLowerCase().replace(/\s+/g, "-") === id.toLowerCase(),
    })),
  };
}

export default content;
