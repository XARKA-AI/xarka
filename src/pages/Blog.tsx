import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";
import SEO from "@/components/SEO";

const Blog = () => {
  const { t } = useTranslation();
  const articles = t("blog.articles", { returnObjects: true }) as {
    category: string;
    title: string;
    excerpt: string;
    date: string;
  }[];

  return (
    <PageLayout>
      <SEO
        title="Resources | Xarka"
        description="Research briefings, enterprise AI resources, and legal intelligence updates from Xarka."
        path="/blog"
      />
      <section className="section-padding border-b border-border bg-background">
        <div className="container-narrow">
          <SectionHeader
            eyebrow={t("blog.sectionLabel")}
            title={t("blog.heading")}
            description={t("blog.subtitle")}
          />
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <article key={article.title} className="enterprise-card-interactive flex flex-col">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  {article.category}
                </p>
                <h2 className="mt-3 text-lg font-semibold text-foreground">{article.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {article.excerpt}
                </p>
                <p className="mt-4 text-xs text-muted-foreground">{article.date}</p>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
                >
                  {t("blog.readMore")}
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>

          <div className="enterprise-card mt-12 text-center">
            <p className="text-sm text-muted-foreground">{t("blog.newsletterNote")}</p>
            <Link to="/contact" className="btn-primary mt-6">
              {t("blog.subscribeCta")}
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Blog;
