import type { FC } from "react";

import { SetStateAction, useState } from "react";
import { Text, Stack } from "@mantine/core";

import Price from "./components/Price";

export interface FiltersProps {
  onPriceChange: (min: string, max: string) => void;
}

const Filters: FC<FiltersProps> = ({ onPriceChange }) => {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  function setAndDispatchMin(_min: SetStateAction<string>) {
    setMin(_min);
    onPriceChange(typeof _min === "function" ? _min(min) : _min, max);
  }
  function setAndDispatchMax(_max: SetStateAction<string>) {
    setMax(_max);
    onPriceChange(min, typeof _max === "function" ? _max(max) : _max);
  }

  return (
    <Stack gap="md">
      <Text size="xl" fw={700}>
        Filters
      </Text>
      <Price
        min={min}
        max={max}
        setMin={setAndDispatchMin}
        setMax={setAndDispatchMax}
      />
    </Stack>
  );
};

export default Filters;
