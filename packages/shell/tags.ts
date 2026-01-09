const openGraph = [
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
];

const gaScript = `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-H4DL2LGF0J');`;

const googleAnalytics = [
  {
    tag: "script",
    attrs: {
      async: true,
      src: "https://www.googletagmanager.com/gtag/js?id=G-H4DL2LGF0J",
    },
  },
  {
    tag: "script",
    children: gaScript,
  },
];

export const tags = [
  {
    tag: "base",
    attrs: { href: "/" },
    append: false,
  },
  ...openGraph,
  ...googleAnalytics,
];
