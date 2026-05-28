import { useEffect, useState } from "react";
import { ChevronDown, Clock, Mail, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeader from "./SectionHeader";
import ContactForm from "./ContactForm";
import SectionPhotoBackdrop from "./SectionPhotoBackdrop";

const ContactSection = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#contact") {
        setExpanded(true);
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  const handleExpand = () => {
    setExpanded(true);
    window.history.replaceState(null, "", "#contact");
  };

  return (
    <section
      id="contact"
      className={`relative overflow-hidden border-t border-border ${expanded ? "section-padding-lg" : "section-padding"}`}
    >
      <SectionPhotoBackdrop src="/assets/xarka8.jpg" />

      <div className="container-narrow relative z-10">
        {!expanded ? (
          <div className="flex flex-col items-center py-8 text-center sm:py-12">
            <p className="section-eyebrow">{t("contact.sectionLabel")}</p>
            <h2 className="section-heading mt-2 max-w-2xl">{t("contact.heading")}</h2>
            <button type="button" className="btn-primary mt-8" onClick={handleExpand} aria-expanded={false}>
              {t("blog.subscribeCta")}
              <ChevronDown size={16} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div>
            <SectionHeader
              eyebrow={t("contact.sectionLabel")}
              title={t("contact.heading")}
              description={t("contact.subtitle")}
            />

            <div className="mb-10 inline-flex max-w-full flex-wrap items-center gap-2 border border-black/[0.08] bg-white/75 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground backdrop-blur-sm sm:tracking-[0.15em] dark:border-border dark:bg-card/80">
              <Clock size={14} strokeWidth={1.5} aria-hidden="true" />
              {t("contact.responseTime")}
            </div>

            <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-7">
                <div className="border border-black/[0.08] bg-white/80 p-5 backdrop-blur-md dark:border-border dark:bg-card/85 sm:p-8 lg:p-10">
                  <div className="mb-8 border-b border-border pb-6">
                    <h3 className="text-xl font-medium text-foreground">{t("contact.sendMessage")}</h3>
                    <p className="mt-2 text-sm font-light text-muted-foreground">{t("contact.formIntro")}</p>
                  </div>
                  <ContactForm idPrefix="home-contact" />
                </div>
              </div>

              <aside className="flex flex-col gap-6 lg:col-span-5">
                <div className="border border-black/[0.08] bg-white/80 p-5 backdrop-blur-md dark:border-border dark:bg-card/85 sm:p-8">
                  <h3 className="mb-6 text-sm font-medium uppercase tracking-[0.15em] text-foreground">
                    {t("contact.detailsHeading")}
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                        <Mail size={16} strokeWidth={1.5} aria-hidden="true" />
                        {t("contact.emailSection")}
                      </div>
                      <a
                        href="mailto:xarka.tech@xarka.in"
                        className="text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
                      >
                        xarka.tech@xarka.in
                      </a>
                    </div>

                    <div className="border-t border-border pt-6">
                      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                        <MapPin size={16} strokeWidth={1.5} aria-hidden="true" />
                        {t("contact.officeSection")}
                      </div>
                      <p className="whitespace-pre-line text-sm font-light leading-relaxed text-muted-foreground">
                        {t("contact.address")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden border border-black/[0.08] bg-white/80 backdrop-blur-md dark:border-border dark:bg-card/85">
                  <img
                    src="/assets/mumbai_3d_map.png"
                    alt={t("contact.mapImageAlt")}
                    className="aspect-[16/10] w-full object-cover object-center opacity-90"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="border-t border-border px-5 py-4">
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-foreground">
                      {t("contact.mapCaption")}
                    </p>
                    <p className="mt-1 text-sm font-light text-muted-foreground">
                      {t("contact.address").replace("\n", ", ")}
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
