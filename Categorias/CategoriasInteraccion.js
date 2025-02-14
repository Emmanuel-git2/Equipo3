// Función para agregar un producto con carrusel a cada categoría
function agregarProducto(item, containerId) {
    // Validar que el producto tiene los datos necesarios
    if (!item.name || !item.img || !item.description || typeof item.price !== "number") {
        console.error('Producto inválido:', item);
        return;
    }

    // Carrusel con múltiples imágenes (si solo hay una imagen, repite la misma)
    const carruselId = `carousel-${containerId}-${item.name.replace(/\s+/g, '')}`;
    
    const itemHTML = `
        <div class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4 d-flex justify-content-center">
            <div class="card" style="width: 22rem;">
                <div id="${carruselId}" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="${item.img}" class="d-block w-100" alt="${item.name}" style="height: 250px; object-fit: cover;">
                        </div>
                        <div class="carousel-item">
                            <img src="${item.img}" class="d-block w-100" alt="${item.name}" style="height: 250px; object-fit: cover;">
                        </div>
                        <div class="carousel-item">
                            <img src="${item.img}" class="d-block w-100" alt="${item.name}" style="height: 250px; object-fit: cover;">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#${carruselId}" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#${carruselId}" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    </button>
                </div>
                <div class="card-body text-center">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.description}</p>
                    <p class="card-text"><strong id="title-text">Precio:</strong> $${item.price.toFixed(2)}</p>
                    <a href="../Carrito/carrito.html" class="btncards">Agregar</a>
                </div>
            </div>
        </div>`;

        document.addEventListener("DOMContentLoaded", () => {
            document.querySelectorAll(".card").forEach(card => {
                card.addEventListener("mouseenter", () => {
                    card.classList.add("expanded");
                });
        
                card.addEventListener("mouseleave", () => {
                    card.classList.remove("expanded");
                });
            });
        });
        

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
    {name:'Alimentos', img:['ImagenesCategorias/FreeBuild0.jpg'] , description:'Bloques de construcción de libre construcción de alimentos', price: 1000},
    {name:'Hulk y Spiderman', img:'ImagenesCategorias/HulkSpiderman.jpg', description:'Set de personajes Hulk y Spiderman que incluyen vehículos', price:2599},
    {name:'Blanca Nieves', img:'ImagenesCategorias/BlancaNieves0.jpg', description:'Personajes de Blanca Nieves y su casa', price: 3000},
    {name:'Peppa Pig', img:'ImagenesCategorias/PepaPig0.jpg', description:'Personajes de Peppa Pig y su barco', price:1250},
    {name:'Rey León Simba', img:'ImagenesCategorias/ReyLeon0.jpg', description:'Personaje Simba de la película El Rey León', price:1680}
];

// Lista de productos para adolescentes
const productosTeens = [
    {name: 'Harry Potter', img: 'ImagenesCategorias/HarryPotter0.jpg', description: 'Banco mágico Gringotts', price: 7000 },
    {name: 'Personaje Fortnite', img:'ImagenesCategorias/LlamaFornite0.jpg', description:'Construye la famosa llama del videojuego Fortnite', price:1900},
    {name:'Santuario Doctor Strange', img:'ImagenesCategorias/MarvelDocStrange0.jpg', description:'Santuario Doctor Strange de películas Marvel', price:8599},
    {name:'Samurái', img:'ImagenesCategorias/Samurai0.jpg', description:'Robot samurái a escala con espada integrada', price:2999},
    {name:'Batman', img:'ImagenesCategorias/Batman0.jpg', description:'Personaje Batman con motocicleta', price:2899}
];

// Lista de productos para adultos
const productosAdults = [
    {name: 'Torre París', img:'ImagenesCategorias/TorreEiffel0.jpg', description: 'Torre de París para construir', price: 2200 },
    {name: 'Titanic', img:'ImagenesCategorias/Titanic0.jpg', description:'Famoso barco Titanic para construir', price:4000},
    {name:'Noche estrellada', img:'ImagenesCategorias/NocheEstrellada0.jpg', description:'Construye la gran pintura La noche estrellada de Vincent van Gogh', price:2500},
    {name:'Avión Concorde', img:'ImagenesCategorias/Concorde0.jpg', description:'Avión supersónico Concorde', price:4900},
    {name:'Automóvil GT', img:'ImagenesCategorias/CarroAzul0.jpg', description:'Hermoso automóvil a escala GT color azul', price:3800}
];

