# IceScreamy: design record

## Brief
- **Subject:** IceScreamy (Icescreamy LLC), Caribbean-inspired artisanal ice cream from Brooklyn, NY. Open daily 10 AM to 10 PM, serving the NY tri-state area.
- **Audience:** Brooklyn locals and NYC ice cream fans (order pints), event hosts (book a cart or catering), stores and brands (partnerships).
- **Job:** get people to order, then to book events or start a partnership.
- **Source:** one scraped Wix home page (`raw messy data/index.html`). No client notes were supplied, so the scrape is the only source of truth. Every fact lives in `src/data/site.ts`.
- **Assets:** gold script logo, five pint product shots (emerald pint, gold NYC skyline), a promo poster with three flavor descriptions, one AI-generated hero composite (not used).

## Concepts considered
| | Idea | Anchor | Orig | Fit | Feas | Port. |
|---|---|---|---|---|---|---|
| A | **The churn.** Scroll churns a live cross-section of ice cream; each chapter lays a new ribbon through it | their flavors are literally ribbons and swirls (guava ribbon, raspberry swirl, black currant swirl) | 4 | 5 | 4 | 2 |
| B | Island to borough: a gold line travels from the Caribbean to the Brooklyn skyline | "Caribbean roots. Brooklyn bold." | 3 | 4 | 4 | 3 |
| C | The pint: the emerald pint's gold skyline label unwraps around the page | the packaging art | 3 | 4 | 3 | 2 |

**Picked A, with C's gold skyline as the Brooklyn beat.** The flavor recipes are the most specific thing in the data, and a swirl is something only an ice cream maker can own.

## Concept card
```
Idea:        Scroll the page and you churn the ice cream: one scoop, re-marbled for every part of the story.
Metaphor:    a scoop seen from above, in a dark emerald pint.
Signature:   ChurnScene: raw WebGL marble shader (domain-warped ribbons, flecks, scoop lighting), one driver (chapter float).
Emotion:     cool, rich, a little decadent. Gold on emerald like the pint.
Motion verb: fold like a ribbon (slow ease-out, things swirl in rather than slide).
Screenshot:  a raspberry-white swirl filling the right half of the screen, "Raspberry Coconut" set huge in cream serif beside it.
```

Chapters (each beat's copy lands with its visual):
0. Hero: cream and gold marble, the brand line.
1. Roots: hibiscus and sun gold fold in (African diaspora, Caribbean heritage).
2. Brooklyn: the scoop churns into a tight spiral; the gold skyline from the pint draws itself.
3. Caribbean Liberation: caramel base, guava ribbon, spice flecks.
4. Raspberry Coconut: coconut base, raspberry swirl, toasted coconut flecks.
5. Red, Black & Bliss: strawberry hibiscus base, black currant swirl.
6. Finale: "every scoop tells a story", scoop settles, order CTA.

## System
- **Palette:** ground `#0B3324` (pint emerald), deep `#06221A`, ink `#F6EEDC` (cream), muted `#BFCDBF`, gold `#D6B062`, hibiscus `#D8324A` (used rarely: focus ring accents and the roots chapter). Emerald + gold is the real packaging, not a trend pick.
- **Type:** Zodiak (Fontshare) for display, including its italic for flavor names; General Sans (Fontshare) for text and UI. The logo is the client's gold script PNG.
- **Grid:** 12 columns, 16px gutters on phones, `clamp(20px, 4vw, 56px)` page margins. Text left, scoop right on desktop; scoop top, text bottom on phones.
- **Shape:** radius 0 on panels, full round only on the scoop and buttons (scoop-shaped pills).
- **Motion:** one ease `cubic-bezier(.16,1,.3,1)`; reveals 700 ms, UI 300 ms; stagger 60 ms. The GL uniform eases toward the scroll target (never moves the page).
- **Hovers:** buttons flood with gold from below (ribbon fills the pint); nav uses an underline draw; flavor rows slide their name and swirl the swatch.
- **Idle:** the marble keeps a slow drift (uTime) and leans toward the pointer.

## Fallbacks
With reduced motion, no JS or no WebGL, each chapter shows an art-directed still: a CSS-painted scoop in that chapter's colors (or the real pint photo for flavors) and the static skyline. The canvas never carries content.

## Genericness test
- First instinct was a cream editorial site with photo cards. Replaced with emerald ground and a live marble because the packaging is emerald and the product is swirled.
- Dropped the countdown loader: an ice cream shop earns no loader.
- No page-transition curtain; continuity comes from the shared emerald ground and the hero intro. Noted as a decision.

## Decisions made during QA
- Inner pages are still at rest on purpose; the live motion belongs to the home churn. Their life is in the reveals and hovers.
- Chapter copy is linked to scroll with CSS view timelines: it arrives with its scoop and leaves before the next one, so text never sits on the scoop on phones.
- The no-WebGL stills are frames of the real shader, rendered by `scripts/render-stills.mjs`. Rerun it after changing a chapter's colors.
