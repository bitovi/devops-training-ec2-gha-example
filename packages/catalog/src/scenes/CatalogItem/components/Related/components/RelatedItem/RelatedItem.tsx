import type { FC } from "react";
import type { CatalogItem } from "@services/shared/types";

import { Text, Card, Stack, Tooltip, Image } from "@mantine/core";
import { Link } from "react-router-dom";

interface RelatedItemProps {
  product: CatalogItem;
}

const RelatedItem: FC<RelatedItemProps> = ({ product }) => {
  return (
    <Card
      component={Link}
      to={`/shop/item/${product.id}`}
      shadow="sm"
      p={0}
      h={200}
      w={150}
    >
      <Stack gap="sm">
        <Image
          src={product.imgSrc}
          alt={product.name}
          height={100}
          width={125}
          fit="scale-down"
        />
        <Stack gap="sm" px="md">
          <Tooltip label={product.name}>
            <Text
              size="sm"
              fw={700}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {product.name}
            </Text>
          </Tooltip>
          <Text
            size="sm"
            c="dark"
            sx={{
              // ellipsis after 2 lines
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 2,
              lineClamp: 2,
            }}
          >
            {product.description}
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
};

export default RelatedItem;
