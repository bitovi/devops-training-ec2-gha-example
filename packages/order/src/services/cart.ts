import type { Order } from "shared-types";

interface BaseCart {
  id: number;
  userId: number;
}

interface CartService extends BaseCart {
  products: Array<{ productId: number; quantity: number }>;
}

type Product = Order.CatalogItem & { quantity: number };

export interface UserCart extends BaseCart {
  tax: number;
  subTotal: number;
  total: number;
  products: Array<Product>;
}

const getProducts = async () => {
  const products = await fetch(`https://fakestoreapi.com/products`).then(
    (result) => result.json()
  );

  return products as Array<Order.CatalogItem>;
};

const getCart = async (id: number) => {
  const cart = await fetch(`https://fakestoreapi.com/carts/${id}`).then(
    (result) => result.json()
  );

  return cart as CartService;
};

export const getUserCart = async (id?: number) => {
  if (id) {
    return fetchCart(id);
  }

  const local = localStorage.getItem("user-cart");

  if (!local) {
    throw new Error("Cart not found");
  }

  return JSON.parse(local) as UserCart;
};

export const fetchCart = async (id: number): Promise<UserCart> => {
  const products = await getProducts();
  const cart = await getCart(id);

  const userProducts = cart.products.map((cartProduct) => {
    const product = products.find(
      (fullProduct) => fullProduct.id === cartProduct.productId
    );

    if (!product) {
      throw new Error();
    }

    return {
      ...product,
      quantity: cartProduct.quantity,
    };
  });

  return {
    ...cart,
    products: userProducts,
    ...getTotals(userProducts),
  };
};

export const getTotals = (products: UserCart["products"]) => {
  const subTotal = products.reduce(
    (runningSubTotal, product) =>
      product.price * product.quantity + runningSubTotal,
    0
  );

  const taxPercent = 0.0725;
  const tax = subTotal * taxPercent;

  return {
    tax,
    subTotal,
    total: subTotal + tax,
  };
};

export const newCart: UserCart = {
  userId: Math.random(),
  id: Math.random(),
  products: [],
  subTotal: 0,
  tax: 0,
  total: 0,
};

export const cartKey = "user-cart";
