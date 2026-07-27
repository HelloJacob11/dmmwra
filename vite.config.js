import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // maplibre-gl spins up its GeoJSON tiling worker via a nested ESM module
  // (new Worker(new URL('./maplibre-gl-worker.mjs', import.meta.url))).
  // Vite's dependency pre-bundler doesn't emit that nested worker file when
  // it pre-bundles the package, so the worker 404s and GeoJSON sources never
  // finish loading (raster tiles still work since they need no worker).
  // Excluding it from pre-bundling serves it as real, unbundled ESM instead.
  optimizeDeps: {
    exclude: ['maplibre-gl'],
  },
})
