import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig, envField } from "astro/config";
import expressiveCode from "astro-expressive-code";
import matomo from "astro-matomo";
import icon from "astro-icon";
import rehypeExternalLinks from "rehype-external-links";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGithubAlerts from "./src/utils/remark-github-alerts";
import remarkReadingTime from "./src/utils/remark-reading-time";
import rehypeExcerpt from "./src/utils/rehype-post-excerpt";
import { expressiveCodeOptions, siteConfig } from "./src/site.config";

// https://astro.build/config
export default defineConfig({
  site: siteConfig.url,
  integrations: [
    expressiveCode(expressiveCodeOptions),
    icon(),
    tailwind({
      applyBaseStyles: false,
      nesting: true,
    }),
    sitemap({
      filter: (page) => !/\/blog\/tags/.test(page),
    }),
    mdx(),
    matomo({
      enabled: import.meta.env.PROD, // Only load in production
      host: "https://analysis.vrabe.tw/",
      siteId: 1,
      heartBeatTimer: 10,
    }),
  ],
  markdown: {
    rehypePlugins: [
      rehypeExcerpt,
      rehypeKatex,
      rehypeUnwrapImages,
      [
        rehypeExternalLinks,
        {
          rel: ["noreferrer", "noopener"],
          target: "_blank",
        },
      ],
    ],
    remarkPlugins: [remarkReadingTime, remarkGithubAlerts, remarkMath],
    remarkRehype: {
      footnoteLabelProperties: {
        className: [""],
      },
    },
  },
  // https://docs.astro.build/en/guides/prefetch/
  prefetch: true,
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  image: {
    layout: "constrained",
    responsiveStyles: true,
  },
  env: {
    schema: {
      POSTS_PATH: envField.string({ context: "server", access: "secret" }),
      DRAFTS_PATH: envField.string({ context: "server", access: "secret" }),
    },
  },
});
