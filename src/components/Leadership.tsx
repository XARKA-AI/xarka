import { User } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeader from "./SectionHeader";

const leaderKeys = [
  { name: "Rajat Gupta", key: "rajat" },
  { name: "Rishi Gupta", key: "rishi" },
  { name: "Sharad Sankaran", key: "sharad" },
  { name: "Kumud Shankar", key: "kumud" },
  { name: "Harshal Dhandrut", key: "harshal" },
  { name: "Chandan Kumar", key: "chandan" },
];

const Leadership = () => {
  const { t } = useTranslation();

  return (
    <section id="team" className="section-padding bg-secondary/50">
      <div className="container-narrow">
        <SectionHeader
          eyebrow={t("leadership.sectionLabel")}
          title={t("leadership.heading")}
          align="center"
          className="mx-auto"
        />

        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {leaderKeys.map((leader) => (
            <article key={leader.key} className="flex flex-col items-center bg-card px-6 py-10 text-center sm:px-8">
              <div
                className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-secondary"
                aria-hidden="true"
              >
                <User size={24} className="text-muted-foreground" strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-medium text-foreground">{leader.name}</h3>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                {t(`leadership.leaders.${leader.key}.role`)}
              </p>
              <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
                {t(`leadership.leaders.${leader.key}.bio`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leadership;
