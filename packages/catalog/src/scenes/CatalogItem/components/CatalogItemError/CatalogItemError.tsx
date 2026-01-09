import type { FC } from "react";

import { Flex, Text } from "@mantine/core";

const CatalogItemError: FC = () => {
  return (
    <Flex p="md">
      <Text c="red" fw="bold">
        Error fetching product.
      </Text>
    </Flex>
  );
};

export default CatalogItemError;
