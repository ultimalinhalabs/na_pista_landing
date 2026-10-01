/**
 * Landing-page analytics. Provider-agnostic: every event goes to
 * `window.dataLayer` (read by Google Tag Manager / GA4 when configured) and,
 * when GA4 is loaded, to `gtag`. With nothing configured, events are inert.
 *
 * Parameters describe the interaction only — never personal data, never
 * anything typed by the visitor, never a URL query string.
 */
export const EVENTS = {
  HERO_CTA: "np_hero_cta_click",
  CONSOLE_LOGIN: "np_console_login_click",
  START_CTA: "np_start_cta_click",
  API_INTERACTION: "np_api_interaction",
  MODULE_INTERACTION: "np_module_interaction",
  CONTACT_CTA: "np_contact_cta_click",
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];
export type EventParams = Record<string, string>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: EventName, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event, ...params });
    window.gtag?.("event", event, params);
  } catch {
    // Analytics must never break the page.
  }
}
