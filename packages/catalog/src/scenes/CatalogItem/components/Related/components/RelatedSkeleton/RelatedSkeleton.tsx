import type { FC } from "react";

import { Group, Text, Card, Stack, Skeleton, Flex } from "@mantine/core";

const RelatedSkeleton: FC = () => {
  return (
    <Stack>
      <Text size="lg" fw={700}>
        Related Products
      </Text>
      <Group gap="md">
        {[...Array(3)].map((_, index) => (
          <Card key={index} shadow="sm" h={200} w={150}>
            <Stack gap="sm">
              <Skeleton h={125} w="100%" />
              <Skeleton h={10} w="100%" />
              <Skeleton h={10} w="100%" />
            </Stack>
          </Card>
        ))}
      </Group>
    </Stack>
  );
};

export default RelatedSkeleton;
