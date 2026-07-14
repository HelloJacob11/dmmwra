export function pct(n) {
  return `${Math.round(n * 100)}%`
}

// Rough width (px) for a recharts category YAxis given its longest label,
// so long question-option text doesn't get clipped.
export function labelAxisWidth(labels, { min = 140, max = 320, perChar = 6.4 } = {}) {
  const longest = labels.reduce((n, l) => Math.max(n, l.length), 0)
  return Math.min(max, Math.max(min, Math.round(longest * perChar)))
}
