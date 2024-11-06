import { getCollection } from "astro:content";

/** filter out draft posts based on the environment */
export async function getAllPosts() {
  return await getCollection("blog", ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });
}

/** groups posts by year (based on option siteConfig.sortPostsByUpdatedDate), using the year as the key
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 */
export function groupPostsByYear(posts) {
  return posts.reduce((acc, post) => {
    const year = post.data.created.getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year]?.push(post);
    return acc;
  }, {});
}

/** returns all tags created from posts (inc duplicate tags)
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getAllTags(posts) {
  return posts.flatMap((post) => [...post.data.tags]);
}

/** returns all unique tags created from posts
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getUniqueTags(posts) {
  return [...new Set(getAllTags(posts))];
}

/** returns a count of each unique tag - [[tagName, count], ...]
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getUniqueTagsWithCount(posts) {
  return [
    ...getAllTags(posts).reduce((acc, t) => acc.set(t, (acc.get(t) ?? 0) + 1), new Map()),
  ].sort((a, b) => b[1] - a[1]);
}

/** returns most used tags
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getTopTags(posts, limit) {
  const uniqueTagsWithCount = getUniqueTagsWithCount(posts);
  return uniqueTagsWithCount.slice(0, limit).map((tagWithCount) => tagWithCount[0]);
}
