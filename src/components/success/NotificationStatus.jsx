import { NOHA_EMAIL } from "../../constants/config";

const STATUS_COPY = {
  sending: {
    emoji: "📨",
    title: "Sending to Noha…",
    text: `Emailing ${NOHA_EMAIL} with the calendar invite.`,
  },
  sent: {
    emoji: "✅",
    title: "Noha has been notified!",
    text: `Booking sent to ${NOHA_EMAIL} with a calendar invite attached. She can open the .ics file or use the Google Calendar link in the email.`,
  },
  error: {
    emoji: "⚠️",
    title: "Email couldn't be sent",
    text: "The booking was saved, but the email failed. Use the calendar buttons below or copy the link for Noha.",
  },
  "not-configured": {
    emoji: "📋",
    title: "Share manually for now",
    text: `Email auto-send isn't set up yet. Use the calendar buttons below or copy the link for ${NOHA_EMAIL}.`,
  },
};

export default function NotificationStatus({ status }) {
  if (status === "idle") return null;

  const copy = STATUS_COPY[status];
  if (!copy) return null;

  return (
    <div className={`notification-status status-${status}`}>
      <span className="notification-emoji">{copy.emoji}</span>
      <div>
        <strong>{copy.title}</strong>
        <p>{copy.text}</p>
      </div>
    </div>
  );
}
