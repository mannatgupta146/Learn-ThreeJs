import './style.css'
import * as THREE from "three"
import { OrbitControls} from "three/examples/jsm/controls/OrbitControls"

const size = {
  width: window.innerWidth,
  height: window.innerHeight
}

// scene
const scene = new THREE.Scene()

const clock = new THREE.Clock()


// camera 
const camera = new THREE.PerspectiveCamera(
    75, // field of view
    size.width / size.height, // aspect ratio
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
const animate = () => {

  const delta = clock.getElapsedTime()

  console.log(delta)

  cube.rotation.y = delta

  controls.update()

  renderer.render(scene, camera)

  requestAnimationFrame(animate)
}

animate()