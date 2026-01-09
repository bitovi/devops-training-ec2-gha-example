import { Box, Image, Text } from "@mantine/core";

const Company = () => {
  return (
    <Box>
      <Image
        src="https://www.bitovi.com/hubfs/limbo-generated/imgs/logos/bitovi-logo-23.svg"
        sx={{ height: "25px", width: "auto", display: "inline" }}
      />
      <Text mt="md" w="400px" c="dimmed" size="xs">
        If you're looking for a collaborative, validation-driven team of experts
        who can help you swiftly deliver your next app, you've found us. How can
        we help?
      </Text>
    </Box>
  );
};

export default Company;
