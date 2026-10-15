# YoLingo — French-first redesign

A redesigned, lightweight, responsive multi-page website. The original **Yo** mascot is preserved, using the original `logo.png` image source. A cropped and web-optimized version (`yo-mascot.webp`) is used on the new pages.

## See it before deploying

- **Interactive standalone preview:** Open `preview.html` in any modern browser. You can switch between Home, French, Spanish, Pricing, and Contact, and between desktop and mobile views. It is self-contained and does not require a server or network connection to display the pages and mascot.
- **Live website:** Open `index.html` in a browser, or serve the folder on any static host. A local HTTP server is recommended for testing admin-managed content updates.
- **Safety:** The contact form is disabled in the self-contained preview. Contact forms on the actual site still use the supplied Formspree endpoint.

## Pages

- `index.html` — French-first homepage with original Yo character
- `parlons.html` — French classes, benefits, and course levels
- `hablemos.html` — secondary Spanish classes page
- `pricing.html` — original price points and plans, modernized layout
- `contact.html` — modern inquiry form with language / level choices
- `privacy.html`, `terms.html`, `refund-policy.html` — restyled policy pages
- `thank-you.html` — restyled thank-you page
- `preview.html` — offline interactive design preview

## Editing and deploying

- `redesign.css` controls the new design.
- `redesign.js` controls the new navigation and form UI.
- `/content/*.json` stores editable homepage, pricing, contact and global details.
- `/admin/` retains the Decap CMS configuration from the uploaded project. The CMS backend requires your Netlify Identity / Git Gateway setup, as in the original project. The redesign does not add a new login mechanism.
- Upload/deploy the folder contents on your static host (Netlify or an existing compatible static setup). The original `CNAME` remains unchanged.
- **Before going live:** Confirm all published prices, availability, policy details, contact info and the active Formspree account reflect your current business offerings.

## Design notes

Fonts load from Google Fonts when online. Locally installed system fonts are used as fallback. The real web pages require no frontend build tools or npm installation. Some legacy CSS and JavaScript files remain for reference but the redesigned pages use `redesign.css` and `redesign.js`.
