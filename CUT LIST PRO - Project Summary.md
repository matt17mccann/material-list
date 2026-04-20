# RBA Material List — Project Summary
### Renewal by Andersen | Lake Superior Region
**Last Updated:** April 20, 2026 (v2.5) | **Built by:** Matt McCann + Claude AI

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
| JSON file import (rSuite DL Export) | **Working** | Auto-fills customer, address, PO# (from phone fields), trim, casing profile, stain/finish from all 900+ items, all units with exact sizes |
| ZIP file import | **Working** | Extracts .json from ZIP for iPad users who can't unzip |
| PDF file import (Installer Package) | **Working** | Regex parser + Claude API fallback, PO# extraction (R/RD/RP prefix) |
| Manual unit entry | **Working** | Full form for each unit with fraction inputs |
| Material calculations | **Working** | All formulas for Windows (PF/Traditional/Stops), Entry Doors, Patio Doors. Separate species for casing vs jamb. |
| Board optimizer | **Working** | Bin-packing, catalog-aware, whole-job or per-unit grain matching mode |
| PDF report generation | **Working** | PDF is Checklist (page 1) → Board Purchase Summary (page 2). Per-unit Detailed Cut List view exists on-screen but is intentionally not in the PDF yet. |
| Print PDF | **Working** | Opens generated PDF in new tab for printing |
| Share report | **Working** | Native share API with PDF attached + reliable `window.location.href` mailto fallback to nina@northlandrba.com |
| Shared job storage | **Working** | Netlify Blobs — all devices read/write to same store. GlobalTrim persists across save/edit cycles. |
| Shared lumber catalog | **Working** | Warehouse changes visible to all tech measurers |
| Shared offsets | **Working** | Editable offset formulas + configurable board waste |
| Offline support | **Working** | Service worker + localStorage fallback when offline |

### Editor Sections (in order)
1. **Import Job File** — Upload .json, .zip, or .pdf, auto-fills everything
2. **Job Info** — Customer, address, PO#, tech measurer, date
3. **Trim Selection** — Trim Style (Picture Frame/Traditional/Stops), Casing Species + Profile, Jamb Species + Material, Finish Type + Color with green highlight banner, Jamb Depth. Custom Trim toggle for complex jobs. All with Custom checkbox for free-text entry. Dropdowns include "None", **"Customer Supplying"** options. **"Multiple (per unit)"** finish option forces per-unit color selection. **5/4" Stool** checkbox for Traditional trim.
4. **Units** — Expandable accordion per unit. Each unit has: dimensions, trim style, casing species/profile, jamb species/material, finish type + color, threshold (doors), custom trim overrides, manual materials. All fields have Custom checkbox. Qty inputs use +/− stepper buttons.
5. **Extra Boards** — Add any board type (Casing/Jamb/Stop/Other) with species, profile, stock length, **finish/stain color**, and notes. Appear as real numbered boards in Board Summary.
6. **Prefinish / Warehouse Notes** — Always-visible textarea with stain auto-fill + "Any Windows needing PF?" checkbox. **Customer Supplying notes** auto-appear here listing affected units.
7. **Extra Materials** — Coil quick-tap color buttons (White, Black, Canvas, Terratone, Sandtone, Dark Bronze, Forest Green, Red Rock, Cocoa Bean), custom text input with Add button. Per-unit extra materials auto-populate to this section.
8. **Bay Material** — Collapsible section for Soffit, Plywood, Pink Foam, custom items
9. **Board Summary** — Live preview of optimized board counts, per-unit toggle, **show prefinish color toggle**, recalculate button

