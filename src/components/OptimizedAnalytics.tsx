"use client";
import { useEffect } from "react";

// ✅ Lazy load the heavy Vercel libs only when browser is idle
const loadAnalytics = () => Promise.all([
  import("@vercel/analytics").then(m => m.inject),
  import("@vercel/speed-insights").then(m => m.injectSpeedInsights),
]);

export default function OptimizedAnalytics() {
  useEffect(() => {
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
      // ✅ Dynamic import happens here — zero bundle cost on initial load
      loadAnalytics().then(([inject, injectSpeedInsights]) => {
        inject();
        injectSpeedInsights();
      });
    });
  }, []);

  return null;
}