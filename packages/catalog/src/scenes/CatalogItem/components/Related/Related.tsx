import type { FC } from "react";

import { Group, Text, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import { fetchRelated } from "@services/related";

import RelatedSkeleton from "./components/RelatedSkeleton";
import RelatedError from "./components/RelatedError";
import RelatedItem from "./components/RelatedItem";

const Related: FC<{ category: string }> = ({ category }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["related", category],
    queryFn: () => fetchRelated(category),
    enabled: !!category,
  });

  if (isLoading) {
    return <RelatedSkeleton />;
  }

  if (isError || !data) {
    return <RelatedError />;
  }

  return (
    <Stack>
      <Text size="lg" fw={700}>
        Related Products
      </Text>
      <Group gap="md">
        {data?.map((product) => (
          <RelatedItem key={product.id} product={product} />
        ))}
      </Group>
    </Stack>
  );
};

export default Related;
