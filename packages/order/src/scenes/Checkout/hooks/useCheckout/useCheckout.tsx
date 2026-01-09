import type { UserCart } from "@services/cart";

import { useLocalStorage } from "@mantine/hooks";
import { cartKey, newCart } from "@services/cart";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { rem } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const useCheckout = (homePath?: string) => {
  const [, setCart] = useLocalStorage<UserCart>({ key: cartKey });
  const navigate = useNavigate();

  const checkout = () => {
    setCart(newCart);

    notifications.show({
      title: "Purchase Complete",
      message: `Your items are on the way!`,
      icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
    });

    navigate(homePath ?? "/shop");
  };

  const navigateToCheckout = () => {
    navigate("checkout");
  };

  return {
    checkout,
    navigateToCheckout,
  };
};
