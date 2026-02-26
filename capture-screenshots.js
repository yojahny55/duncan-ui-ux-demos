const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const demos = [
  { name: 'demo-complete', dir: 'demo-complete' },
  { name: 'mkadventure-v1', dir: 'mkadventure' },
  { name: 'mkadventure-v2-bento', dir: 'mkadventure-v2-bento' },
  { name: 'mkadventure-v3-motion', dir: 'mkadventure-v3-motion' },
  { name: 'mkadventure-v4-warm', dir: 'mkadventure-v4-warm' },
  { name: 'mkadventure-v5-bold', dir: 'mkadventure-v5-bold' }
];

const baseDir = '/home/yojahny/clawd/projects/duncan-ui-ux-demos/demos';
const outDir = '/home/yojahny/clawd/projects/duncan-ui-ux-demos/screenshots/scoring-' + new Date().toISOString().slice(0,10).replace(/-/g,'');

async function captureScreenshots() {
  fs.mkdirSync(outDir, { recursive: true });
  
  const browser = await chromium.launch({ headless: true });
  
  for (const demo of demos) {
    const htmlPath = path.join(baseDir, demo.dir, 'index.html');
    
    if (!fs.existsSync(htmlPath)) {
      console.log(`Skipping ${demo.name} - no index.html found`);
      continue;
    }
    
    console.log(`Capturing ${demo.name}...`);
    
    // Desktop (1920x1080)
    const desktopPage = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await desktopPage.goto(`file://${htmlPath}`, { waitUntil: 'networkidle', timeout: 30000 });
    await desktopPage.waitForTimeout(1000); // Wait for animations
    await desktopPage.screenshot({ 
      path: path.join(outDir, `${demo.name}-desktop.png`), 
      fullPage: true 
    });
    await desktopPage.close();
    
    // Mobile (390x844 iPhone 14 Pro)
    const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobilePage.goto(`file://${htmlPath}`, { waitUntil: 'networkidle', timeout: 30000 });
    await mobilePage.waitForTimeout(1000);
    await mobilePage.screenshot({ 
      path: path.join(outDir, `${demo.name}-mobile.png`), 
      fullPage: true 
    });
    await mobilePage.close();
    
    console.log(`  ✓ ${demo.name} captured`);
  }
  
  await browser.close();
  console.log(`\nAll screenshots saved to ${outDir}`);
}

captureScreenshots().catch(console.error);
