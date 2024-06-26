// Heavy inspiration from starlight: https://github.com/withastro/starlight/blob/main/packages/starlight/utils/generateToC.ts

/** Inject a ToC entry as deep in the tree as its `depth` property requires. */
function injectChild(items, item) {
	const lastItem = items.at(-1);
	if (!lastItem || lastItem.depth >= item.depth) {
		items.push(item);
	} else {
		injectChild(lastItem.children, item);
		return;
	}
}

export function generateToc(headings, { maxHeadingLevel = 4, minHeadingLevel = 2 } = {}) {
	// by default this ignores/filters out h1 and h5 heading(s)
	const bodyHeadings = headings.filter(
		({ depth }) => depth >= minHeadingLevel && depth <= maxHeadingLevel
	);
	const toc = [];

	for (const heading of bodyHeadings) injectChild(toc, { ...heading, children: [] });

	return toc;
}
