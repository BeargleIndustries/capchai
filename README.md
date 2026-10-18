# CapchAI

A CAPTCHA you can fail. Each round shows four images; you pick either the one
AI-generated image or the only real photo, depending on what the header asks.
Ten rounds, a score, and a verdict on how human you are.

## Run it

Static site, no build step. It needs to be served over HTTP because it fetches
`data/manifest.json`.

```bash
python -m http.server 8765
```

Then open <http://localhost:8765/>. Any static host works for deployment
(GitHub Pages, Netlify, Cloudflare Pages): upload the folder as is.

## Layout

| Path | What it is |
|---|---|
| `index.html`, `style.css`, `game.js` | The game. Plain HTML, CSS and JavaScript. |
| `data/manifest.json` | What the game reads: categories, tells, real images with credits, expected AI image paths. |
| `data/real-images.json` | Curation record for the real photos: source, license, creator, source page, download URL. |
| `data/candidates.json` | Raw API results the picks were chosen from. Not used by the game. |
| `assets/real/` | 55 curated real photos, 5 per category, resized to 1400px max. |
| `assets/ai/` | 33 AI images, 3 per category, generated with Grok Imagine and resized to match the real set. `models.txt` records the generator. |
| `prompts/ai-prompts.md` | 33 prompts, 3 per category, matched to the real sets. |
| `curation/` | Contact sheets used while picking real images. Safe to delete. |

## Replacing or adding AI images

Generate from `prompts/ai-prompts.md` and save as
`assets/ai/<category>-<n>.jpg` (for example `assets/ai/portrait-1.jpg`).
The manifest lists those filenames, so swapping a file needs no other edit.
If a file is missing, the game shows a striped "AI image pending" tile in its
place. The `model` field on each `ai` entry in `data/manifest.json` is shown
in the results credits.

Keep AI and real images normalised the same way (JPEG, quality 85, 1400px
max, EXIF stripped) so file size and metadata never become a tell.

## Game rules as implemented

- 10 rounds drawn from the 11 categories, shuffled each game.
- Directions are balanced: 5 rounds "find the AI image" (3 real + 1 AI) and
  5 rounds "find the only real photo" (1 real + 3 AI), in random order.
- Scoring: 100 per correct answer, up to 50 time bonus that fades to zero over
  12 seconds, plus 25 per extra consecutive correct answer.
- Verdict tiers by correct count: 10 suspiciously perfect, 8-9 certified
  human, 6-7 mostly human, 4-5 inconclusive, 0-3 failed.
- Keyboard: 1 to 4 selects, Enter verifies or advances.

## Licenses

Real photos are CC0, public domain, CC BY or CC BY-SA, from Wikimedia Commons
(Quality images), StockSnap, rawpixel, Flickr via Openverse, and the Met's
Open Access collection. Attribution for every photo used in a game is listed
under "Image credits" on the results screen and in `data/real-images.json`.
CC BY-SA images require the same license on derivatives if you ever edit them.
