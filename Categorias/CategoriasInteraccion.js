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
                    <p class="card-text"><strong>Precio:</strong> $${item.price.toFixed(2)}</p>
                    <a href="carrito.html" class="btn btn-primary">Agregar</a>
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
    {name:'Alimentos', img:['ImagenesCategorias/FreeBuild0.jpg'] , description:'Bloque de construccion de libre constrccion de alimentos', price: 1000},
    {name:'Hulk y Spiderman', img:'ImagenesCategorias/HulkSpiderman.jpg', description:'Set de personajes Hulk y Spiderman que incluyen vehiculos', price:2599},
    {name:'Blanca Nieves', img:'ImagenesCategorias/BlancaNieves0.jpg', description:'Personajes de Blanca nieves y su casa', price: 3000},
    {name:'Pepa Pig', img:'ImagenesCategorias/PepaPig0.jpg', description:'Personajes de pepa pig y su barco', price:1250},
    {name:'Rey Leon Simba', img:'ImagenesCategorias/ReyLeon0.jpg', description:'Personaje Simba de la pelicula El Rey Leon', price:1680}
];

// Lista de productos para adolescentes
const productosTeens = [
    {name: 'Harry Potter', img: 'ImagenesCategorias/HarryPotter0.jpg', description: 'Banco Magico Gringotts', price: 7000 },
    {name: 'Personaje Fornite',img:'ImagenesCategorias/LlamaFornite0.jpg', description:'Construye la famosa llama del video juego Fornite', price:1900},
    {name:'Santuario Doctor Strange',img:'ImagenesCategorias/MarvelDocStrange0.jpg', description:'Santuario Doctor Strange de peliculas Marvel', price:8599},
    {name:'Samurai',img:'ImagenesCategorias/Samurai0.jpg', description:'Robot Samurai a escala con espada integrada', price:2999},
    {name:'Batman', img:'ImagenesCategorias/Batman0.jpg', description:'Personaje Batman con motocicleta', price:2899}
];

// Lista de productos para adultos
const productosAdults = [
    {name: 'Torre Paris', img:'ImagenesCategorias/TorreEiffel0.jpg', description: 'Torre de Paris para construir', price: 2200 },
    {name: 'Titanic', img:'ImagenesCategorias/Titanic0.jpg', description:'Famoso barco Titatic para construir', price:4000},
    {name:'Noche estrellada', img:'ImagenesCategorias/NocheEstrellada0.jpg', description:'Construye la gran pintura La noche estrellada de Vincent Van Gogh', price:2500},
    {name:'Avion Concorde', img:'ImagenesCategorias/Concorde0.jpg', description:'Avion Supersonico Concorde', price:4900},
    {name:'Automovil GT', img:'ImagenesCategorias/CarroAzul0.jpg', description:'Hermoso automovil a escala GT color azul', price:3800}
];

