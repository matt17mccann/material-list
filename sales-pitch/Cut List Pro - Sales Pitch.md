# Cut List Pro — Sales Pitch for RBA Affiliates

## The Market

Renewal by Andersen has **7 company-owned locations** and **over 100 independently owned affiliates** across the United States. Every single one runs the same workflow: tech measurer creates a material cut list from the rSuite/Salesforce data, figures out board lengths, and sends it to the warehouse.

**Every affiliate does this by hand today.** That's 100+ operations with the same pain point.

---

## The Problem (Every Affiliate Has This)

- Tech measurer gets the Installer Package PDF or rSuite export
- Manually calculates jamb extensions, casings, stools, aprons, thresholds
- Manually figures out which stock boards to cut from
- Fills out a paper Materials Checklist
- Warehouse reads the checklist and preps materials

**This takes 30-60 minutes per job and errors mean the installer shows up with wrong material.**

A single wrong-material callback costs more than a year of Cut List Pro.

---

## The Solution

**Cut List Pro** is a Progressive Web App that automates the entire workflow:

1. **Upload** the rSuite JSON export (same file every affiliate already has)
2. **Auto-populate** customer info, all units with exact fractional dimensions, species, casing, finish
3. **Calculate** every material piece with correct offsets
4. **Optimize** board usage (bin-packing with 1/8" kerf, catalog-aware)
5. **Generate** a warehouse-ready Materials Checklist PDF
6. **Share across all devices** — tech measurers and warehouse see the same jobs in real time

**90% of jobs: under 2 minutes.** The other 10% (custom species, unusual profiles) are fully supported through manual editing.

---

## What Makes This Different

| Feature | Cut List Pro | Manual Process | Andersen's Calculator |
|---------|-------------|----------------|----------------------|
| Auto-import from rSuite | Yes | No | No |
| Jamb/casing/stool calculations | Yes | Manual math | No (flashing/screws only) |
| Board optimizer with bin-packing | Yes | Guesswork | No |
| Warehouse-ready PDF report | Yes | Handwritten | No |
| Shared across team devices | Yes | Paper copies | No |
| Works on iPad in the field | Yes | N/A | N/A |
| Catalog-aware (only in-stock lengths) | Yes | Memory | No |
| Offline support | Yes | N/A | No |

Andersen corporate's Installation Materials Calculator only handles generic install supplies (flashing, sealant, screws). **It does not do what Cut List Pro does.**

---

## Demo Script (2 minutes)

1. Open Cut List Pro on iPad
2. Tap "+ New Job"
3. Upload a real rSuite JSON file
4. Show the auto-populated units — "All of this was done automatically"
5. Set global jamb depth — "One field fills every unit"
6. Tap Submit — show the Materials Checklist
7. Toggle to Detailed Cut List — "Every cut, every dimension"
8. Scroll to Board Summary — "Exactly how many boards, optimized to minimize waste"
9. Open on a second device — "Warehouse sees this immediately"

**Key line:** "This used to take me 45 minutes. Now it takes less than 2."

---

## Pricing Options

### Option A: Flat Monthly
- **$75/month per affiliate**
- Unlimited jobs, unlimited users
- Custom offsets, catalog, and branding per affiliate
- Easy sell: one wrong-material callback costs $200-500+

### Option B: Per-Job
- **$2/job**
- No commitment, scales with volume
- Average affiliate does 50-100+ jobs/month = $100-200/mo

### Option C: Setup + Monthly
- **$200 one-time setup** (configure their offsets, catalog, species)
- **$50/month** ongoing
- Good for affiliates who want hand-holding

---

## What's Needed to Go Multi-Affiliate

### Already Done
- Full material calculation engine (Windows PF/Traditional, Entry Doors, Patio Doors)
- Board optimizer with kerf and catalog awareness
- Two report formats (Materials Checklist + Detailed Cut List)
- rSuite JSON import with auto-fill
- PDF import with Claude AI fallback
- Shared storage across devices (Netlify Blobs)
- Offline support with localStorage fallback
- Submit/status tracking workflow

### To Build (estimated 1-2 weeks)
- **Team code system** — 4-digit code per affiliate, separates all data
- **Configurable branding** — region name + logo per affiliate
- **Custom domain** — cutlistpro.com
- **Admin page** — onboard new affiliates, set defaults

### Future (Phase 4+)
- QR code labels for cut pieces
- Inventory tracking with auto-reorder alerts
- Analytics dashboard (board usage, waste tracking, jobs/week)
- Push notifications when new jobs are submitted

---

## How to Reach Affiliates

1. **Regional/national RBA meetings** — Demo it live. Every tech measurer in the room will get it instantly because they all do this by hand.
2. **Word of mouth** — Other tech measurers at training events, install days
3. **Short demo video** — 2-minute screen recording, share in RBA network channels (The Link intranet, Simpplr)
4. **Esler Companies** — They're the largest affiliate group (9 markets: AZ, CO, ME, NV, New England, OK, Philadelphia, Central TX, North TX). Landing Esler = 9 affiliates at once.
5. **RBA Corporate** — If enough affiliates adopt it, corporate may want to standardize it across the network

---

## The Math

- 100+ affiliates nationwide
- Even 20 affiliates at $75/mo = **$18,000/year**
- 50 affiliates = **$45,000/year**
- If corporate adopts for all 100+ = **$90,000+/year**
- Near-zero marginal cost (Netlify hosting, no per-user infrastructure)

---

## Built By

**Matt McCann** — Tech Measurer, RBA Lake Superior Region
Built with Claude AI via Claude Code

*"I built this because I was tired of spending 45 minutes on something a computer should do in seconds. Turns out every other tech measurer feels the same way."*
