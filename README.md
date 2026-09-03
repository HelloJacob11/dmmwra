# Des Moines Resident Survey Dashboard

An interactive dashboard for exploring City of Des Moines resident survey results — precipitation & flooding, sewer system knowledge, local government, and tap water. Built with React, Vite, and MapLibre.

## Features

- **Survey sections** — browse results across Flooding, Sewer System Knowledge, Local Government, and Tap Water, each rendered from `src/meta.json`.
- **Demographic filters** — segment the ~400 survey responses by ZIP code and other demographic fields; the filter bar shows how many respondents match the current selection.
- **Charts** — single-question and multi-select question breakdowns, plus a constructed index chart, built with Recharts.
- **ZIP-level choropleth map** — a MapLibre GL map colors Des Moines ZIP codes by the average of a selected index for the currently filtered respondents, with small-sample ZIPs (n < 5) suppressed and greyed out.

## Tech stack

- [React 19](https://react.dev/) + [React Router](https://reactrouter.com/)
- [Vite](https://vite.dev/) for dev/build tooling
- [MapLibre GL JS](https://maplibre.org/) for the ZIP choropleth map
- [Recharts](https://recharts.org/) for survey charts

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

### Other scripts

```bash
npm run build    # production build to dist/
npm run preview  # preview the production build locally
npm run lint     # run ESLint
```

## Project structure

```
src/
  components/
    filters/     # FilterBar, MultiSelect
    map/          # FloodMap (ZIP choropleth)
    survey/       # question/index chart components
    ChartCard.jsx
  context/        # FilterContext (active demographic filters)
  data/           # demographic field definitions
  layout/         # AppShell, Sidebar
  pages/          # SurveySection page
  theme/          # color palette
  utils/          # filtering, formatting, maplibre worker setup
  data.json       # survey response records
  meta.json       # section/filter/question metadata
public/
  des-moines-zips.geojson  # ZIP boundary shapes for the map
```

## Deployment

Configured for [Vercel](https://vercel.com/) via `vercel.json`, with a rewrite rule for client-side routing (SPA) that excludes static assets and the GeoJSON file.
