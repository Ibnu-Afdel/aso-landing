# aso-landing

The landing page for [Aso](https://github.com/Ibnu-Afdel/Aso), the batteries-included Python web framework. Live at **https://aso.ibnuafdel.com**.

Built with [Astro](https://astro.build) and Tailwind CSS. Static output, deployed to Cloudflare Workers (static assets).

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # static site in dist/
pnpm deploy     # build + wrangler deploy to aso.ibnuafdel.com
```

- `src/pages/index.astro` — the page
- `src/components/Mark.astro`, `Wordmark.astro` — the logo as SVG
- `src/styles/global.css` — palette (cream, ink, sage), animations
- `wrangler.jsonc` — Cloudflare config and the custom domain
