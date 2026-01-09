import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/code-highlight/styles.css";
import "./reset.css";

import "./sentry";

const root = ReactDOM.createRoot(
  document.getElementById("root")! as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
