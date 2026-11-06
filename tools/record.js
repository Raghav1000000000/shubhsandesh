// Usage: node record.js <trailer.html> <out.mp4> <width> <height> [fps] [maxMs]
const { chromium } = require('playwright-core');
const ffmpeg = require('ffmpeg-static');
const { spawn } = require('child_process');
const path = require('path');

const [src, out, W, H, FPS = '30', MAXMS] = process.argv.slice(2);
const fps = +FPS;

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const page = await browser.newPage({ viewport: { width: +W, height: +H }, deviceScaleFactor: 1.5 });
  await page.goto(require('url').pathToFileURL(path.resolve(src)).href);
  await page.addStyleTag({ content: `
    body{padding:0!important;margin:0!important;overflow:hidden!important;background:#fff!important}
    .wrap{max-width:none!important;gap:0!important}
    .wrap > :not(.stage){display:none!important}
    .stage{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;aspect-ratio:auto!important;border-radius:0!important;box-shadow:none!important}` });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(800);
  await page.evaluate(() => {
    const seen = new Map();
    window.__setTime = (ms) => {
      window.__trailer.seek(ms);
      for (const a of document.getAnimations()) {
        if (!seen.has(a)) seen.set(a, ms);
        a.pause();
        a.currentTime = ms - seen.get(a);
      }
    };
  });
  const total = MAXMS ? +MAXMS : await page.evaluate(() => window.__trailer.total);
  const frames = Math.ceil(total / 1000 * fps);

  const ff = spawn(ffmpeg, ['-y', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'medium', '-movflags', '+faststart', out],
    { stdio: ['pipe', 'ignore', 'pipe'] });
  let err = ''; ff.stderr.on('data', d => { err = (err + d).slice(-2000); });

  for (let i = 0; i < frames; i++) {
    await page.evaluate((ms) => window.__setTime(ms), i * 1000 / fps);
    const buf = await page.screenshot({ type: 'jpeg', quality: 92 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 300 === 0) console.log(`${out}: frame ${i}/${frames}`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', code => { if (code) console.error(err); r(); }));
  await browser.close();
  console.log('done', out, frames, 'frames');
})().catch(e => { console.error(e); process.exit(1); });
