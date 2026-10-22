import {
  ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts'
import { singleQuestionStats } from '../../utils/filterRecords'
import { pct, labelAxisWidth } from '../../utils/format'
import {
  CHART_CHROME, BINARY_COLORS, LIKERT_DIVERGING, ordinalColors, categoricalColors,
} from '../../theme/palette'
import ChartCard from '../ChartCard'

// Every option gets a color that matches what kind of scale it sits on:
// - likert, or `scale: "diverging"` (5 points around a neutral middle):
//   red <-> grey <-> blue
// - binary: grey "No", blue "Yes"
// - `scale: "sequential"` (ordered, no neutral middle): light -> dark blue
// - anything else is unordered: a distinct hue per option
function colorsFor(question) {
  const labels = question.options.map((o) => o.label)
  const diverging = question.chart === 'likert' || question.scale === 'diverging'
  if (diverging && labels.length === LIKERT_DIVERGING.length) return LIKERT_DIVERGING
  if (question.chart === 'binary' && labels.length === BINARY_COLORS.length) return BINARY_COLORS
  if (question.scale === 'sequential') return ordinalColors(labels.length)
  return categoricalColors(labels)
}

export default function SingleQuestionChart({ question, records }) {
  const { data, denom } = singleQuestionStats(records, question.field, question.options)
  const colors = colorsFor(question)
  const yWidth = labelAxisWidth(data.map((d) => d.label))
  const height = Math.max(130, data.length * 34 + 44)

  return (
    <ChartCard
      title={question.label}
      question={question.question}
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
          <Bar dataKey="pct" name="Share" radius={[0, 4, 4, 0]}>
            {data.map((d, i) => <Cell key={d.label} fill={colors.at(i)} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
