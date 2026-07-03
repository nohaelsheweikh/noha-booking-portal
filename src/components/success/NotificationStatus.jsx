import { NOHA_EMAIL } from "../../constants/config";
import { HOST_NAME } from "../../constants/copy";

const STATUS_COPY = {
  sending: {
    emoji: "📨",
    title: "Sending emails…",
    text: `Notifying ${HOST_NAME} at ${NOHA_EMAIL} and sending you a confirmation.`,
  },
  "sent-both": {
    emoji: "✅",
    title: "Both emails sent!",
    text: `${HOST_NAME} got the booking request and you should receive a confirmation in your inbox. Check spam too.`,
  },
  "sent-partial": {
    emoji: "⚠️",
    title: "One email sent",
    text: "Only part of the email setup worked. Use the manual email buttons below if needed.",
    showRetry: true,
  },
  error: {
    emoji: "⚠️",
    title: "Emails couldn't be sent",
    text: "Auto-email failed. Use the buttons below to email manually or add to calendar.",
    showRetry: true,
  },
  "not-configured": {
    emoji: "📋",
    title: "Auto-email not set up yet",
    text: "Use the email buttons below to send confirmations manually, or set up Web3Forms + EmailJS (see README).",
  },
};

export default function NotificationStatus({ status, onRetry }) {
  if (status === "idle") return null;

  const copy = STATUS_COPY[status];
  if (!copy) return null;

  return (
    <div className={`notification-status status-${status}`}>
      <span className="notification-emoji">{copy.emoji}</span>
      <div>
        <strong>{copy.title}</strong>
        <p>{copy.text}</p>
        {copy.showRetry && onRetry && (
          <button type="button" className="btn-retry-email" onClick={onRetry}>
            Try sending again
          </button>
        )}
      </div>
    </div>
  );
}
