const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.documentElement.classList.add("motion-ready");

const loader = document.querySelector(".motion-loader");
const cursor = document.querySelector(".motion-cursor");
const portrait = document.querySelector(".motion-portrait");
const heroSection = document.querySelector(".hero-section");
const heroScroll = document.querySelector(".hero-scroll");
const toolImages = [...document.querySelectorAll(".tools-list img")];
const revealElements = [...document.querySelectorAll(".motion-reveal, .motion-section")];
const processSection = document.querySelector(".process-stack");
const processCards = [...document.querySelectorAll(".process-card")];
const processCurrent = document.querySelector(".process-current");
const processRail = document.querySelector(".process-rail");

window.addEventListener("load", () => {
  window.setTimeout(() => loader?.classList.add("is-hidden"), 250);
  document.documentElement.classList.add("is-loaded");
});

if (reduceMotion) {
  loader?.classList.add("is-hidden");
  revealElements.forEach((element) => element.classList.add("is-visible"));
  toolImages.forEach((image) => image.classList.add("is-visible"));
  processCards[0]?.classList.add("is-active");
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.13, rootMargin: "0px 0px -8% 0px" }
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  const toolsObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;
      toolImages.forEach((image, index) => {
        image.style.transitionDelay = `${index * 70}ms`;
        image.classList.add("is-visible");
      });
      toolsObserver.disconnect();
    },
    { threshold: 0.25 }
  );

  if (toolImages[0]) toolsObserver.observe(toolImages[0].parentElement);

  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;
  let cursorX = pointerX;
  let cursorY = pointerY;
  let portraitX = 0;
  let portraitY = 0;
  let targetPortraitX = 0;
  let targetPortraitY = 0;

  window.addEventListener("pointermove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;

    if (!portrait || window.innerWidth <= 900) return;
    const rect = portrait.getBoundingClientRect();
    const isNearPortrait =
      event.clientX >= rect.left - 80 &&
      event.clientX <= rect.right + 80 &&
      event.clientY >= rect.top - 80 &&
      event.clientY <= rect.bottom + 80;

    if (isNearPortrait) {
      targetPortraitX = Math.max(-10, Math.min(10, ((event.clientX - rect.left) / rect.width - 0.5) * 20));
      targetPortraitY = Math.max(-10, Math.min(10, ((event.clientY - rect.top) / rect.height - 0.5) * 20));
    } else {
      targetPortraitX = 0;
      targetPortraitY = 0;
    }
  });

  document.querySelectorAll("a, button, .project-hero, .process-card").forEach((element) => {
    element.addEventListener("pointerenter", () => cursor?.classList.add("is-active"));
    element.addEventListener("pointerleave", () => cursor?.classList.remove("is-active"));
  });

  const updateScrollStory = () => {
    const scrollY = window.scrollY;

    if (heroSection && heroScroll) {
      const heroProgress = Math.max(0.08, Math.min(1, scrollY / Math.max(heroSection.offsetHeight, 1)));
      heroScroll.style.setProperty("--hero-progress", heroProgress);
    }

    if (processSection && processCards.length) {
      const rect = processSection.getBoundingClientRect();
      const distance = Math.max(processSection.offsetHeight - window.innerHeight, 1);
      const progress = Math.max(0, Math.min(1, -rect.top / distance));
      const activeIndex = Math.min(processCards.length - 1, Math.max(0, Math.round(progress * (processCards.length - 1))));

      processCards.forEach((card, index) => card.classList.toggle("is-active", index === activeIndex));
      if (processCurrent) processCurrent.textContent = `${String(activeIndex + 1).padStart(2, "0")} / 05`;
      processRail?.style.setProperty("--process-progress", Math.max(0.02, progress));
    }
  };

  const animate = () => {
    cursorX += (pointerX - cursorX) * 0.14;
    cursorY += (pointerY - cursorY) * 0.14;
    portraitX += (targetPortraitX - portraitX) * 0.08;
    portraitY += (targetPortraitY - portraitY) * 0.08;

    if (cursor) cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    if (portrait) {
      portrait.style.setProperty("--portrait-x", `${portraitX}px`);
      portrait.style.setProperty("--portrait-y", `${portraitY}px`);
    }

    requestAnimationFrame(animate);
  };

  window.addEventListener("scroll", updateScrollStory, { passive: true });
  window.addEventListener("resize", updateScrollStory);
  updateScrollStory();
  animate();
}
