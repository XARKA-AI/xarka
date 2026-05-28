import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type WorldBackgroundProps = {
  className?: string;
  align?: "center" | "right";
};

const WorldBackground = ({ className, align = "center" }: WorldBackgroundProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let globeRadius = 0;
        const dots: { x: number; y: number; z: number; lat: number; lon: number }[] = [];
        let rotation = 0;

        // Mouse state – throttled
        let targetRotationX = 0;
        let targetRotationY = 0;
        let rafMouse: number | null = null;
        let pendingMouseX = 0;
        let pendingMouseY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
            pendingMouseX = -y * 0.5;
            pendingMouseY = x * 0.5;
            if (rafMouse === null) {
                rafMouse = requestAnimationFrame(() => {
                    targetRotationX = pendingMouseX;
                    targetRotationY = pendingMouseY;
                    rafMouse = null;
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        // Shooting Star Interface and State
        interface ShootingStar {
            x: number;
            y: number;
            length: number;
            speed: number;
            opacity: number;
            angle: number;
        }
        const shootingStars: ShootingStar[] = [];

        const resize = () => {
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            canvas.width = width * window.devicePixelRatio;
            canvas.height = height * window.devicePixelRatio;
            ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

            const size = Math.min(width, height);
            globeRadius = size * (align === "right" ? 0.44 : 0.4);
        };

        const initDots = () => {
            dots.length = 0;
            const isMobile = window.innerWidth < 768;
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            const numPoints = prefersReducedMotion ? 120 : isMobile ? 200 : 400;
            const phi = Math.PI * (3 - Math.sqrt(5));

            for (let i = 0; i < numPoints; i++) {
                const y = 1 - (i / (numPoints - 1)) * 2;
                const radius = Math.sqrt(1 - y * y);
                const theta = phi * i;

                const x = Math.cos(theta) * radius;
                const z = Math.sin(theta) * radius;

                dots.push({ x, y, z, lat: 0, lon: 0 }); // x,y,z are normalized -1 to 1
            }
        };

        const getCssVar = (name: string) => {
            return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
        }

        let lastFrame = 0;
        const targetFps = 30;
        const frameInterval = 1000 / targetFps;

        const draw = (timestamp: number) => {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                return;
            }
            const elapsed = lastFrame === 0 ? frameInterval : timestamp - lastFrame;
            if (elapsed < frameInterval) {
                requestAnimationFrame(draw);
                return;
            }
            lastFrame = timestamp - (elapsed % frameInterval);

            ctx.clearRect(0, 0, width, height);

            const cx = align === "right" ? width * 0.72 : width / 2;
            const cy = height / 2;

            const accentRaw = getCssVar("--accent");
            const foregroundRaw = getCssVar("--foreground");

            rotation += 0.0015;

            const mouseInfluenceX = targetRotationX * 0.5;
            const mouseInfluenceY = targetRotationY * 0.5;

            const cosRotY = Math.cos(rotation + mouseInfluenceY);
            const sinRotY = Math.sin(rotation + mouseInfluenceY);
            const cosRotX = Math.cos(mouseInfluenceX);
            const sinRotX = Math.sin(mouseInfluenceX);

            // Pre-calculate projected positions
            const vertices: { x: number; y: number; z: number; px: number; py: number; visible: boolean }[] = [];

            dots.forEach((dot) => {
                const x = dot.x * cosRotY - dot.z * sinRotY;
                let z = dot.x * sinRotY + dot.z * cosRotY;
                let y = dot.y;

                const yNew = y * cosRotX - z * sinRotX;
                const zNew = y * sinRotX + z * cosRotX;
                y = yNew;
                z = zNew;

                // We want back dots to be smaller/transparent

                const px = cx + x * globeRadius;
                const py = cy + y * globeRadius;

                const size = 1.5;

                // Calculate alpha based on Z (depth)
                // z goes from approx -1 (back) to 1 (front) after rotation logic above? 
                // Wait, original x,y,z are unit sphere. 
                // x, z are rotated. z>0 is front? 
                // Let's assume z>0 is front. 

                // Map z from [-1, 1] to opacity
                // Front dots opaque, back dots transparent
                let alpha = (z + 1) / 2;
                alpha = Math.max(0.1, alpha * 0.8); // Min visibility

                // Accent color for front, muted for back
                if (z > 0) {
                    ctx.fillStyle = `hsla(${accentRaw} / ${alpha})`;
                } else {
                    ctx.fillStyle = `hsla(${foregroundRaw} / ${alpha * 0.3})`;
                }

                ctx.beginPath();
                ctx.arc(px, py, size, 0, Math.PI * 2);
                ctx.fill();

                // Draw connections? (Optional, might be too heavy)
            });

            requestAnimationFrame(draw);
        };

        resize();
        initDots();
        window.addEventListener("resize", resize);
        const animId = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            if (rafMouse !== null) cancelAnimationFrame(rafMouse);
            cancelAnimationFrame(animId);
        };
    }, [align]);

    return (
        <div className={cn("relative overflow-hidden pointer-events-none", className)}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-accent/5 rounded-full blur-[80px] -z-10" />
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        </div>
    );
};

export default WorldBackground;
