import {
  init,
  makeFetchTransport,
  moduleMetadataIntegration,
  browserTracingIntegration,
  replayIntegration,
  makeMultiplexedTransport,
} from "@sentry/react";

const EXTRA_KEY = "ROUTE_TO";

const transport = makeMultiplexedTransport(makeFetchTransport, (args) => {
  const event = args.getEvent();
  if (
    event &&
    event.extra &&
    EXTRA_KEY in event.extra &&
    Array.isArray(event.extra[EXTRA_KEY])
  ) {
    return event.extra[EXTRA_KEY];
  }
  return [];
});

init({
  dsn: process.env.SENTRY_DSN_SHELL,
  integrations: [
    browserTracingIntegration(),
    replayIntegration(),
    moduleMetadataIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: [
    "localhost",
    /^https:\/\/*-mfe\.bitovi-sandbox\.com/,
  ],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  transport,
  beforeSend: (event) => {
    // @ts-expect-error todo: fix
    if (event?.exception?.values?.[0].stacktrace.frames) {
      const frames = event.exception.values[0].stacktrace.frames;
      // Find the last frame with module metadata containing a DSN
      const routeTo = frames
        .filter((frame) => frame.module_metadata && frame.module_metadata.dsn)
        .map((v) => v.module_metadata)
        .slice(-1); // using top frame only - you may want to customize this according to your needs

      if (routeTo.length) {
        event.extra = {
          ...event.extra,
          [EXTRA_KEY]: routeTo,
        };
      }
    }

    return event;
  },
});
