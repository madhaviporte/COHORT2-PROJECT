import React, { useEffect, useRef} from 'react'
import *as THREE from 'three'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useAnimations, useGLTF, useProgress, useTexture } from '@react-three/drei'
import { color, sample, texture } from 'three/tsl'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Dog = () => {

gsap.registerPlugin(useGSAP())
gsap.registerPlugin(ScrollTrigger)

  //canvas ke ander bas use kiya jaa skta hai

  const model = useGLTF("/models/dog.drc.glb")

  useThree(({ camera, scene, gl }) => {
    camera.position.z = 0.55
    gl.toneMapping = THREE.ReinhardToneMapping
    gl.outputColorSpace = THREE.SRGBColorSpace
  })

  const { actions } = useAnimations(model.animations, model.scene)

  useEffect(() => {
    actions["Take 001"].play()
  }, [actions])

  const[normalMap] =(useTexture(["/models/dog_normals.jpg",]))
    .map(texture => {
      texture.colorSpace = THREE.SRGBColorSpace
      return texture
    })

    const[branchMap,branchNormalsMap] = (useTexture(["/models/branches_diffuse.jpeg","/models/branches_normals.jpeg"]))
    .map(texture =>{
      texture.colorSpace = THREE.SRGBColorSpace
      return texture
    })

    const [
      mat1,
      mat2,
      mat3,
      mat4,
      mat5,
      mat6,
      mat7,
      mat8,
      mat9,
      mat10,
      mat11,
      mat12,
      mat13,
      mat14,
      mat15,
      mat16,
      mat17,
      mat18,
      mat19,
      mat20,
    ] = (useTexture([
      "/matcap/mat-1.png",
      "/matcap/mat-2.png",
      "/matcap/mat-3.png",
      "/matcap/mat-4.png",
      "/matcap/mat-5.png",
      "/matcap/mat-6.png",
      "/matcap/mat-7.png",
      "/matcap/mat-8.png",
      "/matcap/mat-9.png",
      "/matcap/mat-10.png",
      "/matcap/mat-11.png",
      "/matcap/mat-12.png",
      "/matcap/mat-13.png",
      "/matcap/mat-14.png",
      "/matcap/mat-15.png",
      "/matcap/mat-16.png",
      "/matcap/mat-17.png",
      "/matcap/mat-18.png",
      "/matcap/mat-19.png",
      "/matcap/mat-20.png"
    ])).map(texture =>{
      texture.colorSpace = THREE.SRGBColorSpace
      return texture
    })

    const material = useRef({
      uMatcap1:{value:mat2},
      uMatcap2:{value:mat19},
      useProgress:{value:0.3}
    })

  const dogMaterial = new THREE.MeshMatcapMaterial({
    normalMap: normalMap,
    matcap: mat2
  })

  const branchMaterial = new THREE.MeshMatcapMaterial({
    normalMap:branchNormalsMap,
    map:branchMap
  })

  function onBeforeCompile(shader){
    
  }

  // dogMaterial.onBeforeCompile = onBeforeCompile

  model.scene.traverse((child) => {
    if (child.name.includes("DOG")) {
      child.material = dogMaterial
    }else{
      child.material = branchMaterial
    }

  })

  const dogModel = useRef(model)

  useGSAP(()=>{ 
    const tl = gsap.timeline({
      scrollTrigger:{
        trigger:'#section-1',
        endTrigger:'#section-3',
        start:'top top',
        end:'bottom bottom',
        markers:true, 
        scrub:true
      }
    })

    tl.to(dogModel.current.scene.position,{
      z:'-=0.75',
      y:'+=0.1'
    })
    .to(dogModel.current.scene.rotation,{
      x: `+=${Math.PI / 15}`,
    })
    .to(dogModel.current.scene.rotation,{
      y:`-=${Math.PI}`,
      x: `+=${Math.PI / 15}`

    },"third")
    .to(dogModel.current.scene.position,{
      x:"-=0.4",
      z:"+=0.5",
      y:"-=0.01"
    },"third")
  },[])

  return (
    <>
      <primitive object={model.scene} position={[0.25, -0.55, 0]} rotation={[0, Math.PI / 3.9, 0]} />
      <directionalLight position={[0, 5, 5]} color={0xFFFFFF} intensity={10} />
      {/* <OrbitControls/> */}
    </>

  )
}

export default Dog
