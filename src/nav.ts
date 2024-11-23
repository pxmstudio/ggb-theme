import { gsap } from "gsap";

document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector<HTMLButtonElement>(
    '[pxm-nav="mobile-btn"]'
  );

  const lines = document.querySelectorAll<HTMLDivElement>(
    '[pxm-nav="mobile-btn-line"]'
  );

  const menu = document.querySelector<HTMLDivElement>('[pxm-nav="menu"]');

  if (button) {
    let isOpen = false;

    button.addEventListener("click", () => {
      if (!lines || lines.length !== 3) return;

      if (isOpen) {
        const tl = gsap.timeline({ duration: 0.3 });

        tl.to(lines[0], { rotate: 0, y: 0 }, "<")
          .to(lines[1], { opacity: 1 }, "<")
          .to(lines[2], { rotate: 0, y: 0 }, "<");

        menu?.classList.add("hidden");
      } else {
        const tl = gsap.timeline({ duration: 0.3 });

        tl.to(lines[0], { rotate: 45, y: 6 }, "<")
          .to(lines[1], { opacity: 0 }, "<")
          .to(lines[2], { rotate: -45, y: -6 }, "<");

        menu?.classList.remove("hidden");
      }

      isOpen = !isOpen;
    });
  }
});
