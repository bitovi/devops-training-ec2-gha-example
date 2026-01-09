"use client";

import { MantineProvider } from "@mantine/core";
import { emotionTransform, MantineEmotionProvider } from "@mantine/emotion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import * as Sentry from "@sentry/react";

import Layout from "./components/Layout";
import LayoutNoLogin from "./components/LayoutNoLogin";

import Login from "./scenes/Login";
import Shop from "./scenes/Shop";
import Account from "./scenes/Account";
import Item from "./scenes/Item";
import About from "./scenes/About";
import Contact from "./scenes/Contact";
import Welcome from "./scenes/Welcome";
import Checkout from "./scenes/Checkout";
import Exercises from "./scenes/Exercises";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Sentry.ErrorBoundary fallback={<div>An error has occurred</div>}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider stylesTransform={emotionTransform}>
          <MantineEmotionProvider>
            <Notifications />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/workshop" element={<LayoutNoLogin />}>
                  <Route index path="*" element={<Exercises />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/shop" element={<Layout />}>
                  <Route index element={<Shop />} />
                  <Route path=":category?" element={<Shop />} />
                  <Route path="item/:productId" element={<Item />} />
                </Route>
                <Route path="/order" element={<Layout />}>
                  <Route index path="*" element={<Checkout />} />
                </Route>
                <Route path="/about" element={<Layout />}>
                  <Route index element={<About />} />
                </Route>
                <Route path="/contact" element={<Layout />}>
                  <Route index element={<Contact />} />
                </Route>
                <Route path="/account" element={<Layout />}>
                  <Route index element={<Account />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </MantineEmotionProvider>
        </MantineProvider>
      </QueryClientProvider>
    </Sentry.ErrorBoundary>
  );
};

export default App;
