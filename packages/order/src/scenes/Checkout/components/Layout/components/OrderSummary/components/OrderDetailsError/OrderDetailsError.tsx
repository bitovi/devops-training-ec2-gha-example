import type { FC } from "react";

import { Title, Text, Flex } from "@mantine/core";

interface OrderDetailsErrorProps {
  message?: string;
}

const OrderDetailsError: FC<OrderDetailsErrorProps> = ({ message }) => {
  return (
    <Flex h={300} direction="column" align="center" justify="center">
      <Title order={2} c="red">
        Oops! Something went wrong!
      </Title>
      <Text mt="md" fw={700}>
        {message || "Could not get order details."}
      </Text>
    </Flex>
  );
};

export default OrderDetailsError;
