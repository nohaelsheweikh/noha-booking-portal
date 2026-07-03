import { useCallback, useEffect, useRef, useState } from "react";
import { isEmailConfigured } from "../constants/config";
import { sendBookingNotifications } from "../services/sendBookingNotification";

function resolveStatus(results) {
  const hostOk = Boolean(results.host);
  const guestOk = Boolean(results.guest);

  if (hostOk && guestOk) return "sent-both";
  if (hostOk || guestOk) return "sent-partial";
  return "error";
}

export function useBookingNotification(booking, { skip = false } = {}) {
  const [status, setStatus] = useState("idle");
  const sentKeyRef = useRef(null);

  const send = useCallback(() => {
    if (!booking || skip) return;

    const bookingKey = `${booking.date}-${booking.time}-${booking.guestName}-${booking.guestEmail}-${booking.pkg}`;

    if (!isEmailConfigured()) {
      setStatus("not-configured");
      return;
    }

    sentKeyRef.current = bookingKey;
    setStatus("sending");

    sendBookingNotifications(booking)
      .then((results) => setStatus(resolveStatus(results)))
      .catch(() => {
        sentKeyRef.current = null;
        setStatus("error");
      });
  }, [booking, skip]);

  useEffect(() => {
    if (!booking || skip) return;

    const bookingKey = `${booking.date}-${booking.time}-${booking.guestName}-${booking.guestEmail}-${booking.pkg}`;
    if (sentKeyRef.current === bookingKey) return;

    send();
  }, [booking, skip, send]);

  const retry = useCallback(() => {
    sentKeyRef.current = null;
    send();
  }, [send]);

  return { status, retry };
}
