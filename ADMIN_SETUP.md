# YoLingo Admin Panel Setup

This site now includes a Decap CMS admin panel at:

`/admin/`

The admin panel edits JSON files in the `/content` folder. The website loads those JSON files with `cms-content.js` and updates the selected text/links automatically.

## What the client can edit

- Site settings: email, phone, WhatsApp link, hours, footer text, Formspree endpoint
- Home page: hero text, language cards, features, stats, CTA text
- Pricing page: heading, main plan names/descriptions/prices/saving texts/buttons, guarantee text
- Contact page: heading, main contact section titles/texts, virtual school text

## Important: GitHub Pages login

Decap CMS is free, but GitHub Pages does not provide the server-side login step by itself. For the live `/admin` login you need a GitHub OAuth proxy, usually with a small Cloudflare Worker/serverless function.

In `admin/config.yml`, change:

```yml
repo: aifeeder8/YoLingo-school
```

to your real GitHub username/repository if different.

Then add your OAuth proxy URL, for example:

```yml
base_url: https://your-decap-oauth-worker.yourname.workers.dev
auth_endpoint: auth
```

## Local test

From the project folder:

```bash
npx decap-server
python3 -m http.server 8080
```

Then open:

`http://localhost:8080/admin/`

## Client access

For Decap with GitHub backend, the client usually needs a GitHub account and write/push access to the repository, unless you set up a Git Gateway style service.
