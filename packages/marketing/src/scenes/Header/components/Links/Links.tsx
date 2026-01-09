import type { FC } from "react";
import { Text, Group, NavLink } from "@mantine/core";
import { Link as RouterLink } from "react-router-dom";

const Link: FC<{ to: string; text: string }> = ({ to, text }) => {
  return (
    <RouterLink to={to} style={{ textDecoration: "none" }}>
      <Text size="lg" fw={500} c="white">
        {text}
      </Text>
    </RouterLink>
  );
};

const Links: FC = () => {
  return (
    <Group>
      <NavLink to="/" component={Link} text="Home" />
      <NavLink to="/shop" component={Link} text="Shop" />
      <NavLink to="/about" component={Link} text="About" />
      <NavLink to="/contact" component={Link} text="Contact" />
    </Group>
  );
};

export default Links;
