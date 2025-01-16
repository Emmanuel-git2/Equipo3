const form = document.getElementById("productForm");
form.reset(); // Limpia todos los campos del formulario

const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");

const txtName = document.getElementById("Name");
const txtdescription = document.getElementById("description");
const txtimage = document.getElementById("image");

const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");


btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    let isValid = true;

    txtName.value = txtName.value.trim();
    txtdescription.value = txtdescription.value.trim();
    txtimage.value = txtimage.value.trim();

    txtName.style.border = "";
    txtdescription.style.border = "";
    txtimage.style.border = "";
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";

    if (txtName.value.length<3){
        //1. Mostrar la laerta con el error
        //2. Borde de color rojo
            txtName.style.border = "solid red medium";
            alertValidacionesTexto.innerHTML +="El nombre del producto no es correcto.<br>";
            alertValidaciones.style.display="block";
            isValid = false

    }
    if (txtdescription.value.length<3){
        //1. Mostrar la laerta con el error
        //2. Borde de color rojo
        txtdescription.style.border = "solid red medium";
            alertValidacionesTexto.innerHTML +="La descripcion no es correcta.<br>";
            alertValidaciones.style.display="block";
            isValid = false

    }
    if (txtimage.files.length === 0) {
        txtimage.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML += "Debe seleccionar una imagen para el producto.<br>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }

    
});

btnClear.addEventListener("click", function() {
    txtName.value = "";
    txtdescription.value = "";
    txtimage.value = "";
    alertValidaciones.style.display = "none";
    txtName.style.border = "";
    txtdescription.style.border = "";
    txtimage.style.border = "";
});