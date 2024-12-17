class CollectionFilters {
    private filterForm: HTMLElement | null;
    private productGrid: HTMLElement | null;

    constructor() {
      this.filterForm = document.getElementById('filter-form');
      this.productGrid = document.querySelector('.product-grid');
      this.bindEvents();
    }
  
    bindEvents() {
      if (!this.filterForm || !this.productGrid) return;

      // Handle filter form submission
      this.filterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.applyFilters(new FormData(e.target as HTMLFormElement));
      });
  
      // Handle filter removal buttons
      document.querySelectorAll('.filter-remove, .filter-reset, .filter-clear-all').forEach(button => {
        button.addEventListener('click', (e: any) => {
          this.fetchResults(e.target?.dataset.url || '');
        });
      });
  
      // Handle checkbox changes
      this.filterForm.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
          this.applyFilters(new FormData(this.filterForm as HTMLFormElement));
        });
      });
    }
  
    async fetchResults(url: string) {
      try {
        const response = await fetch(url);
        const html = await response.text();
        const parser = new DOMParser();
        const newDocument = parser.parseFromString(html, 'text/html');
  
        // Update product grid
        const newProducts = newDocument.querySelector('.product-grid');
        if (newProducts && this.productGrid) {
          this.productGrid.innerHTML = newProducts.innerHTML;
        }
  
        // Update filters
        const newFilters = newDocument.getElementById('filter-form');
        if (newFilters && this.filterForm) {
          this.filterForm.innerHTML = newFilters.innerHTML;
        }
  
        // Update URL without page reload
        window.history.pushState({ path: url }, '', url);
  
        // Reinitialize event listeners
        this.bindEvents();
  
      } catch (error) {
        console.error('Error updating filters:', error);
      }
    }
  
    applyFilters(formData: any) {
      const searchParams = new URLSearchParams(formData);
      const url = `${window.location.pathname}?${searchParams.toString()}`;
      this.fetchResults(url);
    }
  }
  
  // Initialize filters
  document.addEventListener('DOMContentLoaded', () => {
    new CollectionFilters();
  });