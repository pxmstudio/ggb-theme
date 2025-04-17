document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu elements
  const mobileBtn = document.querySelector('[pxm-nav="mobile-btn"]');
  const mobileBtnLines = document.querySelectorAll('[pxm-nav="mobile-btn-line"]');
  const menu = document.querySelector('[pxm-nav="menu"]');
  const mobileCategoriesContainer = document.querySelector('[data-mobile-categories-container]');
  const mobileSubcategoriesContainer = document.querySelector('[data-mobile-subcategories-container]');

  // Mobile menu functionality
  if (mobileBtn) {
    let isOpen = false;
    mobileBtn.addEventListener('click', () => {
      if (!mobileBtnLines || mobileBtnLines.length !== 3) return;

      if (isOpen) {
        const tl = gsap.timeline({ duration: 0.3 });
        tl.to(mobileBtnLines[0], { rotate: 0, y: 0 }, '<')
          .to(mobileBtnLines[1], { opacity: 1 }, '<')
          .to(mobileBtnLines[2], { rotate: 0, y: 0 }, '<');

        menu?.classList.add('hidden');
        document.documentElement.classList.remove('overflow-hidden');
        document.body.classList.remove('overflow-hidden');

        if (mobileCategoriesContainer) {
          mobileCategoriesContainer.classList.add('hidden');
          gsap.set(mobileCategoriesContainer, { x: '100%' });
        }
        if (mobileSubcategoriesContainer) {
          mobileSubcategoriesContainer.classList.add('hidden');
          gsap.set(mobileSubcategoriesContainer, { x: '100%' });
        }
      } else {
        const tl = gsap.timeline({ duration: 0.3 });
        tl.to(mobileBtnLines[0], { rotate: 45, y: 6 }, '<')
          .to(mobileBtnLines[1], { opacity: 0 }, '<')
          .to(mobileBtnLines[2], { rotate: -45, y: -6 }, '<');

        menu?.classList.remove('hidden');
        document.documentElement.classList.add('overflow-hidden');
        document.body.classList.add('overflow-hidden');
      }

      isOpen = !isOpen;
    });
  }

  // Search functionality
  const searchForm = document.querySelector('[pxm-search="form"]');
  const searchInput = document.querySelector('[pxm-search="input"]');
  const searchResultsContainer = document.querySelector('[pxm-search="results-container"]');
  const searchSubmitButton = searchForm?.querySelector('button[type="submit"]');

  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const searchQuery = searchInput.value.trim();
      if (!searchQuery) {
        return;
      }

      const searchUrl = new URL('/search', window.location.origin);
      searchUrl.searchParams.set('q', searchQuery);
      window.location.href = searchUrl.toString();
    });

    searchInput.addEventListener('input', async (e) => {
      const value = e.target.value;

      if (value === '') {
        if (searchResultsContainer) {
          searchResultsContainer.innerHTML = '';
        }
        return;
      }

      try {
        const res = await fetch(`/search/suggest?q=${value}&section_id=header`);
        const data = await res.text();

        if (searchResultsContainer) {
          const dataHtml = new DOMParser().parseFromString(data, 'text/html');
          const newResults = dataHtml.querySelector('[pxm-search="results"]');

          if (newResults) {
            searchResultsContainer.innerHTML = '';
            searchResultsContainer.appendChild(newResults);
          }
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    });

    document.addEventListener('click', (event) => {
      // Check if the click target is the submit button
      if (event.target === searchSubmitButton || searchSubmitButton?.contains(event.target)) {
        return; // Do nothing if the click is on the submit button
      }

      if (!searchResultsContainer?.contains(event.target) && event.target !== searchInput) {
        if (searchResultsContainer) {
          searchResultsContainer.innerHTML = '';
          searchInput.value = '';
        }
      }
    });
  }
});
