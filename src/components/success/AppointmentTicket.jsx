import { TICKET_TITLE } from "../../constants/copy";
import { formatDisplayDate, formatDisplayTime } from "../../utils/calendar";

export default function AppointmentTicket({ booking }) {
  return (
    <div className="ticket">
      <div className="ticket-notch left" />
      <div className="ticket-notch right" />
      <div className="ticket-stamp">APPROVED</div>

      <p className="ticket-label">Official Booking Confirmation</p>
      <h2 className="ticket-title">{TICKET_TITLE}</h2>

      <div className="ticket-meta">
        <div className="meta-item">
          <span className="meta-key">Date</span>
          <span className="meta-val">{formatDisplayDate(booking.date, booking.time)}</span>
        </div>
        <div className="meta-item">
          <span className="meta-key">Time</span>
          <span className="meta-val">{formatDisplayTime(booking.time)}</span>
        </div>
        <div className="meta-item">
          <span className="meta-key">Package</span>
          <span className="meta-val">{booking.pkg}</span>
        </div>
        <div className="meta-item">
          <span className="meta-key">Level</span>
          <span className="meta-val">{booking.level}</span>
        </div>
        <div className="meta-item full">
          <span className="meta-key">Requested by</span>
          <span className="meta-val">{booking.guestName}</span>
        </div>
        {booking.guestEmail && (
          <div className="meta-item full">
            <span className="meta-key">Email</span>
            <span className="meta-val">{booking.guestEmail}</span>
          </div>
        )}
      </div>

      <div className="ticket-barcode" aria-hidden="true">
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i} style={{ height: `${20 + (i % 5) * 8}%` }} />
        ))}
      </div>
    </div>
  );
}
