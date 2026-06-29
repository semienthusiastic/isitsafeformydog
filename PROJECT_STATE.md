# Project State — Is It Safe For My Dog

**Last updated:** June 2026
**Purpose:** Single-source onboarding document for any collaborator (human or AI) resuming work on this project. Read this before doing anything else.

---

## 1. What this site is

**Domain:** isitsafeformydog.com
**Stack:** Astro 5 (static site generator) + Tailwind CSS + Cloudflare Pages (hosting and CDN, replacing earlier Netlify deployment) + GitHub (source control). Domain is registered separately; DNS is managed via Cloudflare.

**Concept:** A reference site that helps dog owners find calibrated, properly-sourced answers about whether common foods are safe for their dogs. The site currently has ~250 individual food pages, plus trust-foundation pages (About, Editorial Standards, Contact, Privacy Policy) and a /foods/ hub page.

**Operator:** Patrick (Dublin, Ireland). The site is one property in a small portfolio aimed at building passive income through advertising, affiliate links, and (eventually) sponsorship. The author byline on individual food pages is a pen name — **Claire Donnelly** — used consistently across all pages.

**Editorial philosophy:** The site's central commitment is **calibrated accuracy** — neither overstating risk (the dominant failure mode of competing content) nor understating it. Each page is built from verified veterinary toxicology sources (ASPCA, Merck Veterinary Manual, AKC, Pet Poison Helpline, VCA Hospitals) with dose math where relevant, and is openly transparent about uncertainty, source disagreements, and where popular narratives diverge from the evidence base. This calibration discipline is the site's primary competitive advantage and trust asset.

**Monetisation model:** Amazon Associates affiliate links on individual pages (active as of June 2026), with future ad revenue (AdSense or similar) when traffic justifies it. Affiliate links are placed where genuinely useful to the reader, with prominent disclosure that they never affect safety assessments.

---

## 2. Working conventions

### 2.1 Source verification (non-negotiable)

- **Only confirmed-200 URLs are cited.** Before any source URL is used in a page, it must be verified to load successfully with a browser User-Agent. Guessed URLs and dead links are the cardinal mistake.
- **The `source` and `sourceUrl` frontmatter arrays must be the same length and in the same order.** This is an invariant. Mismatches break the template's source-rendering logic.
- **Source quality hierarchy:** ASPCA, Merck Veterinary Manual, AKC, Pet Poison Helpline, VCA Hospitals are first-tier. PetMD, Hill's Pet Nutrition, UFAW are acceptable for supplementary evidence. Avoid forums, content farms, and general SEO content.
- **A page should typically cite 4-5 sources.** Fewer reads as undersourced; more clutters the page.

### 2.2 Status calibration

Status is a frontmatter field with four possible values:

- **Safe** — no realistic veterinary concern at typical exposure. Used sparingly; most "safe" foods still warrant a Caution if portion size or preparation matters.
- **Caution** — dose-dependent concern. Real but not categorically toxic. Most pages on the site end up here.
- **Toxic** — a real veterinary toxin at realistic exposure levels. Used for foods with actual documented toxicity in dogs at quantities owners might encounter.
- **Emergency** — acute time-critical hazard requiring immediate veterinary action before symptoms appear. Used only for the very narrow set of foods where waiting could be fatal (xylitol, pizza dough due to raw yeast/ethanol fermentation in the stomach, etc.).

**Calibration discipline:** The popular framing of "X is toxic to dogs" is correct for some foods and overstated for others. The page should reflect what the veterinary evidence actually says, not the popular framing. Common calibration corrections we've made: avocado (popular "toxic" framing is overstated — Pet Poison Helpline explicitly says non-toxic to dogs), nutmeg (the myristicin concern is real but at quantities far higher than realistic exposure), Italian seasoning (pure herb blends — no allium, not Toxic).

### 2.3 Page structure (current standard)

A page follows this skeleton, in order:

