import { useTranslation } from "react-i18next";
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";
import ContactForm from "@/components/ContactForm";
import SEO from "@/components/SEO";

const Demo = () => {
  const { t } = useTranslation();
  const expectations = t("demo.expectations", { returnObjects: true }) as string[];

  return (
    <PageLayout>
      <SEO
        title="Book a Demo | Xarka"
        description="Request a Xarka product demonstration for legal intelligence, sovereign AI infrastructure, and regulated enterprise workflows."
        path="/demo"
      />
      <section className="section-padding border-b border-border bg-background">
        <div className="container-narrow">
          <SectionHeader
            eyebrow={t("demo.sectionLabel")}
            title={t("demo.heading")}
            description={t("demo.subtitle")}
          />
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-lg font-semibold text-foreground">{t("demo.expectTitle")}</h2>
              <ul className="mt-6 space-y-4">
                {expectations.map((item) => (
                  <li
                    key={item}
                    className="border-l-2 border-foreground pl-4 text-sm leading-relaxed text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="image-frame mt-10">
                <img
                  src="/assets/judiciary_bg.png"
                  alt=""
                  className="aspect-[4/3] w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="enterprise-card">
                <h2 className="mb-6 text-lg font-semibold text-foreground">
                  {t("demo.formTitle")}
                </h2>
                <ContactForm
                  idPrefix="demo"
                  messagePlaceholderKey="demo.messagePlaceholder"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Demo;
