import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeader from "./SectionHeader";
import SectionPhotoBackdrop from "./SectionPhotoBackdrop";

type SolutionFeature = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const SolutionCard = ({
  feature,
  featured = false,
  onDemoClick,
  demoLabel,
}: {
  feature: SolutionFeature;
  featured?: boolean;
  onDemoClick?: () => void;
  demoLabel?: string;
}) => {
  const Tag = featured ? "div" : "article";

  return (
    <Tag className={`relative overflow-hidden border border-black/[0.08] p-5 dark:border-border ${featured ? "sm:p-10" : "sm:p-8"}`}>
      <img
        src={feature.image}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        loading="lazy"
        decoding="async"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-white/50 dark:bg-background/55" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/92 via-white/50 to-white/15 dark:from-background/95 dark:via-background/50 dark:to-background/20" />

      <div className="relative z-10">
        <h3 className={`font-medium text-foreground ${featured ? "text-xl sm:text-2xl" : "text-base"}`}>
          {feature.title}
        </h3>
        <p
          className={`font-light leading-relaxed text-foreground/85 dark:text-foreground/90 ${featured ? "mt-3 max-w-xl text-sm" : "mt-2 text-sm"}`}
        >
          {feature.description}
        </p>
        {onDemoClick && demoLabel && (
          <button type="button" className="link-arrow mt-6" onClick={onDemoClick}>
            {demoLabel}
            <ArrowRight size={14} aria-hidden="true" />
          </button>
        )}
      </div>
    </Tag>
  );
};

const Solutions = () => {
  const { t } = useTranslation();

  const features: SolutionFeature[] = [
    {
      id: "infrastructure",
      title: t("solutions.infrastructure.title"),
      description: t("solutions.infrastructure.description"),
      image: "/assets/xarka7.jpg",
    },
    {
      id: "fintech",
      title: t("solutions.fintech.title"),
      description: t("solutions.fintech.description"),
      image: "/assets/xarka6.jpg",
    },
    {
      id: "pharma",
      title: t("solutions.pharma.title"),
      description: t("solutions.pharma.description"),
      image: "/assets/xarka5.jpg",
    },
  ];

  const featured = features[1];

  const scrollToContact = () => {
    window.location.hash = "contact";
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="solutions" className="relative overflow-hidden section-padding-lg">
      <SectionPhotoBackdrop src="/assets/xarak10.jpg" />

      <div className="container-narrow relative z-10">
        <SectionHeader
          eyebrow={t("solutions.sectionLabel")}
          title={t("solutions.heading")}
          align="center"
          className="mx-auto max-w-none"
          titleClassName="text-2xl sm:text-3xl lg:text-[2.5rem]"
        />

        <div className="mx-auto max-w-4xl">
          <SolutionCard
            feature={featured}
            featured
            onDemoClick={scrollToContact}
            demoLabel={t("contact.demoLink")}
          />

          <div className="mt-6 grid gap-4">
            {features.filter((f) => f.id !== featured.id).map((feature) => (
              <SolutionCard
                key={feature.id}
                feature={feature}
                onDemoClick={scrollToContact}
                demoLabel={t("contact.demoLink")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
