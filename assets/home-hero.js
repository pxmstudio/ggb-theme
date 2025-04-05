document.addEventListener('DOMContentLoaded', function () {
  var swiper = new Swiper('.home-hero_swiper', {
    loop: true,
    slidesPerView: 1,
    autoplay: {
      delay: 3000,
    },
    speed: 1500,
    pagination: {
      el: '.home-hero_swiper-pagination',
      clickable: true,
    },
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const categoryElements = document.querySelectorAll('.home-hero_category');
  const parentElement = document.querySelector('.home-hero_left');
  const subcategoriesWrapper = document.querySelector('.home-hero_subcategories-wrapper');
  const headingElement = document.querySelector('.home-hero_subcategories-inner .heading-h4');
  const subcategoryGroups = document.querySelectorAll('.subcategory-group');

  // Initially hide the subcategories wrapper
  if (subcategoriesWrapper) {
    gsap.set(subcategoriesWrapper, { opacity: 0, display: 'none' });
  }

  function hideSubcategories() {
    // Remove 'is-active' from all categories
    categoryElements.forEach((el) => el.classList.remove('is-active'));

    // Hide the subcategories wrapper
    if (subcategoriesWrapper) {
      gsap.to(subcategoriesWrapper, {
        opacity: 0,
        duration: 0.15,
        onComplete: () => {
          gsap.set(subcategoriesWrapper, { display: 'none' });
          // Hide all subcategory groups
          subcategoryGroups.forEach((group) => group.classList.add('hidden'));
        },
      });
    }
  }

  categoryElements.forEach((category) => {
    category.addEventListener('mouseenter', () => {
      // Check if category has subcategories
      const hasSubcategories = category.dataset.hasSubcategories === 'true';

      if (!hasSubcategories) {
        // If hovering over a category without subcategories, hide the panel
        hideSubcategories();
        return;
      }

      // Remove 'is-active' class from all categories
      categoryElements.forEach((el) => el.classList.remove('is-active'));
      // Add 'is-active' class to the hovered category
      category.classList.add('is-active');

      // Extract the text from the current category title
      const categoryTitle = category.querySelector('.home-hero_category-title')?.textContent || '';

      // Hide all subcategory groups
      subcategoryGroups.forEach((group) => group.classList.add('hidden'));

      // Show the matching subcategory group
      const matchingGroup = document.querySelector(`[data-category="${categoryTitle}"]`);

      // Fade out the subcategories wrapper
      if (subcategoriesWrapper && matchingGroup) {
        gsap.to(subcategoriesWrapper, {
          opacity: 0,
          duration: 0.15,
          onComplete: () => {
            // Update the heading text after opacity reaches 0
            if (headingElement) {
              headingElement.textContent = categoryTitle;
            }

            // Show the matching subcategory group
            matchingGroup.classList.remove('hidden');

            // Fade in the subcategories wrapper with the updated content
            gsap.set(subcategoriesWrapper, { display: 'block' });
            gsap.to(subcategoriesWrapper, { opacity: 1, duration: 0.15 });
          },
        });
      }
    });
  });

  parentElement.addEventListener('mouseleave', hideSubcategories);
});
