// Seleccionamos los elementos del DOM
const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const btnInicio = document.getElementById("btninicio");

// Creamos los contenedores para mensajes de error
const emailError = document.createElement("div");
emailError.className = "error-message";
txtEmail.parentNode.appendChild(emailError);

const generalError = document.createElement("div");
generalError.className = "error-message";
txtPassword.parentNode.appendChild(generalError);

// Función para validar el correo electrónico
function validarCorreo(email) {
    const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regexCorreo.test(email);
}

// Evento de click para el botón de inicio de sesión
btnInicio.addEventListener("click", function (event) {
    event.preventDefault();

    // Reiniciar estilos y mensajes
    emailError.innerText = "";
    generalError.innerText = "";
    txtEmail.classList.remove("input-error");
    txtPassword.classList.remove("input-error");

    let isValid = true;

    // Validar si ambos campos están vacíos
    if (txtEmail.value.trim() === "" && txtPassword.value.trim() === "") {
        isValid = false;
        generalError.innerText = "Ingresa correo electrónico y contraseña.";
        txtEmail.classList.add("input-error");
        txtPassword.classList.add("input-error");
    } else {
        // Validar correo electrónico vacío
        if (txtEmail.value.trim() === "") {
            isValid = false;
            txtEmail.classList.add("input-error");
            emailError.innerText = "El correo electrónico es obligatorio.";
        }

        // Validar contraseña vacía
        if (txtPassword.value.trim() === "") {
            isValid = false;
            txtPassword.classList.add("input-error");
            generalError.innerText = "La contraseña es obligatoria.";
        }
    }

    // Validar el formato del correo electrónico
    if (!validarCorreo(txtEmail.value) && txtEmail.value.trim() !== "") {
        isValid = false;
        txtEmail.classList.add("input-error");
        emailError.innerText = "El correo electrónico es inválido.";
    }

    if (!isValid) {
        return; // Salir si hay errores
    }

    // Lógica de autenticación
    const usuariosRegistrados = JSON.parse(localStorage.getItem("users")) || [];
    const usuarioEncontrado = usuariosRegistrados.find(
        (usuario) => usuario.email === txtEmail.value && usuario.password === txtPassword.value
    );

    if (usuarioEncontrado) {
        // Limpiar campos
        txtEmail.value = "";
        txtPassword.value = "";
        window.location.href = "http://127.0.0.1:5501/PaginaInicio/PaginaInicio.html"; // Cambia "index.html" a la ruta de tu página de inicio.
    } else {
        generalError.innerText = "El correo electrónico no corresponde con la contraseña ingresada.";
    txtEmail.classList.add("input-error");
    txtPassword.classList.add("input-error");
    }
});