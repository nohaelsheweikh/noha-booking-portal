import { useEffect, useMemo, useState } from "react";
import {
  FINE_TUNE_MINUTES,
  getPeriodForTime,
  getTimeGroup,
} from "../constants/timeSlots";
import SelectedTimeBar from "./booking/SelectedTimeBar";
import TimePeriodTabs from "./booking/TimePeriodTabs";
import TimeSlotGroup from "./booking/TimeSlotGroup";

function parseTime(value) {
  if (!value) return { hour12: 7, minute: "00", period: "PM" };
  const [h, m] = value.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  const minute = String(m).padStart(2, "0");
  return { hour12, minute, period };
}

function to24h(hour12, minute, period) {
  let h = hour12 % 12;
  if (period === "PM") h += 12;
  return `${String(h).padStart(2, "0")}:${minute}`;
}

export default function TimePicker({ value, onChange }) {
  const [activePeriod, setActivePeriod] = useState(() => getPeriodForTime(value));
  const { hour12, minute, period } = useMemo(() => parseTime(value), [value]);
  const activeGroup = getTimeGroup(activePeriod);

  useEffect(() => {
    setActivePeriod(getPeriodForTime(value));
  }, [value]);

  function setParts(next) {
    const h = next.hour12 ?? hour12;
    const m = next.minute ?? minute;
    const p = next.period ?? period;
    onChange(to24h(h, m, p));
  }

  function bumpHour(delta) {
    let next = hour12 + delta;
    if (next > 12) next = 1;
    if (next < 1) next = 12;
    setParts({ hour12: next });
  }

  function handlePeriodChange(periodId) {
    setActivePeriod(periodId);
  }

  return (
    <div className="time-picker">
      <label className="time-picker-label">
        <span className="field-icon">🕐</span>
        Pick a time
      </label>
      <p className="time-picker-hint">Choose a period, then tap a time slot.</p>

      <TimePeriodTabs activePeriod={activePeriod} onChange={handlePeriodChange} />
      <SelectedTimeBar value={value} />

      {activeGroup && (
        <TimeSlotGroup group={activeGroup} value={value} onSelect={onChange} />
      )}

      <details className="time-fine-tune">
        <summary>Need an exact time? Fine-tune manually</summary>
        <div className="time-dial">
          <div className="dial-hour">
            <button type="button" className="dial-btn" onClick={() => bumpHour(-1)} aria-label="Earlier hour">
              −
            </button>
            <span className="dial-value">{hour12}</span>
            <button type="button" className="dial-btn" onClick={() => bumpHour(1)} aria-label="Later hour">
              +
            </button>
          </div>

          <span className="dial-colon">:</span>

          <div className="dial-minutes">
            {FINE_TUNE_MINUTES.map((m) => (
              <button
                key={m}
                type="button"
                className={`minute-chip ${minute === m ? "selected" : ""}`}
                onClick={() => setParts({ minute: m })}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="dial-period">
            {["AM", "PM"].map((p) => (
              <button
                key={p}
                type="button"
                className={`period-chip ${period === p ? "selected" : ""}`}
                onClick={() => setParts({ period: p })}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </details>
    </div>
  );
}
