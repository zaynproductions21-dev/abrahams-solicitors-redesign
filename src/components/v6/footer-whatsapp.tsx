"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import {
  DEFAULT_WIDGET_SETTINGS,
  fetchWidgetSettings,
  shouldShowWidget,
  type WidgetSettings,
} from "@/lib/widget-settings";

export function FooterWhatsApp() {
  const [settings, setSettings] = useState<WidgetSettings | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchWidgetSettings().then(s => { if (!cancelled) setSettings(s); });
    return () => { cancelled = true; };
  }, []);

  const effective = settings ?? DEFAULT_WIDGET_SETTINGS;
  if (!shouldShowWidget(effective.whatsapp, effective)) return null;

  return (
    <a
      href="https://wa.me/442034880512?text=Hi%2C%20I%27d%20like%20to%20discuss%20my%20case%20with%20a%20solicitor."
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ea856] text-white rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors shadow-sm"
    >
      <MessageCircle className="h-4 w-4 fill-white" />
      WhatsApp Us
    </a>
  );
}
