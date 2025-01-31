# Blog

My blog: <https://vrabe.tw>

The site is modified from [chrismwilliams/astro-theme-cactus](https://github.com/chrismwilliams/astro-theme-cactus) and updated from it regularly. (Currently updated to v5.0.0)

It's not designed to be a template. If you want to use it, don't deploy it directly. You need to edit config and do other necessary changes first.

## Main Difference

- No TypeScript
- No Webmentions
- No notes
- Frontmatter fields are different
- Admonition implementation is different
- Some style changes

## Cheat Sheet

### Remark Alerts

A normal alert:

> [!note]
>
> It's a note.

```
> [!note]
>
> It's a note.
```

A title only alert:

> [!note] A Title Only Alert

```
> [!note] A Title Only Alert
```

A content only alert:

> [!note] NO-TITLE
>
> It's a note without title.

```
> [!note] NO-TITLE
>
> It's a note without title.
```

#### Available Alerts

- ~~TIP~~
- NOTE
- ~~IMPORTANT~~
- WARNING
- ~~CAUTION~~

~~type~~: Style not implemented.

## Acknowledgments

The blog uses the following code:

- [chrismwilliams/astro-theme-cactus](https://github.com/chrismwilliams/astro-theme-cactus)
- [izmttk/astro-mecure](https://github.com/izmttk/astro-mecure) - [`rehype-post-excerpt`](https://github.com/izmttk/astro-mecure/blob/main/plugins/rehype/rehype-post-excerpt.ts)
- [hyoban/remark-github-alerts](https://github.com/hyoban/remark-github-alerts)

and assets from:

- funnel_fill from [Framework7](https://framework7.io/icons/)
- Social card photo by [Tao Yuan](https://unsplash.com/@peek_a_boo_who) on [Unsplash](https://unsplash.com/photos/a-computer-monitor-and-keyboard-Ecr9tGTuBio)

and libraries listed in `package.json`.
