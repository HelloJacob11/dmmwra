import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts'
import { useFilters } from '../context/FilterContext'
import { applyFilters, rate, average, rateByField } from '../utils/filterRecords'
import { RESIDENT_RECORDS } from '../data/mockCsoData'
import { DEMOGRAPHIC_FIELDS } from '../data/demographics'
import StatCard from '../components/StatCard'
import ChartCard from '../components/ChartCard'
import { SERIES, CHART_CHROME } from '../theme/palette'

const raceField = DEMOGRAPHIC_FIELDS.find((f) => f.key === 'race')
const incomeField = DEMOGRAPHIC_FIELDS.find((f) => f.key === 'income')

function pct(n) {
  return `${Math.round(n * 100)}%`
}

export default function HealthImpact() {
  const { filters, activeCount } = useFilters()
  const filtered = applyFilters(RESIDENT_RECORDS, filters)
  const baseline = RESIDENT_RECORDS

  const complaintRate = rate(filtered, (r) => r.healthComplaintReported)
  const baselineComplaintRate = rate(baseline, (r) => r.healthComplaintReported)
  const backupRate = rate(filtered, (r) => r.basementBackupReported)
  const exposureDays = average(filtered, (r) => r.estimatedExposureDays)

  const byRace = rateByField(filtered, 'race', raceField.options, (r) => r.healthComplaintReported)
  const byIncome = rateByField(filtered, 'income', incomeField.options, (r) => r.healthComplaintReported)

  return (
    <>
      <div className="page-header">
        <h1>Public Health Impact</h1>
        <p>
          Self-reported health outcomes associated with CSO exposure, for the
          population currently selected by the demographic filters above.
        </p>
      </div>

      <div className="grid grid-stats">
        <StatCard
          label="Health Complaint Rate"
          value={pct(complaintRate)}
          status={complaintRate > baselineComplaintRate * 1.15 ? 'serious' : undefined}
          sublabel={activeCount ? `vs. ${pct(baselineComplaintRate)} citywide baseline` : 'citywide baseline'}
        />
        <StatCard
          label="Basement Backup Rate"
          value={pct(backupRate)}
          status={backupRate > 0.2 ? 'warning' : undefined}
          sublabel="reported sewer backup, past 12 months"
        />
        <StatCard
          label="Avg. Exposure Days / Year"
          value={exposureDays.toFixed(1)}
          sublabel="days with reported overflow exposure"
        />
        <StatCard
          label="Residents Represented"
          value={filtered.length.toLocaleString()}
          sublabel={activeCount ? 'matching current filters' : 'entire sample population'}
        />
      </div>

      <div className="grid grid-2">
        <ChartCard title="Health Complaint Rate by Race / Ethnicity" subtitle="Within the currently filtered population">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={byRace} layout="vertical" margin={{ top: 4, right: 24, left: 0, bottom: 0 }}>
              <CartesianGrid horizontal={false} stroke={CHART_CHROME.gridline} />
              <XAxis type="number" tickFormatter={pct} tick={{ fontSize: 12, fill: CHART_CHROME.textMuted }} axisLine={false} tickLine={false} />
              <YAxis dataKey="label" type="category" tick={{ fontSize: 11.5, fill: CHART_CHROME.textMuted }} axisLine={false} tickLine={false} width={140} />
              <Tooltip formatter={(v) => pct(v)} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="value" name="Complaint rate" fill={SERIES[5]} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Health Complaint Rate by Income" subtitle="Within the currently filtered population">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={byIncome} layout="vertical" margin={{ top: 4, right: 24, left: 0, bottom: 0 }}>
              <CartesianGrid horizontal={false} stroke={CHART_CHROME.gridline} />
              <XAxis type="number" tickFormatter={pct} tick={{ fontSize: 12, fill: CHART_CHROME.textMuted }} axisLine={false} tickLine={false} />
              <YAxis dataKey="label" type="category" tick={{ fontSize: 11.5, fill: CHART_CHROME.textMuted }} axisLine={false} tickLine={false} width={100} />
              <Tooltip formatter={(v) => pct(v)} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="value" name="Complaint rate" fill={SERIES[7]} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </>
  )
}
