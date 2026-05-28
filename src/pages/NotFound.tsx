import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <PageLayout>
      <SEO
        title="Page Not Found | Xarka"
        description="The page you are looking for does not exist or has been moved."
        path={location.pathname}
        noIndex
      />
      <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-5 py-24">
        <p className="mb-2 text-sm font-medium text-muted-foreground">404</p>
        <h1 className="mb-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {t("notFound.title")}
        </h1>
        <p className="mb-8 max-w-md text-center text-muted-foreground">
          {t("notFound.description")}
        </p>
        <Link to="/" className="btn-primary">
          {t("notFound.backHome")}
        </Link>
      </div>
    </PageLayout>
  );
};

export default NotFound;
