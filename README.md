# Forest Trail Scouts site
A troop-branded site for Troop 1941 with an Express backend so content and form submissions aren’t just static files. The page includes a hero banner, activities overview, photo gallery with modal viewer, embedded Google Calendar, and a contact form that persists messages to disk.

## Run the live site locally
1) Install dependencies: `npm install`
2) Start the server: `npm start`
3) Visit http://localhost:3000

### Dev loop
Use `npm run dev` for automatic restarts while editing server code.

## Editing content
- Activities: update `data/activities.json` to change the “What we do” cards without touching HTML.
- Gallery: update `data/gallery.json` to swap photo URLs, alt text, or captions.
- Contact storage: submissions append to `data/contact-messages.json` (kept locally; add your own email/SMS handling if needed).
