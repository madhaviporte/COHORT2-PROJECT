import { useState } from "react";
import "./app.scss"
import Dock from "./components/Dock";
import Nav from "./components/Nav";
import MacWindow from "./components/windows/MacWindow";
import Github from "./components/windows/Github";
import Note from "./components/windows/Note";
import Resume from "./components/windows/Resume";

function App(){
  return(
    <main>
      <Dock/>
      <Nav/>
      <Github/>
      <Note/>
      <Resume/>
    </main>
  )
}
export default App