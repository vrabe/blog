import { defineCollection, z } from "astro:content";
import { POSTS_PATH, DRAFTS_PATH } from "astro:env/server";
import { glob } from "astro/loaders";
import { TZDate } from "@date-fns/tz";
import { siteConfig } from "@/site.config";

function removeDupsAndLowerCase(array) {
  if (!array || !array.length) return array;
  const lowercaseItems = array.map((str) => str.toLowerCase());
  const nonEmptyItems = lowercaseItems.filter((str) => str !== "");
  const distinctItems = new Set(nonEmptyItems);
  return Array.from(distinctItems);
}

const blog = defineCollection({
  loader: glob({ base: POSTS_PATH, pattern: "**/*.mdx" }),
  schema: z.object({
    title: z.string(),
    created: z.string().transform((str) => new TZDate(str, siteConfig.timezone)),
    updated: z.string().transform((str) => new TZDate(str, siteConfig.timezone)),
    categories: z.array(z.string()).nullable().default([]).transform(removeDupsAndLowerCase),
    tags: z.array(z.string()).nullable().default([]).transform(removeDupsAndLowerCase),
  }),
});

const drafts = defineCollection({
  loader: glob({ base: DRAFTS_PATH, pattern: "**/*.mdx" }),
  schema: z.object({
    title: z
      .string()
      .optional()
      .default("")
      .transform((str) => (str === "" ? "草稿" : str)),
    created: z
      .string()
      .optional()
      .default("")
      .transform((str) => (str === "" ? new Date() : new TZDate(str, siteConfig.timezone))),
    updated: z
      .string()
      .optional()
      .default("")
      .transform((str) => (str === "" ? new Date() : new TZDate(str, siteConfig.timezone))),
    categories: z
      .array(z.string())
      .nullable()
      .optional()
      .default([])
      .transform(removeDupsAndLowerCase),
    tags: z.array(z.string()).nullable().optional().default([]).transform(removeDupsAndLowerCase),
  }),
});

export const collections = { blog, drafts };
