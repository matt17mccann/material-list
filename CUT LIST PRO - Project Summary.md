# RBA Material List — Project Summary
### Renewal by Andersen | Lake Superior Region
**Last Updated:** April 8, 2026 (v2.2) | **Built by:** Matt McCann + Claude AI

---

## The Problem

Every RBA job requires a material cut list — a detailed breakdown of every jamb extension, casing piece, stool, apron, and threshold needed for installation. Today this is done by hand: the tech measurer reads the Installer Package PDF from Salesforce, manually calculates offsets for each window/door, figures out which stock boards to cut from, and fills out a Materials Checklist. The warehouse then reads this checklist to prep materials.

**This process takes 30-60 minutes per job and is error-prone.** A wrong offset or missed unit means the installer shows up on site with the wrong material.

## The Solution

**RBA Material List** is a Progressive Web App that automates the entire workflow:

1. **Upload** a job file (rSuite JSON export, Installer Package PDF, or ZIP containing JSON)
2. **Auto-populate** customer info, all window/door units with exact fractional dimensions, species, casing profile, and finish
3. **Calculate** every material piece with correct offsets (jamb extensions, casings, stools, aprons, thresholds)
4. **Optimize** board usage by bin-packing cuts into available stock lengths (whole-job or per-unit for grain matching)
5. **Generate** a clean PDF report the warehouse can read and act on immediately
6. **Share across all devices** — tech measurers and warehouse see the same jobs, catalog, and offsets in real time

**90% of jobs are standard** — same Oak C115 casing, same stock. The app handles these in under 2 minutes. The other 10% (custom species, unusual profiles, custom trim overrides) are fully supported.

---

## What's Built and Working

### Core Workflow
| Feature | Status | Notes |
|---------|--------|-------|
| JSON file import (rSuite DL Export) | **Working** | Auto-fills customer, address, trim, stain/finish, all units with exact sizes |
| ZIP file import | **Working** | Extracts .json from ZIP for iPad users who can't unzip |
| PDF file import (Installer Package) | **Working** | Regex parser + Claude API fallback |
| Manual unit entry | **Working** | Full form for each unit with fraction inputs |
| Material calculations | **Working** | All formulas for Windows (PF/Traditional/Stops), Entry Doors, Patio Doors |
| Board optimizer | **Working** | Bin-packing, catalog-aware, whole-job or per-unit grain matching mode |
| PDF report generation | **Working** | Materials Checklist + Detailed Cut List views |
| Print PDF | **Working** | Opens generated PDF in new tab for printing |
| Share report | **Working** | Native share API with PDF attached + mailto fallback to nina@northlandrba.com |
| Shared job storage | **Working** | Netlify Blobs — all devices read/write to same store |
| Shared lumber catalog | **Working** | Warehouse changes visible to all tech measurers |
| Shared offsets | **Working** | Editable offset formulas + configurable board waste |
| Offline support | **Working** | Service worker + localStorage fallback when offline |

### Editor Sections (in order)
1. **Import Job File** — Upload .json, .zip, or .pdf, auto-fills everything
2. **Job Info** — Customer, address, PO#, tech measurer, date
3. **Trim Selection** — Trim Style (Picture Frame/Traditional/Stops), Casing Species + Profile, Jamb Species + Material, Finish Type + Color with green highlight banner, Jamb Depth. Custom Trim toggle for complex jobs. All with Custom checkbox for free-text entry. All dropdowns include "None" option to exclude material from the list.
4. **Units** — Expandable accordion per unit. Each unit has: dimensions, trim style, casing species/profile, jamb species/material, finish, threshold (doors), custom trim overrides, manual materials. All fields have Custom checkbox.
5. **Extra Boards** — Add any board type (Casing/Jamb/Stop/Other) with species, profile, stock length, and notes. Appear as real numbered boards in Board Summary.
6. **Prefinish / Warehouse Notes** — Always-visible textarea with stain auto-fill + "Any Windows needing PF?" checkbox
7. **Extra Materials** — Coil quick-tap color buttons, custom text input with Add button. Per-unit extra materials auto-populate to this section. Clean label + qty layout.
8. **Bay Material** — Collapsible section for Soffit, Plywood, Pink Foam, custom items
9. **Board Summary** — Live preview of optimized board counts, per-unit toggle, recalculate button

