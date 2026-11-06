const { chromium } = require('playwright-core');
const path = require('path'); const url = require('url');
const dir = process.argv[2];
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const page = await browser.newPage({ viewport: { width: 700, height: 900 }, deviceScaleFactor: 3 });
  await page.goto(url.pathToFileURL(path.join(dir, 'index.html')).href);
  await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(500);
  const pages = await page.$$('.page');
  const names = ['ShubhSandesh-pamphlet-front.png', 'ShubhSandesh-pamphlet-back.png'];
  for (let i = 0; i < pages.length; i++) await pages[i].screenshot({ path: path.join(dir, names[i]) });
  console.log(JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('.page')].map(p => {
    const r = p.getBoundingClientRect();
    return [...p.querySelectorAll('*')].filter(e => { const b = e.getBoundingClientRect(); return b.bottom > r.bottom + 0.5 || b.right > r.right + 0.5; }).map(e => e.className || e.tagName).slice(0, 5);
  }))));
  await page.emulateMedia({ media: 'print' });
  await page.pdf({ path: path.join(dir, 'ShubhSandesh-pamphlet-A5.pdf'), format: 'A5', printBackground: true, margin: { top: 0, bottom: 0, left: 0, right: 0 } });
  await browser.close();
})();
