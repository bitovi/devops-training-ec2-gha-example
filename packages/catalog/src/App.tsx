import type { FC } from "react";

import { Button, MantineProvider, Menu } from "@mantine/core";
import { emotionTransform, MantineEmotionProvider } from "@mantine/emotion";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import CatalogItem from "./scenes/CatalogItem";
import CatalogList from "./scenes/CatalogList";
import Filter from "./scenes/Filter";

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider stylesTransform={emotionTransform}>
        <MantineEmotionProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Filter />} />
              <Route
                path="/catalog-list/:category?"
                element={<CatalogList />}
              />
              <Route
                path="/catalog-item/:productId"
                element={<CatalogItem />}
              />
            </Routes>
            <RemoteLinks />
          </BrowserRouter>
        </MantineEmotionProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;

const RemoteLinks: FC = () => {
  return (
    <Menu>
      <Menu.Target>
        <Button sx={{ position: "absolute", right: "32px", bottom: "32px" }}>
          Other Remotes
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item component={Link} to="/">
          Filter
        </Menu.Item>
        <Menu.Item component={Link} to="/catalog-list">
          Catalog List
        </Menu.Item>
        <Menu.Item component={Link} to="/catalog-item/1">
          Catalog List Item
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
