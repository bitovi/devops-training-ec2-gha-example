import {
  IconBrandDiscord,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";

import { ActionIcon, rem, Group } from "@mantine/core";

const Socials = () => {
  return (
    <Group gap={0} justify="flex-end" wrap="nowrap">
      <ActionIcon
        component="a"
        href="https://twitter.com/bitovi"
        size="lg"
        color="gray"
        variant="subtle"
      >
        <IconBrandTwitter
          style={{ width: rem(18), height: rem(18) }}
          stroke={1.5}
        />
      </ActionIcon>
      <ActionIcon
        component="a"
        href="https://www.youtube.com/@Bitovi"
        size="lg"
        color="gray"
        variant="subtle"
      >
        <IconBrandYoutube
          style={{ width: rem(18), height: rem(18) }}
          stroke={1.5}
        />
      </ActionIcon>
      <ActionIcon size="lg" color="gray" variant="subtle">
        <IconBrandDiscord
          style={{ width: rem(18), height: rem(18) }}
          stroke={1.5}
        />
      </ActionIcon>
    </Group>
  );
};

export default Socials;
