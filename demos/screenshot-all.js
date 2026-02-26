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

const outputDir = '_screenshots/scoring-' + new Date().toISOString().split('T')[0];

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });
  
  const browser = await chromium.launch();
  
  for (const demo of demos) {
    const htmlPath = path.resolve(demo, 'index.html');
    if (!fs.existsSync(htmlPath)) {
      console.log(`Skipping ${demo} - no index.html`);
      continue;
    }
    
    // Desktop (1920x1080)
    const desktopPage = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await desktopPage.goto('file://' + htmlPath, { waitUntil: 'networkidle' });
    await desktopPage.waitForTimeout(1500); // Wait for animations
    await desktopPage.screenshot({ 
      path: `${outputDir}/${demo}-desktop.png`, 
      fullPage: true 
    });
    await desktopPage.close();
    console.log(`✓ ${demo} desktop`);
    
    // Mobile (390x844)
    const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobilePage.goto('file://' + htmlPath, { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(1500);
    await mobilePage.screenshot({ 
      path: `${outputDir}/${demo}-mobile.png`, 
      fullPage: true 
    });
    await mobilePage.close();
    console.log(`✓ ${demo} mobile`);
  }
  
  await browser.close();
  console.log(`\nScreenshots saved to ${outputDir}`);
}

main().catch(console.error);
