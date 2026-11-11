import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { OVERVIEW } from '../content/overview'

function Piece({ piece }) {
  if (typeof piece === 'string') return piece
  if (piece.to) return <Link to={piece.to} className="overview-tab-link"><strong>{piece.bold}</strong></Link>
  return <strong>{piece.bold}</strong>
}

// Introduces the study and explains the dashboard. Text lives in
// src/content/overview.js; this page only lays it out.
export default function Overview() {
  const { hash } = useLocation()

  // React Router doesn't scroll to #anchors, so do it here (e.g. /overview#partners).
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  return (
    <>
      <header className="page-header">
        <span className="survey-part-badge">{OVERVIEW.badge}</span>
        <h1>{OVERVIEW.title}</h1>
        <p>{OVERVIEW.authors}</p>
        <p className="page-header-count">{OVERVIEW.affiliation}</p>
      </header>

      {OVERVIEW.sections.map((section) => (
        <section key={section.heading} className="chart-card overview-card">
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph, i) => (
            <p key={i}>
              {paragraph.map((piece, j) => <Piece key={j} piece={piece} />)}
            </p>
          ))}
        </section>
      ))}

      <section id="partners" className="chart-card overview-card">
        <h2>{OVERVIEW.partners.heading}</h2>
        {OVERVIEW.partners.paragraphs.map((paragraph, i) => (
          <p key={i}>
            {paragraph.map((piece, j) => <Piece key={j} piece={piece} />)}
          </p>
        ))}
        <ul className="partner-logos">
          {OVERVIEW.partners.logos.map((logo) => (
            <li key={logo.name} className="partner-logo" title={logo.name}>
              <img src={logo.src} alt={logo.name} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
