function initBfCollectionsSlider() {
  const slider = document.querySelector('[data-bf-slider]');
  const prev = slider.querySelector('[data-bf-prev]');
  const next = slider.querySelector('[data-bf-next]');
  const viewport = slider.querySelector('[data-bf-viewport]') || slider; // fallback

  // Guard: initialize only once
  if (slider.dataset.swiperInit === 'true') return;
  if (viewport && viewport.swiper && viewport.swiper.initialized && !viewport.swiper.destroyed) {
    slider.dataset.swiperInit = 'true';
    return;
  }

  if (window.Swiper && viewport) {
    const instance = new Swiper(viewport, {
      slidesPerView: 'auto',
      spaceBetween: 12,
      navigation: {
        prevEl: prev,
        nextEl: next,
      },
    });
    slider.dataset.swiperInit = 'true';
    slider.__bfSwiper = instance;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Ensure collection context is set from URL on refresh
  var __bfHandle = '';
  try {
    var form = document.getElementById('filter-form');
    if (form) {
      var params = new URLSearchParams(window.location.search);
      var handle = params.get('bf_collection') || '';
      __bfHandle = handle;
      var desiredUrl = '/collections/' + encodeURIComponent(handle || 'all');
      if (form.dataset) {
        form.dataset.collectionUrl = desiredUrl;
      }
      // Mark active chip
      var anyActive = false;
      document.querySelectorAll('[data-bf-handle]')?.forEach(function (a) {
        var h = a.getAttribute('data-bf-handle') || '';
        var item = a.closest('.bf-slider-item');
        if (item) {
          if (h === handle) item.classList.add('is-active');
          else item.classList.remove('is-active');
          if (h === handle) anyActive = true;
        }
      });
      // Default: if nothing matched or no handle, set the first ("Toate produsele") active
      if (!anyActive) {
        var def = document.querySelector('[data-bf-handle=""]');
        var defItem = def && def.closest ? def.closest('.bf-slider-item') : null;
        if (defItem) defItem.classList.add('is-active');
      }

      // Keep URL as-is so refresh preserves the selected collection
    }
  } catch (e) {}

  // Robust init: retry until Swiper and DOM are ready
  (function ensureInit(attempt) {
    if (attempt > 20) return; // ~3s max
    const viewport = document.querySelector('[data-bf-viewport]');
    if (window.Swiper && viewport) {
      if (!(viewport.swiper && viewport.swiper.initialized && !viewport.swiper.destroyed)) {
        initBfCollectionsSlider();
      } else {
        const slider = document.querySelector('[data-bf-slider]');
        if (slider) slider.dataset.swiperInit = 'true';
      }
      // Keep slug in URL to reflect current selection and avoid UI mismatches
      return;
    }
    setTimeout(function () {
      ensureInit(attempt + 1);
    }, 150);
  })(0);
});
