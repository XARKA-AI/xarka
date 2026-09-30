import { Link } from "react-router-dom";
import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";
import ContactForm from "@/components/ContactForm";
import SEO from "@/components/SEO";
import CalBooking from "@/components/CalBooking";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <SEO
        title="Contact Xarka | Enterprise AI Deployment"
        description="Contact Xarka to discuss sovereign AI infrastructure, legal intelligence platforms, and secure enterprise deployments."
        path="/contact"
      />
      <section className="section-padding border-b border-border bg-background">
        <div className="container-narrow">
          <SectionHeader
            eyebrow={t("contact.sectionLabel")}
            title={t("contact.heading")}
            description={t("contact.subtitle")}
          />
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="enterprise-card">
                <h2 className="mb-6 text-lg font-semibold text-foreground">
                  {t("contact.sendMessage")}
                </h2>
                <ContactForm idPrefix="page-contact" />
              </div>
            </div>

            <aside className="space-y-6 lg:col-span-5">
              <div className="enterprise-card">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Mail size={16} strokeWidth={1.5} aria-hidden="true" />
                  {t("contact.emailSection")}
                </h3>
                <a
                  href="mailto:xarka.tech@xarka.in"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  xarka.tech@xarka.in
                </a>
              </div>

              <div className="enterprise-card">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Phone size={16} strokeWidth={1.5} aria-hidden="true" />
                  Phone
                </h3>
                <a
                  href="tel:+917021901921"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  +91 70219 01921
                </a>
              </div>

              <div className="enterprise-card">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <MapPin size={16} strokeWidth={1.5} aria-hidden="true" />
                  {t("contact.officeSection")}
                </h3>
                <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                  {t("contact.address")}
                </p>
              </div>

              <div className="enterprise-card !p-0 overflow-hidden">
                <h3 className="flex items-center gap-2 border-b border-border px-5 py-4 text-sm font-semibold text-foreground">
                  <CalendarDays size={16} strokeWidth={1.5} aria-hidden="true" />
                  {t("contact.demoLink")}
                </h3>
                <div className="min-h-[480px]">
                  <CalBooking />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
