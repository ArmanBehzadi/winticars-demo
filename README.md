# Winti Cars — Validation Demo

A throwaway, clickable **façade** of Winti Cars for dealer/transporter/garage
interviews. **Everything is fake**: no backend, no database, no auth, no money.
All data lives in editable fixture files. Build it, host it free, install it on
your iPhone, show it, edit between interviews.

> This is **NOT** the production app. It deliberately never touches the real
> Supabase/Vercel project. Don't put real customer data in it.

---

## What's in it (the 6 scenes)

| # | Scene | Where | Tests |
|---|-------|-------|-------|
| 0 | Login / role picker | `/` | (façade only — not a validation scene) |
| 1 | **The Board** + filters (also the dashboard) | `/board` | structured discovery beats WhatsApp |
| 2 | Listing detail → contact → canned reply | `/listings/<id>` | would they transact |
| 3 | **Teilen** → public page + WhatsApp preview | `/c/<dealer>--<id>` | the likely early wedge |
| 4 | Create order from a just-traded car | `/order/<id>` | services bridge (demand) — **transport is the hero** |
| 5 | Orders inbox (the other side) | `/orders` | services bridge (supply) |
| 6 | Verified directory | `/dealers` | trust |

**Per-actor flow (H-011):** Dealer → 1,2,3,(4),6 · Transporter → 5,4 · Garage/Paint → 5 + paint/MFK.
The login role picker switches the bottom-nav order so each actor lands on their hero scene.

---

## Run it locally (to preview / edit)

```bash
npm install
npm run dev      # http://localhost:3000
```

Production static build (what you deploy):

```bash
npm run build    # outputs a static site to ./out
```

---

## ✏️ Editing the demo between interviews (the whole point)

All content is in **`src/fixtures/`** — plain typed files, no database:

| File | What to edit |
|------|--------------|
| `cars.ts` | the cars on the board — price, mileage, year, specs, description. Copy a block to add one. Set `justTraded: true` on the car that drives Scene 4. |
| `dealers.ts` | dealer names, cities, `verified` badge, founding year. `ME_DEALER_ID` = who you "are" as a dealer. |
| `providers.ts` | transporters / paint shops / MFK garages (the supply side) — ETA, price-from. |
| `orders.ts` | the seed jobs in the inbox (Scene 5). |
| `replies.ts` | the canned reply text a dealer "sends back" in Scene 2. |

After editing, just `npm run build` and re-deploy (or it hot-reloads in `npm run dev`).

**Real photos:** by default cars show a branded silhouette placeholder. To use a
real photo, drop the file in `public/cars/` and set `image: "/cars/your-file.jpg"`
on that car in `cars.ts`.

### Guardrails baked in (don't undo these — H-011)
No VIN/Stammnummer · no fake "X dealers online" counts · no payment/commission UI ·
no real competitor names (use fictional local-style ones) · round/placeholder prices only.

---

## 📱 Install on your iPhone (3 steps)

> iOS only installs web apps as full-screen from **Safari** — not Chrome, not an
> in-app browser. Open the link in Safari first.

1. Open the demo URL in **Safari** on your iPhone.
2. Tap the **Share** button (the square with the ↑ arrow at the bottom).
3. Scroll down → **"Zum Home-Bildschirm" / "Add to Home Screen"** → **Add**.

A "Winti Cars" icon appears on your home screen. Opening it runs full-screen with
no browser bars — looks like a real app.

**Hidden reset between interviews:** triple-tap the **WINTI·CARS** logo in the top
bar → wipes any messages/orders you created and returns to the login screen.

---

## 🌐 Hosting it free (Arman runs the signup)

Static export → host on a **free tier that allows commercial use** (Vercel Hobby
does **not**, so we don't use it here). Two good options:

### Option A — Cloudflare Pages (recommended)
1. Create a free Cloudflare account → **Workers & Pages** → **Create** → **Pages**.
2. Connect this GitHub repo (or "Direct Upload" the `out/` folder).
3. Build settings: **Build command** `npm run build`, **Output directory** `out`.
4. Deploy → you get a `*.pages.dev` URL. Open it in Safari, install (above).

### Option B — GitHub Pages
1. Push this repo to GitHub.
2. In `next.config.mjs`, uncomment `basePath` and set it to `/winticars-demo`
   (GitHub project sites serve from a sub-path). Re-build.
3. Repo **Settings → Pages** → deploy from the `out/` folder (or a `gh-pages` branch).

---

## Stack

Next.js (App Router, **static export**) · React · TypeScript · no runtime server.
Look copied from the production app (red `#e10600`, Saira Condensed + JetBrains
Mono, sharp 2px corners) but the code is independent — nothing is imported from
`winticars-platform`.
