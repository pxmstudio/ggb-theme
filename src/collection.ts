document.addEventListener('DOMContentLoaded', () => {
  const priceFilter = document.querySelector('[pxm-filter="price"]') as any;

  if (priceFilter && rangeSlider) {
    console.log(priceFilter);

    console.log(
      priceFilter.dataset.min,
      priceFilter.dataset.max,
      priceFilter.dataset.minCurrent,
      priceFilter.dataset.maxCurrent
    );

    rangeSlider(priceFilter, {
      min: priceFilter.dataset.min,
      max: priceFilter.dataset.max,
      value: [priceFilter.dataset.minCurrent, priceFilter.dataset.maxCurrent],
      onInput: (value: any) => {
        console.log(value, value[0], value[1]);
        const inputLower = priceFilter.childNodes[0] as HTMLInputElement;
        const inputUpper = priceFilter.childNodes[1] as HTMLInputElement;

        if (!inputLower || !inputUpper) {
          console.log('Range slider does not have input fields.');
          return;
        }

        inputLower.disabled = false;
        inputUpper.disabled = false;

        inputLower.id = `Filter-filter.v.price.gte`;
        inputLower.name = 'filter.v.price.gte';

        inputUpper.id = `Filter-filter.v.price.lte`;
        inputUpper.name = 'filter.v.price.lte';

        inputLower.defaultValue = value[0];
        inputUpper.defaultValue = value[1];

        console.log(inputLower);
        console.log(inputUpper);
      },
    });
  }

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
