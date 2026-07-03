export const PACKAGES = [
  { id: "gossip", label: "Food + gossip", emoji: "🗣️", tag: "Most popular" },
  { id: "support", label: "Food + emotional support", emoji: "🫂", tag: "Premium" },
  { id: "roast", label: "Food + roasting your calendar", emoji: "📅", tag: "Meta" },
  { id: "board", label: "Full friendship board meeting", emoji: "🍰", tag: "With dessert" },
];

export const SERIOUSNESS = [
  { id: "casual", label: "Casual", emoji: "☕" },
  { id: "corporate", label: "Corporate friendship", emoji: "💼" },
  { id: "board", label: "Board meeting", emoji: "📊" },
  { id: "gov", label: "Government-level", emoji: "🏛️" },
];

export const WIZARD_STEPS = ["When", "Package", "Details", "Calendars"];

export { LOADING_MESSAGES } from "./copy";

export const DEFAULT_TIME = "";
export const DEFAULT_PACKAGE = PACKAGES[0].label;
export const DEFAULT_SERIOUSNESS = SERIOUSNESS[0].label;

export const APPROVAL_DELAY_MS = 2800;
export const LOADING_MESSAGE_INTERVAL_MS = 900;
