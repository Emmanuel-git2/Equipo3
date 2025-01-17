// Esperamos a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function () {

    // Prevenir el comportamiento por defecto del formulario
    document.getElementById("productForm").addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtener los valores de los campos
        const productName = document.getElementById("productName").value.trim();
        const productDescription = document.getElementById("productDescription").value.trim();
        const productPrice = document.getElementById("productPrice").value.trim();
        const productImage = document.getElementById("productImage").value.trim();

        // Validación de los campos
        let isValid = true;
        let errorMessage = "";

        // Validar Nombre del Producto
        if (!productName) {
            isValid = false;
            errorMessage += "El nombre del producto es obligatorio.<br>";
            document.getElementById("productName").classList.add("is-invalid");
        } else {
            document.getElementById("productName").classList.remove("is-invalid");
        }

        // Validar Descripción
        if (!productDescription) {
            isValid = false;
            errorMessage += "La descripción del producto es obligatoria.<br>";
            document.getElementById("productDescription").classList.add("is-invalid");
        } else {
            document.getElementById("productDescription").classList.remove("is-invalid");
        }

        // Validar Precio
        if (!productPrice || isNaN(productPrice) || productPrice <= 0) {
            isValid = false;
            errorMessage += "El precio debe ser un número positivo válido.<br>";
            document.getElementById("productPrice").classList.add("is-invalid");
        } else {
            document.getElementById("productPrice").classList.remove("is-invalid");
        }

        // Validar URL de la Imagen
        const imageRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg))$/i;
        if (!productImage || !imageRegex.test(productImage)) {
            isValid = false;
            errorMessage += "La URL de la imagen debe ser válida.<br>";
            document.getElementById("productImage").classList.add("is-invalid");
        } else {
            document.getElementById("productImage").classList.remove("is-invalid");
        }

        // Mostrar alerta si hay errores
        if (!isValid) {
            document.getElementById("alertText").innerHTML = errorMessage;
            document.getElementById("alert").classList.remove("d-none");
        } else {
            // Crear el objeto JSON si la validación es exitosa
            const productData = {
                name: productName,
                description: productDescription,
                price: parseFloat(productPrice),
                image: productImage
            };

            // Aquí puedes hacer algo con el objeto JSON, como enviarlo a un servidor o mostrarlo
            console.log("Producto agregado:", productData);

            // Limpiar el formulario
            document.getElementById("productForm").reset();

            // Ocultar alertas
            document.getElementById("alert").classList.add("d-none");
        }
    });

    // Función para subir imagen a Cloudinary
    document.getElementById('uploadBtn').addEventListener('click', function () {
        cloudinary.openUploadWidget(
            {
                cloudName: 'dy6sopjv3',  // Tu Cloud Name
                uploadPreset: 'tu_upload_preset',  // Tu Upload Preset
                sources: ['local', 'url', 'camera'], // Opciones de fuente
                multiple: false,  // Solo una imagen a la vez
                showAdvancedOptions: false,  // No mostrar opciones avanzadas
                cropping: true,  // Permitir recorte de imagen
                maxFileSize: 2000000, // Limitar el tamaño máximo de la imagen a 2MB
            },
            function (error, result) {
                if (result && result.event === "success") {
                    // Mostrar la URL de la imagen subida
                    const imageUrl = result.info.secure_url;
                    document.getElementById("productImage").value = imageUrl; // Asignar URL al campo del formulario
                    document.getElementById("imageUrl").textContent = imageUrl; // Mostrar la URL en el UI
                    console.log("Imagen subida exitosamente:", imageUrl);
                } else {
                    console.error("Error al subir la imagen:", error);
                }
            }
        );
    });

});



