import { buildShareUrl } from "../../utils/calendar";
import { useBookingNotification } from "../../hooks/useBookingNotification";
import { useShareLink } from "../../hooks/useShareLink";
import AppointmentTicket from "./AppointmentTicket";
import DualCalendars from "./DualCalendars";
import NotificationStatus from "./NotificationStatus";
import ShareLinkBox from "./ShareLinkBox";

export default function SuccessView({ booking, onReset, showShareLink = true }) {
  const shareUrl = buildShareUrl(booking);
  const { copied, copyShareLink } = useShareLink(shareUrl);
  const { status: notificationStatus } = useBookingNotification(booking, { skip: !showShareLink });

  return (
    <div className="success-view">
      <NotificationStatus status={notificationStatus} />
      <AppointmentTicket booking={booking} />
      <DualCalendars events={booking.events} />
      {showShareLink && <ShareLinkBox copied={copied} onCopy={copyShareLink} />}
      <button type="button" className="btn-reset" onClick={onReset}>
        Book another appointment
      </button>
    </div>
  );
}
