"use client";

import Script from "next/script";
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      render: (
        container: HTMLElement,
        opts: {
          sitekey: string;
          theme?: "light" | "dark";
          size?: "normal" | "compact" | "invisible";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
        }
      ) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
  }
}

const SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
  "6LfKe8QsAAAAAKkmx7bR5RI4GOQWpjIHDLg48usz";

export type ReCaptchaHandle = {
  getToken: () => string;
  reset: () => void;
};

export const ReCaptcha = forwardRef<ReCaptchaHandle>(function ReCaptcha(_, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready || !containerRef.current || widgetIdRef.current !== null) return;
    const gr = window.grecaptcha;
    if (!gr) return;
    gr.ready(() => {
      if (!containerRef.current || widgetIdRef.current !== null) return;
      widgetIdRef.current = gr.render(containerRef.current, {
        sitekey: SITE_KEY,
        theme: "light",
      });
    });
  }, [ready]);

  useImperativeHandle(ref, () => ({
    getToken: () => {
      if (!window.grecaptcha || widgetIdRef.current === null) return "";
      return window.grecaptcha.getResponse(widgetIdRef.current);
    },
    reset: () => {
      if (!window.grecaptcha || widgetIdRef.current === null) return;
      window.grecaptcha.reset(widgetIdRef.current);
    },
  }));

  return (
    <>
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
      />
      <div ref={containerRef} className="inline-block" />
    </>
  );
});
