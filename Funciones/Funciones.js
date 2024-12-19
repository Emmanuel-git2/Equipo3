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


function mostrarFooter(){
  const body = document.getElementsByTagName("body");  // Accedemos al primer footer en el documento
    document.body.insertAdjacentHTML ("beforeend",`
  <!--Footer-->
  <nav class="navbar navbar-expand fixed-static footer">
    <div class="container-fluid flex-column">
      <div class="navbar-collapse justify-content-center" id="div-icons">
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li>
            <a href="https://www.facebook.com/" class="footer-icon"">
              <i class="bi bi-facebook"></i>
            </a>
          </li>
          <li>
            <a href="https://git-scm.com/" class="footer-icon"">
              <i class="bi bi-git"></i>
            </a>
          </li>
          <li>
            <a href="https://x.com/?lang=es" class="footer-icon"">
              <i class="bi bi-twitter-x"></i>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/" class="footer-icon"">
              <i class="bi bi-instagram"></i>
            </a>
          </li>
          <li>
            <a href="https://github.com/" class="footer-icon">
              <i class="bi bi-github"></i>
            </a>
          </li>
        </ul>
      </div>

      <div class="navbar-collapse">
        <div class="d-flex flex-column justify-content-center" id="div-generation">
          <a href="https://mexico.generation.org/">
            <img src="https://mexico.generation.org/wp-content/uploads/2019/08/Generation_Mexico_logo_WHITE.svg" width="100">
          </a>
          <p class="p-footer">
            © 2024 Proyecto para el bootcamp Generation MX
          </p>
        </div>
      </div>
    </div>
  </nav>
  
  <!--Footer-->

   `);
}
mostrarFooter();


