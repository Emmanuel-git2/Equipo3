// Función para agregar un productos a cada categoria.
function agregarProducto(item, containerId) {
    // Validar que el producto tiene los datos necesarios
    if (!item.name || !item.img || !item.description || typeof item.price !== "number") {
        console.error('Producto inválido:', item);
        return;
    }

    // Crear el HTML para el producto
    const itemHTML = `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div class="card" style="width: 20rem;">
                <img src="${item.img}" class="card-img-top" alt="${item.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.description}</p>
                    <p class="card-text"><strong>Precio:</strong> $${item.price.toFixed(2)}</p>
                    <a href="carrito.html" class="btn btn-primary">Agregar</a>
                </div>
            </div>
        </div>`;
    
    // Obtener el contenedor y agregar el producto
    const itemsContainer = document.getElementById(containerId);
    if (itemsContainer) {
        itemsContainer.insertAdjacentHTML('beforeend', itemHTML);
    } else {
        console.error(`El contenedor con id '${containerId}' no existe`);
    }
}

// Lista de productos para kids
const productosKids = [
    { name: 'Husky', img: 'imagenes/Husky.jpg', description: 'Bloques de construcción perro Husky', price: 200 },
    { name: 'Uvas', img: 'imagenes/Uvas.jpg', description: 'Bloques de construcción uvas', price: 200 },
    { name: 'Frutas', img: 'imagenes/Frutas.jpg', description: 'Bloques de construcción frutas', price: 168.99 },
    { name: 'Kiwi', img: 'imagenes/Kiwi.jpg', description: 'Bloques de construcción de kiwi', price: 200 },
    { name: 'Aguacate', img: 'imagenes/Aguacate.jpg', description: 'Bloques de construcción de aguacate', price: 200 },
    { name: 'Pajarito Rojo', img: 'imagenes/PajaroRojo.jpg', description: 'Bloques de construcción de pajarito', price: 150 },
    { name: 'Pajarito Azul y Blanco', img: 'imagenes/PajaroAzulConBlanco.jpg', description: 'Bloques de construcción de pajarito blanco con azul', price: 150 },
    { name: 'Ballena', img: 'imagenes/BallenaNegra.jpg', description: 'Bloques de construcción de ballena', price: 180 },
    { name: 'Pingüino', img: 'imagenes/Pinguino.jpg', description: 'Bloques de construcción de pingüino', price: 200 },
    { name: 'Cactus', img: 'imagenes/Cactus.jpg', description: 'Bloques de construcción de cactus', price: 150 }
];

// Lista de productos para adolescentes
const productosTeens = [
    { name: 'Robot', img: 'imagenes/Robot.jpg', description: 'Bloques de construcción de robot', price: 300 },
    {},
    {},
    {}
];

// Lista de productos para adultos
const productosAdults = [
    { name: 'Robot', img: 'imagenes/Robot.jpg', description: 'Bloques de construcción de robot', price: 300 },
    {},
    {},
    {},
    {}
];

// Lista de productos para Categoria > Nivel > Principiante
const productosNivelJr = [
    { name: 'Robot', img: 'imagenes/Robot.jpg', description: 'Bloques de construcción de robot', price: 300 },
    {},
    {},
    {}
];
// Lista de productos para Categoria > Nivel > Intermedio
const productosNivelMid = [
    { name: 'Robot', img: 'imagenes/Robot.jpg', description: 'Bloques de construcción de robot', price: 300 },
    {},
    {},
    {}
];

// Lista de productos para Categoria > Nivel > Avanzado
const productosNivelSenior = [
    { name: 'Robot', img: 'imagenes/Robot.jpg', description: 'Bloques de construcción de robot', price: 300 },
    {},
    {},
    {}
];
// Lista de productos para Tematicas > Navidad
const productosNavidad = [
    { name: 'Robot', img: 'imagenes/Robot.jpg', description: 'Bloques de construcción de robot', price: 300 },
    {},
    {},
    {}
];
// Lista de productos para Tematicas > Amor y Amistad
const productosAmorAmistad = [
    { name: 'Robot', img: 'imagenes/Robot.jpg', description: 'Bloques de construcción de robot', price: 300 },
    {},
    {},
    {}
];



// Agregar productos a las categorías correspondientes
productosKids.forEach(product => agregarProducto(product, 'productos_niños'));
productosTeens.forEach(product => agregarProducto(product, 'productos_Adolescentes'));
productosAdults.forEach(product => agregarProducto(product, 'productos_Adultos'));
productosNivelJr.forEach(product => agregarProducto(product, 'productos_Principiante'));
productosNivelMid.forEach(product => agregarProducto(product, 'productos_Intermedio'));
productosNivelSenior.forEach(product => agregarProducto(product, 'productos_Avanzado'));
productosNavidad.forEach(product => agregarProducto(product, 'productos_Navidad'));
productosAmorAmistad.forEach(product => agregarProducto(product, 'productos_AmorAmistad'));
