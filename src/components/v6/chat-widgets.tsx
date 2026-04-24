"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import {
  DEFAULT_WIDGET_SETTINGS,
  fetchWidgetSettings,
  shouldShowWidget,
  type WidgetSettings,
} from "@/lib/widget-settings";

export function ChatWidgets() {
  const [settings, setSettings] = useState<WidgetSettings | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchWidgetSettings().then(s => {
      if (!cancelled) setSettings(s);
    });
    return () => { cancelled = true; };
  }, []);

  const effective = settings ?? DEFAULT_WIDGET_SETTINGS;
  const showChat = shouldShowWidget(effective.chat, effective);

  return showChat ? (
    <Script
      src="https://buildmyagent.io/widget/695bd22f35932d4b85fe954c/widget-professional.js?widgetId=695bd22f35932d4b85fe954c"
      strategy="lazyOnload"
    />
  ) : null;
}
