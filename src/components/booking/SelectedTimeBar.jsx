function formatTime(value) {
  if (!value) return null;
  const [h, m] = value.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

export default function SelectedTimeBar({ value }) {
  const formatted = formatTime(value);

  if (!value) {
    return (
      <div className="selected-time-bar empty">
        <span className="selected-time-placeholder">No time selected — tap a slot below</span>
      </div>
    );
  }

  return (
    <div className="selected-time-bar has-selection">
      <div className="selected-time-left">
        <span className="selected-time-label">Selected</span>
        <span className="selected-time-value">{formatted}</span>
      </div>
      <span className="selected-time-check" aria-label="Time selected">
        ✓
      </span>
    </div>
  );
}
