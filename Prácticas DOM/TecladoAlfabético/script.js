// Teclado alfabético
let tecladoAlf = document.getElementById("teclado-alfabetico");
function esVocal(letra) {
    return ["A","E","I","O","U"].includes(letra);
}

for (let codigo = 65; codigo <= 90; codigo++) {
    let letra = String.fromCharCode(codigo);

    let tecla = document.createElement("div");
    tecla.innerHTML = "<p>" + letra + "</p>";
    tecla.className = "tecla";

    if (esVocal(letra)) {
        tecla.style.background = "orange";
        tecla.style.color = "white";
    }

    tecladoAlf.appendChild(tecla);
}

// Teclado numérico
let tecladoNum = document.getElementById("teclado-numerico");

for (let i = 1; i < 10; i++) {
    let tecla = document.createElement("div");
    tecla.innerHTML = "<p>" + i + "</p>";
    tecla.className = "tecla";

    // Colores según múltiplos
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

    // Números primos → verde
    function esPrimo(num) {
        if (num < 2) return false;
        for (let j = 2; j <= Math.sqrt(num); j++) {
            if (num % j === 0) return false;
        }
        return true;
    }
    if (esPrimo(i)) {
        tecla.style.background = "green";
        tecla.style.color = "white";
    }

    tecladoNum.appendChild(tecla);
}
