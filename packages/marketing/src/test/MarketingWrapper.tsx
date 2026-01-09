import type { FC, ReactNode } from "react";

import { MantineProvider } from "@mantine/core";

interface MarketingWrapper {
  children: ReactNode;
}

const MarketingWrapper: FC<MarketingWrapper> = ({ children }) => (
  <MantineProvider>{children}</MantineProvider>
);

export default MarketingWrapper;
