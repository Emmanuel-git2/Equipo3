// Función para agregar un producto al contenedor
function agregarProducto(item) {
    const itemHTML = `
        <div class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
            <div class="card" style="width: 18rem; id="productos">
                <img src="${item.img}" class="card-img-top" alt="${item.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.description}</p>
                    <p class="card-text"><strong>Precio:</strong> ${item.price ? `$${item.price.toFixed(2)}` : 'No especificado'}</p>
                    <a href="carrito.html" class="btn">Agregar</a>
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

// Agregar productos estáticos

agregarProducto({ name: 'Bambú', img: 'imagenes/Bambu.webp', description: 'Bambú de la suerte', price: 200.00 });
agregarProducto({ name: 'Dumbo', img: 'imagenes/dumbo.webp', description: 'Dumbo de Disney', price: 280.00 });
agregarProducto({ name: 'Ígor', img: 'imagenes/igor.webp', description: 'Ígor de Disney', price: 249.00 });
agregarProducto({ name: 'Mei Panda Rojo', img: 'imagenes/panda.webp', description: 'Mei Panda Rojo de Disney', price: 367.00 });
agregarProducto({ name: 'Gato', img: 'imagenes/gato.webp', description: 'Gato juguetón', price: 299.00 });
agregarProducto({ name: 'Moto Yoshi', img: 'imagenes/motoYoshi.webp', description: 'Mario Kart : Moto Yoshi', price: 360.00 });
agregarProducto({ name: 'Miniorquídea', img: 'imagenes/orquidea.webp', description: 'Miniorquídea color melón', price: 260.00 });
agregarProducto({ name: 'Rosas', img: 'imagenes/rosas.webp', description: 'Rosas', price: 200.00 });
agregarProducto({ name: 'Arreglo Floral', img: 'imagenes/arreglo.webp', description: 'Arreglo Floral de varios colores', price: 450.00 });
agregarProducto({ name: 'Ciruelo', img: 'imagenes/ciruelo.webp', description: 'Flor de Ciruelo', price: 199.00 });


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

//Estilo de las cards para los productos

// const estiloCard = document.getElementsByClassName("card");
// estiloCard.addEventListener("click", ()=>{
//     estiloCard.style.height= 100;
// });
