import { forwardRef, useRef } from "react";
import { BookOpen, Gavel, Landmark, Scale, ScrollText, Sparkles } from "lucide-react";
import RoseThree from "@/components/RoseThree";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; title?: string }
>(({ className, children, title }, ref) => (
  <div
    ref={ref}
    title={title}
    className={cn(
      "z-10 grid size-12 place-items-center rounded-full border bg-background p-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
      "border-black/[0.08] dark:border-white/[0.12] dark:bg-[#0f0f10]",
      className,
    )}
  >
    {children}
  </div>
));
Circle.displayName = "Circle";

const AnimatedBeamMultipleOutputDemo = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);
  const ref5 = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-[320px] w-full items-center justify-center overflow-hidden p-8",
        className,
      )}
    >
      <div className="flex size-full max-w-md flex-row items-stretch justify-between gap-10">
        <div className="flex flex-col justify-center gap-3">
          <Circle ref={ref1} title="Supreme Court e-archive">
            <Gavel className="size-5 text-foreground/75" strokeWidth={1.6} />
          </Circle>
          <Circle ref={ref2} title="High Court rulings">
            <Landmark className="size-5 text-foreground/75" strokeWidth={1.6} />
          </Circle>
          <Circle ref={ref3} title="Bare Acts & Statutes">
            <ScrollText className="size-5 text-foreground/75" strokeWidth={1.6} />
          </Circle>
          <Circle ref={ref4} title="Tribunals & Commissions">
            <Scale className="size-5 text-foreground/75" strokeWidth={1.6} />
          </Circle>
          <Circle ref={ref5} title="Legal commentaries">
            <BookOpen className="size-5 text-foreground/75" strokeWidth={1.6} />
          </Circle>
        </div>

        <div className="flex flex-col justify-center">
          <Circle ref={centerRef} className="size-16" title="Lawgic Hub">
            <div className="relative grid size-full place-items-center">
              <RoseThree className="size-8" />
              <Sparkles className="absolute -right-1 -top-1 size-3 text-primary" strokeWidth={1.8} aria-hidden="true" />
            </div>
          </Circle>
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={ref1} toRef={centerRef} curvature={-60} duration={4} />
      <AnimatedBeam containerRef={containerRef} fromRef={ref2} toRef={centerRef} curvature={-30} delay={0.3} duration={4.5} />
      <AnimatedBeam containerRef={containerRef} fromRef={ref3} toRef={centerRef} curvature={0} delay={0.6} duration={5} />
      <AnimatedBeam containerRef={containerRef} fromRef={ref4} toRef={centerRef} curvature={30} delay={0.9} duration={4.5} />
      <AnimatedBeam containerRef={containerRef} fromRef={ref5} toRef={centerRef} curvature={60} delay={1.2} duration={4} />
    </div>
  );
};

export default AnimatedBeamMultipleOutputDemo;
