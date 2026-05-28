import { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

const SVG_NS = "http://www.w3.org/2000/svg";

type RoseConfig = {
  particleCount: number;
  trailSpan: number;
  durationMs: number;
  rotationDurationMs: number;
  pulseDurationMs: number;
  strokeWidth: number;
  roseA: number;
  roseABoost: number;
  roseBreathBase: number;
  roseBreathBoost: number;
  roseScale: number;
};

const config: RoseConfig = {
  particleCount: 76,
  trailSpan: 0.31,
  durationMs: 5300,
  rotationDurationMs: 28000,
  pulseDurationMs: 4400,
  strokeWidth: 4.6,
  roseA: 9.2,
  roseABoost: 0.6,
  roseBreathBase: 0.72,
  roseBreathBoost: 0.28,
  roseScale: 3.25,
};

type Point = { x: number; y: number };

function normalizeProgress(progress: number) {
  return ((progress % 1) + 1) % 1;
}

function getDetailScale(time: number) {
  const pulseProgress = (time % config.pulseDurationMs) / config.pulseDurationMs;
  const pulseAngle = pulseProgress * Math.PI * 2;
  return 0.52 + ((Math.sin(pulseAngle + 0.55) + 1) / 2) * 0.48;
}

function getRotation(time: number) {
  return -((time % config.rotationDurationMs) / config.rotationDurationMs) * 360;
}

function getPoint(progress: number, detailScale: number): Point {
  const t = progress * Math.PI * 2;
  const a = config.roseA + detailScale * config.roseABoost;
  const r = a * (config.roseBreathBase + detailScale * config.roseBreathBoost) * Math.cos(3 * t);
  return {
    x: 50 + Math.cos(t) * r * config.roseScale,
    y: 50 + Math.sin(t) * r * config.roseScale,
  };
}

function buildPath(detailScale: number, steps = 480) {
  return Array.from({ length: steps + 1 }, (_, index) => {
    const point = getPoint(index / steps, detailScale);
    return `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
  }).join(" ");
}

const RoseThree = ({ className }: { className?: string }) => {
  const groupRef = useRef<SVGGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const frameRef = useRef<number | null>(null);

  const particles = useMemo(
    () =>
      Array.from({ length: config.particleCount }, () => ({
        node: null as SVGCircleElement | null,
      })),
    [],
  );

  useEffect(() => {
    const group = groupRef.current;
    const path = pathRef.current;
    if (!group || !path) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    path.setAttribute("stroke-width", String(config.strokeWidth));

    particles.forEach((particle) => {
      const circle = document.createElementNS(SVG_NS, "circle");
      circle.setAttribute("fill", "currentColor");
      group.appendChild(circle);
      particle.node = circle;
    });

    const startedAt = performance.now();
    const render = (now: number) => {
      const time = now - startedAt;
      const progress = (time % config.durationMs) / config.durationMs;
      const detailScale = getDetailScale(time);

      group.setAttribute("transform", `rotate(${getRotation(time)} 50 50)`);
      path.setAttribute("d", buildPath(detailScale));

      particles.forEach((particle, index) => {
        const tailOffset = index / (config.particleCount - 1);
        const point = getPoint(normalizeProgress(progress - tailOffset * config.trailSpan), detailScale);
        const fade = Math.pow(1 - tailOffset, 0.56);
        const radius = 0.9 + fade * 2.7;
        const opacity = 0.04 + fade * 0.96;

        particle.node?.setAttribute("cx", point.x.toFixed(2));
        particle.node?.setAttribute("cy", point.y.toFixed(2));
        particle.node?.setAttribute("r", radius.toFixed(2));
        particle.node?.setAttribute("opacity", opacity.toFixed(3));
      });

      frameRef.current = window.requestAnimationFrame(render);
    };

    if (!media.matches) {
      frameRef.current = window.requestAnimationFrame(render);
    } else {
      const detailScale = getDetailScale(0);
      path.setAttribute("d", buildPath(detailScale));
    }

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      particles.forEach((particle) => {
        particle.node?.remove();
        particle.node = null;
      });
    };
  }, [particles]);

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={cn("overflow-visible text-[#5b5fc7] dark:text-[#b9b9f3]", className)}
    >
      <g ref={groupRef}>
        <path ref={pathRef} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" opacity="0.12" />
      </g>
    </svg>
  );
};

export default RoseThree;