### Trim System
| Feature | Notes |
|---------|-------|
| **Trim Style** | Picture Frame, Traditional, or Stops — set globally, override per unit |
| **Stops** | 1x4 Stop, Colonial 3-1/4" Stop, Eased Edge 1-1/4" Stop with All Sides, Sides and Top, or None coverage |
| **Casing Species + Profile** | Separate fields, both with Custom checkbox for free-text. "None" and "Customer Supplying" options. |
| **Jamb Species + Material** | Jamb species fully independent from casing species. Material auto-calculates from depth but overridable (5/8x4, 5/8x6, 3/4x8, 3/4x10, 3/4x12, **5/4x6, 5/4x8 for Traditional**). "Customer Supplying" option. |
| **5/4" Stool** | Checkbox visible when Traditional trim selected. Uses 5/4" thick material and picks 5/4x6 or 5/4x8 stock for sill/stool piece only. |
| **Threshold** | Pre-made product dropdown: None, 1-1/4" or 1x4, Oak or Maple, 8' or 10'. Custom checkbox. "None" excludes from material list entirely. Shows as line item on checklist, not cut lumber. |
| **Custom Trim Mode** | Orange toggle for complex jobs. Per-unit overrides for any piece (Side Casing, Top Casing, **Bottom Casing**, Apron, etc.) with independent species, profile, **thickness** (Auto/5/8"/3/4"/5/4"), and quantity via +/− steppers. Profile dropdown organized with optgroups (Casing, Stop, Jamb Stock). Overrides replace auto-calculated pieces. |
| **Finish Type** | Stain, Paint, or **Multiple (per unit)** — "Multiple" preserves per-unit finishes instead of overriding them globally. Default is **"Not yet selected"** instead of auto-picking a stain. |

### Prefinish Color on Checklist
| Feature | Notes |
|---------|-------|
| **"Show prefinish color" toggle** | In Board Summary section, next to "Calculate per unit" |
| **When enabled** | Appends finish/stain color to every board description on the Materials Checklist PDF |
| **Groups by finish** | Boards with different stains are already separated by the optimizer; this makes the color visible to the warehouse |

### Jamb Stock
| Label | Width | Thickness | Availability |
|-------|-------|-----------|-------------|
| 5/8x4 | 3.5" | 5/8" | All trim styles |
| 5/8x6 | 5.5" | 5/8" | All trim styles |
| 3/4x8 | 7.25" | 3/4" | All trim styles |
| 3/4x10 | 9.25" | 3/4" | All trim styles |
| 3/4x12 | 11.25" | 3/4" | All trim styles |
| 5/4x6 | 5.5" | 5/4" | Traditional only |
| 5/4x8 | 7.25" | 5/4" | Traditional only |

### Report / PDF
| Feature | Notes |
|---------|-------|
| **PDF layout** | Checklist on page 1, Board Purchase Summary on its own page at the end. Per-unit Detailed Cut List still browsable on-screen via the tab toggle but not embedded in the PDF yet (pending formatting pass). |
| **Section-aware page breaks** | Renderer reads `data-pdf-section` / `data-pdf-new-page` markers on the report DOM and forces a hard break before the Board Summary. Rows and tables don't get chopped mid-content. Ready to take on more sections (e.g. Cut List) without touching the slicer. |
| **Job details upper-right** | Name, address, PO#, tech — positioned where installers expect them |
| **Stain highlight** | RBA green (25% opacity) bar in Prefinish section showing finish type + color |
| **Customer Supplying notes** | Appears below Prefinish/PF Windows section listing affected units |
| **Stool separated** | Sill/Stool boards appear in their own STOOL category, labeled "Stool - Oak 5/8x6x10'" |
| **Prefinish color on boards** | When toggle enabled, each board line shows its finish color (e.g. "Oak 5/8x6x10' — Dark Walnut (Minwax)") |
| **PDF filename** | Auto-named: LastName Material List (PO#).pdf |
| **Email subject** | Auto-filled: LastName PO# Material List |
| **Canvas scaling** | Continuous scale capped at 2x — stays crisp on short reports and scales down smoothly on long ones to stay under the iOS 16M-pixel canvas limit. JPEG output at 92% quality. |
| **Category separators** | Thick lines between coils/thresholds, jamb material, stool, and casing |
| **Per-unit optimization note** | Shows when grain matching mode is active |
| **Thresholds as line items** | Pre-made products listed like coils, not as cut boards |
| **Extra boards numbered** | Extra boards appear with real board numbers and "(Extra)" label |

### Available Material Catalog
| Section | Notes |
|---------|-------|
| **Casing Profiles** | Species x length availability grid, add/delete custom profiles |
| **Jamb Stock** | Same grid format |
| **Stop Profiles** | 1x4 Stop, Colonial 3-1/4" Stop, Eased Edge 1-1/4" Stop |
| **Coil Colors** | Default colors (incl. Cocoa Bean) + custom, alphabetically sorted |
| **Bay Material Items** | Soffit, Plywood, Pink Foam + custom, alphabetically sorted |
| **Stain Colors** | All built-in + custom, alphabetically sorted |
| **Paint Colors** | All built-in + custom, alphabetically sorted |
| **Other Items** | Custom items, alphabetically sorted |

### Saved Jobs & Submitted Jobs
| Feature | Notes |
|---------|-------|
| **Separate lists** | Home screen has "Saved Jobs" (drafts) and "Submitted Jobs" (finalized) with counts |
| **Sort bar** | Sort by Newest, Oldest, or Last Name |
| **Tech measurer filter** | Submitted Jobs view has filter buttons (All / Matt McCann / Darren Williams / Steve Cvek) |
| **Search bar** | Filter by customer name, address, or PO# |
| **Star/Priority flags** | Tap star to flag important jobs — starred float to top |
| **Job Complete button** | Mark jobs as complete — they sink to the bottom with green styling |
| **Completed section divider** | Green "COMPLETED" divider line separates active from completed jobs |
| **Click to view report** | All job cards open directly to the report/PDF view |
| **EDIT JOB from report** | Edit button in the report toolbar to jump back to editor |
| **Re-Submit** | Editing a previously submitted job shows "Re-Submit Job" instead of "Submit Job" |
| **Job persistence** | GlobalTrim saves with job — no field resets when editing submitted jobs |

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
8. If customer is supplying their own casing or jambs, select **"Customer Supplying"** from the appropriate dropdown
9. If each window has a different stain, select **Multiple (per unit)** as the Finish Type
10. Fill in the **Jamb Depth** (sets all units at once, Jamb Material auto-calculates)
11. For Traditional trim, check **5/4" Stool** if the sill needs thicker material
12. Override any individual unit's trim if different
13. For complex jobs, toggle **Custom Trim** to add per-piece overrides (including Bottom Casing)
14. Add **Extra Boards** if needed (each with its own species, profile, stock length, and finish)
15. Fill in **Prefinish / Warehouse Notes** and check **Windows needing PF** if applicable
16. Add extra materials (coils, bay material, custom items) as needed
17. Check the **Board Summary** — shows exactly how many boards are needed
18. Toggle **Show prefinish color** if the warehouse needs to see stain per board line
19. Tap **Submit Job** to send to the warehouse, or **Save Progress** to save as draft

### For the Warehouse

1. Open the same URL on any device
2. Go to **Submitted Jobs** — all finalized jobs from tech measurers are visible
3. Use the **Tech filter** to see only one measurer's jobs
4. Tap any job card to see its PDF report immediately
5. The **Prefinish / Warehouse Notes** section highlights the stain selection in green
6. **Customer Supplying** notes list which units have customer-provided casing/jambs
7. **Stools** appear in their own category for separate prefinish handling
8. When "Show prefinish color" is on, each board line shows its finish color
9. Tap **EDIT JOB** in the report toolbar to modify any job
10. Star priority jobs — they float to the top
11. Tap **Job Complete** when materials are prepped
12. Use **Available Material** to manage stock:
   - Casing Profiles, Jamb Stock, Stop Profiles with species x length grids
   - Coil Colors, Bay Material Items, Stain/Paint Colors
   - All lists sorted alphabetically
13. Use **Offsets** to adjust calculation formulas and board waste

---

## Technical Architecture

```
Single HTML file (pwa-app/index.html ~4000 lines)
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
|   +-- /api/jobs -- CRUD for shared job storage (includes globalTrim)
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
- **5/4" Stool option:** Uses 1.25" thickness, picks 5/4x6 or 5/4x8 stock

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
|   +-- index.html          # The entire app (single file, ~4000 lines)
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
