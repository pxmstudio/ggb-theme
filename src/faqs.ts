document.addEventListener("DOMContentLoaded", () => {
  const faqsContainer = document.querySelectorAll('[pxm-faqs="container"]');

  faqsContainer.forEach((faq) => {
    const items = faq.querySelectorAll('[pxm-faqs="item"]');

    items.forEach((item) => {
      const header = item.querySelector('[pxm-faqs="item-header"]');
      const content = item.querySelector('[pxm-faqs="item-content"]');
      const icon = item.querySelector('[pxm-faqs="item-icon"]');

      if (header && content) {
        let visible = false;

        header.addEventListener("click", () => {
          const tl = gsap.timeline({ duration: 0.3 });

          if (visible) {
            tl.to(content, { opacity: 0 }, "<");

            if (icon) {
              tl.to(icon, { rotate: 0 }, "<");
            }

            tl.to(content, { display: "none" }, "<");
          } else {
            tl.to(content, { opacity: 1, display: "block" }, "<");

            if (icon) {
              tl.to(icon, { rotate: 180 }, "<");
            }
          }

          visible = !visible;
          item.setAttribute("data-visible", visible ? "true" : "false");
        });
      }
    });
  });
});
