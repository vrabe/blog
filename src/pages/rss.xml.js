import { render } from "astro:content";
import rss from "@astrojs/rss";
import { siteConfig } from "@/site-config";
import { getAllPosts } from "@/data/post";

export const GET = async () => {
  let posts = await getAllPosts();
  posts = await Promise.all(
    posts.map(async (post) => {
      const { remarkPluginFrontmatter } = await render(post);
      return { ...post, excerpt: remarkPluginFrontmatter.excerpt };
    })
  );

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.excerpt,
      pubDate: post.data.created,
      link: `blog/${post.id}`,
    })),
  });
};
