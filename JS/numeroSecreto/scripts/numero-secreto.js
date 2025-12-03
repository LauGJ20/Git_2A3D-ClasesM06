// Generar número secreto aleatorio entre 1 y 100
let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let intentos = 0;
let adivinado = false;

alert("Adivina el número secreto entre 1 y 100");

// Función para pedir un número válido dentro del rango
function pedirNumeroEntre(min, max) {
    let num;
    do {
        num = parseInt(prompt(`Introduce un número entre ${min} y ${max}:`));
        if (isNaN(num) || num < min || num > max) {
            alert(`Por favor, introduce un número válido entre ${min} y ${max}.`);
        }
    } while (isNaN(num) || num < min || num > max);
    return num;
}

// Bucle principal de adivinanza
while (!adivinado) {
    let intento = pedirNumeroEntre(1, 100);
    intentos++;

    if (intento === numeroSecreto) {
        alert(`¡Correcto! Has adivinado en ${intentos} intento(s).`);
        adivinado = true;
    } else if (intento < numeroSecreto) {
        alert("El número secreto es mayor.");
    } else {
        alert("El número secreto es menor.");
    }

    console.log(`Intento ${intentos}: ${intento}`);
}
