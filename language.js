// English remains in index.html. Spanish is authored locally; no translation service is required.
(() => {
  const translations = [
    ['header nav a[href="#about"]', 'Sobre mí'],
    ['header nav a[href="#papers"], #papers>h2', 'Publicaciones'],
    ['header nav a[href="#projects"], #projects>h2', 'Proyectos'],
    ['header nav a[href="#contact"], #contact>h2', 'Contacto'],
    ['.portrait>span', 'Retrato'],
    ['.intro:first-of-type', 'Soy estudiante de grado en <strong>Diseño Industrial</strong> en la Southern University of Science and Technology (SUSTech), en la Escuela de Automatización y Fabricación Inteligente (anteriormente SDIM).'],
    ['.intro:nth-of-type(2)', 'Tengo experiencia en diseño de productos, diseño computacional y sistemas electrónicos con STM32 y Arduino. Disfruto de la <strong>impresión 3D y la construcción de prototipos</strong>, dando forma física a las ideas con mis habilidades de <strong>modelado y simulación</strong>.'],
    ['.bio-heading', 'Intereses de investigación'],
    ['.research-copy', 'Estoy explorando la <strong>fabricación computacional y la computación física</strong>, con especial interés en la <strong>impresión 3D</strong>: cómo combinar herramientas computacionales, materiales y electrónica para crear objetos interactivos. También me interesa cómo la simulación puede orientar su diseño y fabricación.'],
    ['.paper-status', 'En proceso de revisión'],
    ['.paper:first-child h3', 'Modelado numérico y caracterización experimental de los procesos de posconformado de barras de polímero termoplástico reforzado con fibras (FRP)'],
    ['.paper:nth-child(2) h3', 'Optimización topológica de prótesis de material compuesto de pared delgada reforzado con fibras continuas y superficies curvas complejas'],
    ['.paper:first-child .venue', 'Enviado a <cite lang="en">Journal of Building Engineering</cite> (JBE)'],
    ['.paper:nth-child(2) .venue', 'Enviado a <cite lang="en">Structural and Multidisciplinary Optimization</cite>'],
    ['.paper:first-child .journal-metrics', 'Factor de impacto 2025 (JIF): 8,1 · JCR Q1 (Construcción y tecnología de la edificación)'],
    ['.paper:nth-child(2) .journal-metrics', 'Factor de impacto 2025 (JIF): 4,5 · JCR Q1 (Mecánica)'],
    ['.project-preview', 'Imagen del proyecto'],
    ['.projects-grid .entry:first-child h3', '[Proyecto 01]'],
    ['.projects-grid .entry:nth-child(2) h3', '[Proyecto 02]'],
    ['.projects-grid .entry>p', '[Describe el problema, lo que construiste y tu contribución.]'],
    ['.projects-grid summary', 'Notas del proyecto'],
    ['.projects-grid details p', '[Añade una decisión de diseño, un resultado experimental o una pregunta abierta.]'],
    ['#education>h2', 'Formación'],
    ['.education-period', 'Ago. 2023 – Actualidad'],
    ['.education-degree', 'Grado en Ingeniería en Diseño Industrial · Shenzhen, China'],
    ['.education-school', 'Escuela de Automatización y Fabricación Inteligente'],
    ['.education-awards li:nth-child(1)', '<strong>Beca Nacional de Estímulo</strong>, 2024–2025 y 2025–2026.'],
    ['.education-awards li:nth-child(2)', '<strong>Beca de Primera Categoría para Estudiantes Destacados</strong>, 2025–2026.'],
    ['.education-awards li:nth-child(3)', '<strong>Premio de Plata</strong>, Desafío de Accesibilidad y Bienestar Público de la Universidad de Pekín.'],
    ['footer a[href="#top"]', 'Volver arriba ↑'],
    ['.contact-links dt:first-child', 'Correo'],
    ['.life-label', 'Personal'],
    ['.life-link', 'Más allá de la investigación →'],
    ['.back-home', '← Perfil académico'],
    ['.gallery-heading h1', 'Más allá de la investigación'],
    ['.gallery-heading p', 'Un espacio para momentos cotidianos, actividades y cosas que disfruto fuera de la investigación.'],
    ['.gallery-placeholder span', 'Foto próximamente'],
    ['.gallery-date', '[Fecha · Lugar]'],
    ['.gallery-item:nth-child(1) h2', '[Un momento cotidiano]'],
    ['.gallery-item:nth-child(1) .gallery-copy', '[Una foto y unas palabras sobre un momento que quieras recordar.]'],
    ['.gallery-item:nth-child(2) h2', '[Una actividad o un encuentro]'],
    ['.gallery-item:nth-child(2) .gallery-copy', '[Añade una foto de una actividad, un viaje o un rato con amigos.]'],
    ['.gallery-item:nth-child(3) h2', '[Una pequeña novedad]'],
    ['.gallery-item:nth-child(3) .gallery-copy', '[Comparte una novedad, una afición o un pequeño descubrimiento cotidiano.]']
  ];
  const entries = translations.flatMap(([selector, spanish]) =>
    [...document.querySelectorAll(selector)].map(element => ({
      element, english: element.innerHTML, spanish
    })));
  // Keep original paper titles accessible as tooltips for accurate citation.
  document.querySelectorAll(".paper h3").forEach(title => title.title = title.textContent);
  const selector = document.getElementById("language");
  selector.value = new URLSearchParams(location.search).get("lang") === "es" ? "es" : "en";
  function applyLanguage(preservePosition = true) {
    const language = selector.value === "es" ? "es" : "en";
    const sections = [...document.querySelectorAll("section")];
    const anchor = sections.filter(section => section.getBoundingClientRect().top < innerHeight).pop();
    const previousTop = anchor?.getBoundingClientRect().top;
    document.documentElement.lang = language;
    document.querySelectorAll('[lang]').forEach(element => {
      if (element.tagName !== "OPTION" && element.tagName !== "CITE") element.lang = language;
    });
    entries.forEach(({element, english, spanish}) => {
      element.innerHTML = language === "es" ? spanish : english;
    });
    document.querySelector("header nav").setAttribute("aria-label", language === "es" ? "Navegación principal" : "Main navigation");
    const portrait = document.querySelector(".portrait img");
    if (portrait) portrait.alt = language === "es" ? "Retrato de Xiaoyuan Zhang" : "Portrait of Xiaoyuan Zhang";
    const gallery = document.querySelector(".gallery-feed");
    if (gallery) {
      gallery.setAttribute("aria-label", language === "es" ? "Galería de vida cotidiana" : "Life gallery");
      document.title = (language === "es" ? "Más allá de la investigación" : "Beyond research") + " · Xiaoyuan Zhang";
    }
    document.querySelectorAll("[data-local-page]").forEach(link => {
      const url = new URL(link.getAttribute("href"), location.href);
      if (language === "es") url.searchParams.set("lang", "es");
      else url.searchParams.delete("lang");
      link.setAttribute("href", url.pathname.split("/").pop() + url.search + url.hash);
    });
    // Prevent changed paragraph lengths from throwing the reader into another section.
    if (preservePosition && anchor) {
      const root = document.documentElement;
      root.style.scrollBehavior = "auto";
      scrollBy(0, anchor.getBoundingClientRect().top - previousTop);
      root.style.scrollBehavior = "";
    }
    dispatchEvent(new Event("languagechange"));
    dispatchEvent(new Event("resize"));
  }
  selector.addEventListener("change", () => applyLanguage(true));
  applyLanguage(false);
})();
