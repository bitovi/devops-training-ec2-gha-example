import type { FC } from "react";

import { Anchor, Text, Timeline } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconStretching } from "@tabler/icons-react";
import { ExerciseData } from "../../shared/type";

interface ExerciseListItemProps extends ExerciseData {
  active: number;
  position: number;
}

const ExerciseListItem: FC<ExerciseListItemProps> = ({
  active,
  to,
  position,
  title,
  subTitle,
  icon: _icon,
}) => {
  const color = position === 0 ? "white" : active < position ? "dark" : "white";
  const icon = _icon || <IconStretching size={18} />;

  return (
    <Timeline.Item
      __active={position <= active}
      __lineActive={position < active}
      lineVariant={position < active ? "solid" : "dashed"}
      bullet={
        <Anchor component={Link} to={to} c={color}>
          {icon}
        </Anchor>
      }
      title={
        <Text component={Link} to={to} fw={500} sx={{ lineHeight: "16px" }}>
          {title}
        </Text>
      }
    >
      <Text component={Link} to={to} c="dimmed" size="sm">
        {subTitle}
      </Text>
    </Timeline.Item>
  );
};
export default ExerciseListItem;