### Trim System
| Feature | Notes |
|---------|-------|
| **Trim Style** | Picture Frame, Traditional, or Stops — set globally, override per unit |
| **Stops** | 1x4 Stop, Colonial 3-1/4" Stop, Eased Edge 1-1/4" Stop with All Sides, Sides and Top, or None coverage |
| **Casing Species + Profile** | Separate fields, both with Custom checkbox for free-text |
| **Jamb Species + Material** | Jamb species defaults to casing species but overridable. Material auto-calculates from depth but overridable (5/8x4, 5/8x6, 3/4x8, 3/4x10, 3/4x12) |
| **Threshold** | Pre-made product dropdown: None, 1-1/4" or 1x4, Oak or Maple, 8' or 10'. Custom checkbox. "None" excludes from material list entirely. Shows as line item on checklist, not cut lumber. |
| **Custom Trim Mode** | Orange toggle for complex jobs. Per-unit overrides for any piece (Side Casing, Top Casing, Apron, etc.) with independent species, profile, and quantity. Overrides replace auto-calculated pieces. |

### Jamb Stock
| Label | Width | Thickness |
|-------|-------|-----------|
| 5/8x4 | 3.5" | 5/8" |
| 5/8x6 | 5.5" | 5/8" |
| 3/4x8 | 7.25" | 3/4" |
| 3/4x10 | 9.25" | 3/4" |
| 3/4x12 | 11.25" | 3/4" |

### Report / PDF
| Feature | Notes |
|---------|-------|
| **Job details upper-right** | Name, address, PO#, tech — positioned where installers expect them |
| **Stain highlight** | RBA green (25% opacity) bar in Prefinish section showing finish type + color |
| **PDF filename** | Auto-named: LastName Material List (PO#).pdf |
| **Email subject** | Auto-filled: LastName PO# Material List |
| **PDF size** | Optimized with JPEG compression at 75% quality, scale 1.5x |
| **Category separators** | Thick lines between coils/thresholds, jamb material, and casing |
| **Per-unit optimization note** | Shows when grain matching mode is active |
| **Thresholds as line items** | Pre-made products listed like coils, not as cut boards |
| **Extra boards numbered** | Extra boards appear with real board numbers and "(Extra)" label |

### Available Material Catalog
| Section | Notes |
|---------|-------|
| **Casing Profiles** | Species x length availability grid, add/delete custom profiles |
| **Jamb Stock** | Same grid format |
| **Stop Profiles** | 1x4 Stop, Colonial 3-1/4" Stop, Eased Edge 1-1/4" Stop |
| **Coil Colors** | Default colors + custom, alphabetically sorted |
| **Bay Material Items** | Soffit, Plywood, Pink Foam + custom, alphabetically sorted |
| **Stain Colors** | All built-in + custom, alphabetically sorted |
| **Paint Colors** | All built-in + custom, alphabetically sorted |
| **Other Items** | Custom items, alphabetically sorted |

### Saved Jobs & Submitted Jobs
| Feature | Notes |
|---------|-------|
| **Separate lists** | Home screen has "Saved Jobs" (drafts) and "Submitted Jobs" (finalized) with counts |
| **Sort bar** | Sort by Newest, Oldest, or Last Name |
| **Search bar** | Filter by customer name, address, or PO# |
| **Star/Priority flags** | Tap star to flag important jobs — starred float to top |
| **Job Complete button** | Mark jobs as complete — they sink to the bottom with green styling |
| **Completed section divider** | Green "COMPLETED" divider line separates active from completed jobs |
| **Click to view report** | All job cards open directly to the report/PDF view |
| **EDIT JOB from report** | Edit button in the report toolbar to jump back to editor |
| **Re-Submit** | Editing a previously submitted job shows "Re-Submit Job" instead of "Submit Job" |

---

## How to Use

### For Tech Measurers (Field iPad)

1. Open https://rba-material-list.netlify.app
2. Tap **+ New Job**
3. Tap **Upload File** at the top — select the rSuite DL Export (.json or .zip) from your iPad
4. Review the extracted units in the preview modal, tap **Add Units**
5. Customer name, address, species, casing, stain are filled in automatically
6. Set the **Trim Style** (Picture Frame/Traditional/Stops) in Trim Selection
7. Verify **Casing Species**, **Casing Profile**, **Jamb Species**, and **Finish**
8. Fill in the **Jamb Depth** (sets all units at once, Jamb Material auto-calculates)
9. Override any individual unit's trim if different
10. For complex jobs, toggle **Custom Trim** to add per-piece overrides
11. Add **Extra Boards** if needed (extra casing, jamb, or other boards)
12. Fill in **Prefinish / Warehouse Notes** and check **Windows needing PF** if applicable
13. Add extra materials (coils, bay material, custom items) as needed
14. Check the **Board Summary** — shows exactly how many boards are needed
15. Tap **Submit Job** to send to the warehouse, or **Save Progress** to save as draft

### For the Warehouse

1. Open the same URL on any device
2. Go to **Submitted Jobs** — all finalized jobs from tech measurers are visible
3. Tap any job card to see its PDF report immediately
4. The **Prefinish / Warehouse Notes** section highlights the stain selection in green
5. Tap **EDIT JOB** in the report toolbar to modify any job
6. Star priority jobs — they float to the top
7. Tap **Job Complete** when materials are prepped
8. Use **Available Material** to manage stock:
   - Casing Profiles, Jamb Stock, Stop Profiles with species x length grids
   - Coil Colors, Bay Material Items, Stain/Paint Colors
   - All lists sorted alphabetically
9. Use **Offsets** to adjust calculation formulas and board waste

---

## Technical Architecture

```
Single HTML file (pwa-app/index.html ~3100 lines)
+-- React 18.2 (CDN) + Babel standalone (in-browser JSX)
+-- pdf.js 3.11 (CDN) for PDF text extraction
+-- JSZip 3.10 (CDN) for ZIP file extraction
+-- html2canvas + jsPDF (CDN) for report PDF generation
+-- Service Worker (sw.js v9) -- network-first HTML, cache-first assets, no-cache API
+-- Netlify Blobs for shared persistence (jobs, offsets, lumber catalog)
    +-- localStorage as offline fallback

Hosted on Netlify (auto-deploy from GitHub)
+-- GitHub repo: matt17mccann/material-list
+-- Site: https://rba-material-list.netlify.app
+-- Netlify Functions:
|   +-- /api/jobs -- CRUD for shared job storage
|   +-- /api/catalog -- GET/PUT shared lumber catalog
|   +-- /api/offsets -- GET/PUT shared calculation offsets
|   +-- /api/parse-pdf -- Claude API fallback for PDF extraction
+-- Netlify Blobs (3 stores: jobs, catalog, offsets)
```

---

## Material Calculation Offsets (Current Defaults)

**Windows -- Picture Frame:**
- Side Jamb: H - 1.25" | Top/Bottom Jamb: W | Jamb Width: JD - 2.75"
- Side Casing: H - 1" | Top/Bottom Casing: W

**Windows -- Traditional:**
- Side Jamb: H - 1.25" | Head Jamb: W | Jamb Width: JD - 2.75"
- Sill/Stool: W + 10" (width: JD - 0.75") | Apron: W + 10"
- Side Casing: H - 1" | Head Casing: W

