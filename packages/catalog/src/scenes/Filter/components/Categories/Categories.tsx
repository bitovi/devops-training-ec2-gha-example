import type { FC } from "react";

import { Text, Stack, NavLink } from "@mantine/core";
import { Link as RouterLink } from "react-router-dom";

const categories = [
  ["/shop/men%27s%20clothing", "Men's Clothing"],
  ["/shop/women%27s%20clothing", "Women's Clothing"],
  ["/shop/electronics", "Electronics"],
  ["/shop/jewelry", "Jewelry"],
];

const Link: FC<{ to: string; text: string }> = ({ to, text }) => {
  return (
    <RouterLink to={to} style={{ textDecoration: "none" }}>
      <Text size="lg" c="dark">
        {text}
      </Text>
    </RouterLink>
  );
};

const Categories: FC = () => {
  return (
    <Stack gap="xs" align="flex-start">
      <Text size="xl" fw={700}>
        Categories
      </Text>
      {categories.map((category) => (
        <NavLink
          key={category[0]}
          to={category[0]}
          component={Link}
          text={category[1]}
          p="xs"
        />
      ))}
    </Stack>
  );
};

export default Categories;
