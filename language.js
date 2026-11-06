// English remains in index.html. Spanish is authored locally; no translation service is required.
(() => {
  const translations = [
    ['header nav a[href="#about"]', 'Sobre mí'],
    ['header nav a[href="#papers"], #papers>h2', 'Publicaciones'],
    ['header nav a[href="#projects"], #projects>h2', 'Proyectos'],
    ['header nav a[href="#contact"], #contact>h2', 'Contacto'],
    ['.portrait>span', 'Retrato'],
    ['.intro:first-of-type', 'Soy estudiante de grado en <strong>Diseño Industrial</strong> en la Southern University of Science and Technology (SUSTech), en la Escuela de Automatización y Fabricación Inteligente (anteriormente SDIM).'],
    ['.intro:nth-of-type(2)', 'Tengo experiencia en diseño de productos, diseño computacional y sistemas electrónicos con STM32 y Arduino. Disfruto <strong>construyendo prototipos</strong> y dando forma física a las ideas, apoyándome en mis habilidades de <strong>modelado y simulación</strong>.'],
    ['.bio-heading', 'Intereses de investigación'],
    ['.research-copy', 'Estoy explorando la <strong>fabricación computacional y la computación física</strong>: cómo combinar herramientas computacionales, materiales y electrónica para crear objetos interactivos. También me interesa cómo la simulación puede orientar su diseño y fabricación.'],
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
    ['footer a', 'Volver arriba ↑'],
    ['.contact-links dt:first-child', 'Correo']
  ];
  const entries = translations.flatMap(([selector, spanish]) =>
    [...document.querySelectorAll(selector)].map(element => ({
      element, english: element.innerHTML, spanish
    })));
  // Keep original paper titles accessible as tooltips for accurate citation.
  document.querySelectorAll(".paper h3").forEach(title => title.title = title.textContent);
  const selector = document.getElementById("language");
  selector.value = "en";
  selector.addEventListener("change", () => {
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
    document.querySelector(".portrait img").alt = language === "es" ? "Retrato de Xiaoyuan Zhang" : "Portrait of Xiaoyuan Zhang";
    // Prevent changed paragraph lengths from throwing the reader into another section.
    if (anchor) {
      const root = document.documentElement;
      root.style.scrollBehavior = "auto";
      scrollBy(0, anchor.getBoundingClientRect().top - previousTop);
      root.style.scrollBehavior = "";
    }
    dispatchEvent(new Event("languagechange"));
    dispatchEvent(new Event("resize"));
  });
})();
