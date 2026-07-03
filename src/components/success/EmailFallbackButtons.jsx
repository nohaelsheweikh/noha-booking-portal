import { buildMailtoLink } from "../../services/sendBookingNotification";

export default function EmailFallbackButtons({ booking }) {
  return (
    <div className="email-fallbacks">
      <a className="btn-email-noha" href={buildMailtoLink(booking, "host")}>
        ✉️ Email Noha manually
      </a>
      {booking.guestEmail && (
        <a className="btn-email-guest" href={buildMailtoLink(booking, "guest")}>
          ✉️ Email confirmation to {booking.guestName}
        </a>
      )}
    </div>
  );
}
