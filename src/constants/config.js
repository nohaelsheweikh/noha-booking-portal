export const NOHA_EMAIL = import.meta.env.VITE_NOHA_EMAIL || "nohaelsheweikh@gmail.com";
export const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "";

export const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
export const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";
export const EMAILJS_TEMPLATE_GUEST = import.meta.env.VITE_EMAILJS_TEMPLATE_GUEST || "";
export const EMAILJS_TEMPLATE_HOST = import.meta.env.VITE_EMAILJS_TEMPLATE_HOST || "";

export const isHostEmailConfigured = () => Boolean(WEB3FORMS_ACCESS_KEY);
export const isGuestEmailConfigured = () =>
  Boolean(EMAILJS_SERVICE_ID && EMAILJS_PUBLIC_KEY && EMAILJS_TEMPLATE_GUEST);
export const isEmailConfigured = () => isHostEmailConfigured() || isGuestEmailConfigured();
