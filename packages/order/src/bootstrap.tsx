import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  init,
  browserTracingIntegration,
  replayIntegration,
} from "@sentry/react";

init({
  dsn: process.env.SENTRY_DSN_ORDER,
  integrations: [browserTracingIntegration(), replayIntegration()],
  tracesSampleRate: 1.0,
  tracePropagationTargets: [
    "localhost",
    /^https:\/\/*-mfe\.bitovi-sandbox\.com/,
  ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
