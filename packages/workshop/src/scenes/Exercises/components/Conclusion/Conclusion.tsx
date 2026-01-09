import type { FC } from "react";

import { Text } from "@mantine/core";

import ExerciseLayout from "../../shared/components/ExerciseLayout";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

const Conclusion: FC = () => {
  return (
    <ExerciseLayout title="Conclusion">
      <Fireworks autorun={{ duration: 1_000, speed: 3 }} />
      <Text>
        Thank you for participating in this workshop on Enterprise-Grade
        Micro-Frontends! We hope you found it valuable and now better understand
        how to create and compose micro-frontends using modern tools and
        techniques.
      </Text>
      <Text mt="md">
        We covered various topics and exercises, including setting up your
        development environment, configuring Module Federation, using path
        parameters for MFE communication, and more. Each exercise was designed
        to provide hands-on experience and practical knowledge that you can
        apply to your projects.
      </Text>
      <Text mt="md">
        If you have any questions or need further assistance, don’t hesitate to
        contact us. Many knowledgeable developers are ready to help in Bitov's
        Discord.
      </Text>
      <Text mt="md">
        Thank you again for your participation, and we look forward to seeing
        the innovative micro-frontends you create!
      </Text>
      <Text>Happy coding!</Text>
    </ExerciseLayout>
  );
};

export default Conclusion;
