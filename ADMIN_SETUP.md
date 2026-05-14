# YoLingo Admin Panel Setup

This version includes a branded Decap CMS admin panel at:

`/admin/`

Recommended client login link:

`https://yolingo.netlify.app/admin/`

## What changed in this version

- Branded YoLingo admin loading screen
- YoLingo logo/favicon in admin
- Purple/pink galaxy-style admin theme
- Cleaner Decap section names with icons
- Better field hints for the client
- Netlify Identity script added to `/admin/`
- Netlify Identity helper added to the main `index.html` for invite/password links
- `admin/config.yml` is already set to Netlify Git Gateway

## Required Netlify settings

In Netlify, make sure these are enabled:

1. Go to **Project configuration → Identity**
2. Enable **Identity**
3. Set registration to **Invite only**
4. Go to **Identity → Services → Git Gateway**
5. Enable **Git Gateway**
6. Invite the client from **Identity → Users → Invite users**

## Important config

The top of `admin/config.yml` should stay like this:

```yml
backend:
  name: git-gateway
  branch: main
```

Do not change it back to `github` if you want the Netlify login to work.

## What the client can edit

- Site settings: email, phone, WhatsApp link, hours, footer text, Formspree endpoint
- Home page: hero text, language cards, features, stats, CTA text
- Pricing page: heading, plan names/descriptions/prices/saving texts/buttons, guarantee text
- Contact page: heading, main contact section titles/texts, virtual school text

## How to upload this update

Upload/commit all files from this ZIP to the same GitHub repository that Netlify is connected to.

Important updated files:

- `admin/index.html`
- `admin/config.yml`
- `admin/brand.css`
- `admin/brand.js`
- `admin/preview.css`
- `index.html`
- `ADMIN_SETUP.md`

After pushing to GitHub, Netlify should redeploy automatically. If not, go to **Netlify → Deploys → Trigger deploy → Deploy site**.