1. **Frontmatter:** name, metaTitle, category array, status, image path, description, source array, sourceUrl array, keywords array, shortAnswer array.
2. **Short answer** rendered from the shortAnswer frontmatter array (template-driven).
3. **Affiliate disclosure blockquote** (if any affiliate links present on the page).
4. **Recommendations on this page** panel (top-of-page summary, if affiliate links present).
5. **## Is [Food] Safe for Dogs?** — main answer section, calibration overview.
6. **Hazard/concern sections** — one or more `##`-level sections covering specific issues (allium content, fat load, sodium, specific toxins, etc.) with verified sources, dose math where relevant.
7. **## Symptoms to Watch For** — clinical signs, with onset timing and severity bands.
8. **## What To Do** — practical, scenario-based guidance.
9. **## Frequently Asked Questions** — anticipates common reader questions, especially the "why does the internet say X?" meta-honesty FAQ that's become a signature of the site.
10. **## About This Guide** — Claire Donnelly byline, methodology overview, sources for the figures section.
11. **Disclaimer line** — "This page is informational only and does not constitute veterinary or medical advice."

### 2.4 Pen-name discipline

The author byline on every page is **Claire Donnelly**. No identifying personal specifics about Claire are ever introduced (no "I have a Border Collie called X", no "in my 20 years of veterinary practice"). The framing in the About section is consistent across pages: "researched and written by Claire Donnelly… we are not veterinarians… each guide is compiled from published veterinary sources… cross-checked before publication."

### 2.5 Internal linking

Pages cross-link to related foods using slug-based URLs. Before adding any internal link, verify the slug exists. Most useful clusters established:

- **Allium cluster:** /onions/, /garlic/, /garlic-powder/, /pesto/, /marinara-sauce/, /hummus/, /guacamole/, /worcestershire-sauce/, /soy-sauce/
- **Tomato cluster:** /tomato-paste/, /tomato-sauce/, /marinara-sauce/, /pasta-sauce/, /ketchup/
- **Avocado pair:** /avocado/, /guacamole/
- **Broth pair:** /chicken-broth/, /beef-broth/
- **Salt-and-flavour pair:** /soy-sauce/, /worcestershire-sauce/

### 2.6 Editorial corrections (transparency principle)

When a page corrects or contradicts something that's stated elsewhere in popular dog-food coverage, the correction is made openly. Examples in current pages:

- The Worcestershire page openly notes that the previous version's PPH citation was a factual error.
- The avocado page directly states "The previous version of this page cited the Pet Poison Helpline as a source for classifying avocado as unsafe for dogs. That was a factual error: PPH holds the opposite position."
- The Italian seasoning page openly notes the recalibration from Toxic to Caution.

This transparency about correction is part of the site's trust-building discipline. It's not hidden or quietly redone; it's owned.

---

## 3. Visual treatment for affiliate content (Option C — established)

Affiliate content appears in **two distinct visual elements**, both implemented as Tailwind utility classes in `src/styles/global.css`:

### 3.1 `.recommendations-panel` — the top-of-page summary

**Purpose:** Skim-readers see all affiliate recommendations near the top of the page without reading the body.

**Visual specification:**
- Background: very pale amber — `rgb(255 251 235 / 0.5)` (amber-50 at half opacity, barely-warm off-white)
- Border: 1px all-around, amber-200
- Padding: p-5
- Vertical margin: my-6
- Label heading: text-xs uppercase tracking-wider, amber-700
- Internal list: bullets, space-y-3
- **Link colour: blue-700** (matches site link colour — signals "editorial navigation," not "promotional placement")

**Placement on page:** Immediately after the affiliate disclosure blockquote and before the first `##` heading.

**Content structure:** Heading reads "Recommendations on this page". Each bullet contains: a category label (bold prefix like "Recommended substitute:" or "For preparedness:"), the product name, a brief one-line descriptor, and a "View on Amazon →" link.

### 3.2 `.affiliate-callout` — body callout boxes

**Purpose:** Engaged readers reading the body of the page encounter recommendations at contextually-appropriate moments.

**Visual specification:**
- Background: amber-50 (full opacity — visibly warm)
- Border: 4px left-only, amber-400 (visible accent stripe)
- Border-radius: rounded on the right side only
- Padding: p-5
- Vertical margin: my-6
- Label at top: text-xs uppercase tracking-wider, amber-700
- **Link colour: amber-700** (within the warm callout palette — reads as part of the recommendation, not as standard navigation)

