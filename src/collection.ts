document.addEventListener('DOMContentLoaded', () => {
  const priceFilter = document.querySelector('[pxm-filter="price"]');

  if (priceFilter) {
    if (rangeSlider) {
      rangeSlider(priceFilter);
    }
  }
});
