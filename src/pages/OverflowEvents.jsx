import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts'
import { OVERFLOW_EVENTS_BY_ZIP } from '../data/mockCsoData'
import ChartCard from '../components/ChartCard'
import DataTable from '../components/DataTable'
import { SERIES, CHART_CHROME } from '../theme/palette'

const columns = [
  { key: 'zip', label: 'Zip Code' },
  { key: 'events', label: 'Events (12 mo.)' },
  { key: 'volumeMillionGallons', label: 'Volume (M gal)' },
  { key: 'receivingWater', label: 'Receiving Water' },
  { key: 'lastOverflow', label: 'Last Reported Overflow' },
]

export default function OverflowEvents() {
  const rows = [...OVERFLOW_EVENTS_BY_ZIP].sort((a, b) => b.events - a.events)

  return (
    <>
      <div className="page-header">
        <h1>Overflow Events</h1>
        <p>
          Outfall-level detail on CSO events by zip code, sourced from
          combined-sewer outfall monitoring. This view is the interim
          stand-in for a geographic outfall map.
        </p>
      </div>

      <div className="empty-state">
        Interactive outfall map (Leaflet/Mapbox + geocoded outfall locations)
        pending real outfall coordinate data. The table and chart below cover
        the same information by zip code in the meantime.
      </div>

      <ChartCard title="Events by Zip Code" subtitle="Trailing 12 months">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={rows} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke={CHART_CHROME.gridline} />
            <XAxis dataKey="zip" tick={{ fontSize: 12, fill: CHART_CHROME.textMuted }} axisLine={{ stroke: CHART_CHROME.baseline }} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: CHART_CHROME.textMuted }} axisLine={false} tickLine={false} width={28} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Bar dataKey="events" name="Events" fill={SERIES[0]} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Outfall Event Log by Zip Code">
        <DataTable columns={columns} rows={rows} keyField="zip" />
      </ChartCard>
    </>
  )
}
