import './style.css'
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const size = {
  width: window.innerWidth,
  height: window.innerHeight
}

// scene
const scene = new THREE.Scene()

const clock = new THREE.Timer()

// texture
const textureLoader = new THREE.TextureLoader()


const texture = textureLoader.load(
  "https://images.unsplash.com/photo-1777720871398-ee7a22a72f78?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  () => {
    console.log("texture loaded")
  },
  () => {
    console.log("texture is loading")
  },
  () => {
    console.log("texture error")
  }
)


// camera 
const camera = new THREE.PerspectiveCamera(
  75, // field of view
  size.width / size.height, // aspect ratio
  0.01, // near
  100 // far
)

camera.position.z = 5


const ambientLight = new THREE.AmbientLight("#ffffff", 0.2)
scene.add(ambientLight)


// const directionalLight = new THREE.DirectionalLight("#ffffff", 1)

// directionalLight.position.set(2, 2, 2)
// scene.add(directionalLight)

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
// scene.add(directionalLightHelper)


// const pointLight = new THREE.PointLight("#ffffff", 2, 10, 1) 
// pointLight.position.set(2, 2, 2)
// scene.add(pointLight)

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
// scene.add(pointLightHelper)

// mesh
const geometry = new THREE.BoxGeometry(1, 1, 1)

const material = new THREE.MeshStandardMaterial({
  color: "red"
})

const cube = new THREE.Mesh(geometry, material)

scene.add(cube)


// canvas(big screen)
const canvas = document.querySelector("canvas")


// renderer(projector)
const renderer = new THREE.WebGLRenderer({
  canvas
})

const controls = new OrbitControls(camera, renderer.domElement)

renderer.setSize(size.width, size.height)

window.addEventListener("resize", () => {
  size.width = window.innerWidth
  size.height = window.innerHeight

  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()

  renderer.setSize(size.width, size.height)
})


// animation
const animate = (timestamp) => {

  clock.update(timestamp)

  const delta = clock.getElapsed()

  // console.log(delta)

  // cube.rotation.y = delta

  controls.update()

  renderer.render(scene, camera)

  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)