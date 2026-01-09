import type { FC } from "react";

export namespace Order {
  export type Cart = FC<{ checkoutUrl?: string }>;
  export type Checkout = FC<{ id?: number; homePath?: string }>;

  export interface AddToCartEvent {
    item: CatalogItem;
  }

  export interface CatalogItem {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  }
}

interface OrderEventMap {
  "add-to-cart": CustomEvent<Order.AddToCartEvent>;
}

declare global {
  interface Window {
    addEventListener<K extends keyof OrderEventMap>(
      type: K,
      listener: (this: Window, ev: OrderEventMap[K]) => void
    ): void;
    removeEventListener<K extends keyof OrderEventMap>(
      type: K,
      listener: (this: Window, ev: OrderEventMap[K]) => void
    ): void;
    dispatchEvent<K extends keyof OrderEventMap>(ev: OrderEventMap[K]): void;
  }
}
