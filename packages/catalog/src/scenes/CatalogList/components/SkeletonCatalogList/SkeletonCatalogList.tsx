import { Card, Skeleton, Flex } from "@mantine/core";

const SkeletonCard = () => (
  <Card shadow="sm" p="sm" h={350} w={225}>
    <Flex direction="column" justify="space-between" gap="sm">
      <Skeleton height={200} />
      <Skeleton height={30} />
      <Skeleton height={30} />
      <Skeleton height={36} />
    </Flex>
  </Card>
);

const SkeletonList = () => {
  return (
    <Flex gap="md" direction="row" wrap="wrap" p="md">
      {[...Array(12)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </Flex>
  );
};

export default SkeletonList;
