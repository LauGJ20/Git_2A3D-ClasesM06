// Generar número secreto
let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let intentos = 0;

// Elementos del DOM
const inputNumero = document.getElementById("inputNumero");
const btnProbar = document.getElementById("btnProbar");
const mensaje = document.getElementById("mensaje");
const intentosDisplay = document.getElementById("intentos");

btnProbar.addEventListener("click", () => {
    let intento = parseInt(inputNumero.value);

    // Validar entrada
    if (isNaN(intento) || intento < 1 || intento > 100) {
        mensaje.textContent = "Introduce un número válido entre 1 y 100.";
        mensaje.style.color = "red";
        return;
    }

    intentos++;
    intentosDisplay.textContent = `Intentos: ${intentos}`;

    // Comprobar número
    if (intento === numeroSecreto) {
        mensaje.textContent = `¡Correcto! Has adivinado en ${intentos} intento(s). 🎉`;
        mensaje.style.color = "green";
        inputNumero.disabled = true;
        btnProbar.disabled = true;
    } else if (intento < numeroSecreto) {
        mensaje.textContent = "El número secreto es mayor.";
        mensaje.style.color = "blue";
    } else {
        mensaje.textContent = "El número secreto es menor.";
        mensaje.style.color = "blue";
    }

    // Limpiar input
    inputNumero.value = "";
    inputNumero.focus();
});
