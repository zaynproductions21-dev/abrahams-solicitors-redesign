export type WidgetMode = "always" | "outside-hours" | "never";

export type WidgetSettings = {
  id?: string;
  whatsapp: WidgetMode;
  chat: WidgetMode;
  working_hours_start: string; // "09:00"
  working_hours_end: string;   // "17:00"
  working_days: number[];      // 0=Sun..6=Sat; default [1,2,3,4,5]
  timezone?: string;           // informational, we evaluate in the user's browser
};

export const DEFAULT_WIDGET_SETTINGS: WidgetSettings = {
  whatsapp: "always",
  chat: "always",
  working_hours_start: "09:00",
  working_hours_end: "17:00",
  working_days: [1, 2, 3, 4, 5],
};

export async function fetchWidgetSettings(): Promise<WidgetSettings> {
  try {
    const res = await fetch(
      "https://publishos-eosin.vercel.app/api/db/abrahams_widget_settings",
      { cache: "no-store" }
    );
    if (!res.ok) return DEFAULT_WIDGET_SETTINGS;
    const data = await res.json();
    const first = Array.isArray(data) ? data[0] : null;
    if (!first) return DEFAULT_WIDGET_SETTINGS;
    return { ...DEFAULT_WIDGET_SETTINGS, ...first };
  } catch {
    return DEFAULT_WIDGET_SETTINGS;
  }
}

function parseHHMM(s: string): number {
  const [h, m] = s.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

export function isInsideWorkingHours(s: WidgetSettings, now: Date = new Date()): boolean {
  const day = now.getDay();
  if (!s.working_days.includes(day)) return false;
  const minutes = now.getHours() * 60 + now.getMinutes();
  return minutes >= parseHHMM(s.working_hours_start) && minutes < parseHHMM(s.working_hours_end);
}

export function shouldShowWidget(mode: WidgetMode, s: WidgetSettings, now: Date = new Date()): boolean {
  if (mode === "always") return true;
  if (mode === "never") return false;
  return !isInsideWorkingHours(s, now);
}
