export const BOOKING_OPENS_ON = "2026-07-10";

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getMinBookingDate() {
  const today = getLocalDateString();
  return today > BOOKING_OPENS_ON ? today : BOOKING_OPENS_ON;
}

export function formatMinBookingDateLabel() {
  const [year, month, day] = getMinBookingDate().split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function isDateBookable(date) {
  return Boolean(date) && date >= getMinBookingDate();
}
