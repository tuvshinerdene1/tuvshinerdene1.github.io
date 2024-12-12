import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import { World } from './world';

//renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x80a0e0);
document.body.appendChild(renderer.domElement);

//camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,);
camera.position.set(2,2,2);
camera.lookAt(0,0,0);


const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0,0,0);
controls.update();

//Scene setup
const scene = new THREE.Scene();
//const world = new World(); 

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshLambertMaterial({color: 0x00d000});

const cube = new THREE.Mesh(geometry, material);
cube.position.set(0,0,0);


//cube is represented as a mesh, mesh is combination of geometry and material
//const geometry = new THREE.BoxGeometry();

scene.add(cube);

function setupLights() {
  const light1 = new THREE.DirectionalLight();
  light1.position.set(1,1,1);
  scene.add(light1);

  const light2 = new THREE.DirectionalLight();
  light2.position.set(-1,1,-0.5);
  scene.add(light2);

  const ambient = new THREE.AmbientLight();
  ambient.intensity = 0.1;
  scene.add(ambient);
}

//render loop
function animate(){
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

setupLights();
animate();