# Copilot Instructions – Drain Operasyon Merkezi

## Project Overview
A single-file PWA (Progressive Web App) for Turkish aviation fuel-drain scheduling. The entire application logic (HTML, CSS, JavaScript) lives in **`index.html`**. There is no build system, no package manager, and no test framework.

## Architecture
| File | Purpose |
|------|---------|
| `index.html` | Complete app – UI markup, styles, and all JavaScript |
| `sw.js` | Service Worker – offline cache management (current version: `drain-v9`) |
| `manifest.json` | PWA manifest (app name, icon, share target) |
| `drain.ico` | App icon |
| `CACHE_COZUMU.md` | Bilingual (TR/EN) guide for cache troubleshooting |

## Domain Knowledge
- **TTMS** – Turkish airline scheduling system; pasted as raw text, parsed by `analyzeTTMS()`.
- **Aircraft registrations** – Turkish civil aircraft use the `TC-XXX` format (normalised internally as lowercase without dash, e.g. `tcabc`).
- **Fleet types** – A31/A32 → blue (`.type-a32`); A33/A35 → red (`.type-a33`); B7x → black (`.type-b7`).
- **Drain slot** – A 10-minute pre-departure window calculated as `[depTime - 60 min, depTime - 30 min]`, rounded to nearest 10 minutes. Slots are unique per session.
- **"Slot Yok"** – Displayed when no free slot exists in the window; row highlighted in `tr.conflict` red.

## Key Data Flow
1. **TTMS paste** → `analyzeTTMS()` fills `acDb` (`reg → fleetType`) and displays a comma-separated filter list.
2. **Atom table paste** → `renderDraft()` populates `atomRows[]`, then `calculateTimes()` assigns drain slots and renders the interactive draft table.
3. **Checkboxes** → `toggleRow(idx)` toggles `atomRows[idx].selected` and recalculates all slots.
4. **Finalize** → `finalizePlan()` distributes selected rows round-robin across named personnel; renders two output tables (time-sorted and alphabetical) plus a fleet summary.

## Deploying Changes (Critical)
Every time `sw.js` or `index.html` changes, **increment `cacheName`** in `sw.js`:
```js
// sw.js
const cacheName = 'drain-v10'; // was drain-v9
```
Failing to do this causes existing users to see the stale cached version.

## Conventions
- All UI text is **Turkish**; keep new strings in Turkish.
- Inline styles are used alongside the `<style>` block — both patterns are acceptable.
- `atomRows` and `acDb` are module-level variables; all functions share them directly (no state management library).
- The floating counter (`#floatingCounter`) hardcodes `/29` (in `updateCounter()` in `index.html`) — update that literal if the slot capacity changes.
- `@media print` hides `.no-print` elements; print layout must be validated manually.
