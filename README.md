# EXC PLATFORM — website starter

Responsive, trilingual (Uzbek / Russian / English) static website starter.

## Preview locally
Open `index.html` in a browser.

## Before publishing
- Replace placeholder portfolio cards with real projects.
- Add your real contact details and social links.
- Set actual package prices if you want fixed pricing.
- Connect the order form to a secure backend endpoint. The current form is demo-only and does not transmit or store submissions.
- Connect Telegram notifications on the server side. Never put the Telegram bot token in browser JavaScript or commit it to GitHub.
- Add a privacy notice and consent language before collecting personal data.

## Publish with Cloudflare Pages
1. Create a GitHub account and verify your email.
2. Create a new **public or private** repository, e.g. `exc-platform`.
3. Upload `index.html`, `styles.css`, and `script.js` to the repository root (README is optional).
4. In Cloudflare, open **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
5. Select the repository. For a plain static site, choose no framework / `None`; build command can be left empty; output directory is `/` or the repository root, depending on the setup screen.
6. Deploy. Cloudflare will provide a `*.pages.dev` address.

## Important
This is the front-end starter only. The order form currently shows a demo confirmation. Backend, database, analytics, admin authentication, and Telegram bot delivery must be implemented and configured separately before real customer submissions are accepted.
