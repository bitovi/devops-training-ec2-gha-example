import type { FC } from "react";

import { Container, Grid, Stack, Skeleton, Divider } from "@mantine/core";

const CatalogItemSkeleton: FC = () => {
  return (
    <Container pt="lg">
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Stack gap="md">
            <Skeleton h={500} w="100%" />
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Stack gap="md" px="md">
            <Skeleton h={295} w="100%" />
            <Divider my="lg" />
            <Skeleton h={245} w="100%" />
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default CatalogItemSkeleton;
