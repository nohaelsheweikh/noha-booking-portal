export const TIME_GROUPS = [
  {
    id: "morning",
    label: "Morning",
    emoji: "☀️",
    theme: "morning",
    slots: [
      { label: "9:00 AM", value: "09:00", emoji: "☀️", tag: "Earliest slot" },
      { label: "9:30 AM", value: "09:30" },
      { label: "10:00 AM", value: "10:00", emoji: "🗣️", tag: "Morning gossip" },
      { label: "10:30 AM", value: "10:30" },
      { label: "11:00 AM", value: "11:00", emoji: "🍳", tag: "Almost lunch" },
      { label: "11:30 AM", value: "11:30", emoji: "⏰", tag: "Pre-noon rush" },
    ],
  },
  {
    id: "afternoon",
    label: "Afternoon",
    emoji: "🌤️",
    theme: "afternoon",
    slots: [
      { label: "12:00 PM", value: "12:00", emoji: "🥗", tag: "Lunch date" },
      { label: "12:30 PM", value: "12:30" },
      { label: "1:00 PM", value: "13:00", emoji: "💼", tag: "Power lunch" },
      { label: "1:30 PM", value: "13:30" },
      { label: "2:00 PM", value: "14:00", emoji: "☕", tag: "Afternoon tea" },
      { label: "2:30 PM", value: "14:30" },
      { label: "3:00 PM", value: "15:00", emoji: "🍰", tag: "Dessert o'clock" },
      { label: "3:30 PM", value: "15:30" },
      { label: "4:00 PM", value: "16:00", emoji: "🌤️", tag: "Golden hour" },
      { label: "4:30 PM", value: "16:30", emoji: "👀", tag: "Almost dinner" },
    ],
  },
  {
    id: "evening",
    label: "Evening",
    emoji: "🌙",
    theme: "evening",
    featured: true,
    wide: true,
    slots: [
      { label: "5:00 PM", value: "17:00", emoji: "🚪", tag: "Doors open" },
      { label: "5:30 PM", value: "17:30" },
      { label: "6:00 PM", value: "18:00", emoji: "🌅", tag: "Sunset slot" },
      { label: "6:30 PM", value: "18:30" },
      { label: "7:00 PM", value: "19:00", emoji: "⭐", tag: "Classic", highlight: true },
      { label: "7:30 PM", value: "19:30", emoji: "💬", tag: "Peak gossip" },
      { label: "8:00 PM", value: "20:00", emoji: "🌙", tag: "Fashionably late" },
      { label: "8:30 PM", value: "20:30" },
      { label: "9:00 PM", value: "21:00", emoji: "🦉", tag: "Night owl" },
      { label: "9:30 PM", value: "21:30", emoji: "🍰", tag: "Dessert round 2" },
      { label: "10:00 PM", value: "22:00", emoji: "🌃", tag: "Snack risk" },
      { label: "10:30 PM", value: "22:30", emoji: "✨", tag: "Chaos hour" },
    ],
  },
];

export const FINE_TUNE_MINUTES = ["00", "15", "30", "45"];

export const ALL_TIME_SLOTS = TIME_GROUPS.flatMap((g) => g.slots);

export function findSlotMeta(value) {
  return ALL_TIME_SLOTS.find((s) => s.value === value) ?? null;
}

export function getPeriodForTime(value) {
  if (!value) return "evening";
  const [h] = value.split(":").map(Number);
  if (h < 12) return "morning";
  if (h < 17) return "afternoon";
  return "evening";
}

export function getTimeGroup(id) {
  return TIME_GROUPS.find((g) => g.id === id);
}
