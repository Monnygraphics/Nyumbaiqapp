# NyumbaIQ

Trust infrastructure for Kenyan real estate — a verified record for every home, before a shilling changes hands.

Static site, no build step, no framework, no dependencies. Open `index.html` directly or serve the folder with any static file server.

## Pages

- `index.html` — landing page + waitlist
- `app.html` — product MVP (listings, Trust Ledger, Trust Chat, AI Scam Check, Hunt Request)
- `auth.html` — sign up / log in flow
- `pitch.html` — full investor pitch (market opportunity, competitive landscape, traction)

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel — no build command, no output directory needed (Framework Preset: "Other").
3. `vercel.json` enables clean URLs (`/app` instead of `/app.html`).

## Local preview

```
python -m http.server 4322
```

Then open `http://localhost:4322`.
