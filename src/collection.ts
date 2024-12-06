document.addEventListener('DOMContentLoaded', () => {
  // const priceFilter = document.querySelector('[pxm-filter="price"]');

  // if (priceFilter) {
  //   if (rangeSlider) {
  //     const rangeSliderElement = rangeSlider(priceFilter, {
  //       onInput: (value: any, userInteraction: any) => {
  //         console.log(value, userInteraction);
  //       },
  //     });
  //     console.log(rangeSliderElement);
  //   }
  // }

  const filters = document.querySelector<HTMLElement>('[pxm-filter="filters"]');
  const toggleFilters = document.querySelector<HTMLButtonElement>('[pxm-filter="toggle-filters"]');

  if (filters && toggleFilters) {
    let isOpen = false;

    toggleFilters.addEventListener('click', () => {
      filters.classList.toggle('hidden');
      isOpen = !isOpen;

      if (isOpen) {
        toggleFilters.setAttribute('aria-expanded', 'true');
        toggleFilters.style.transform = 'rotate(180deg)';
        filters.classList.add('flex');
      } else {
        toggleFilters.setAttribute('aria-expanded', 'false');
        toggleFilters.style.transform = 'rotate(0deg)';
        filters.classList.remove('flex');
      }
    });
  }
});
