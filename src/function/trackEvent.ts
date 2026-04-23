import { sendGTMEvent } from '@next/third-parties/google'

type EventParams = Record<string, any>;

/**
 * Track a Google Analytics event.
 * Call directly from any client component.
 *
 * @example
 * trackEvent("recipe_like", { item_id: "abc123", action: "like" });
 * trackEvent("blog_view", { blog_name: "Healthy Eating" });
 * trackEvent("recipe_search", { search_term: "pasta", category: "vegan" });
 * trackEvent("bookmark_add", { item_id: "xyz789", type: "recipe" });
 */
export default function trackEvent(
  eventName: string,
  params?: EventParams
) {
  sendGTMEvent({ event: eventName, ...params });
}
