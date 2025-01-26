document.getElementById('uploadBtn').addEventListener('click', function () {
    cloudinary.openUploadWidget(
        {
            cloudName: 'dy6sopjv3',  
            uploadPreset: 'uw_formulario', 
            sources: ['local', 'url', 'camera'],
            multiple: false,
            showAdvancedOptions: false,
            cropping: true,
            maxFileSize: 2000000, // Limitar tamaño de archivo a 2MB
        },
        function (error, result) {
            if (error) {
                console.error('Error al subir la imagen:', error);
                alert('Error al subir la imagen: ' + error.message);
            } else if (result && result.event === "success") {
                const imageUrl = result.info.secure_url;
                const productImageField = document.getElementById("productImage");

                if (productImageField) {
                    productImageField.value = imageUrl; // Asignar URL al campo del formulario
                    console.log("Imagen subida exitosamente:", imageUrl);
                } else {
                    console.error("No se encontró el campo de imagen.");
                }
            }
        }
    );
});


document.getElementById('submitBtn').addEventListener('click', function () {
    const form = document.getElementById('productForm');
    const alertDiv = document.getElementById('alert');
    const alertSuccessDiv = document.getElementById('alertSuccess');
    const categoryField = document.getElementById('category');
    const descriptionField = document.getElementById('productDescription');
    const nameField = document.getElementById('productName');
    const priceField = document.getElementById('productPrice');
    const imageField = document.getElementById('productImage');

    let isValid = true;

    // Validar que se seleccione una categoría válida
    if (!categoryField.value) {
        categoryField.classList.add('is-invalid');
        isValid = false;
    } else {
        categoryField.classList.remove('is-invalid');
        categoryField.classList.add('is-valid');
    }

    // Validar descripción (mínimo 5 palabras, máximo 20 palabras)
    const description = descriptionField.value.trim();
    const wordCount = description.split(/\s+/).length; // Contar palabras separadas por espacios
    if (wordCount < 5 || wordCount > 20) {
        descriptionField.classList.add('is-invalid');
        isValid = false;
    } else {
        descriptionField.classList.remove('is-invalid');
        descriptionField.classList.add('is-valid');
    }

    // Validar nombre del producto
    if (!nameField.value.trim()) {
        nameField.classList.add('is-invalid');
        isValid = false;
    } else {
        nameField.classList.remove('is-invalid');
        nameField.classList.add('is-valid');
    }

    // Validar precio 
    const price = parseFloat(priceField.value.trim());
    if (isNaN(price) || price <= 0) {
        priceField.classList.add('is-invalid');
        isValid = false;
    } else {
        priceField.classList.remove('is-invalid');
        priceField.classList.add('is-valid');
    }

    // Validar que la URL de la imagen no esté vacía
    if (!imageField.value.trim()) {
        imageField.classList.add('is-invalid');
        isValid = false;
    } else {
        imageField.classList.remove('is-invalid');
        imageField.classList.add('is-valid');
    }

    // Mostrar error si alguna validación falla
    if (!isValid) {
        alertDiv.querySelector('#alertText').textContent = "Por favor, corrige los errores en el formulario.";
        alertDiv.classList.remove('d-none');
        return;
    }

    // Si todo es válido, crear objeto JSON con los datos del formulario
    const productData = {
        name: nameField.value.trim(),
        category: categoryField.options[categoryField.selectedIndex].text,
        description: descriptionField.value.trim(),
        price: price,
        image: imageField.value.trim()
    };

    console.log('Producto creado:', productData);

    // Guardar en localStorage
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    productos.push(productData);
    localStorage.setItem("productos", JSON.stringify(productos));

    // Mostrar mensaje de éxito
    alertSuccessDiv.classList.remove('d-none');

    // Limpiar formulario
    form.reset();
    form.classList.remove('was-validated');
    alertDiv.classList.add('d-none'); // Ocultar alerta de error
    
    setTimeout();
    limpiarValidaciones();
    // Actualizar la tabla con los productos guardados
    cargarProductos();

    // Ocultar mensaje de éxito después de unos segundos
    setTimeout(() => {
        alertSuccessDiv.classList.add('d-none');
    }, 3000);
});

function limpiarValidaciones() {
    // Limpiar las clases de validación de todos los campos
    const fields = ['productName', 'category', 'productDescription', 'productPrice', 'productImage'];
    fields.forEach(field => {
        const input = document.getElementById(field);
        input.classList.remove('is-invalid', 'is-valid');
    });
}

