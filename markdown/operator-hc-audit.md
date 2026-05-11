# HC Management — Operator UI Audit

**Date:** May 2026  
**Scope:** `NewUnera/operator-hc-management.html` (pre-refactor) vs. data requirements of `centre-detail.html` and `explore-centres.html`  
**Decision output:** Full-page editor (`operator-hc-edit.html`), narrative/media/taxonomy scope only (stats auto-tracked by backend)

---

## 1. Gap Analysis: 5 Fields vs. 25+ Required

### 1.1 What the Old Drawer Provided

| # | Field | Input type |
|---|-------|-----------|
| 1 | Name | Text input |
| 2 | Location | Text input |
| 3 | Description | Textarea |
| 4 | Centre Image | File upload (no crop) |
| 5 | Status (Active/Inactive) | Toggle |

**Total: 5 fields. No repeaters. No media structure. No editorial context.**

---

### 1.2 What `centre-detail.html` (Consumer Page) Requires

#### Basics & Taxonomy
| Field | Consumer usage | Old drawer | New editor |
|-------|---------------|-----------|-----------|
| Name | `<h1>` hero title | ✅ | ✅ Sec. 1 |
| URL slug | Canonical URL `/hc/{slug}` | ❌ missing | ✅ Sec. 1 (auto-gen + override) |
| Location | Sub-heading line | ✅ | ✅ Sec. 1 |
| Region | Filter chip in explore page | ❌ missing | ✅ Sec. 1 |
| Category tags | "Education · Health" chips in card + detail | ❌ missing | ✅ Sec. 1 (multi-select) |
| Visibility toggle | Draft vs. Published state | ❌ missing | ✅ Sec. 1 |

#### Story / Narrative
| Field | Consumer usage | Old drawer | New editor |
|-------|---------------|-----------|-----------|
| Short description | Explore card teaser (≤200 chars) | ❌ (no char limit, no purpose distinction) | ✅ Sec. 2 |
| Full story (rich text) | "Our Story" section on detail page | ❌ (single textarea without semantic label) | ✅ Sec. 2 |
| Mission statement | Pull-quote / sidebar on detail page | ❌ missing | ✅ Sec. 2 |
| Year founded | Metadata row on detail page | ❌ missing | ✅ Sec. 2 |
| Website URL | External link on detail page | ❌ missing | ✅ Sec. 2 |

#### Programs (Repeater — 1 to N)
| Field | Consumer usage | Old drawer | New editor |
|-------|---------------|-----------|-----------|
| Program name | Program card title | ❌ missing | ✅ Sec. 3 repeater |
| Program icon | Program card icon | ❌ missing | ✅ Sec. 3 icon picker |
| Program description | Program card body | ❌ missing | ✅ Sec. 3 repeater |
| Participants count | Program card stat | ❌ missing | ✅ Sec. 3 repeater |

#### Donation Impact (Repeater — 1 to N presets)
| Field | Consumer usage | Old drawer | New editor |
|-------|---------------|-----------|-----------|
| Preset label | "Feed 10 children" button label | ❌ missing | ✅ Sec. 4 repeater |
| Preset amount (CAD) | Preset amount button on donate flow | ❌ missing | ✅ Sec. 4 repeater |
| Preset description | Tooltip / sub-copy | ❌ missing | ✅ Sec. 4 repeater |

#### Testimonial (Object)
| Field | Consumer usage | Old drawer | New editor |
|-------|---------------|-----------|-----------|
| Quote text | Pull-quote section on detail page | ❌ missing | ✅ Sec. 5 |
| Contributor name | Attribution line | ❌ missing | ✅ Sec. 5 |
| Contributor role | Sub-attribution | ❌ missing | ✅ Sec. 5 |
| Contributor photo | Avatar in testimonial | ❌ missing | ✅ Sec. 5 |

