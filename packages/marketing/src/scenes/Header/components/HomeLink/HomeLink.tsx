import type { FC } from "react";
import { Text, Group } from "@mantine/core";
import { IconBuildingStore } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const HomeLink: FC = () => {
  return (
    <Group>
      <IconBuildingStore color="white" />
      <Link to="/shop" style={{ textDecoration: "none" }}>
        <Text size="lg" c="white">
          Acme Store
        </Text>
      </Link>
    </Group>
  );
};

export default HomeLink;
