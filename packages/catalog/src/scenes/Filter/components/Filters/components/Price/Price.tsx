import type { FC } from "react";

import { Group, Text, TextInput, Stack } from "@mantine/core";

const Price: FC<{
  min: string;
  max: string;
  setMin: React.Dispatch<React.SetStateAction<string>>;
  setMax: React.Dispatch<React.SetStateAction<string>>;
}> = ({ min, max, setMin, setMax }) => {
  return (
    <Stack gap="xs">
      <Text size="lg" c="dark">
        Price
      </Text>
      <Group>
        <TextInput
          placeholder="Min"
          type="number"
          maw="100"
          value={min}
          onChange={(e) => setMin(e.currentTarget.value)}
        />
        -
        <TextInput
          placeholder="Max"
          type="number"
          maw="100"
          value={max}
          onChange={(e) => setMax(e.currentTarget.value)}
        />
      </Group>
    </Stack>
  );
};

export default Price;
