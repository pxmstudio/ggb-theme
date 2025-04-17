class PxCollectionProducts extends HTMLElement {
  constructor() {
    super();
    console.log('PxCollectionPagination');
    this.productsGrid = this.querySelector('#CollectionProductsGrid');
    this.paginationContainer = this.querySelector('#PaginationContainer');
    this.sentinel = this.querySelector('[data-sentinel]');
    this.skeleton = this.querySelector('[data-skeleton]');

    this.isLoading = false;
    this.currentPage = 1;
    this.totalPages = 1;
  }

  connectedCallback() {
    this.initialize();
    // Listen for products-updated event from filters/sort
    this.addEventListener('products-updated', () => {
      this.reinitialize();
    });
  }

  reinitialize() {
    // Re-query elements since they were replaced
    this.productsGrid = this.querySelector('#CollectionProductsGrid');
    this.paginationContainer = this.querySelector('#PaginationContainer');
    this.sentinel = this.querySelector('[data-sentinel]');
    this.skeleton = this.querySelector('[data-skeleton]');

    // Reset state
    this.isLoading = false;
    this.currentPage = 1;
    this.totalPages = 1;

    // Reinitialize functionality
    this.initialize();
  }

  initialize() {
    // Delay initialization to ensure DOM is fully loaded
    setTimeout(() => {
      this.updatePaginationData();
      this.initInfiniteScroll();

      console.log('PxCollectionProducts initialized with pagination:', {
        currentPage: this.currentPage,
        totalPages: this.totalPages,
      });
    }, 0);
  }

  updatePaginationData() {
    // Get pagination data from container
    if (this.paginationContainer) {
      const currentPage = parseInt(this.paginationContainer.dataset.currentPage);
      const totalPages = parseInt(this.paginationContainer.dataset.totalPages);

      if (!isNaN(currentPage)) this.currentPage = currentPage;
      if (!isNaN(totalPages)) this.totalPages = totalPages;

      console.log('Pagination data from container:', { currentPage, totalPages });
    } else {
      // Fallback to URL params
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = urlParams.get('page');

      this.currentPage = pageParam ? parseInt(pageParam) : 1;
      // We can't determine total pages without the container, so we'll set a high number
      this.totalPages = 100;

      console.log('Pagination data from URL:', {
        currentPage: this.currentPage,
        totalPages: 'unknown, using 100 as fallback',
      });
    }
  }

  initInfiniteScroll() {
    if (!this.sentinel) {
      console.warn('Sentinel element not found for infinite scroll');
      return;
    }

    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px 0px 400px 0px', // Increased margin to load earlier
      threshold: 0.1, // Trigger when 10% of the sentinel is visible
    };

    // Disconnect any existing observer
    if (this.observer) {
      this.observer.disconnect();
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('Sentinel is visible, loading more results', {
            isLoading: this.isLoading,
            currentPage: this.currentPage,
            totalPages: this.totalPages,
          });

          if (!this.isLoading && this.currentPage < this.totalPages) {
            this.loadMoreProducts();
          }
        }
      });
    }, options);

    this.observer.observe(this.sentinel);
    console.log('Observer attached to sentinel');
  }

  async loadMoreProducts() {
    if (this.isLoading || this.currentPage >= this.totalPages) {
      console.log('Not loading more: already loading or at last page', {
        isLoading: this.isLoading,
        currentPage: this.currentPage,
        totalPages: this.totalPages,
      });
      return;
    }

    console.log('Loading more products for page', this.currentPage + 1);
    this.isLoading = true;

    // Show skeleton loader
    if (this.skeleton) {
      this.skeleton.classList.remove('hidden');
      this.skeleton.classList.add('grid');

      // Position the skeleton after the products grid
      const productsContainer = this.productsGrid?.querySelector('.grid');
      if (productsContainer) {
        productsContainer.after(this.skeleton);
        // Remove the forced scrolling
        console.log('Skeleton loader positioned and displayed');
      } else {
        console.warn('Could not find products container to position skeleton');
      }
    }

    // No need for a delay since we're not scrolling
    this.currentPage++;

    // Get current URL parameters
    const searchParams = new URLSearchParams(window.location.search);

    // Preserve sort parameter if it exists
    if (window.location.search.includes('sort_by')) {
      const sortByMatch = window.location.search.match(/sort_by=([^&]*)/);
      if (sortByMatch && sortByMatch[1]) {
        searchParams.set('sort_by', sortByMatch[1]);
      }
    }

    // Get filter parameters from collection filters component
    const filtersComponent = document.querySelector('px-collection-filters');
    if (filtersComponent && filtersComponent.form) {
      const formData = new FormData(filtersComponent.form);
      for (const [key, value] of formData.entries()) {
        searchParams.append(key, value);
      }
    }

    searchParams.set('page', this.currentPage);
    const url = `${window.location.pathname}?${searchParams.toString()}`;

    console.log('Fetching next page:', url);
    await this.fetchResults(url, true);

    // Hide skeleton loader
    if (this.skeleton) {
      this.skeleton.classList.add('hidden');
      this.skeleton.classList.remove('grid');
      console.log('Skeleton loader hidden after loading');
    }

    this.isLoading = false;

    // Re-observe the sentinel after loading
    if (this.sentinel && this.observer) {
      this.observer.observe(this.sentinel);
    }
  }

  async fetchResults(url, append = false) {
    try {
      // Make sure we're requesting the section data
      const separator = url.includes('?') ? '&' : '?';
      const finalUrl = `${url}${separator}sections=collection-products`;

      console.log('Fetching from URL:', finalUrl);
      const response = await fetch(finalUrl);
      const data = await response.json();

      if (data && data['collection-products']) {
        const html = data['collection-products'];
        const parser = new DOMParser();
        const newSectionHtml = parser.parseFromString(html, 'text/html');

        // Extract pagination data
        const newPaginationContainer = newSectionHtml.querySelector('#PaginationContainer');
        if (newPaginationContainer) {
          const newCurrentPage = parseInt(newPaginationContainer.dataset.currentPage);
          const newTotalPages = parseInt(newPaginationContainer.dataset.totalPages);

          console.log('New pagination data:', {
            currentPage: newCurrentPage,
            totalPages: newTotalPages,
          });

          // Update total pages regardless of append mode
          if (!isNaN(newTotalPages)) {
            this.totalPages = newTotalPages;
          }

          // Only update current page if not in append mode
          if (!append && !isNaN(newCurrentPage)) {
            this.currentPage = newCurrentPage;
          }

          // Update pagination container if it exists
          if (this.paginationContainer) {
            this.paginationContainer.dataset.currentPage = this.currentPage;
            this.paginationContainer.dataset.totalPages = this.totalPages;
          }
        }

        // Process products grid
        const newProductsGrid = newSectionHtml.querySelector('#CollectionProductsGrid');
        if (newProductsGrid && this.productsGrid) {
          if (append) {
            const productsContainer = this.productsGrid.querySelector('.grid');
            const newProductsContainer = newProductsGrid.querySelector('.grid');

            if (productsContainer && newProductsContainer) {
              // Get all product elements from the new container
              const newProducts = newProductsContainer.children;
              console.log(`Found ${newProducts.length} new products to append`);

              if (newProducts.length === 0) {
                console.warn('No new products found, might be at the end of collection');
                // We might be at the end even if pagination says otherwise
                this.currentPage = this.totalPages;
              } else {
                // Append each product individually to avoid HTML string issues
                Array.from(newProducts).forEach((product) => {
                  productsContainer.appendChild(product.cloneNode(true));
                });
              }
            } else {
              console.warn('Could not find grid containers for appending products');
            }
          } else {
            this.productsGrid.innerHTML = newProductsGrid.innerHTML;
          }
        }

        if (!append) {
          window.history.pushState({ path: url }, '', url);
        }

        // Reinitialize global animations on newly fetched content
        if (window.globalAnimations) {
          window.globalAnimations();
        }

        // Check if we need to hide the sentinel when we've loaded all pages
        if (this.currentPage >= this.totalPages && this.sentinel) {
          this.sentinel.style.display = 'none';
        }

        // Dispatch event to notify other components that products were updated
        this.dispatchEvent(
          new CustomEvent('products-updated', {
            bubbles: true,
            detail: {
              append,
              currentPage: this.currentPage,
              totalPages: this.totalPages,
            },
          })
        );

        console.log('After fetch, pagination status:', {
          currentPage: this.currentPage,
          totalPages: this.totalPages,
          hasMorePages: this.currentPage < this.totalPages,
        });
      } else {
        console.error('No section data returned from fetch');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      this.isLoading = false;
    }
  }

  // Public method to reset pagination and reload products
  resetAndLoad() {
    this.currentPage = 1;
    const url = `${window.location.pathname}${window.location.search}`;
    this.fetchResults(url, false);
  }

  disconnectedCallback() {
    // Clean up the observer when the component is removed
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

customElements.define('px-collection-products', PxCollectionProducts);
