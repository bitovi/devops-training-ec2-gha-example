import type { FC } from "react";
import type { UserCart } from "../../services/cart";

import { Flex, Container, Text, Box, Image } from "@mantine/core";
import { toCurrency } from "../../utilities/currency";

interface CartSummaryProps {
  products: UserCart["products"];
}

const CartSummary: FC<CartSummaryProps> = ({ products }) => {
  return (
    <Container>
      {products.map((product) => {
        return (
          <Flex
            h={85}
            key={product.id}
            mt="sm"
            justify="space-between"
            align="center"
          >
            <Flex align="center">
              <Image
                radius="md"
                mr="md"
                sx={{ height: "50px", aspectRatio: 1, objectFit: "cover" }}
                src={product.image}
              />
              <Box>
                <Text>{product.title}</Text>
                <Text>Quantity: {product.quantity}</Text>
              </Box>
            </Flex>
            <Text>{toCurrency(product.price)}</Text>
          </Flex>
        );
      })}
    </Container>
  );
};

export default CartSummary;
