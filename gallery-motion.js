(() => {
  // Animate on entry, never hide content in CSS. Images work without this script.
  if (!("IntersectionObserver" in window) || !Element.prototype.animate) return;
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  const active = new Map();
  const played = new WeakSet();
  const targets = [...document.querySelectorAll(".photo-row, .photo-set figcaption")];
  function finishAll() {
    active.forEach(animation => animation.cancel());
    active.clear();
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const target = entry.target;
      if (!entry.isIntersecting) {
        // Re-arm only once the row is well outside the screen, not at a boundary.
        if (entry.boundingClientRect.bottom < -32 ||
            entry.boundingClientRect.top > innerHeight + 32) played.delete(target);
        return;
      }
      if (played.has(target)) return;
      played.add(target);
      if (preference.matches) return;
      const items = target.matches(".photo-row") ? [...target.children] : [target];
      items.forEach((item, index) => {
        active.get(item)?.cancel();
        const animation = item.animate([
          { opacity: .25, translate: "0 " + (entry.boundingClientRect.top < 0 ? "-14px" : "20px") },
          { opacity: 1, translate: "0 0" }
        ], { duration: 580, delay: index * 65, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" });
        active.set(item, animation);
        animation.finished.then(() => {
          if (active.get(item) === animation) active.delete(item);
        }, () => {});
      });
    });
  }, { rootMargin: "40px 0px 40px 0px", threshold: 0 });
  targets.forEach(target => observer.observe(target));
  preference.addEventListener("change", () => {
    if (preference.matches) finishAll();
  });
  document.addEventListener("focusin", event => {
    // Keyboard focus remains immediate and visible.
    active.get(event.target)?.cancel();
    active.delete(event.target);
  });
  addEventListener("pagehide", finishAll);
})();
