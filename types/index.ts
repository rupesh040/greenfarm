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

export interface NavDropdownItem {
  title: string;
  description?: string;
  href: string;
  badge?: string;
  image?: string;
  price?: string;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
  active?: boolean;
  dropdown?: NavDropdownItem[];
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

export interface AboutImages {
  primary?: string;
  couple?: string;
  femaleFarmer?: string;
  secondary?: string;
  leafBackground?: string;
  farmBackground?: string;
  experienceLeaf?: string;
  primaryAlt?: string;
  coupleAlt?: string;
  femaleFarmerAlt?: string;
  secondaryAlt?: string;
  experienceLeafAlt?: string;
  leafBackgroundAlt?: string;
  farmBackgroundAlt?: string;
  [key: string]: any;
}

export interface AboutData {
  badge: string;
  badgeIcon?: string;
  title: string;
  highlightText?: string;
  experienceYears: string | number;
  experienceLabel: string;
  features: AboutFeature[];
  description: string;
  checkpoints: string[];
  ctaButton?: CtaButton;
  images: AboutImages;
  [key: string]: any;
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
  year?: string;
}

export interface BlogData {
  badge: string;
  title: string;
  highlightText?: string;
  description: string;
  items: BlogItem[];
  buttons?: {
    readMore?: string;
    readFull?: string;
    viewAll?: string;
  };
  leafImage?: string;
  year?: string;
  blogsPerPage?: number;
  allBlogsHref?: string;
  prevAriaLabel?: string;
  nextAriaLabel?: string;
  pagination?: {
    prevAriaLabel?: string;
    nextAriaLabel?: string;
  };
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
  titles?: {
    quickLinks?: string;
    ourProducts?: string;
    contactInfo?: string;
  };
  gallery: FooterGalleryItem[];
  copyright: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageBannerData {
  title: string;
  breadcrumb: string;
  image?: string;
}

export interface PageBannerConfig {
  homeBreadcrumb: BreadcrumbItem;
  parentBreadcrumbs: Record<string, BreadcrumbItem>;
  defaultImage: string;
  defaultTitle: string;
  defaultBreadcrumb: string;
  imagePosition?: string;
  ariaLabels?: {
    breadcrumb?: string;
  };
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
    ProductDetail?: {
      variants: Record<string, ProductDetailData>;
      items?: Record<string, ProductDetailData>;
    };
    ServiceDetail?: {
      variants: Record<string, ServiceDetailData>;
      items?: Record<string, ServiceDetailData>;
    };
    Contact?: {
      variants: Record<string, ContactData>;
    };
    MissionVision?: {
      variants: Record<string, MissionVisionData>;
    };
    BlogDetail?: {
      variants: Record<string, BlogDetailData>;
      items?: Record<string, BlogDetailData>;
    };
  };
}

export interface BlogDetailSection1 {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  checklist: string[];
}

export interface BlogDetailSection2 {
  title: string;
  description: string;
  images: { src: string; alt: string }[];
  quote: {
    text: string;
    author: string;
  };
}

export interface BlogDetailSection3 {
  title: string;
  description: string;
  checklist: string[];
  images: { src: string; alt: string }[];
  conclusion: string;
}

export interface LatestBlogSidebarItem {
  id: string;
  title: string;
  date: string;
  category: string;
  image: string;
  href: string;
}

export interface BlogDetailData {
  id: string;
  category: string;
  title: string;
  author: string;
  date: string;
  heroImage: string;
  heroImageAlt: string;
  paragraphs: string[];
  section1: BlogDetailSection1;
  section2: BlogDetailSection2;
  section3: BlogDetailSection3;
  latestBlogs: LatestBlogSidebarItem[];
}

export interface MissionVisionCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  accentColor?: "green" | "yellow";
  highlighted?: boolean;
}

export interface MissionVisionData {
  sectionId?: string;
  badge?: string;
  title: string;
  subtitle: string;
  fieldBannerImage?: string;
  cards: MissionVisionCard[];
}

export interface ContactInfoItem {
  id: string;
  icon: "MapPin" | "Mail" | "Phone" | "Clock" | string;
  title: string;
  lines: string[];
  href?: string;
}

export interface ContactData {
  sectionId?: string;
  badge?: string;
  title?: string;
  description?: string;
  phone?: string;
  phoneHref?: string;
  email?: string;
  address?: string;
  hours?: string;
  header: {
    badge?: string;
    title: string;
    description: string;
  };
  form: {
    tag: string;
    title: string;
    description: string;
    supportOptions: string[];
    footerTagline: string;
    submitButtonText: string;
    namePlaceholder?: string;
    emailPlaceholder?: string;
    phonePlaceholder?: string;
    messagePlaceholder?: string;
    successTitle?: string;
    successMessage?: string;
    resetButtonText?: string;
  };
  contactCards: {
    backgroundImage?: string;
    items: ContactInfoItem[];
    wheatImage: string;
    wheatImageAlt: string;
    grainImage: string;
    grainImageAlt: string;
  };
  map: {
    embedUrl: string;
    locationName: string;
    address: string;
    directionsUrl: string;
    viewLargerUrl: string;
    directionsLabel?: string;
    viewLargerLabel?: string;
    badgeLabel?: string;
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
  detailedDescription?: string[];
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

