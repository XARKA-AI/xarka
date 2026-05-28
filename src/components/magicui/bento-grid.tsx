import type { ComponentType, ReactNode, SVGProps } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BentoGrid = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("grid w-full auto-rows-[20rem] grid-cols-3 gap-3 sm:auto-rows-[22rem] sm:gap-4", className)}>{children}</div>
);

type BentoCardProps = {
  name: string;
  className?: string;
  background: ReactNode;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  description: string;
  cta: string;
};

const BentoCard = ({ name, className, background, Icon, description, cta }: BentoCardProps) => (
  <div
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-lg",
      "border border-black/[0.06] bg-card/80 shadow-[0_1px_3px_rgba(15,16,20,0.05),0_18px_50px_-30px_rgba(15,16,20,0.18)]",
      "dark:border-white/[0.08] dark:bg-white/[0.03] dark:shadow-[0_-20px_80px_-20px_rgba(255,255,255,0.04)_inset]",
      "transform-gpu transition-shadow duration-300 ease-out-expo",
      "hover:shadow-[0_24px_70px_-28px_rgba(15,16,20,0.22)] dark:hover:shadow-[0_-20px_80px_-20px_rgba(255,255,255,0.08)_inset]",
      className,
    )}
  >
    <div>{background}</div>

    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-5 pb-16 transition-all duration-300 ease-out-expo sm:p-6 sm:pb-6 sm:group-hover:-translate-y-10">
      <Icon
        className="size-10 origin-left transform-gpu text-foreground/80 transition-all duration-300 ease-out-expo group-hover:scale-90 group-hover:text-primary"
        strokeWidth={1.5}
      />
      <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">{name}</h3>
      <p className="max-w-lg text-sm leading-relaxed text-foreground/60">{description}</p>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-0 transform-gpu flex-row items-center p-4 opacity-100 transition-all duration-300 ease-out-expo sm:translate-y-10 sm:opacity-0",
        "sm:group-hover:translate-y-0 sm:group-hover:opacity-100",
      )}
    >
      <Button
        variant="ghost"
        asChild
        size="sm"
        className="pointer-events-auto -ms-2 text-primary hover:text-primary"
      >
        <a href="#contact">
          {cta}
          <ArrowRight className="ms-1 size-4" aria-hidden="true" />
        </a>
      </Button>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-colors duration-300 group-hover:bg-foreground/[0.02] dark:group-hover:bg-white/[0.02]" />
  </div>
);

export { BentoCard, BentoGrid };
