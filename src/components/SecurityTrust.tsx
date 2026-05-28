import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionPhotoBackdrop from "./SectionPhotoBackdrop";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/magicui/scroll-based-velocity";

const SecurityTrust = () => {
  const { t } = useTranslation();
  const standards = t("security.standards", { returnObjects: true }) as {
    title: string;
  }[];

  const standardCards = (
    <div className="flex items-stretch gap-4 px-2">
      {standards.map((item) => (
        <article
          key={item.title}
          className="h-[128px] w-[280px] shrink-0 border border-black/[0.08] bg-white/75 p-6 shadow-[0_8px_32px_rgba(15,16,20,0.08),inset_0_1px_0_0_rgba(255,255,255,0.5)] backdrop-blur-md dark:border-white/15 dark:bg-white/10 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)] sm:w-[300px] sm:p-8"
        >
          <ShieldCheck className="mb-4 h-5 w-5 text-foreground" strokeWidth={1.5} aria-hidden="true" />
          <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
        </article>
      ))}
    </div>
  );

  return (
    <section className="relative overflow-hidden section-padding-lg">
      <SectionPhotoBackdrop src="/assets/xarka4.jpg" />

      <div className="container-narrow relative z-10">
        <p className="section-eyebrow">{t("security.sectionLabel")}</p>
        <h2 className="section-heading max-w-3xl">{t("security.heading")}</h2>
      </div>

      <div
        className="relative z-10 mt-12 w-full [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
        aria-label={t("security.sectionLabel")}
      >
        <ScrollVelocityContainer>
          <ScrollVelocityRow baseVelocity={3} direction={-1} className="py-2">
            {standardCards}
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </div>
    </section>
  );
};

export default SecurityTrust;
