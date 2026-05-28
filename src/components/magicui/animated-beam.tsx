import { motion } from "framer-motion";
import { type RefObject, useCallback, useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";

export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

type SVGMotionProps = {
  x1: [string, string];
  x2: [string, string];
};

export function AnimatedBeam({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 5,
  delay = 0,
  pathColor = "currentColor",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#006840",
  gradientStopColor = "#34d399",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: AnimatedBeamProps) {
  const id = useId();
  const [path, setPath] = useState("");
  const [size, setSize] = useState({ width: 0, height: 0 });

  const recompute = useCallback(() => {
    const container = containerRef.current;
    const from = fromRef.current;
    const to = toRef.current;
    if (!container || !from || !to) return;

    const containerRect = container.getBoundingClientRect();
    const fromRect = from.getBoundingClientRect();
    const toRect = to.getBoundingClientRect();

    const svgW = containerRect.width;
    const svgH = containerRect.height;
    setSize({ width: svgW, height: svgH });

    const startX = fromRect.left - containerRect.left + fromRect.width / 2 + startXOffset;
    const startY = fromRect.top - containerRect.top + fromRect.height / 2 + startYOffset;
    const endX = toRect.left - containerRect.left + toRect.width / 2 + endXOffset;
    const endY = toRect.top - containerRect.top + toRect.height / 2 + endYOffset;

    const controlX = (startX + endX) / 2;
    const controlY = (startY + endY) / 2 - curvature;

    setPath(`M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`);
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset]);

  useEffect(() => {
    recompute();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", recompute);
      return () => window.removeEventListener("resize", recompute);
    }

    const observers: ResizeObserver[] = [];
    const targets = [containerRef.current, fromRef.current, toRef.current];
    for (const target of targets) {
      if (!target) continue;
      const observer = new ResizeObserver(() => recompute());
      observer.observe(target);
      observers.push(observer);
    }
    window.addEventListener("resize", recompute);
    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("resize", recompute);
    };
  }, [recompute, containerRef, fromRef, toRef]);

  const sweep: SVGMotionProps = reverse
    ? { x1: ["110%", "-10%"], x2: ["100%", "0%"] }
    : { x1: ["10%", "110%"], x2: ["0%", "100%"] };

  return (
    <svg
      fill="none"
      width={size.width}
      height={size.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none absolute left-0 top-0 transform-gpu stroke-2", className)}
      viewBox={`0 0 ${size.width} ${size.height}`}
    >
      <path
        d={path}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path d={path} strokeWidth={pathWidth} stroke={`url(#${id})`} strokeOpacity="1" strokeLinecap="round" />
      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{
            x1: sweep.x1[0],
            x2: sweep.x2[0],
            y1: "0%",
            y2: "0%",
          }}
          animate={{
            x1: sweep.x1,
            x2: sweep.x2,
            y1: ["0%", "0%"],
            y2: ["0%", "0%"],
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1],
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} />
          <stop offset="32.5%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
}
