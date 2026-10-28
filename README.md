# 📖 Hifz Grid World

The Quran as a live 3D grid map — built for memorization (hifz). Scan real places with your camera into the map as memory-palace anchors, track every ayah you memorize, and play the **Audio Quest** game to strengthen recall.

**📲 Install it on your iPhone** (it's a PWA — a real home-screen app):
1. Open https://mrbugimposter3-ship-it.github.io/quran-grid-world/ in **Safari**
2. Tap **Share** ⬆ → **Add to Home Screen** → **Add**
3. It launches fullscreen with its own icon, works offline, and saves everything on-device

Also installs on Android: Chrome → ⋮ → *Add to Home screen*.

## Mobile-first

- On phones the side panel becomes a **bottom sheet** (drag handle to collapse, 📖 button to reopen)
- **Touch controls**: one finger orbits, pinch zooms, tap selects/answers, and an on-screen **D-pad** walks the map
- Safe-area aware (notches/home bar), no accidental zoom or pull-to-refresh, camera works via HTTPS
- Service worker caches the app shell — opens offline (surah map included); verses/recitation stream when online

**▶ Live:** https://mrbugimposter3-ship-it.github.io/quran-grid-world/

## The grid mapping algorithm

The 12×12 grid (144 cells) maps the whole Quran, fetched live from the [Quran API](https://alquran.cloud) (with a built-in offline fallback — all 114 surahs, 6236 ayahs, 30 ajzā'):

```
cell index i (row-major)
  i < 114  →  surah (i + 1)     · height = log scale of ayah count (Al-Baqarah towers over Al-Kawthar)
  i ≥ 114  →  juz (i − 113)      · height = memorization progress of that juz
```

- **Cell color** = memorization progress (slate → green). Fully memorized surahs turn bright green.
- **Pulsing red** = surah due for spaced-repetition review.
- **Side colors** = Makki (cool blue) vs Madani (warm) vs juz (gold).
- **Floating gems** = pinned ayah links (text, translation, audio, quran.com deep link).

## Hifz features

- **Per-ayah tracking** — click a surah, tap ayah numbers to toggle memorized. Overall progress shown as % of the Quran.
- **Spaced repetition** — strength 1–5 per surah with review intervals (2/4/7/15/30 days). "Reviewed today" resets the timer.
- **🎧 Audio Quest game** — the app plays (or shows the translation of) an ayah from your hifz; walk across the 3D Quran map to the correct surah. Correct answers extend the review interval, wrong ones shorten it. Streaks, points, and a best score.
- **Memory palace** — use your camera to attach a real place (prayer spot, masjid…) to each surah cell, so the map becomes a personal journey of places and verses.
- **Ayah pins** — pin any surah:ayah to a cell with a gem marker, full verse popup with recitation audio and quran.com link.
- **Publish updates** — bump the world version anytime; hifz progress, photos and pins are kept. Auto-saves in the browser + JSON export/import.

## Tech

Single-file web app: Three.js 3D grid, `getUserMedia` camera capture, alquran.cloud live metadata + verse API (quran-uthmani, en.sahih), islamic.network recitation audio, localStorage persistence. Runs entirely client-side on GitHub Pages.

## Run locally

Open `index.html` in a browser (internet needed for live data, verses, and camera permission requires HTTPS — which GitHub Pages provides). Service worker only activates when served over HTTPS.
