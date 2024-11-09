export const siteConfig = {
  // Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.js)
  author: "vrabe",
  // Date.prototype.toLocaleDateString() parameters, found in src/utils/date.js.
  date: {
    locale: "zh-TW",
    options: {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    },
  },
  // Meta property used as the default description meta property
  description: "主要關於資訊的心得與記錄。",
  // HTML lang property, found in src/layouts/Base.astro L:18
  lang: "zh-TW",
  // Meta property, found in src/components/BaseHead.astro L:42
  ogLocale: "zh_TW",
  // Meta property used to construct the meta title property, found in src/components/BaseHead.astro L:11
  title: "鰭狀漏斗",
  // Timezone of the time of the posts
  timezone: "Asia/Taipei",
  // Max posts quantity in each paginated page
  postsPerPage: 10,
};

// Used to generate links in both the Header & Footer.
export const menuLinks = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/about/",
    title: "About",
  },
  {
    path: "/blog/",
    title: "Blog",
  },
];

// https://expressive-code.com/reference/configuration/
export const expressiveCodeOptions = {
  styleOverrides: {
    borderRadius: "4px",
    codeFontFamily:
      "B612 Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    codeFontSize: "0.875rem",
    codeLineHeight: "1.7142857rem",
    codePaddingInline: "1rem",
    frames: {
      frameBoxShadowCssValue: "none",
    },
    uiLineHeight: "inherit",
  },
  themeCssSelector(theme, { styleVariants }) {
    // If one dark and one light theme are available
    // generate theme CSS selectors compatible with cactus-theme dark mode switch
    if (styleVariants.length >= 2) {
      const baseTheme = styleVariants[0]?.theme;
      const altTheme = styleVariants.find((v) => v.theme.type !== baseTheme?.type)?.theme;
      if (theme === baseTheme || theme === altTheme) return `[data-theme='${theme.type}']`;
    }
    // return default selector
    return `[data-theme="${theme.name}"]`;
  },
  // One dark, one light theme => https://expressive-code.com/guides/themes/#available-themes
  themes: ["github-dark", "github-light"],
  useThemedScrollbars: false,
};
