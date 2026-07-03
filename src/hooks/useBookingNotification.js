import { useEffect, useRef, useState } from "react";
import { isEmailConfigured } from "../constants/config";
import { sendBookingNotification } from "../services/sendBookingNotification";

export function useBookingNotification(booking, { skip = false } = {}) {
  const [status, setStatus] = useState("idle");
  const sentKeyRef = useRef(null);

  useEffect(() => {
    if (!booking || skip) return;

    const bookingKey = `${booking.date}-${booking.time}-${booking.guestName}-${booking.pkg}`;
    if (sentKeyRef.current === bookingKey) return;

    if (!isEmailConfigured()) {
      setStatus("not-configured");
      return;
    }

    sentKeyRef.current = bookingKey;
    setStatus("sending");

    sendBookingNotification(booking)
      .then(() => setStatus("sent"))
      .catch(() => {
        sentKeyRef.current = null;
        setStatus("error");
      });
  }, [booking, skip]);

  return { status };
}
