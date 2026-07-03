import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_PACKAGE,
  DEFAULT_SERIOUSNESS,
  DEFAULT_TIME,
  WIZARD_STEPS,
} from "../constants/booking";
import { NOHA_EMAIL } from "../constants/config";
import { buildDualCalendarEvents, parseShareParams } from "../utils/calendar";
import { useApprovalLoading } from "./useApprovalLoading";

export function useBookingWizard() {
  const [step, setStep] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState(DEFAULT_TIME);
  const [pkg, setPkg] = useState(DEFAULT_PACKAGE);
  const [level, setLevel] = useState(DEFAULT_SERIOUSNESS);
  const [guestName, setGuestName] = useState("");
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [isShareMode, setIsShareMode] = useState(false);

  const finalizeBooking = useCallback(() => {
    const resolvedGuest = guestName.trim() || "A brave soul";
    const events = buildDualCalendarEvents({
      date,
      time,
      pkg,
      level,
      guestName: resolvedGuest,
      hostEmail: NOHA_EMAIL,
    });

    setBooking({ date, time, pkg, level, guestName: resolvedGuest, events });
    setStep(WIZARD_STEPS.length - 1);
  }, [date, time, pkg, level, guestName]);

  const { startApproval } = useApprovalLoading({ onComplete: finalizeBooking });

  useEffect(() => {
    const shared = parseShareParams();
    if (!shared) return;

    setIsShareMode(true);
    setBooking({
      ...shared,
      events: buildDualCalendarEvents({ ...shared, hostName: "Noha", hostEmail: NOHA_EMAIL }),
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
        approveBooking();
        return;
      }

      setStep((s) => s + 1);
    },
    [step, date, time, approveBooking]
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
    handleNext,
    goBack,
    reset,
  };
}
