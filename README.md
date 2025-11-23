# Troop 1941 (Boy Scouts of America)
A troop-branded site for Troop 1941 with an Express backend so content and form submissions aren’t just static files. The page includes a hero banner, activities overview, Google Slides embed for highlights, an embedded Google Calendar, and a contact form that persists messages to disk.

## Run the live site locally
1) Install dependencies: `npm install`
2) Start the server: `npm start`
3) Visit http://localhost:3000

### Dev loop
Use `npm run dev` for automatic restarts while editing server code.

## Host it so others can click the site
The app is a standard Express server, so any host that runs Node 18+ works. One quick option is Render’s free web service:

1) Push this repo to GitHub (or another git host).
2) Create a Render account and choose **New ➜ Web Service**.
3) Connect the repo, set **Build command** to `npm install`, and **Start command** to `npm start`.
4) Leave the default Node environment (PORT will be injected automatically), then click **Deploy**.
5) After the first deploy finishes, Render will give you a public URL you can share and click. (The API is on the same origin, so forms and data calls keep working.)

Alternative hosts that work the same way: Railway, Fly.io, or any VPS where you can run `npm install` + `npm start` behind a process manager like `pm2`.

## Editing content
- Activities: update `data/activities.json` to change the “What we do” cards without touching HTML.
- Slides: drop in your Google Slides deck without editing HTML:
  1. Open your deck in Google Slides and choose **File → Share → Publish to the web → Embed**.
  2. Click **Publish**, copy the iframe code, and replace the `embedHtml` value in `data/slides.json` with that snippet (keep the quotes).
  3. Save the file and reload the page; the new slides will appear in the showcase.
- Contact storage: submissions append to `data/contact-messages.json` (kept locally; add your own email/SMS handling if needed).
