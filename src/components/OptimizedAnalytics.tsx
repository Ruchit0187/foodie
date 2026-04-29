"use client";
import { useEffect } from "react";
import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";

export default function OptimizedAnalytics() {
  useEffect(() => {
    // This hook waits for the browser to be idle before loading analytics
    const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 2000));
    
    idleCallback(() => {
      inject();
      injectSpeedInsights();
    });
  }, []);

  return null;
}