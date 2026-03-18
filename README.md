# 🪟 Cut List Pro

**Window & Door Material Cut List Calculator**
*Built by Matt McCann — Lake Superior RBA Region*

A Progressive Web App (PWA) for Renewal by Andersen technicians to quickly calculate material cut lists for window and door replacement jobs.

---

## Features

- **Windows** — Picture Frame & Traditional trim with automatic material calculations
- **Entry Doors & Patio Doors** — Casing, threshold, and jamb extension formulas
- **Smart Inputs** — Whole number + fraction dropdowns (no more decimal math)
- **12 Casing Profiles** — From 1x4 S4S to Colonial, Lakeside, Flat, and Ranch
- **Stain & Paint Selection** — Minwax, Sherwin-Williams, Zar, and RBA paint colors
- **Board Optimizer** — Bin-packing algorithm minimizes waste across 8', 10', and 12' stock
- **Same Trim Mode** — Set species/profile/finish once for the whole job
- **PDF & Email** — Generate reports and share via iPad share sheet
- **Works Offline** — Service worker caches the app for use on job sites
- **Save Jobs** — Jobs stored locally for easy reference

---

## Quick Deploy (Free)

### Option 1: Netlify (Easiest — 2 minutes)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop the project folder onto the page
3. Done! Share the URL with your team

### Option 2: GitHub Pages (Free)
1. Fork or clone this repository
2. Go to **Settings → Pages → Source: main branch**
3. Your app will be live at `https://yourusername.github.io/cutlist-pro`

---

## Install on iPad

1. Open the deployed URL in **Safari**
2. Tap the **Share button** (square with arrow)
3. Tap **"Add to Home Screen"**
4. Tap **Add** — the app appears on your home screen!

---

## Project Structure

```
cutlist-pro/
├── index.html      # Complete app (single file)
├── manifest.json   # PWA configuration
├── sw.js           # Service worker for offline support
├── icon-192.png    # App icon (192×192)
├── icon-512.png    # App icon (512×512)
├── LICENSE         # MIT License
└── README.md       # This file
```

---

## Updating

1. Edit `index.html`
2. Push to GitHub (or re-upload to Netlify)
3. To force cache refresh: increment `cutlist-pro-v1` → `cutlist-pro-v2` in `sw.js`

---

## Formulas Reference

### Windows (Traditional)
| Material | Length | Width | Thickness |
|----------|--------|-------|-----------|
| Side Jamb Ext. (×2) | H - 1¼" | JD - 2¾" | 5/8" |
| Head Jamb Ext. (×1) | W | JD - 2¾" | 5/8" |
| Sill / Stool (×1) | W + 10" | JD - 2¾" + 2" | 3/4" |
| Side Casing (×2) | H - 1" | Profile width | — |
| Head Casing (×1) | W | Profile width | — |
| Apron (×1) | W + 10" | Profile width | — |

### Windows (Picture Frame)
| Material | Length | Width | Thickness |
|----------|--------|-------|-----------|
| Side Jamb Ext. (×2) | H - 1¼" | JD - 2¾" | 5/8" |
| Top/Bottom Jamb Ext. (×2) | W | JD - 2¾" | 5/8" |
| Side Casing (×2) | H - 1" | Profile width | — |
| Top/Bottom Casing (×2) | W | Profile width | — |

### Entry Doors
| Material | Length |
|----------|--------|
| Side Casing (×2) | H + 6" |
| Head Casing (×1) | W + 8" |
| Threshold (×1) | W + 8" |

### Patio Doors
| Material | Length | Width | Thickness |
|----------|--------|-------|-----------|
| Side Jamb Ext. (×2) | H + 2" | JD - 4⁹⁄₁₆" | 5/8" |
| Head Jamb Ext. (×1) | W + 2" | JD - 4⁹⁄₁₆" | 5/8" |
| Sill Jamb Ext. (×1) | W + 2" | JD - 4⁹⁄₁₆" | 5/8" |
| Side Casing (×2) | H + 6" | Profile width | — |
| Head Casing (×1) | W + 8" | Profile width | — |
| Threshold (×1) | W + 8" | — | — |
