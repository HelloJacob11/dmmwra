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

// Single-series question types each get one consistent hue so the chart
// "kind" is recognizable at a glance without a legend.
export const BAR_COLOR = SERIES[0] // blue — single-select "bar"/"binary" questions
export const MULTISELECT_COLOR = SERIES[1] // aqua — "select all that apply"
export const INDEX_COLOR = SERIES[4] // violet — constructed index distributions

// Binary (Yes/No) questions: muted grey for "No", accent blue for "Yes".
export const BINARY_COLORS = ['#c3c2b7', SERIES[0]]

// 5-point Likert (Strongly disagree -> Strongly agree): diverging blue<->red
// pair per the palette's diverging spec, with a neutral grey midpoint —
// never red/green, which fails for red-green color vision deficiency.
export const LIKERT_DIVERGING = ['#e34948', '#f1abaa', '#f0efec', '#9ec1ea', '#2a78d6']
