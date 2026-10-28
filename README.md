# IceScreamy

Website for IceScreamy (Icescreamy LLC), Caribbean-inspired artisanal ice cream from Brooklyn, NY.

- **Stack:** Next.js (App Router, TypeScript), plain CSS tokens in `src/app/globals.css`, GSAP for the frame clock, raw WebGL for the home scene.
- **Business facts:** all in `src/data/site.ts`. Edit there; every page reads from it.
- **Design record:** `DESIGN.md` (concept, palette, type, motion rules).
- **Home scroll scene:** `src/scene/churn.ts` (shader), `src/scene/chapters.ts` (one marble recipe per chapter), `src/components/ChurnStage.tsx` (driver).

## Run

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
```

After changing a chapter's colors, regenerate the reduced-motion stills:

```bash
node scripts/render-stills.mjs
```
