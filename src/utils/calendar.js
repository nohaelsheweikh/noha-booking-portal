const DURATION_HOURS = 3;

function parseLocalDateTime(date, time) {
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);
  return new Date(year, month - 1, day, hours, minutes);
}

function toGoogleFormat(date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function toICSLocalFormat(date) {
  const pad = (n) => String(n).padStart(2, "0");
  return (
    `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}` +
    `T${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`
  );
}

function escapeICS(text) {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function buildUrls({ start, end, title, description, location }) {
  const googleUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent(title)}` +
    `&dates=${toGoogleFormat(start)}/${toGoogleFormat(end)}` +
    `&details=${encodeURIComponent(description)}` +
    `&location=${encodeURIComponent(location)}`;

  const outlookUrl =
    "https://outlook.live.com/calendar/0/deeplink/compose?" +
    `subject=${encodeURIComponent(title)}` +
    `&body=${encodeURIComponent(description)}` +
    `&location=${encodeURIComponent(location)}` +
    `&startdt=${start.toISOString()}` +
    `&enddt=${end.toISOString()}` +
    "&path=/calendar/action/compose&rru=addevent";

  return { googleUrl, outlookUrl };
}

function buildICS({ uid, start, end, title, description, location, organizer, attendees = [], method = "PUBLISH" }) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Noha Booking Portal//EN",
    "CALSCALE:GREGORIAN",
    `METHOD:${method}`,
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toGoogleFormat(new Date())}`,
    `DTSTART:${toICSLocalFormat(start)}`,
    `DTEND:${toICSLocalFormat(end)}`,
    `SUMMARY:${escapeICS(title)}`,
    `DESCRIPTION:${escapeICS(description)}`,
    `LOCATION:${escapeICS(location)}`,
  ];

  if (organizer) {
    lines.push(`ORGANIZER;CN=${escapeICS(organizer.name)}:mailto:${organizer.email}`);
  }

  for (const attendee of attendees) {
    lines.push(
      `ATTENDEE;CN=${escapeICS(attendee.name)};RSVP=TRUE:mailto:${attendee.email}`
    );
  }

  lines.push("END:VEVENT", "END:VCALENDAR");
  return lines.join("\r\n");
}

export function formatDisplayDate(date, time) {
  const d = parseLocalDateTime(date, time);
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDisplayTime(time) {
  const [h, m] = time.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

export function buildDualCalendarEvents({
  date,
  time,
  pkg,
  level,
  guestName,
  hostName = "Noha",
  guestEmail = "",
  hostEmail = "",
}) {
  const start = parseLocalDateTime(date, time);
  const end = new Date(start.getTime() + DURATION_HOURS * 60 * 60 * 1000);
  const location = `${hostName}'s place`;
  const uid = `${date.replace(/-/g, "")}T${time.replace(":", "")}-noha-dinner@friendship-dept`;

  const guestTitle = `Time with ${hostName} 🗓️`;
  const guestDescription =
    `✅ You officially got on ${hostName}'s calendar.\n\n` +
    `Package: ${pkg}\n` +
    `Seriousness: ${level}\n\n` +
    `She's hard to book — don't waste this slot.`;

  const hostTitle = `Booking Request — ${guestName} 📋`;
  const hostDescription =
    `📌 Someone fought through the Booking Portal to see you.\n\n` +
    `Guest: ${guestName}\n` +
    `Package: ${pkg}\n` +
    `Seriousness: ${level}\n\n` +
    `They filled out the full form. You may be impressed.`;

  const guestUrls = buildUrls({
    start,
    end,
    title: guestTitle,
    description: guestDescription,
    location,
  });

  const hostUrls = buildUrls({
    start,
    end,
    title: hostTitle,
    description: hostDescription,
    location,
  });

  const organizer =
    guestEmail && guestName
      ? { name: guestName, email: guestEmail }
      : { name: guestName || "Guest", email: "guest@friendship-scheduling.local" };

  const attendees = [];
  if (hostEmail && hostName) attendees.push({ name: hostName, email: hostEmail });
  if (guestEmail && guestName) attendees.push({ name: guestName, email: guestEmail });

  const sharedIcs = buildICS({
    uid,
    start,
    end,
    title: `Booking: ${guestName} & ${hostName}`,
    description:
      `Noha Booking Portal — joint appointment.\n\n` +
      `Guest: ${guestName}\nHost: ${hostName}\nPackage: ${pkg}\nLevel: ${level}`,
    location,
    organizer,
    attendees,
  });

  return {
    uid,
    start,
    end,
    guest: {
      title: guestTitle,
      description: guestDescription,
      ...guestUrls,
      icsContent: buildICS({
        uid: `${uid}-guest`,
        start,
        end,
        title: guestTitle,
        description: guestDescription,
        location,
      }),
    },
    host: {
      title: hostTitle,
      description: hostDescription,
      ...hostUrls,
      icsContent: buildICS({
        uid: `${uid}-host`,
        start,
        end,
        title: hostTitle,
        description: hostDescription,
        location,
        organizer: { name: guestName || "Guest", email: "portal@friendship-scheduling.local" },
        attendees: hostEmail ? [{ name: hostName, email: hostEmail }] : [],
        method: hostEmail ? "REQUEST" : "PUBLISH",
      }),
    },
    sharedIcs,
  };
}

export function buildShareUrl({ date, time, pkg, level, guestName }) {
  const base = `${window.location.origin}${import.meta.env.BASE_URL}`;
  const params = new URLSearchParams({
    share: "1",
    date,
    time,
    pkg,
    level,
    guest: guestName,
  });
  return `${base}?${params.toString()}`;
}

export function parseShareParams() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("share") !== "1") return null;

  const date = params.get("date");
  const time = params.get("time");
  const pkg = params.get("pkg");
  const level = params.get("level");
  const guestName = params.get("guest");

  if (!date || !time || !pkg || !level || !guestName) return null;
  return { date, time, pkg, level, guestName };
}

export function downloadICS(icsContent, filename = "dinner-appointment.ics") {
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
