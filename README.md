# For You 💌 — Digital Gift Website

A 7-screen interactive romantic gift page: lock screen → surprise reveal →
heart jar → song → memories → click-to-open gift box → award certificate.

## How to open it
Just double-click **index.html** — it opens in any browser (Chrome, Edge, Safari).
No install, no server needed.

## Folder structure
```
love-gift/
├── index.html          ← page structure (you shouldn't need to touch this)
├── css/
│   └── style.css        ← all colors, fonts, spacing, layout
├── js/
│   ├── config.js         ← ⭐ EDIT THIS — all your text, names, messages
│   └── script.js          ← the logic that reads config.js (no need to touch)
├── assets/
│   ├── photos/            ← put your real photos here
│   └── audio/              ← put your real song file here
└── README.md              ← this file
```

## The only file you need to edit: `js/config.js`
Open it in Notepad, VS Code, or any text editor. Every line is labeled.
You can change:
- The names, the award message, the "why I love you" reasons
- The song title/artist and scrolling lyrics
- The passcode (or leave it as the reel-style "wrong once, then unlocks")
- The memory photo captions
- The gift box item messages

## Adding real photos
1. Drop your images into `assets/photos/`
2. In `js/config.js`, find the `memories` list and set each `photo:` to your
   filename, e.g. `photo: "us-at-the-beach.jpg"`
3. If a filename doesn't match a real file, that photo slot just falls back
   to a soft placeholder pattern — nothing breaks.

Recommended: JPG or PNG, portrait orientation (taller than wide) works best
since each photo card is a 4:5 rectangle.

## Adding a real song
1. Drop an MP3 into `assets/audio/`, e.g. `assets/audio/our-song.mp3`
2. In `js/config.js`, set `audioFile: "our-song.mp3"`
3. The Play button will now actually play your song with a real progress bar.
   Leave `audioFile: null` to keep the fake animated player (no audio needed).

## Changing colors / fonts
Open `css/style.css` and edit the variables at the very top:
```css
:root{
  --cream: #FFF7F1;     /* background */
  --blush: #FFE1E9;     /* soft pink accents */
  --rose: #E8637C;      /* primary pink/red */
  --rose-deep: #C94764;  /* headings */
  --deep: #3E2A34;       /* main text */
  --gold: #D9A94F;        /* award border/accents */
}
```
Change any of these hex codes and the whole site re-themes automatically.

## Changing the floating particles
In `js/config.js`:
```js
particleEmojis: ["💗", "💕", "✨", "💫", "🤍", "⭐"],
particleFrequencyMs: 550   // lower = more particles, higher = fewer
```

## Hosting it / sending it to someone
- Easiest: zip the whole `love-gift` folder and send it — they double-click `index.html`.
- To host online for free: upload the folder to GitHub Pages, Netlify, or
  Vercel (drag-and-drop the folder on netlify.com/drop) and share the link.
