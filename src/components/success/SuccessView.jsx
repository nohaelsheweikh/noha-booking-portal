import { buildShareUrl } from "../../utils/calendar";
import { useBookingNotification } from "../../hooks/useBookingNotification";
import { useShareLink } from "../../hooks/useShareLink";
import AppointmentTicket from "./AppointmentTicket";
import DualCalendars from "./DualCalendars";
import EmailFallbackButtons from "./EmailFallbackButtons";
import NotificationStatus from "./NotificationStatus";
import ShareLinkBox from "./ShareLinkBox";

export default function SuccessView({ booking, onReset, showShareLink = true }) {
  const shareUrl = buildShareUrl(booking);
  const { copied, copyShareLink } = useShareLink(shareUrl);
  const { status: notificationStatus, retry } = useBookingNotification(booking, { skip: !showShareLink });

  const showEmailFallback =
    notificationStatus === "not-configured" ||
    notificationStatus === "error" ||
    notificationStatus === "sent-partial";

  return (
    <div className="success-view">
      <NotificationStatus status={notificationStatus} onRetry={retry} />
      <AppointmentTicket booking={booking} />
      <DualCalendars events={booking.events} />
      {showEmailFallback && <EmailFallbackButtons booking={booking} />}
      {showShareLink && <ShareLinkBox copied={copied} onCopy={copyShareLink} />}
      <button type="button" className="btn-reset" onClick={onReset}>
        Book another appointment
      </button>
    </div>
  );
}
