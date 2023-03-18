// THIS SCRIPT IS THE UNCOMPILED VERSION OF THE /js/main-compiled.js script

import * as THREE from 'three'; 
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from 'gsap';
import { EffectComposer } from "/node_modules/three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "/node_modules/three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "/node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js";

import './style.css'

import sunTexture from '/img/sun.jpg';

// Scene
const scene = new THREE.Scene();

// Sizes
const sizes = {
  width: window.innerWidth,
  heigth: window.innerHeight
}

// Create our sphere 
const textureLoader = new THREE.TextureLoader();

const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture),
  })
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0);
scene.add(mesh);

// Load Cybertruck 
const loader = new GLTFLoader();
loader.load('3d-models/cybertruck/scene.gltf', (gltf) => {
  gltf.scene.position.set(8, 0, 0)
  gltf.scene.scale.set(1, 1, 1)
  
  gltf.scene.traverse(c => {
    c.castShadow = true;
  })
  scene.add(gltf.scene)
  const loop = () => {
    window.requestAnimationFrame(loop);
    gltf.scene.rotation.x += 0.002;
    gltf.scene.rotation.y += 0.002;
    gltf.scene.rotation.z += 0.002;
  }
  loop();
})

loader.load('3d-models/model3/scene.gltf', (gltf) => {
  gltf.scene.position.set(-8, 0, 0)
  gltf.scene.scale.set(0.2, 0.2, 0.2)
  
  gltf.scene.traverse(c => {
    c.castShadow = true;
  })
  scene.add(gltf.scene)
  const loop = () => {
    window.requestAnimationFrame(loop);
    gltf.scene.rotation.x += 0.001;
    gltf.scene.rotation.y += 0.003;
    gltf.scene.rotation.z += 0.002;
  }
  loop();
})

// Light 
const light = new THREE.PointLight(0xE6AF2E, 1, 100);
light.position.set(0, 0, 0);
light.intensity = 10
scene.add(light);

const ambientLight = new THREE.PointLight(0xFFFFFF);
ambientLight.position.set(100, 100, 100)
ambientLight.intensity = 5
scene.add(ambientLight);

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.heigth, 0.1);
camera.position.z = 25
scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.heigth);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 1;

// Resize
window.addEventListener('resize', () => {
  // Update Sizes
  sizes.width = window.innerWidth;
  sizes.heigth = window.innerHeight;
  // Update Camera 
  camera.aspect = sizes.width / sizes.heigth;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.heigth);
  bloomComposer.setSize(window.innerWidth, window.innerHeight);
})

// Bloom Renderer
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);
bloomPass.threshold = 0;
bloomPass.strength = 0.3; // Intensity of glow
bloomPass.radius = 0;
const bloomComposer = new EffectComposer(renderer);
bloomComposer.setSize(window.innerWidth, window.innerHeight);
bloomComposer.renderToScreen = true;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
  bloomComposer.render();
}
loop();

// Timeline (using GSAP)
const tl = gsap.timeline({defaults: { duration: 1} });
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1});
tl.fromTo("nav", {y: "-100%"}, {y: "0%"})
tl.fromTo(".title", {opacity: "0"}, {opacity: "1"})
