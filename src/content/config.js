import { defineCollection, z } from "astro:content";
import { fromZonedTime } from "date-fns-tz";
import { siteConfig } from "@/site-config";

function removeDupsAndLowerCase(array) {
	if (!array.length) return array;
	const lowercaseItems = array.map((str) => str.toLowerCase());
	const distinctItems = new Set(lowercaseItems);
	return Array.from(distinctItems);
}

const post = defineCollection({
	schema: ({ image }) =>
		z.object({
			coverImage: z
				.object({
					alt: z.string(),
					src: image(),
				})
				.optional(),
			description: z.string().min(50).max(160),
			draft: z.boolean().default(false),
			ogImage: z.string().optional(),
			publishDate: z.string().transform((str) => fromZonedTime(str, siteConfig.timezone)),
			tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
			title: z.string().max(60),
			updatedDate: z.string().transform((str) => fromZonedTime(str, siteConfig.timezone)),
		}),
	type: "content",
});

export const collections = { post };
