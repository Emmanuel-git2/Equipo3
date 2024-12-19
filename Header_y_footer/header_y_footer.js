function headerAndFooter() {
  const body = document.getElementsByTagName("body");
  const head = document.getElementsByTagName("head");

  //Imports de stylesheets bootStrap y fonts
  document.head.insertAdjacentHTML(
    "afterend",
    `
    <!-- Horizon y Montserrat Classic -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
      rel="stylesheet"
    />
    <!-- Bootstrap -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
    <!-- Bootstrap Icons -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"
      rel="stylesheet"
    />

    <!-- Styles Footer and Header -->
    <link rel="stylesheet" href="stylesFooterAndHeader.css" />
    `
  );

  //Insertamos navbar despues de iniciar el body
  document.body.insertAdjacentHTML(
    "afterbegin",
    `
     <!-- NavBar -->
         <header>
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
                  <a class="nav-link active" aria-current="page" href="../Nosotros/nosotros.html"
                    >Nosotros</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="../Categorias/categorias.html"
                    >Categorias</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="../Ofertas/ofertas.html"
                    >Ofertas</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="../Contacto/contacto.html"
                    >Contacto</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="../Carrito/carrito.html"
                    >Carrito</a
                  >
                </li>
              </ul>
              <button class="button d-flex mb-2">Entrar</button>
              <button class="button d-flex mb-2">Registrarse</button>
            </div>
          </div>
        </nav>
       </header>
    `
  );

  //Insertamos footer a
  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <footer>
      <nav class="navbar navbar-expand static-bottom footer">
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
      </footer>

    <!-- Script Bootstrap -->
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
      crossorigin="anonymous"
    ></script>
      `
  );
}

headerAndFooter();
