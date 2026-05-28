import { useTranslation } from "react-i18next";

const WhyXarka = () => {
  const { t } = useTranslation();

  const stats = [
    { value: "20Mn+", label: t("product.stat1Label") },
    { value: "50K+", label: t("product.stat2Label") },
    { value: "95%", label: t("product.stat3Label") },
    { value: "10×", label: t("product.stat4Label") },
  ];

  return (
    <section id="why-xarka" className="relative overflow-hidden">
      <img
        src="/assets/mumbai_3d_map.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="lazy"
        decoding="async"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-background/85 backdrop-blur-[2px]" />

      <div className="container-narrow relative section-padding-lg">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-md">
            <p className="section-eyebrow">{t("whyXarka.sectionLabel")}</p>
            <h2 className="section-heading">{t("whyXarka.heading")}</h2>
            <p className="section-description">{t("whyXarka.subtitle")}</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label} className="border-l border-border pl-6">
                <p className="stat-display">{stat.value}</p>
                <p className="mt-2 text-sm font-light text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyXarka;
