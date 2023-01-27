import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import WebGL from './plugins/WebGL'

const wrapper = document.querySelector('#scene');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor('#efefef')
wrapper.append( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x101555 } );
const cube = new THREE.Mesh( geometry, material );

cube.position.x = 0;
// scene.add( cube );

const loader = new GLTFLoader()
loader.load(
  './src/models/microphone.glb',
  gltf => {
    gltf.scene.position.x = 0;
    scene.add( gltf.scene );

    (function animate() {
      gltf.scene.rotation.x += 0.01;
    
      requestAnimationFrame( animate );
      renderer.render( scene, camera );
    })();
  },
  undefined,
  error => console.error( error )
)

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
ambientLight.intensity = 4;
scene.add( ambientLight );

camera.position.z = 0.3;

function animate() {
  cube.rotation.y += 0.01;

	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

function zoom () {
  camera.position.z -= 0.1;
}

if ( WebGL.isWebGLAvailable() ) {
	animate();

  window.addEventListener('mousewheel', zoom)

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}
