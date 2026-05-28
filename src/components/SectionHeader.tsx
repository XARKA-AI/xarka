import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleHref?: string;
  titleLinkLabel?: string;
  description?: string;
  align?: "left" | "center";
  display?: boolean;
  className?: string;
  titleClassName?: string;
  eyebrowClassName?: string;
}

const SectionTitleLink = ({
  href,
  title,
  label,
}: {
  href: string;
  title: string;
  label?: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`${title} (opens in new tab)`}
    className="group relative inline-flex shrink-0 items-center gap-2.5 overflow-hidden rounded-full border border-primary/20 bg-background/70 py-1.5 pl-4 pr-1.5 shadow-[0_4px_24px_-10px_hsl(var(--primary)/0.45)] backdrop-blur-md transition-all duration-300 hover:border-primary/45 hover:bg-background/90 hover:shadow-[0_8px_32px_-8px_hsl(var(--primary)/0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:border-emerald-400/25 dark:bg-white/[0.06] dark:hover:border-emerald-400/45 sm:pl-5"
  >
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.28)_50%,transparent_65%)] transition-transform duration-700 group-hover:translate-x-full dark:bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.12)_50%,transparent_65%)]"
    />
    {label && (
      <span className="relative hidden text-[11px] font-semibold uppercase tracking-[0.22em] text-primary dark:text-emerald-400 sm:inline">
        {label}
      </span>
    )}
    <span className="relative flex size-9 items-center justify-center overflow-hidden rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-105 dark:bg-emerald-500 sm:size-10">
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden="true"
        className="absolute -inset-1 rounded-full border border-dashed border-white/30 opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:rotate-90"
      />
      <ArrowUpRight
        className="relative size-[18px] transition-transform duration-300 ease-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:scale-110 sm:size-5"
        strokeWidth={2.25}
        aria-hidden="true"
      />
    </span>
  </a>
);

const SectionHeader = ({
  eyebrow,
  title,
  titleHref,
  titleLinkLabel,
  description,
  align = "left",
  display = false,
  className,
  titleClassName,
  eyebrowClassName,
}: SectionHeaderProps) => {
  const headingClass = cn(display ? "section-heading-display" : "section-heading", titleClassName);

  return (
  <header
    className={cn(
      "mb-12 sm:mb-16",
      align === "center" && "mx-auto max-w-3xl text-center",
      className,
    )}
  >
    {eyebrow && <p className={cn("section-eyebrow", eyebrowClassName)}>{eyebrow}</p>}
    {titleHref ? (
      <div
        className={cn(
          "flex items-center gap-3",
          align === "center" ? "justify-center" : "justify-between",
        )}
      >
        <h2 className={cn(headingClass, "min-w-0")}>{title}</h2>
        <SectionTitleLink href={titleHref} title={title} label={titleLinkLabel} />
      </div>
    ) : (
      <h2 className={headingClass}>{title}</h2>
    )}
    {description && (
      <p className={cn("section-description", align === "center" && "mx-auto")}>{description}</p>
    )}
  </header>
  );
};

export default SectionHeader;
