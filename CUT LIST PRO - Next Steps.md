# Cut List Pro — Next Steps & Vision
### Renewal by Andersen | Lake Superior Region
**Last Updated:** April 3, 2026

---

## What's Done (Phases 1 & 2)

Everything needed for daily use by tech measurers and the warehouse is built and deployed:

- Full material calculation engine (Windows PF/Traditional, Entry Doors, Patio Doors)
- rSuite JSON import with auto-fill (customer, address, trim, stain, all units)
- PDF import with regex parser + Claude API fallback
- Board optimizer with bin-packing, kerf, and catalog awareness
- Two report formats: Materials Checklist + Detailed Cut List
- Print, Save PDF, and Email sharing
- Shared storage across all devices (Netlify Blobs)
- Shared lumber catalog and editable offsets
- Submit/Save flow (drafts vs finalized jobs)
- Job Complete workflow with green styling and completed section divider
- Star/priority flags, search, and sort (newest, oldest, last name)
- Report-first job cards with EDIT JOB in toolbar
- Offline support with localStorage fallback
- Full code audit and cleanup

**Live at:** https://rba-material-list.netlify.app

---

## Immediate Next Steps (Phase 3)

### 1. Auto-Save
**Priority:** HIGH | **Impact:** Prevents data loss

Save job state automatically on every change instead of requiring a manual Save button press. If the browser crashes or the user navigates away, no work is lost.

**Implementation:**
- Debounced save (e.g. 2-second delay after last change)
- Save to localStorage immediately, sync to API in background
- Visual indicator showing "Saved" / "Saving..."

### 2. Fraction Display in Preview Modal
**Priority:** MEDIUM | **Impact:** Better UX during import

The upload preview modal shows decimal fractions like "95-0.875" instead of "95-7/8". The underlying data is correct — just needs a display formatter for the preview table.

### 3. Photo Attachment per Unit
**Priority:** MEDIUM | **Impact:** Warehouse clarity

Camera capture on iPad, attach photos to individual units. Warehouse sees exactly what they're working with — window condition, trim situation, access issues.

**Implementation:**
- File input with camera capture on mobile
- Store as base64 or upload to Netlify Blobs
- Display in report view per unit

### 4. Push Notifications
**Priority:** LOW | **Impact:** Faster warehouse response

Alert warehouse when a new job is submitted. Alert tech measurer when materials are prepped.

**Implementation:**
- Web Push API + service worker
- Netlify Function triggers notification on job submit

---

## The Dream (Phase 4)

### 5. Inventory Tracking with Auto-Reorder Alerts
**The big one.** Every job's board optimizer output deducts from warehouse inventory. When stock drops below a threshold, an automated email goes to the supplier.

**How it works:**
1. Lumber catalog tracks not just availability but **quantity on hand**
   - Oak 1x6 10': 47 boards in stock
   - Oak C115 casing 10': 120 pieces in stock

2. When a job is marked complete, quantities deduct automatically
   - Job pulls 4x Oak 1x6 10' → stock drops to 43

3. Reorder thresholds are configurable per item
   - Oak 1x6 10': reorder when below 20
   - Oak C115 10': reorder when below 50

4. When threshold is hit, system sends an email to the supplier contact:
   - "RBA Lake Superior — Low Stock Alert"
   - Lists all items below threshold with current quantity and reorder quantity

**Technical requirements:**
- Backend storage (Netlify Blobs or a proper database)
- Email service (Netlify Functions + SendGrid or similar)
- Inventory management UI (extension of Available Material screen)
- Deduction logic tied to job status changes

### 6. Barcode/QR Labels
Generate printable labels for each cut piece. Scan to verify during installation.

### 7. Analytics Dashboard
- Jobs per week/month
- Average waste percentage
- Most-used profiles and species
- Time from measurement to material prep

### 8. Authentication & Multi-Team Support
Simple PIN or team login. Each affiliate gets their own team code, separated data, custom offsets and catalog. This is the foundation for selling to other affiliates.

---

## Multi-Affiliate Expansion

### What's Needed to Go Multi-Affiliate
See `sales-pitch/Cut List Pro - Sales Pitch.md` for the full pitch and pricing.

**Already done:**
- Editable offsets (each affiliate can customize)
- Catalog-driven dropdowns (each affiliate has different stock)
- Full import/export workflow that works with any rSuite export

**To build:**
- Team code system — 4-digit code per affiliate, separates all data
- Configurable branding — region name + logo per affiliate
- Custom domain — cutlistpro.com
- Admin page — onboard new affiliates, set defaults

**Target:** Esler Companies (9 markets) as first multi-affiliate customer.

---

## Technical Debt

1. **Single-file architecture** — The app is one ~2800-line HTML file. Splitting into proper React components with a build step (Vite) would improve maintainability. Not urgent while the team is small.

2. **No error boundaries** — A React error anywhere crashes the whole app. Adding an error boundary component would show a helpful message instead of a blank screen.

3. **No automated tests** — The parser, calculator, and board optimizer should have unit tests. Critical as the app grows.

4. **iOS PWA prompt() limitation** — `prompt()` may not work in iOS PWA standalone mode (used for addMaterial). Should be replaced with an inline input.

5. **Accessibility** — Minimal ARIA labels or keyboard navigation. Not urgent for internal tool use but should be addressed for broader adoption.
