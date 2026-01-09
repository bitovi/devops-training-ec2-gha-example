import type { FC } from "react";

import { Group } from "@mantine/core";
import {
  IconStarFilled,
  IconStar,
  IconStarHalfFilled,
} from "@tabler/icons-react";

interface RatingProps {
  rate: number;
  count: number;
}

const Rating: FC<RatingProps> = ({ rate, count }) => {
  return (
    <Group gap="xs">
      {[...Array(5)].map((_, index) => {
        if (rate >= index + 1) {
          return <IconStarFilled key={index} />;
        }
        if (rate >= index + 0.5) {
          return <IconStarHalfFilled key={index} />;
        }
        return <IconStar key={index} />;
      })}
      {rate} ({count} reviews)
    </Group>
  );
};

export default Rating;
