import { useEffect, useRef, useState } from 'react'
import photo1 from '../assets/community/community-1.jpg'
import photo2 from '../assets/community/community-2.jpg'
import photo3 from '../assets/community/community-3.jpg'
import photo4 from '../assets/community/community-4.jpg'
import photo5 from '../assets/community/community-5.jpg'
import photo6 from '../assets/community/community-6.jpg'

// Order and `layout` are tuned so the 3-column grid fills with no gaps:
// wide = spans two columns, tall = spans two rows.
const PHOTOS = [
  { src: photo1, alt: 'Residents seated at round tables during a community meeting', layout: 'wide' },
  { src: photo5, alt: 'A community member smiling at the meeting', layout: 'tall' },
  { src: photo2, alt: 'Residents listening, one taking a photo with a phone' },
  { src: photo6, alt: 'Survey team members presenting with a microphone and laptop' },
  { src: photo4, alt: 'Residents in conversation around a table', layout: 'wide' },
  { src: photo3, alt: 'Two members of the survey team seated at a table' },
]

// Photo collage from survey outreach. Clicking a photo opens it full size;
// arrow keys step through, Escape closes.
export default function CommunityWork() {
  const [openIndex, setOpenIndex] = useState(null)
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (openIndex === null) {
      if (dialog.open) dialog.close()
    } else if (!dialog.open) {
      dialog.showModal()
    }
  }, [openIndex])

  useEffect(() => {
    if (openIndex === null) return
    function onKey(e) {
      if (e.key === 'ArrowRight') setOpenIndex((i) => (i + 1) % PHOTOS.length)
      if (e.key === 'ArrowLeft') setOpenIndex((i) => (i - 1 + PHOTOS.length) % PHOTOS.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openIndex])

  const current = openIndex === null ? null : PHOTOS[openIndex]

  return (
    <>
      <div className="page-header">
        <h1>Community Work</h1>
        <p>
          Moments from handing out surveys and talking with Des Moines residents about
          flooding, sewers and tap water. Click a photo to see it larger.
        </p>
      </div>

      <div className="photo-gallery">
        {PHOTOS.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            className={`photo-gallery-item ${photo.layout ?? ''}`}
            onClick={() => setOpenIndex(i)}
            aria-label={`View photo: ${photo.alt}`}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" />
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="photo-lightbox"
        onClose={() => setOpenIndex(null)}
        onClick={(e) => { if (e.target === e.currentTarget) setOpenIndex(null) }}
      >
        {current && (
          <>
            <img src={current.src} alt={current.alt} />
            <button type="button" className="photo-lightbox-close" onClick={() => setOpenIndex(null)} aria-label="Close">×</button>
            <button
              type="button"
              className="photo-lightbox-nav prev"
              onClick={() => setOpenIndex((i) => (i - 1 + PHOTOS.length) % PHOTOS.length)}
              aria-label="Previous photo"
            >‹</button>
            <button
              type="button"
              className="photo-lightbox-nav next"
              onClick={() => setOpenIndex((i) => (i + 1) % PHOTOS.length)}
              aria-label="Next photo"
            >›</button>
            <p className="photo-lightbox-count">{openIndex + 1} / {PHOTOS.length}</p>
          </>
        )}
      </dialog>
    </>
  )
}
