// Función para subir imagen a Cloudinary
document.getElementById('uploadBtn').addEventListener('click', function () {
    cloudinary.openUploadWidget(
        {
            cloudName: 'dy6sopjv3',  // Reemplaza con tu Cloud Name
            uploadPreset: 'uw_formulario', // Reemplaza con tu Upload Preset
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
                    document.getElementById("imageUrl").textContent = imageUrl; // Mostrar la URL
                    console.log("Imagen subida exitosamente:", imageUrl);
                } else {
                    console.error("No se encontró el campo de imagen.");
                }
            }
        }
    );
});

// Función para obtener los datos del formulario y crear un objeto JSON
document.getElementById('submitBtn').addEventListener('click', function () {
    const form = document.getElementById('productForm');
    
    // Verificación de los campos del formulario
    if (form.checkValidity() === false) {
        form.classList.add('was-validated');
        document.getElementById('alertText').textContent = "Por favor, complete todos los campos.";
        document.getElementById('alert').classList.remove('d-none');
    } else {
        // Crear objeto JSON con los datos del formulario
        const productData = {
            name: document.getElementById('productName').value,
            description: document.getElementById('productDescription').value,
            price: parseFloat(document.getElementById('productPrice').value),
            image: document.getElementById('productImage').value
        };

        console.log('Producto creado:', productData);

        // Simulación de guardar el producto (puedes almacenar en localStorage o en una base de datos)
        let productos = JSON.parse(localStorage.getItem("productos")) || [];
        productos.push(productData);
        localStorage.setItem("productos", JSON.stringify(productos));

        // Mostrar mensaje de éxito
        document.getElementById('alertSuccess').classList.remove('d-none');

        // Limpiar formulario
        form.reset();
        form.classList.remove('was-validated');
        document.getElementById('alert').classList.add('d-none'); // Ocultar alerta de error
        document.getElementById('imagePreview').innerHTML = ''; // Limpiar vista previa de imagen
        document.getElementById('alertSuccess').classList.add('d-none'); // Limpiar mensaje de éxito

        // Actualizar la tabla con los productos guardados
        cargarProductos();
    }
});

// Función para cargar los productos desde localStorage y mostrarlos en la tabla
function cargarProductos() {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const productosTable = document.getElementById('productosTable');
    
    // Limpiar la tabla antes de agregar los productos
    productosTable.innerHTML = "";

    productos.forEach((producto) => {
        const row = document.createElement('tr');

        // Crear las celdas para cada propiedad del producto
        const nameTh = document.createElement('td');
        nameTh.textContent = producto.name;
        const descriptionTh = document.createElement('td');
        descriptionTh.textContent = producto.description;
        const priceTh = document.createElement('td');
        priceTh.textContent = `$${producto.price.toFixed(2)}`;
        const imageTh = document.createElement('td');
        const imgElement = document.createElement('img');
        imgElement.src = producto.image;
        imgElement.alt = "Imagen del Producto";
        imgElement.style.width = "50px"; // Tamaño pequeño de la imagen
        imageTh.appendChild(imgElement);

        // Añadir las celdas a la fila
        row.appendChild(nameTh);
        row.appendChild(descriptionTh);
        row.appendChild(priceTh);
        row.appendChild(imageTh);

        // Añadir la fila a la tabla
        productosTable.appendChild(row);
    });
}

// Cargar los productos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    cargarProductos();
});

// Ocultar el mensaje de alertaError después de 5 segundos o al interactuar con el campo
document.getElementById('productName').addEventListener('focus', hideAlertError);
document.getElementById('productDescription').addEventListener('focus', hideAlertError);

function hideAlertError() {
    setTimeout(() => {
        document.getElementById('alert').classList.add('d-none');
    }, 5000); // El mensaje se oculta después de 5 segundos

    // También se oculta al interactuar con el campo
    document.getElementById('alert').classList.add('d-none');
}
