// Función para agregar un producto al contenedor dinámicamente desde la API
function agregarProducto(item) {
    const itemHTML = `
        <div class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
            <div class="card" style="width: 18rem;" id="productos">
                <img src="${item.img}" class="card-img-top" alt="${item.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.description}</p>
                    <p class="card-text"><strong>Precio:</strong> ${item.price ? `$${item.price.toFixed(2)}` : 'No especificado'}</p>
                    <a href="" class="btn">Agregar</a>
                </div>
            </div>
        </div>`;
    
    const itemsContainer = document.getElementById("listProducts");
    if (itemsContainer) {
        itemsContainer.insertAdjacentHTML('beforeend', itemHTML);
    } else {
        console.error("El contenedor con id 'listProducts' no existe");
    }
}

// **NUEVA FUNCIÓN**: Obtener productos desde la API en lugar de `localStorage`
function cargarProductosDesdeAPI() {
    // ✅ 1️⃣ Primero mostrar los productos estáticos
const productosEstaticos = [
    { name: 'Bambú', img: 'imagenes/Bambu.webp', description: 'Bambú de la suerte', price: 200.00 },
    { name: 'Dumbo', img: 'imagenes/dumbo.webp', description: 'Dumbo de Disney', price: 280.00 },
    { name: 'Ígor', img: 'imagenes/igor.webp', description: 'Ígor de Disney', price: 249.00 },
    { name: 'Mei Panda Rojo', img: 'imagenes/panda.webp', description: 'Mei Panda Rojo de Disney', price: 367.00 },
    { name: 'Gato', img: 'imagenes/gato.webp', description: 'Gato juguetón', price: 299.00 },
    { name: 'Moto Yoshi', img: 'imagenes/motoYoshi.webp', description: 'Mario Kart : Moto Yoshi', price: 360.00 },
    { name: 'Miniorquídea', img: 'imagenes/orquidea.webp', description: 'Miniorquídea color melón', price: 260.00 },
    { name: 'Rosas', img: 'imagenes/rosas.webp', description: 'Rosas', price: 200.00 },
    { name: 'Arreglo Floral', img: 'imagenes/arreglo.webp', description: 'Arreglo Floral de varios colores', price: 450.00 },
    { name: 'Ciruelo', img: 'imagenes/ciruelo.webp', description: 'Flor de Ciruelo', price: 199.00 }
];

// ✅ Agregar los productos estáticos al inicio
productosEstaticos.forEach(producto => agregarProducto(producto));

// ✅ 2️⃣ Luego cargar productos desde la API
fetch("https://3.147.52.41/api/Producto/")
    .then(response => response.json())
    .then(data => {
        console.log("Productos recibidos desde la API:", data);
        
        data.forEach(producto => {
            agregarProducto({
                name: producto.nombre,
                img: producto.imagenUrl,  // ✅ Solo los que tienen imagen
                description: producto.descripcion,
                price: producto.precio,
            });
        });
    })
    .catch(error => console.error("Error al obtener productos de la API:", error));

}

// Cargar productos dinámicos al abrir la página
document.addEventListener("DOMContentLoaded", function () {
    cargarProductosDesdeAPI();
});
