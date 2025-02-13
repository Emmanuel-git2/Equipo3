document.getElementById('uploadBtn').addEventListener('click', function () {
    cloudinary.openUploadWidget(
        {
            cloudName: 'dy6sopjv3',  
            uploadPreset: 'uw_formulario', 
            sources: ['local', 'url', 'camera'],
            multiple: false,
            cropping: true,
            maxFileSize: 2000000 
        },
        function (error, result) {
            if (error) {
                console.error('Error al subir la imagen:', error);
                alert('Error al subir la imagen: ' + error.message);
            } else if (result && result.event === "success") {
                const imageUrl = result.info.secure_url;
                document.getElementById("productImage").value = imageUrl;
                console.log("Imagen subida exitosamente:", imageUrl);
            }
        }
    );
});

document.getElementById('submitBtn').addEventListener('click', function (event) {
    event.preventDefault(); // ✅ Evita la recarga de la página

    const nameField = document.getElementById('productName');
    const categoryField = document.getElementById('category');
    const descriptionField = document.getElementById('productDescription');
    const priceField = document.getElementById('productPrice');
    const imageField = document.getElementById('productImage');

    let isValid = true;

    // ✅ Validaciones
    if (!categoryField.value) {
        categoryField.classList.add('is-invalid');
        isValid = false;
    } else {
        categoryField.classList.remove('is-invalid');
    }

    const description = descriptionField.value.trim();
    const wordCount = description.split(/\s+/).length;
    if (wordCount < 5 || wordCount > 20) {
        descriptionField.classList.add('is-invalid');
        isValid = false;
    } else {
        descriptionField.classList.remove('is-invalid');
    }

    if (!nameField.value.trim()) {
        nameField.classList.add('is-invalid');
        isValid = false;
    } else {
        nameField.classList.remove('is-invalid');
    }

    const price = parseFloat(priceField.value.trim());
    if (isNaN(price) || price <= 0) {
        priceField.classList.add('is-invalid');
        isValid = false;
    } else {
        priceField.classList.remove('is-invalid');
    }

    if (!imageField.value.trim()) {
        imageField.classList.add('is-invalid');
        isValid = false;
    } else {
        imageField.classList.remove('is-invalid');
    }

    if (!isValid) {
        alert("Por favor, corrige los errores en el formulario.");
        return;
    }

    // ✅ Objeto JSON con la estructura correcta
    const producto = {
        nombre: nameField.value.trim(),
        descripcion: descriptionField.value.trim(),
        precio: price,
        categoria: { id_categoria: parseInt(categoryField.value) },
        imagenUrl: imageField.value.trim() // ✅ Ahora sí se enviará al backend
    };

    // ✅ Enviar datos al backend con fetch
    fetch("http://localhost:8080/api/Producto/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto)
    })
    .then(response => {
        if (!response.ok) throw new Error("Error en la petición.");
        return response.json();
    })
    .then(data => {
        console.log("Producto agregado:", data);
        alert("Producto agregado correctamente!");
        document.getElementById("productForm").reset();
        cargarProductos();
    })
    .catch(error => console.error("Error:", error));
});

function cargarProductos() {
    fetch("http://localhost:8080/api/Producto/")
    .then(response => response.json())
    .then(data => {
        console.log("Productos recibidos:", data);

        const productosTable = document.getElementById('productosTable');
        productosTable.innerHTML = ''; 

        data.forEach((producto) => {
            console.log("Producto recibido:", producto); // ✅ Verificar que llega correctamente
            
            const row = document.createElement('tr');

            row.innerHTML = `
                <td><input type="checkbox" class="form-check-input"></td>
                <td>${producto.nombre}</td>
                <td>${producto.categoria.nombre_categoria || "Sin categoría"}</td>
                <td>${producto.descripcion}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td><img src="${producto.imagenUrl ? producto.imagenUrl : 'https://via.placeholder.com/50'}" 
                    alt="Imagen del Producto" width="50"></td>
            `;

            productosTable.appendChild(row);
        });
    })
    .catch(error => console.error("Error al cargar productos:", error));
}

document.addEventListener('DOMContentLoaded', function () {
    cargarProductos();
});
