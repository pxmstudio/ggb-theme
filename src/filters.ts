document.addEventListener('DOMContentLoaded', () => {
  const filterForm = document.getElementById('filter-form') as HTMLFormElement;
  const priceFilter = document.querySelector('[pxm-filter="price"]') as any;

  if (!filterForm) {
    console.log('Filter form does not exist');
    return;
  }

  if (priceFilter && rangeSlider) {
    let placeholdersRemoved = false;

    rangeSlider(priceFilter, {
      min: priceFilter.dataset.min,
      max: priceFilter.dataset.max,
      value: [priceFilter.dataset.minCurrent, priceFilter.dataset.maxCurrent],
      onInput: (value: any) => {
        if (!placeholdersRemoved) {
          const placeHolderGteInput = filterForm.querySelector('#placeholder-gte');
          const placeHolderLteInput = filterForm.querySelector('#placeholder-lte');

          placeHolderGteInput?.remove();
          placeHolderLteInput?.remove();
          
          placeholdersRemoved = true; // Mark as removed to prevent repeated removal
        }

        const inputLower = priceFilter.childNodes[0] as HTMLInputElement;
        const inputUpper = priceFilter.childNodes[1] as HTMLInputElement;
        const firstDot = priceFilter.childNodes[2] as HTMLElement;
        const secondDot = priceFilter.childNodes[3] as HTMLElement;

        if (!inputLower || !inputUpper) {
          console.log('Range slider does not have input fields.');
          return;
        }

        inputLower.disabled = false;
        inputUpper.disabled = false;

        inputLower.defaultValue = value[0];
        inputUpper.defaultValue = value[1];

        // Reset IDs and names
        inputLower.id = '';
        inputLower.name = '';
        inputUpper.id = '';
        inputUpper.name = '';

        // Determine which dot has the data-lower attribute
        if (firstDot.hasAttribute('data-lower')) {
          inputLower.id = `Filter-filter.v.price.gte`;
          inputLower.name = 'filter.v.price.gte';

          inputUpper.id = `Filter-filter.v.price.lte`;
          inputUpper.name = 'filter.v.price.lte';
        } else if (secondDot.hasAttribute('data-lower')) {
          inputLower.id = `Filter-filter.v.price.lte`;
          inputLower.name = 'filter.v.price.lte';

          inputUpper.id = `Filter-filter.v.price.gte`;
          inputUpper.name = 'filter.v.price.gte';
        } else {
          inputLower.id = `Filter-filter.v.price.gte`;
          inputLower.name = 'filter.v.price.gte';

          inputUpper.id = `Filter-filter.v.price.lte`;
          inputUpper.name = 'filter.v.price.lte';
        }

        debouncedSubmitFormRangeInput();
      },
    });
  }

  function submitForm() {
    filterForm.submit();
  }

  const debouncedSubmitForm = debounce(submitForm, 1000);
  const debouncedSubmitFormRangeInput = debounce(submitForm, 2000);

  // Add event listeners for all form elements
  filterForm.addEventListener('input', debouncedSubmitForm);
  filterForm.addEventListener('change', debouncedSubmitForm);
});

function debounce(func: any, delay: number) {
  let timeout: number;
  return function (...args: any) {
    clearTimeout(timeout);
    // @ts-ignore
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}