// Lista de productos para Categoría > Nivel > Principiante
const productosNivelJr = [
    { name: 'Bambú', img: '../PaginaInicio/imagenes/Bambu.webp', description: 'Bambú de la suerte', price: 200.00 },
    { name: 'Dumbo', img: '../PaginaInicio/imagenes/dumbo.webp', description: 'Dumbo de Disney', price: 280.00 },
    { name: 'Ígor', img: '../PaginaInicio/imagenes/igor.webp', description: 'Ígor de Disney', price: 249.00 },
    { name: 'Mei Panda Rojo', img: '../PaginaInicio/imagenes/panda.webp', description: 'Mei Panda Rojo de Disney', price: 367.00 },
    { name: 'Gato', img: '../PaginaInicio/imagenes/gato.webp', description: 'Gato juguetón', price: 299.00 },
    { name: 'Moto Yoshi', img: '../PaginaInicio/imagenes/motoYoshi.webp', description: 'Mario Kart: Moto Yoshi', price: 360.00 },
    { name: 'Miniorquídea', img: '../PaginaInicio/imagenes/orquidea.webp', description: 'Miniorquídea color melón', price: 260.00 },
    { name: 'Rosas', img: '../PaginaInicio/imagenes/rosas.webp', description: 'Rosas', price: 200.00 },
    { name: 'Arreglo Floral', img: '../PaginaInicio/imagenes/arreglo.webp', description: 'Arreglo floral de varios colores', price: 450.00 },
    { name: 'Ciruelo', img: '../PaginaInicio/imagenes/ciruelo.webp', description: 'Flor de ciruelo', price: 199.00 },
];

// Lista de productos para Categoría > Nivel > Intermedio
const productosNivelMid = [
    {name: 'Automóvil', img: 'ImagenesCategorias/CarroVerdeOlivo0.jpg', description: 'Automóvil color verde olivo a escala para construir, incluye conductor.', price: 300 },
    {name: 'Bowser Mario Bros', img:'ImagenesCategorias/Browser0.jpg', description:'Personaje Bowser de Mario Bros', price:2589},
    {name:'Casco Piloto Star Wars', img:'ImagenesCategorias/CascoStarW0.jpg', description:'Casco de piloto de Star Wars', price: 4680},
];

// Lista de productos para Categoría > Nivel > Avanzado
const productosNivelSenior = [
    {name: 'Galaxia', img: 'ImagenesCategorias/Galaxia0.jpg', description: 'Galaxia Vía Láctea', price: 3200 },
    {name: 'Castillo Harry Potter', img:'ImagenesCategorias/CastilloHarryPotter0.jpg', description:'Castillo de Harry Potter', price:5000},
    {name:'Notre Dame', img:'ImagenesCategorias/NotreDame0.jpg', description:'Edificio Notre Dame de París', price:4669},
    {name:'Star Wars Barcaza', img:'ImagenesCategorias/BarcazaStarWars0.jpg', description:'Barcaza velera de Jabba, Star Wars', price:5500},
    {name:'Cohete NASA', img:'ImagenesCategorias/CoheteNASA0.jpg', description:'Sistema de lanzamiento espacial Artemis de la NASA', price:3670}
];

// Lista de productos para Temáticas > Navidad
const productosNavidad = [
    {name: 'Pueblo Navideño', img: 'ImagenesCategorias/TownNavidad0.jpg', description: 'Set de pueblo navideño', price: 3600 },
    {name: 'Esfera Santa', img:'ImagenesCategorias/EsferaSanta0.jpg', description:'Esfera de Santa Claus', price:500},
    {name:'Trineo', img:'ImagenesCategorias/TrineoSanta0.jpg', description:'Trineo de Santa Claus', price:1680},
    {name:'Esfera Reno', img:'ImagenesCategorias/EsferaReno0.jpg', description:'Esfera de reno de Navidad', price:1000},
    {name:'Árbol', img:'ImagenesCategorias/ArbolNavidad0.jpg', description:'Árbol navideño', price:1300}
];

// Lista de productos para Temáticas > Amor y Amistad
const productosAmorAmistad = [
    { name: 'Rosas', img: 'ImagenesCategorias/Rosas0.jpg', description: 'Rosas para regalar y decorar', price: 3300 },
    {name: 'Arreglo floral', img:'ImagenesCategorias/FloresAmor0.jpg', description:'Construye un hermoso arreglo floral', price:2700},
    {name:'Love', img:'ImagenesCategorias/LOVE0.jpg', description:'Letras L O V E para construir y decorar', price:1090},
    {name:'Amor de Oso', img:'ImagenesCategorias/OsosAmor0.jpg', description:'Osos con corazón', price:1400},
    {name:'Piolín Cupido', img:'ImagenesCategorias/Piolin0.jpg', description:'Personaje Piolín en versión cupido', price:3450}
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
