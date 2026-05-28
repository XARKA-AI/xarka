import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SectionHeader from "./SectionHeader";
import RoseThree from "./RoseThree";
import SectionErrorBoundary from "./SectionErrorBoundary";
import TerminalDemo from "./lawgichub/TerminalDemo";

const BentoFeatureGrid = lazy(() => import("./lawgichub/BentoFeatureGrid"));

const TerminalBackground = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = hostRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={hostRef} className="absolute inset-0" aria-hidden="true">
      <TerminalDemo paused={!isVisible} />
    </div>
  );
};

const BentoSkeleton = () => <div className="mt-12 min-h-[32rem] rounded-lg bg-background/40 sm:mt-16 sm:min-h-[44rem]" aria-hidden="true" />;

const Product = () => {
  const { t } = useTranslation();

  const highlights = [
    {
      id: "inference",
      title: t("about.inference.title"),
      description: t("about.inference.desc"),
    },
    {
      id: "paas",
      title: t("about.paas.title"),
      description: t("about.paas.desc"),
    },
    {
      id: "bot",
      title: t("about.bot.title"),
      description: t("about.bot.desc"),
    },
  ];

  return (
    <>
      <section id="product" className="relative overflow-hidden section-padding">
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.08] dark:opacity-[0.28]">
          <div className="absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 sm:size-[48rem] lg:size-[980px]">
            <RoseThree className="h-full w-full" />
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-0 opacity-70 dark:opacity-90"
          style={{
            background:
              "radial-gradient(55% 45% at 50% 2%, rgba(129,140,248,0.2), transparent 70%), radial-gradient(35% 28% at 80% 0%, rgba(14,165,233,0.12), transparent 72%)",
          }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-background/40" aria-hidden="true" />

        <div className="container-narrow relative z-10">
          <SectionHeader
            eyebrow={t("product.sectionLabel")}
            title={t("product.heading")}
            titleHref="https://www.lawgichub.com/"
            titleLinkLabel={t("product.visitLinkLabel")}
            description={t("product.subtitle")}
          />

          <SectionErrorBoundary>
            <Suspense fallback={<BentoSkeleton />}>
              <BentoFeatureGrid />
            </Suspense>
          </SectionErrorBoundary>
        </div>
      </section>

      <section id="product-capabilities" className="relative min-h-[30rem] overflow-hidden section-padding sm:min-h-[32rem]">
        <SectionErrorBoundary>
          <TerminalBackground />
        </SectionErrorBoundary>

        <div className="container-narrow relative z-10 flex min-h-[22rem] items-center py-2 sm:min-h-[24rem] sm:py-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {highlights.map((item) => (
              <article
                key={item.id}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md backdrop-saturate-150 transition-colors hover:border-white/20 hover:bg-white/[0.06] sm:p-8 lg:p-10 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/20 dark:hover:bg-white/[0.06]"
              >
                <h3 className="mb-3 text-base font-medium text-white">{item.title}</h3>
                <p className="text-sm font-light leading-relaxed text-white/75">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
