// funcionCarrito.js

// Importa 'productos' si está en otro archivo
import { productos } from '../PaginaInicio/FuncionProductos.js';

// Array para almacenar los artículos del carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

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

// Función para actualizar el contador del carrito
export function actualizarContador() {
    const contadorCarrito = document.getElementById('contador-carrito');
    if (contadorCarrito) {
        const totalItems = carrito.reduce((sum, item) => sum + item.quantity, 0);
        contadorCarrito.textContent = `(${totalItems})`;
    }
}

// Función para mostrar notificaciones
export function mostrarNotificacion(mensaje) {
    const notificacion = document.getElementById('notification');
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
    const productosRecomendadosContainer = document.getElementById('productos-recomendados');
    if (!productosRecomendadosContainer) {
        console.error("El contenedor 'productos-recomendados' no existe");
        return;
    }

    // Obtener las categorías de los productos en el carrito
    const categoriasEnCarrito = [...new Set(carrito.map(item => item.category))];

    // Filtrar productos que NO están en el carrito y pertenecen a las mismas categorías
    const productosFiltrados = productos
        .filter(producto => 
            categoriasEnCarrito.includes(producto.category) && 
            !carrito.some(item => item.name === producto.name)
        )
        .slice(0, 4); // Limita a 4 productos recomendados

    // Generar el HTML para los productos recomendados
    productosRecomendadosContainer.innerHTML = productosFiltrados.length > 0
        ? productosFiltrados.map(producto => `
            <div class="producto-recomendado">
                <img src="${ajustarRutaImagen(producto.img)}" alt="${producto.name}">
                <p>${producto.name}</p>
                <p>Precio: $${producto.price.toFixed(2)}</p>
                <button class="btn btn-secondary add-to-cart" data-name="${producto.name}" data-price="${producto.price}" data-img="${producto.img}" data-category="${producto.category}">Agregar al Carrito</button>
            </div>
        `).join('')
        : '<p>No hay productos recomendados para estas categorías.</p>';
}

// Función para ajustar la ruta de la imagen
function ajustarRutaImagen(rutaImagen) {
    // Si la ruta ya es absoluta, regresarla tal cual
    if (rutaImagen.startsWith('http') || rutaImagen.startsWith('/')) {
        return rutaImagen;
    }
    // Ajustamos la ruta de imagen relativa
    return '../' + rutaImagen; // Desde carrito.html, subimos un nivel para acceder a las imágenes
}

// Escuchar eventos al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
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
                        <img src="${ajustarRutaImagen(item.img)}" class="img-fluid rounded-start" alt="${item.name}" style="width: 100%; object-fit: cover; border: 1px solid #ddd;">
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
    alert('¡Gracias por tu compra! Tu pedido ha sido procesado.');
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
    actualizarCarrito(); // Actualiza el carrito y muestra recomendaciones
}
