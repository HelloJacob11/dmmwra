import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts'
import { useFilters } from '../context/FilterContext'
import { applyFilters, rateByField } from '../utils/filterRecords'
import { RESIDENT_RECORDS } from '../data/mockCsoData'
import { DEMOGRAPHIC_FIELDS } from '../data/demographics'
import ChartCard from '../components/ChartCard'
import { SERIES, CHART_CHROME } from '../theme/palette'

function pct(n) {
  return `${Math.round(n * 100)}%`
}

export default function EquityDemographics() {
  const { filters, activeCount } = useFilters()
  const filtered = applyFilters(RESIDENT_RECORDS, filters)

  return (
    <>
      <div className="page-header">
        <h1>Equity &amp; Demographics</h1>
        <p>
          Health-complaint rate broken out across all eight demographic
          dimensions, for the population currently selected by the filters
          above{activeCount ? '' : ' (no filters applied — full sample shown)'}.
          Use this view to spot which groups carry a disproportionate share of
          reported CSO impact.
        </p>
      </div>

      <div className="grid grid-3">
        {DEMOGRAPHIC_FIELDS.map((field) => {
          const data = rateByField(filtered, field.key, field.options, (r) => r.healthComplaintReported)
          const isLong = field.options.length > 6
          return (
            <ChartCard key={field.key} title={field.label} subtitle="Health complaint rate">
              <ResponsiveContainer width="100%" height={isLong ? 280 : 200}>
                <BarChart data={data} layout="vertical" margin={{ top: 4, right: 24, left: 0, bottom: 0 }}>
                  <CartesianGrid horizontal={false} stroke={CHART_CHROME.gridline} />
                  <XAxis type="number" tickFormatter={pct} tick={{ fontSize: 11, fill: CHART_CHROME.textMuted }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="label" type="category" tick={{ fontSize: 10.5, fill: CHART_CHROME.textMuted }} axisLine={false} tickLine={false} width={field.key === 'income' || field.key === 'race' ? 100 : 70} />
                  <Tooltip formatter={(v) => pct(v)} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Bar dataKey="value" name="Complaint rate" fill={SERIES[0]} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          )
        })}
      </div>
    </>
  )
}