**Windows -- Stops:**
- Side Stop: H (exact) | Top/Bottom Stop: W (exact)
- No offsets applied -- stops match window dimensions

**Entry Doors:**
- Side Casing: H + 6" | Head Casing: W + 8" | Threshold: pre-made product (not calculated)

**Patio Doors:**
- Side Jamb: H + 2" | Head/Sill Jamb: W + 2" | Jamb Width: JD - 4.5625"
- Side Casing: H + 6" | Head Casing: W + 8" | Threshold: pre-made product

**Board Waste:** Configurable (default 5") -- extra length added per board for split ends

---

## File Structure

```
/Users/matthewmccann/Desktop/material list app/
+-- .gitignore
+-- pwa-app/
|   +-- index.html          # The entire app (single file, ~3100 lines)
|   +-- sw.js               # Service worker (v9)
|   +-- manifest.json       # PWA manifest
|   +-- icon.svg            # App icon source (SVG)
|   +-- icon-192.png        # App icon (PWA)
|   +-- icon-512.png        # App icon (large, PWA)
|   +-- package.json        # Dependencies (@netlify/blobs)
|   +-- netlify.toml        # Netlify build config
|   +-- netlify/
|       +-- functions/
|           +-- jobs.mts     # /api/jobs -- shared job CRUD
|           +-- catalog.mts  # /api/catalog -- shared lumber catalog
|           +-- offsets.mts  # /api/offsets -- shared calculation offsets
|           +-- parse-pdf.mts # /api/parse-pdf -- Claude API PDF extraction
+-- sales-pitch/
|   +-- Cut List Pro - Sales Pitch.md
|   +-- Affiliate Target List.md
+-- CUT LIST PRO - Project Summary.md   # This file
+-- CUT LIST PRO - Next Steps.md        # Vision & future plans
```

---

## Contact

**Matt McCann** -- Tech Measurer, RBA Lake Superior Region
Built with Claude AI (Anthropic) via Claude Code

**Live URL:** https://rba-material-list.netlify.app
**GitHub:** https://github.com/matt17mccann/material-list
