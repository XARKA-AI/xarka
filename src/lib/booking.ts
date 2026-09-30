import type { MouseEvent } from "react";

export const BOOKING_SECTION_ID = "contact";
export const BOOKING_HREF = `/#${BOOKING_SECTION_ID}`;

/** On the home page, smooth-scroll to the booking section instead of reloading. */
export const handleBookingClick = (event: MouseEvent<HTMLAnchorElement>) => {
  if (window.location.pathname !== "/") return;
  event.preventDefault();
  window.history.replaceState(null, "", `#${BOOKING_SECTION_ID}`);
  document.getElementById(BOOKING_SECTION_ID)?.scrollIntoView({ behavior: "smooth" });
};
