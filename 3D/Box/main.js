import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75,innerWidth /innerHeight, 0.1, 1000 );

// Mesh ---> shape + material
const cubegeometry = new THREE.BoxGeometry( 1, 1, 1 );
const cubematerial = new THREE.MeshBasicMaterial( { 
    color: 0x00ff00
} );

const cube = new THREE.Mesh( cubegeometry, cubematerial );
scene.add( cube );

console.log(cube.position);


const light = new THREE.DirectionalLight(0xFFFFFF,1)
scene.add(light)

light.position.y = 4
light.position.z = 4
console.log(light.position);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth,innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

camera.position.z = 5;

function animate() {

  cube.rotation.x += 0.05;
  cube.rotation.y += 0.05;
  cube.rotation.z += 0.05;

  renderer.render( scene, camera );
  
  
}
renderer.setAnimationLoop(animate)