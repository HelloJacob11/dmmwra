// Literal hex values for chart marks (recharts renders SVG fills that don't
// reliably track CSS custom properties across browsers/color schemes yet).
// Keep these in sync with the --series-*/--status-* tokens in src/index.css.
export const SERIES = [
  '#2a78d6', // 1 blue
  '#1baf7a', // 2 aqua
  '#eda100', // 3 yellow
  '#008300', // 4 green
  '#4a3aa7', // 5 violet
  '#e34948', // 6 red
  '#e87ba4', // 7 magenta
  '#eb6834', // 8 orange
]

export const STATUS = {
  good: '#0ca30c',
  warning: '#fab219',
  serious: '#ec835a',
  critical: '#d03b3b',
}

export const CHART_CHROME = {
  gridline: '#e1e0d9',
  baseline: '#c3c2b7',
  textMuted: '#898781',
  textSecondary: '#52514e',
  surface: '#fcfcfb',
}

export const INDEX_COLOR = '#4a4945' // dark gray — constructed index distributions

const MUTED_GREY = '#c3c2b7'

// 5-point Likert (Strongly disagree -> Strongly agree): diverging blue<->red
// pair per the palette's diverging spec, with a neutral grey midpoint —
// never red/green, which fails for red-green color vision deficiency.
export const LIKERT_DIVERGING = ['#e34948', '#f1abaa', '#f0efec', '#9ec1ea', '#2a78d6']

// Ordered scales with no neutral midpoint (frequency, amount):
// one hue, light -> dark along the option order. Picked evenly for n options.
const ORDINAL_RAMP = ['#cde2fb', '#a9ccf5', '#6da7ec', '#3987e5', '#256abf', '#1c5cab', '#0d366b']

export function ordinalColors(n) {
  if (n <= 1) return [ORDINAL_RAMP[4]]
  return Array.from({ length: n }, (_, i) =>
    ORDINAL_RAMP.at(Math.round(1 + (i * (ORDINAL_RAMP.length - 2)) / (n - 1))))
}

// Yes / No (/ Don't know) answers: blue Yes, red No, grey Don't know — the
// same ends as the Likert scale. Returns null if any option isn't one of these.
const YES_NO = { yes: LIKERT_DIVERGING.at(-1), no: LIKERT_DIVERGING[0], "don't know": MUTED_GREY }

export function yesNoColors(labels) {
  const keys = labels.map((label) => label.toLowerCase().match(/^(yes|no|don't know)\b/)?.[1])
  return keys.every(Boolean) ? keys.map((k) => YES_NO[k]) : null
}

// Unordered choices: blue for the most-chosen option fading to grey for the
// least, so color repeats the ranking. Equal values share a color.
const RANK_TOP = [42, 120, 214] // LIKERT_DIVERGING blue
const RANK_BOTTOM = [195, 194, 183] // MUTED_GREY

export function rankColors(values) {
  const sorted = [...values].sort((a, b) => b - a)
  const steps = Math.max(1, new Set(sorted).size - 1)
  const distinct = [...new Set(sorted)]
  return values.map((v) => {
    const t = distinct.indexOf(v) / steps
    const rgb = RANK_TOP.map((c, i) => Math.round(c + (RANK_BOTTOM.at(i) - c) * t))
    return `rgb(${rgb.join(', ')})`
  })
}

// Sequential (one hue, light -> dark) for magnitude on the ZIP choropleth —
// same blue ramp as BAR_COLOR, quantized to 5 steps.
export const MAP_SEQUENTIAL = ['#cde2fb', '#86b6ef', '#3987e5', '#1c5cab', '#0d366b']

// Suppressed / no-data ZIPs are muted grey — grey means "no reliable
// signal," not "zero."
export const MAP_SUPPRESSED = MUTED_GREY
