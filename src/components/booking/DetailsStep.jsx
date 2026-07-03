import { DETAILS_STEP_DESC, GUEST_EMAIL_PLACEHOLDER, GUEST_NAME_PLACEHOLDER } from "../../constants/copy";
import { formatDisplayDate, formatDisplayTime } from "../../utils/calendar";

export default function DetailsStep({
  date,
  time,
  pkg,
  level,
  guestName,
  guestEmail,
  onGuestNameChange,
  onGuestEmailChange,
}) {
  return (
    <div className="step-content fade-in">
      <h2>Final details</h2>
      <p className="step-desc">{DETAILS_STEP_DESC}</p>

      <div className="field">
        <label htmlFor="name">
          <span className="field-icon">✨</span>
          Your name
        </label>
        <input
          type="text"
          id="name"
          placeholder={GUEST_NAME_PLACEHOLDER}
          value={guestName}
          onChange={(e) => onGuestNameChange(e.target.value)}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="email">
          <span className="field-icon">📧</span>
          Your email
        </label>
        <input
          type="email"
          id="email"
          placeholder={GUEST_EMAIL_PLACEHOLDER}
          value={guestEmail}
          onChange={(e) => onGuestEmailChange(e.target.value)}
          required
        />
      </div>

      <div className="summary-preview">
        <div className="preview-row">
          <span>Date</span>
          <strong>{date ? formatDisplayDate(date, time || "12:00") : "—"}</strong>
        </div>
        <div className="preview-row">
          <span>Time</span>
          <strong>{time ? formatDisplayTime(time) : "—"}</strong>
        </div>
        <div className="preview-row">
          <span>Package</span>
          <strong>{pkg}</strong>
        </div>
        <div className="preview-row">
          <span>Level</span>
          <strong>{level}</strong>
        </div>
      </div>
    </div>
  );
}
