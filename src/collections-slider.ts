document.addEventListener("DOMContentLoaded", () => {
  const collectionSlidersWrappers = document.querySelectorAll<HTMLElement>(
    "[pxm-collections-slider='wrapper']"
  );

  collectionSlidersWrappers.forEach((collectionSliderWrapper) => {
    const btnNext = collectionSliderWrapper.querySelector<HTMLButtonElement>(
      "[pxm-swiper='btn-next']"
    );
    const btnPrev = collectionSliderWrapper.querySelector<HTMLButtonElement>(
      "[pxm-swiper='btn-prev']"
    );
    const collectionSlider = collectionSliderWrapper.querySelector<HTMLElement>(
      "[pxm-collections-slider='swiper']"
    );

    const options = {
      slidesPerView: 4,
      spaceBetween: 20,
      navigation: {
        nextEl: btnNext,
        prevEl: btnPrev,
      },
      breakpoints: {
        1024: {
          slidesPerView: 4,
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
      new Swiper(collectionSlider, options);
    }
  });
});
