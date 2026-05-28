import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Footer from "@/components/Footer";
import SEO, { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_URL } from "@/components/SEO";

const About = lazy(() => import("@/components/About"));
const Product = lazy(() => import("@/components/Product"));
const Solutions = lazy(() => import("@/components/Solutions"));
const SecurityTrust = lazy(() => import("@/components/SecurityTrust"));
const Leadership = lazy(() => import("@/components/Leadership"));
const CTABanner = lazy(() => import("@/components/CTABanner"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

const SectionSkeleton = () => (
  <div className="section-padding min-h-[200px] bg-background" aria-hidden="true" />
);

const Index = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "XARKA AI Technologies Private Limited",
    url: SITE_URL,
    logo: `${SITE_URL}/xarka_logo.png`,
    description: DEFAULT_DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Xarka",
    url: SITE_URL,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title={DEFAULT_TITLE}
        description={DEFAULT_DESCRIPTION}
        path="/"
        structuredData={[organizationSchema, websiteSchema]}
      />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Suspense fallback={<SectionSkeleton />}>
          <About />
          <Product />
          <Solutions />
          <SecurityTrust />
          <Leadership />
          <CTABanner />
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
