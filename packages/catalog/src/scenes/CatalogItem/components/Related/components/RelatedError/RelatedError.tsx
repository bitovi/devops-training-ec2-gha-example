import type { FC } from "react";

import { Text, Flex } from "@mantine/core";

const RelatedError: FC = () => {
  return (
    <Flex p="md">
      <Text c="red" fw="bold">
        Error fetching related products.
      </Text>
    </Flex>
  );
};

export default RelatedError;
