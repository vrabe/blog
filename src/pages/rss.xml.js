import rss from "@astrojs/rss";
import { siteConfig } from "@/site-config";
import { getAllPosts } from "@/data/post";

export const GET = async () => {
	let posts = await getAllPosts();
	posts = await Promise.all(
		posts.map(async (post) => {
			const { remarkPluginFrontmatter } = await post.render();
			return { ...post, excerpt: remarkPluginFrontmatter.excerpt };
		}),
	);

	return rss({
		title: siteConfig.title,
		description: siteConfig.description,
		site: import.meta.env.SITE,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.excerpt,
			pubDate: post.data.publishDate,
			link: `posts/${post.slug}`,
		})),
	});
};
