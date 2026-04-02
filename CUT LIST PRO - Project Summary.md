# Cut List Pro — Project Summary
### Renewal by Andersen | Lake Superior Region
**Last Updated:** April 2, 2026 | **Built by:** Matt McCann + Claude AI

---

## The Problem

Every RBA job requires a material cut list — a detailed breakdown of every jamb extension, casing piece, stool, apron, and threshold needed for installation. Today this is done by hand: the tech measurer reads the Installer Package PDF from Salesforce, manually calculates offsets for each window/door, figures out which stock boards to cut from, and fills out a Materials Checklist. The warehouse then reads this checklist to prep materials.

**This process takes 30-60 minutes per job and is error-prone.** A wrong offset or missed unit means the installer shows up on site with the wrong material.

## The Solution

**Cut List Pro** is a Progressive Web App that automates the entire workflow:

1. **Upload** a job file (rSuite JSON export or Installer Package PDF)
2. **Auto-populate** customer info, all window/door units with exact fractional dimensions, species, casing profile, and finish
3. **Calculate** every material piece with correct offsets (jamb extensions, casings, stools, aprons, thresholds)
4. **Optimize** board usage by bin-packing cuts into standard 8', 10', and 12' stock lengths
5. **Generate** a clean PDF report the warehouse can read and act on immediately

**90% of jobs are standard** — same Oak C115 casing, same stock. The app handles these in under 2 minutes. The other 10% (custom species, unusual profiles, manual overrides) are fully supported through manual editing.

---

## What's Built and Working

### Core Workflow
| Feature | Status | Notes |
|---------|--------|-------|
| JSON file import (rSuite DL Export) | **Working** | Auto-fills customer, address, all units with exact sizes |
| PDF file import (Installer Package) | **Working** | Regex parser, less reliable than JSON |
| Manual unit entry | **Working** | Full form for each unit with fraction inputs |
| Material calculations | **Working** | All formulas for Windows (PF & Traditional), Entry Doors, Patio Doors |
| Board optimizer | **Working** | Bin-packing into 8'/10'/12', tries 4 strategies, picks lowest waste |
| PDF report generation | **Working** | Per-unit cut list, board summary, prefinish notes |
| Email/share report | **Working** | Native share API + mailto fallback |
| Save/load jobs | **Working** | localStorage, max 50 jobs |
| Offline support | **Working** | Service worker with network-first HTML, cache-first assets |

### Editor Sections (in order)
1. **Import Job File** — Upload .json or .pdf, auto-fills everything
2. **Job Info** — Customer, address, PO#, tech measurer, date
3. **Trim Selection** — Global (same for all units) or per-unit species/casing/finish
4. **Units** — Expandable accordion per unit with dimensions, trim overrides, custom materials
5. **Board Summary** — Live preview of optimized board counts
6. **Prefinishing Notes** — Job-level + per-unit override text
7. **Extra Materials** — Coil colors, custom items
8. **Generate Report** — Creates printable/PDF cut list

### Home Screen Tools
| Tool | Purpose |
|------|---------|
| **Available Lumber** | Warehouse manages what's in stock — casing profiles, jamb stock, stains, paints, other items. Each profile has species & length toggles. Add/delete custom items. |
| **Offsets** | Editable calculation formulas organized by unit type. Warehouse can adjust any offset value and it changes how all future jobs calculate. Reset to defaults per section. |

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
5. Customer name, address, and all unit dimensions are filled in automatically
6. Answer "Do all units have the same trim?" — Yes for standard jobs
7. Fill in jamb depths (the only measurement not in the export file)
8. Check the Board Summary at the bottom — it shows exactly how many 8'/10'/12' boards are needed
9. Add prefinishing notes if needed
10. Add extra materials (coil, custom items) if needed
11. Tap **Generate Report** to see the full cut list
12. **Save PDF** or **Email** the report to the warehouse

### For the Warehouse

