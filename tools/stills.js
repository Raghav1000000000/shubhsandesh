const { chromium } = require('playwright-core');
const path = require('path');
const [src, W, H, ...times] = process.argv.slice(2);
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const page = await browser.newPage({ viewport: { width: +W, height: +H }, deviceScaleFactor: 1 });
  await page.goto(require('url').pathToFileURL(path.resolve(src)).href);
  await page.addStyleTag({ content: `body{padding:0!important;margin:0!important;overflow:hidden!important}.wrap{max-width:none!important;gap:0!important}.wrap > :not(.stage){display:none!important}.stage{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;aspect-ratio:auto!important;border-radius:0!important}` });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => { const seen=new Map(); window.__setTime=(ms)=>{window.__trailer.seek(ms);for(const a of document.getAnimations()){if(!seen.has(a))seen.set(a,ms);a.pause();a.currentTime=ms-seen.get(a);}}; });
  // walk forward so animations register at the right start times
  let k=0; const ts=times.map(Number);
  for (let ms=0; ms<=Math.max(...ts); ms+=100){ await page.evaluate(m=>window.__setTime(m), ms); if (ts.includes(ms)) await page.screenshot({path:`still_${W}x${H}_${ms}.png`}); }
  await browser.close();
})();
