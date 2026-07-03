import { WHEN_STEP_DESC } from "../../constants/copy";
import TimePicker from "../TimePicker";

export default function WhenStep({ date, time, onDateChange, onTimeChange }) {
  return (
    <div className="step-content fade-in">
      <h2>Request a slot on Noha's calendar</h2>
      <p className="step-desc">{WHEN_STEP_DESC}</p>

      <div className="field">
        <label htmlFor="date">
          <span className="field-icon">📅</span>
          Preferred date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      <TimePicker value={time} onChange={onTimeChange} />
    </div>
  );
}
