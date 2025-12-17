// ---------- ELEMENTOS ----------
const pantalla = document.getElementById("pantalla");
const botonEnviar = document.getElementById("btn-enviar");
const botonBorrar = document.getElementById("btn-borrar");
const mensajeError = document.getElementById("mensaje-error");
const tecladoAlf = document.getElementById("teclado-alfabetico");
const tecladoNum = document.getElementById("teclado-numerico");
const historial = document.getElementById("historial-intentos");

// ---------- VARIABLES WORDLE ----------
let palabra = "";
let intentos = 0;
const maxIntentos = 6;
const longitudPalabra = 5;
let filas = [];

// ---------- PALABRA SECRETA ----------
function palabraSecreta() {
    fetch('https://random-word-api.herokuapp.com/word?lang=es&length=5')
        .then(response => response.json())
        .then(data => {
            palabra = data[0].toUpperCase();
            console.log("Palabra secreta:", palabra);
        });
}

// ---------- FUNCIONES PRINCIPALES ----------
function escribirTecla(valor) {
    if (pantalla.textContent.length >= longitudPalabra) {
        mensajeError.textContent = "¡Texto demasiado largo!";
        return;
    }
    pantalla.textContent += valor;
    mensajeError.textContent = "";
}

function borrarUltimo() {
    pantalla.textContent = pantalla.textContent.slice(0, -1);
    mensajeError.textContent = "";
}

function enviarTexto() {
    if (pantalla.textContent.length < longitudPalabra) {
        mensajeError.textContent = "La palabra debe tener 5 letras";
        return;
    }
    if (intentos >= maxIntentos) return;

    const intento = pantalla.textContent.toUpperCase();

    // Colorear la fila actual
    for (let i = 0; i < longitudPalabra; i++) {
        const letraDiv = filas[intentos][i];
        letraDiv.textContent = intento[i];

        if (intento[i] === palabra[i]) {
            letraDiv.classList.add("verde");
        } else if (palabra.includes(intento[i])) {
            letraDiv.classList.add("amarillo");
        } else {
            letraDiv.classList.add("gris");
        }
    }

    intentos++;
    pantalla.textContent = "";

    // Comprobar fin
    if (intento === palabra) {
        mensajeError.textContent = "¡Ganaste!";
        bloquearTeclado();
    } else if (intentos >= maxIntentos) {
        mensajeError.textContent = "¡Has perdido! Palabra: " + palabra;
        bloquearTeclado();
    }
}

// ---------- FUNCIONES AUXILIARES ----------
function bloquearTeclado() {
    const teclas = document.querySelectorAll(".tecla");
    teclas.forEach(tecla => tecla.disabled = true);
}

// ---------- CREAR HISTORIAL (6 filas fijas) ----------
function crearHistorial() {
    for (let i = 0; i < maxIntentos; i++) {
        const fila = document.createElement("div");
        fila.className = "fila-intento";

        const cuadros = [];
        for (let j = 0; j < longitudPalabra; j++) {
            const cuadro = document.createElement("div");
            cuadro.className = "cuadro-letra";
            fila.appendChild(cuadro);
            cuadros.push(cuadro);
        }

        historial.appendChild(fila);
        filas.push(cuadros);
    }
}

// ---------- CREAR TECLADOS ----------
function crearTecladoAlfabetico() {
    for (let codigo = 65; codigo <= 90; codigo++) {
        const letra = String.fromCharCode(codigo);
        const tecla = document.createElement("div");
        tecla.textContent = letra;
        tecla.className = "tecla";
        tecla.addEventListener("click", () => escribirTecla(letra));
        tecladoAlf.appendChild(tecla);
    }
}

function crearTecladoNumerico() {
    for (let i = 1; i <= 9; i++) {
        const tecla = document.createElement("div");
        tecla.textContent = i;
        tecla.className = "tecla";
        tecla.addEventListener("click", () => escribirTecla(i));
        tecladoNum.appendChild(tecla);
    }
}

// ---------- EVENTOS ----------
botonEnviar.addEventListener("click", enviarTexto);
botonBorrar.addEventListener("click", borrarUltimo);

// ---------- INICIO ----------
palabraSecreta();
crearHistorial();
crearTecladoAlfabetico();
crearTecladoNumerico();
