import { useTranslation } from "react-i18next";

const TrustBar = () => {
  const { t } = useTranslation();

  return (
    <section className="border-y border-border bg-background py-16 sm:py-20" aria-label={t("trust.ariaLabel")}>
      <div className="container-narrow px-4 sm:px-6 md:px-8 lg:px-16">
        <p className="landing-intro mx-auto max-w-3xl">{t("trust.heading")}</p>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm font-light leading-relaxed text-muted-foreground">
          {t("trust.subtitle")}
        </p>
      </div>
    </section>
  );
};

export default TrustBar;
