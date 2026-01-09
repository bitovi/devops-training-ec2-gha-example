import type { FC } from "react";

export namespace Catalog {
  export type Search = FC;
  export type Filter = FC;
  export type List = FC;
  export type Item = FC;

  export interface FilterPriceEvent {
    min: string;
    max: string;
  }
}

interface CatalogEventMap {
  "catalog-filter-price": CustomEvent<Catalog.FilterPriceEvent>;
}

declare global {
  interface Window {
    addEventListener<K extends keyof CatalogEventMap>(
      type: K,
      listener: (this: Window, ev: CatalogEventMap[K]) => void
    ): void;
    removeEventListener<K extends keyof CatalogEventMap>(
      type: K,
      listener: (this: Window, ev: CatalogEventMap[K]) => void
    ): void;
    dispatchEvent<K extends keyof CatalogEventMap>(
      ev: CatalogEventMap[K]
    ): void;
  }
}
