// ---------------------------------------------------------------------
// SAMPLE / PLACEHOLDER DATA
// Everything in this file is synthetically generated to exercise the
// dashboard framework end-to-end. None of it is real CSO monitoring or
// survey data. Swap `generateResidentRecords`, `MONTHLY_OVERFLOW_TREND`,
// and `INFRASTRUCTURE_PROJECTS` for real feeds (DMMWRA outfall telemetry,
// Polk County Health, ACS/Census demographic tables) before publishing.
// ---------------------------------------------------------------------
import { DEMOGRAPHIC_FIELDS, ZIP_CODES } from './demographics'

export const IS_SAMPLE_DATA = true

// Deterministic PRNG so numbers are stable across reloads/hot-reload.
function mulberry32(seed) {
  let a = seed
  return function rand() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const rand = mulberry32(20240601)
const choice = (arr) => arr[Math.floor(rand() * arr.length)]
const randInt = (min, max) => Math.floor(min + rand() * (max - min + 1))

const fieldOptions = Object.fromEntries(
  DEMOGRAPHIC_FIELDS.map((f) => [f.key, f.options]),
)

// Legacy combined-sewer coverage is concentrated in Des Moines' older
// urban-core zips; newer zips on separated storm/sanitary systems see far
// fewer overflow events. Values below are illustrative, not measured.
export const ZIP_RISK_FACTOR = {
  50309: 0.44,
  50310: 0.32,
  50311: 0.18,
  50312: 0.22,
  50313: 0.28,
  50314: 0.52,
  50315: 0.46,
  50316: 0.5,
  50317: 0.34,
  50320: 0.4,
  50321: 0.3,
  50322: 0.12,
  50323: 0.1,
}

function buildResidentRecord(id) {
  const zip = choice(ZIP_CODES)
  const riskFactor = ZIP_RISK_FACTOR[zip] ?? 0.25
  const nearOutfall = rand() < riskFactor

  const basementBackupReported = rand() < (nearOutfall ? 0.35 : 0.08)
  const healthComplaintReported =
    rand() < (nearOutfall ? 0.28 : 0.1) + (basementBackupReported ? 0.15 : 0)

  return {
    id,
    zip,
    residence: choice(fieldOptions.residence),
    age: choice(fieldOptions.age),
    gender: choice(fieldOptions.gender),
    race: choice(fieldOptions.race),
    education: choice(fieldOptions.education),
    income: choice(fieldOptions.income),
    homeOwnership: choice(fieldOptions.homeOwnership),
    nearOutfall,
    overflowEventsExperienced: nearOutfall ? randInt(3, 12) : randInt(0, 3),
    basementBackupReported,
    healthComplaintReported,
    estimatedExposureDays: nearOutfall ? randInt(2, 20) : randInt(0, 4),
  }
}

const RECORD_COUNT = 420
export const RESIDENT_RECORDS = Array.from({ length: RECORD_COUNT }, (_, i) =>
  buildResidentRecord(i + 1),
)

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

// Citywide totals — physical outfall data, not segmented by demographics.
export const MONTHLY_OVERFLOW_TREND = MONTHS.map((month, i) => {
  const wetSeason = i >= 3 && i <= 8 // Apr-Sep: higher rainfall/snowmelt
  return {
    month,
    events: randInt(wetSeason ? 5 : 1, wetSeason ? 11 : 5),
    volumeMillionGallons: randInt(wetSeason ? 15 : 3, wetSeason ? 42 : 14),
  }
})

export const OVERFLOW_EVENTS_BY_ZIP = ZIP_CODES.map((zip) => {
  const riskFactor = ZIP_RISK_FACTOR[zip] ?? 0.25
  return {
    zip,
    events: Math.round(riskFactor * randInt(18, 26)),
    volumeMillionGallons: Math.round(riskFactor * randInt(60, 95)),
    lastOverflow: `2026-0${randInt(4, 6)}-${String(randInt(1, 28)).padStart(2, '0')}`,
    receivingWater: choice(['Des Moines River', 'Raccoon River']),
  }
})

export const INFRASTRUCTURE_PROJECTS = [
  {
    id: 'CIP-101',
    name: 'Southeast Interceptor Sewer Separation',
    zip: '50317',
    status: 'On Track',
    budgetUsd: 18_400_000,
    percentComplete: 62,
    estCompletion: '2027-09',
  },
  {
    id: 'CIP-102',
    name: 'Fleur Drive Storage Basin Expansion',
    zip: '50315',
    status: 'Delayed',
    budgetUsd: 26_750_000,
    percentComplete: 34,
    estCompletion: '2028-03',
  },
  {
    id: 'CIP-103',
    name: 'River Bend Combined Sewer Rehab',
    zip: '50316',
    status: 'On Track',
    budgetUsd: 9_200_000,
    percentComplete: 78,
    estCompletion: '2026-12',
  },
  {
    id: 'CIP-104',
    name: 'Downtown Outfall Screening Upgrade',
    zip: '50309',
    status: 'At Risk',
    budgetUsd: 5_600_000,
    percentComplete: 21,
    estCompletion: '2027-06',
  },
  {
    id: 'CIP-105',
    name: 'North Side Green Infrastructure Retrofit',
    zip: '50310',
    status: 'On Track',
    budgetUsd: 4_100_000,
    percentComplete: 55,
    estCompletion: '2027-01',
  },
  {
    id: 'CIP-106',
    name: 'Highland Park Sewer Separation Ph. 2',
    zip: '50313',
    status: 'Delayed',
    budgetUsd: 12_300_000,
    percentComplete: 40,
    estCompletion: '2028-08',
  },
]