// Lista de productos para Categoria > Nivel > Principiante
const productosNivelJr = [
    { name: 'Husky', img: 'PaginaInicio/imagenes/Husky.jpg', description: 'Bloques de construcción perro Husky', price: 200 },
    { name: 'Uvas', img: 'PaginaInicio/imagenes/Uvas.jpg', description: 'Bloques de construcción uvas', price: 200 },
    { name: 'Frutas', img: 'PaginaInicio/imagenes/KitFrutas.jpg', description: 'Bloques de construcción frutas', price: 168.99 },
    { name: 'Kiwi', img: 'PaginaInicio/imagenes/Kiwi.jpg', description: 'Bloques de construcción de kiwi', price: 200 },
    { name: 'Aguacate', img: 'PaginaInicio/imagenes/Aguacate.jpg', description: 'Bloques de construcción de aguacate', price: 200 },
    { name: 'Pajarito Rojo', img: 'PaginaInicio/imagenes/PajaroRojo.jpg', description: 'Bloques de construcción de pajarito', price: 150 },
    { name: 'Pajarito Azul y Blanco', img: 'PaginaInicio/imagenes/PajaroAzulConBlanco.jpg', description: 'Bloques de construcción de pajarito blanco con azul', price: 150 },
    { name: 'Ballena', img: 'PaginaInicio/imagenes/BallenaBlanca.jpg', description: 'Bloques de construcción de ballena', price: 180 },
    { name: 'Pingüino', img: 'PaginaInicio/imagenes/Pinguino.jpg', description: 'Bloques de construcción de pingüino', price: 200 },
    { name: 'Cactus', img: 'PaginaInicio/imagenes/KitCactus.jpg', description: 'Bloques de construcción de cactus', price: 150 }
];
// Lista de productos para Categoria > Nivel > Intermedio
const productosNivelMid = [
    {name: 'Automovil', img: 'ImagenesCategorias/CarroVerdeOlivo0.jpg', description: 'Automovil color verde olivo a escala para construir, incluye conductor.', price: 300 },
    {name: 'Browser Mario Bros', img:'ImagenesCategorias/Browser0.jpg', description:'Personaje Browser de Mario Bros', price:2589},
    {name:'Casco Piloto Star Wars', img:'ImagenesCategorias/CascoStarW0.jpg', description:'Casco de piloto de Star Wars', price: 4680},
];

// Lista de productos para Categoria > Nivel > Avanzado
const productosNivelSenior = [
    {name: 'Galaxia', img: 'ImagenesCategorias/Galaxia0.jpg', description: 'Galaxia VIa Lactea', price: 3200 },
    {name: 'Castillo Harry Potter', img:'ImagenesCategorias/CastilloHarryPotter0.jpg', description:'Castillo de Harry Potter', price:5000},
    {name:'Notre Dame', img:'ImagenesCategorias/NotreDame0.jpg', description:'Edificio Notre Dame de Paris', price:4669},
    {name:'Star Wars Barcaza', img:'ImagenesCategorias/BarcazaStarWars0.jpg', description:'Barcaza de Velera de Jabba, Star WArs', price:5500},
    {name:'Cohete NASA', img:'ImagenesCategorias/CoheteNASA0.jpg', description:'Sistema de lanzamiento espacial Artemis de NASA', price:3670}
];
// Lista de productos para Tematicas > Navidad
const productosNavidad = [
    {name: 'Pueblo Navidadeno', img: 'ImagenesCategorias/TownNavidad0.jpg', description: 'Set de Pueblo navideno', price: 3600 },
    {name: 'Esfera Santa', img:'ImagenesCategorias/EsferaSanta0.jpg', description:'Esfera de Santa Claus', price:500},
    {name:'Trineo', img:'ImagenesCategorias/TrineoSanta0.jpg', description:'Trineo de Santa Claus', price:1680},
    {name:'Esfera Reno', img:'ImagenesCategorias/EsferaReno0.jpg', description:'Esfera de Reno de navidad', price:1000},
    {name:'Arbol', img:'ImagenesCategorias/ArbolNavidad0.jpg', description:'Arbol navideno', price:1300}
];
// Lista de productos para Tematicas > Amor y Amistad
const productosAmorAmistad = [
    { name: 'Rosas', img: 'ImagenesCategorias/Rosas0.jpg', description: 'Rosas para regalar y decorativas', price: 3300 },
    {name: 'Arreglo floral', img:'ImagenesCategorias/FloresAmor0.jpg', description:'Construye un hermoso arreglo floral', price:2700},
    {name:'Love', img:'ImagenesCategorias/LOVE0.jpg', description:'Letras L O V E para construir y decorar', price:1090},
    {name:'Amor de Oso', img:'ImagenesCategorias/OsosAmor0.jpg', description:'Osos con corazon', price:1400},
    {name:'Piolin Cupido', img:'ImagenesCategorias/Piolin0.jpg', description:'Personaje Piolin en version cupido', price:3450}
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

