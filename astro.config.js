import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import matomo from "astro-matomo";
import icon from "astro-icon";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkGithubAlerts from "./src/utils/remark-github-alerts";
import { expressiveCodeOptions } from "./src/site.config";
import { remarkReadingTime } from "./src/utils/remark-reading-time";
import { rehypeExcerpt } from "./src/utils/rehype-post-excerpt";

// https://astro.build/config
export default defineConfig({
  image: {
    domains: ["webmention.io"],
  },
  integrations: [
    expressiveCode(expressiveCodeOptions),
    icon(),
    tailwind({
      applyBaseStyles: false,
      nesting: true,
    }),
    sitemap(),
    mdx(),
    matomo({
      enabled: import.meta.env.PROD, // Only load in production
      host: "https://analysis.vrabe.tw/",
      siteId: 1,
    }),
  ],
  markdown: {
    rehypePlugins: [rehypeExcerpt, rehypeKatex],
    remarkPlugins: [remarkUnwrapImages, remarkReadingTime, remarkGithubAlerts, remarkMath],
    remarkRehype: {
      footnoteLabelProperties: {
        className: [""],
      },
    },
  },
  // https://docs.astro.build/en/guides/prefetch/
  prefetch: true,
  // ! Please remember to replace the following site property with your own domain
  site: "https://vrabe.tw/",
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  experimental: {
    contentLayer: true,
  },
});
