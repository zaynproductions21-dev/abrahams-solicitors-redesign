"use client";

import { useRef, useState } from "react";

export function useSpamGuard() {
  const [honeypot, setHoneypot] = useState("");
  const loadedAt = useRef(Date.now());

  return {
    honeypot,
    setHoneypot,
    loadedAt: loadedAt.current,
    payload: () => ({ _hp: honeypot, _t: loadedAt.current }),
  };
}
