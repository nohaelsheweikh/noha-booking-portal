import { useCallback, useRef } from "react";
import { APPROVAL_DELAY_MS, LOADING_MESSAGE_INTERVAL_MS, LOADING_MESSAGES } from "../constants/booking";

export function useApprovalLoading({ onComplete }) {
  const intervalRef = useRef(null);

  const startApproval = useCallback(
    (setLoading, setLoadingMsg) => {
      setLoading(true);

      let msgIndex = 0;
      setLoadingMsg(LOADING_MESSAGES[0]);

      intervalRef.current = setInterval(() => {
        msgIndex = (msgIndex + 1) % LOADING_MESSAGES.length;
        setLoadingMsg(LOADING_MESSAGES[msgIndex]);
      }, LOADING_MESSAGE_INTERVAL_MS);

      setTimeout(() => {
        clearInterval(intervalRef.current);
        onComplete();
        setLoading(false);
      }, APPROVAL_DELAY_MS);
    },
    [onComplete]
  );

  return { startApproval };
}
