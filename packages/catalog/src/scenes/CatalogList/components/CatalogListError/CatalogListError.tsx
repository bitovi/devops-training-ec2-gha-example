import type { FC } from "react";

import { Flex, Text } from "@mantine/core";

const CatalogListError: FC = () => {
  return (
    <Flex p="md">
      <Text c="red" fw="bold">
        Error fetching data. Please try again later.
      </Text>
    </Flex>
  );
};

export default CatalogListError;
