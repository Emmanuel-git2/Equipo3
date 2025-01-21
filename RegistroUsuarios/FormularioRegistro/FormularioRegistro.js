document.addEventListener("DOMContentLoaded", function () { 
    const form = document.getElementById("registrationForm");
    const passwordField = document.getElementById("password");
    const passwordConfirmField = document.getElementById("passwordConfirm");
    const registerButton = document.getElementById("registerButton");
    const nameField = document.getElementById("name");
    const userNameField = document.getElementById("userName");
    const numberPhoneField = document.getElementById("numberPhone");
    const postCodeField = document.getElementById("postCode");
    const emailField = document.getElementById("email");
    const emailConfirmField = document.getElementById("emailConfirm");
    const gridCheck = document.getElementById("gridCheck");

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Modal y aceptación de términos
    const termsLink = document.getElementById("termsLink");
    const termsModal = document.getElementById("termsModal");
    const acceptBtn = document.getElementById("acceptBtn");
    const checkbox = document.getElementById("gridCheck");
    const termsLabel = document.getElementById("termsLabel");

    termsLink.addEventListener("click", function (event) {
        event.preventDefault();
        $('#termsModal').modal('show');
    });

    acceptBtn.addEventListener("click", function () {
        $('#termsModal').modal('hide');
        checkbox.checked = true; // Marca el checkbox automáticamente
        checkbox.disabled = false; // Habilita el checkbox
        registerButton.disabled = false; // Habilita el botón de registro
    });

    // Función para habilitar o deshabilitar el botón de registro
    function checkFormValidity() {
        const isFormValid =
            nameField.classList.contains("is-valid") &&
            userNameField.classList.contains("is-valid") &&
            numberPhoneField.classList.contains("is-valid") &&
            postCodeField.classList.contains("is-valid") &&
            emailField.classList.contains("is-valid") &&
            emailConfirmField.classList.contains("is-valid") &&
            passwordField.classList.contains("is-valid") &&
            passwordConfirmField.classList.contains("is-valid") &&
            gridCheck.checked;

        registerButton.disabled = !isFormValid; // Deshabilitar o habilitar el botón
    }

    // Función para establecer el estado de validación
    function setValidationState(field, isValid, message) {
        const errorElement = field.nextElementSibling;
        if (isValid) {
            field.classList.remove("is-invalid");
            field.classList.add("is-valid");
            if (errorElement) errorElement.textContent = "";
        } else {
            field.classList.remove("is-valid");
            field.classList.add("is-invalid");
            if (errorElement) errorElement.textContent = message;
        }
        checkFormValidity();
    }

    // Funciones de validación para cada campo
    function validateName() {
        const name = nameField.value.trim();
        const isValid = name.split(" ").length >= 2 && name.split(" ").every(word => word.length >= 2);
        setValidationState(nameField, isValid, "Escribe tu nombre y apellido.");
    }

    function validateUserName() {
        const userName = userNameField.value.trim();
        const isValid = /^[A-Za-z0-9]{10,}$/.test(userName);
        setValidationState(userNameField, isValid, "El nombre de usuario debe tener al menos 10 caracteres alfanuméricos.");
    }

    function validatePhone() {
        const phone = numberPhoneField.value.trim();
        const isValid = /^\d{10}$/.test(phone);
        setValidationState(numberPhoneField, isValid, "El número de teléfono debe contener 10 dígitos.");
    }

    function validatePostCode() {
        const postCode = postCodeField.value.trim();
        const isValid = /^\d{5}$/.test(postCode);
        setValidationState(postCodeField, isValid, "El código postal debe contener 5 dígitos.");
    }

    function validateEmail() {
        const email = emailField.value.trim();
        const isValid = emailPattern.test(email);
        setValidationState(emailField, isValid, "El correo electrónico no es válido.");
    }

    function validateEmailConfirm() {
        const email = emailField.value.trim();
        const emailConfirm = emailConfirmField.value.trim();
        const isValid = email === emailConfirm;
        setValidationState(emailConfirmField, isValid, "Los correos electrónicos no coinciden.");
    }

    function validatePassword(field) { 
        const value = field.value;
        const errorElement = field.nextElementSibling.nextElementSibling; // Para el mensaje de error
        const minLength = 10;
        const upperCase = /[A-Z]/;
        const number = /\d/;
        const specialChar = /[@$!%*?&]/;

        let errorMessages = [];

        if (value.length < minLength) {
            errorMessages.push("La contraseña debe tener al menos 10 caracteres.");
        }
        if (!upperCase.test(value)) {
            errorMessages.push("La contraseña debe tener al menos una letra mayúscula.");
        }
        if (!number.test(value)) {
            errorMessages.push("La contraseña debe tener al menos un número.");
        }
        if (!specialChar.test(value)) {
            errorMessages.push("La contraseña debe tener al menos un carácter especial (@$!%*?&).");
        }

        if (errorMessages.length > 0) {
            errorElement.innerHTML = `<ul class="text-danger"><li>${errorMessages.join('</li><li>')}</li></ul>`;
            field.classList.add("is-invalid");
            field.classList.remove("is-valid");
            return false;
        } else {
            errorElement.innerHTML = '';
            field.classList.add("is-valid");
            field.classList.remove("is-invalid");
            return true;
        }
    }

    function validatePasswordConfirm() {
        const password = passwordField.value.trim();
        const passwordConfirm = passwordConfirmField.value.trim();
        const isValid = password === passwordConfirm;
        setValidationState(passwordConfirmField, isValid, "Las contraseñas no coinciden.");
    }

    // Mostrar la contraseña
    const togglePassword = document.getElementById("togglePassword");
    if (togglePassword) {
        togglePassword.addEventListener("click", togglePasswordVisibility);
    }

    function togglePasswordVisibility() {
        const type = passwordField.type === "password" ? "text" : "password";
        passwordField.type = type;
        document.getElementById("togglePassword").innerHTML =
            type === "password" ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    }

    // Guardar datos en localStorage y redirigir a login.html
    function saveDataToLocalStorageAndRedirect() {
        const userData = {
            name: nameField.value.trim(),
            userName: userNameField.value.trim(),
            phone: numberPhoneField.value.trim(),
            postCode: postCodeField.value.trim(),
            email: emailField.value.trim(),
            password: passwordField.value.trim(), 
        };

        localStorage.setItem("userData", JSON.stringify(userData));
        console.log("Datos guardados:", userData);

        // Mostrar el modal de éxito antes de redirigir
        $('#successModal').modal('show');
    }

    // Evento para el botón del modal
    const redirectButton = document.getElementById("redirectButton");
    if (redirectButton) {
        redirectButton.addEventListener("click", function () {
            // Redirigir a login.html después de hacer clic en "Ir al Login"
            window.location.href = "../Login/login.html";
        });
    }

    // Eventos de validación
    nameField.addEventListener("input", function() {
        validateName();
        checkFormValidity(); // Verifica si el formulario es válido
    });
    userNameField.addEventListener("input", function() {
        validateUserName();
        checkFormValidity(); // Verifica si el formulario es válido
    });
    numberPhoneField.addEventListener("input", function() {
        validatePhone();
        checkFormValidity(); // Verifica si el formulario es válido
    });
    postCodeField.addEventListener("input", function() {
        validatePostCode();
        checkFormValidity(); // Verifica si el formulario es válido
    });
    emailField.addEventListener("input", function() {
        validateEmail();
        validateEmailConfirm(); // Revalida el campo de confirmación de correo
        checkFormValidity(); // Verifica si el formulario es válido
    });
    
    emailConfirmField.addEventListener("input", function() {
        validateEmailConfirm();
        checkFormValidity(); // Verifica si el formulario es válido
    });
    
    passwordField.addEventListener("input", function() {
        validatePassword(passwordField);
        validatePasswordConfirm(); // Revalida el campo de confirmación de contraseña
        checkFormValidity(); // Verifica si el formulario es válido
    });
    
    passwordConfirmField.addEventListener("input", function() {
        validatePasswordConfirm();
        checkFormValidity(); // Verifica si el formulario es válido
    });
    
    gridCheck.addEventListener("change", function() {
        checkFormValidity(); // Verifica si el formulario es válido
    });

    // Guardar datos y redirigir al hacer clic en Registrar
    registerButton.addEventListener("click", function (event) {
        event.preventDefault();
        if (form.checkValidity()) {
            saveDataToLocalStorageAndRedirect();
        }
    });

});
