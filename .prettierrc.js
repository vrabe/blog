export default {
	printWidth: 100,
	semi: true,
	singleQuote: false,
	jsxSingleQuote: false,
	trailingComma: "es5",
	tabWidth: 2,
	useTabs: true,
	plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss" /* Must come last */],
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
	],
};
