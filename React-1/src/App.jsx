import { useState } from "react";
import "./app.scss"
import Dock from "./components/Dock";
import Nav from "./components/Nav";

function App(){
  return(
    <main>
      <Dock/>
      <Nav/>
    </main>
  )
}
export default App