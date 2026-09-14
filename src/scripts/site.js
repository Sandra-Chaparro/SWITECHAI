function initScrollReveal() {
  const els = document.querySelectorAll("[data-reveal]:not(.is-visible)");
  if (!els.length) return;

  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );

  els.forEach((el) => io.observe(el));

  // Safety net: guarantee content isn't left permanently invisible if
  // something (a slow/blocked observer, an interfering extension) stops
  // the intersection callback from ever firing.
  window.setTimeout(() => {
    els.forEach((el) => el.classList.add("is-visible"));
  }, 2000);
}

function initHeaderScrollState() {
  const header = document.querySelector("header.header");
  if (!header) return;

  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function init() {
  initScrollReveal();
  initHeaderScrollState();
}

// The site currently does full page loads for every navigation (no
// client-side router is mounted), so DOMContentLoaded covers every page.
// astro:page-load is also bound in case a client router is added later.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
document.addEventListener("astro:page-load", init);
