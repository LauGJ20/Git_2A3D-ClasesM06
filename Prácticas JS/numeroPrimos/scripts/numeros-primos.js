// Función para pedir un número válido
function pedirNumero(mensaje) {
    let num;
    do {
        num = parseInt(prompt(mensaje));
    } while (isNaN(num)); // Repite mientras no sea un número
    return num;
}

// Pedimos el inicio y fin del rango
let inicio = pedirNumero("Introduce el número de inicio:");
let fin = pedirNumero("Introduce el número final:");

// Asegurarnos de que inicio <= fin
if (inicio > fin) {
    let temp = inicio;
    inicio = fin;
    fin = temp;
}

console.log(`Números primos entre ${inicio} y ${fin}:`);

for (let num = inicio; num <= fin; num++) {
    if (num < 2) continue;

    let esPrimo = true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            esPrimo = false;
            break;
        }
    }

    if (esPrimo) {
        console.log(num);
    }
}
