import { truncate } from "hast-util-truncate";
import { toText as hastToText } from "hast-util-to-text";
import { collapseWhiteSpace } from "collapse-white-space";
import { escapeUTF8 } from "entities";

function rehypeExcerpt(options) {
  const excerptLimit = options?.limit ?? 200;
  return (tree, file) => {
    const { frontmatter } = file.data.astro;
    const fragment = truncate(tree, {
      size: excerptLimit,
      ellipsis: "…",
    });
    frontmatter.excerpt = escapeUTF8(collapseWhiteSpace(hastToText(fragment)));
  };
}

export default rehypeExcerpt;
