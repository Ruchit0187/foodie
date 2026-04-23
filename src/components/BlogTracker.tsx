"use client";

import { useEffect } from "react";
import trackEvent from "../function/trackEvent";

interface BlogTrackerProps {
  blogData: any;
}

export default function BlogTracker({ blogData }: BlogTrackerProps) {
  useEffect(() => {
    trackEvent("blog_view", {
      ...blogData,
    });
  }, [blogData]);

  return null;
}
