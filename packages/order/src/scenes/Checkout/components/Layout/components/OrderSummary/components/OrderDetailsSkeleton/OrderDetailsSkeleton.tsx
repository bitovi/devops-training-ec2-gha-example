import type { FC } from "react";

import { Flex, Container, Divider, Title, Skeleton } from "@mantine/core";

const OrderDetailsSkeleton: FC = () => {
  return (
    <Container component="section">
      <Title order={2}>Order Summary</Title>
      {[...Array.from({ length: 3 }).keys()].map((key) => {
        return <Skeleton key={key} mt="md" height={85} />;
      })}
      <Divider />
      <Flex mt="sm" justify="space-between">
        <Skeleton height={25} />
        <Skeleton height={25} />
      </Flex>
      <Flex mt="sm" justify="space-between">
        <Skeleton height={25} />
        <Skeleton height={25} />
      </Flex>
      <Flex mt="sm" justify="space-between">
        <Skeleton height={25} />
        <Skeleton height={25} />
      </Flex>
    </Container>
  );
};

export default OrderDetailsSkeleton;
