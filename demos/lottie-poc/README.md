# LottieForge POC — AI Image to Lottie Animation

Proof of concept demonstrating AI-powered conversion of static images to animated Lottie files.

## What This POC Does

1. **Analyzes** the input image (office collaboration illustration)
2. **Identifies** animatable elements (people, plants, objects)
3. **Generates** valid Lottie JSON with appropriate animations
4. **Previews** the result with playback controls

## Demo

```bash
cd /home/yojahny/clawd/projects/lottie-poc
npx serve .
# Open http://localhost:3000
```

Or just open `index.html` in a browser (some browsers need a local server for JSON fetch).

## Generated Animations

| Element | Animation Type | Duration |
|---------|---------------|----------|
| Plants (left/right) | Gentle sway rotation | 3s loop |
| Standing person | Subtle vertical bounce | 3s loop |
| Magnifying glass | Rotation oscillation | 3s loop |
| Speech bubble | Scale pulse | 3s loop |
| Pie chart | 360° rotation | 2s loop |

## How It Works (Current POC)

```
Image → Manual Vision Analysis → Hand-crafted Lottie JSON
```

## How It Would Work (Full Implementation)

```
Image
  ↓
┌─────────────────────────────────┐
│  1. Vision AI (Claude/GPT-4V)   │
│  - Identify elements            │
│  - Describe positions/colors    │
│  - Suggest animations           │
└─────────────────────────────────┘
  ↓
┌─────────────────────────────────┐
│  2. Vectorization               │
│  - recraft.ai / vectorizer.ai   │
│  - OR LLM-generated SVG paths   │
└─────────────────────────────────┘
  ↓
┌─────────────────────────────────┐
│  3. Lottie Generation (LLM)     │
│  - Convert SVG to Lottie layers │
│  - Add keyframe animations      │
│  - Output valid JSON            │
└─────────────────────────────────┘
  ↓
Animated Lottie JSON
```

## API Architecture (Future)

```
POST /api/generate
Content-Type: multipart/form-data

{
  "image": <file>,
  "style": "subtle" | "playful" | "professional",
  "duration": 3,
  "loop": true
}

Response:
{
  "lottie": { ... },
  "elements_detected": ["person", "plant", "laptop", ...],
  "animations_applied": ["sway", "bounce", "pulse", ...],
  "credits_used": 1
}
```

## Tech Stack (Recommended)

- **Frontend:** Next.js + lottie-react
- **Vision AI:** Claude 3.5 Sonnet (best for structured output)
- **Vectorization:** Vectorizer.ai API or Recraft.ai
- **LLM for Lottie:** Claude/GPT-4 (can output valid JSON reliably)
- **Preview:** lottie-web

## Lottie JSON Structure (Quick Reference)

```json
{
  "v": "5.7.4",           // Lottie version
  "fr": 30,               // Frame rate
  "ip": 0,                // In point
  "op": 90,               // Out point (90 frames = 3s at 30fps)
  "w": 800,               // Width
  "h": 600,               // Height
  "layers": [
    {
      "ty": 4,            // Shape layer
      "nm": "Layer Name",
      "ks": {
        "p": {...},       // Position (can be animated)
        "s": {...},       // Scale
        "r": {...},       // Rotation
        "o": {...}        // Opacity
      },
      "shapes": [...]     // SVG-like shape definitions
    }
  ]
}
```

## Next Steps

1. [ ] Add image upload functionality
2. [ ] Integrate Claude Vision API for element detection
3. [ ] Add vectorization step (or simplified shape generation)
4. [ ] Build prompt engineering for reliable Lottie JSON output
5. [ ] Add style presets (subtle, playful, professional)
6. [ ] Implement credit system

## Files

- `index.html` — Demo preview page
- `lottie-output.json` — Generated Lottie animation
- `README.md` — This file

---

*Built as a POC for the LottieForge idea*
