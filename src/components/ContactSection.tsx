import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SectionHeader from "./SectionHeader";
import SectionPhotoBackdrop from "./SectionPhotoBackdrop";
import CalBooking from "./CalBooking";
import { BOOKING_SECTION_ID } from "@/lib/booking";

// Cal's desktop booking panel is a fixed 1040px wide. Render the iframe at that size (plus a little
// slack so it never overflows) and scale it with a transform so the panel exactly spans the container.
// Transforms behave the same in every browser, unlike CSS zoom around iframes. Below
// MIN_SCALED_WIDTH the panel would get too small, so Cal's own stacked mobile layout is used instead.
const CAL_PANEL_WIDTH = 1040;
const CAL_FRAME_SLACK = 16;
const CAL_FRAME_WIDTH = CAL_PANEL_WIDTH + CAL_FRAME_SLACK * 2;
const MIN_SCALED_WIDTH = 700;

const ContactSection = () => {
  const { t } = useTranslation();
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);
  const [innerHeight, setInnerHeight] = useState(0);

  useEffect(() => {
    const frame = frameRef.current;
    const inner = innerRef.current;
    if (!frame || !inner) return;
    const observer = new ResizeObserver(() => {
      const width = frame.clientWidth;
      setScale(width >= MIN_SCALED_WIDTH ? width / CAL_PANEL_WIDTH : null);
      // Transforms don't affect layout, so track the unscaled height to size the wrapper ourselves.
      setInnerHeight(inner.offsetHeight);
    });
    observer.observe(frame);
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);

  // This section is lazy-loaded, so the browser's native hash jump can fire before it exists.
  useEffect(() => {
    if (window.location.hash !== `#${BOOKING_SECTION_ID}`) return;
    const timer = window.setTimeout(
      () => document.getElementById(BOOKING_SECTION_ID)?.scrollIntoView({ behavior: "instant" }),
      50,
    );
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section id={BOOKING_SECTION_ID} className="section-padding relative overflow-hidden border-t border-border">
      <SectionPhotoBackdrop src="/assets/xarka8.jpg" />

      <div className="container-narrow relative z-10">
        <SectionHeader eyebrow={t("contact.sectionLabel")} title={t("contact.demoLink")} />

        <div
          ref={frameRef}
          className={scale ? undefined : "min-h-[600px]"}
          style={scale ? { height: innerHeight * scale } : undefined}
        >
          <div
            ref={innerRef}
            style={
              scale
                ? {
                    width: CAL_FRAME_WIDTH,
                    transform: `translateX(${-CAL_FRAME_SLACK * scale}px) scale(${scale})`,
                    transformOrigin: "0 0",
                  }
                : undefined
            }
          >
            <CalBooking />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
