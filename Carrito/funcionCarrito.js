// Importa 'productos' si está en otro archivo
// import { productos } from '../PaginaInicio/FuncionProductos.js';
console.log('Productos cargados:', productos);

// Función para ajustar la ruta de la imagen
function ajustarRutaImagen(rutaImagen, carpeta) {
    console.log(`Ajustando ruta para: ${rutaImagen} en carpeta: ${carpeta}`);
    if (rutaImagen.startsWith('http') || rutaImagen.startsWith('/')) {
        return rutaImagen;
    }
    return `../${carpeta}/${rutaImagen}`;
}

// Array para almacenar los artículos del carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
console.log('Carrito cargado:', carrito);

// Función para añadir al carrito
export function añadirAlCarrito(name, price, img, category) {
    const index = carrito.findIndex(item => item.name === name);
    if (index !== -1) {
        carrito[index].quantity++;
    } else {
        carrito.push({ name, price, img, category, quantity: 1 });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
    actualizarCarrito(); // Actualiza el carrito y muestra recomendaciones
}

// Función para actualizar el contador del carrito y cambiar la imagen del carrito
export function actualizarContador() {
    const contadorCarrito = document.getElementById('contador-carrito');
    const imagenCarrito = document.querySelector('a[href="../Carrito/carrito.html"] img');
    if (contadorCarrito) {
        const totalItems = carrito.reduce((sum, item) => sum + item.quantity, 0);
        contadorCarrito.textContent = `(${totalItems})`;
        imagenCarrito.src = totalItems === 0 ? "../Carrito/Imagenes/Carritovacio.png" : "../Carrito/Imagenes/Carritolleno.png";
    } else {
        console.error("El elemento 'contador-carrito' no existe");
    }
}

// Función para mostrar notificaciones
export function mostrarNotificacion(mensaje) {
    const notificacion = document.getElementById('notification');
    if (!notificacion) {
        console.error("El elemento 'notification' no existe");
        return;
    }
    notificacion.textContent = mensaje;
    notificacion.classList.remove('hidden');
    notificacion.style.display = 'block';
    setTimeout(() => {
        notificacion.classList.add('hidden');
        notificacion.style.display = 'none';
    }, 3000); // Oculta la notificación después de 3 segundos
}

// Función para mostrar productos recomendados
function mostrarProductosRecomendados() {
    console.log('Función mostrarProductosRecomendados llamada');
    const productosRecomendadosContainer = document.getElementById('productos-recomendados');
    if (!productosRecomendadosContainer) {
        console.error("El contenedor 'productos-recomendados' no existe");
        return;
    }

    const categoriasEnCarrito = [...new Set(carrito.map(item => item.category))];
    console.log('Categorías en carrito:', categoriasEnCarrito);

    let productosFiltrados;
    if (categoriasEnCarrito.length === 0) {
        productosFiltrados = productos.slice(0, 4); // Limita a 4 productos recomendados
    } else {
        productosFiltrados = productos
            .filter(producto => 
                categoriasEnCarrito.includes(producto.category) && 
                !carrito.some(item => item.name === producto.name)
            )
            .slice(0, 4); // Limita a 4 productos recomendados
    }

    console.log('Productos recomendados:', productosFiltrados);
    productosRecomendadosContainer.innerHTML = productosFiltrados.length > 0
        ? productosFiltrados.map(producto => `
            <div class="producto-recomendado">
                <img src="${ajustarRutaImagen(producto.img, 'PaginaInicio/imagenes')}" alt="${producto.name}">
                <p>${producto.name}</p>
                <p>Precio: $${producto.price.toFixed(2)}</p>
                <button class="btn btn-secondary add-to-cart" data-name="${producto.name}" data-price="${producto.price}" data-img="${producto.img}" data-category="${producto.category}">Agregar al Carrito</button>
            </div>
        `).join('')
        : '<p>No hay productos recomendados para estas categorías.</p>';
}

// Función para renderizar los productos
function renderizarProductos() {
    const listProductsContainer = document.getElementById('listProducts');
    if (!listProductsContainer) {
        console.error("El contenedor 'listProducts' no existe");
        return;
    }

    const productosHTML = productos.map(producto => `
        <div class="col-md-3 mb-3">
            <div class="card">
                <img src="${ajustarRutaImagen(producto.img, 'PaginaInicio/imagenes')}" class="card-img-top" alt="${producto.name}">
                <div class="card-body">
                    <h5 class="card-title">${producto.name}</h5>
                    <p class="card-text">Precio: $${producto.price.toFixed(2)}</p>
                    <button class="btn btn-primary add-to-cart" data-name="${producto.name}" data-price="${producto.price}" data-img="${producto.img}" data-category="${producto.category}">Agregar al Carrito</button>
                </div>
            </div>
        </div>
    `).join('');

    listProductsContainer.innerHTML = productosHTML;
}

// Escuchar eventos al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    console.log('DOM cargado');
    renderizarProductos(); // Llamar a la función para renderizar los productos
    actualizarContador();
    actualizarCarrito(); // Carga los productos en el carrito al iniciar la página

    // Delegación de eventos para botones
    document.body.addEventListener('click', event => {
        if (event.target.classList.contains('add-to-cart')) {
            event.preventDefault();
            const name = event.target.dataset.name;
            const price = parseFloat(event.target.dataset.price);
            const img = event.target.dataset.img;
            const category = event.target.dataset.category;
            añadirAlCarrito(name, price, img, category);
            mostrarNotificacion(`"${name}" agregado al carrito`);
        } else if (event.target.classList.contains('btn-quitar')) {
            const index = parseInt(event.target.dataset.index);
            eliminarItem(index);
        } else if (event.target.id === 'seguir-comprando') {
            window.location.href = '../Categorias/categorias.html';
        } else if (event.target.id === 'Ir-a-ver-el-Catálogo') {
            window.location.href = '../Categorias/categorias.html';
        } else if (event.target.id === 'finalizar-compra') {
            finalizarCompra();
        }
    });
});

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    const carritoVacio = document.getElementById('carrito-vacio');
    const totalCarrito = document.getElementById('total-carrito');
    const seguirComprando = document.getElementById('seguir-comprando');

    if (carritoItems) {
        carritoItems.innerHTML = '';
        carrito.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('card', 'mb-3');
            itemDiv.innerHTML = `
                <div class="row g-0">
                    <div class="col-md-4 d-flex align-items-center">
                        <img src="${ajustarRutaImagen(item.img, 'Categorias/ImagenesCategorias')}" class="img-fluid rounded-start" alt="${item.name}" style="width: 100%; object-fit: cover; border: 1px solid #ddd;">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text"><strong>Precio:</strong> $${item.price.toFixed(2)}</p>
                            <p class="card-text"><strong>Cantidad:</strong> ${item.quantity}</p>
                            <button class="btn btn-danger btn-quitar" data-index="${index}">Quitar del Carrito</button>
                        </div>
                    </div>
                </div>
            `;
            carritoItems.appendChild(itemDiv);
        });

        const total = carrito.reduce((acc, item) => acc + item.price * item.quantity, 0);
        document.getElementById('precio-total-valor').textContent = `Total: $${total.toFixed(2)}`;

        // Mostrar u ocultar el contenido según el estado del carrito
        if (carrito.length === 0) {
            carritoVacio.style.display = 'block';
            totalCarrito.style.display = 'none';
            carritoItems.style.display = 'none';
            seguirComprando.style.display = 'none';
        } else {
            carritoVacio.style.display = 'none';
            totalCarrito.style.display = 'block';
            carritoItems.style.display = 'block';
            seguirComprando.style.display = 'block';
        }

        mostrarProductosRecomendados(); // Muestra los productos recomendados
    }
}

// Función para eliminar un producto del carrito
function eliminarItem(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
    actualizarCarrito(); // Actualiza el carrito y muestra recomendaciones
}

// Función para finalizar la compra
function finalizarCompra() {
    const notificacionCompra = document.getElementById('notificacionCompra');
    if (!notificacionCompra) {
        console.error("El elemento 'notificacionCompra' no existe");
        return;
    }
    notificacionCompra.classList.remove('oculto');

    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
    actualizarCarrito(); // Actualiza el carrito y muestra recomendaciones
}

// Cerrar la notificación personalizada
const cerrarNotificacion = document.getElementById('cerrarNotificacion');
if (cerrarNotificacion) {
    cerrarNotificacion.addEventListener('click', () => {
        const notificacionCompra = document.getElementById('notificacionCompra');
        if (notificacionCompra) {
            notificacionCompra.classList.add('oculto');
        }
    });
}
//Alerta de mantenimeinto 
window.onload = function() {
    document.getElementById("maintenanceAlert").style.display = "flex";
};