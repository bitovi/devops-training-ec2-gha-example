import type { FC, ReactNode } from "react";

import { Text, Flex, Card } from "@mantine/core";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

import { Link } from "react-router-dom";

interface ChangeExerciseProps {
  path: string;
  variant: "next" | "previous";
}

const titles: Record<ChangeExerciseProps["variant"], string> = {
  next: "Next",
  previous: "Previous",
};

const icons: Record<ChangeExerciseProps["variant"], ReactNode> = {
  next: <IconArrowRight />,
  previous: <IconArrowLeft />,
};

const ChangeExercise: FC<ChangeExerciseProps> = ({ path, variant }) => {
  return (
    <Card component={Link} to={path} withBorder flex={1}>
      <Flex
        justify="space-between"
        direction={variant === "next" ? "row" : "row-reverse"}
      >
        <Text>{titles[variant]}</Text>
        {icons[variant]}
      </Flex>
    </Card>
  );
};

export default ChangeExercise;
