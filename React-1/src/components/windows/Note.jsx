import React,{useEffect, useState} from 'react'
import Markdown from 'react-markdown'
import MacWindow from './MacWindow'
// import notes from "../../assets/"
import SyntaxHighlighter from 'react-syntax-highlighter'
import {atelierDuneDark} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import "./note.scss"

const Note = ({windowName, setWindowState}) => {

    const [markdown, setMarkdown] = useState(null)

    useEffect(() =>{
        fetch("/note.txt")
        .then(res => res.text())
        .then(text => setMarkdown(text))
    },[])
  return (
   <MacWindow windowName={windowName} setWindowsState={setWindowState}>
    
    <div className="note-window">
        {markdown? <SyntaxHighlighter language='typescript' style={atelierDuneDark}>{markdown}</SyntaxHighlighter> : <p>Loading...</p>}
    </div>
   </MacWindow>
  )
}

export default Note
