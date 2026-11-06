(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const running = new Set();
  function play(element, frames, options) {
    const animation = element.animate(frames, options);
    running.add(animation);
    animation.finished.then(() => running.delete(animation), () => running.delete(animation));
  }
  const name = document.getElementById("profile-name");
  if (!reduceMotion.matches) {
    const fullName = name.textContent;
    name.setAttribute("aria-label", fullName);
    name.textContent = "";
    const letters = Array.from(fullName).map(letter => {
      const span = document.createElement("span");
      span.className = "name-letter";
      span.textContent = letter;
      span.setAttribute("aria-hidden", "true");
      span.style.visibility = "hidden";
      name.append(span);
      return span;
    });
    let position = 0;
    let timer;
    const pauses = [170, 95, 145, 230, 100, 170, 360, 130, 210, 95, 150, 180];
    function typeNext() {
      letters.forEach(span => span.classList.remove("typing-position"));
      if (reduceMotion.matches) {
        letters.forEach(span => span.style.visibility = "visible");
        return;
      }
      if (position < letters.length) {
        letters[position].style.visibility = "visible";
        position++;
        if (position < letters.length) letters[position].classList.add("typing-position");
        else letters[position - 1].classList.add("typing-finished");
        timer = setTimeout(typeNext, position === letters.length ? 1100 : pauses[(position - 1) % pauses.length]);
      } else {
        letters.forEach(span => span.classList.remove("typing-finished"));
      }
    }
    letters[0]?.classList.add("typing-position");
    timer = setTimeout(typeNext, 400);
    reduceMotion.addEventListener("change", () => {
      if (reduceMotion.matches) {
        clearTimeout(timer);
        letters.forEach(span => {
          span.style.visibility = "visible";
          span.classList.remove("typing-position", "typing-finished");
        });
      }
    });
  }
  document.querySelectorAll(".projects-grid details").forEach(details => {
    const summary = details.querySelector("summary");
    let animation = null;
    let expanded = details.open;
    function finish() {
      details.open = expanded;
      details.style.height = "";
      details.style.overflow = "";
      animation = null;
    }
    summary.addEventListener("click", event => {
      if (reduceMotion.matches || !details.animate) return;
      event.preventDefault();
      const start = details.getBoundingClientRect().height;
      expanded = animation ? !expanded : !details.open;
      if (animation) { animation.onfinish = null; animation.cancel(); }
      details.style.height = "";
      details.open = expanded;
      const end = details.getBoundingClientRect().height;
      details.open = true;
      details.style.height = start + "px";
      details.style.overflow = "hidden";
      animation = details.animate([{height:start + "px"},{height:end + "px"}],
        {duration:300, easing:"cubic-bezier(.22,.61,.36,1)", fill:"forwards"});
      animation.onfinish = () => {
        const completed = animation;
        finish();
        completed.cancel();
      };
    });
    reduceMotion.addEventListener("change", () => {
      if (reduceMotion.matches && animation) {
        animation.onfinish = null;
        animation.cancel();
        finish();
      }
    });
  });
  // Elements remain visible without JavaScript; animate only on their first entry.
  if ("IntersectionObserver" in window) {
    const reveal = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal.unobserve(entry.target);
        if (!reduceMotion.matches && entry.target.animate) {
          play(entry.target, [{opacity:0, transform:"translateY(12px)"},
            {opacity:1, transform:"translateY(0)"}],
            {duration:400, easing:"cubic-bezier(.22,.61,.36,1)"});
        }
      }
    }, {threshold:0, rootMargin:"0px 0px -24px 0px"});
    document.querySelectorAll(".row").forEach(section => reveal.observe(section));
  }
  const links = [...document.querySelectorAll("header nav a")];
  const bar = document.createElement("span");
  bar.className = "nav-bar";
  bar.setAttribute("aria-hidden", "true");
  document.querySelector("header nav").append(bar);
  const sections = links.map(link => document.querySelector(link.getAttribute("href")));
  let queued = false;
  function markSection() {
    queued = false;
    let active = 0;
    sections.forEach((section, index) => {
      if (section && section.getBoundingClientRect().top <= innerHeight * .4) active = index;
    });
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) active = links.length - 1;
    links.forEach((link, index) => {
      if (index === active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    bar.style.width = links[active].offsetWidth + "px";
    bar.style.transform = "translateX(" + links[active].offsetLeft + "px)";
  }
  addEventListener("scroll", () => {
    if (!queued) { queued = true; requestAnimationFrame(markSection); }
  }, {passive:true});
  addEventListener("resize", markSection);
  reduceMotion.addEventListener("change", () => {
    if (reduceMotion.matches) running.forEach(animation => animation.cancel());
  });
  markSection();
})();
