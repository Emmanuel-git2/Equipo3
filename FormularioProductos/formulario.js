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
    event.preventDefault();

    const idProducto = document.getElementById('submitBtn').dataset.productId; // ✅ Verifica si es edición
    const nameField = document.getElementById('productName');
    const categoryField = document.getElementById('category');
    const descriptionField = document.getElementById('productDescription');
    const priceField = document.getElementById('productPrice');
    const imageField = document.getElementById('productImage');

    let isValid = true;

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

    const producto = {
        nombre: nameField.value.trim(),
        descripcion: descriptionField.value.trim(),
        precio: price,
        categoria: { id_categoria: parseInt(categoryField.value) },
        imagenUrl: imageField.value.trim()
    };

    const url = idProducto ? `https://3.147.52.41/api/Producto/${idProducto}` : "https://3.147.52.41/api/Producto/";
    const method = idProducto ? "PUT" : "POST";

    fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto)
    })
    .then(response => {
        if (!response.ok) throw new Error("Error en la petición.");
        return response.json();
    })
    .then(() => {
        alert(idProducto ? "Producto actualizado correctamente" : "Producto agregado correctamente");
        document.getElementById("productForm").reset();
        document.getElementById('submitBtn').textContent = "Agregar Producto";
        delete document.getElementById('submitBtn').dataset.productId;
        cargarProductos(); // ✅ Refrescar la tabla después de actualizar
    })
    .catch(error => console.error("Error:", error));
});

function cargarProductos() {
    fetch("https://3.147.52.41/api/Producto/")
    .then(response => response.json())
    .then(data => {
        console.log("Productos recibidos:", data);

        const productosTable = document.getElementById('productosTable');
        productosTable.innerHTML = '';

        data.forEach((producto) => {
            console.log("Producto recibido:", producto);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td><input type="checkbox" class="form-check-input" data-id="${producto.id}"></td>
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

// ✅ CONFIRMACIÓN ANTES DE ELIMINAR PRODUCTOS
document.getElementById("btnEliminar").addEventListener("click", function () {
    const checkboxes = document.querySelectorAll("#productosTable input[type='checkbox']:checked");
    if (checkboxes.length === 0) {
        alert("Selecciona al menos un producto para eliminar.");
        return;
    }

    if (!confirm("¿Estás seguro de que deseas eliminar los productos seleccionados?")) return;

    checkboxes.forEach((checkbox) => {
        const id = checkbox.dataset.id;
        fetch(`https://3.147.52.41/api/Producto/${id}`, { method: "DELETE" })
            .then(response => {
                if (!response.ok) throw new Error("Error al eliminar el producto.");
                return response.text();
            })
            .then(() => {
                alert("Producto eliminado correctamente.");
                cargarProductos();
            })
            .catch(error => console.error("Error:", error));
    });
});

// ✅ EDICIÓN DE PRODUCTO (YA GUARDA CORRECTAMENTE)
document.getElementById("btnEditar").addEventListener("click", function () {
    const checkboxes = document.querySelectorAll("#productosTable input[type='checkbox']:checked");
    if (checkboxes.length !== 1) {
        alert("Selecciona un solo producto para editar.");
        return;
    }

    const id = checkboxes[0].dataset.id;
    fetch(`https://3.147.52.41/api/Producto/${id}`)
        .then(response => response.json())
        .then(producto => {
            document.getElementById("productName").value = producto.nombre;
            document.getElementById("category").value = producto.categoria.id_categoria;
            document.getElementById("productDescription").value = producto.descripcion;
            document.getElementById("productPrice").value = producto.precio;
            document.getElementById("productImage").value = producto.imagenUrl;

            document.getElementById("submitBtn").textContent = "Guardar Cambios";
            document.getElementById("submitBtn").dataset.productId = id;
        })
        .catch(error => console.error("Error al obtener producto:", error));
});

document.addEventListener('DOMContentLoaded', function () {
    cargarProductos();
});

