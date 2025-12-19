let teclado = document.getElementById("teclado");

// Función para saber si un número es primo
function esPrimo(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

for (let i = 1; i < 100; i++) {
    //Creo la tecla
    let tecla = document.createElement("div");
    tecla.innerHTML = "<p>" + i + "</p>";
    tecla.className = "tecla";

    // Si es número primo → verde
    if (esPrimo(i)) {
        tecla.style.background = "#06a53eff";
        tecla.style.color = "white";
    }

    // Si es múltiplo de 2 → azul
    if (i % 2 === 0) {
        tecla.style.background = "#0666c6ff";
        tecla.style.color = "white";
    }

    // Si es múltiplo de 3 → rojo
    if (i % 3 === 0) {
        tecla.style.background = "#d0092aff";
        tecla.style.color = "white";
    }

    // Si es múltiplo de 5 → amarillo
    if (i % 5 === 0) {
        tecla.style.background = "#ffd900ff";
        tecla.style.color = "black";
    }

    teclado.appendChild(tecla);
}
