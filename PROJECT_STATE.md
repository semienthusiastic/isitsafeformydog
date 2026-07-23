# Project State — Is It Safe For My Dog

**Last updated:** July 2026
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

### 2.7 Strategic positioning — AKC-seeking searchers

Search Console data (June 2026) reveals a meaningful and unusual user pattern: a substantial number of queries explicitly prefix the food query with "akc" — e.g. "akc can dogs eat pickles," "akc can dogs eat basil," "akc bone broth dogs onion garlic sodium," "akc can dogs eat raspberries xylitol." These users are deliberately seeking AKC-cited content rather than general results.

This is a competitive advantage the site is well-positioned to capture: the site already cites AKC consistently across pages, and the AKC-explicit queries are returning the site at positions 6-9 (page 1 borderline) on average.

**Implication for editorial decisions:** When choosing between competing source citations, AKC inclusion is meaningfully valuable — both for direct AKC-seeking traffic and as a trust signal for general searchers. When AKC has substantive coverage of a topic, cite it. When AKC's position is incomplete or non-canonical (as on avocado, where the AKC's calibration is less rigorous than Merck and PPH), still cite AKC but lead with the stronger sources. This is not about deferring to AKC editorially — it's about recognising that a meaningful slice of the target audience explicitly seeks AKC-sourced content.

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

**Principle: standing URLs by default, thematic substitution only where editorially better.**

The default is to reuse these standing URLs across pages. This is deliberate, not laziness — three reasons:

1. **Operational simplicity.** One product per slot, one URL to manage, one verification when something changes. Scales cleanly as the site grows.
2. **Compounding affiliate authority.** Amazon's system recognises patterns of traffic to consistent products, which modestly improves the buyer journey and conversion over time.
3. **Reader expectations.** "For further reading" is the same editorial intent on every page; recommending a different book on each page would feel arbitrary, not thoughtful.

Substitute a standing URL only when a page-specific product would *genuinely* serve the reader better — not for variety's sake. Concrete examples of when substitution is editorially defensible:

- **Treat substitute slot on meat-themed pages:** On a future fish-related page (salmon, tuna, sardines), freeze-dried fish treats fit better than freeze-dried beef liver. On a chicken or turkey page, freeze-dried chicken treats fit better. On the existing condiment cluster (Category 1 pages), the topic isn't meat — so generic beef liver as a "savoury treat" recommendation is right.
- **Book slot on emergency-themed pages:** A first-aid-specific book (e.g., *First Aid for Dogs* by Susan Daffron) might fit better than *The Forever Dog* on a genuinely emergency-tinged topic. Not a strict rule; a per-page editorial call.
- **First-aid kit slot:** Rarely worth varying. If a better kit is found on Amazon (better reviews, better contents, better availability), the right move is a one-time global update rather than per-page variation.

**Don't introduce a new specific product unless you can articulate why it's better than the standing one for that specific page.** The boring answer (use the standing URL) is usually right.

### 3.6 Page-specific affiliate URLs (Tier 1)

- **evaporated-milk:** PetAg Esbilac Powder Milk Replacer — `https://amzn.to/4vx8cdb`
- **chicken-broth:** Honest Kitchen Bone Broth Bites (baked treat with beef bone broth + sweet potato) — `https://amzn.to/4gW3npE`
- **beef-broth:** Honest Kitchen Bone Broth Bites — same URL and product as chicken-broth — `https://amzn.to/4gW3npE`
- **milk:** Honest Kitchen Bone Broth Bites — same URL — `https://amzn.to/4gW3npE`
- **pizza-dough:** Pet emergency window decal — `https://amzn.to/4oduyy7`

**Note on shared URL:** As of the milk page rewrite, three pages (chicken-broth, beef-broth, milk) share the same Honest Kitchen Bone Broth Bites URL. This replaced earlier `amzn.to` short links (`4xaHrx3` and `4gco00q`) that had drifted to Native Pet products despite the copy describing Honest Kitchen. See §5.7 for the affiliate URL verification discipline that emerged from catching this mismatch. Product framing on all three pages describes a "bone-broth treat" (a baked dog treat), not a "pourable broth" — the copy was updated to match the actual product accurately.

### 3.7 Page categorisation for affiliate purposes

- **Tier 1 (three callouts, specific product + first-aid kit + book):** evaporated-milk, chicken-broth, beef-broth, pizza-dough.
- **Category 1 (three callouts, treat substitute + first-aid kit + book):** Condiment and sauce pages where a "savoury meat treat" recommendation is editorially natural. Currently includes: bacon, soy-sauce, pesto, marinara-sauce, ketchup, pasta-sauce, hummus, worcestershire-sauce, cream-of-mushroom-soup.
- **Category 3 (two callouts, first-aid kit + book only):** Pages where no third specific-product recommendation is editorially defensible. Currently includes: nutmeg, italian-seasoning, tomato-paste, tomato-sauce, avocado, guacamole.

