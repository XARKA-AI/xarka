import { ArrowRight, CalendarDays } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionPhotoBackdrop from "./SectionPhotoBackdrop";

const CTABanner = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden section-padding">
      <SectionPhotoBackdrop src="/assets/xarka3.jpg" />

      <div className="container-narrow relative z-10">
        <div className="cta-panel relative overflow-hidden border border-primary/20 bg-white/75 shadow-[0_8px_32px_rgba(15,16,20,0.1),inset_0_1px_0_0_rgba(255,255,255,0.6)] backdrop-blur-xl backdrop-saturate-150 dark:border-primary/30 dark:bg-primary/20 dark:shadow-[0_8px_32px_rgba(0,64,48,0.18),inset_0_1px_0_0_rgba(255,255,255,0.25)]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.35)_0%,transparent_45%,rgba(0,80,60,0.06)_100%)] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.18)_0%,transparent_45%,rgba(0,80,60,0.08)_100%)]" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl dark:bg-primary/20" />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
            <div className="max-w-2xl">
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-primary/70 dark:text-primary-foreground/70">
                {t("cta.sectionLabel")}
              </p>
              <h2 className="text-2xl font-normal leading-tight text-foreground dark:text-primary-foreground sm:text-4xl lg:text-[2.5rem]">
                {t("cta.heading")}
              </h2>
              <p className="mt-4 max-w-xl text-base font-light leading-relaxed text-muted-foreground dark:text-primary-foreground/80">
                {t("cta.subtitle")}
              </p>
              <a
                href="https://cal.com/rajat-gupta-0ytv7c/xarka-demo"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta mt-8 w-full justify-between bg-primary text-primary-foreground hover:bg-accent-hover sm:w-fit"
              >
                {t("cta.primaryBtn")}
                <span className="btn-cta-icon bg-white/15">
                  <ArrowRight size={16} className="text-primary-foreground" aria-hidden="true" />
                </span>
              </a>
            </div>

            <div className="hidden w-full max-w-xs border border-black/[0.08] bg-white/60 p-8 backdrop-blur-md dark:border-primary-foreground/20 dark:bg-white/10 lg:block">
              <CalendarDays className="mb-4 h-5 w-5 text-primary dark:text-primary-foreground/80" strokeWidth={1.5} aria-hidden="true" />
              <p className="text-sm font-medium text-foreground dark:text-primary-foreground">{t("cta.briefingTitle")}</p>
              <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground dark:text-primary-foreground/75">
                {t("cta.briefingDesc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
