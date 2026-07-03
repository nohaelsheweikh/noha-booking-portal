import { NOHA_EMAIL, WEB3FORMS_ACCESS_KEY } from "../constants/config";
import { PORTAL_NAME } from "../constants/copy";
import { formatDisplayDate, formatDisplayTime } from "../utils/calendar";

function toBase64(content) {
  return btoa(unescape(encodeURIComponent(content)));
}

function buildEmailBody(booking) {
  const { guestName, date, time, pkg, level, events } = booking;
  const displayDate = formatDisplayDate(date, time);
  const displayTime = formatDisplayTime(time);

  return (
    `Someone booked you through the ${PORTAL_NAME}\n\n` +
    `Requested by: ${guestName}\n` +
    `Date: ${displayDate}\n` +
    `Time: ${displayTime}\n` +
    `Package: ${pkg}\n` +
    `Seriousness: ${level}\n\n` +
    `Add to Google Calendar:\n${events.host.googleUrl}\n\n` +
    `A calendar invite (.ics) is attached — open it to add this to your calendar.`
  );
}

export async function sendBookingNotification(booking) {
  if (!WEB3FORMS_ACCESS_KEY) {
    throw new Error("Email not configured — add VITE_WEB3FORMS_ACCESS_KEY");
  }

  const displayDate = formatDisplayDate(booking.date, booking.time);
  const displayTime = formatDisplayTime(booking.time);

  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `Booking request — ${booking.guestName} · ${displayDate} at ${displayTime}`,
    from_name: PORTAL_NAME,
    name: booking.guestName,
    email: NOHA_EMAIL,
    to: NOHA_EMAIL,
    guest_name: booking.guestName,
    appointment_date: displayDate,
    appointment_time: displayTime,
    dinner_package: booking.pkg,
    seriousness_level: booking.level,
    google_calendar_link: booking.events.host.googleUrl,
    message: buildEmailBody(booking),
    attachments: [
      {
        name: "noha-booking-invite.ics",
        content: toBase64(booking.events.host.icsContent),
      },
    ],
  };

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to send email notification");
  }

  return result;
}
