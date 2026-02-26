const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

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

async function main() {
  const browser = await chromium.launch({ headless: true });
  const outputDir = path.join(__dirname, 'scoring-round');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  for (const demo of demos) {
    for (const vp of viewports) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height }
      });
      const page = await context.newPage();
      
      const htmlPath = path.resolve(__dirname, '..', demo, 'index.html');
      console.log(`Screenshotting ${demo} at ${vp.name}...`);
      
      await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000); // Let animations settle
      
      const filename = `${demo}-${vp.name}.png`;
      await page.screenshot({ 
        path: path.join(outputDir, filename),
        fullPage: true 
      });
      
      await context.close();
    }
  }
  
  await browser.close();
  console.log('Done! Screenshots saved to scoring-round/');
}

main().catch(console.error);
