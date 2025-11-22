# Forest Trail Scouts site
A troop-branded site for Troop 1941 with an Express backend so content and form submissions aren’t just static files. The page includes a hero banner, activities overview, photo gallery with modal viewer, embedded Google Calendar, and a contact form that persists messages to disk.

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
- Gallery: update `data/gallery.json` to swap photo URLs, alt text, or captions.
- Contact storage: submissions append to `data/contact-messages.json` (kept locally; add your own email/SMS handling if needed).
