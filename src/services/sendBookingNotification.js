import emailjs from "@emailjs/browser";
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_GUEST,
  EMAILJS_TEMPLATE_HOST,
  NOHA_EMAIL,
  WEB3FORMS_ACCESS_KEY,
  isGuestEmailConfigured,
  isHostEmailConfigured,
} from "../constants/config";
import { HOST_NAME, PORTAL_NAME } from "../constants/copy";
import { formatDisplayDate, formatDisplayTime } from "../utils/calendar";

async function postWeb3Forms(payload) {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.message || "Web3Forms request failed");
  }
  return result;
}

function buildHostEmailBody(booking) {
  const displayDate = formatDisplayDate(booking.date, booking.time);
  const displayTime = formatDisplayTime(booking.time);

  return (
    `New booking through the ${PORTAL_NAME}\n\n` +
    `Requested by: ${booking.guestName}\n` +
    `Their email: ${booking.guestEmail}\n` +
    `Date: ${displayDate}\n` +
    `Time: ${displayTime}\n` +
    `Package: ${booking.pkg}\n` +
    `Seriousness: ${booking.level}\n\n` +
    `Add to your calendar:\n${booking.events.host.googleUrl}`
  );
}

function buildGuestEmailBody(booking) {
  const displayDate = formatDisplayDate(booking.date, booking.time);
  const displayTime = formatDisplayTime(booking.time);

  return (
    `Hi ${booking.guestName},\n\n` +
    `Your appointment with ${HOST_NAME} is confirmed! You officially got on her calendar.\n\n` +
    `Date: ${displayDate}\n` +
    `Time: ${displayTime}\n` +
    `Package: ${booking.pkg}\n` +
    `Seriousness: ${booking.level}\n\n` +
    `Add to your calendar:\n${booking.events.guest.googleUrl}\n\n` +
    `— ${HOST_NAME}\n` +
    `(sent via ${PORTAL_NAME})`
  );
}

function emailTemplateParams(booking) {
  const displayDate = formatDisplayDate(booking.date, booking.time);
  const displayTime = formatDisplayTime(booking.time);

  return {
    to_email: booking.guestEmail,
    to_name: booking.guestName,
    guest_name: booking.guestName,
    guest_email: booking.guestEmail,
    host_name: HOST_NAME,
    host_email: NOHA_EMAIL,
    appointment_date: displayDate,
    appointment_time: displayTime,
    package: booking.pkg,
    seriousness: booking.level,
    guest_calendar_link: booking.events.guest.googleUrl,
    host_calendar_link: booking.events.host.googleUrl,
    message: buildGuestEmailBody(booking),
    reply_to: NOHA_EMAIL,
    from_name: HOST_NAME,
  };
}

export async function sendHostNotification(booking) {
  if (!isHostEmailConfigured()) {
    throw new Error("Host email not configured");
  }

  const displayDate = formatDisplayDate(booking.date, booking.time);
  const displayTime = formatDisplayTime(booking.time);

  return postWeb3Forms({
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `Booking request — ${booking.guestName} · ${displayDate} at ${displayTime}`,
    from_name: PORTAL_NAME,
    name: booking.guestName,
    email: booking.guestEmail,
    message: buildHostEmailBody(booking),
  });
}

export async function sendGuestConfirmation(booking) {
  if (!isGuestEmailConfigured()) {
    throw new Error("Guest email not configured");
  }

  const displayDate = formatDisplayDate(booking.date, booking.time);
  const displayTime = formatDisplayTime(booking.time);
  const params = emailTemplateParams(booking);

  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_GUEST,
    params,
    { publicKey: EMAILJS_PUBLIC_KEY }
  );
}

/** Optional: send Noha a copy via EmailJS too (if template configured) */
export async function sendHostViaEmailJS(booking) {
  if (!EMAILJS_TEMPLATE_HOST || !EMAILJS_SERVICE_ID || !EMAILJS_PUBLIC_KEY) {
    throw new Error("Host EmailJS template not configured");
  }

  const displayDate = formatDisplayDate(booking.date, booking.time);
  const displayTime = formatDisplayTime(booking.time);

  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_HOST,
    {
      to_email: NOHA_EMAIL,
      to_name: HOST_NAME,
      guest_name: booking.guestName,
      guest_email: booking.guestEmail,
      appointment_date: displayDate,
      appointment_time: displayTime,
      package: booking.pkg,
      seriousness: booking.level,
      host_calendar_link: booking.events.host.googleUrl,
      message: buildHostEmailBody(booking),
      from_name: PORTAL_NAME,
    },
    { publicKey: EMAILJS_PUBLIC_KEY }
  );
}

export async function sendBookingNotifications(booking) {
  const results = { host: null, guest: null, hostError: null, guestError: null };

  if (isHostEmailConfigured()) {
    try {
      results.host = await sendHostNotification(booking);
    } catch (err) {
      results.hostError = err.message;
    }
  }

  if (isGuestEmailConfigured()) {
    try {
      results.guest = await sendGuestConfirmation(booking);
    } catch (err) {
      results.guestError = err.message;
    }
  }

  if (!isHostEmailConfigured() && !isGuestEmailConfigured()) {
    throw new Error("Email not configured");
  }

  if (!results.host && !results.guest) {
    throw new Error(results.hostError || results.guestError || "All emails failed");
  }

  return results;
}

export function buildMailtoLink(booking, recipient = "host") {
  const displayDate = formatDisplayDate(booking.date, booking.time);
  const displayTime = formatDisplayTime(booking.time);
  const isGuest = recipient === "guest";

  const to = isGuest ? booking.guestEmail : NOHA_EMAIL;
  const subject = isGuest
    ? `Your appointment with ${HOST_NAME} — ${displayDate}`
    : `Booking request — ${booking.guestName} · ${displayDate} at ${displayTime}`;
  const body = isGuest ? buildGuestEmailBody(booking) : buildHostEmailBody(booking);

  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
