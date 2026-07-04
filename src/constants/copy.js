export const PORTAL_NAME = "Noha Booking Portal™";
export const DEPARTMENT_NAME = "Noha Scheduling Office";
export const HOST_NAME = "Noha";

export const HERO_SUBTITLE =
  "Noha's calendar is VIP-only. If you want time with her, you go through the portal — " +
  "pick a slot, submit your request, and save it to both calendars. No DMs. No \"u free?\" No shortcuts.";

export const WHEN_STEP_DESC =
  "Pick a date and time that might work. Noha's calendar does not negotiate.";

export const PACKAGE_STEP_DESC =
  "Select your meeting package. All options require surviving the scheduling process.";

export const DETAILS_STEP_DESC =
  "We'll email Noha and send you a confirmation — both with calendar links.";

export const GUEST_NAME_PLACEHOLDER = "So Noha knows who's requesting her time";
export const GUEST_EMAIL_PLACEHOLDER = "You'll get a confirmation email from Noha here";

export const TICKET_TITLE = "Appointment with Noha — Access Granted";

export const LOADING_MESSAGES = [
  "Pinging Noha's heavily guarded calendar…",
  "Checking if she even has a free slot…",
  "Consulting the Noha Scheduling Office…",
  "Verifying you meet the minimum gossip requirements…",
  "Generating calendar invites before she gets booked…",
  "Sending confirmation emails to both of you…",
];

export const FINE_PRINT =
  "Cancellation within 24 hours may result in dramatic sighing, emotional prosecution, " +
  "and/or being moved to Noha's \"maybe in 2027\" list.";

export const SHARE_HERO_TITLE = "Someone booked you";
export const shareHeroSubtitle = (guestName) =>
  `${guestName} fought through the official portal to secure time with you. ` +
  `Add it to your calendar before you accidentally double-book yourself.`;

export const CALENDAR_SECTION_SUB =
  "Two invites, one scarce Noha slot — yours and hers. Tap Save before someone else takes it.";

export const GUEST_CALENDAR_SUB = "Your proof that you actually got on her calendar";
export const HOST_CALENDAR_SUB = "For Noha — because she definitely didn't enter this herself";

export const BOOKED_OUT_TITLE = "Calendar fully booked";
export const bookedOutMessage = (opensOn) =>
  `Noha's calendar is completely full until ${opensOn}. ` +
  "Every slot is taken — no walk-ins, no DMs, no exceptions. " +
  "Check back when new availability opens.";
