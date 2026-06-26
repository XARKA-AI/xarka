import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

type FooterLink = {
  label: string;
  href: string;
};

type FooterLinkGroupProps = {
  title: string;
  links: FooterLink[];
  defaultOpen?: boolean;
  onNavClick: (href: string) => void;
};

const linkClassName =
  "flex min-h-11 w-full items-center text-sm font-light text-muted-foreground transition-colors hover:text-foreground active:text-foreground md:min-h-0 md:py-0";

const FooterLinkItem = ({
  label,
  href,
  onNavClick,
}: FooterLink & { onNavClick: (href: string) => void }) =>
  href.startsWith("/#") ? (
    <li>
      <button type="button" onClick={() => onNavClick(href)} className={linkClassName}>
        {label}
      </button>
    </li>
  ) : (
    <li>
      <Link to={href} className={linkClassName}>
        {label}
      </Link>
    </li>
  );

const FooterLinkGroup = ({ title, links, defaultOpen = false, onNavClick }: FooterLinkGroupProps) => {
  const [open, setOpen] = useState(defaultOpen);

  const linkList = (
    <ul className="space-y-0 md:space-y-3">
      {links.map((link) => (
        <FooterLinkItem key={link.href} {...link} onNavClick={onNavClick} />
      ))}
    </ul>
  );

  return (
    <>
      <Collapsible open={open} onOpenChange={setOpen} className="border-b border-border md:hidden">
        <CollapsibleTrigger className="group flex w-full min-h-12 items-center justify-between gap-4 py-3 text-left">
          <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-foreground">{title}</h4>
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
              open && "rotate-180",
            )}
            aria-hidden="true"
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <div className="pb-4">{linkList}</div>
        </CollapsibleContent>
      </Collapsible>

      <div className="hidden md:block">
        <h4 className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground">{title}</h4>
        {linkList}
      </div>
    </>
  );
};

const Footer = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = href;
      }
    }
  };

  const platformLinks: FooterLink[] = [{ label: t("footer.links.platform"), href: "/#platform" }];

  const productLinks: FooterLink[] = [
    { label: t("footer.links.lawgicHub"), href: "/#product" },
    { label: t("footer.links.industries"), href: "/#solutions" },
  ];

  const companyLinks: FooterLink[] = [
    { label: t("footer.links.team"), href: "/#team" },
    { label: t("footer.links.resources"), href: "/blog" },
    { label: t("footer.links.demo"), href: "https://cal.com/rajat-gupta-0ytv7c/xarka-demo" },
    { label: t("footer.links.login"), href: "/login" },
    { label: t("footer.links.contact"), href: "/contact" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background pb-[env(safe-area-inset-bottom)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-[100px]" />

      <div className="container-narrow relative z-10 px-4 py-10 sm:px-6 sm:py-14 md:px-8 lg:px-16 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Link to="/" className="mb-5 inline-flex items-center gap-2.5" aria-label="Xarka home">
              <img
                src="/xarka-icon-logo.png"
                alt=""
                className="h-8 w-auto invert dark:hidden sm:h-9"
                aria-hidden="true"
              />
              <img
                src="/xarka-icon-logo.png"
                alt=""
                className="hidden h-8 w-auto dark:block sm:h-9"
                aria-hidden="true"
              />
              <span className="text-base font-semibold uppercase tracking-[0.14em] text-foreground sm:text-lg">
                XARKA
              </span>
            </Link>
            <p className="max-w-sm text-sm font-light leading-relaxed text-muted-foreground">
              {t("footer.description")}
            </p>
            <a
              href="https://www.linkedin.com/company/xarka-technologies/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Xarka on LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <Link
              to="/contact"
              className="btn-primary mt-6 inline-flex w-full sm:w-auto md:hidden"
            >
              {t("nav.contact")}
            </Link>
          </div>

          <div className="lg:col-span-8">
            <div className="md:grid md:grid-cols-3 md:gap-8 lg:gap-10">
              <FooterLinkGroup
                title={t("footer.platform")}
                links={platformLinks}
                defaultOpen
                onNavClick={handleNavClick}
              />
              <FooterLinkGroup
                title={t("footer.product")}
                links={productLinks}
                onNavClick={handleNavClick}
              />
              <FooterLinkGroup
                title={t("footer.company")}
                links={companyLinks}
                onNavClick={handleNavClick}
              />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-border pt-8 sm:mt-12 lg:mt-14">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p className="text-xs font-light leading-relaxed text-muted-foreground">
              {t("footer.copyright", { year: new Date().getFullYear() })}
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-end">
              <li>
                <Link
                  to="/privacy"
                  className="inline-flex min-h-10 items-center text-xs font-light text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t("footer.privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="inline-flex min-h-10 items-center text-xs font-light text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t("footer.termsOfService")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
