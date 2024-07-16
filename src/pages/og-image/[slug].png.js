import { getAllPosts } from "@/data/post";
import { siteConfig } from "@/site-config";
import { getFormattedDate } from "@/utils";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { html } from "satori-html";

const PTSans = fs.readFileSync("src/assets/PTSans-Regular.ttf");
const PTSansBold = fs.readFileSync("src/assets/PTSans-Bold.ttf");
const Noto = fs.readFileSync("src/assets/NotoSansCJKtc-Regular.otf");
const NotoBold = fs.readFileSync("src/assets/NotoSansCJKtc-Bold.otf");

const ogOptions = {
	// debug: true,
	fonts: [
		{
			data: Buffer.from(PTSans),
			name: "Roboto Mono",
			style: "normal",
			weight: 400,
		},
		{
			data: Buffer.from(PTSansBold),
			name: "Roboto Mono",
			style: "normal",
			weight: 700,
		},
		{
			data: Buffer.from(Noto),
			name: "Noto Sans CJK TC",
			style: "normal",
			weight: 400,
		},
		{
			data: Buffer.from(NotoBold),
			name: "Noto Sans CJK TC",
			style: "normal",
			weight: 700,
		},
	],
	height: 630,
	width: 1200,
};

const markup = (title, pubDate) =>
	html`<div tw="flex flex-col w-full h-full bg-[#23272a] text-[#c9cacc]">
		<div tw="flex flex-col flex-1 w-full p-10 justify-center">
			<p tw="text-2xl mb-6">${pubDate}</p>
			<h1 tw="text-6xl font-bold leading-snug text-white">${title}</h1>
		</div>
		<div tw="flex items-center justify-between w-full p-10 border-t border-[#e25950] text-xl">
			<div tw="flex items-center">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56">
					<path
						fill="#c9cacc"
						d="M45.956 7a4 4 0 0 1 3.149 6.467l-13.38 17.075a4 4 0 0 0-.851 2.467v11.223a4 4 0 0 1-5.314 3.778l-5.479-1.906a4 4 0 0 1-2.686-3.778v-9.293a4 4 0 0 0-.878-2.5L6.877 13.5A4 4 0 0 1 10 7z"
					/>
				</svg>
				<p tw="ml-3 font-semibold">${siteConfig.title}</p>
			</div>
			<p>by ${siteConfig.author}</p>
		</div>
	</div>`;

export async function GET(context) {
	const { pubDate, title } = context.props;

	const postDate = getFormattedDate(pubDate, {
		month: "long",
		weekday: "long",
	});
	const svg = await satori(markup(title, postDate), ogOptions);
	const png = new Resvg(svg).render().asPng();
	return new Response(png, {
		headers: {
			"Cache-Control": "public, max-age=31536000, immutable",
			"Content-Type": "image/png",
		},
	});
}

export async function getStaticPaths() {
	const posts = await getAllPosts();
	return posts.map((post) => ({
		params: { slug: post.slug },
		props: {
			pubDate: post.data.created,
			title: post.data.title,
		},
	}));
}
