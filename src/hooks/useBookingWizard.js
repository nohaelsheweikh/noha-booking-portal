import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_PACKAGE,
  DEFAULT_SERIOUSNESS,
  DEFAULT_TIME,
  WIZARD_STEPS,
} from "../constants/booking";
import { NOHA_EMAIL } from "../constants/config";
import { buildDualCalendarEvents, parseShareParams } from "../utils/calendar";
import { isValidEmail } from "../utils/emailValidation";
import { useApprovalLoading } from "./useApprovalLoading";

export function useBookingWizard() {
  const [step, setStep] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState(DEFAULT_TIME);
  const [pkg, setPkg] = useState(DEFAULT_PACKAGE);
  const [level, setLevel] = useState(DEFAULT_SERIOUSNESS);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [isShareMode, setIsShareMode] = useState(false);

  const finalizeBooking = useCallback(() => {
    const resolvedGuest = guestName.trim() || "A brave soul";
    const resolvedEmail = guestEmail.trim();
    const events = buildDualCalendarEvents({
      date,
      time,
      pkg,
      level,
      guestName: resolvedGuest,
      guestEmail: resolvedEmail,
      hostEmail: NOHA_EMAIL,
    });

    setBooking({
      date,
      time,
      pkg,
      level,
      guestName: resolvedGuest,
      guestEmail: resolvedEmail,
      events,
    });
    setStep(WIZARD_STEPS.length - 1);
  }, [date, time, pkg, level, guestName, guestEmail]);

  const { startApproval } = useApprovalLoading({ onComplete: finalizeBooking });

  useEffect(() => {
    const shared = parseShareParams();
    if (!shared) return;

    setIsShareMode(true);
    setBooking({
      ...shared,
      guestEmail: shared.guestEmail || "",
      events: buildDualCalendarEvents({
        ...shared,
        hostName: "Noha",
        hostEmail: NOHA_EMAIL,
        guestEmail: shared.guestEmail || "",
      }),
    });
  }, []);

  const approveBooking = useCallback(() => {
    startApproval(setLoading, setLoadingMsg);
  }, [startApproval]);

  const handleNext = useCallback(
    (e) => {
      e.preventDefault();

      if (step === 0 && (!date || !time)) {
        alert("Pick a date and time — friendship requires timestamps now.");
        return;
      }

      if (step === 2) {
        if (!guestName.trim()) {
          alert("Please enter your name.");
          return;
        }
        if (!isValidEmail(guestEmail)) {
          alert("Please enter a valid email so you can receive your confirmation.");
          return;
        }
        approveBooking();
        return;
      }

      setStep((s) => s + 1);
    },
    [step, date, time, guestName, guestEmail, approveBooking]
  );

  const goBack = useCallback(() => {
    setStep((s) => s - 1);
  }, []);

  const reset = useCallback(() => {
    setStep(0);
    setBooking(null);
    setIsShareMode(false);
    setDate("");
    setTime(DEFAULT_TIME);
    setPkg(DEFAULT_PACKAGE);
    setLevel(DEFAULT_SERIOUSNESS);
    setGuestName("");
    setGuestEmail("");
    window.history.replaceState({}, "", window.location.pathname);
  }, []);

  const isSuccess = Boolean(booking && (isShareMode || step === WIZARD_STEPS.length - 1));

  return {
    step,
    date,
    time,
    pkg,
    level,
    guestName,
    guestEmail,
    booking,
    loading,
    loadingMsg,
    isShareMode,
    isSuccess,
    setDate,
    setTime,
    setPkg,
    setLevel,
    setGuestName,
    setGuestEmail,
    handleNext,
    goBack,
    reset,
  };
}
