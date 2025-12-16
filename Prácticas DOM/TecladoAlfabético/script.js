// ---------- ELEMENTOS ----------
const pantalla = document.getElementById("pantalla");
const botonEnviar = document.getElementById("btn-enviar");
const botonBorrar = document.getElementById("btn-borrar");
const mensajeError = document.getElementById("mensaje-error");
const tecladoAlf = document.getElementById("teclado-alfabetico");
const tecladoNum = document.getElementById("teclado-numerico");

// ---------- FUNCIONES AUXILIARES ----------
function esVocal(letra) {
    return ["A","E","I","O","U"].includes(letra);
}

function esPrimo(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// ---------- FUNCIONES PRINCIPALES ----------
function escribirTecla(valor) {
    if (pantalla.textContent.length >= 5) {
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
    if (pantalla.textContent.trim() === "") {
        mensajeError.textContent = "No hay nada que enviar";
    } else {
        alert("Texto enviado: " + pantalla.textContent);
        pantalla.textContent = "";
        mensajeError.textContent = "";
    }
}

// ---------- CREACIÓN DEL TECLADO ----------
function crearTecladoAlfabetico() {
    for (let codigo = 65; codigo <= 90; codigo++) {
        let letra = String.fromCharCode(codigo);
        let tecla = document.createElement("div");
        tecla.textContent = letra;
        tecla.className = "tecla";

        if (esVocal(letra)) {
            tecla.style.background = "orange";
            tecla.style.color = "white";
        }

        tecla.addEventListener("click", () => escribirTecla(letra));
        tecladoAlf.appendChild(tecla);
    }
}

function crearTecladoNumerico() {
    for (let i = 1; i <= 9; i++) {
        let tecla = document.createElement("div");
        tecla.textContent = i;
        tecla.className = "tecla";

        // Colores según múltiplos/primos
        if (i % 2 === 0) {
            tecla.style.background = "blue";
            tecla.style.color = "white";
        }
        if (i % 3 === 0) {
            tecla.style.background = "red";
            tecla.style.color = "white";
        }
        if (i % 5 === 0) {
            tecla.style.background = "yellow";
            tecla.style.color = "black";
        }
        if (esPrimo(i)) {
            tecla.style.background = "green";
            tecla.style.color = "white";
        }

        tecla.addEventListener("click", () => escribirTecla(i));
        tecladoNum.appendChild(tecla);
    }
}

// ---------- EVENTOS BOTONES ----------
botonEnviar.addEventListener("click", enviarTexto);
botonBorrar.addEventListener("click", borrarUltimo);

// ---------- INICIALIZACIÓN ----------
crearTecladoAlfabetico();
crearTecladoNumerico();
