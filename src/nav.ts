document.addEventListener("DOMContentLoaded", function () {
  console.log("Running nav.ts");
  const button = document.querySelector<HTMLButtonElement>(
    '[pxm-nav="mobile-btn"]'
  );

  const lines = document.querySelectorAll<HTMLDivElement>(
    '[pxm-nav="mobile-btn-line"]'
  );

  const menu = document.querySelector<HTMLDivElement>('[pxm-nav="menu"]');
  
  const mobileCategoriesContainer = document.querySelector<HTMLDivElement>(
    '[data-mobile-categories-container]'
  );
  const mobileSubcategoriesContainer = document.querySelector<HTMLDivElement>(
    '[data-mobile-subcategories-container]'
  );

  if (button) {
    let isOpen = false;

    button.addEventListener("click", () => {
      if (!lines || lines.length !== 3) return;

      if (isOpen) {
        const tl = gsap.timeline({ duration: 0.3 });

        tl.to(lines[0], { rotate: 0, y: 0 }, "<")
          .to(lines[1], { opacity: 1 }, "<")
          .to(lines[2], { rotate: 0, y: 0 }, "<");

        menu?.classList.add("hidden");
        document.documentElement.classList.remove("overflow-hidden");
        document.body.classList.remove("overflow-hidden");
        
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

        tl.to(lines[0], { rotate: 45, y: 6 }, "<")
          .to(lines[1], { opacity: 0 }, "<")
          .to(lines[2], { rotate: -45, y: -6 }, "<");

        menu?.classList.remove("hidden");
        document.documentElement.classList.add("overflow-hidden");
        document.body.classList.add("overflow-hidden");
      }

      isOpen = !isOpen;
    });
  }

  const searchForm = document.querySelector<HTMLFormElement>(
    '[pxm-search="form"]'
  );
  const searchInput = document.querySelector<HTMLInputElement>(
    '[pxm-search="input"]'
  );
  const searchResultsContainer = document.querySelector<HTMLDivElement>(
    '[pxm-search="results-container"]'
  );

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (e) => {
      console.log("Form submitted in nav.ts");
      e.preventDefault();
      const searchQuery = searchInput.value.trim();
      if (!searchQuery) return;
      const searchUrl = new URL("/search", window.location.origin);
      searchUrl.searchParams.set("q", searchQuery);
      window.location.href = searchUrl.toString();
    });

    searchInput.addEventListener("input", async (e) => {
      const value = (e.target as HTMLInputElement).value;

      if (value === "") {
        if (searchResultsContainer) {
          searchResultsContainer.innerHTML = "";
        }

        return;
      }

      const res = await fetch(`/search/suggest?q=${value}&section_id=header`);
      const data = await res.text();

      if (searchResultsContainer) {
        const dataHtml = new DOMParser().parseFromString(data, "text/html");
        const newResults = dataHtml.querySelector<HTMLDivElement>(
          '[pxm-search="results"]'
        );

        if (newResults) {
          searchResultsContainer.innerHTML = "";
          searchResultsContainer.appendChild(newResults);
        }
      }
    });

    document.addEventListener("click", (event) => {
      if (
        !searchResultsContainer?.contains(event.target as Node) &&
        event.target !== searchInput
      ) {
        if (searchResultsContainer) {
          searchResultsContainer.innerHTML = "";
          searchInput.value = "";
        }
      }
    });
  }
});
