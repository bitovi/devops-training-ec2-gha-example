import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { sentryWebpackPlugin } from "@sentry/webpack-plugin";

export default defineConfig({
  output: {
    sourceMap: {
      js: "source-map",
    },
  },
  plugins: [pluginReact()],
  html: {
    favicon: "./src/assets/favicon.png",
    title: "Workshop Remotes",
    tags: [
      {
        tag: "base",
        attrs: { href: "/" },
        append: false,
      },
      {
        tag: "meta",
        attrs: {
          property: "og:title",
          content: "Enterprise Grade Micro Frontends",
        },
      },
      {
        tag: "meta",
        attrs: {
          property: "og:description",
          content:
            "Dive into the world of Micro Frontends in this dynamic 8-hour workshop designed for intermediate and advanced developers. Through a mix of theory and extensive hands-on practice, including a comprehensive e-commerce project, participants will explore how to integrate various frameworks like Angular and React within a Micro Frontend architecture. This workshop will not only clarify the complexities and challenges of Micro Frontends but also equip you with practical strategies for overcoming them. Expect to emerge with a solid grasp of Micro Frontend principles, and ready to implement scalable and flexible solutions that enhance development workflows and product quality. This workshop is perfect for developers keen on mastering advanced architectural patterns to address sophisticated business and team requirements.",
        },
      },
      {
        tag: "meta",
        attrs: {
          property: "og:image",
          content:
            "https://davidnic11.github.io/workshop-enterprise-grade-micro-frontends/title-card.png",
        },
      },
    ],
  },
  source: {
    define: {
      "process.env": JSON.stringify(process.env),
    },
  },
  tools: {
    rspack: {
      plugins: [
        sentryWebpackPlugin({
          moduleMetadata: ({ release }) => ({
            dsn: process.env.SENTRY_DSN_WORKSHOP,
            release,
          }),
        }),
      ],
    },
  },
  moduleFederation: {
    options: {
      name: "workshop",
      filename: "workshop.js",
      exposes: {
        "./welcome": "./src/scenes/Welcome/index.ts",
        "./exercises": "./src/scenes/Exercises/index.ts",
      },
      shared: {
        "@mantine/core": {
          requiredVersion: "^7.10.2",
          singleton: true,
        },
        "@mantine/emotion": {
          requiredVersion: "^7.10.2",
          singleton: true,
        },
        "@mantine/code-highlight": {
          requiredVersion: "^7.11.2",
          singleton: true,
        },
        "react-router-dom": {
          requiredVersion: "^6.23.1",
          singleton: true,
        },
        react: {
          requiredVersion: "^18.2.0",
          singleton: true,
          eager: true,
        },
        "react-dom": {
          requiredVersion: "^18.2.0",
          singleton: true,
          eager: true,
        },
      },
    },
  },
});
