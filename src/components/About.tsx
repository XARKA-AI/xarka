import { ArrowRight, Zap, Settings, Building2, Gauge, Shield, Plug2, CreditCard, GitBranch, Server, Activity, TrendingUp, Lock, Key, GraduationCap, Unlink } from "lucide-react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  const pillars = [
    {
      icon: Zap,
      title: t("about.inference.title"),
      def: t("about.inference.def"),
      desc: t("about.inference.desc"),
      features: [
        { icon: Gauge, text: t("about.inference.f1") },
        { icon: Shield, text: t("about.inference.f2") },
        { icon: Plug2, text: t("about.inference.f3") },
        { icon: CreditCard, text: t("about.inference.f4") },
      ],
    },
    {
      icon: Settings,
      title: t("about.paas.title"),
      def: t("about.paas.def"),
      desc: t("about.paas.desc"),
      features: [
        { icon: GitBranch, text: t("about.paas.f1") },
        { icon: Server, text: t("about.paas.f2") },
        { icon: Activity, text: t("about.paas.f3") },
        { icon: TrendingUp, text: t("about.paas.f4") },
      ],
    },
    {
      icon: Building2,
      title: t("about.bot.title"),
      def: t("about.bot.def"),
      desc: t("about.bot.desc"),
      features: [
        { icon: Lock, text: t("about.bot.f1") },
        { icon: Key, text: t("about.bot.f2") },
        { icon: GraduationCap, text: t("about.bot.f3") },
        { icon: Unlink, text: t("about.bot.f4") },
      ],
    },
  ];

  const featured = pillars[0];

  return (
    <section id="platform" className="relative overflow-hidden section-padding-lg">
      <img
        src="/assets/xarka2.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        loading="eager"
        decoding="async"
        fetchpriority="high"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-white/40 dark:bg-background/25" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-white/20 dark:from-background/80 dark:via-background/35 dark:to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/95 via-white/30 to-transparent dark:from-background/85 dark:via-transparent dark:to-transparent" />

      <div className="container-narrow relative z-10">
        <div className="max-w-2xl rounded-lg border border-black/[0.06] bg-white/70 p-5 shadow-[0_12px_40px_-20px_rgba(15,16,20,0.18)] backdrop-blur-md sm:p-8 dark:border-transparent dark:bg-transparent dark:p-0 dark:shadow-none dark:backdrop-blur-none">
          <p className="section-eyebrow">{t("about.sectionLabel")}</p>
          <h2 className="section-heading-display text-left">{featured.title}</h2>
          <p className="mt-2 text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground">
            {featured.def}
          </p>
          <p className="mt-6 text-base font-light leading-relaxed text-muted-foreground dark:text-foreground/85">{featured.desc}</p>
          <ul className="mt-8 space-y-4">
            {featured.features.map((f) => (
              <li key={f.text} className="flex items-start gap-3 text-sm font-light text-foreground">
                <f.icon size={16} className="mt-0.5 shrink-0 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
                {f.text}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="link-arrow mt-10"
            onClick={() => document.getElementById("product")?.scrollIntoView({ behavior: "smooth" })}
          >
            {t("about.keyHighlights")}
            <ArrowRight size={14} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-2 md:gap-6 lg:mt-20">
          {pillars.slice(1).map((p) => (
            <article
              key={p.title}
              className="rounded-lg border border-black/10 bg-white/80 p-6 shadow-[0_8px_32px_rgba(15,16,20,0.08)] backdrop-blur-xl backdrop-saturate-150 transition-colors hover:border-black/15 hover:bg-white/90 sm:p-8 lg:p-10 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] dark:hover:border-white/20 dark:hover:bg-white/[0.09]"
            >
              <h3 className="text-xl font-medium text-foreground">{p.title}</h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">{p.def}</p>
              <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">{p.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
