# Gemini

This demo uses Tailwind CSS and Chart.js via CDN links in `index.html`. If you prefer to work offline or host these libraries yourself, download the files locally and update the HTML to reference them.

## Downloading Tailwind CSS
1. Visit the [Tailwind CSS releases page](https://github.com/tailwindlabs/tailwindcss/releases).
2. Download `tailwind.min.js` from the latest release.
3. Place it in a `js/` directory at the project root.

## Downloading Chart.js
1. Visit the [Chart.js releases page](https://github.com/chartjs/Chart.js/releases).
2. Download `chart.umd.js` (or `chart.min.js`).
3. Save it in the same `js/` directory.

## Switching to local files
Edit the beginning of `index.html` to point to your local copies. Comment out the CDN links and uncomment or add the lines for the local paths, for example:

```html
<!-- CDN version -->
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<!-- Local version -->
<!--
<script src="js/tailwind.min.js"></script>
<script src="js/chart.umd.js"></script>
-->
```

Keep only one set of script tags (CDN or local) active depending on your needs.
