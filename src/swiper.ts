document.addEventListener("DOMContentLoaded", () => {
  const swiperWrappers = document.querySelectorAll<HTMLElement>(
    "[pxm-swiper='wrapper']"
  );

  swiperWrappers.forEach((swipperWrapper) => {
    const btnNext = swipperWrapper.querySelector<HTMLButtonElement>(
      "[pxm-swiper='btn-next']"
    );
    const btnPrev = swipperWrapper.querySelector<HTMLButtonElement>(
      "[pxm-swiper='btn-prev']"
    );

    const swiper = swipperWrapper.querySelector<HTMLElement>(
      "[pxm-swiper='swiper']"
    );

    const slidesPerView = swiper?.getAttribute("pxm-slides-per-view") || 4;
    const spaceBetween = swiper?.getAttribute("pxm-slides-space-between") || 20;

    const options = {
      slidesPerView: slidesPerView,
      spaceBetween: spaceBetween,
      navigation: {
        nextEl: btnNext,
        prevEl: btnPrev,
      },
      breakpoints: {
        1024: {
          slidesPerView: slidesPerView,
        },
        768: {
          slidesPerView: 3,
        },
        480: {
          slidesPerView: 2,
        },
        320: {
          slidesPerView: 2,
        },
      },
    };

    // @ts-ignore
    if (Swiper) {
      // @ts-ignore
      new Swiper(swiper, options);
    }
  });
});
