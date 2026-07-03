import { TIME_GROUPS } from "../../constants/timeSlots";

export default function TimePeriodTabs({ activePeriod, onChange }) {
  return (
    <div className="time-period-tabs" role="tablist" aria-label="Time of day">
      {TIME_GROUPS.map((group) => (
        <button
          key={group.id}
          type="button"
          role="tab"
          aria-selected={activePeriod === group.id}
          className={`period-tab period-tab-${group.theme} ${activePeriod === group.id ? "active" : ""}`}
          onClick={() => onChange(group.id)}
        >
          <span className="period-tab-emoji">{group.emoji}</span>
          <span className="period-tab-label">{group.label}</span>
        </button>
      ))}
    </div>
  );
}
