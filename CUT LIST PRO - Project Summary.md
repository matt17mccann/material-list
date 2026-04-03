# Cut List Pro — Project Summary
### Renewal by Andersen | Lake Superior Region
**Last Updated:** April 3, 2026 | **Built by:** Matt McCann + Claude AI

---

## The Problem

Every RBA job requires a material cut list — a detailed breakdown of every jamb extension, casing piece, stool, apron, and threshold needed for installation. Today this is done by hand: the tech measurer reads the Installer Package PDF from Salesforce, manually calculates offsets for each window/door, figures out which stock boards to cut from, and fills out a Materials Checklist. The warehouse then reads this checklist to prep materials.

**This process takes 30-60 minutes per job and is error-prone.** A wrong offset or missed unit means the installer shows up on site with the wrong material.

## The Solution

**Cut List Pro** is a Progressive Web App that automates the entire workflow:

1. **Upload** a job file (rSuite JSON export or Installer Package PDF)
2. **Auto-populate** customer info, all window/door units with exact fractional dimensions, species, casing profile, and finish
3. **Calculate** every material piece with correct offsets (jamb extensions, casings, stools, aprons, thresholds)
4. **Optimize** board usage by bin-packing cuts into available stock lengths
5. **Generate** a clean PDF report the warehouse can read and act on immediately
6. **Share across all devices** — tech measurers and warehouse see the same jobs, catalog, and offsets in real time

**90% of jobs are standard** — same Oak C115 casing, same stock. The app handles these in under 2 minutes. The other 10% (custom species, unusual profiles, manual overrides) are fully supported through manual editing.

---

## What's Built and Working

### Core Workflow
| Feature | Status | Notes |
|---------|--------|-------|
| JSON file import (rSuite DL Export) | **Working** | Auto-fills customer, address, trim, stain/finish, all units with exact sizes |
| PDF file import (Installer Package) | **Working** | Regex parser + Claude API fallback |
| Manual unit entry | **Working** | Full form for each unit with fraction inputs |
| Material calculations | **Working** | All formulas for Windows (PF & Traditional), Entry Doors, Patio Doors |
| Board optimizer | **Working** | Bin-packing, catalog-aware (only suggests in-stock lengths) |
| PDF report generation | **Working** | Per-unit cut list, board summary, prefinish notes |
| Email/share report | **Working** | Native share API + mailto fallback |
| Shared job storage | **Working** | Netlify Blobs — all devices read/write to same store |
| Shared lumber catalog | **Working** | Warehouse changes visible to all tech measurers |
| Shared offsets | **Working** | Offset changes apply to all future calculations |
| Offline support | **Working** | Service worker + localStorage fallback when offline |

### Editor Sections (in order)
1. **Import Job File** — Upload .json or .pdf, auto-fills everything
2. **Job Info** — Customer, address, PO#, tech measurer, date
3. **Trim Selection** — Global (same for all units) or per-unit species/casing/finish/jamb depth
4. **Units** — Expandable accordion per unit with dimensions, trim overrides, custom materials
5. **Board Summary** — Live preview of optimized board counts + "Recalculate Boards" button
6. **Prefinishing Notes** — Job-level + per-unit override text
7. **Extra Materials** — Coil colors, custom items
8. **Save Job + Generate Report** — Save to shared storage and/or create printable PDF

### Saved Jobs View
| Feature | Notes |
|---------|-------|
| **Quick View tab** (default) | Shows contact info — tap to view report/PDF directly |
| **Edit Jobs tab** | Tap to open job in full editor |
| **Search bar** | Filter by customer name, address, or PO# |
| **Star/Priority flags** | Tap star to flag important jobs — starred float to top |
| **Job status tracking** | In Progress → Ready to Install → Complete |

### Home Screen Tools
| Tool | Purpose |
|------|---------|
| **Available Lumber** | Warehouse manages what's in stock — collapsible profiles with species x length grids. Add/delete custom items. Changes sync to all devices. |
| **Offsets** | Editable calculation formulas organized by unit type. Changes sync to all devices. |

### Material Calculation Offsets (Current Defaults)

