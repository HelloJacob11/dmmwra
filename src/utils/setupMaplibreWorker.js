// maplibre-gl v6 resolves its GeoJSON-tiling worker at RUNTIME via a
// dynamically-built `new URL(`./${name}.mjs`, import.meta.url)` (the path is
// interpolated, not a static string literal). Bundlers can only detect and
// emit worker/asset files from a literal `new URL('./x', import.meta.url)`
// pattern, so Vite never copies this file to the production build — the
// computed URL 404s, and our SPA's catch-all rewrite serves index.html for
// it (the "text/html MIME" error), leaving the GeoJSON source's tiling
// pipeline permanently stuck with no worker.
//
// `?worker&inline` is Vite's own mechanism for exactly this class of
// problem: it runs the target module (and its internal relative imports,
// e.g. maplibre-gl-worker.mjs's own import of maplibre-gl-shared.mjs)
// through Vite's worker-bundling pass, producing one self-contained script
// inlined as a blob directly in our JS output — no separate file, no extra
// request, nothing for a static host to mis-serve.
//
// maplibre-gl only exposes a URL-based override (setWorkerUrl), not a
// worker-factory hook, so we can't hand it Vite's constructor directly.
// Instead we intercept at the one place maplibre-gl actually calls
// `new Worker(url, { type: 'module' })`, redirecting just that call to our
// inlined worker and leaving every other Worker usage untouched.
import InlineMapLibreWorker from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&inline'

const NativeWorker = globalThis.Worker

globalThis.Worker = function PatchedWorker(scriptURL, options) {
  if (options?.type === 'module' && /maplibre-gl-worker/.test(String(scriptURL))) {
    return new InlineMapLibreWorker()
  }
  return new NativeWorker(scriptURL, options)
}
globalThis.Worker.prototype = NativeWorker.prototype
