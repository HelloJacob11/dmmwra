import { useEffect, useId, useRef, useState } from 'react'

// Small "i" button that toggles a popover. Closes on outside click or Escape.
export default function InfoPopover({ label, children }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const panelId = useId()

  useEffect(() => {
    if (!open) return
    const onPointer = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <span className="info-popover" ref={ref}>
      <button
        type="button"
        className="info-popover-button"
        aria-label={label}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
          <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="8" cy="4.9" r="0.95" fill="currentColor" />
          <path d="M8 7.2v4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div className="info-popover-panel" id={panelId} role="dialog" aria-label={label}>
          {children}
        </div>
      )}
    </span>
  )
}
