import SingleQuestionChart from './SingleQuestionChart'
import MultiselectQuestionChart from './MultiselectQuestionChart'
import IndexChart from './IndexChart'

// Dispatches a single question from meta.json to the chart that matches its
// kind. New question kinds just need a case added here to appear everywhere.
export default function SectionQuestion({ question, records }) {
  switch (question.kind) {
    case 'single':
      return <SingleQuestionChart question={question} records={records} />
    case 'multiselect':
      return <MultiselectQuestionChart question={question} records={records} />
    case 'index':
      return <IndexChart indexDef={question} records={records} />
    default:
      return null
  }
}
