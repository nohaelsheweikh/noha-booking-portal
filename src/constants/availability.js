export const BOOKING_OPENS_ON = "2026-07-12";

export function isBeforeBookingOpens() {
  const today = new Date().toISOString().split("T")[0];
  return today < BOOKING_OPENS_ON;
}

export function getMinBookingDate() {
  const today = new Date().toISOString().split("T")[0];
  return today > BOOKING_OPENS_ON ? today : BOOKING_OPENS_ON;
}

export function isDateBookable(date) {
  return Boolean(date) && date >= getMinBookingDate();
}

export function formatBookingOpensDate() {
  const [year, month, day] = BOOKING_OPENS_ON.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
