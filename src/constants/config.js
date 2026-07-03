export const NOHA_EMAIL = import.meta.env.VITE_NOHA_EMAIL || "nohaelsheweikh@gmail.com";
export const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "";

export const isEmailConfigured = () => Boolean(WEB3FORMS_ACCESS_KEY);