#### Media
| Field | Consumer usage | Old drawer | New editor |
|-------|---------------|-----------|-----------|
| Hero image (16:9) | Full-width hero on detail page | ⚠️ single upload, no crop | ✅ Sec. 6, CropperJS 16:9 |
| Listing thumbnail (3:2) | Explore card image | ❌ missing | ✅ Sec. 6, CropperJS 3:2 |
| Hero alt text | Accessibility / SEO | ❌ missing | ✅ Sec. 6 |
| Gallery images (3–8) | Gallery grid on detail page | ❌ missing | ✅ Sec. 6 repeater |
| Gallery image alt texts | Accessibility per image | ❌ missing | ✅ Sec. 6 (per-image alt) |

#### Auto-tracked (Backend — Read-only Preview in Editor)
| Stat | Consumer usage | Old drawer | New editor |
|------|---------------|-----------|-----------|
| Lives impacted | Hero stat | ❌ missing | ✅ Sec. 7 read-only preview |
| Attendance rate | Detail stat | ❌ missing | ✅ Sec. 7 read-only preview |
| Meals served | Program metric | ❌ missing | ✅ Sec. 7 read-only preview |
| Annual impact CAD | Donation CTA context | ❌ missing | ✅ Sec. 7 read-only preview |
| Donor count | Social proof | ❌ missing | ✅ Sec. 7 read-only preview |
| UNERA CAD held | Wallet stat | ❌ missing | ✅ Sec. 7 read-only preview |

---

## 2. UX / Heuristic Issues in the Old Drawer

| Heuristic (Nielsen) | Issue | Severity |
|--------------------|-------|---------|
| **Visibility of system status** | No completeness meter — operator has no signal when a centre is "publish-ready" | High |
| **Match between system and real world** | No slug preview — operator cannot see the public URL they're about to create | High |
| **User control and freedom** | No dirty-state warning — unsaved edits lost on navigation | High |
| **Recognition vs. recall** | Icon-less programs repeater — operators must recall icon names from memory | Medium |
| **Error prevention** | No character counter on short description — truncation on explore card invisible to operator | Medium |
| **Flexibility & efficiency** | 480px fixed drawer on 1440px screen — wasted space, no room for repeaters | High |
| **Aesthetic & minimalist design** | Single "Description" textarea conflates short teaser and full story — both fields overloaded | Medium |
| **Help users recognise errors** | `border-color: red` only — no inline text error message, no focus management | Medium |
| **Consistency & standards** | "Active/Inactive" status vocabulary conflicts with "Published/Draft" used elsewhere | Low |
| **Accessibility** | Hero image upload had no alt-text field — WCAG 1.1.1 violation in resulting consumer page | High |

---

## 3. Architectural Decision Record

### Container: Full-page editor (chosen)
- Replaced the 480px right-side drawer with `operator-hc-edit.html`
- Sticky left section navigation (collapses to tab strip at ≤960px)
- Breadcrumb: `Manage HCs → Edit: {name}`
- Sticky bottom action bar: status pill · Save Draft · Publish

### Data scope: Narrative + media + taxonomy only (chosen)
- Impact statistics (lives impacted, donor counts, attendance rate, charts) are **backend-derived**
- Editor shows these as **read-only auto-tracked preview** (Section 7)
- No editable stat fields — prevents operators from self-reporting inflated metrics

---

## 4. Files Changed

| File | Change |
|------|--------|
| `NewUnera/operator-hc-edit.html` | **Created** — full 7-section editor |
| `NewUnera/operator-hc-management.html` | **Refactored** — drawer/cropper removed, table enhanced (slug, region, categories, completeness meter, search+filter), buttons re-wired to new editor |

---

## 5. Completeness Meter Weights

The editor header bar shows a live completeness score (0–100%). Weights used:

| Section | Field(s) | Weight |
|---------|---------|--------|
| Basics | Name | 10% |
| Basics | Location | 5% |
| Basics | Region | 5% |
| Basics | Categories (≥1) | 5% |
| Story | Short description | 10% |
| Story | Full story (≥50 words) | 15% |
| Programs | ≥1 program | 10% |
| Donation | ≥1 preset | 10% |
| Testimonial | Quote + name | 5% |
| Media | Hero image | 15% |
| Media | Listing thumb | 5% |
| Media | ≥3 gallery images | 5% |
| **Total** | | **100%** |
