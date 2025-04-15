document.addEventListener('DOMContentLoaded', function () {
  // Get elements
  const mobileCategoriesTrigger = document.querySelector('[data-mobile-categories]');
  const mobileCategoriesContainer = document.querySelector('[data-mobile-categories-container]');
  const mobileCategoriesBack = document.querySelector('[data-mobile-categories-back]');

  // Subcategories elements
  const mobileSubcategoriesContainer = document.querySelector('[data-mobile-subcategories-container]');
  const mobileSubcategoriesBack = document.querySelector('[data-mobile-subcategories-back]');
  const subcategoriesTitle = document.querySelector('[data-subcategories-title]');
  const subcategoriesList = document.querySelector('[data-subcategories-list]');

  // Parse menu data from embedded JSON
  let menuData = {};
  const menuDataScript = document.getElementById('mobile-menu-data');
  if (menuDataScript) {
    try {
      const parsedData = JSON.parse(menuDataScript.textContent);
      // Convert categories array to object indexed by handle
      menuData = parsedData.categories.reduce((acc, category) => {
        acc[category.handle] = category;
        return acc;
      }, {});
    } catch (e) {
      console.error('Error parsing mobile menu data:', e);
      menuData = {}; // Fallback to empty object on error
    }
  } else {
    console.error('Mobile menu data script tag not found.');
  }

  // Function to open mobile categories with GSAP animation
  function openMobileCategories() {
    if (mobileCategoriesContainer) {
      // Show the container
      mobileCategoriesContainer.classList.remove('hidden');

      // Animate from right to left using GSAP
      gsap.fromTo(
        mobileCategoriesContainer,
        {
          x: '100%',
        },
        {
          x: '0%',
          duration: 0.5,
          ease: 'power2.out',
        }
      );
    }
  }

  // Function to close mobile categories with GSAP animation
  function closeMobileCategories() {
    if (mobileCategoriesContainer) {
      // Animate to right using GSAP
      gsap.to(mobileCategoriesContainer, {
        x: '100%',
        duration: 0.5,
        ease: 'power2.in',
        onComplete: function () {
          // Hide after animation completes
          mobileCategoriesContainer.classList.add('hidden');
        },
      });
    }
  }

  // Function to open subcategories with GSAP animation
  function openSubcategories(categoryTitle, subcategories) {
    if (mobileSubcategoriesContainer && subcategoriesTitle && subcategoriesList) {
      // Set the title
      subcategoriesTitle.textContent = categoryTitle;

      // Clear previous subcategories
      subcategoriesList.innerHTML = '';

      // Add subcategories
      subcategories.forEach((subcategory) => {
        const link = document.createElement('a');
        link.href = subcategory.url;
        link.className =
          'flex items-center justify-between p-4 text-text-primary hover:bg-bg-secondary rounded-xl transition-colors';

        const span = document.createElement('span');
        span.textContent = subcategory.title;
        link.appendChild(span);

        subcategoriesList.appendChild(link);
      });

      // Show the container
      mobileSubcategoriesContainer.classList.remove('hidden');

      // Animate from right to left using GSAP
      gsap.fromTo(
        mobileSubcategoriesContainer,
        {
          x: '100%',
        },
        {
          x: '0%',
          duration: 0.5,
          ease: 'power2.out',
        }
      );
    }
  }

  // Function to close subcategories with GSAP animation
  function closeSubcategories() {
    if (mobileSubcategoriesContainer) {
      // Animate to right using GSAP
      gsap.to(mobileSubcategoriesContainer, {
        x: '100%',
        duration: 0.5,
        ease: 'power2.in',
        onComplete: function () {
          // Hide after animation completes
          mobileSubcategoriesContainer.classList.add('hidden');
        },
      });
    }
  }

  // Event listeners
  if (mobileCategoriesTrigger) {
    mobileCategoriesTrigger.addEventListener('click', function (e) {
      e.preventDefault();
      openMobileCategories();
    });
  }

  if (mobileCategoriesBack) {
    mobileCategoriesBack.addEventListener('click', function (e) {
      e.preventDefault();
      closeMobileCategories();
    });
  }

  if (mobileSubcategoriesBack) {
    mobileSubcategoriesBack.addEventListener('click', function (e) {
      e.preventDefault();
      closeSubcategories();
    });
  }

  // Category trigger buttons
  const categoryTriggers = document.querySelectorAll('[data-category-trigger]');
  categoryTriggers.forEach((trigger) => {
    trigger.addEventListener('click', function () {
      const categoryHandle = this.getAttribute('data-category-trigger');
      const category = menuData[categoryHandle];

      if (category && category.links && category.links.length > 0) {
        openSubcategories(category.title, category.links);
      }
    });
  });

  // Close on escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (!mobileSubcategoriesContainer.classList.contains('hidden')) {
        closeSubcategories();
      } else if (!mobileCategoriesContainer.classList.contains('hidden')) {
        closeMobileCategories();
      }
    }
  });
});
