# Property Leadership OS

This project is a simple prototype showing how a single page web app can guide two distinct audiences:

* **Multifamily Investors** – tools and insights for asset growth and strategy.
* **HOA Board Members** – guidance and resources for day‑to‑day association management.

The approach is called the **dual‑journey** model. A landing screen asks visitors to identify their role and then reveals a personalized experience. Charts built with Chart.js visualize investor personas and HOA pain points, while the HOA path also includes an interactive Board Health & Risk Assessment quiz that drives an email‑based lead capture.

## Serving or Opening `index.html`

Prerequisites:

* A modern web browser.
* Optionally, Python or another static server if you prefer to run a local server.

To view the page you can simply open `index.html` directly in your browser. For a local server, run:

```bash
python3 -m http.server
```

and then navigate to `http://localhost:8000`.

## Design Goals and Key Features

* **Dual-Journey Navigation** – investor vs. HOA paths with role selection.
* **Interactive Charts** – persona comparison and HOA responsibility matrix using Chart.js.
* **HOA Health Quiz** – short assessment with scoring and email lead generation.
* **Minimal Dependencies** – uses CDN-hosted Tailwind CSS and Chart.js, so no build step is required.

Future contributors can expand the individual journeys, add new tools, or integrate a backend for data capture. The current structure shows how to keep both journeys self-contained while sharing common styling and scripts.