1. Open the same URL on any device
2. Tap **Available Lumber** to manage what's in stock
   - Each casing profile and jamb stock size has a **Species x Length grid** — toggle individual combinations (e.g. Oak C115 in 10' = yes, Pine C115 in 12' = no)
   - Add/delete custom casing profiles, jamb stock sizes, stains, paints, or other items
3. Tap **Offsets** to view or adjust calculation formulas
   - Change any offset value to match real-world requirements
   - Reset to defaults if needed
4. Open **Saved Jobs** to review or edit any submitted job
5. Read the generated PDF report — each unit's cut list is clearly laid out

### For Custom/Non-Standard Jobs

- Override any auto-populated value by editing the field directly
- Use "No — Different per unit" for jobs with mixed trim styles
- Check the **Custom** checkbox next to Casing Profile or Stain Color to type anything instead of using the dropdown
- Add manual materials per unit using "+ Add Extra Material" inside each unit card
- Add job-level extra materials in section 6

---

## Technical Architecture

```
Single HTML file (pwa-app/index.html)
├── React 18.2 (CDN) + Babel standalone (in-browser JSX)
├── pdf.js 3.11 (CDN) for PDF text extraction
├── html2canvas + jsPDF (CDN) for report PDF generation
├── Service Worker (sw.js) — network-first HTML, cache-first assets
└── localStorage for all persistence (jobs, offsets, lumber catalog)

Hosted on Netlify (auto-deploy from GitHub)
├── GitHub repo: matt17mccann/material-list
├── Site: https://strong-liger-980e1f.netlify.app
└── Netlify Functions directory (kept but unused — was for Vision API)
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

### Phase 2 — Next Up
- [ ] **Shared job storage across all users** — Move from localStorage to a backend (Netlify Blobs or similar) so the warehouse can pull up and edit any job submitted by any tech measurer
- [ ] **Lumber catalog drives editor dropdowns** — When a species or profile is toggled off in Available Lumber, hide it from the editor dropdowns
- [ ] **Board optimizer respects catalog** — Only suggest board lengths that are marked available
- [ ] **Auto-save** — Save job state on every change, not just manual Save button
- [ ] **Fraction display in preview modal** — Show "95-7/8" instead of "95-0.875" in the unit preview

### Phase 3 — Future
- [ ] **Photo attachment per unit** — Camera capture on iPad, attach to unit for warehouse reference
- [ ] **Job status tracking** — "Measured" → "Material Prepped" → "Prefinished" → "Ready for Install"
- [ ] **Push notifications** — Alert warehouse when new job is submitted
- [ ] **Barcode/QR labels** — Generate labels for each cut piece
- [ ] **Analytics dashboard** — Board usage, waste tracking, jobs per week

---

## File Structure

```
/Users/matthewmccann/Desktop/material list app/
├── pwa-app/
│   ├── index.html          # The entire app (single file, ~2200 lines)
│   ├── sw.js               # Service worker (network-first HTML)
│   ├── manifest.json       # PWA manifest
│   ├── icon-192.png        # App icon
│   ├── icon-512.png        # App icon (large)
│   └── netlify/
│       ├── functions/
│       │   └── parse-pdf.js  # Serverless function (kept, unused)
│       └── netlify.toml      # Netlify config
├── .claude/
│   └── launch.json         # Dev server config
└── CUT LIST PRO - Project Summary.md  # This file
```

## localStorage Keys

| Key | Purpose |
|-----|---------|
| `cutlist_jobs` | Array of saved jobs (max 50) |
| `cutlist_offsets` | Custom material calculation offsets |
| `cutlist_lumber_catalog` | Available lumber inventory (profiles, stock, finishes) |

---

## Contact

**Matt McCann** — Tech Measurer, RBA Lake Superior Region
Built with Claude AI (Anthropic) via Claude Code

**Live URL:** https://strong-liger-980e1f.netlify.app
**GitHub:** https://github.com/matt17mccann/material-list
