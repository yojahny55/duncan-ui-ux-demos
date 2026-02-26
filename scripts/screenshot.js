#!/usr/bin/env node
/**
 * Screenshot helper for MK Adventure demos
 * Usage: node scripts/screenshot.js <demo-name> [desktop|mobile|both]
 * Screenshots saved to /tmp/mk-screenshots/
 */
const pw = require('playwright');
const path = require('path');
const fs = require('fs');

const DEMOS_DIR = path.join(__dirname, '..', 'demos');
const OUTPUT_DIR = '/tmp/mk-screenshots';

const VIEWPORTS = {
  desktop: { width: 1920, height: 1080 },
  mobile: { width: 390, height: 844 }
};

async function screenshot(demoName, mode = 'both') {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  
  const demoPath = path.join(DEMOS_DIR, demoName, 'index.html');
  if (!fs.existsSync(demoPath)) {
    console.error(`Demo not found: ${demoPath}`);
    process.exit(1);
  }

  const browser = await pw.chromium.launch({ headless: true });
  const modes = mode === 'both' ? ['desktop', 'mobile'] : [mode];

  for (const m of modes) {
    const page = await browser.newPage({ viewport: VIEWPORTS[m] });
    await page.goto('file://' + demoPath);
    await page.waitForTimeout(3000); // Wait for animations/fonts
    
    const outPath = path.join(OUTPUT_DIR, `${demoName}-${m}.png`);
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(`${m}: ${outPath}`);
    await page.close();
  }

  await browser.close();
}

// CLI
const [,, demo, mode] = process.argv;
if (!demo) {
  // Screenshot all demos
  const demos = fs.readdirSync(DEMOS_DIR).filter(d => 
    fs.existsSync(path.join(DEMOS_DIR, d, 'index.html')) &&
    (d.includes('mkadventure') || d === 'demo-complete')
  );
  (async () => {
    for (const d of demos) {
      console.log(`\n=== ${d} ===`);
      await screenshot(d, mode || 'both');
    }
  })();
} else {
  screenshot(demo, mode || 'both');
}
