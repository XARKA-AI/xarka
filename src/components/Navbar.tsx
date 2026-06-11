import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { LANGUAGES, normalizeLanguageCode } from "@/i18n/languages";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const isHome = location.pathname === "/";
  const overlay = isHome && !scrolled && !mobileOpen;

  const leftNavItems = [
    { labelKey: "nav.platform", href: "/#platform" },
    { labelKey: "nav.products", href: "/#product" },
    { labelKey: "nav.industries", href: "/#solutions" },
    { labelKey: "nav.resources", href: "/blog" },
  ];

  const navItems = leftNavItems;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = href;
      }
    }
  };

  const activeLanguage = normalizeLanguageCode(i18n.resolvedLanguage ?? i18n.language);
  const currentLang = LANGUAGES.find((l) => l.code === activeLanguage) ?? LANGUAGES[0];

  const navLinkClass = cn(
    "text-[11px] font-medium uppercase tracking-[0.18em] transition-colors",
    overlay
      ? "text-white/80 hover:text-white"
      : "text-muted-foreground hover:text-foreground",
  );

  const renderNavItem = (item: { labelKey: string; href: string }) =>
    item.href.startsWith("/#") ? (
      <button
        key={item.labelKey}
        type="button"
        onClick={() => handleNavClick(item.href)}
        className={navLinkClass}
      >
        {t(item.labelKey)}
      </button>
    ) : (
      <Link key={item.labelKey} to={item.href} className={navLinkClass}>
        {t(item.labelKey)}
      </Link>
    );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        overlay
          ? "border-transparent bg-transparent"
          : "border-border/50 bg-background/85 shadow-[0_8px_30px_rgba(15,16,20,0.06)] backdrop-blur-xl backdrop-saturate-150",
      )}
    >
      <nav
        className="grid h-16 w-full grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:px-6 md:px-8 lg:grid-cols-[1fr_auto_1fr] lg:px-12 xl:px-20"
        aria-label="Main navigation"
      >
        <div className="hidden items-center gap-7 lg:col-start-1 lg:row-start-1 lg:flex">
          {leftNavItems.map(renderNavItem)}
        </div>

        <Link
          to="/"
          className="col-start-1 row-start-1 inline-flex min-w-0 items-center gap-2.5 justify-self-start lg:col-start-2 lg:justify-self-center"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Xarka home"
        >
          {overlay ? (
            <img src="/xarka-icon-logo.png" alt="" className="h-8 w-auto sm:h-9" aria-hidden="true" />
          ) : (
            <>
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
            </>
          )}
          <span
            className={cn(
              "text-base font-semibold uppercase tracking-[0.14em] sm:text-lg",
              overlay ? "text-white" : "text-foreground",
            )}
          >
            XARKA
          </span>
        </Link>

        <div className="hidden items-center justify-end gap-7 lg:col-start-3 lg:row-start-1 lg:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "gap-1.5 rounded-full px-2",
                  overlay
                    ? "text-white/85 hover:bg-white/10 hover:text-white"
                    : "text-muted-foreground hover:text-foreground",
                )}
                aria-label="Select language"
              >
                <Globe className="h-4 w-4" aria-hidden="true" />
                <span className="text-xs font-medium">{currentLang.label}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {LANGUAGES.map(({ code, label }) => (
                <DropdownMenuItem
                  key={code}
                  onClick={() => void i18n.changeLanguage(code)}
                  className={activeLanguage === code ? "font-medium text-foreground" : ""}
                >
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            to="/contact"
            className={cn(
              "inline-flex h-9 items-center justify-center rounded-full px-4 text-xs font-medium transition-colors",
              overlay
                ? "border border-white/20 text-white/90 hover:bg-white/10 hover:text-white"
                : "border border-border text-foreground hover:bg-secondary",
            )}
          >
            {t("nav.contact")}
          </Link>
        </div>

        <button
          type="button"
          className={cn(
            "col-start-3 row-start-1 inline-flex items-center justify-center justify-self-end p-1 transition-colors lg:hidden",
            overlay ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground",
          )}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="max-h-[calc(100svh-4rem)] w-full overflow-y-auto border-t border-border/50 bg-background/95 px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_22px_60px_rgba(15,16,20,0.14)] backdrop-blur-xl lg:hidden sm:px-6 md:px-8"
        >
          <div className="grid gap-1">
            {navItems.map((item) =>
              item.href.startsWith("/#") ? (
                <button
                  key={item.labelKey}
                  type="button"
                  onClick={() => handleNavClick(item.href)}
                  className="flex min-h-12 w-full items-center border-b border-border/60 py-3 text-left text-base font-medium text-foreground transition-colors hover:text-muted-foreground"
                >
                  {t(item.labelKey)}
                </button>
              ) : (
                <Link
                  key={item.labelKey}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-12 items-center border-b border-border/60 py-3 text-base font-medium text-foreground transition-colors hover:text-muted-foreground"
                >
                  {t(item.labelKey)}
                </Link>
              ),
            )}
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent-hover"
            >
              {t("nav.contact")}
            </Link>
          </div>
          <div className="mt-5 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-end">
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    void i18n.changeLanguage(lang.code);
                    setMobileOpen(false);
                  }}
                  className={cn(
                    "min-h-10 rounded-full border px-3 py-2 text-xs font-medium transition-colors",
                    activeLanguage === lang.code
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