**Pure single-toxin explainer hubs and satellites — no affiliate treatment (established pattern, 12 pages total as of the chocolate-cluster satellite upgrade: xylitol; the five allium pages — onions, garlic, chives, green-onions, leeks; and the six chocolate/caffeine pages — chocolate, coffee, milk-chocolate, chocolate-chips, cocoa-powder, hot-chocolate-mix).** Pages whose primary purpose is explaining a genuine, serious toxin mechanism (haemolytic anaemia, hypoglycaemia, etc.) do not carry affiliate callouts, regardless of Toxic/Caution status. Reasoning: a product recommendation placed beside content describing a real medical emergency (potential transfusion, organ failure) creates a tonal mismatch that undercuts the page's credibility, and generic standing products (the ARCA first-aid kit, the Forever Dog book) typically don't address the specific hazard being explained, making their inclusion feel forced rather than genuinely useful. This is distinct from oregano's affiliate exclusion, which was a repair-rewrite scoping decision (§4.2) rather than a category rule — oregano's exclusion doesn't generalise the way this one does. When evaluating whether a new page fits this pattern, ask: is this page's primary purpose to explain a specific toxin's mechanism and dose thresholds (yes → no affiliate), or is it evaluating a food/product where a safer alternative genuinely helps the reader (no → normal Category 1/3 treatment applies)?

---

## 4. Current project state

### 4.1 Pages rewritten with calibrated content