**Placement on page:** At contextually-natural moments within the body prose. Examples of placements that have worked well:

- The treat-substitute callout sits inside a "Safer ways to add flavour" or equivalent section, after the prose discussion of what to give instead.
- The first-aid kit callout sits inside the "Symptoms to Watch For" section, immediately after the symptoms list — at the moment when a reader is naturally thinking about preparedness.
- The book callout sits near the close of the page, after the FAQ and before "About This Guide".
- The specific-product callout (Tier 1 pages) sits at the "payoff" moment — e.g., after the label-checklist on the broth page, where the callout reads as the page delivering on a checklist it just described.

### 3.3 Content structure inside each callout

Both callouts share an internal structure:

1. **Label** (top, small uppercase) — e.g., "RECOMMENDED SUBSTITUTE", "FOR PREPAREDNESS", "FOR FURTHER READING", "DOG-SAFE ALTERNATIVE", "EMERGENCY PREPAREDNESS".
2. **Product name** in bold.
3. **One-or-two-sentence justification** explaining why this product fits this context.
4. **"View on Amazon →" link**.

### 3.4 Affiliate disclosure block

Standard wording, placed near the top of any page carrying affiliate links:

> *This guide contains affiliate links. If you purchase via these links, we may earn a small commission at no extra cost to you. This never affects our safety assessments — see our [Editorial Standards](/editorial-standards/) for how we work.*

One disclosure per page covers all affiliate links on that page.

### 3.5 Standing affiliate URLs (used across multiple pages)

**Amazon Associates tracking ID:** `isitsafeformy-20` (US program).

- **Stewart Pro-Treat Freeze-Dried Beef Liver** (treat substitute, used on Category 1 pages): see bacon.md for the full URL string.
- **ARCA Pet First Aid Kit** (preparedness, used on all affiliate-monetised pages): see bacon.md.
- **The Forever Dog by Habib & Becker** (further reading, used on all affiliate-monetised pages): see bacon.md.

### 3.6 Page-specific affiliate URLs (Tier 1)

- **evaporated-milk:** PetAg Esbilac Powder Milk Replacer — `https://amzn.to/4vx8cdb`
- **chicken-broth:** Honest Kitchen Chicken Bone Broth — `https://amzn.to/4xaHrx3`
- **beef-broth:** Honest Kitchen Beef Bone Broth — `https://amzn.to/4gco00q`
- **pizza-dough:** Pet emergency window decal — `https://amzn.to/4oduyy7`

### 3.7 Page categorisation for affiliate purposes

- **Tier 1 (three callouts, specific product + first-aid kit + book):** evaporated-milk, chicken-broth, beef-broth, pizza-dough.
- **Category 1 (three callouts, treat substitute + first-aid kit + book):** Condiment and sauce pages where a "savoury meat treat" recommendation is editorially natural. Currently includes: bacon, soy-sauce, pesto, marinara-sauce, ketchup, pasta-sauce, hummus, worcestershire-sauce, cream-of-mushroom-soup.
- **Category 3 (two callouts, first-aid kit + book only):** Pages where no third specific-product recommendation is editorially defensible. Currently includes: nutmeg, italian-seasoning, tomato-paste, tomato-sauce, avocado, guacamole.

---

## 4. Current project state

### 4.1 Pages rewritten with calibrated content

19 priority pages completed, in approximate chronological order:

1. soy-sauce
2. cream-of-mushroom-soup
3. nutmeg (Toxic — calibrated)
4. pesto (recalibrated Toxic → Caution)
5. pizza-dough (Emergency — only such page on site)
6. evaporated-milk
7. tomato-paste
8. beef-broth
9. chicken-broth
10. marinara-sauce
11. italian-seasoning (recalibrated Toxic → Caution)
12. pasta-sauce
13. tomato-sauce
14. ketchup
15. hummus
16. guacamole (renamed from guacomole.md — file rename in git history)
17. avocado
18. worcestershire-sauce
19. bacon (first affiliate-monetised page, prototype for affiliate visual treatment)

### 4.2 Pages with full Option C affiliate treatment

