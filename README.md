# Borneo Nest Indonesia

React + Vite + Tailwind CSS company profile website. English and Bahasa Indonesia, local Manrope fonts, responsive navigation, product details, gallery lightbox, FAQ, WhatsApp inquiry handoff and a downloadable company profile.

## Run

```sh
npm install
npm run dev
npm run build
npm run preview
```

Development preview: http://127.0.0.1:5173

## Tests

`npm test` uses installed Google Chrome and expects the dev server on port 5173. It verifies routes at 1440, 768 and 390 pixels, loaded images, locale persistence, inquiry validation and encoded WhatsApp payload, gallery keyboard controls, PDF download and WCAG checks via axe.

## Deployment

Publish the `dist` directory after `npm run build`. The host must serve `index.html` for unknown paths so direct visits to `/products/corner`, for example, work. `public/_redirects` supplies this fallback on compatible static hosts. For Nginx, use `try_files $uri $uri/ /index.html;`. No deployment has been performed.

## Content and configuration

- `src/data.js`: bilingual product descriptions, workflow, quality statements, FAQ and gallery entries.
- `src/components.jsx`: shared navigation, company contact number, cards and footer.
- `src/Home.jsx`, `src/Pages.jsx`, `src/Interactive.jsx`: bilingual page content and form behavior.
- `src/styles.css`: forest green and warm white brand palette, layout and breakpoints.
- `public/company-profile.pdf`: two-page public-facing profile authored from the supplied brief. The original business plan is not exposed.

## Inquiry behavior

The form validates required fields, prepares a WhatsApp message, and shows a review link. The visitor must continue to WhatsApp and send it there. The website does not submit email or store personal inquiry data. Only language preference is stored locally. To add email delivery, implement a server-side endpoint with validation and spam protection and provide the receiving mailbox.

## Content awaiting company data

Public address / Google Maps pin and social account URLs remain explicit placeholders, as requested. Traceability and Goodlife Birdnest are marked as planned. No certificates, export licenses, minimum orders, capacities or testimonials are invented. Add verified facility, cleaning, inspection and partnership photos when available.

## Image provenance

The logo and documentary product, facility-development and cleaning-workflow images come from the supplied local assets and company business-plan document. Product catalogue and hero photographs (`bowl.webp`, `corner.webp`, `mesh.webp`) are AI-generated illustrative imagery, labeled as such in the catalogue, detail pages, gallery and PDF. Replace with verified current-batch photography before using these as sales specifications.

Three image prompts used the built-in image generation tool: (1) three ivory edible swiftlet bowl nests on a stone dish and deep green linen; (2) triangular corner nests on warm stone; (3) processed fragments and strands in an off-white ceramic bowl. See `ASSETS.md` for the complete prompts.

Brand-driven light theme follows the supplied brief (deep green hero/navigation/footer, warm white content). Reduced-motion preference is respected.
