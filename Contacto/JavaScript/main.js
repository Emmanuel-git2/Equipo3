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

// Función para validar el teléfono
function validatePhone(phone) {
    const phoneValue = phone.trim();
    
    // Verifica que tenga 10 dígitos numéricos
    const validLength = phoneValue.length === 10;
    const isNumeric = !isNaN(phoneValue);
    
    // Verifica que no sea una secuencia de números repetidos (como "0000000000", "1111111111", etc.)
    const repeatedPattern = /^(\d)\1{9}$/; // Detecta secuencias repetidas de 10 dígitos
    const isNotRepeated = !repeatedPattern.test(phoneValue);
  
    if (!validLength || !isNumeric || !isNotRepeated) {
        return false; // Si no cumple con las condiciones, es inválido
    }
    
    return true; // Si pasa todas las condiciones, es válido
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
    if (!validatePhone(phoneInput.value)) {
        showError(phoneInput, "El teléfono debe contener 10 dígitos, ser numérico y no puede ser una secuencia repetida.");
        isValid = false; // Marca como inválido si no pasa la validación
    } else {
        clearError(phoneInput); // Si es válido, limpia los errores
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

    // Llamamos a la función de validación
    if (validateForm()) {
        sendEmail(); // Si el formulario es válido, llama a la función para enviar el correo
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
