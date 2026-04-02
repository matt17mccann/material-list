# Cut List Pro — Next Steps & Vision
### Renewal by Andersen | Lake Superior Region
**Created:** April 2, 2026

---

## Immediate Next Steps (Phase 2)

### 1. Shared Job Storage Across All Users
**Priority:** HIGH | **Impact:** Enables warehouse collaboration

Right now, saved jobs live in each device's localStorage. The warehouse can't see jobs submitted by tech measurers. This is the single biggest blocker to the full workflow.

**Implementation path:**
- Netlify Blobs (free, serverless key-value storage built into Netlify)
- Each job gets a unique ID, stored as a JSON blob
- All devices read/write to the same store
- No authentication needed for v1 (same team, trusted network)
- Later: add simple PIN or team login

**What this unlocks:**
- Tech measurer uploads JSON on iPad in the field → job instantly visible to warehouse
- Warehouse edits material quantities or adds notes → tech sees changes
- Multiple people can work on the same backlog of jobs

### 2. PDF Report Quality Review
**Priority:** HIGH | **Impact:** This is what the warehouse actually reads

The generated PDF needs to be:
- Easy to scan quickly (clear headers, good spacing, bold key values)
- Printable on standard letter paper without cutoff
- Include all sections: unit cut lists, board summary, prefinishing notes, extra materials
- Show manual/custom materials clearly marked
- Include the RBA logo and job header on every page

**Action items:**
- Test print from iPad Safari and Chrome on desktop
- Verify page breaks don't split unit tables mid-row
- Check that the board optimizer summary is clear (which boards to pull, quantities)
- Add a "Notes for Warehouse" section that prints prominently

### 3. Lumber Catalog Drives Editor Dropdowns
**Priority:** MEDIUM | **Impact:** Prevents ordering unavailable material

When a species/length combination is toggled OFF in Available Lumber, that option should be hidden or grayed out in the editor dropdowns. This prevents tech measurers from specifying material the warehouse doesn't have.

**Implementation:**
- Editor dropdowns read from the catalog state
- Unavailable options show as disabled with "(out of stock)" label
- Can still be overridden with the Custom checkbox for special orders

### 4. Board Optimizer Respects Catalog
**Priority:** MEDIUM

The board optimizer currently assumes 8', 10', and 12' are always available. It should check the lumber catalog and only suggest lengths that are actually in stock for each species.

---

## Mid-Term Goals (Phase 3)

### 5. Auto-Save
Save job state on every change, not just when the user clicks "Save." Prevents data loss if the browser crashes or the user navigates away.

### 6. Fraction Display in Preview Modal
Show "95-7/8"" instead of "95-0.875"" in the upload preview. The underlying data is correct — just needs a display formatter.

### 7. Photo Attachment per Unit
Camera capture on iPad, attach photos to individual units. Warehouse sees exactly what they're working with — window condition, trim situation, access issues.

### 8. Job Status Tracking
Move jobs through a pipeline:
- **Measured** → **Material Prepped** → **Prefinished** → **Ready for Install**

Each status change visible to all users. Warehouse marks "Material Prepped" when boards are cut. Prefinish crew marks "Prefinished" when staining is done.

---

## The Dream (Phase 4)

### 9. Inventory Tracking with Auto-Reorder Alerts
**The big one.** Every job's board optimizer output deducts from warehouse inventory. When stock drops below a threshold, an automated email generates to the supplier.

**How it works:**
1. Lumber catalog tracks not just availability but **quantity on hand**
   - Oak 1x6 10': 47 boards in stock
   - Oak C115 casing 10': 120 pieces in stock

2. When a job is confirmed and materials are prepped, quantities deduct automatically
   - Job pulls 4x Oak 1x6 10' → stock drops to 43

3. Reorder thresholds are configurable per item
   - Oak 1x6 10': reorder when below 20
   - Oak C115 10': reorder when below 50

4. When threshold is hit, system sends an email to the supplier contact:
   - "RBA Lake Superior — Low Stock Alert"
   - Lists all items below threshold with current quantity and reorder quantity
   - Can include suggested PO or just a notification

**Technical requirements:**
- Backend storage (Netlify Blobs or a proper database)
- Email service (Netlify Functions + SendGrid or similar)
- Inventory management UI (extension of Available Lumber screen)
- Deduction logic tied to job status changes

### 10. Push Notifications
Alert warehouse when a new job is submitted. Alert tech measurer when materials are prepped.

### 11. Barcode/QR Labels
Generate printable labels for each cut piece. Scan to verify during installation.

### 12. Analytics Dashboard
- Jobs per week/month
- Average waste percentage
- Most-used profiles and species
- Time from measurement to material prep

---

## Technical Debt to Address

1. **Single-file architecture** — The app is one 2300-line HTML file. At some point, splitting into proper React components with a build step (Vite) would improve maintainability. Not urgent while the team is small.

2. **No error boundaries** — A React error anywhere crashes the whole app. Adding an error boundary component would show a helpful message instead of a blank screen.

3. **No automated tests** — The parser, calculator, and board optimizer should have unit tests. Critical as the app grows.

4. **Accessibility** — Zero ARIA labels or keyboard navigation. Not urgent for internal tool use but should be addressed eventually.

---

## Architecture for Shared Storage

When ready to implement shared jobs (item #1), here's the recommended approach:

```
Current:  iPad → localStorage → iPad only
Future:   iPad → Netlify Blobs API → All devices

Netlify Blobs:
- Free tier: 1GB storage, unlimited reads
- API: simple GET/PUT/DELETE with JSON
- No database setup needed
- Serverless function handles auth/validation
```

**Migration path:**
1. Add a Netlify Function (`/api/jobs`) that wraps Blobs
2. Change `saveJobToStorage` to POST to the API
3. Change `loadSavedJobs` to GET from the API
4. Keep localStorage as offline fallback
5. Sync when back online

This is a 1-2 session build and would transform the app from a single-device tool into a team platform.
