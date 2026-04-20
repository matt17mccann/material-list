# RBA Material List — Next Steps & Vision
### Renewal by Andersen | Lake Superior Region
**Last Updated:** April 20, 2026

---

## What's Done (Phases 1–7)

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
- **Parse all 900+ items** — ZIP/JSON parser reads Notes, Product_Name, Name, Description from all 900+ items for species, casing profile, and finish detection
- **Fix finish type/color mismatch** — finishType defaults to "Stain" (not empty) so color dropdown shows correct options

### Phase 5 (April 10, 2026 — v2.3)
- **Prefinish color toggle** — "Show prefinish color" checkbox in Board Summary. When on, appends stain/paint color to every board description on the Materials Checklist (e.g. "Oak 5/8x6x10' — Dark Walnut (Minwax)")
- **"Multiple (per unit)" finish option** — New Finish Type option that preserves per-unit finish colors instead of overriding them globally. Hides the global color picker and shows "Set finish per unit below"
- **Extra boards get finish selector** — Each extra board now has its own Finish/Stain dropdown, used in both checklist and board summary
- **Cocoa Bean coil hardwired** — Added to built-in COIL_COLORS so it's always available
- **Improved JSON/PDF parser** — Fuzzy regex matching for species (white oak, red oak, poplar), stain colors (handles spacing variations, auto-appends brand names), paint colors (bare names like "Terratone" without RBA prefix), casing profiles (C-115, 2 1/2 colonial, RBA S4S, etc.)
- **PO number in PDF parser** — Scans for R/RD/RP followed by digits in Installer Package PDFs
- **Banner/header fix** — All sticky top bars use safe-area-inset-top + 50px minimum padding for macOS/iPad traffic light clearance. viewport-fit=cover meta tag added.
- **Back buttons shifted right** — 60px left margin on all back/home buttons to clear macOS window controls

### Phase 6 (April 14, 2026 — v2.4)
- **"Customer Supplying" option** — Added to both Casing Profile and Jamb Material dropdowns (global + per-unit). Skips material calculation and auto-prints a note on the Materials Checklist PDF listing affected units (e.g. "CUSTOMER SUPPLYING CASING — Units: 101, 203"). Note appears below the Prefinish/PF Windows section.
- **Jamb species independence** — Fixed bug where changing Casing Species would override Jamb Species. Now tracks a manual flag so jamb species stays put once you've set it.
- **Jamb species in calculations** — Jamb pieces now use the selected jamb species instead of always using casing species. Fixed in calculation engine, cut list display, and jamb info badge.
- **5/4" jamb stock** — Added 5/4x6 (5-1/2") and 5/4x8 (7-1/4") with 1.25" thickness. Only visible when Traditional trim style is selected.
- **5/4" Stool checkbox** — When Traditional trim is selected, a "5/4" Stool" checkbox appears next to Jamb Material. Uses 5/4" thick material and picks the appropriate 5/4" jamb stock for the sill/stool piece only.
- **Stool separated on checklist** — Sill/Stool boards now appear in their own STOOL category on the Materials Checklist, labeled "Stool - Oak 5/8x6x10'" so the prefinish crew can identify them immediately.
- **"Bottom Casing" override** — Added to custom trim override piece types for Traditional trim jobs.
- **Qty stepper buttons** — Replaced all quantity number inputs with +/− stepper buttons for easier iPad use. Applied to custom trim overrides, manual materials, extra materials, and bay materials.
- **Improved custom trim overrides** — Reorganized to 3-column layout (Piece, Species, Thickness) with profile + qty on second row. Thickness dropdown (Auto/5/8"/3/4"/5/4") only shows for jamb/stool pieces. Profile dropdown organized with optgroups: Casing Profiles, Stop Profiles, Jamb Stock.
- **Job persistence fix** — GlobalTrim (trim style, species, finish, jamb depth, etc.) now saves with the job and restores on edit. No more field resets when editing submitted jobs. Older saved jobs get globalTrim reconstructed from first unit.
- **Default finish "Not yet selected"** — New jobs start with empty finish instead of auto-picking Dark Walnut. Switching finish type also resets to unselected.
- **Tech measurer filter** — Submitted Jobs view has a filter bar (All / Matt McCann / Darren Williams / Steve Cvek) to quickly filter by who measured the job.

### Phase 7 (April 20, 2026 — v2.5)
- **Combined PDF output** — The Save PDF / Share / Print buttons now produce ONE document with the Materials Checklist on page 1, the per-unit Detailed Cut List starting on page 2, and the Board Purchase Summary on its own final page. The on-screen Checklist / Detailed tab toggle is kept for browsing but no longer affects what the PDF contains. Warehouse gets everything in one attachment.
- **Section-aware page slicer** — The PDF renderer now reads `data-pdf-section` / `data-pdf-new-page` markers from the report DOM and forces page breaks at section boundaries. Rows and tables no longer get chopped mid-content. Replaces the naive fixed-pixel slicing introduced during the iOS Safari fix.
- **Continuous scale cap** — PDF canvas scale now scales smoothly with report length (capped at 2x) instead of dropping abruptly from 2x to 1x at the iOS 16M-pixel limit. Long reports stay crisp.
- **Share button mailto fix** — On the rare device where the native share sheet isn't available, the mailto fallback now uses `window.location.href` instead of a detached `<a>.click()`. Reliable across iOS PWA and desktop Safari.

**Live at:** https://rba-material-list.netlify.app

---

## Immediate Next Steps (Phase 8)

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

---

## The Dream (Phase 9+)

### 4. Inventory Tracking with Auto-Reorder Alerts
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

### 5. Barcode/QR Labels
Generate printable labels for each cut piece. Scan to verify during installation.

### 6. Analytics Dashboard
- Jobs per week/month
- Average waste percentage
- Most-used profiles and species
- Time from measurement to material prep

### 7. Authentication & Multi-Team Support
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

1. **Single-file architecture** — ~4000-line HTML file. Manageable for now. When it hits 5000-6000 lines or a second developer joins, split into separate JS files (no build tool needed — just script tags in order).

2. **No error boundaries** — A React error anywhere crashes the whole app (blank white screen). Adding an error boundary component would show a helpful message instead.

3. **No automated tests** — The parser, calculator, and board optimizer should have unit tests. Critical as the app grows.

4. **iOS PWA prompt() limitation** — `prompt()` may not work in iOS PWA standalone mode (used for addMaterial in catalog). Should be replaced with an inline input.

5. **Accessibility** — Minimal ARIA labels or keyboard navigation. Not urgent for internal tool use but should be addressed for broader adoption.

6. **Catalog migration** — When new catalog sections are added (like stopProfiles), both localStorage and API-fetched catalogs need migration logic. Currently handled but could be more robust.
