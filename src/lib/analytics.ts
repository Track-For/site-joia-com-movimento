export type CommerceEvent =
  | "view_item_list"
  | "select_item"
  | "view_item"
  | "add_to_wishlist"
  | "add_to_cart"
  | "remove_from_cart"
  | "view_cart"
  | "begin_checkout"
  | "search"
  | "view_promotion"
  | "select_promotion";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function track(event: CommerceEvent, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...payload });
}
