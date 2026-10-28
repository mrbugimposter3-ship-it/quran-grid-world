# 🌍 Quran Grid World

Turn the real world into a 3D grid map with your camera, then explore it as a game where cells link to Quran ayahs.

**▶ Play live:** https://mrbugimposter3-ship-it.github.io/quran-grid-world/

## How it works

1. **🔨 Build** — click a cell in the 3D grid world, capture a real place with your camera (or upload a photo), and set its height. Each photo fills one grid cell — scan your street, room, park, cell by cell.
2. **✨ Ayah links** — attach any surah:ayah to a cell. Arabic text + translation load from the [Quran API](https://alquran.cloud), with audio recitation and a [quran.com](https://quran.com) deep link.
3. **🎮 Play** — explore the world you built (WASD / arrow keys). New cells = +10 pts, finding a golden ayah gem = +50 pts and reveals the verse.
4. **🚀 Publish update** — bumps the world version, keeps your photos & ayahs, resets exploration, so every scan creates a fresh game. World auto-saves in your browser and can be exported/imported as JSON.

## Tech

Single-file web app: Three.js for the 3D grid, `getUserMedia` for camera scanning, alquran.cloud API for verses, localStorage + JSON export/import for world persistence. Runs entirely client-side — great for GitHub Pages.

## Run locally

Just open `index.html` in a browser. Camera + ayah fetching need internet; GitHub Pages provides the HTTPS required for camera access.
