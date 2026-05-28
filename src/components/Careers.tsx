import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeader from "./SectionHeader";

const Careers = () => {
  const { t } = useTranslation();

  return (
    <section id="careers" className="section-padding border-t border-border bg-primary text-primary-foreground">
      <div className="container-narrow text-center">
        <SectionHeader
          eyebrow={t("careers.sectionLabel")}
          title={t("careers.heading")}
          description={t("careers.subtitle")}
          align="center"
          className="mx-auto [&_.section-eyebrow]:text-primary-foreground/60 [&_.section-heading]:text-primary-foreground [&_.section-description]:text-primary-foreground/70"
        />
        <Link
          to="/contact"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-primary-foreground/20 bg-primary-foreground px-6 text-sm font-medium text-primary transition-colors hover:bg-primary-foreground/90"
        >
          {t("careers.viewRoles")}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
};

export default Careers;
