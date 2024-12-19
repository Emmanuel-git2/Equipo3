
function mostrarHeader() {
  const body = document.getElementsByTagName ("body");
  document.body.insertAdjacentHTML("afterbegin", `
    <!-- NavBar -->
    <nav class="navbar navbar-expand-md">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"
          ><span class="letra-b">B</span><span class="letra-m">M</span></a
        >
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#"
                >Nosotros</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#"
                >Categorias</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#"
                >Ofertas</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#"
                >Contacto</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#"
                >Carrito</a
              >
            </li>
          </ul>
          <button class="button d-flex mb-2">Entrar</button>
          <button class="button d-flex mb-2">Registrarse</button>
        </div>
      </div>
    </nav>`);

  }

  mostrarHeader();




























