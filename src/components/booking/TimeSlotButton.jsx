export default function TimeSlotButton({ slot, selected, onSelect }) {
  return (
    <button
      type="button"
      className={[
        "time-preset",
        selected && "selected",
        slot.highlight && "highlight",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() => onSelect(slot.value)}
      aria-pressed={selected}
    >
      {selected && <span className="preset-check" aria-hidden="true">✓</span>}
      <span className="preset-time">{slot.label}</span>
      {slot.tag && <span className="preset-tag">{slot.tag}</span>}
    </button>
  );
}
