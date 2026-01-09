import type { Order } from "shared-types";
import type { UserCart } from "@services/cart";

export const itemInCart = (
  cart: UserCart,
  item: Order.CatalogItem
): boolean => {
  return cart.products.some(({ id }) => id === item.id);
};

export const increaseQuantity = (
  products: UserCart["products"],
  itemId: Order.CatalogItem["id"],
  by: number = 1
): UserCart["products"] => {
  return products.map((product) => {
    if (product.id === itemId) {
      return { ...product, quantity: product.quantity + by };
    }

    return product;
  });
};

export const addToProducts = (
  products: UserCart["products"],
  item: Order.CatalogItem
): UserCart["products"] => {
  return [...structuredClone(products), { ...item, quantity: 1 }];
};
