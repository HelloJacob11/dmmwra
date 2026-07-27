import { useEffect, useRef, useState } from 'react'
import { Map as MapLibreMap, Popup as MapLibrePopup } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { aggregateByZip } from '../../utils/filterRecords'
import { MAP_SEQUENTIAL, MAP_SUPPRESSED } from '../../theme/palette'
import ChartCard from '../ChartCard'
import * as maplibregl from 'maplibre-gl'

const SUPPRESS_THRESHOLD = 5
const GEOJSON_URL = '/des-moines-zips.geojson'

function colorForValue(value, min, max) {
  const span = max - min || 1
  const t = Math.min(1, Math.max(0, (value - min) / span))
  const step = Math.min(MAP_SEQUENTIAL.length - 1, Math.floor(t * MAP_SEQUENTIAL.length))
  return MAP_SEQUENTIAL[step]
}

// Mutates each feature's paint/tooltip properties in place from the current
// per-ZIP stats, so the caller can just re-setData the same geojson object.
function paintFeatures(geo, stats) {
  const shownValues = Object.values(stats)
    .filter((s) => !s.suppressed)
    .map((s) => s.value)
  const min = shownValues.length ? Math.min(...shownValues) : null
  const max = shownValues.length ? Math.max(...shownValues) : null

  geo.features.forEach((feature) => {
    const s = stats[feature.properties.zip]
    const shown = s && !s.suppressed && min !== null
    feature.properties.fill = shown ? colorForValue(s.value, min, max) : MAP_SUPPRESSED
    feature.properties.n = s ? s.n : 0
    feature.properties.value = shown ? s.value : null
  })
  return { min, max }
}

// Choropleth of a constructed index averaged by respondent ZIP code. Reused
// across sections by pointing it at a different index field via `metric`.
export default function FloodMap({ rows, metric, label }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const geoRef = useRef(null)
  const popupRef = useRef(null)
  const [range, setRange] = useState(null)

  useEffect(() => {
    const map = new MapLibreMap({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors',
          },
        },
        layers: [{ id: 'osm', type: 'raster', source: 'osm' }],
      },
      center: [-93.62, 41.59],
      zoom: 10,
    })
    mapRef.current = map

    map.on('load', async () => {
      const geo = await fetch(GEOJSON_URL).then((r) => r.json())
      geoRef.current = geo
      setRange(paintFeatures(geo, aggregateByZip(rows, metric, SUPPRESS_THRESHOLD)))

      map.addSource('zips', { type: 'geojson', data: geo })
      map.addLayer({
        id: 'zip-fill',
        type: 'fill',
        source: 'zips',
        paint: { 'fill-color': ['get', 'fill'], 'fill-opacity': 0.75 },
      })
      map.addLayer({
        id: 'zip-line',
        type: 'line',
        source: 'zips',
        paint: { 'line-color': '#ffffff', 'line-width': 1 },
      })

      const popup = new MapLibrePopup({ closeButton: false, closeOnClick: false })
      popupRef.current = popup

      map.on('mousemove', 'zip-fill', (e) => {
        const p = e.features[0].properties
        map.getCanvas().style.cursor = 'pointer'
        const body = p.value == null
          ? `<strong>ZIP ${p.zip}</strong><br/>Insufficient data (n=${p.n})`
          : `<strong>ZIP ${p.zip}</strong><br/>${Number(p.value).toFixed(2)} (n=${p.n})`
        popup.setLngLat(e.lngLat).setHTML(body).addTo(map)
      })
      map.on('mouseleave', 'zip-fill', () => {
        map.getCanvas().style.cursor = ''
        popup.remove()
      })
    })

    return () => {
      popupRef.current?.remove()
      map.remove()
    }
    // Map is created once; rows/metric changes are handled by the effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Recolor the already-loaded shapes in place whenever the filtered rows or
  // the metric change — no new map, no refetch.
  useEffect(() => {
    const map = mapRef.current
    const geo = geoRef.current
    if (!map || !geo || !map.getSource('zips')) return
    setRange(paintFeatures(geo, aggregateByZip(rows, metric, SUPPRESS_THRESHOLD)))
    map.getSource('zips').setData(geo)
  }, [rows, metric])

  const stats = aggregateByZip(rows, metric, SUPPRESS_THRESHOLD)
  const statValues = Object.values(stats)
  const zipCount = statValues.filter((s) => !s.suppressed).length
  const respondentCount = statValues.reduce((sum, s) => sum + s.n, 0)

  return (
    <ChartCard
      title={label}
      subtitle="ZIP-level average, current filter selection"
      footnote={`Based on ${respondentCount.toLocaleString()} respondents across ${zipCount} ZIPs. Grey = fewer than ${SUPPRESS_THRESHOLD} responses.`}
    >
      <div ref={containerRef} style={{ height: 400, width: '100%', borderRadius: 8, overflow: 'hidden' }} />
      <div className="legend" style={{ marginTop: 10 }}>
        <span className="legend-item">
          <span className="legend-swatch" style={{ background: MAP_SEQUENTIAL[0] }} />
          {range?.min != null ? `Low (${range.min.toFixed(1)})` : 'Low'}
        </span>
        <span className="legend-item">
          <span className="legend-swatch" style={{ background: MAP_SEQUENTIAL[MAP_SEQUENTIAL.length - 1] }} />
          {range?.max != null ? `High (${range.max.toFixed(1)})` : 'High'}
        </span>
        <span className="legend-item">
          <span className="legend-swatch" style={{ background: MAP_SUPPRESSED }} />
          {`n < ${SUPPRESS_THRESHOLD}`}
        </span>
      </div>
    </ChartCard>
  )
}
