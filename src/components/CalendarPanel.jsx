import { downloadICS } from "../utils/calendar";

export default function CalendarPanel({
  label,
  emoji,
  subtitle,
  googleUrl,
  outlookUrl,
  icsContent,
  icsFilename,
  accent,
}) {
  return (
    <div className={`calendar-panel accent-${accent}`}>
      <div className="panel-header">
        <span className="panel-emoji">{emoji}</span>
        <div>
          <h3>{label}</h3>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className="panel-actions">
        <a className="btn-cal google" href={googleUrl} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              fill="currentColor"
              d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z"
            />
          </svg>
          Google Calendar
        </a>

        <a className="btn-cal outlook" href={outlookUrl} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
            />
          </svg>
          Outlook
        </a>

        <button
          type="button"
          className="btn-cal apple"
          onClick={() => downloadICS(icsContent, icsFilename)}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              fill="currentColor"
              d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
            />
          </svg>
          Apple / Download .ics
        </button>
      </div>
    </div>
  );
}
