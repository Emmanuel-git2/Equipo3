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
    const checkboxLabel = document.getElementById("checkboxLabel");

    // Función para abrir el modal de términos y condiciones
    termsLink.addEventListener("click", function (event) {
        event.preventDefault();
        $('#termsModal').modal('show');
        termsModal.removeAttribute("inert"); // Habilita la interacción con el modal
    });
    
    // Función para aceptar los términos y condiciones
    acceptBtn.addEventListener("click", function () {
        $('#termsModal').modal('hide');
        gridCheck.checked = true; // Marca el checkbox automáticamente
        gridCheck.disabled = false; // Habilita el checkbox para permitir interacción
    
        // Actualiza la opacidad del texto asociado al checkbox
        checkboxLabel.style.opacity = "1"; // Hace visible el texto
        checkboxLabel.classList.remove("disabled"); 
    
        // Deshabilita el enlace de términos y condiciones
        termsLink.classList.add("disabled");
        termsModal.setAttribute("inert", "true"); 
    
        // Verifica si el formulario es válido después de aceptar los términos
        checkFormValidity();
    });

    function initializeCheckboxLabel() {
        if (gridCheck.checked) {
            checkboxLabel.style.opacity = "1"; 
        } else {
            checkboxLabel.style.opacity = "0.5"; 
        }
    }
    
    initializeCheckboxLabel();

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

    // Validaciones específicas para cada campo
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
        const isValid = /^\d{10}$/.test(phone) && 
                        !/^(.)\1{9}$/.test(phone) && 
                        !/^(0123456789|9876543210)$/.test(phone);   
        setValidationState(numberPhoneField, isValid, "El número de teléfono debe ser válido y a 10 dígitos.");
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

    // Función integrada para validar la contraseña
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

    function clearForm() {
        // Limpiar los campos de entrada
        nameField.value = '';
        userNameField.value = '';
        numberPhoneField.value = '';
        postCodeField.value = '';
        emailField.value = '';
        emailConfirmField.value = '';
        passwordField.value = '';
        passwordConfirmField.value = '';
        gridCheck.checked = false;
    
        // Limpiar las clases de validación
        const fields = [
            nameField, 
            userNameField, 
            numberPhoneField, 
            postCodeField, 
            emailField, 
            emailConfirmField, 
            passwordField, 
            passwordConfirmField
        ];
    
        fields.forEach(field => {
            field.classList.remove("is-valid", "is-invalid");
            const errorElement = field.nextElementSibling;
            if (errorElement) {
                errorElement.textContent = ''; // Limpiar los mensajes de error
            }
        });
    }

    //Función para crear arreglo en formato JSON, guardar en localStorage y redirigir a login
    function saveDataToLocalStorageAndRedirect() {
        const userData = {
            name: nameField.value.trim(),
            userName: userNameField.value.trim(),
            phone: numberPhoneField.value.trim(),
            postCode: postCodeField.value.trim(),
            email: emailField.value.trim(),
            password: passwordField.value.trim(), 
        };
    
        // Guardar datos en localStorage
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        existingUsers.push(userData);
        localStorage.setItem("users", JSON.stringify(existingUsers));
        console.log("Usuarios guardados:", existingUsers);
    
        $('#successModal').modal('show');
        
        document.getElementById("successModal").removeAttribute("inert");
    }
    
    // Función para redirigir al login cuando el usuario hace clic en "Ir al Login"
    const redirectButton = document.getElementById("redirectButton");
    if (redirectButton) {
        redirectButton.addEventListener("click", function () {
            // Redirigir a login.html después de hacer clic en "Ir al Login"
            window.location.href = "../Login/login.html";
        });
    }

    // Eventos de validación
    
    nameField.addEventListener("input", validateName);
    userNameField.addEventListener("input", validateUserName);
    numberPhoneField.addEventListener("input", validatePhone);
    postCodeField.addEventListener("input", validatePostCode);
  
    emailField.addEventListener("input", function () {
        validateEmail();
        validateEmailConfirm();
    });
    emailConfirmField.addEventListener("input", validateEmailConfirm);
    passwordField.addEventListener("input", function () {
        validatePassword(passwordField);
        validatePasswordConfirm();
    });
    passwordConfirmField.addEventListener("input", validatePasswordConfirm);
    gridCheck.addEventListener("change", checkFormValidity);

    nameField.addEventListener("blur", validateName);
    userNameField.addEventListener("blur", validateUserName);
    numberPhoneField.addEventListener("blur", validatePhone);
    postCodeField.addEventListener("blur", validatePostCode);

    // Guardar datos y redirigir al hacer clic en Registrar
    
    if (registerButton) {
    registerButton.addEventListener("click", function (event) {
        event.preventDefault();
        if (form.checkValidity()) {
            saveDataToLocalStorageAndRedirect();
            clearForm();
        }
    });
  }
});
