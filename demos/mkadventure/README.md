# MK Adventure - Demo Website

**Client:** Kirian (MK Adventure LLC)  
**Location:** Tampa, FL  
**Date:** February 24, 2026

## Project Overview

A complete redesign and information architecture restructure for MK Adventure, transforming from a single-service travel agency website to a **Multiservice Business Hub**.

## The Problem

Previous developers built a travel-only website, completely ignoring 4 out of 5 services:
- ❌ Current site: 100% travel-focused
- ❌ No mention of: Taxes, Notary, Shipping, Business Formation
- ❌ Confusing positioning and information architecture

## The Solution

A unified multiservice hub that clearly communicates all 5 services:

1. **Agencia de Viajes** - Flights, cruises, hotels, packages
2. **Envíos a Cuba** - Package shipping, tracking, competitive rates
3. **Preparación de Impuestos** - Personal and business tax prep, ITIN
4. **Servicios Notariales** - Document certification, legal powers
5. **Formación de Empresas** - LLC/Corp registration, EIN, licenses

## Key Features

### Information Architecture
- Clear hero with all 5 services visible immediately
- Individual service cards with features and CTAs
- "Why Choose Us" section emphasizing the multiservice advantage
- Testimonials spanning multiple services
- Blog section for content marketing
- Contact form with service selection

### Design Decisions
- **Color Palette:** Navy blue (trust) + Orange accent (adventure)
- **Service Colors:** Each service has a distinct color for recognition
- **Typography:** Inter + Plus Jakarta Sans (modern, professional)
- **Mobile-first:** Fully responsive design
- **Accessibility:** WCAG AA compliant color contrast

### Copy Strategy (AIDA Framework)
- **Attention:** "Un Solo Lugar para Todas Tus Necesidades"
- **Interest:** 5 clear service blocks
- **Desire:** Stats, testimonials, benefits
- **Action:** Multiple CTAs, contact form, WhatsApp float

## Files

```
mkadventure-demo/
├── index.html     # Main landing page
├── style.css      # Modern CSS with variables
├── app.js         # Interactivity (nav, forms, animations)
└── README.md      # This file
```

## How to View

Open `index.html` in any browser. No build step required.

For live server:
```bash
cd ~/clawd/projects/mkadventure-demo
npx serve .
# or
python -m http.server 8000
```

## Next Steps

1. **Client Review:** Present demo, gather feedback
2. **Content:** Get real photos, testimonials, exact pricing
3. **Pages:** Build out individual service pages
4. **Blog:** Set up CMS (WordPress/Ghost) or static blog
5. **Forms:** Connect to email service (Formspree, Netlify Forms)
6. **SEO:** Add structured data, optimize meta tags
7. **Deploy:** Set up on hosting (Vercel, Netlify, or existing hosting)

## Competitive Differentiation

| Aspect | Competitors | MK Adventure (New) |
|--------|-------------|-------------------|
| Services shown | 1-2 | All 5 clearly |
| Design | Dated | Modern, premium |
| Mobile | Basic | Responsive |
| IA | Confusing | Clear hierarchy |
| Trust signals | Minimal | Stats, testimonials, badges |
| CTAs | Weak | Strategic placement |

## Credits

- **Developer:** Yojahny Chavez
- **Design System:** UI/UX Pro Max skill
- **Copy Framework:** AIDA + PAS
- **Icons:** Lucide
- **Fonts:** Google Fonts (Inter, Plus Jakarta Sans)
