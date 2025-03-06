// Obtener carrito desde localStorage o inicializar vacío
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
import { productos } from './CategoriasInteraccion.js'; // Ajusta la ruta según corresponda


function añadirAlCarrito(name, price, img, category) {

    const index = carrito.findIndex(item => item.name === name);
    if (index !== -1) {
        carrito[index].quantity++;
    } else {
        carrito.push({ name, price, img, category, quantity: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito(); // Asegurar que se actualiza la vista
}


// Renderizar el carrito en la página
function actualizarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    const carritoVacio = document.getElementById('carrito-vacio');
    const precioTotal = document.getElementById('precio-total');

    if (!carritoItems || !carritoVacio || !precioTotal) {
        console.error("Error: No se encontraron algunos elementos del carrito en el DOM.");
        return;
    }
    
    carritoItems.innerHTML = "";

    if (carrito.length === 0) {
        carritoVacio.style.display = "block";
        precioTotal.textContent = "$0.00";
        return;
    } else {
        carritoVacio.style.display = "none";
    }

    let total = 0;

    carrito.forEach((producto, index) => {
        const item = document.createElement('div');
        item.classList.add('carrito-item');

        item.innerHTML = `
            <img src="${producto.img}" alt="${producto.name}" class="carrito-img">
            <div>
                <h4>${producto.name}</h4>
                <p>Precio: $${producto.price.toFixed(2)}</p>
                <p>Cantidad: 
                    <button onclick="cambiarCantidad(${index}, -1)">-</button> 
                    ${producto.quantity} 
                    <button onclick="cambiarCantidad(${index}, 1)">+</button>
                </p>
                <button onclick="eliminarItem(${index})" class="btn btn-danger">Eliminar</button>
            </div>
        `;

        carritoItems.appendChild(item);
        total += producto.price * producto.quantity;
        
    });

    precioTotal.textContent = `$${total.toFixed(2)}`;
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Modificar cantidad de un producto en el carrito
function cambiarCantidad(index, cambio) {
    if (carrito[index].quantity + cambio > 0) {
        carrito[index].quantity += cambio;
    } else {
        carrito.splice(index, 1);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito))
    actualizarCarrito();
}

// Eliminar un producto del carrito
function eliminarItem(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

// Finalizar compra (vaciar carrito)
const btnFinalizarCompra = document.getElementById('finalizar-compra');
if (btnFinalizarCompra) {
    btnFinalizarCompra.addEventListener('click', () => {
        alert("Compra realizada con éxito");
        carrito = [];
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    });
} else {
    console.error("Error: No se encontró el botón 'finalizar-compra'");
}
// Función para sugerir productos recomendados
function mostrarProductosRecomendados() {
    const recomendacionesContainer = document.getElementById('recomendaciones');
    recomendacionesContainer.innerHTML = "";

    let categoriasEnCarrito = [...new Set(carrito.map(p => p.category))];

    let productosRecomendados = [];

    categoriasEnCarrito.forEach(cat => {
        productosRecomendados = productosRecomendados.concat(productos.filter(p => p.category === cat && !carrito.some(c => c.name === p.name)));
    });

    productosRecomendados.slice(0, 4).forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('producto-recomendado');
        card.innerHTML = `
            <img src="${producto.img}" alt="${producto.name}">
            <h4>${producto.name}</h4>
            <p>$${producto.price.toFixed(2)}</p>
            <button onclick="añadirAlCarrito('${producto.name}', ${producto.price}, '${producto.img}', '${producto.category}')">Agregar</button>
        `;
        recomendacionesContainer.appendChild(card);
    });
}

// Cargar el carrito al iniciar
document.body.addEventListener('click', event => {
    if (event.target.classList.contains('add-to-cart')) {
        console.log("Click detectado en botón Agregar al carrito");

        const name = event.target.dataset.name;
        const price = parseFloat(event.target.dataset.price);
        const img = event.target.dataset.img;
        const category = event.target.dataset.category;

        console.log(`Producto agregado: ${name}, Precio: ${price}, Imagen: ${img}, Categoría: ${category}`);

        if (name && !isNaN(price) && img && category) {
            añadirAlCarrito(name, price, img, category);
        } else {
            console.error("Error: Faltan datos en el botón");
        }
    }
});

//Alerta de mantenimeinto 
// window.onload = function() {
//     document.getElementById("maintenanceAlert").style.display = "flex";
// };