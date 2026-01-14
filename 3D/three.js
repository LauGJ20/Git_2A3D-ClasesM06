import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --------------------
// ESCENA
// --------------------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0); // fondo claro

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
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.5;
document.body.appendChild(renderer.domElement);

// --------------------
// ILUMINACIÓN ESTILO ESTUDIO
// --------------------
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
scene.add(hemiLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
keyLight.position.set(5, 6, 4);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0xffffff, 1.0);
fillLight.position.set(-4, 3, 2);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0xffffff, 1.2);
rimLight.position.set(0, 4, -6);
scene.add(rimLight);

// --------------------
// SOLDADITO
// --------------------
const soldado = new THREE.Group();

// ----- MATERIALES -----
const materialCuerpoRojo = new THREE.MeshStandardMaterial({
    color: 'rgba(180, 20, 20, 1)',
    metalness: 0.6,
    roughness: 0.35
});

const materialCinturonNegro = new THREE.MeshStandardMaterial({
    color: 'rgba(20, 20, 20, 1)',
    metalness: 0.5,
    roughness: 0.5
});

const materialPiernasAzul = new THREE.MeshStandardMaterial({
    color: 'rgba(25, 25, 134, 1)',
    metalness: 0.55,
    roughness: 0.35
});

const materialSombreroNegro = new THREE.MeshStandardMaterial({
    color: 'rgba(100, 100, 100, 1)',
    metalness: 0.7,
    roughness: 0.3
});

const materialCabeza = new THREE.MeshStandardMaterial({
    color: 'rgba(208, 169, 139, 1)',
    metalness: 0.6,
    roughness: 0.35
});


// ----- PIEZAS -----

// Cabeza
const cabeza = new THREE.Mesh(
    new THREE.SphereGeometry(0.32, 14, 20),
    materialCabeza
);
cabeza.position.y = 1.82;
soldado.add(cabeza);

// Cuello
const cuello = new THREE.Mesh(
    new THREE.CylinderGeometry(0.33, 0.15, 0.06),
    materialCuerpoRojo
);
cuello.position.set(0, 1.44, 0);
cuello.rotation.z = Math.PI / 1;
soldado.add(cuello);

// Cuello2
const cuello2 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.18, 0.13),
    materialCuerpoRojo
);
cuello2.position.set(0, 1.5, 0);
cuello2.rotation.z = Math.PI / 1;
soldado.add(cuello2);


// ----- CUERPO -----

    // Cuerpo
    const cuerpo = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.33, 0.58),
        materialCuerpoRojo
    );
    cuerpo.position.set(0, 1.12, 0);
    cuerpo.rotation.z = Math.PI / 1;
    soldado.add(cuerpo);

    // Cuerpo 2
    const cuerpo2 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.33, 0.24, 0.38),
        materialCuerpoRojo
    );
    cuerpo2.position.set(0, 0.58, 0);
    cuerpo2.rotation.z = Math.PI / 1;
    soldado.add(cuerpo2);

    // Cinturon
    const cinturon = new THREE.Mesh(
        new THREE.CylinderGeometry(0.25, 0.25, 0.2),
        materialCinturonNegro
    );
    cinturon.position.set(0, 0.75, 0);
    cinturon.rotation.z = Math.PI / 1;
    soldado.add(cinturon);

// ----- BRAZOS -----

    // ----- BRAZO IZQUIERDO CON MANO -----
    // BRAZO IZQUIERDO
    const brazoIzq = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.08, 0.8),
        materialCuerpoRojo
    );

    // MANO IZQUIERDA
    const manoIzq = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 6.5, 15),
        materialCabeza
    );

        // Pivote del brazo izquierdo
        const pivotBrazoIzq = new THREE.Group();
        pivotBrazoIzq.position.set(-0.4, 1.4, 0); // posición del hombro
        soldado.add(pivotBrazoIzq);

        // Ajustamos la posición del brazo dentro del pivote
        brazoIzq.position.set(0, -0.4, 0);
        pivotBrazoIzq.add(brazoIzq);

        // Ajustamos la posición de la mano relativa al brazo
        manoIzq.position.set(0, -0.45, 0);
        brazoIzq.add(manoIzq); 


    // ----- BRAZO DERECHO CON MANO -----
    // BRAZO DERECHO
    const brazoDer = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.08, 0.8),
        materialCuerpoRojo
    );

    // MANO DERECHA
    const manoDer = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 6.5, 15),
        materialCabeza
    );
        // Pivote del brazo derecho
        const pivotBrazoDer = new THREE.Group();
        pivotBrazoDer.position.set(0.4, 1.4, 0); // hombro
        soldado.add(pivotBrazoDer);

        // Ajustamos la posición del brazo dentro del pivote
        brazoDer.position.set(0, -0.4, 0);
        pivotBrazoDer.add(brazoDer);

        // Ajustamos la posición de la mano relativa al brazo
        manoDer.position.set(0, -0.45, 0);
        brazoDer.add(manoDer); 


// ----- PIERNA -----

    // Pierna izquierda
    const piernaIzq = new THREE.Mesh(
        new THREE.CylinderGeometry(0.14, 0.11, 0.7),
        materialPiernasAzul
    );
    piernaIzq.position.set(-0.12, 0.2, 0);
    soldado.add(piernaIzq);

    // Pierna derecha
    const piernaDer = new THREE.Mesh(
        new THREE.CylinderGeometry(0.14, 0.11, 1.5),
        materialPiernasAzul
    );
    piernaDer.position.set(0.12, -0.3, 0);
    soldado.add(piernaDer);


// ----- SOMBRERO-----

    // Sombrero
    const sombrero = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.25, 0.65),
        materialSombreroNegro
    );
    sombrero.position.set(0, 2.4, 0);
    soldado.add(sombrero);

    // Cosito encima del sombrero
    const encimasombrero = new THREE.Mesh(
        new THREE.CylinderGeometry(0.25, 0.25, 0.05),
        materialSombreroNegro
    );
    encimasombrero.position.set(0, 2.1, 0.15);
    encimasombrero.scale.set(1, 1, 1.2); // X y Z aumentan, Y queda igual
    encimasombrero.rotation.x = Math.PI / 9;
    soldado.add(encimasombrero);


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

    // Balanceo de brazos con pivote
    pivotBrazoIzq.rotation.x = Math.sin(Date.now() * 0.002) * 0.5;
    pivotBrazoDer.rotation.x = -Math.sin(Date.now() * 0.002) * 0.5;

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
