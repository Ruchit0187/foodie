"use client";
import { useEffect } from "react";

export default function LazyGTM({ gtmId }: { gtmId: string }) {
  useEffect(() => {
    const load = () => {
      if ((window as any).__gtmLoaded) return;
      (window as any).__gtmLoaded = true;

      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
      script.async = true;
      document.head.appendChild(script);
    };

    // fires on first touch, click, or scroll
    ["click", "touchstart", "scroll"].forEach((e) =>
      window.addEventListener(e, load, { once: true })
    );

    // fallback — load after 5s even with no interaction
    const fallback = setTimeout(load, 5000);
    return () => {
      clearTimeout(fallback);
      ["click", "touchstart", "scroll"].forEach((e) =>
        window.removeEventListener(e, load, load as any)
      );
    };
  }, []);

  return null;
}