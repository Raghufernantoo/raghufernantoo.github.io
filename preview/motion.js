const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.documentElement.classList.add("motion-ready");

const loader = document.querySelector(".motion-loader");
const cursor = document.querySelector(".motion-cursor");
const portrait = document.querySelector(".motion-portrait");
const marquee = document.querySelector(".marquee-track");
const toolImages = [...document.querySelectorAll('[aria-label="Design tools"] img')];
const cards = [...document.querySelectorAll(".gallery-card")];
const gallery = document.querySelector(".project-gallery");
const galleryProgress = document.querySelector(".project-gallery-sticky");
const reveals = [...document.querySelectorAll(".motion-reveal, .motion-section")];

window.addEventListener("load", () => {
  window.setTimeout(() => loader?.classList.add("is-hidden"), 300);
  document.documentElement.classList.add("is-loaded");
});

if (!reduceMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });
  reveals.forEach((element) => observer.observe(element));

  const toolsObserver = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return;
    toolImages.forEach((image, index) => {
      image.style.transitionDelay = `${index * 65}ms`;
      image.classList.add("is-visible");
    });
    toolsObserver.disconnect();
  }, { threshold: 0.3 });
  if (toolImages[0]) toolsObserver.observe(toolImages[0].parentElement);

  let pointerX = 0;
  let pointerY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let previousScroll = window.scrollY;
  let marqueeVelocity = 1;

  window.addEventListener("pointermove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (portrait && window.innerWidth > 900) {
      const rect = portrait.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      portrait.style.setProperty("--rx", `${y * -5}deg`);
      portrait.style.setProperty("--ry", `${x * 7}deg`);
    }
  });

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    const delta = currentScroll - previousScroll;
    previousScroll = currentScroll;
    marqueeVelocity = Math.max(-2.4, Math.min(2.4, delta * 0.08));
    if (portrait) portrait.style.setProperty("--portrait-y", `${Math.min(currentScroll * 0.055, 28)}px`);
  }, { passive: true });

  const animate = () => {
    cursorX += (pointerX - cursorX) * 0.16;
    cursorY += (pointerY - cursorY) * 0.16;
    if (cursor) cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    marqueeVelocity *= 0.9;
    if (marquee) marquee.style.setProperty("--marquee-skew", `${marqueeVelocity}deg`);
    requestAnimationFrame(animate);
  };
  animate();

  document.querySelectorAll("a, button, .gallery-card, .process-card").forEach((element) => {
    element.addEventListener("pointerenter", () => cursor?.classList.add("is-active"));
    element.addEventListener("pointerleave", () => cursor?.classList.remove("is-active"));
  });

  const updateGallery = () => {
    if (!gallery || window.innerWidth <= 760) return;
    const rect = gallery.getBoundingClientRect();
    const distance = gallery.offsetHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(1, -rect.top / Math.max(distance, 1)));
    const travel = progress * Math.max(cards.length - 1, 1);
    galleryProgress?.style.setProperty("--gallery-progress", progress);
    cards.forEach((card, index) => {
      const offset = index - travel;
      const magnitude = Math.abs(offset);
      const x = offset * Math.min(window.innerWidth * 0.58, 760);
      const curve = Math.pow(magnitude, 1.35) * 50;
      const z = magnitude * -190;
      const rotateY = offset * -20;
      const rotateZ = offset * 3;
      const scale = Math.max(0.72, 1 - magnitude * 0.1);
      const opacity = Math.max(0.24, 1 - Math.max(0, magnitude - 1.4) * 0.45);
      card.style.setProperty("--gallery-x", `${x}px`);
      card.style.setProperty("--gallery-y", `${curve}px`);
      card.style.setProperty("--gallery-z", `${z}px`);
      card.style.setProperty("--gallery-ry", `${rotateY}deg`);
      card.style.setProperty("--gallery-rz", `${rotateZ}deg`);
      card.style.setProperty("--gallery-scale", scale);
      card.style.opacity = opacity;
      card.style.zIndex = String(20 - Math.round(magnitude * 5));
      card.classList.toggle("is-active", magnitude < 0.42);
    });
  };

  window.addEventListener("scroll", updateGallery, { passive: true });
  window.addEventListener("resize", updateGallery);
  updateGallery();
} else {
  loader?.classList.add("is-hidden");
  reveals.forEach((element) => element.classList.add("is-visible"));
  toolImages.forEach((image) => image.classList.add("is-visible"));
}
