// Función para agregar un producto al contenedor
function agregarProducto(item) {
    const itemHTML = `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div class="card" style="width: 18rem;">
                <img src="${item.img}" class="card-img-top" alt="${item.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.description}</p>
                    <p class="card-text"><strong>Precio:</strong> ${item.price ? `$${item.price.toFixed(2)}` : 'No especificado'}</p>
                    <a href="carrito.html" class="btn btn-primary">Agregar</a>
                </div>
            </div>
        </div>`;
    const itemsContainer = document.getElementById("list-items");
    if (itemsContainer) {
        itemsContainer.insertAdjacentHTML('beforeend', itemHTML);
    } else {
        console.error("El contenedor con id 'list-items' no existe");
    }
}

// Agregar productos estáticos
agregarProducto({ name: 'Husky', img: 'imagenes/Husky.jpg', description: 'Bloques de construcción perro Husky' });
agregarProducto({ name: 'Uvas', img: 'imagenes/Uvas.jpg', description: 'Bloques de construcción uvas' });
agregarProducto({ name: 'Frutas', img: 'imagenes/Frutas.jpg', description: 'Bloques de construcción frutas' });
agregarProducto({ name: 'Kiwi', img: 'imagenes/Kiwi.jpg', description: 'Bloques de construcción de kiwi' });
agregarProducto({ name: 'Aguacate', img: 'imagenes/Aguacate.jpg', description: 'Bloques de construcción de Aguacate' });
agregarProducto({ name: 'Pajarito Rojo', img: 'imagenes/PajaroRojo.jpg', description: 'Bloques de construcción de pajarito' });
agregarProducto({ name: 'Pajarito Azul y Blanco', img: 'imagenes/PajaroAzulConBlanco.jpg', description: 'Bloques de construcción de Pajarito blanco con Azul' });
agregarProducto({ name: 'Ballena', img: 'imagenes/BallenaNegra.jpg', description: 'Bloques de construcción de ballena' });
agregarProducto({ name: 'Pingüino', img: 'imagenes/Pinguino.jpg', description: 'Bloques de construcción de pingüino' });
agregarProducto({ name: 'Cactus', img: 'imagenes/Cactus.jpg', description: 'Bloques de construcción de cactus' });

// Función para mostrar productos dinámicos (almacenados en localStorage)
function mostrarProductosDinamicos() {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    if (productos.length === 0) {
        console.log("No hay productos dinámicos en localStorage.");
        return;
    }

    productos.forEach((producto) => {
        agregarProducto({
            name: producto.name,
            img: producto.image,
            description: producto.description,
            price: producto.price,
        });
    });
}

// Llamar a la función para mostrar productos dinámicos al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    mostrarProductosDinamicos();
});
