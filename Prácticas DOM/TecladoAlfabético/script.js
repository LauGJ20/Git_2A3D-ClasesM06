let pantalla = document.getElementById("pantalla");
let botonEnviar = document.getElementById("btn-enviar");

// ---------- BOTÓN ENVIAR ----------
botonEnviar.addEventListener("click", () => {
    if (pantalla.textContent.trim() === "") {
        alert("No hay nada que enviar");
    } else {
        alert("Texto enviado: " + pantalla.textContent);
        pantalla.textContent = "";
    }
});

// ---------- FUNCIONES ----------
function esVocal(letra) {
    return ["A", "E", "I", "O", "U"].includes(letra);
}

function esPrimo(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// ---------- TECLADO ALFABÉTICO ----------
let tecladoAlf = document.getElementById("teclado-alfabetico");

for (let codigo = 65; codigo <= 90; codigo++) {
    let letra = String.fromCharCode(codigo);
    let tecla = document.createElement("div");

    tecla.textContent = letra;
    tecla.className = "tecla";

    // Vocales en naranja
    if (esVocal(letra)) {
        tecla.style.background = "orange";
        tecla.style.color = "white";
    }

    // Escribir letra en pantalla
    tecla.addEventListener("click", () => {
        pantalla.textContent += letra;
    });

    tecladoAlf.appendChild(tecla);
}

// ---------- TECLADO NUMÉRICO ----------
let tecladoNum = document.getElementById("teclado-numerico");

for (let i = 1; i <= 9; i++) {
    let tecla = document.createElement("div");

    tecla.textContent = i;
    tecla.className = "tecla";

    // Colores
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

    // Escribir número en pantalla
    tecla.addEventListener("click", () => {
        pantalla.textContent += i;
    });

    tecladoNum.appendChild(tecla);
}
