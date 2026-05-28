import { useEffect, useMemo, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DiaTextReveal } from "@/components/magicui/dia-text-reveal";

const HERO_REVEAL_COLORS = ["#6ee7b7", "#34d399", "#ffffff", "#10b981", "#059669"];

const Hero = () => {
  const { t, i18n } = useTranslation();
  const titleReveal = useMemo(
    () => t("hero.titleReveal", { returnObjects: true }) as string[],
    [t, i18n.language],
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      if (media.matches) {
        video.pause();
      } else {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    };

    syncPlayback();
    media.addEventListener("change", syncPlayback);
    return () => media.removeEventListener("change", syncPlayback);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden border-b border-white/10 bg-[hsl(220,18%,8%)] pt-16 text-white">
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[48%_center] sm:object-center"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src="/assets/xarka.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 bg-[hsl(220,18%,8%)/0.55]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[hsl(220,18%,8%)/0.95] via-[hsl(220,18%,8%)/0.35] to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,104,64,0.15),transparent_55%)]" />

      <div className="relative z-10 flex w-full flex-1 items-end px-4 pb-[calc(2.25rem+env(safe-area-inset-bottom))] pt-12 sm:px-6 sm:pb-16 md:px-8 md:pb-20 lg:px-16 lg:pb-24 xl:px-20">
        <div className="flex w-full max-w-2xl flex-col gap-6 sm:gap-8">
          <h1 className="flex flex-wrap items-baseline gap-x-[0.25em] text-balance text-[2.25rem] font-semibold leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            <span>{t("hero.titlePrefix")}</span>
            <DiaTextReveal
              repeat
              repeatDelay={1.4}
              fixedWidth
              duration={1.1}
              text={titleReveal}
              textColor="#ffffff"
              colors={HERO_REVEAL_COLORS}
              startOnView
              once
              className="leading-[inherit]"
            />
          </h1>
          <button
            type="button"
            className="inline-flex min-h-11 w-fit max-w-full shrink-0 items-center gap-3 rounded-full border border-white/25 bg-transparent py-1.5 pl-5 pr-1.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
            onClick={() =>
              document.getElementById("platform")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span className="min-w-0">{t("hero.explorePlatform")}</span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10">
              <ArrowRight size={16} aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
