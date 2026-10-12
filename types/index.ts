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
  highlightText?: string;
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
  highlightText?: string;
  description: string;
  items: ServiceItem[];
}

export interface ServiceBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SidebarServiceItem {
  id: string;
  title: string;
  image: string;
  href: string;
  active?: boolean;
}

export interface ServiceDetailData {
  id: string;
  badge: string;
  title: string;
  shortDescription: string;
  enquiryButtonText?: string;
  heroImage: string;
  overviewTitle: string;
  overviewDescription: string;
  overviewImage: string;
  benefitsTitle: string;
  benefits: ServiceBenefit[];
  whyChooseTitle: string;
  whyChooseDescription: string;
  whyChooseImage: string;
  whyChoosePoints: string[];
  sidebarServices?: SidebarServiceItem[];
  helpCard?: {
    title: string;
    description: string;
  };
}

export interface UspCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface WhyChooseUsData {
  sectionId?: string;
  badge: string;
  badgeIcon?: string;
  title: string;
  highlightText?: string;
  description: string;
  ctaButton: CtaButton;
  videoThumbnail: string;
  videoThumbnailAlt?: string;
  videoUrl?: string;
  videoTitle?: string;
  playButtonAria?: string;
  sparkleText?: string;
  closeVideoAriaLabel?: string;
  uspCards: UspCard[];
}

export interface ProductItem {
  id: string;
  title: string;
  description: string;
  price?: string;
  badge?: string;
  image: string;
  icon?: string;
}

export interface ProductsData {
  badge: string;
  badgeIcon?: string;
  title: string;
  highlightText?: string;
  description: string;
  items: ProductItem[];
  buttons?: {
    viewDetails?: string;
    viewAll?: string;
  };
  prevAriaLabel?: string;
  nextAriaLabel?: string;
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
  headline?: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
  avatar: string;
}

export interface TestimonialTrustBadge {
  count: string;
  subtitle: string;
}

export interface TestimonialsData {
  badge?: string;
  title: string;
  subtitle?: string;
  highlightText?: string;
  farmerImage?: string;
  items: TestimonialItem[];
  trustBadge?: TestimonialTrustBadge;
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
  highlightText?: string;
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

export interface PageBannerData {
  title: string;
  breadcrumb: string;
  image?: string;
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
    Faq: { variants: Record<string, FaqData> };
    Gallery: { variants: Record<string, GalleryData> };
    Team: { variants: Record<string, TeamData> };
    PageBanners?: { variants: Record<string, Record<string, PageBannerData>> };
  };
}

export interface SiteContent {
  Agriculture: AgricultureContent;
}

export interface TeamMemberSocial {
  platform: string;
  href: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  alt: string;
  socials?: TeamMemberSocial[];
}

export interface TeamData {
  sectionId?: string;
  title: string;
  subtitle: string;
  members: TeamMember[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  categories?: string[];
  image: string;
  alt: string;
}

export interface GalleryData {
  sectionId?: string;
  title: string;
  subtitle: string;
  categories: string[];
  items: GalleryItem[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqData {
  sectionId?: string;
  title: string;
  highlightText?: string;
  description: string;
  image: string;
  imageAlt: string;
  helpTitle: string;
  helpHighlight?: string;
  helpDescription: string;
  contactButton: {
    label: string;
    href: string;
  };
  defaultOpenId?: string;
  faqs: FaqItem[];
}

export interface ProductDetailBadge {
  id: string;
  icon: string;
  label: string;
}

export interface ProductDetailImage {
  src: string;
  alt: string;
}

export interface ProductDetailHighlight {
  id: string;
  icon: string;
  label: string;
}

export interface ProductDetailKeyFeature {
  id: string;
  icon: string;
  text: string;
}

export interface ProductDetailSpecRow {
  label: string;
  value: string;
}

export interface ProductDetailBenefit {
  id: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

export interface ProductDetailAvailability {
  id: string;
  icon: string;
  label: string;
  value: string;
}

export interface ProductDetailData {
  id?: string;
  sectionId?: string;
  category: string;
  title: string;
  description: string;
  images: ProductDetailImage[];
  imageBadges: ProductDetailBadge[];
  highlights: ProductDetailHighlight[];
  enquiry: {
    label: string;
    href: string;
  };
  overview: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  keyFeatures: {
    title: string;
    items: ProductDetailKeyFeature[];
  };
  specifications: {
    title: string;
    rows: ProductDetailSpecRow[];
  };
  benefits: {
    title: string;
    items: ProductDetailBenefit[];
  };
  availability: {
    title: string;
    items: ProductDetailAvailability[];
  };
}
