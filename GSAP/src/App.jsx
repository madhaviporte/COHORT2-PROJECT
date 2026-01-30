import React from 'react'
import './App.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const App = () => {
  gsap.registerPlugin(useGSAP)
  gsap.registerPlugin(ScrollTrigger)

  useGSAP(()=>{
    // gsap.to("html",{
    //   backgroundColor:"#0a0941ff",
    const tl = gsap.timeline({
       scrollTrigger:{
      trigger:"#section-1",
      start:"top top",
      markers:true, 
      scrub: true,
      endTrigger:"#section-4",
      end:"top top"
     }
    })
    tl.to('html',{
      backgroundColor:"#995555"
    })
    .to('html',{
      backgroundColor:"#559955"
    })
    .to('html',{
      backgroundColor:"#555599"
    })
  }, [])
  return (
    <main>
      <section id='section-1'>section1</section>
      <section id='section-2'>section2</section>
      <section id='section-3'>section3</section>
      <section id='section-4'>section4</section>
    </main>
  )
}

export default App
