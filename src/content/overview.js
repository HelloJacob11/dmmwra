// Text for the Overview tab. Edit freely — the page renders whatever is here.
//
// Each paragraph is a list of pieces:
//   'plain text'
//   { bold: 'text' }                    → bold
//   { bold: 'text', to: '/route' }      → bold link to another tab
export const OVERVIEW = {
  badge: 'Overview',
  title: 'Flood Exposure, Infrastructure Awareness, and Informed Caution',
  authors: 'Arianna Bordogna-Jurkowitz, Samuel Enrique Camacho, and Khalid K. Osman',
  affiliation: 'Civil & Environmental Engineering, Stanford University',
  sections: [
    {
      heading: 'About the Study',
      paragraphs: [
        [
          'About 860 U.S. communities, home to roughly 40 million people, still rely on combined sewer systems that carry sewage and stormwater in shared pipes and can release untreated wastewater into rivers during heavy rain. In 2025, Des Moines, Iowa, closed the last overflow on its collection system, completing a two-decade, $330 million separation program. Programs like this are usually judged by technical measures, such as fewer overflows, while little is known about how residents perceive them. This study surveyed 405 Des Moines households, 152 in person in three low-income neighborhoods near the final outfalls and 253 citywide online, to examine how flood experience and sewer system awareness relate to residents\' trust in local institutions and in their tap water.',
        ],
        [
          'We find that residents with more flood experience are more aware of the combined sewer system, and that greater awareness is associated with higher trust in local government, the separation project, and public communication. Yet these same residents are also more likely to filter their water, buy bottled water, and check labels. We call this pattern "',
          { bold: 'informed caution' },
          '": trust in the institutions that manage water and trust in the water itself are separate judgments that do not always move together. For utilities and public health officials, this suggests tracking what residents do at the tap alongside what they say about their institutions.',
        ],
      ],
    },
    {
      heading: 'About This Dashboard',
      paragraphs: [
        [
          'The first four tabs follow the structure of the survey: ',
          { bold: 'Precipitation & Flooding', to: '/flooding' },
          ', ',
          { bold: 'Sewer System Knowledge', to: '/sewer' },
          ', ',
          { bold: 'Local Government', to: '/government' },
          ', and ',
          { bold: 'Tap Water', to: '/tapwater' },
          '. Each tab presents summary indices, ZIP-level maps, and the response distribution for every question, and the filters at the top let you segment results by ZIP code, length of residence, age, gender, race and ethnicity, education, income, and home ownership. Sample sizes update with each selection, and ZIP codes with fewer than five responses are greyed out to protect respondent privacy. The Community Work tab shares snapshots from the in-person survey days held with our community partners in Des Moines.',
        ],
      ],
    },
  ],
}
