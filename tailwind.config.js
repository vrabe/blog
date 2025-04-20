import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx}",
    "../blog-posts/content/blog/**/*.{md,mdx}",
    "!./src/pages/og-image/[id].png.js",
  ],
  corePlugins: {
    // disable some core plugins as they are included in the css, even when unused
    borderOpacity: false,
    fontVariantNumeric: false,
    ringOffsetColor: false,
    ringOffsetWidth: false,
    scrollSnapType: false,
    textOpacity: false,
    touchAction: false,
  },
  darkMode: ["class", '[data-theme="dark"]'],
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-fluid-type"),
    plugin(function ({ addComponents }) {
      addComponents({
        ".cactus-link": {
          "&:hover": {
            "@apply decoration-link decoration-2": {},
          },
          "@apply underline underline-offset-2": {},
        },
        ".title": {
          "@apply text-2xl font-semibold text-accent-2": {},
        },
      });
    }),
  ],
  theme: {
    extend: {
      colors: {
        "global-bg": "hsl(var(--theme-bg) / <alpha-value>)",
        "global-text": "hsl(var(--theme-text) / <alpha-value>)",
        accent: "hsl(var(--theme-accent) / <alpha-value>)",
        "accent-2": "hsl(var(--theme-accent-2) / <alpha-value>)",
        link: "hsl(var(--theme-link) / <alpha-value>)",
        quote: "hsl(var(--theme-quote) / <alpha-value>)",
      },
      fontFamily: {
        // Add any custom fonts here
        sans: [
          "Overpass",
          "Noto Sans CJK TC",
          "儷黑 Pro",
          "LiHei Pro",
          "微軟正黑體",
          "Microsoft JhengHei",
        ],
        serif: [...fontFamily.serif],
        mono: ["Reddit Mono", ...fontFamily.mono],
      },
      transitionProperty: {
        height: "height",
      },
      // Polyfill for TailwindCSS 4
      zIndex: {
        90: "90",
      },
      minWidth: {
        30: "120px",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              "@apply cactus-link": "",
            },
            blockquote: {
              borderLeftWidth: "0",
            },
            code: {
              border: "1px dotted #666",
              borderRadius: "2px",
              fontWeight: "400",
              paddingInlineEnd: "5px",
              paddingInlineStart: "5px",
            },
            "code::before": {
              content: "",
            },
            "code::after": {
              content: "",
            },
            kbd: {
              "@apply dark:bg-global-text": "",
            },
            hr: {
              borderTopStyle: "dashed",
            },
            strong: {
              fontWeight: "700",
            },
            sup: {
              "@apply ms-0.5": "",
              a: {
                "&:after": {
                  content: "']'",
                },
                "&:before": {
                  content: "'['",
                },
                "&:hover": {
                  "@apply text-link no-underline bg-none": "",
                },
                "@apply bg-none": "",
              },
            },
            img: {
              "@apply mx-auto": "",
            },
            /* Table */
            "tbody tr": {
              borderBottomWidth: "none",
            },
            tfoot: {
              borderTop: "1px dashed #666",
            },
            thead: {
              borderBottomWidth: "none",
            },
            "thead th": {
              borderBottom: "1px dashed #666",
              fontWeight: "700",
            },
            'th[align="center"], td[align="center"]': {
              "text-align": "center",
            },
            'th[align="right"], td[align="right"]': {
              "text-align": "right",
            },
            'th[align="left"], td[align="left"]': {
              "text-align": "left",
            },
          },
        },
        cactus: {
          css: {
            "--tw-prose-body": theme("colors.global-text / 1"),
            "--tw-prose-bold": theme("colors.global-text / 1"),
            "--tw-prose-bullets": theme("colors.global-text / 1"),
            "--tw-prose-code": theme("colors.global-text / 1"),
            "--tw-prose-headings": theme("colors.accent-2 / 1"),
            "--tw-prose-hr": "0.5px dashed #666",
            "--tw-prose-links": theme("colors.global-text / 1"),
            "--tw-prose-quotes": theme("colors.quote / 1"),
            "--tw-prose-th-borders": "#666",
          },
        },
        sm: {
          css: {
            code: {
              fontSize: theme("fontSize.sm")[0],
              fontWeight: "400",
            },
          },
        },
      }),
    },
  },
};
