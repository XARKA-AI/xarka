import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleHref?: string;
  description?: string;
  align?: "left" | "center";
  display?: boolean;
  className?: string;
  titleClassName?: string;
  eyebrowClassName?: string;
}

const SectionHeader = ({
  eyebrow,
  title,
  titleHref,
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
    <h2 className={headingClass}>
      {titleHref ? (
        <a
          href={titleHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} (opens in new tab)`}
          className="inline-flex items-center gap-2 transition-colors hover:text-primary"
        >
          {title}
        </a>
      ) : (
        title
      )}
    </h2>
    {description && (
      <p className={cn("section-description", align === "center" && "mx-auto")}>{description}</p>
    )}
  </header>
  );
};

export default SectionHeader;
