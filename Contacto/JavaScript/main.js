// Inicializa EmailJS con tu clave pública
emailjs.init("TfFM7gSYBRFC3ABEP"); // Reemplaza con tu clave pública

// Seleccionamos los elementos del formulario
const sendButton = document.getElementById("sendButton"); // Botón Enviar
const nameInput = document.getElementById("name"); // Campo Nombre
const emailInput = document.getElementById("email"); // Campo Correo
const phoneInput = document.getElementById("phone"); // Campo Teléfono
const messageInput = document.getElementById("message"); // Campo Mensaje

// Expresión regular para validar correos electrónicos
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Función para mostrar errores
function showError(input, message) {
    const parent = input.parentElement;
    let error = parent.querySelector(".error-message");
    if (!error) {
        error = document.createElement("div");
        error.className = "error-message text-danger";
        parent.appendChild(error);
    }
    error.textContent = message;
}

// Función para limpiar errores
function clearError(input) {
    const parent = input.parentElement;
    const error = parent.querySelector(".error-message");
    if (error) {
        parent.removeChild(error);
    }
}

// Función para validar el formulario
function validateForm() {
    let isValid = true; // Asumimos que todo está válido

    // Validación del nombre
    if (nameInput.value.trim().length < 3) {
        showError(nameInput, "El nombre debe tener al menos 3 caracteres.");
        isValid = false;
    } else {
        clearError(nameInput);
    }

    // Validación del correo electrónico
    if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, "Por favor ingrese un correo válido.");
        isValid = false;
    } else {
        clearError(emailInput);
    }

    // Validación del teléfono
    if (phoneInput.value.trim().length < 10 || isNaN(phoneInput.value.trim())) {
        showError(phoneInput, "El teléfono debe contener al menos 10 dígitos y ser numérico.");
        isValid = false;
    } else {
        clearError(phoneInput);
    }

    // Validación del mensaje
    if (messageInput.value.trim().length < 10) {
        showError(messageInput, "El mensaje debe tener al menos 10 caracteres.");
        isValid = false;
    } else {
        clearError(messageInput);
    }

    return isValid; // Retorna true si todo está correcto
}

// Asociamos la función de validación al botón "Enviar"
sendButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevenimos el comportamiento predeterminado del botón

    if (validateForm()) {
        sendEmail(); // Llamada a la función de envío de correo
    }
});

// Función para enviar el correo
function sendEmail() {
    // El ID de tu servicio y plantilla en EmailJS
    const serviceID = "service_krv9duu";  // Reemplaza con tu ID de servicio
    const templateID = "template_anw360p";  // Reemplaza con tu ID de plantilla

    // Datos que se van a enviar
    const formData = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        message: messageInput.value
    };

    // Muestra los datos en la consola para asegurarte de que todo esté bien
    console.log(formData);  // Aquí se mostrarán los datos antes de enviarlos


    // Enviar el correo utilizando EmailJS
    emailjs.send(serviceID, templateID, formData)
        .then(function(response) {
            // Mostrar el modal de éxito
            var myModal = new bootstrap.Modal(document.getElementById('successModal'));
            myModal.show();
        }, function(error) {
            // Mostrar el modal de error
            var errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
            errorModal.show();
        });
}

