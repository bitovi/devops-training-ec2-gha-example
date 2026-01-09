import type { FC } from "react";

import { Image, Stack } from "@mantine/core";

const Images: FC<{ imgSrc: string; name: string }> = ({ imgSrc, name }) => {
  return (
    <Stack align="center">
      <Image
        src={imgSrc}
        alt={name}
        h={500}
        w={300}
        mah={500}
        maw={300}
        fit="scale-down"
      />
    </Stack>
  );
};

export default Images;
