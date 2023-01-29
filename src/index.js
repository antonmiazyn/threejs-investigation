import WebGL from './plugins/WebGL'
import {
  Scene,
  SphereGeometry,
  MeshStandardMaterial,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
  PointLight
} from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

if (WebGL.isWebGLAvailable()) {
  const scene = new Scene()

  const geometry = new SphereGeometry(3, 64, 64)
  const material = new MeshStandardMaterial({ color: '#00FF00', roughness: 0.25 })
  const mesh = new Mesh(geometry, material)
  scene.add(mesh)

  const light = new PointLight('#FFFFFF', 1, 100)
  light.position.set(0, 10, 10)
  scene.add(light)

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  const camera = new PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
  camera.position.z = 20
  scene.add(camera)

  const renderer = new WebGLRenderer()
  renderer.setSize(sizes.width, sizes.height)
  renderer.render(scene, camera)

  const canvas = document.querySelector('#scene')
  canvas.appendChild( renderer.domElement )

  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true
  controls.enablePan = false
  controls.enableZoom = false
  controls.autoRotate = true
  controls.autoRotateSpeed = 8

  window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
  })


  const update = () => {
    const fps = 60

    controls.update()
    renderer.render(scene, camera)

    setTimeout(() => window.requestAnimationFrame(update), 1000 / fps)
  }
  update()
}

// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
