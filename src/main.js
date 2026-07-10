import './style.css'
import * as THREE from "three"

// scene
const scene = new THREE.Scene()


// camera 
const camera = new THREE.PerspectiveCamera(
    75, // field of view
    window.innerWidth / window.innerHeight, // aspect ratio
    0.01, // near
    100 // far
)

camera.position.z = 5


// mesh
const geometry = new THREE.BoxGeometry(1, 1, 1)

const material = new THREE.MeshBasicMaterial({
  color: "red",
})

const cube = new THREE.Mesh(geometry, material)

scene.add(cube)


// canvas(big screen)
const canvas = document.querySelector("canvas")


// renderer(projector)
const renderer = new THREE.WebGLRenderer({
  canvas
})

renderer.setSize(window.innerWidth, window.innerHeight)



// animation
const animate = () => {
  cube.rotation.y += 0.1

  renderer.render(scene, camera)

  requestAnimationFrame(animate)
}

animate()