// Metadata for the 8 demographic filter dimensions used across the dashboard.
// `key` is the query-param key persisted in the URL by FilterContext.
export const DEMOGRAPHIC_FIELDS = [
  {
    key: 'zip',
    label: 'Zip Code',
    options: [
      '50309', '50310', '50311', '50312', '50313', '50314',
      '50315', '50316', '50317', '50320', '50321',
      '50322', '50323',
    ],
  },
  {
    key: 'residence',
    label: 'Length of Residence',
    options: ['<1 year', '1-5 years', '6-10 years', '11-20 years', '20+ years'],
  },
  {
    key: 'age',
    label: 'Age',
    options: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
  },
  {
    key: 'gender',
    label: 'Gender',
    options: ['Female', 'Male', 'Non-binary', 'Prefer not to say'],
  },
  {
    key: 'race',
    label: 'Race / Ethnicity',
    options: [
      'White', 'Black / African American', 'Hispanic / Latino', 'Asian',
      'Native American', 'Two or more races', 'Other',
    ],
  },
  {
    key: 'education',
    label: 'Education Level',
    options: [
      'Less than high school', 'High school diploma / GED', 'Some college',
      "Associate degree", "Bachelor's degree", 'Graduate / professional degree',
    ],
  },
  {
    key: 'income',
    label: 'Income',
    options: [
      'Under $25k', '$25k-49,999', '$50k-74,999', '$75k-99,999',
      '$100k-149,999', '$150k+',
    ],
  },
  {
    key: 'homeOwnership',
    label: 'Home Ownership',
    options: ['Own', 'Rent', 'Other'],
  },
]

export const ZIP_CODES = DEMOGRAPHIC_FIELDS.find((f) => f.key === 'zip').options
