// Mostrar el contenido del <h1> en la consola
const titulo = document.querySelector("h1");
console.log("Contenido del h1:", titulo.textContent);

// Seleccionar el párrafo con ID "important" y mostrar su texto
const parrafoImportante = document.getElementById("important");
console.log("Texto del párrafo importante:", parrafoImportante.textContent);

// Modificar el contenido del párrafo
parrafoImportante.textContent = "Texto importante actualizado.";

// Cambiar el valor del input con ID "user-input"
const inputUsuario = document.getElementById("user-input");
inputUsuario.value = "Nuevo texto en el input.";
