import { Bell, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { Marquee } from "@/components/magicui/marquee";
import AnimatedListDemo from "@/components/lawgichub/AnimatedListDemo";

const vaultFiles = [
  {
    name: "Bail-Application-Sharma.docx",
    body: "Anticipatory bail application, Section 482 BNSS, drafted with verified citations from Arnesh Kumar (2014) and Satender Kumar Antil (2021).",
  },
  {
    name: "Judgment-Notes-K.S.Puttaswamy.pdf",
    body: "Right to privacy as a fundamental right under Article 21: annotated holdings and dissent summary.",
  },
  {
    name: "Counter-Affidavit-Mehra.docx",
    body: "Sessions Court counter-affidavit, factual matrix + prayer clause, formatted for District & Sessions Court filing.",
  },
  {
    name: "Evidence-Index.xlsx",
    body: "Exhibit list with timestamps, document chains, and witness mapping for the trial bundle.",
  },
  {
    name: "Drafting-Style-Guide.pdf",
    body: "House style: paragraph numbering, citation format (SCC / AIR), and prayer-clause templates.",
  },
];

const features = [
  {
    Icon: FileText,
    name: "Legal document vault",
    description: "Drafts, judgments, exhibits and bundles, auto-saved as you type, indexed by matter.",
    cta: "Open the vault",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:24s]"
      >
        {vaultFiles.map((f) => (
          <figure
            key={f.name}
            className={cn(
              "relative w-40 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-black/[0.08] bg-black/[0.02] hover:bg-black/[0.04]",
              "dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:bg-white/[0.08]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <FileText className="size-4 shrink-0 text-foreground/55" strokeWidth={1.6} aria-hidden="true" />
              <figcaption className="truncate text-[12.5px] font-medium text-foreground">{f.name}</figcaption>
            </div>
            <blockquote className="mt-2 line-clamp-3 text-[11px] leading-relaxed text-foreground/55">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: Bell,
    name: "Court alerts",
    description: "Hearing reminders, citation alerts, and SC/HC ruling drops, pushed the moment they land.",
    cta: "Configure alerts",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedListDemo className="absolute right-2 top-4 h-[300px] w-full origin-top-right scale-75 border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90" />
    ),
  },
] as const;

const BentoFeatureGrid = () => (
  <BentoGrid className="mt-16">
    {features.map((feature) => (
      <BentoCard key={feature.name} {...feature} />
    ))}
  </BentoGrid>
);

export default BentoFeatureGrid;