**Windows — Picture Frame:**
- Side Jamb: H - 1.25" | Top/Bottom Jamb: W | Jamb Width: JD - 2.75"
- Side Casing: H - 1" | Top/Bottom Casing: W

**Windows — Traditional:**
- Side Jamb: H - 1.25" | Head Jamb: W | Jamb Width: JD - 2.75"
- Sill/Stool: W + 10" (width: JD - 0.75") | Apron: W + 10"
- Side Casing: H - 1" | Head Casing: W

**Entry Doors:**
- Side Casing: H + 6" | Head Casing: W + 8" | Threshold: W + 8"

**Patio Doors:**
- Side Jamb: H + 2" | Head/Sill Jamb: W + 2" | Jamb Width: JD - 4.5625"
- Side Casing: H + 6" | Head Casing: W + 8" | Threshold: W + 8"

---

## How to Use

### For Tech Measurers (Field iPad)

1. Open https://strong-liger-980e1f.netlify.app
2. Tap **+ New Job**
3. Tap **Upload File** at the top — select the rSuite DL Export (.json) from your iPad
4. Review the extracted units in the preview modal, tap **Add Units**
5. Customer name, address, species, casing, stain are filled in automatically
6. Answer "Do all units have the same trim?" — Yes for standard jobs
7. Fill in the global jamb depth (sets all units at once)
8. Adjust any individual unit's jamb depth if different
9. Check the Board Summary at the bottom — shows exactly how many boards are needed
10. Add prefinishing notes if needed
11. Add extra materials (coil, custom items) if needed
12. Tap **Save Job** then **Generate Report** to see the full cut list
13. **Save PDF** or **Email** the report to the warehouse

### For the Warehouse

1. Open the same URL on any device
2. Go to **Saved Jobs** — all jobs from all tech measurers are visible
3. **Quick View** tab: tap any job to see its PDF report immediately
4. **Edit Jobs** tab: tap to open and modify any job
5. Star priority jobs — they float to the top
6. Update status: **In Progress** → **Ready to Install** → **Complete**
7. Use **Search** to find jobs by name, address, or PO#
8. Tap **Recalculate Boards** on any job to re-run the optimizer with current catalog
9. Tap **Available Lumber** to manage what's in stock
   - Each casing profile and jamb stock has a collapsible **Species x Length grid**
   - Toggle individual combinations on/off
   - Unavailable materials are hidden from tech measurer dropdowns
10. Tap **Offsets** to view or adjust calculation formulas

### For Custom/Non-Standard Jobs

- Override any auto-populated value by editing the field directly
- Use "No — Different per unit" for jobs with mixed trim styles
- Check the **Custom** checkbox next to Casing Profile or Stain Color to type anything
- Add manual materials per unit using "+ Add Extra Material" inside each unit card
- Add job-level extra materials in section 7

---

## Technical Architecture

```
Single HTML file (pwa-app/index.html)
├── React 18.2 (CDN) + Babel standalone (in-browser JSX)
├── pdf.js 3.11 (CDN) for PDF text extraction
├── html2canvas + jsPDF (CDN) for report PDF generation
├── Service Worker (sw.js) — network-first HTML, cache-first assets, no-cache API
└── Netlify Blobs for shared persistence (jobs, offsets, lumber catalog)
    └── localStorage as offline fallback

Hosted on Netlify (auto-deploy from GitHub)
├── GitHub repo: matt17mccann/material-list
├── Site: https://strong-liger-980e1f.netlify.app
├── Netlify Functions:
│   ├── /api/jobs — CRUD for shared job storage
│   ├── /api/catalog — GET/PUT shared lumber catalog
│   ├── /api/offsets — GET/PUT shared calculation offsets
│   └── /api/parse-pdf — Claude API fallback for PDF extraction
└── Netlify Blobs (3 stores: jobs, catalog, offsets)
```

---

## Roadmap

