import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts'
import { indexStats } from '../../utils/filterRecords'
import { CHART_CHROME, INDEX_COLOR } from '../../theme/palette'
import ChartCard from '../ChartCard'

// Constructed factor score: a distribution of the standardized index across
// the current selection, plus its mean.
export default function IndexChart({ indexDef, records }) {
  const { mean, denom, histogram } = indexStats(records, indexDef.field)
  const data = histogram.map((b) => ({
    bin: `${b.start.toFixed(1)}`,
    count: b.count,
  }))

  return (
    <ChartCard
      title={indexDef.label}
      subtitle={indexDef.note}
      footnote={denom === 0 ? 'No respondents in the current selection have this score.' : undefined}
    >
      <div className="index-mean">
        <span className="index-mean-value">{denom ? mean.toFixed(2) : '—'}</span>
        <span className="index-mean-label">mean · n = {denom.toLocaleString()}</span>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke={CHART_CHROME.gridline} />
          <XAxis
            dataKey="bin"
            tick={{ fontSize: 10, fill: CHART_CHROME.textMuted }}
            axisLine={{ stroke: CHART_CHROME.baseline }}
            tickLine={false}
            interval={1}
          />
          <YAxis
            tick={{ fontSize: 11, fill: CHART_CHROME.textMuted }}
            axisLine={false}
            tickLine={false}
            width={28}
            allowDecimals={false}
          />
          <Tooltip
            labelFormatter={(label) => `Score ≥ ${label}`}
            formatter={(value) => [value, 'Respondents']}
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
          />
          <Bar dataKey="count" name="Respondents" fill={INDEX_COLOR} radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
