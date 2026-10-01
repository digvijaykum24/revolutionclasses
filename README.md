# Revolution Classes

Static website for **Revolution Classes**, a coaching institute and library in
Chak-Bairiya, Patna, Bihar.

Built with HTML5, CSS3, vanilla JavaScript and Bootstrap 5 (loaded from CDN).

## Run locally

1. Clone or download this repository.
2. Open `index.html` in a browser (stay online — Bootstrap and Google Fonts load from CDN).

## Files

| File | What it holds |
| --- | --- |
| `index.html` | Page structure only — no inline styles or scripts |
| `style.css` | All styling: tokens -> sections -> responsive -> reduced motion |
| `script.js` | Faculty data, gallery data, animations, navigation, enquiry form, language switch |
| `i18n.js` | Hindi text for every element tagged `data-i18n` / `data-i18n-ph` in `index.html` |
| `assets/` | Images, icons, gallery photos, event video |

## Editing content

**Faculty** — edit the `FACULTY` array at the top of `script.js`:

```js
{ no: "14", name: "...", qualification: "...", image: "assets/faculty-xyz.jpg" }
```

Desktop grid and mobile slider are both built from this one list. Cards show the
photo, name and qualification.

**Gallery** — edit the `GALLERY` array in `script.js`:

```js
{ icon: "🎉", title: "...", text: "...", image: "assets/gallery/gallery-9.jpg" }
{ icon: "🎬", title: "...", text: "...", video: "...mp4", poster: "...jpg" }
```

Slides, dots and the mobile layout are generated automatically.

**Colours** — change the values under `:root` at the top of `style.css`.
`--purple` is the brand colour; everything else follows it.

## Features

- English / Hindi switch (EN | हिं) in the navbar; the choice is remembered per browser

- Responsive layout for mobile, tablet and desktop
- Swipeable photo cards for faculty and gallery on mobile, with synced dots
- Hero load sequence, counting stats, scroll progress bar, hover micro-interactions
- All motion disabled for visitors who prefer reduced motion
- Enquiry form wired to Formspree
- Rotating colour outlines on every button and card (`--ring-*` tokens in `style.css`)
- Local SEO structured data, Open Graph share image, sitemap and web manifest
- Search-ready icon set: `favicon.ico` (16-64px), 48/96/144/192px PNGs and an SVG favicon

## Editing Hindi text

English lives in `index.html`; each translatable element carries `data-i18n="kN"` and its Hindi
is `window.I18N_HI["kN"]` in `i18n.js`. To change a Hindi line, edit it there. New English text
needs a new key on the element plus a matching entry in `i18n.js` (untagged text simply stays in
English). Hindi for gallery captions (`titleHi`, `textHi`) and teacher bios (`descriptionHi`) is
in the data arrays at the top of `script.js`.

## Deploying

**Hostinger:** upload everything in this folder to `public_html`.

**GitHub Pages:** Settings -> Pages -> Deploy from branch -> `main` / root.

Before going live, replace `revolutionclasses.com` with the real domain in
`index.html` (canonical, Open Graph, structured data) and in `sitemap.xml`.

## Enquiry form

Submits to Formspree: `https://formspree.io/f/mzebjqgq`
Change the form `action` in `index.html` to use a different inbox or backend.
