document.addEventListener("DOMContentLoaded", function() {
    actualizarContador();
    actualizarCarrito();
    mostrarProductosRecomendados();
});

// Array para almacenar los artículos del carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para actualizar el contador de artículos y la imagen del carrito
function actualizarContador() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contadorCarrito = document.getElementById('contador-carrito');
    const imagenCarrito = document.querySelector('a[href="../Carrito/carrito.html"] img');
    if (contadorCarrito) {
        const totalItems = carrito.reduce((sum, item) => sum + item.quantity, 0);
        contadorCarrito.textContent = `(${totalItems})`;
        if (totalItems === 0) {
            imagenCarrito.src = "../Carrito/Imagenes/Carritovacio.png";
        } else {
            imagenCarrito.src = "../Carrito/Imagenes/Carritolleno.png";
        }
    }
}

// Función para mostrar la notificación
function mostrarNotificacion(mensaje) {
    const notificacion = document.getElementById('notification');
    notificacion.textContent = mensaje;
    notificacion.classList.remove('hidden');
    notificacion.style.display = 'block';
    setTimeout(() => {
        notificacion.classList.add('hidden');
        notificacion.style.display = 'none';
    }, 3000); // Oculta la notificación después de 3 segundos
}

// Función para añadir un artículo al carrito
function añadirAlCarrito(nombre, precio, img) {
    const index = carrito.findIndex(item => item.nombre === nombre);

    if (index !== -1) {
        carrito[index].quantity++;
    } else {
        carrito.push({ nombre, precio, img, quantity: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
    actualizarContador();
    mostrarNotificacion(`"${nombre}" agregado al carrito`);
}

// Función para eliminar un artículo del carrito
function eliminarItem(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
    actualizarContador();
}

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
                    <div class="col-md-4">
                        <img src="${item.img}" class="img-fluid rounded-start" alt="${item.nombre}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${item.nombre}</h5>
                            <p class="card-text">Precio: $${item.precio}</p>
                            <p class="card-text">Cantidad: ${item.quantity}</p>
                            <button class="btn btn-danger" onclick="eliminarItem(${index})">Quitar del Carrito</button>
                        </div>
                    </div>
                </div>
            `;
            carritoItems.appendChild(itemDiv);
        });
        
        const total = carrito.reduce((acc, item) => acc + item.precio * item.quantity, 0);
        document.getElementById('precio-total-valor').textContent = `Total: $${total.toFixed(2)}`;
    }
    
    // Mostrar u ocultar el contenido según el estado del carrito
    if (carrito.length === 0) {
        carritoVacio.style.display = 'block';
        totalCarrito.style.display = 'none';
        carritoItems.style.display = 'none';
        seguirComprando.style.display = 'none'; // Ocultar el botón "Seguir Comprando"
    } else {
        carritoVacio.style.display = 'none';
        totalCarrito.style.display = 'block';
        carritoItems.style.display = 'block';
        seguirComprando.style.display = 'block'; // Mostrar el botón "Seguir Comprando"
    }
}

// Función para finalizar la compra
document.getElementById('finalizar-compra').addEventListener('click', () => {
    document.getElementById('sonidoPago').play();
    alert('Compra finalizada');
    carrito = [];
    localStorage.removeItem('carrito');
    actualizarCarrito();
    actualizarContador();
});

// Función para seguir comprando (redirigir a la página de catalogo)
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('Ir-a-ver-el-Catálogo').addEventListener('click', () => {
        window.location.href = '../Categorias/categorias.html';
    });
});

// Función para ir a ver el Catalogo (redirigir a la página de catalogo)
document.getElementById('seguir-comprando').addEventListener('click', () => {
    window.location.href = '../Categorias/categorias.html';
});

// Elemento para notificaciones (añádelo en tu HTML si no lo tienes)
document.body.insertAdjacentHTML('beforeend', '<div id="notification" class="notification hidden"></div>');

// Función para mostrar productos recomendados
function mostrarProductosRecomendados() {
    const productos = [
        { name: 'Husky', img: '../imagenes/Husky.jpg', description: 'Bloques de construcción perro Husky', price: 20, category: 'Animales' },
        { name: 'Uvas', img: '../imagenes/Uvas.jpg', description: 'Bloques de construcción uvas', price: 15, category: 'Frutas' },
        { name: 'Frutas', img: '../imagenes/Frutas.jpg', description: 'Bloques de construcción frutas', price: 10, category: 'Frutas' },
        { name: 'Kiwi', img: '../imagenes/Kiwi.jpg', description: 'Bloques de construcción de kiwi', price: 10, category: 'Frutas' },
        { name: 'Aguacate', img: '../imagenes/Aguacate.jpg', description: 'Bloques de construcción de Aguacate', price: 12, category: 'Frutas' },
        { name: 'Pajarito Rojo', img: '../imagenes/PajaroRojo.jpg', description: 'Bloques de construcción de pajarito', price: 8, category: 'Animales' },
        { name: 'Pajarito Azul y Blanco', img: '../imagenes/PajaroAzulConBlanco.jpg', description: 'Bloques de construcción de Pajarito blanco con Azul', price: 9, category: 'Animales' },
        { name: 'Ballena', img: '../imagenes/BallenaNegra.jpg', description: 'Bloques de construcción de ballena', price: 22, category: 'Animales' },
        { name: 'Pingüino', img: '../imagenes/Pinguino.jpg', description: 'Bloques de construcción de pingüino', price: 18, category: 'Animales' },
        { name: 'Cactus', img: '../imagenes/Cactus.jpg', description: 'Bloques de construcción de cactus', price: 14, category: 'Plantas' }
    ];

    const categoriasEnCarrito = [...new Set(carrito.map(item => item.category))]; // Obtener categorías únicas de los productos en el carrito
    let productosFiltrados = productos.filter(producto => categoriasEnCarrito.includes(producto.category)); // Filtrar productos por categoría
    productosFiltrados = productosFiltrados.slice(0, 4); // Limitar a 4 productos

    const productosRecomendadosContainer = document.getElementById('productos-recomendados');
    productosRecomendadosContainer.innerHTML = ''; // Limpiar contenedor de productos recomendados

    productosFiltrados.forEach((producto) => {
        const itemHTML = `
            <div class="producto">
                <img src="${producto.img}" alt="${producto.name}">
                <p>${producto.name}</p>
                <p>Precio: $${producto.price}</p>
                <button class="btn btn-secondary" onclick="añadirAlCarrito('${producto.name}', ${producto.price})">Agregar al Carrito</button>
            </div>
        `;
        productosRecomendadosContainer.insertAdjacentHTML('beforeend', itemHTML);
    });
}
