import { useEffect, useMemo, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type HTMLMotionProps,
} from "framer-motion";

import { cn } from "@/lib/utils";

const DEFAULT_COLORS = ["#c679c4", "#fa3d1d", "#ffb005", "#e1e1fe", "#0358f7"];
const BAND_HALF = 17;
const SWEEP_START = -BAND_HALF;
const SWEEP_END = 100 + BAND_HALF;

const sweepEase = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

function unrevealedColor(textColor: string) {
  return `color-mix(in srgb, ${textColor} 30%, transparent)`;
}

function buildGradient(pos: number, colors: string[], textColor: string) {
  const bandStart = pos - BAND_HALF;
  const bandEnd = pos + BAND_HALF;
  const dim = unrevealedColor(textColor);

  if (bandStart >= 100) {
    return `linear-gradient(90deg, ${textColor}, ${textColor})`;
  }

  const n = colors.length;
  const parts: string[] = [];

  if (bandStart > 0) {
    parts.push(`${textColor} 0%`, `${textColor} ${bandStart.toFixed(2)}%`);
  } else {
    parts.push(`${dim} 0%`);
  }

  colors.forEach((c, i) => {
    const pct = n === 1 ? pos : bandStart + (i / (n - 1)) * BAND_HALF * 2;
    parts.push(`${c} ${Math.max(0, pct).toFixed(2)}%`);
  });

  if (bandEnd < 100) {
    parts.push(`${dim} ${Math.max(0, bandEnd).toFixed(2)}%`, `${dim} 100%`);
  }

  return `linear-gradient(90deg, ${parts.join(", ")})`;
}

function measureWidths(reference: HTMLElement, texts: string[]) {
  const parent = reference.parentElement;
  if (!parent) return texts.map(() => 0);

  const style = window.getComputedStyle(reference);
  const ghost = document.createElement("span");
  ghost.style.cssText = [
    "position:absolute",
    "visibility:hidden",
    "pointer-events:none",
    "white-space:nowrap",
    "width:auto",
    `font:${style.font}`,
    `letter-spacing:${style.letterSpacing}`,
    `text-transform:${style.textTransform}`,
  ].join(";");
  parent.appendChild(ghost);

  const widths = texts.map((text) => {
    ghost.textContent = text;
    return ghost.getBoundingClientRect().width;
  });

  ghost.remove();
  return widths;
}

export interface DiaTextRevealProps extends Omit<
  HTMLMotionProps<"span">,
  "ref" | "children" | "style" | "animate" | "transition" | "color"
> {
  text: string | string[];
  colors?: string[];
  textColor?: string;
  duration?: number;
  delay?: number;
  repeat?: boolean;
  repeatDelay?: number;
  startOnView?: boolean;
  once?: boolean;
  className?: string;
  fixedWidth?: boolean;
}

export function DiaTextReveal({
  text,
  colors = DEFAULT_COLORS,
  textColor = "var(--foreground)",
  duration = 1.5,
  delay = 0,
  repeat = false,
  repeatDelay = 0.5,
  startOnView = true,
  once = true,
  className,
  fixedWidth = false,
  ...props
}: DiaTextRevealProps) {
  const texts = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);
  const isMulti = texts.length > 1;
  const prefersReducedMotion = useReducedMotion();
  const textKey = Array.isArray(text) ? text.join("\0") : text;

  const spanRef = useRef<HTMLSpanElement>(null);
  const optsRef = useRef({
    colors,
    textColor,
    duration,
    delay,
    repeat,
    repeatDelay,
    texts,
  });
  optsRef.current = {
    colors,
    textColor,
    duration,
    delay,
    repeat,
    repeatDelay,
    texts,
  };

  const indexRef = useRef(0);
  const hasStartedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const stopRef = useRef<(() => void) | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [measuredWidths, setMeasuredWidths] = useState<number[]>([]);
  const [isReady, setIsReady] = useState(false);

  const sweepPos = useMotionValue(SWEEP_END);

  const backgroundImage = useTransform(sweepPos, (pos) =>
    buildGradient(pos, optsRef.current.colors, optsRef.current.textColor),
  );

  const isInView = useInView(spanRef, { once, amount: 0.1 });

  useEffect(() => {
    let cancelled = false;

    const measure = () => {
      const el = spanRef.current;
      if (!el || !isMulti) {
        setIsReady(true);
        return;
      }
      setMeasuredWidths(measureWidths(el, texts));
      if (!cancelled) setIsReady(true);
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(measure);
    } else {
      measure();
    }

    return () => {
      cancelled = true;
    };
  }, [isMulti, textKey, texts]);

  const runSweep = () => {
    stopRef.current?.();
    clearTimeout(timerRef.current);

    const { duration: sweepDuration, delay: sweepDelay, repeat: shouldRepeat, repeatDelay: cycleDelay, texts: items } =
      optsRef.current;

    sweepPos.set(SWEEP_START);

    const controls = animate(sweepPos, SWEEP_END, {
      duration: sweepDuration,
      delay: sweepDelay,
      ease: sweepEase,
      onComplete() {
        if (!shouldRepeat) return;

        timerRef.current = setTimeout(() => {
          const next = (indexRef.current + 1) % items.length;
          indexRef.current = next;
          setActiveIndex(next);
          sweepPos.set(SWEEP_END);
          requestAnimationFrame(() => runSweep());
        }, cycleDelay * 1000);
      },
    });

    stopRef.current = () => controls.stop();
  };

  useEffect(() => {
    if (!isReady) return;

    if (prefersReducedMotion) {
      sweepPos.set(SWEEP_END);
      return;
    }

    if (startOnView && !isInView) return;
    if (once && hasStartedRef.current) return;

    hasStartedRef.current = true;
    runSweep();

    return () => {
      stopRef.current?.();
      clearTimeout(timerRef.current);
    };
  }, [isInView, isReady, once, prefersReducedMotion, startOnView, sweepPos]);

  const fixedW =
    isMulti && fixedWidth && measuredWidths.length > 0 ? Math.max(...measuredWidths) : undefined;

  const animatedW =
    isMulti && !fixedWidth && measuredWidths[activeIndex] != null ? measuredWidths[activeIndex] : undefined;

  return (
    <motion.span
      ref={spanRef}
      className={cn("inline-block align-baseline leading-[inherit] text-inherit", className)}
      style={{
        color: "transparent",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        backgroundSize: "100% 100%",
        backgroundImage,
        lineHeight: "inherit",
        ...(isMulti && {
          overflow: "hidden",
          whiteSpace: "nowrap",
          ...(fixedW != null && { width: fixedW }),
        }),
      }}
      animate={animatedW != null ? { width: animatedW } : undefined}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      {...props}
    >
      {texts[activeIndex]}
    </motion.span>
  );
}
