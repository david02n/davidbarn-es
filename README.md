# davidbarn.es

Simple static v1 personal website for David Barnes.

## Files

- `index.html`: Main single-page site content and metadata.
- `styles.css`: Visual design, layout, responsiveness, and accessibility styles.
- `script.js`: Minimal behaviour for mobile nav, section highlighting, and tasteful scroll reveals.
- `404.html`: Static not found page.
- `robots.txt`: Search crawler rules.
- `sitemap.xml`: Sitemap for the main homepage.
- `assets/`: Icons and share image placeholders.

## Preview locally

Because this is a plain static site, you can preview it with any simple local server.

Option 1:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

Option 2:

```bash
npx serve .
```

Then open the local URL shown in the terminal.

## Deploy to Vercel

1. Push this directory to a Git repository.
2. Import the repository into Vercel.
3. Choose the default static project settings. No framework preset or build command is required.
4. Set the production domain in the Vercel project settings.
5. Redeploy after replacing the placeholder metadata and contact links.

Custom domains are configured in the Vercel project settings, not in these files.

## Where to edit copy and content

- Update all visible site copy in `index.html`.
- Update colours, typography, spacing, and layout in `styles.css`.
- Update lightweight interactions in `script.js`.
- Update SEO values and social sharing metadata in the `<head>` of `index.html`.

## Placeholders David should replace

- `https://www.linkedin.com/in/davidwbarnesmsc/` if the profile URL changes
- `me@davidbarn.es` in `index.html` and `404.html` if the contact address changes
- `https://davidbarn.es/assets/og-image.svg` if you want to replace the default share image
- `/assets/favicon.svg` with a final favicon if desired
- Any copy that should be made more specific before launch

## Notes

- The site is intentionally simple so it deploys cleanly and is easy to maintain.
- There is no CMS, blog, or build step in v1.
- If you add more pages later, update `robots.txt` and `sitemap.xml`.
