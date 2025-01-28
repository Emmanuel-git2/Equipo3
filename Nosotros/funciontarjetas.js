function crearCard(nombre, src, descripcion) {
    return `
        <div class="col-12 col-sm-6 col-md-4 mb-4">
            <div class="card">
                <img src="${src}" class="card-img-top" alt="${nombre}">
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="card-text">${descripcion}</p>
                </div>
            </div>
        </div>
    `;
}

const equipo = [
    ['Elsy Rosario Morales Altamirano', './imagenes/elsy.jpeg', 'Soy Desarrolladora Full Stack...'],
    ['Aneth Kemble Monroy Tobias', './imagenes/Kemble.png', 'Desarrolladora fullstack con formación en Ingeniería Mecatrónica...'],
    ['Emmanuel Luna Mota', './imagenes/Emmanuel.jpeg', 'Soy un desarrollador Full Stack...'],
    ['Eric Martinez Lopez', './imagenes/Eric.jpg', 'Soy Desarrollador Java Full Stack...'],
    ['Candy Melissa Garcia Ayala', './imagenes/imagencandy.jpg', 'Full Stack Developer Jr...']
];

document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.querySelector('.row.justify-content-center');
    equipo.forEach(([nombre, src, descripcion]) => {
        contenedor.insertAdjacentHTML('beforeend', crearCard(nombre, src, descripcion));
    });
});
