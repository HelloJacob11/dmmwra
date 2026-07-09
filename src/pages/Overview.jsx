import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts'
import { useFilters } from '../context/FilterContext'
import { applyFilters, rate, average } from '../utils/filterRecords'
import {
  RESIDENT_RECORDS, MONTHLY_OVERFLOW_TREND, OVERFLOW_EVENTS_BY_ZIP,
} from '../data/mockCsoData'
import { ZIP_CODES } from '../data/demographics'
import StatCard from '../components/StatCard'
import ChartCard from '../components/ChartCard'
import { SERIES, CHART_CHROME } from '../theme/palette'

export default function Overview() {
  const { filters, activeCount } = useFilters()
  const filtered = applyFilters(RESIDENT_RECORDS, filters)

  const nearOutfallRate = rate(filtered, (r) => r.nearOutfall)
  const healthComplaintRate = rate(filtered, (r) => r.healthComplaintReported)
  const avgExposureDays = average(filtered, (r) => r.estimatedExposureDays)

  const populationByZip = ZIP_CODES.map((zip) => ({
    zip,
    residents: filtered.filter((r) => r.zip === zip).length,
  }))

  return (
    <>
      <div className="page-header">
        <h1>Overview</h1>
        <p>
          Combined Sewer Overflow (CSO) events occur when heavy rain or snowmelt
          overwhelms Des Moines&apos; combined sewer system, releasing a mix of
          stormwater and untreated wastewater into the Des Moines and Raccoon
          rivers. This overview summarizes citywide overflow activity and, when
          filters are applied, the segment of residents represented by the
          current demographic selection.
        </p>
      </div>

      <div className="grid grid-stats">
        <StatCard
          label="Residents Represented"
          value={filtered.length.toLocaleString()}
          sublabel={activeCount ? `of ${RESIDENT_RECORDS.length.toLocaleString()} total (filtered)` : 'entire sample population'}
        />
        <StatCard
          label="Near a CSO Outfall"
          value={`${Math.round(nearOutfallRate * 100)}%`}
          status={nearOutfallRate > 0.35 ? 'serious' : undefined}
          sublabel="live within the estimated overflow-impact area"
        />
        <StatCard
          label="Reported Health Complaint"
          value={`${Math.round(healthComplaintRate * 100)}%`}
          status={healthComplaintRate > 0.25 ? 'warning' : undefined}
          sublabel="GI illness or related complaint, past 12 months"
        />
        <StatCard
          label="Avg. Exposure Days / Year"
          value={avgExposureDays.toFixed(1)}
          sublabel="days with reported overflow exposure"
        />
      </div>

      <div className="grid grid-2">
        <ChartCard title="Monthly Overflow Events" subtitle="Citywide, trailing 12 months" footnote="Citywide outfall totals are not affected by demographic filters.">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={MONTHLY_OVERFLOW_TREND} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke={CHART_CHROME.gridline} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: CHART_CHROME.textMuted }} axisLine={{ stroke: CHART_CHROME.baseline }} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: CHART_CHROME.textMuted }} axisLine={false} tickLine={false} width={28} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Line type="monotone" dataKey="events" name="Overflow events" stroke={SERIES[0]} strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Monthly Overflow Volume" subtitle="Million gallons, citywide" footnote="Citywide outfall totals are not affected by demographic filters.">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MONTHLY_OVERFLOW_TREND} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke={CHART_CHROME.gridline} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: CHART_CHROME.textMuted }} axisLine={{ stroke: CHART_CHROME.baseline }} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: CHART_CHROME.textMuted }} axisLine={false} tickLine={false} width={28} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="volumeMillionGallons" name="Volume (M gal)" fill={SERIES[1]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-2">
        <ChartCard title="Overflow Events by Zip Code" subtitle="Citywide, trailing 12 months">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={OVERFLOW_EVENTS_BY_ZIP} layout="vertical" margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid horizontal={false} stroke={CHART_CHROME.gridline} />
              <XAxis type="number" tick={{ fontSize: 12, fill: CHART_CHROME.textMuted }} axisLine={false} tickLine={false} />
              <YAxis dataKey="zip" type="category" tick={{ fontSize: 12, fill: CHART_CHROME.textMuted }} axisLine={false} tickLine={false} width={44} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="events" name="Events" fill={SERIES[0]} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Residents Represented by Zip Code"
          subtitle={activeCount ? 'Reflects current filter selection' : 'Full sample population'}
        >
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={populationByZip} layout="vertical" margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid horizontal={false} stroke={CHART_CHROME.gridline} />
              <XAxis type="number" tick={{ fontSize: 12, fill: CHART_CHROME.textMuted }} axisLine={false} tickLine={false} />
              <YAxis dataKey="zip" type="category" tick={{ fontSize: 12, fill: CHART_CHROME.textMuted }} axisLine={false} tickLine={false} width={44} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="residents" name="Residents" fill={SERIES[4]} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </>
  )
}
