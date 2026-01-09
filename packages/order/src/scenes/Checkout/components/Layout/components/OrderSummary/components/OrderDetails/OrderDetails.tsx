import type { FC } from "react";
import type { UserCart } from "@services/cart";

import { Flex, Container, Divider, Title, Text } from "@mantine/core";

import CartSummary from "@components/CartSummary";
import { toCurrency } from "@utilities/currency";

interface OrderDetailsProps {
  cart: UserCart;
}

const OrderDetails: FC<OrderDetailsProps> = ({ cart }) => {
  return (
    <Container component="section">
      <Title order={2}>Order Summary</Title>
      <CartSummary products={cart.products} />
      <Divider />
      <Flex mt="sm" justify="space-between">
        <Text>Subtotal</Text>
        <Text>{toCurrency(cart.subTotal)}</Text>
      </Flex>
      <Flex mt="sm" justify="space-between">
        <Text>Taxes</Text>
        <Text>{toCurrency(cart.tax)}</Text>
      </Flex>
      <Flex mt="sm" justify="space-between">
        <Text>Total</Text>
        <Text fw={700}>{toCurrency(cart.total)}</Text>
      </Flex>
    </Container>
  );
};

export default OrderDetails;
