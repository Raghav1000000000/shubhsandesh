# Tools

Node scripts that turn the HTML marketing pages into video, images and PDF. They drive an installed Google Chrome through `playwright-core` and encode with `ffmpeg-static`.

```bash
cd tools
npm install
```

The scripts expect Chrome at `C:/Program Files/Google/Chrome/Application/chrome.exe`. Change `executablePath` in each script on other machines.

| Script | What it does | Example |
|---|---|---|
| `record.js` | Renders the trailer frame by frame to an H.264 MP4 | `node record.js ../marketing/trailer/index.html trailer.mp4 1280 720 30` (vertical: `720 1280`) |
| `stills.js` | Saves still frames at given times (ms) | `node stills.js ../marketing/trailer/index.html 1280 720 18000 51000` |
| `pamphlet.js` | Saves the pamphlet as front/back PNGs and an A5 PDF | `node pamphlet.js ../marketing/pamphlet` |

`record.js` renders at 1.5× device scale, so 1280×720 gives a 1920×1080 video.