### Phase 1 — DONE
- [x] Manual unit entry with material calculations
- [x] Board optimizer (bin-packing algorithm)
- [x] PDF report generation + email
- [x] rSuite JSON file import (auto-populate everything)
- [x] PDF Installer Package import (regex parser)
- [x] RBA design system (dark topbar, green accents, DM Sans font)
- [x] Available Lumber catalog with add/delete
- [x] Editable calculation offsets
- [x] Prefinishing notes (job-level + per-unit)
- [x] Extra materials section (coils, custom items)
- [x] Custom casing profile and finish text entry
- [x] Saved jobs (localStorage)

### Phase 2 — DONE
- [x] **Shared job storage across all users** — Netlify Blobs with localStorage offline fallback
- [x] **Shared lumber catalog and offsets** — Warehouse changes visible to all devices
- [x] **Lumber catalog drives editor dropdowns** — Unavailable species/profiles disabled
- [x] **Board optimizer respects catalog** — Only suggests in-stock lengths
- [x] **Recalculate Boards button** — Pulls latest catalog and re-runs optimizer
- [x] **Saved Jobs redesign** — Quick View + Edit tabs, search, star/priority, status tracking
- [x] **Global jamb depth** — Set once in Trim Selection, fills all units
- [x] **Stain auto-fill from import** — Fuzzy match for stain names from JSON
- [x] **Collapsible lumber catalog** — Space-saving accordions with availability summaries
- [x] **Online/offline indicator** — Green/yellow dot showing connection status
- [x] **New Cut List Pro app icon** — Boards + checkmarks design

### Phase 3 — Next Up
- [ ] **Auto-save** — Save job state on every change, not just manual Save button
- [ ] **Fraction display in preview modal** — Show "95-7/8" instead of "95-0.875"
- [ ] **Photo attachment per unit** — Camera capture on iPad for warehouse reference
- [ ] **Push notifications** — Alert warehouse when new job is submitted

### Phase 4 — Future
- [ ] **Inventory tracking with auto-reorder** — Track quantities on hand, deduct when jobs are prepped, email supplier when below threshold
- [ ] **Barcode/QR labels** — Generate labels for each cut piece
- [ ] **Analytics dashboard** — Board usage, waste tracking, jobs per week
- [ ] **Authentication** — Simple PIN or team login for multi-team support

---

## File Structure

```
/Users/matthewmccann/Desktop/material list app/
├── .gitignore              # Excludes node_modules, .netlify
├── pwa-app/
│   ├── index.html          # The entire app (single file, ~2800 lines)
│   ├── sw.js               # Service worker (v7 — network-first HTML, no-cache API)
│   ├── manifest.json       # PWA manifest
│   ├── icon.svg            # App icon source (SVG)
│   ├── icon-192.png        # App icon (PWA)
│   ├── icon-512.png        # App icon (large, PWA)
│   ├── package.json        # Dependencies (@netlify/blobs)
│   ├── netlify.toml        # Netlify build config
│   └── netlify/
│       └── functions/
│           ├── jobs.mts     # /api/jobs — shared job CRUD
│           ├── catalog.mts  # /api/catalog — shared lumber catalog
│           ├── offsets.mts  # /api/offsets — shared calculation offsets
│           └── parse-pdf.mts # /api/parse-pdf — Claude API PDF extraction
├── .claude/
│   └── launch.json         # Dev server config
├── CUT LIST PRO - Project Summary.md   # This file
└── CUT LIST PRO - Next Steps.md        # Vision & future plans
```

## Data Storage

### Netlify Blobs (Primary — shared across all devices)
| Store | Key Pattern | Purpose |
|-------|-------------|---------|
| `jobs` | Job ID | Full job data (job info, units, status, starred) |
| `catalog` | `current` | Lumber catalog (profiles, stock, stains, paints, availability grids) |
| `offsets` | `current` | Material calculation offsets |

### localStorage (Offline fallback)
| Key | Purpose |
|-----|---------|
| `cutlist_jobs` | Cached copy of jobs from API |
| `cutlist_offsets` | Cached copy of offsets from API |
| `cutlist_lumber_catalog` | Cached copy of catalog from API |

---

## Contact

**Matt McCann** — Tech Measurer, RBA Lake Superior Region
Built with Claude AI (Anthropic) via Claude Code

**Live URL:** https://strong-liger-980e1f.netlify.app
**GitHub:** https://github.com/matt17mccann/material-list
