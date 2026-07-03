import { useCallback, useState } from "react";

export function useShareLink(shareUrl) {
  const [copied, setCopied] = useState(false);

  const copyShareLink = useCallback(async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [shareUrl]);

  return { copied, copyShareLink };
}
