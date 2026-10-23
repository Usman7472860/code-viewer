# View Source

Link daalo, us website ka HTML source dikhao (line numbers, copy, download).

## Vercel par chalane ka tareeqa
1. Is poore folder ko GitHub repo mein daalo (ya `vercel` CLI use karo).
2. vercel.com par "Add New > Project" se repo import karo.
3. Koi setting nahi badalni. Deploy dabao.

Local test: `npx vercel dev`

Files:
- `index.html`: poora page
- `api/source.js`: server function jo link ka HTML la kar deti hai (browser seedha nahi la sakta, CORS ki wajah se)
