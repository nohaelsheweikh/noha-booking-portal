import TimeSlotButton from "./TimeSlotButton";

export default function TimeSlotGroup({ group, value, onSelect }) {
  const groupClass = [
    "time-group",
    group.theme && `time-group-${group.theme}`,
    group.featured && "featured-group",
  ]
    .filter(Boolean)
    .join(" ");

  const gridClass = ["time-presets", group.wide && "wide-grid"].filter(Boolean).join(" ");

  return (
    <section className={groupClass} aria-label={`${group.label} time slots`}>
      <p className="time-group-hint">Tap a time to select it</p>
      <div className={gridClass}>
        {group.slots.map((slot) => (
          <TimeSlotButton
            key={slot.value}
            slot={slot}
            selected={value === slot.value}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}
