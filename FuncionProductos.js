
function agregarProducto (item){
    const itemHTML ='<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">'+ '<div class="card" style="width: 18rem;">\n' +
        '    <img src="'+item.img +'" class="card-img-top" alt="image">\n' +
        '    <div class="card-body">\n' +
        '        <h5 class="card-title">'+item.name+'</h5>\n' +
        '        <p class="card-text">'+item.description+'</p>\n' +
        '        <a href="file:///C:/Users/chelc/AppData/Local/Microsoft/Windows/INetCache/IE/IQ5HKD7H/carrito[1].html" class="btn btn-primary">Agregar</a>\n' +
        '    </div>\n' +
        '</div>\n' +
        '</div>' +
        '<br/>';
    const itemsContainer = document.getElementById("list-items");
    if (itemsContainer) {
        itemsContainer.insertAdjacentHTML('beforeend',itemHTML);
    } else {
        console.error("El contenedor con id 'list-items' no existe");
    }
}

agregarProducto({'name':'Husky',
    'img':'Husky.jpg',
    'description':'Bloques de construcción perro Husky'});

agregarProducto({'name':'Uvas',
    'img':'Uvas.jpg',
    'description':'Bloques de construcción uvas'});

agregarProducto({'name':'Frutas',
    'img':'Frutas.jpg',
    'description':'Bloques de construcción frutas'});

agregarProducto({'name':'Kiwi',
    'img':'Kiwi.jpg',
    'description':'Bloques de construcción de kiwi'});

agregarProducto({'name':'Aguacate',
    'img':'Aguacate.jpg',
    'description':'Bloques de construcción de Aguacate'});

agregarProducto({'name':'Pajarito Rojo',
    'img':'PajaroRojo.jpg',
    'description':'Bloques de construcción de pajarito'});
                
agregarProducto({'name':'Pajarito Azul y Blanco',
    'img':'PajaroAzulConBlanco.jpg',
    'description':'Bloques de construcción de Pajarito blanco con Azul'});
                
agregarProducto({'name':'Ballena',
    'img':'BallenaNegra.jpg',
    'description':'Bloques de construcción de ballena'});

agregarProducto({'name':'Pingüino',
    'img':'Pinguino.jpg',
    'description':'Bloques de construcción de pingüino'});
                                
agregarProducto({'name':'Cactus',
    'img':'Cactus.jpg',
    'description':'Bloques de construcción de cactus'});
                                