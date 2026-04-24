"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { MessageCircle } from "lucide-react";
import {
  DEFAULT_WIDGET_SETTINGS,
  fetchWidgetSettings,
  shouldShowWidget,
  type WidgetSettings,
} from "@/lib/widget-settings";

function WhatsAppBubble() {
  return (
    <a
      href="https://wa.me/442034880512?text=Hi%2C%20I%27d%20like%20to%20discuss%20my%20case%20with%20a%20solicitor."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 pl-4 pr-5 py-3 group"
    >
      <MessageCircle className="h-5 w-5 fill-white" />
      <span className="text-sm font-semibold hidden sm:inline">WhatsApp Us</span>
    </a>
  );
}

export function ChatWidgets() {
  const [settings, setSettings] = useState<WidgetSettings | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchWidgetSettings().then(s => {
      if (!cancelled) setSettings(s);
    });
    return () => { cancelled = true; };
  }, []);

  // Render defaults until settings load so widgets appear for first-paint users.
  const effective = settings ?? DEFAULT_WIDGET_SETTINGS;
  const showWhatsApp = shouldShowWidget(effective.whatsapp, effective);
  const showChat = shouldShowWidget(effective.chat, effective);

  return (
    <>
      {showWhatsApp && <WhatsAppBubble />}
      {showChat && (
        <Script
          src="https://buildmyagent.io/widget/695bd22f35932d4b85fe954c/widget-professional.js?widgetId=695bd22f35932d4b85fe954c"
          strategy="lazyOnload"
        />
      )}
    </>
  );
}
