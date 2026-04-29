"use client";
import { useEffect } from "react";
import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";

export default function OptimizedAnalytics() {
  useEffect(() => {
    // This hook waits for the browser to be idle before loading analytics
    const idleCallback =
      window.requestIdleCallback ||
      ((cb: IdleRequestCallback) => {
        const start = Date.now();
        return setTimeout(
          () =>
            cb({
              didTimeout: false,
              timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
            }),
          200,
        ) as unknown as number;
      });

    idleCallback(() => {
      inject();
      injectSpeedInsights();
    });
  }, []);

  return null;
}
