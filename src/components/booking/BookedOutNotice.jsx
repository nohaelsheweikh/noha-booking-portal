import { BOOKED_OUT_TITLE, bookedOutMessage } from "../../constants/copy";
import { formatBookingOpensDate } from "../../constants/availability";

export default function BookedOutNotice() {
  const opensOn = formatBookingOpensDate();

  return (
    <div className="form-card booked-out-notice fade-in">
      <div className="booked-out-icon" aria-hidden="true">
        📅
      </div>
      <h2>{BOOKED_OUT_TITLE}</h2>
      <p className="booked-out-date">Next availability: {opensOn}</p>
      <p className="step-desc">{bookedOutMessage(opensOn)}</p>
    </div>
  );
}
