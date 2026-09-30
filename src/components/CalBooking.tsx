import { useEffect, useRef, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

const CAL_LINK = "rajat-gupta-0ytv7c/xarka-demo";
const CAL_NAMESPACE = "xarka-demo";

const readTheme = (): "dark" | "light" =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

interface CalBookingProps {
  className?: string;
}

const CalBooking = ({ className }: CalBookingProps) => {
  const [theme, setTheme] = useState<"dark" | "light">(readTheme);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cal sizes the iframe to its content, so it never needs to scroll. Turning scrolling off stops
  // trackpad swipes from rubber-banding the panel around inside the frame; they scroll the page instead.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const lockIframe = () => {
      const iframe = container.querySelector("iframe");
      if (iframe && iframe.getAttribute("scrolling") !== "no") {
        iframe.setAttribute("scrolling", "no");
        iframe.style.overflow = "hidden";
      }
    };
    lockIframe();
    const observer = new MutationObserver(lockIframe);
    observer.observe(container, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  // Follow the site's class-based theme toggle.
  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      // Transparent page around Cal's booking panel (only the panel shows), with rounder corners.
      cal("ui", {
        theme,
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: { "cal-bg": "transparent", "cal-border-subtle": "transparent", radius: "18px" },
          dark: { "cal-bg": "transparent", "cal-border-subtle": "transparent", radius: "18px" },
        },
      });
    })();
  }, [theme]);

  return (
    <div ref={containerRef} className="overscroll-none">
      <Cal
        namespace={CAL_NAMESPACE}
        calLink={CAL_LINK}
        className={className}
        style={{ width: "100%" }}
        config={{ layout: "month_view", theme }}
      />
    </div>
  );
};

export default CalBooking;
