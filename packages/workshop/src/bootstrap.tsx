import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import {
  init,
  browserTracingIntegration,
  replayIntegration,
} from "@sentry/react";

import "./reset.css";

init({
  dsn: process.env.SENTRY_DSN_WORKSHOP,
  integrations: [browserTracingIntegration(), replayIntegration()],
  tracesSampleRate: 1.0,
  tracePropagationTargets: [
    "localhost",
    /^https:\/\/*-mfe\.bitovi-sandbox\.com/,
  ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

const rootEl = document.getElementById("root");

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
