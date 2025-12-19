// --- Mostrar contenido en la consola ---

// Seleccionar el <h1> y mostrar su contenido
const h1 = document.querySelector('h1');
console.log("Contenido del <h1>:", h1.textContent);

// Seleccionar el párrafo con ID 'important' y mostrar su contenido
const pImportant = document.getElementById('important');
console.log("Contenido del párrafo:", pImportant.textContent);

// --- Modificar contenido ---

// Cambiar el texto del párrafo
pImportant.textContent = "Texto importante actualizado.";

// Cambiar el valor del input
const inputUser = document.getElementById('user-input');
inputUser.value = "Nuevo texto en el input.";
