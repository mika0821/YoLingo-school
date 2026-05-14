# YoLingo Admin Setup

Admin link:

```text
https://yolingo.netlify.app/admin/
```

This version uses a safer admin design so Decap CMS fields and buttons stay visible.

## Important files

```text
admin/index.html
admin/config.yml
admin/brand.css
admin/brand.js
admin/preview.css
content/site.json
content/home.json
content/pricing.json
content/contact.json
cms-content.js
```

## Netlify setup

1. Connect the GitHub repository to Netlify.
2. Enable Identity.
3. Set registration to Invite only.
4. Enable Git Gateway.
5. Invite the user email.

## Decap backend

The top of `admin/config.yml` should be:

```yml
backend:
  name: git-gateway
  branch: main
```

## Upload note

Upload the contents of the `YoLingo-school-main` folder to the root of the GitHub repository. Do not upload the folder itself as a nested folder.
