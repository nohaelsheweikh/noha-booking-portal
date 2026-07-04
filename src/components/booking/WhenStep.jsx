import { useId, useRef } from "react";
import {
  formatMinBookingDateLabel,
  getMinBookingDate,
} from "../../constants/availability";
import { WHEN_STEP_DESC } from "../../constants/copy";
import TimePicker from "../TimePicker";

export default function WhenStep({ date, time, onDateChange, onTimeChange }) {
  const inputRef = useRef(null);
  const inputId = useId();
  const minDate = getMinBookingDate();

  const openDatePicker = () => {
    const input = inputRef.current;
    if (!input) return;

    input.focus();
    if (typeof input.showPicker === "function") {
      input.showPicker();
    }
  };

  return (
    <div className="step-content fade-in">
      <h2>Request a slot on Noha's calendar</h2>
      <p className="step-desc">{WHEN_STEP_DESC}</p>

      <div className="field">
        <label htmlFor={inputId}>
          <span className="field-icon">📅</span>
          Preferred date
        </label>
        <div className="date-input-wrap" onClick={openDatePicker}>
          <input
            ref={inputRef}
            type="date"
            id={inputId}
            value={date}
            onChange={(event) => onDateChange(event.target.value)}
            min={minDate}
            className={date ? "" : "date-input-empty"}
          />
          {!date && (
            <span className="date-placeholder" aria-hidden="true">
              Tap to select a date
            </span>
          )}
          <span className="date-input-icon" aria-hidden="true">
            📅
          </span>
        </div>
        <p className="field-hint">
          Earliest available date: {formatMinBookingDateLabel()}
        </p>
      </div>

      <TimePicker value={time} onChange={onTimeChange} />
    </div>
  );
}
