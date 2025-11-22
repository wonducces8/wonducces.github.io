# Forest Trail Scouts site
A single-page, forest-inspired website for Troop 1941. It includes a hero banner, activities overview, photo gallery with modal
viewer, embedded Google Calendar, and a contact section.

## Quick start
Open `index.html` directly in your browser or serve the folder with any static file server.

### Local preview options
- Use Python: `python -m http.server 8000` (then visit http://localhost:8000)
- Use Node: `npx serve .` (if you have `serve` installed globally, run `serve .`)
- Drag-and-drop: double-click `index.html` in the repo folder and your default browser will render the page.

### Editing the "What we do" section
Update the JSON inside the `<script type="application/json" id="activities-data">` block in `index.html`. Each object in the `items` array controls a card with `title`, `description`, and `badge` fields.
