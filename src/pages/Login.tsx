import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";
import SEO from "@/components/SEO";

const Login = () => {
  const { t } = useTranslation();
  const features = t("login.features", { returnObjects: true }) as string[];

  return (
    <PageLayout>
      <SEO
        title="LawgicHub Login | Xarka"
        description="Access LawgicHub, Xarka's legal intelligence platform for research, drafting, and case workflows."
        path="/login"
      />
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeader
                eyebrow={t("login.sectionLabel")}
                title={t("login.heading")}
                description={t("login.subtitle")}
              />

              <ul className="space-y-3">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="border-l-2 border-border pl-4 text-sm leading-relaxed text-muted-foreground"
                  >
                    {feature}
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-sm text-muted-foreground">{t("login.enterpriseNote")}</p>
              <Link to="/contact" className="mt-4 inline-flex text-sm font-medium text-foreground hover:text-muted-foreground">
                {t("login.enterpriseLink")}
                <ArrowRight size={14} className="ml-1" aria-hidden="true" />
              </Link>
            </div>

            <div className="enterprise-card">
              <div className="image-frame mb-6">
                <img
                  src="/assets/Lawgichub Website White.png"
                  alt={t("login.productImageAlt")}
                  className="aspect-[16/10] w-full object-cover object-top dark:hidden"
                  loading="lazy"
                  decoding="async"
                />
                <img
                  src="/assets/Lawgichub Website Black.png"
                  alt={t("login.productImageAlt")}
                  className="hidden aspect-[16/10] w-full object-cover object-top dark:block"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <h2 className="text-xl font-semibold text-foreground">{t("login.cardTitle")}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t("login.cardDescription")}
              </p>

              <a
                href="https://lawgichub.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-8 w-full sm:w-auto"
              >
                {t("login.signInBtn")}
                <ExternalLink size={16} aria-hidden="true" />
              </a>

              <p className="mt-6 text-center text-xs text-muted-foreground sm:text-left">
                {t("login.noAccount")}{" "}
                <Link to="/demo" className="font-medium text-foreground hover:text-muted-foreground">
                  {t("login.requestDemo")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Login;
