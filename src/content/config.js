import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { TZDate } from "@date-fns/tz";
import { siteConfig } from "@/site-config";

function removeDupsAndLowerCase(array) {
  if (!array || !array.length) return array;
  const lowercaseItems = array.map((str) => str.toLowerCase());
  const distinctItems = new Set(lowercaseItems);
  return Array.from(distinctItems);
}

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "../blog-posts/content/blog" }),
  schema: z.object({
    title: z.string(),
    created: z.string().transform((str) => new TZDate(str, siteConfig.timezone)),
    updated: z.string().transform((str) => new TZDate(str, siteConfig.timezone)),
    categories: z.array(z.string()).nullable().default([]).transform(removeDupsAndLowerCase),
    tags: z.array(z.string()).nullable().default([]).transform(removeDupsAndLowerCase),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