// Función para cargar los productos desde localStorage y mostrarlos en la tabla
function cargarProductos() {
    const productos = JSON.parse(localStorage.getItem("productos"));
    const productosTable = document.getElementById('productosTable');
    productosTable.innerHTML = ''; // Limpiar la tabla antes de agregar los nuevos productos

    productos.forEach((producto, index) => {
        const row = document.createElement('tr'); // Crear una nueva fila para el producto

        // Crear la celda para el checkbox de selección
        const selectCell = document.createElement('td');
        const selectCheckbox = document.createElement('input');
        selectCheckbox.type = "checkbox";
        selectCheckbox.classList.add('form-check-input');
        selectCheckbox.setAttribute('data-index', index); // Usar el índice para identificar el producto
        selectCell.appendChild(selectCheckbox);

        // Crear las celdas para cada propiedad del producto
        const nameTh = document.createElement('td');
        nameTh.textContent = producto.name;
        const categoryTh = document.createElement('td');
        categoryTh.textContent = producto.category;
        const descriptionTh = document.createElement('td');
        descriptionTh.textContent = producto.description;
        const priceTh = document.createElement('td');
        priceTh.textContent = `$${producto.price.toFixed(2)}`;
        const imageTh = document.createElement('td');
        const imgElement = document.createElement('img');
        imgElement.src = producto.image;
        imgElement.alt = "Imagen del Producto";
        imgElement.style.width = "50px";
        imageTh.appendChild(imgElement);

        // Añadir las celdas a la fila
        row.appendChild(selectCell);
        row.appendChild(nameTh);
        row.appendChild(categoryTh);
        row.appendChild(descriptionTh);
        row.appendChild(priceTh);
        row.appendChild(imageTh);

        // Añadir la fila a la tabla
        productosTable.appendChild(row);
    });
}


function obtenerProductosSeleccionados() {
    const checkboxes = document.querySelectorAll('.form-check-input:checked');
    const productosSeleccionados = [];
    checkboxes.forEach(checkbox => {
        const index = checkbox.getAttribute('data-index');
        productosSeleccionados.push(index);
    });
    return productosSeleccionados;
}

document.getElementById('btnEliminar').addEventListener('click', () => {
    const productosSeleccionados = obtenerProductosSeleccionados();
    if (productosSeleccionados.length > 0) {
        let productos = JSON.parse(localStorage.getItem("productos"));
        productosSeleccionados.forEach(index => {
            productos.splice(index, 1); // Eliminar el producto seleccionado
        });
        localStorage.setItem("productos", JSON.stringify(productos)); // Guardar nuevamente en localStorage
        cargarProductos(); // Recargar la tabla
    }
});

document.getElementById('btnEditar').addEventListener('click', () => {
    const productosSeleccionados = obtenerProductosSeleccionados();
    if (productosSeleccionados.length === 1) {
        const productos = JSON.parse(localStorage.getItem("productos"));
        const producto = productos[productosSeleccionados[0]];

        // Cargar los datos del producto en el formulario
        document.getElementById('productName').value = producto.name;
        document.getElementById('category').value = producto.category;
        document.getElementById('productDescription').value = producto.description;
        document.getElementById('productPrice').value = producto.price;
        document.getElementById('productImage').value = producto.image;

        // Cambiar el botón para que diga "Guardar Cambios"
        document.getElementById('submitBtn').textContent = 'Guardar Cambios';
        document.getElementById('submitBtn').dataset.productIndex = productosSeleccionados[0];
    }
});

document.getElementById('submitBtn').addEventListener('click', () => {
    const productos = JSON.parse(localStorage.getItem("productos"));
    const productoIndex = document.getElementById('submitBtn').dataset.productIndex;

    // Obtener los datos del formulario
    const updatedProduct = {
        name: document.getElementById('productName').value,
        category: document.getElementById('category').value,
        description: document.getElementById('productDescription').value,
        price: parseFloat(document.getElementById('productPrice').value),
        image: document.getElementById('productImage').value
    };

    productos[productoIndex] = updatedProduct;

    // Guardar los cambios en localStorage
    localStorage.setItem("productos", JSON.stringify(productos));

    cargarProductos();

    // Volver a poner el botón a "Agregar Producto"
    document.getElementById('submitBtn').textContent = 'Agregar Producto';
    // Limpiar el índice de producto
    delete document.getElementById('submitBtn').dataset.productIndex;

    // Limpiar los campos del formulario
    document.getElementById('productForm').reset();

    limpiarValidaciones();
    
});

// Cargar los productos al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    cargarProductos();
});
