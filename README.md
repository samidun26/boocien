# Our Little World

A private moonlit hideaway for Dimmy & Maca: memories with optional photos, folded love notes, 28 conversation prompts, and 12 date ideas.

## Use

Open the hosted site together on one phone or laptop. Use “Make it ours” to add an anniversary, edit nicknames, download a backup, or restore one.

Entries are stored in browser localStorage, not on the hosting server. Different browsers, devices, and site origins have separate collections. Anyone with access to this browser can open the entries. Clearing browser data may erase them. Download periodic JSON backups and store them privately. A backup includes photos and notes. Restore replaces the current collection after confirmation.

Photos accept JPG, PNG, and WebP up to 15 MB. They are resized to at most 1200 pixels on the longest side and saved as JPEG to conserve browser storage. A full browser storage quota produces an error and preserves the previous collection.

## Run locally

Serve the `dist` folder using a static server, for example:

    python3 -m http.server 4173 --directory dist

Open http://localhost:4173. Browser data at this address is separate from the hosted site. Typography uses Google Fonts with local fallback fonts.

## Checks

    node --check dist/app.js
    node check.cjs

No package installation or build step is needed. The source has no trackers, analytics, backend database, or visitor plugins.
