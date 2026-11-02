import { PRIVACY_VERSION } from "./privacy";
export const PREFERENCE_KEY = "fabrica-privacy-preferences";
export const PREFERENCE_MAX_AGE = 180 * 24 * 60 * 60 * 1000;
export type PrivacyChoice = { version: string; analytics: boolean; savedAt: number };
export function parsePrivacyChoice(raw: string | null, now = Date.now()): PrivacyChoice | null {
  try {
    const value = JSON.parse(raw || "null");
    return value && value.version === PRIVACY_VERSION && typeof value.analytics === "boolean" &&
      Number.isFinite(value.savedAt) && value.savedAt <= now && now - value.savedAt < PREFERENCE_MAX_AGE
      ? { version: value.version, analytics: value.analytics, savedAt: value.savedAt } : null;
  } catch { return null; }
}
