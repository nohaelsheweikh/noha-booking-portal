export const BOOKING_OPENS_ON = "2026-07-10";

export function getMinBookingDate() {
  const today = new Date().toISOString().split("T")[0];
  return today > BOOKING_OPENS_ON ? today : BOOKING_OPENS_ON;
}

export function isDateBookable(date) {
  return Boolean(date) && date >= getMinBookingDate();
}
