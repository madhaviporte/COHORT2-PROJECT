import React from 'react'
import "./dock.scss"

const Dock = () => {
  return (
    <footer className='dock'>
        <div className="icon github"><img src="/doc-icons/github-fill.svg" alt=""/></div>
        <div className="icon note"><img src="/doc-icons/pencil-line.svg" alt=""/></div>
        <div className="icon pdf"><img src="/doc-icons/file-pdf-line.svg" alt=""/></div>
        <div className="icon calendar"><img src="/doc-icons/calendar-line.svg" alt=""/></div>
        <div className="icon spotify"><img src="/doc-icons/spotify-line.svg" alt=""/></div>
        <div className="icon mail"><img src="/doc-icons/mail-line.svg" alt=""/></div>
        <div className="icon link"><img src="/doc-icons/links-line.svg" alt=""/></div>
        <div className="icon cli"><img src="/doc-icons/terminal-box-line.svg" alt=""/></div>
    </footer>
  )
}

export default Dock
