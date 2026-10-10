export interface TopBarLink {
  id: string;
  label: string;
  href: string;
}

export interface ContactInfo {
  prefixText: string;
  phone: string;
  phoneHref: string;
}

export interface SocialLink {
  id: string;
  name: string;
  href: string;
  icon: string;
}

export interface BrandInfo {
  name: string;
  tagline: string;
  href: string;
  logo?: string;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
  active?: boolean;
}

export interface CtaButton {
  label: string;
  href: string;
}

export interface EnquiryModalData {
  title: string;
  subtitle: string;
  successTitle: string;
  successMessage: string;
  submitText: string;
  services: string[];
}

export interface TopbarData {
  links: TopBarLink[];
  contact: ContactInfo;
  socialLinks: SocialLink[];
}

export interface HeaderData {
  brand: BrandInfo;
  navLinks: NavLink[];
  ctaButton: CtaButton;
  enquiryModal?: EnquiryModalData;
}

export interface NavbarData {
  topBar: TopbarData;
  brand: BrandInfo;
  navLinks: NavLink[];
  ctaButton: CtaButton;
  enquiryModal?: EnquiryModalData;
}

export interface HeroData {
  badge: string;
  title: string;
  highlightText?: string;
  description: string;
  ctaButton: CtaButton;
  organicSeal: {
    title: string;
    subtitle: string;
  };
  leftFarmerImage: {
    url: string;
    alt: string;
    badgeText?: string;
  };
  rightFarmerImage: {
    url: string;
    alt: string;
  };
}

export interface AboutFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface AboutData {
  badge: string;
  title: string;
  experienceYears: string;
  experienceLabel: string;
  features: AboutFeature[];
  description: string;
  checkpoints: string[];
  ctaButton: CtaButton;
  images: {
    primary: string;
    couple: string;
    femaleFarmer: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface ServicesData {
  badge: string;
  title: string;
  description: string;
  items: ServiceItem[];
}

export interface UspCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface WhyChooseUsData {
  badge: string;
  title: string;
  description: string;
  ctaButton: CtaButton;
  videoThumbnail: string;
  videoUrl?: string;
  uspCards: UspCard[];
}

export interface ProductItem {
  id: string;
  title: string;
  description: string;
  price: string;
  badge: string;
  image: string;
}

export interface ProductsData {
  badge: string;
  title: string;
  description: string;
  items: ProductItem[];
}

export interface MilestoneItem {
  id: string;
  value: string;
  label: string;
  icon: string;
}

export interface MilestonesData {
  title: string;
  subtitle: string;
  organicBadge: string;
  stats: MilestoneItem[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
  avatar: string;
}

export interface TestimonialsData {
  badge: string;
  title: string;
  farmerImage: string;
  items: TestimonialItem[];
}

export interface BlogItem {
  id: string;
  date: string;
  category: string;
  title: string;
  description: string;
  image: string;
  author: string;
  href: string;
}

export interface BlogData {
  badge: string;
  title: string;
  description: string;
  items: BlogItem[];
}

export interface FooterGalleryItem {
  id: string;
  image: string;
  alt: string;
}

export interface FooterData {
  brand: {
    name: string;
    tagline: string;
    description: string;
    logo?: string;
  };
  socialLinks: SocialLink[];
  quickLinks: { label: string; href: string }[];
  productLinks: { label: string; href: string }[];
  contact: {
    address: string;
    phone: string;
    phone2?: string;
    email: string;
    email2?: string;
    hours: string;
  };
  gallery: FooterGalleryItem[];
  copyright: string;
}

export interface TemplatePageConfig {
  components: { key: string; component: string }[];
}

export interface TemplateSharedConfig {
  Topbar: string;
  Header: string;
  Footer: string;
}

export interface TemplateConfig {
  shared: TemplateSharedConfig;
  pages: {
    home: TemplatePageConfig;
    [page: string]: TemplatePageConfig;
  };
}

export interface AgricultureContent {
  templateComponents: {
    [templateId: string]: TemplateConfig;
  };
  sections: {
    Topbar: { variants: Record<string, TopbarData> };
    Header: { variants: Record<string, HeaderData> };
    Banner: { variants: Record<string, HeroData> };
    About: { variants: Record<string, AboutData> };
    Services: { variants: Record<string, ServicesData> };
    WhyChooseUs: { variants: Record<string, WhyChooseUsData> };
    Products: { variants: Record<string, ProductsData> };
    CompanyStatistics: { variants: Record<string, MilestonesData> };
    Testimonial: { variants: Record<string, TestimonialsData> };
    Blog: { variants: Record<string, BlogData> };
    Footer: { variants: Record<string, FooterData> };
  };
}

export interface SiteContent {
  Agriculture: AgricultureContent;
}
