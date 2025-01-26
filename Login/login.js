// Seleccionamos los elementos del DOM
const txtEmail = document.getElementById("txtEmail");
const txtContraseña = document.getElementById("txtContraseña");
const btnInicio = document.getElementById("btninicio");

// Creamos el contenedor para mensajes de error específicos
const emailError = document.createElement("div");
emailError.style.color = "red";
emailError.style.fontSize = "0.9em";
emailError.style.marginTop = "5px";
txtEmail.parentNode.appendChild(emailError);

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
    txtEmail.style.border = "";
    txtContraseña.style.border = "";

    let isValid = true;

    // Validar si los campos están vacíos
    if (txtEmail.value.trim() === "") {
        isValid = false;
        txtEmail.style.border = "solid red medium";
    }

    if (txtContraseña.value.trim() === "") {
        isValid = false;
        txtContraseña.style.border = "solid red medium";
    }

    // Validar el correo electrónico
    if (!validarCorreo(txtEmail.value)) {
        isValid = false;
        txtEmail.style.border = "solid red medium";
        emailError.innerText = "El correo electrónico es inválido.";
    }

    if (!isValid) {
        return; // Salir si hay errores
    }

    // Lógica de autenticación
    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioEncontrado = usuariosRegistrados.find(
        (usuario) => usuario.email === txtEmail.value && usuario.password === txtContraseña.value
    );

    if (usuarioEncontrado) {
        alert("Inicio de sesión exitoso");
        // Limpiar campos
        txtEmail.value = "";
        txtContraseña.value = "";
    } else {
        alert("El correo electrónico no corresponde con la contraseña ingresada.");
    }
});

// Función para registrar usuarios (simulación en la pestaña de registro)
function registrarUsuario(email, password) {
    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuariosRegistrados.push({ email, password });
    localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));
}

// Ejemplo: Registrar un usuario desde la pestaña de registro
// registrarUsuario("test@example.com", "123456");