# RBA Material List — Next Steps & Vision
### Renewal by Andersen | Lake Superior Region
**Last Updated:** April 8, 2026

---

## What's Done (Phases 1, 2 & 3)

Everything needed for daily use by tech measurers and the warehouse is built and deployed:

### Phase 1 & 2 (Core)
- Full material calculation engine (Windows PF/Traditional/Stops, Entry Doors, Patio Doors)
- rSuite JSON import + ZIP import + PDF import with Claude API fallback
- Board optimizer with bin-packing, kerf, catalog awareness, and per-unit grain matching mode
- Two report formats: Materials Checklist + Detailed Cut List
- Print, Save PDF, and Email sharing
- Shared storage across all devices (Netlify Blobs)
- Shared lumber catalog and editable offsets
- Submit/Save flow, Job Complete workflow, star/priority flags, search, sort
- Offline support with localStorage fallback

### Phase 3 (April 6, 2026)
- **Stops trim style** — 1x4 Stop, Colonial 3-1/4" Stop, Eased Edge 1-1/4" Stop with All Sides / Sides and Top coverage
- **Species tied to casing & jambs** — Casing Species + Casing Profile as separate fields, Jamb Species + Jamb Material, all with Custom checkbox
- **Jamb stock relabeled** — 5/8x4, 5/8x6 (5/8" thick), 3/4x8, 3/4x10, 3/4x12 (3/4" thick)
- **Threshold as product** — Pre-made dropdown (1-1/4" or 1x4, Oak or Maple, 8' or 10') with Custom option. Shows as line item on checklist, not cut lumber.
- **Custom Trim mode** — Orange toggle for complex jobs with per-unit piece overrides (different top vs side casing, special aprons, etc.)
- **Extra Boards section** — Full board builder with type, species, profile, stock length, notes. Boards appear numbered in Board Summary.
- **Bay Material** — Collapsible section with Soffit, Plywood, Pink Foam quick-add
- **Prefinish redesign** — Always-visible textarea with stain auto-fill, PF Windows checkbox
- **Stain highlight on PDF** — Light green bar in Prefinish section for warehouse prefinish crew
- **Board Waste offset** — Configurable in Offsets page (default 5")
- **Per-unit optimization** — Toggle for grain matching (less optimized but consistent grain per unit)
- **PDF layout** — Job details upper-right, category separator lines, threshold as line items
- **Available Material expanded** — Stop Profiles, Coil Colors, Bay Material Items added to catalog
- **All catalog lists alphabetically sorted**
- **ZIP upload support** — For iPad users who can't unzip JSON exports
- **Trim Style in global trim** — Picture Frame/Traditional/Stops set once, propagates to all units
- **Per-unit fields match global** — Every unit has the same field set with Custom checkboxes
- **Font size improvements** — Larger labels, inputs, headings for field readability

### Phase 4 (April 8, 2026 — v2.2)
- **"None" option on all dropdowns** — Threshold, Casing Profile, Stop Profile, Stop Coverage all support "None" to exclude material from the list
- **Share button** — Renamed from "Email", uses native share sheet with PDF auto-attached
- **Email subject auto-fill** — LastName PO# Material List format
- **PDF filename** — Auto-named: LastName Material List (PO#).pdf
- **PDF size reduced** — JPEG compression at 75%, canvas scale 1.5x (~60-70% smaller)
- **PO number from phone fields** — ZIP/JSON parser extracts PO from contact phone fields (R/RP/RD prefix)
- **Extra Materials redesign** — Clean label + qty layout, coil quick-tap buttons, custom text input
- **Per-unit extra materials** — Auto-populate to job-level Extra Materials section
- **Extra Boards improvements** — Solid green add buttons, auto-populate from job trim, + Stop button
- **Stain highlight** — RBA green bar on both checklist and detailed PDF reports
- **Stain not found warning** — Red bar in import preview when finish not detected, no random default
- **Skip 900+ unit IDs** — ZIP/JSON parser ignores all 900+ items (901, 902, etc.)
- **Scroll jump fix** — Disabled overflow-anchor for iPad stability
- **Renamed to RBA Material List** — Title, manifest, meta tags updated
- **Popup blocker fix** — PDF download + mailto use <a> clicks instead of window.location

**Live at:** https://rba-material-list.netlify.app

---

## Immediate Next Steps (Phase 4)

### 1. Auto-Save
**Priority:** HIGH | **Impact:** Prevents data loss

Save job state automatically on every change instead of requiring a manual Save button press. If the browser crashes or the user navigates away, no work is lost.

**Implementation:**
- Debounced save (2-second delay after last change)
- Save to localStorage immediately, sync to API in background
- Visual indicator showing "Saved" / "Saving..."

### 2. OptiCutter Integration
**Priority:** HIGH | **Impact:** Actual board cutting optimization

Export the board optimizer output to OptiCutter format for the warehouse to import directly into their cutting software.

**Implementation:**
- "Export to OptiCutter" button in report view
- Generate CSV or JSON in OptiCutter's expected format
- Each board: stock length + list of cuts with lengths and labels

### 3. Photo Attachment per Unit
**Priority:** MEDIUM | **Impact:** Warehouse clarity

Camera capture on iPad, attach photos to individual units. Warehouse sees exactly what they're working with — window condition, trim situation, access issues.

**Implementation:**
- File input with camera capture on mobile
- Store as base64 or upload to Netlify Blobs
- Display in report view per unit

### 4. Component File Split (When Ready)
**Priority:** LOW | **Impact:** Developer experience

The app is a single ~3100-line HTML file. When feature velocity slows, migrate to Vite + React with proper component files. This is a weekend project, not a rewrite.

**What it would look like:**
- `src/components/Editor.jsx`, `ReportView.jsx`, `BoardSummary.jsx`, etc.
- `src/utils/calcMaterials.js`, `optimizeBoards.js`
- Proper imports, hot reload, TypeScript optional
- Keep Netlify deploy working, keep PWA/offline support

---

## The Dream (Phase 5)

### 5. Inventory Tracking with Auto-Reorder Alerts
**The big one.** Every job's board optimizer output deducts from warehouse inventory. When stock drops below a threshold, an automated email goes to the supplier.

**How it works:**
1. Lumber catalog tracks not just availability but **quantity on hand**
   - Oak 5/8x6 10': 47 boards in stock
   - Oak C115 casing 10': 120 pieces in stock

2. When a job is marked complete, quantities deduct automatically
   - Job pulls 4x Oak 5/8x6 10' -> stock drops to 43

3. Reorder thresholds are configurable per item
   - Oak 5/8x6 10': reorder when below 20

4. When threshold is hit, system sends an email to the supplier contact

### 6. Barcode/QR Labels
Generate printable labels for each cut piece. Scan to verify during installation.

### 7. Analytics Dashboard
- Jobs per week/month
- Average waste percentage
- Most-used profiles and species
- Time from measurement to material prep

### 8. Authentication & Multi-Team Support
Simple PIN or team login. Each affiliate gets their own team code, separated data, custom offsets and catalog. Foundation for selling to other affiliates.

---

## Multi-Affiliate Expansion

### What's Needed to Go Multi-Affiliate
See `sales-pitch/Cut List Pro - Sales Pitch.md` for the full pitch and pricing.

**Already done:**
- Editable offsets (each affiliate can customize)
- Catalog-driven dropdowns (each affiliate has different stock)
- Full import/export workflow that works with any rSuite export
- Stops, custom trim, bay material — features other affiliates need

**To build:**
- Team code system — 4-digit code per affiliate, separates all data
- Configurable branding — region name + logo per affiliate
- Custom domain — cutlistpro.com
- Admin page — onboard new affiliates, set defaults

**Target:** Esler Companies (9 markets) as first multi-affiliate customer.

---

## Technical Debt

1. **Single-file architecture** — ~3100-line HTML file. Splitting into proper React components with Vite would improve maintainability. Not urgent while iterating fast.

2. **No error boundaries** — A React error anywhere crashes the whole app (blank white screen). Adding an error boundary component would show a helpful message instead.

3. **No automated tests** — The parser, calculator, and board optimizer should have unit tests. Critical as the app grows.

4. **iOS PWA prompt() limitation** — `prompt()` may not work in iOS PWA standalone mode (used for addMaterial in catalog). Should be replaced with an inline input.

5. **Accessibility** — Minimal ARIA labels or keyboard navigation. Not urgent for internal tool use but should be addressed for broader adoption.

6. **Catalog migration** — When new catalog sections are added (like stopProfiles), both localStorage and API-fetched catalogs need migration logic. Currently handled but could be more robust.