44 priority pages completed, in approximate chronological order:

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
16. guacamole (renamed from guacomole.md — file rename in git history; redirect from old URL confirmed working)
17. avocado
18. worcestershire-sauce
19. bacon (first affiliate-monetised page, prototype for affiliate visual treatment)
20. peanut-butter (first page built with affiliate links from launch; xylitol calibration centrepiece)
21. eggs (first page selected by data-driven prioritisation per §6.5; dropped dead VCA citation, see §2.6 transparency principle)
22. mayonnaise (§6.5 data-driven prioritisation; used AKC "Human Foods Dogs Can and Can't Eat" as substituted source with transparent attribution — established pattern for no-dedicated-AKC-page situations)
23. yogurt (§6.5 data-driven prioritisation; xylitol calibration correction — mainstream sugar-free yogurts don't use xylitol despite popular framing; dairy cluster sibling to milk and evaporated-milk)
24. curry-powder (§6.5 data-driven prioritisation; ingredient-list-led framing — allium is the real concern, not "curry powder is toxic" generic claim; sibling calibration to italian-seasoning)
25. milk (§6.5 data-driven prioritisation; dairy cluster anchor — highest-lactose in the cluster progression; discovered/corrected the affiliate URL drift documented in §5.7)
26. oregano (repair-rewrite of a pre-existing truncated page discovered during citation cleanup Batch 2; ASPCA "toxic" reframe — the toxic principle is a GI irritant, not systemic; herbs cluster sibling to italian-seasoning; no affiliate treatment since not on the priority page list)
27. lemon (§6.5 data-driven prioritisation; calibration anchored on the ASPCA's own quote that "the fruit is edible" while skin/pith/plant material concentrate the actual psoralen concern — part of the "risk-overstating myth" set with oregano and avocado, see §7; distinct sub-treatment for peel/pith/rind exposure scenarios, essential-oil caution cross-linked to oregano's established principle, and lemon-flavoured products where the citrus toxicology doesn't actually apply and sugar/xylitol are the real concern instead; Category 3 affiliate, matching avocado's precedent; status Caution)
28. tortillas (§6.5 data-driven prioritisation, first page shipped off the data-driven priority list; Caution is category-driven — plain tortilla low-concern, while seasoned/allium wraps and chip salt-fat variants carry the real risk; AKC/PetMD grain-framework attribution per the mayonnaise pattern; Category 3 affiliate)
29. onions (canonical allium hub — full dose-math table, delayed-onset timeline, all-forms-toxic detail, breed-sensitivity note for Akita/Shiba Inu; the site's most heavily cross-linked page, rewritten to deliver on promises made by pesto, marinara-sauce, hummus, guacamole, worcestershire-sauce, curry-powder, tortillas, and others; no affiliate treatment — see §3.7)
30. garlic (second canonical allium hub — derived dose table shown transparently as onion's threshold × Merck's potency multiplier since Merck publishes no standalone garlic g/kg figure; includes the "garlic is a natural flea treatment" myth rebuttal via AKC's direct quote — the site's first "harm-encouraging myth" FAQ, see §7; no affiliate treatment)
31. chives (satellite; restored from 2 sources to 5 after citation-cleanup removal; calibration: raw garnish quantities are low per-incident dose, but chive-flavoured products — chive cream cheese, sour-cream-and-chive dips — are the realistic higher-exposure route; no affiliate treatment) (updated July 2026 with a reciprocal cross-link to /sour-cream/, its "other half of the same dip" sibling page — see §4.1 entry 44)
32. green-onions (satellite; restored from 2 sources to 4; calibration: milder allium concentration per gram than mature onions, but eaten raw in larger garnish quantities — realistic exposure can exceed the "milder" framing; no affiliate treatment)
33. leeks (satellite; restored from 2 sources to 4; calibration: "lower incidence, not lower toxicity" — poisoning is rarer because leeks are usually cooked into dishes rather than shared as snacks, not because they're less toxic gram-for-gram; sources include ASPCA's general people-foods page rather than an adjacent-topic proxy, per §5.9 discipline; no affiliate treatment)
34. white-chocolate (§6.2 undersourcing fix; restored from 1 source to 4; calibration anchored on Merck's theobromine-by-chocolate-type table — white chocolate at 0.04 mg/g is "a negligible source of methylxanthines" versus milk's 2.3 mg/g and dark's 5.3-5.6 mg/g; status Caution unchanged, but the real concern reframed from theobromine to fat/sugar/additives — macadamia, raisins, xylitol in some products; Category 3 affiliate)
35. tea (§6.2 undersourcing fix; restored from 2 sources to 4; status recalibrated Toxic → Caution — see §5.10 for the site's status-recalibration transparency discipline; caffeine content varies by type, herbal teas are usually caffeine-free entirely; distinct higher-risk treatment for dry tea bags/leaves eaten whole, concentrated and undiluted; Category 3 affiliate)
36. soda (§6.2 undersourcing fix; restored from 2 sources to 4; status recalibrated Toxic → Caution, same rationale family as tea — caffeine varies enormously by product, many sodas (root beer, citrus) are caffeine-free entirely; sugar reframed as the more realistic everyday concern than caffeine; diet-soda xylitol check with named current products (Diet Coke, Coke Zero, Diet Pepsi, Pepsi Zero — verified aspartame/ace-K/sucralose, not xylitol, as of July 2026); Category 3 affiliate)
37. chocolate (hub upgrade; canonical theobromine-by-type reference table (Merck) — white 0.04 mg/g through cocoa powder 28.5 mg/g — plus per-bodyweight dose math; explicit onset-timeline distinction from allium's delayed 3-5 day presentation, since chocolate/caffeine act within hours; cross-links to all five satellites (milk-chocolate, white-chocolate, cocoa-powder, hot-chocolate-mix, chocolate-chips); no affiliate treatment per §3.7)
38. coffee (hub upgrade, the site's caffeine reference; corrected the earlier tea/soda-era assumption that no clean mg/kg caffeine table exists — Merck's methylxanthine thresholds apply to caffeine as well as theobromine, so coffee carries a proper per-kg dose table; emphasises grounds/beans as the real danger over brewed coffee, plus a caffeine-pills/supplements callout via VCA's "1-2 pills can be fatal" reference; explicit Toxic-status rationale contrasting the tea/soda Caution recalibration — no caffeine-free coffee equivalent exists; no affiliate treatment per §3.7)
39. milk-chocolate (chocolate-cluster satellite upgrade; restored 3→4 sources with Merck added; tier calibration — lowest theobromine of the true chocolates (~64 mg/oz), but the form most often eaten in whole-bar quantity, so "lowest tier" doesn't mean low real-world exposure; no affiliate treatment per §3.7)
40. chocolate-chips (satellite upgrade; restored 3→4 sources; the batch's standout correction — standard semi-sweet chips are dark-chocolate-tier (~150 mg/oz), more than double milk chocolate per gram, contrary to their "mild baking ingredient" appearance; dedicated meta-honesty FAQ; no affiliate treatment)
41. cocoa-powder (satellite upgrade; restored 3→4 sources; highest-tier satellite — ~807 mg/oz, roughly 12× milk chocolate by weight; includes the cocoa-mulch outdoor exposure scenario; no affiliate treatment)
42. hot-chocolate-mix (satellite upgrade; restored 3→4 sources; mirror-image correction to chocolate-chips — the cocoa is diluted ~12-fold by sugar/milk powder, landing at milk-chocolate tier (~2 mg/g) despite the "chocolate powder" appearance suggesting cocoa-powder-level concentration; explicitly framed as the opposite-direction counterpart to chocolate-chips; no affiliate treatment)
43. paprika (§6.2 data-driven prioritisation; cleared two dead sources — AKC and PetMD paprika-specific URLs both 404, framework/analog attribution used instead (AKC general framework, PetMD bell-peppers as the on-topic pepper baseline); key calibration finding — sweet and smoked paprika sit at ~0 Scoville heat, so the popular "capsaicin will irritate your dog" warning is overstated for the common types; Caution is category-driven by hot paprika varieties, allium-laden seasoning blends (BBQ rubs, taco seasoning), and salt in those same products — same "plain form is low-concern, the blend is the real hazard" pattern as curry-powder and tortillas; herbs/spices cluster sibling to oregano, italian-seasoning, curry-powder; Category 3 affiliate)
44. sour-cream (§6.2 data-driven prioritisation; cleared three dead sources — AKC, PetMD, and VCA-lactose all 404, framework/analog attribution used (AKC framework, PetMD-yogurt as the closest cultured-dairy analog, VCA-allium for the flavoured-dip risk); central finding — sour cream splits into two distinct questions: plain sour cream is a fat-and-lactose question (18-20% milkfat, higher than yogurt; lactose lower than milk, roughly level with yogurt), while flavoured sour cream (French onion dip, sour-cream-and-onion/chive) is potentially an allium question, using verified typical product ratios (~1 tsp onion powder + ½ tsp garlic powder per cup) to make the exposure concrete; explicit sibling cross-reference with chives.md — "two halves of the same dip" — added reciprocally to both pages; dairy cluster member alongside milk, yogurt, evaporated-milk; Category 3 affiliate)

### 4.2 Pages with full Option C affiliate treatment

All rewritten pages carry the Option C affiliate treatment (top-of-page recommendations panel + body callouts), with two categories of deliberate exception: (1) oregano.md, a repair-rewrite of a pre-existing truncated page rather than a data-driven or cluster-based editorial promotion (see this section's original note below); and (2) the twelve pure single-toxin explainer hubs and satellites — xylitol, onions, garlic, chives, green-onions, leeks, chocolate, coffee, milk-chocolate, chocolate-chips, cocoa-powder, hot-chocolate-mix — which are excluded as a category rule per §3.7, not a page-specific decision. Repair-rewrites restore structural integrity to broken pages without adding monetisation infrastructure that wouldn't otherwise be justified for that page's traffic profile. This distinction is worth preserving as a general principle: not every rewrite needs affiliate treatment.

The retrofit batch completed across all previously-rewritten pages; subsequent rewrites through milk launched with affiliate treatment from the start.

The pizza-dough page uses a deliberate variation on the standard layout: the affiliate disclosure and panel are placed *after* the emergency-triage block rather than before, so a reader arriving in panic gets the critical "call your vet now" information before any affiliate content. This is the rule for any future Emergency-status page.

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

### 4.5 Analytics trajectory (March–July 2026)

Three independent readings, all showing sustained healthy growth:

| Metric | March 2026 | Early May 2026 | June 2026 | July 2026 | Reading 5 (July 21, 2026) |
|---|---|---|---|---|---|
| Organic Search sessions (30 days) | 22 → 62 (+182%) | 29 → 76 (+162%) | 70 → 111 (+58.57%) | 94 → 245 (+161%) | 104 → 341 (+228%) |
| Engaged sessions (30 days) | 7 → 19 (+171%) | 9 → 27 (+200%) | 23 → 41 (+78.26%) | 31 → 111 (+258%) | 40 → 158 (+295%) |
| Engagement rate | ~31% → 31% | 32% → 36% | 32.86% → 36.94% | 33% → 45% | 38.5% → 46.3% |
| Search Console clicks (28 days) | n/a | 26 → 58 (+123%) | 55 → 83 (+43%) | data unavailable | — |
| Search Console impressions (28 days) | n/a | 27.8K → 40.7K (+46%) | 36.9K → 64.7K (+59%) | ~2K → ~8.5K daily impressions | — |
| Pages indexed | n/a | 114 | 124 | 146 → 279 | — |
| Pages not indexed | n/a | 166 | 162 | n/a | — |

At ~3.7 real organic visitors per day, traffic is small in absolute terms but on a clean compounding trajectory.

Reading 4 (July 2026) — inflection point. Organic sessions climbed from 94 → 245 in 28 days (+161%). Engaged sessions climbed from 31 → 111 (+258%). Engagement rate jumped from 33% → 45%. Average engagement time nearly doubled (22.6s → 40.8s). Real organic visitors climbed from ~3.7/day to ~8.75/day.

The causal explanation is documented in §4.6: Batches 1 and 2 of the citation cleanup (committed June 30 2026) apparently produced a site-wide indexing boost, moving Google's indexed page count from 146 → 279 within 24 hours. Daily impressions climbed from ~2,000 to ~8,500 over the following ten days. This drove significant additional traffic beyond what the page rewrites alone had been producing.

§6.5 hypothesis confirmed: The data-driven page selection strategy is producing meaningfully faster traffic growth than the cluster-based approach did in earlier periods. Combined with the discovery that structural cleanup has quantifiable indexing benefits, the current methodology (rewrites + cleanup) is compounding at a materially faster rate than any prior reading predicted.

AI Assistant channel first appearance. Two sessions in this reading arrived from AI Assistant referrals (ChatGPT, Perplexity, Claude directing users to calibrated content). Small but a genuine new channel signal — the site's calibrated approach is exactly what LLMs prefer to cite.

**Reading 5 (July 21 2026) — strongest single reading yet.** Organic Search sessions climbed 104 → 341 in 28 days (+228%), exceeding even Reading 4's inflection jump. Engaged sessions rose 40 → 158 (+295%), engagement rate to 46.3%, and average engagement time nearly doubled (28.3s → 39.8s). This reading lands after the full toxin-hub arc (allium batch, chocolate/caffeine batch, chocolate/coffee hub upgrade, chocolate-cluster satellites) — strong evidence that both the calibrated-rewrite pace and the citation-cleanup structural work continue to compound rather than plateau. AI Assistant channel sessions ticked from 0 to 2 — still negligible but present in back-to-back readings now.

### 4.6 Citation cleanup and structural alignment (completed June 2026)

A substantial infrastructure cleanup pass was completed across the site. The work was originally scoped in §6.3 as "fixing zero-source and single-source Caution pages," but a preliminary audit revealed the actual state was different: a prior pass had given every page at least 2 sources, so the cleanup problem was entirely a **link decay** problem rather than a **missing sources** problem. The work reshaped accordingly into two mechanical batches plus one repair-rewrite:

**Batch 1 — ASPCA URL swap** (43 pages, committed June 30 2026). Four dead ASPCA "people foods" URL variants were mechanically replaced with the single confirmed-live URL (`.../aspca-poison-control/people-foods-avoid-feeding-your-pets`). Paired `source` names standardised to "ASPCA — People Foods to Avoid" for consistency with rewritten pages. Zero editorial risk (URL swap operation); high-leverage (one operation fixed ~38 page-instances of the same problem, plus 3 dead ASPCA sub-URLs).

**Batch 2 — Legacy body citation blocks stripped** (220 pages, committed June 30 2026). Old-format pages carried citations twice — once via the template rendering from frontmatter, once as a redundant body `## Source Reference` block plus inline `Source: URL` lines. The body block was legacy from the pre-template era. Batch 2 mechanically stripped the redundant body content: `## Source Reference` heading and everything beneath it (up to but preserving the disclaimer), plus standalone inline `Source: URL` lines. This eliminated 224 dead body links across ~186 pages and structurally aligned old-format pages with the current template pattern. Rewritten pages were correctly excluded (they don't have `## Source Reference` blocks). A verification sample confirmed body citations were always a subset of frontmatter citations before the strip proceeded — no genuine body-only citations existed to preserve.

**Oregano repair-rewrite** (committed separately). Discovered during Batch 2: `oregano.md` was pre-existing broken content — cut off mid-FAQ at line 74, missing the standard disclaimer. Handled as a repair-rewrite using the herbs-cluster calibration (consistent with italian-seasoning): ASPCA "toxic" label reframed as GI-irritant, not systemic hazard; three-tier hazard structure (plain oregano low-risk vs. essential oil concentrated concern vs. allium-bearing blends). Repair-rewrites don't carry affiliate treatment.

**Cumulative structural improvement:** ~263 pages received structural improvement across the cleanup batches. The site's baseline integrity is now uniform: proper frontmatter citations rendered by the template, no legacy body duplication, no visible dead-link failure modes for readers of old-format pages. Rewritten pages (~26) remain the higher tier with affiliate treatment; old-format pages are now the "structurally aligned but not editorially rewritten" tier.

**What remains as future work:**
- Batch 3 — Toxic pages with real VCA/PPH replacement URLs available (chocolate cluster, xylitol, allium cluster, caffeine cluster, grapes/raisins). This is where the highest editorial priority of the remaining citation work sits. Approximately 15-20 pages requiring per-page attention rather than mechanical batching.
- Long-tail frontmatter dead-link repairs — some old-format pages still have dead URLs in the frontmatter `sourceUrl` array (not just body). The body-strip resolved the body problem site-wide, but frontmatter dead links remain until each page is individually addressed. Lower priority than Batch 3.

**Post-cleanup measurement (July 2026):** Analysis of Search Console indexing data revealed that Batches 1 and 2 produced a significant site-wide indexing boost. Between June 30 (Batches 1+2 committed) and July 1, Google's indexed page count for the site went from 146 → 279 — nearly doubling within 24 hours. Daily impressions climbed from ~2,000 to ~8,500 over the following ten days. The "Crawled — currently not indexed" bucket dropped from 154 → 33 pages.

This is a materially different result than we predicted when the batches were framed as "editorial credibility work." Structural cleanup on the site apparently produced ranking signals significant enough that Google promoted ~133 previously-not-indexed pages into active indexing — most of which are unrewritten old-format pages that benefited from the cleanup without receiving editorial rewrites.

**Implication for remaining cleanup work:** Batch 3b Session B (7 investigative Toxic-page items) and Batch 4 (long-tail frontmatter dead-link repairs) are likely to produce similar quiet indexing benefits when completed. Structural cleanup should be prioritised alongside — not after — page rewrites, given its demonstrated ranking impact.

**Batch 3b Session B (completed July 2026).** The seven investigative items were resolved: 2 healed with genuine live replacements (grapes → Merck's current grape/raisin/tamarind toxicosis page; chives → PetMD's moved poisoning-section page), 7 removed where no live same-food page existed on the flagged source (tea and soda's AKC caffeine citation; chives, green-onions, and leeks' AKC allium citations; white-chocolate's AKC and PetMD citations).

**The remove-vs-substitute discipline established:** when a dead URL's source site has no live page specifically covering the food in question, remove the citation rather than substitute a same-source page covering a broader or adjacent topic (e.g., don't cite AKC's general onion page as a replacement for a dead AKC chives-specific URL, even though the onion page does mention chives). This keeps every citation precisely matched to what it's cited for. The cost is that some pages lose sources they can't immediately replace.

**New finding:** six pages dropped below the site's 4-5 source guideline as a result of this discipline — white-chocolate (1 source, VCA only), plus tea, soda, chives, green-onions, and leeks (2 sources each). These are not currently in the site's priority rewrite list but are flagged as genuine candidates: each would benefit from a full rewrite that adds proper source coverage, consistent with how the allium cluster (onions, garlic, marinara, hummus, guacamole, pesto, worcestershire-sauce) and chocolate cluster were handled. See §6.2 for the updated priority list.

**Known body/frontmatter inconsistency on these six pages:** removing the dead sources left body prose that still names the removed source (e.g., green-onions' shortAnswer says "the ASPCA, Pet Poison Helpline, and the AKC all list..." despite AKC no longer being cited). This is out of scope for citation-cleanup batches (no body edits) and will resolve naturally when these pages get full rewrites.

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

### 5.6 Affiliate product selection workflow

When a new page needs a specific-product affiliate link, the workflow is: Claude (chat) suggests two or three candidate products with editorial reasoning for each; Patrick verifies the suggestions on Amazon (current availability, reviews, formulation), chooses one or substitutes a better alternative if found; Patrick generates the affiliate URL via SiteStripe (logged into Amazon Associates) and confirms the `tag=isitsafeformy-20` parameter is embedded; Patrick sends the URL back to Claude for integration into the page instruction for Claude Code. Standing URLs (book, first-aid kit, Stewart Pro-Treat for the existing Category 1 cluster) are reused without re-verification each time, unless availability concerns arise.

### 5.7 Affiliate URL verification discipline

Amazon short links (`amzn.to/...`) are opaque — the destination product is not visible in the URL string, unlike long-form Amazon URLs which contain the ASIN. Short links can also drift: if Amazon changes what the shortlink redirects to (product retired, ASIN consolidated, product replaced), the link on the site silently redirects to something else, potentially with copy that no longer matches.

This risk was surfaced during the milk page research (June 2026), when the `amzn.to/4xaHrx3` shortlink for chicken-broth and the `amzn.to/4gco00q` shortlink for beef-broth were found to redirect to Native Pet products, despite the page copy describing Honest Kitchen products. Both were valid affiliate links generating commission — just to the wrong products relative to the copy.

**Discipline going forward:**

1. **When rewriting any page that reuses an existing affiliate URL** (from PROJECT_STATE.md §3.5 or §3.6), verify the destination product still matches the described product before shipping. This is a one-click check via browser resolution of the short link.

2. **When integrating a new affiliate URL onto a page**, click through the affiliate URL and confirm the destination product matches the copy being written. Both directions of the check matter: the URL must lead to the right product, and the copy must describe the actual product accurately.

3. **Periodically (every 3-6 months), spot-check the standing affiliate URLs** — book, first-aid kit, Stewart Pro-Treat, and any Tier 1 URLs — to confirm they still resolve to the described products. This is a small maintenance task that prevents drift.

4. **For future pages, prefer full-form Amazon URLs where feasible** — while short links are cleaner, the ASIN visibility in full URLs makes drift immediately apparent. If a short link is chosen for aesthetic reasons, the verification discipline above becomes more important.

The full URLs generated by SiteStripe (the ones with the long parameter strings) are more durable than shortlinks; the shortlink is a convenience representation that can be repointed independently.

### 5.8 Post-change indexing requests

Google's crawl cadence on individual pages is slower than one might expect. Pages rewritten months earlier may not have been re-crawled even as the site as a whole has been re-crawled. Discovered in July 2026: italian-seasoning (rewritten April 24 2026) and green-onions (Batch 3 URL healing) were both still in the "Crawled — currently not indexed" bucket months after their improvements, because Google had not re-crawled them since the changes.

**Discipline:** When shipping any significant page change — whether a full rewrite or a targeted URL fix — request indexing in Search Console (URL Inspection → Request Indexing) shortly after the commit. This accelerates Google's re-crawl of the specific URL and can materially improve the time-to-visibility for the improved page.

**Sweep-request principle:** For older rewrites (or older cleanup targets) that may not have been re-crawled since their improvements, periodically sweep-request indexing on the earliest pages in the batch. The daily indexing quota (~10-12 requests) allows for a manual refresh of 30-40 URLs per week without impact on urgent requests. Patrick has done this sweep for the earliest rewrites in July 2026; it can be repeated any time an indexing gap is suspected.

### 5.9 Citation cleanup: remove vs. substitute discipline

When a citation cleanup task finds a dead URL and no live page on the same source specifically covers the food in question, remove the citation rather than substitute an adjacent or broader-topic page from the same source. For example, a dead AKC "can dogs eat chives" URL should not be replaced with AKC's general "can dogs eat onions" page, even though onions pages typically mention chives — the citation would no longer precisely support what it's cited for.

This discipline can drop a page below the standing 4-5 source guideline (§2.1). When that happens, flag the page as a rewrite candidate rather than force a substitute source into place. Undersourcing is more honest than false precision, and pages that fall below the guideline through this discipline are exactly the pages that benefit most from a proper rewrite.

### 5.10 Status recalibration transparency

When a rewrite changes a page's existing Toxic/Caution/Safe/Emergency status — not just its framing or sourcing, but the actual status field — the change must be stated explicitly and near the top of the page, not buried or left implicit. The reader should never have to infer that a recalibration happened; the page should say so directly and explain why.

This discipline has applied at two scales:
- **Single-page recalibrations** (Toxic → Caution): italian-seasoning, pesto — corrected because the original status assumed allium content that pure herb/pesto formulations don't actually have.
- **Coordinated multi-page recalibrations**: the chocolate/caffeine batch (July 2026) recalibrated both tea and soda from Toxic to Caution simultaneously, the first time the site has changed a status downward across multiple pages in one coordinated decision. The rationale in both cases: caffeine content varies enormously within the category (by tea type, by soda product), and a meaningful share of each category is genuinely caffeine-free (herbal teas; root beer and citrus sodas) — so a blanket Toxic label misrepresented the category. The safety margin is preserved in the action guidance, not the badge: a dog that ate concentrated tea leaves or a large amount of caffeinated soda still gets urgent guidance regardless of the page-level status.

**Recalibrations run in both directions on this site** — sometimes upward in caution (rare — most corrections found the popular framing already too alarmist) and sometimes downward, as with tea/soda. Downward recalibrations require the same rigor as upward ones: they must be source-anchored, transparent about the change, and must not weaken the actual safety guidance for the genuinely risky scenario within that category (e.g., tea bags eaten dry, concentrated caffeinated soda in a small dog).

---

## 6. Backlog and next steps

### 6.1 Completed (historical reference)

- **Affiliate retrofit** (completed): all 26 rewritten pages now carry Option C affiliate treatment (25 with three-callout treatment; oregano correctly excluded as a repair-rewrite per §4.2).
- **Peanut-butter rewrite** (completed): page 20 in §4.1; xylitol calibration centrepiece; affiliate-from-launch discipline established.
- **Citation cleanup batches 1 and 2** (completed June 2026): 43-page ASPCA URL swap plus 220-page legacy body citation block strip. See §4.6 for the full record.
- **Sitemap and robots.txt** (completed June 2026): sitemap generation confirmed working via `@astrojs/sitemap`; robots.txt added at `public/robots.txt` pointing to the sitemap. Sitemap advertised via standard `Sitemap:` directive; other search engines can now auto-discover it. Google was already using the sitemap via direct Search Console submission.

### 6.2 Immediate next: return to food page rewrites

Current data-driven priority list (per §6.5 methodology):

| Order | Page | Impressions (28d, Jul 21 2026) | Position | Notes |
|---|---|---|---|---|
| 1 | **sour-cream** | 4,206 | 8.38 | Dairy cluster continuation (milk/yogurt/evaporated-milk/condensed-milk) |
| 2 | **maple-syrup** | 3,445 | 8.94 | Zero clicks despite near-page-1 position |
| 3 | **deli-meats** | 3,393 | 8.54 | Already converting somewhat (6 clicks) — lower urgency than 1-2 |
| 4 | **apple** | 1,732 | 6.59 | Strong position, zero clicks — worth checking whether this is a title/meta issue rather than pure content gap |

**Note on crackers:** previously flagged as the top priority (701 impressions, position 11.19) — re-checked July 21 and found to have collapsed to 54 impressions (position improved to 7.98, but volume cratered). No longer a priority target. Demonstrates the value of re-checking Search Console data before starting a rewrite rather than trusting an older snapshot — the picture can shift meaningfully over a few weeks.

**Anomaly flagged, not yet actioned:** /eggs/ (fully rewritten, §4.1 entry 21) shows 7,217 impressions at position 7.51 but zero clicks in the July 21 reading. Worth a second look if this persists into the next reading — could indicate a metaTitle/description issue rather than a content problem, since the position is solid.

Higher-impression cluster continuations if we return to cluster-based selection: **cheese** and **butter** (dairy cluster continuation from milk, yogurt, evaporated-milk), **almond-milk** and **soy-milk** (plant milk cluster extension from milk).

**Rewrite candidates from citation cleanup (§4.6) — 6 of 6 resolved.** All six pages that dropped below the source guideline during Batch 3b Session B's remove-vs-substitute cleanup (§5.9) have now been fully restored via two coordinated batches: the allium batch (chives, green-onions, leeks — §4.1 entries 31-33) and the chocolate/caffeine batch (white-chocolate, tea, soda — §4.1 entries 34-36). This closes the citation-cleanup-to-rewrite pipeline that began with the June 2026 Batch 1/2/3 work. Both batches demonstrated the same efficient-batch principle: when a toxin's mechanism is already well-established elsewhere on the site, restoring a handful of related undersourced pages is low-cost relative to the editorial gain, because the research burden is mostly verification rather than fresh discovery.

### 6.3 Parked

- **Off-site SEO:** Reddit and Pinterest were identified as candidate pilot channels. Decision deferred — choose one and pilot for 8 weeks rather than spreading effort across both.
- **AdSense application:** Not yet at threshold (~100 daily real visitors). Re-evaluate when organic traffic crosses ~50/day. Currently ~3.7/day, so 3-6 months out at current trajectory.
- **Citation cleanup Batch 3 — Toxic pages with real VCA/PPH replacements available.** Approximately 15-20 pages requiring per-page attention rather than mechanical batching. Real VCA/PPH replacement URLs verified as available for chocolate cluster (chocolate, chocolate-chips, milk-chocolate, cocoa-powder, hot-chocolate-mix, white-chocolate), xylitol page, allium cluster on Toxic pages (onions, chives, green-onions, leeks), caffeine cluster (coffee, tea, hot-chocolate-mix, soda), and grape/raisin cluster (grapes, raisins). Highest editorial priority of remaining citation work — dead citations on YMYL Toxic pages are the worst-case credibility exposure. See §4.6 for context.
- **Citation cleanup Batch 4 — Long-tail frontmatter dead-link repairs.** Old-format pages with dead URLs in the frontmatter `sourceUrl` array that don't have obvious VCA/PPH replacements (rhubarb, sausages, vanilla-extract, wine, salt, macadamia, pizza-roll, cherries, and others). Requires research to find replacement sources per page. Lower priority than Batch 3.
- **Email forwarding for the contact page** ([CONTACT EMAIL] placeholder still in place). Recommended: Cloudflare Email Routing (free).
- **Category structure cleanup:** The eggs page currently sits under categories ["Dairy", "Pantry"] — eggs are not dairy. The page itself addresses this honestly in the body ("eggs are not dairy despite often sharing the fridge shelf"), but the underlying category data is inaccurate. Likely affects other foods too. A small structural cleanup task: review existing categories, identify miscategorised foods, consider whether a new category (e.g. "Eggs & Protein") is warranted. Touches category-page navigation, so worth doing as a deliberate small pass rather than ad-hoc per page.
- **Chocolate-cluster satellite upgrade — completed, see §4.1 entries 39-42.**

### 6.4 Not in scope (deliberately)

The following have been considered and deliberately not pursued, for clear reasons:

- **No CMS** — content lives as markdown files in the repo. CMS adds operational complexity without proportionate benefit.
- **No React** — vanilla Astro components only. React is overkill for what this site needs.
- **No comments system** — invites moderation burden and spam. Not worth the operational cost.
- **No recommendations for specific dog food brands** — gets into directory-style territory that would require separate editorial framework. Books, single-ingredient treats, and clearly-safe specific products only.
- **No persuasive content about contested topics** (raw food diets, particular feeding philosophies) — calibrated information is the site's promise; advocacy isn't.

### 6.5 Strategy hypothesis under test

As of the eggs rewrite (page 21), page selection has shifted from cluster-based logic ("which pages build a coherent topical cluster?") to data-driven logic ("which unrewritten pages are already ranking on or near page 1 and converting visibility poorly?").

**Hypothesis:** Rewriting pages where the site already ranks at positions 5-8 with substantial impressions and near-zero clicks will produce more incremental traffic than rewriting pages selected for cluster coherence, because Google has already decided the site is relevant for those queries — the rewrite converts existing visibility rather than building visibility from scratch.

**Concrete prediction:** Pages selected by the data-driven approach (eggs, mayonnaise, yogurt, curry-powder, milk, tortillas, crackers) should each generate meaningfully more clicks-per-month within 4-8 weeks of shipping than the average cluster-based rewrite did in its first 4-8 weeks.

**How we'll measure:** At the next analytics check, compare new clicks attributed to the data-driven pages against the baseline of cluster-based pages from the earlier batches. If the hypothesis holds, the trajectory acceleration should be visible. If not, we should mix both approaches — some data-driven (for short-term traffic) and some cluster-based (for long-term topical authority).

This is a hypothesis worth measuring deliberately rather than assuming. The current cluster-based pages (the allium cluster, tomato cluster, etc.) have produced real and verifiable traffic growth across three analytics readings — that approach was working. The data-driven approach should outperform it, but we shouldn't assume it does until the evidence is in.

### 6.6 AI agent / LLM accessibility (queued, low priority)

As AI-mediated search grows (the "AI Assistant" channel appeared in GA4 for the first time in the July 2026 reading — 2 sessions, see §4.5), it's worth making the site genuinely accessible and citable to AI systems (ChatGPT, Perplexity, Claude, Google AI Overviews, and similar). Researched July 2026; the landscape is evolving fast and vendor claims in this space are frequently overstated, so recommendations below are calibrated against the most credible available evidence rather than SEO-tool marketing content.

**What's credible:**

- **Robots.txt AI-crawler allowlist.** Explicitly allowing GPTBot, ClaudeBot, PerplexityBot, Google-Extended, and similar crawlers is low-effort and directly serves the site's goal of being cited. Blocking these (even by omission/default in some configurations) actively works against visibility. No real downside for a site with no paywalled or proprietary content.
- **Bing Webmaster Tools submission.** ChatGPT's search backend partially relies on Bing, not just its own crawl. The site has only ever been submitted to Google Search Console — Bing indexation is a genuine, previously-overlooked gap.
- **FAQPage + Article JSON-LD structured data.** Mixed evidence on whether this directly drives AI citations (an independent Ahrefs analysis of ~1,900 pages found no measurable citation lift, contradicting many vendor claims), but it's good general hygiene — helps traditional rich results, Bing/DuckDuckGo parsing, and knowledge-graph tools. Nearly free to implement here because every rewritten page already has a clean FAQ section with distinct Q&A pairs; this is templating existing content, not new work. Should be done as a dedicated site-wide template change (touches the shared Astro page template across ~275 pages) — needs its own sample-then-execute session per the discipline established for the Batch 2 body-strip work, not a quick add-on.

**What's overhyped — deprioritise:**

- **llms.txt.** A proposed community convention (Jeremy Howard, 2024), not an official standard. As of early 2026, no major AI provider (OpenAI, Google, Anthropic, Meta) had confirmed reading or acting on it in production; Google's John Mueller confirmed no Google Search system uses it; independent analysis found near-zero crawler visits to llms.txt files in practice. Real use case is developer-tooling (coding assistants), not consumer content citation. Cheap to create if desired, but should not be expected to move traffic.

**Deliberate exclusion — consistent with site philosophy:** Do not use medical/veterinary-specific Schema.org types (MedicalWebPage, MedicalCondition, etc.) even though they exist in the vocabulary. Every page carries "we are not veterinarians" / "informational only" disclaimers; claiming a medical schema type would overstate what the site is to any system reading that markup. Use generic Article and FAQPage types only.

**Sequencing** (not urgent, queued behind current rewrite/cleanup priorities):

1. Robots.txt AI-crawler allowlist — mechanical, do first
2. Bing Webmaster Tools + sitemap submission — Patrick-side manual task, 20 minutes
3. FAQPage + Article JSON-LD templating — dedicated future session, sample-then-execute
4. llms.txt — optional, low priority, skip if time is short

**Leading indicator to watch:** the "AI Assistant" channel in GA4 (§4.5). If these changes are working, that number should grow across subsequent analytics readings. Treat this as the honest measurement rather than vendor claims about citation-rate percentages.

---

## 7. Glossary of project-specific terms

- **Option C:** The affiliate visual treatment combining a top-of-page summary panel with body callouts — chosen because it serves both skim-readers and engaged readers.
- **Calibrated accuracy:** The site's central editorial principle — neither overstating nor understating risk relative to the veterinary evidence.
- **YMYL:** "Your Money or Your Life" — Google's term for high-stakes content where editorial accuracy is critical (health, safety, finance). Dog food safety qualifies.
- **Tier 1 / Category 1 / Category 3:** The affiliate-placement categorisation from section 3.7.
- **Streamlined verification:** The current calibration review mode — Claude reviews figures, sources, and calibration; not prose.
- **Cluster:** A group of related pages that cross-link as a topical authority unit (allium cluster, tomato cluster, etc.).
- **Meta-honesty FAQ:** A signature FAQ pattern on calibration-correction pages, of the form "Why does the internet say X?" — addresses the misconception directly and explains its source.
- **Harm-encouraging myth:** A variant of the meta-honesty FAQ pattern, first used on garlic.md. Distinct from the more common "risk-overstating myth" pattern (where popular framing exaggerates a real-but-milder hazard — see oregano, lemon, avocado). A harm-encouraging myth is one where popular belief actively recommends the harmful behaviour (e.g., "garlic is a natural flea treatment for dogs") rather than merely overstating a risk. These require direct, source-backed rebuttal rather than nuanced recalibration, since the myth is actively steering readers toward harm rather than toward excess caution.

---

## 8. Update cadence

This document should be updated:

- **After every batch of rewrites** — update section 4.1 with new pages.
- **After every affiliate retrofit batch** — update section 4.2.
- **After every analytics check** — append the new reading to section 4.5.
- **When any convention changes** — update sections 2 or 3 accordingly.
- **When any next-step decision is made** — update section 6.

The intent is that any collaborator (human or AI) reading this document at any future point should have an accurate picture of the project state, conventions, and the reasoning behind decisions.
