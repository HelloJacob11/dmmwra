import {
  ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts'
import { singleQuestionStats } from '../../utils/filterRecords'
import { pct, labelAxisWidth } from '../../utils/format'
import { CHART_CHROME, BAR_COLOR, BINARY_COLORS, LIKERT_DIVERGING } from '../../theme/palette'
import ChartCard from '../ChartCard'

// Likert and binary questions get a fixed, meaningful color per option
// (diverging for likert, grey/accent for binary). Plain "bar" questions are
// nominal, so every bar shares one hue — color doesn't re-encode value.
function colorsFor(chart, optionCount) {
  if (chart === 'likert' && optionCount === LIKERT_DIVERGING.length) return LIKERT_DIVERGING
  if (chart === 'binary' && optionCount === BINARY_COLORS.length) return BINARY_COLORS
  return null
}

export default function SingleQuestionChart({ question, records }) {
  const { data, denom } = singleQuestionStats(records, question.field, question.options)
  const colors = colorsFor(question.chart, question.options.length)
  const yWidth = labelAxisWidth(data.map((d) => d.label))
  const height = Math.max(130, data.length * 34 + 44)

  return (
    <ChartCard
      title={question.label}
      subtitle={`n = ${denom.toLocaleString()} answered`}
      footnote={denom === 0 ? 'No respondents in the current selection answered this question.' : undefined}
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
            formatter={(value, _name, item) => [`${pct(value)} (n=${item.payload.count})`, 'Share']}
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
          />
          <Bar dataKey="pct" name="Share" radius={[0, 4, 4, 0]} fill={colors ? undefined : BAR_COLOR}>
            {colors && data.map((d, i) => <Cell key={d.label} fill={colors[i]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