Confirmed via manual spot-check (June 2026):
- bacon ✓
- soy-sauce ✓
- marinara-sauce ✓
- italian-seasoning ✓
- chicken-broth ✓

Confirmed NOT yet retrofitted:
- hummus
- evaporated-milk
- pesto
- ketchup
- pasta-sauce
- worcestershire-sauce
- cream-of-mushroom-soup
- nutmeg
- tomato-paste
- tomato-sauce
- avocado
- guacamole
- beef-broth
- pizza-dough

**Outstanding retrofit work:** ~14 pages.

### 4.3 Trust foundation pages

All built and live:
- /about/
- /editorial-standards/
- /contact/
- /privacy-policy/

Footer wired with all four links. About page references Claire Donnelly byline consistently.

### 4.4 Structural fixes (completed)

- Title-tag infrastructure (metaTitle optional with template fallback)
- Content config consolidated at src/content.config.ts
- Category-page /undefined/ bug fixed (use food.id not food.slug — Astro 5 glob loader gotcha)
- /foods/ hub page built and linked in header and footer
- Status badge styling (Emergency badge with bg-red-600 animate-pulse)
- All 246 foods have valid categories — no orphans confirmed
- .slug grep sweep clean (search.json's .slug is custom-derived from item.id)

### 4.5 Analytics trajectory (June 2026)

Three independent readings, all showing sustained healthy growth:

| Metric | March 2026 | Early May 2026 | June 2026 |
|---|---|---|---|
| Organic Search sessions (30 days) | 22 → 62 (+182%) | 29 → 76 (+162%) | 70 → 111 (+58.57%) |
| Engaged sessions (30 days) | 7 → 19 (+171%) | 9 → 27 (+200%) | 23 → 41 (+78.26%) |
| Engagement rate | ~31% → 31% | 32% → 36% | 32.86% → 36.94% |
| Search Console clicks (28 days) | n/a | 26 → 58 (+123%) | 55 → 83 (+43%) |
| Search Console impressions (28 days) | n/a | 27.8K → 40.7K (+46%) | 36.9K → 64.7K (+59%) |
| Pages indexed | n/a | 114 | 124 |
| Pages not indexed | n/a | 166 | 162 |

At ~3.7 real organic visitors per day, traffic is small in absolute terms but on a clean compounding trajectory.

---

## 5. Methodology

### 5.1 Per-page rewrite workflow

1. **Research and verify:** Claude Code researches the food, identifies primary veterinary sources, verifies each URL returns 200 with a browser User-Agent, drafts research findings noting any source disagreements, calibration calls, and current-page inaccuracies.
2. **Claude (chat) reviews calibration:** Claude (the model in the chat interface, distinct from Claude Code) reviews the research for source verification, status calibration, dose math accuracy, and editorial framing. Operates in "streamlined verification mode" — focuses on figures, calibration, and sources, not on prose-level edits.
3. **Draft:** Claude Code writes the page, applying the established structure and conventions.
4. **Approve:** Claude reviews the draft, flags any specific framing concerns, approves or requests refinement.
5. **Commit:** Patrick previews the page on localhost, clicks all source links and affiliate links in a browser, then commits and pushes manually (Claude Code's pushes have historically failed silently — Patrick handles all git push operations).
6. **Request indexing:** Patrick requests indexing of the new page URL in Google Search Console.

### 5.2 Build-then-preview discipline

For any URL or template changes, the build process is `npm run build` followed by `npm run preview` — not `npm run dev` alone. Astro's dev mode does not fully replicate production routing behaviour, and several bugs (notably the /undefined/ category page issue) only manifest in production builds.

### 5.3 Division of labour

- **Patrick:** Strategy, editorial direction, product verification on Amazon, all git push operations, all Search Console indexing requests, all analytics reading.
- **Claude (chat interface):** Calibration verification, framing review, instruction-writing for Claude Code, strategic guidance, analytics interpretation.
- **Claude Code (terminal):** Research, source URL verification, content writing, file editing, CSS implementation, batch operations.

### 5.4 Commit discipline

Pages are committed individually, not in batches. This makes any single page rollback-able without affecting others. Patrick commits each page after personal preview on localhost.

### 5.5 Streamlined verification (current mode)

After the first ~10 page rewrites, the calibration process was streamlined: Claude no longer reviews prose at the sentence level. Claude reviews research findings, source URLs, status calibration, and dose math; Claude Code drafts the page; Claude reviews the draft for editorial framing, structural integrity, and any specific concerns; Patrick handles final verification (link clicks, preview) and commit. This is the operational mode that scales.

---

## 6. Backlog and next steps

### 6.1 Immediate next: complete the affiliate retrofit

See section 4.2 — ~14 pages still need the Option C affiliate treatment applied. This should be done before any new rewrites, so the affiliate infrastructure is uniform across all rewritten pages.

### 6.2 Next rewrite (after retrofit completes): peanut-butter

Selected as the next rewrite because: it has the strongest affiliate fit of any unwritten page (xylitol-free peanut butter is a meaningful safety recommendation, not opportunistic), it's high-traffic, and the calibration is genuinely important (xylitol concerns are real and dose-critical). The page should be built with affiliate links from launch, not retrofitted later.

Candidate xylitol-free peanut butter products to consider: Crazy Richard's 100% Natural, Smucker's Natural, Teddie All Natural, Kirkland Signature Organic, Bark Bistro Buddy Budder. Verify on Amazon at time of rewrite.

### 6.3 Parked

- **Off-site SEO:** Reddit and Pinterest were identified as candidate pilot channels. Decision deferred — choose one and pilot for 8 weeks rather than spreading effort across both.
- **AdSense application:** Not yet at threshold (~100 daily real visitors). Re-evaluate when organic traffic crosses ~50/day. Currently ~3.7/day, so 3-6 months out at current trajectory.
- **Citation cleanup (background work):** 5 Safe pages with zero sources, 65 Caution pages with zero sources, 61 pages with one source, 111 healthy pages needing dead-link strips. Still on hold.
- **Email forwarding for the contact page** ([CONTACT EMAIL] placeholder still in place). Recommended: Cloudflare Email Routing (free).

### 6.4 Not in scope (deliberately)

The following have been considered and deliberately not pursued, for clear reasons:

- **No CMS** — content lives as markdown files in the repo. CMS adds operational complexity without proportionate benefit.
- **No React** — vanilla Astro components only. React is overkill for what this site needs.
- **No comments system** — invites moderation burden and spam. Not worth the operational cost.
- **No recommendations for specific dog food brands** — gets into directory-style territory that would require separate editorial framework. Books, single-ingredient treats, and clearly-safe specific products only.
- **No persuasive content about contested topics** (raw food diets, particular feeding philosophies) — calibrated information is the site's promise; advocacy isn't.

---

## 7. Glossary of project-specific terms

- **Option C:** The affiliate visual treatment combining a top-of-page summary panel with body callouts — chosen because it serves both skim-readers and engaged readers.
- **Calibrated accuracy:** The site's central editorial principle — neither overstating nor understating risk relative to the veterinary evidence.
- **YMYL:** "Your Money or Your Life" — Google's term for high-stakes content where editorial accuracy is critical (health, safety, finance). Dog food safety qualifies.
- **Tier 1 / Category 1 / Category 3:** The affiliate-placement categorisation from section 3.7.
- **Streamlined verification:** The current calibration review mode — Claude reviews figures, sources, and calibration; not prose.
- **Cluster:** A group of related pages that cross-link as a topical authority unit (allium cluster, tomato cluster, etc.).
- **Meta-honesty FAQ:** A signature FAQ pattern on calibration-correction pages, of the form "Why does the internet say X?" — addresses the misconception directly and explains its source.

---

## 8. Update cadence

This document should be updated:

- **After every batch of rewrites** — update section 4.1 with new pages.
- **After every affiliate retrofit batch** — update section 4.2.
- **After every analytics check** — append the new reading to section 4.5.
- **When any convention changes** — update sections 2 or 3 accordingly.
- **When any next-step decision is made** — update section 6.

The intent is that any collaborator (human or AI) reading this document at any future point should have an accurate picture of the project state, conventions, and the reasoning behind decisions.
