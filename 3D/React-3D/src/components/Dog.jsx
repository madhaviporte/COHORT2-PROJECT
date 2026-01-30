import React, { useEffect } from 'react'
import *as THREE from 'three'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useAnimations, useGLTF, useTexture } from '@react-three/drei'
import { color, sample, texture } from 'three/tsl'

const Dog = () => {

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

  const [
    normalMap,
    sampleMatCap,
    
  ] = (useTexture(["/models/dog_normals.jpg", "/matcap/mat-2.png"]))
    .map(texture => {
      texture.colorSpace = THREE.SRGBColorSpace
      return texture
    })
    const[branchMap,
    branchNormalsMap] = (useTexture(["/models/branches_diffuse.jpeg","/models/branches_normals.jpeg"]))
    .map(texture =>{
      texture.colorSpace = THREE.SRGBColorSpace
      return texture
    })

  const dogMaterial = new THREE.MeshMatcapMaterial({
    normalMap: normalMap,
    matcap: sampleMatCap
  })

  const branchMaterial = new THREE.MeshMatcapMaterial({
    normalMap:branchNormalsMap,
    map:branchMap
  })

  model.scene.traverse((child) => {
    if (child.name.includes("DOG")) {
      child.material = dogMaterial
    }else{
      child.material = branchMaterial
    }

  })

  return (
    <>
      <primitive object={model.scene} position={[0.25, -0.55, 0]} rotation={[0, Math.PI / 3.9, 0]} />
      <directionalLight position={[0, 5, 5]} color={0xFFFFFF} intensity={10} />
      {/* <OrbitControls/> */}
    </>

  )
}

export default Dog
