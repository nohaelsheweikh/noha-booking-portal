import {
  CALENDAR_SECTION_SUB,
  GUEST_CALENDAR_SUB,
  HOST_CALENDAR_SUB,
  HOST_NAME,
} from "../../constants/copy";
import CalendarPanel from "../CalendarPanel";
import { downloadICS } from "../../utils/calendar";

export default function DualCalendars({ events }) {
  return (
    <div className="dual-calendars">
      <h2 className="section-title">Lock it into both calendars</h2>
      <p className="section-sub">{CALENDAR_SECTION_SUB}</p>

      <CalendarPanel
        label="Your calendar"
        emoji="🙋"
        subtitle={GUEST_CALENDAR_SUB}
        googleUrl={events.guest.googleUrl}
        outlookUrl={events.guest.outlookUrl}
        icsContent={events.guest.icsContent}
        icsFilename="my-noha-appointment.ics"
        accent="you"
      />

      <CalendarPanel
        label={`${HOST_NAME}'s calendar`}
        emoji="👑"
        subtitle={HOST_CALENDAR_SUB}
        googleUrl={events.host.googleUrl}
        outlookUrl={events.host.outlookUrl}
        icsContent={events.host.icsContent}
        icsFilename="noha-appointment.ics"
        accent="noha"
      />

      <button
        type="button"
        className="btn-both"
        onClick={() => downloadICS(events.sharedIcs, "noha-booking-both.ics")}
      >
        Download one invite for both (.ics)
      </button>
    </div>
  );
}
