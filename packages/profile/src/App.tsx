import type { FC } from "react";

import { Button, MantineProvider, Menu } from "@mantine/core";
import { emotionTransform, MantineEmotionProvider } from "@mantine/emotion";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Account from "./scenes/Account";
import Login from "./scenes/Login";

import "@mantine/core/styles.css";

const App = () => {
  return (
    <MantineProvider stylesTransform={emotionTransform}>
      <MantineEmotionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/account" element={<Account />} />
          </Routes>
          <RemoteLinks />
        </BrowserRouter>
      </MantineEmotionProvider>
    </MantineProvider>
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
        <Menu.Item component={Link} to="/account">
          Account
        </Menu.Item>
        <Menu.Item component={Link} to="/">
          Login
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
