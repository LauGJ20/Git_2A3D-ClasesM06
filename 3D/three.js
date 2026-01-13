import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --------------------
// ESCENA
// --------------------
const scene = new THREE.Scene();
scene.background = new THREE.Color('rgb(200, 200, 255)');

// --------------------
// CÁMARA
// --------------------
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 2, 6);

// --------------------
// RENDERER
// --------------------
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --------------------
// LUCES
// --------------------
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

// --------------------
// SOLDADITO
// --------------------
const soldado = new THREE.Group();

// Material sencillo (plomo)
const material = new THREE.MeshStandardMaterial({
    color: 'lightgrey',
    roughness: 0.6,
    metalness: 0.3
});

// Cabeza
const cabeza = new THREE.Mesh(
    new THREE.SphereGeometry(0.33, 14, 14),
    material
);
cabeza.position.y = 1.85;
soldado.add(cabeza);

// Cuello
const cuello = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.15, 0.7),
    material
);
cuello.position.set(0, 1.2, 0);
cuello.rotation.z = Math.PI / 1;
soldado.add(cuello);

// Cuerpo
const cuerpo = new THREE.Mesh(
    new THREE.CylinderGeometry(0.24, 0.33, 0.58),
    material
);
cuerpo.position.set(0, 1.12, 0);
cuerpo.rotation.z = Math.PI / 1;
soldado.add(cuerpo);

// Cuerpo 2
const cuerpo2 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.33, 0.24, 0.38),
    material
);
cuerpo2.position.set(0, 0.58, 0);
cuerpo2.rotation.z = Math.PI / 1;
soldado.add(cuerpo2);

// Cinturon
const cinturon = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25, 0.25, 0.2),
    material
);
cinturon.position.set(0, 0.75, 0);
cinturon.rotation.z = Math.PI / 1;
soldado.add(cinturon);


// Brazo izquierdo
const brazoIzq = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.12, 0.8),
    material
);
brazoIzq.position.set(-0.4, 1, 0);
brazoIzq.rotation.z = Math.PI / 1;
soldado.add(brazoIzq);

// Brazo derecho
const brazoDer = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.12, 0.8),
    material
);
brazoDer.position.set(0.4, 1, 0);
brazoDer.rotation.z = Math.PI / 1;
soldado.add(brazoDer);

// Pierna izquierda
const piernaIzq = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14, 0.11, 0.7),
    material
);
piernaIzq.position.set(-0.12, 0.2, 0);
soldado.add(piernaIzq);

// Pierna derecha
const piernaDer = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14, 0.11, 1.5),
    material
);
piernaDer.position.set(0.12, -0.3, 0);
soldado.add(piernaDer);

// Sombrero
const sombrero = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.25, 0.65),
    material
);
sombrero.position.set(0, 2.4, 0);
soldado.add(sombrero);



// Añadimos el soldado a la escena
scene.add(soldado);

// --------------------
// CONTROLES
// --------------------
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// --------------------
// ANIMACIÓN
// --------------------
function animate() {
    requestAnimationFrame(animate);

    // Giro suave del soldadito
    soldado.rotation.y += 0.000;

    controls.update();
    renderer.render(scene, camera);
}

animate();

// --------------------
// RESIZE
// --------------------
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});