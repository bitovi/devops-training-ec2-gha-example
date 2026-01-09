import type { FC } from "react";

import { MantineProvider, Menu, Button } from "@mantine/core";
import { emotionTransform, MantineEmotionProvider } from "@mantine/emotion";
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";

import Header from "./scenes/Header";
import Footer from "./scenes/Footer";
import About from "./scenes/About";
import Contact from "./scenes/Contact";

const App: FC = () => {
  return (
    <MantineProvider stylesTransform={emotionTransform}>
      <MantineEmotionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header />} />
            <Route path="/header" element={<Header />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
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
        <Menu.Item component={Link} to="/">
          Header
        </Menu.Item>
        <Menu.Item component={Link} to="/footer">
          Footer
        </Menu.Item>
        <Menu.Item component={Link} to="/about">
          About
        </Menu.Item>
        <Menu.Item component={Link} to="/contact">
          Contact
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
