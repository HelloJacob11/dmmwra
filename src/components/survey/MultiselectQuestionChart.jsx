import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts'
import { multiselectStats } from '../../utils/filterRecords'
import { pct, labelAxisWidth } from '../../utils/format'
import { CHART_CHROME, MULTISELECT_COLOR } from '../../theme/palette'
import ChartCard from '../ChartCard'

// "Select all that apply" — each member is an independent 0/1 column, so
// bars are not mutually exclusive and won't sum to 100%.
export default function MultiselectQuestionChart({ question, records }) {
  const data = multiselectStats(records, question.members)
  const denom = data.reduce((max, d) => Math.max(max, d.denom), 0)
  const yWidth = labelAxisWidth(data.map((d) => d.label))
  const height = Math.max(130, data.length * 30 + 44)

  return (
    <ChartCard
      title={question.label}
      subtitle={`Select all that apply · n = ${denom.toLocaleString()} answered`}
      footnote="Respondents could choose more than one option, so shares don't sum to 100%."
    >
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 36, left: 0, bottom: 0 }}>
          <CartesianGrid horizontal={false} stroke={CHART_CHROME.gridline} />
          <XAxis
            type="number"
            tickFormatter={pct}
            tick={{ fontSize: 11, fill: CHART_CHROME.textMuted }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            dataKey="label"
            type="category"
            tick={{ fontSize: 11.5, fill: CHART_CHROME.textMuted }}
            axisLine={false}
            tickLine={false}
            width={yWidth}
          />
          <Tooltip
            formatter={(value, _name, item) => [`${pct(value)} (n=${item.payload.count})`, 'Selected']}
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
          />
          <Bar dataKey="pct" name="Selected" fill={MULTISELECT_COLOR} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
