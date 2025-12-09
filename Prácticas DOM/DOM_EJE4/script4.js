// 1. Crear un nuevo elemento <p>
const nuevoParrafo = document.createElement('p');

// 2. Añadir texto al párrafo
nuevoParrafo.textContent = "Este es un párrafo añadido";

// 3. Seleccionar el contenedor donde se añadirá el párrafo
const contenedor = document.getElementById('contenedor');

// 4. Añadir el párrafo al contenedor
contenedor.appendChild(nuevoParrafo);
