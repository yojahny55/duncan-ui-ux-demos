const { chromium } = require('playwright');

const demos = [
  'demo-complete',
  'mkadventure',
  'mkadventure-v2-bento',
  'mkadventure-v3-motion',
  'mkadventure-v4-warm',
  'mkadventure-v5-bold'
];

const viewports = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'mobile', width: 390, height: 844 }
];

(async () => {
  const browser = await chromium.launch();
  
  for (const demo of demos) {
    for (const viewport of viewports) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height }
      });
      const page = await context.newPage();
      
      const url = `http://localhost:3847/${demo}/`;
      console.log(`Screenshotting ${demo} (${viewport.name})...`);
      
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
        await page.waitForTimeout(2000); // Wait for animations
        
        await page.screenshot({
          path: `screenshots/${demo}-${viewport.name}.png`,
          fullPage: false
        });
        console.log(`  ✓ Saved: screenshots/${demo}-${viewport.name}.png`);
      } catch (e) {
        console.log(`  ✗ Error: ${e.message}`);
      }
      
      await context.close();
    }
  }
  
  await browser.close();
  console.log('\nDone!');
})();
