# Project Guidelines

## Architecture
- This workspace is a Vite + React + TypeScript catalog module intended to be embedded in external sites.
- The runtime entry is `src/main.tsx`, which mounts `App` and also exposes `window.CatalogoGiftCards`, `window.React`, and a compatibility `window.ReactDOM.render` bridge. Preserve that external API unless a task explicitly changes the embedding contract.
- The main user-facing flow is `src/App.tsx` -> `src/components/GiftCardCatalog.tsx` -> `CategorySection`, `GiftCard`, `CountryButton`, and `CategorySelector`.
- Catalog data comes from `src/data/giftcards_*.json`, is grouped by `src/data/giftcardsByCountry.ts`, and is normalized by `mapGiftCardsJsonToCategories` in `src/lib/utils.ts`.
- Treat `src/lib/utils.ts` as business logic, not just formatting. It contains category normalization, legacy-field compatibility, and explicit filtering for problematic records.

## Build And Validation
- Install with `npm i`.
- Main local workflow: `npm run dev`.
- Before finishing code changes, run the narrowest useful validation from `npm run lint` and `npm run build` when the change can affect production output.
- The build is configured in `vite.config.ts` as a single IIFE-style bundle with `inlineDynamicImports: true`. Avoid changes that unnecessarily increase bundle size or break embeddability.

## Data And Automations
- The repository includes country datasets for Chile, Peru, Colombia, Ecuador, and Mexico in `src/data/` plus `.backup` copies.
- `scripts/weekly_json_commit.sh` stages and pushes only the country JSON files. If a task touches those files, keep the automation assumptions intact.
- `selenium_extraction_results/` contains extraction artifacts used for data maintenance. Do not treat those files as runtime inputs unless the task explicitly requires it.
- JSON ingestion must remain compatible with legacy keys such as `Categoria`, `Gift Cards`, and `Fuente imagen`, in addition to the newer English field names.

## UI And Styling Conventions
- The project uses Tailwind CSS with shadcn/ui primitives. Reuse existing UI components in `src/components/ui/` before introducing new patterns.
- Global design tokens live in `src/index.css`. Define color and gradient changes there first when they are part of the design system.
- The catalog already uses Montserrat, gradient surfaces, card hover motion, and country/category filtering. Preserve the existing visual language unless the user requests a redesign.
- Prefer responsive Tailwind classes and the existing `useIsMobile` hook over ad hoc viewport logic.
- Keep text and UI copy in Spanish unless the task clearly calls for another language.

## Performance Priorities
- Optimize for fast embedded delivery: prefer small dependencies, avoid heavy client-side libraries, and keep new logic incremental.
- Protect image loading behavior. Gift cards rely on external image URLs and already use lazy loading; maintain or improve that behavior rather than replacing it with eager loading.
- Avoid unnecessary re-renders in catalog flows with many cards. Prefer derived data with clear memoization boundaries only where they reduce real work.
- Remove noisy debug logging when touching affected areas if it is safe to do so, especially repeated image-load logs in production paths.
- When improving visuals, choose solutions that do not inflate bundle weight or add layout thrash.

## Working Rules For Future Chats
- Start by understanding whether a change affects the embedding surface, the normalized JSON pipeline, or only presentation.
- For data-related edits, verify the effect across multi-country behavior, category mapping, and URL-based filters.
- For UI edits, check both mobile and desktop flows because the catalog changes behavior by viewport.
- Prefer focused changes over broad rewrites. This project is a maintained module with live automation and deployment constraints.
- If category names or country codes change, also review icon mapping and filter behavior in `GiftCardCatalog.tsx`.