class PxAddToCart extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // AJAX add-to-cart functionality
    const form = this.querySelector('form[action^="/cart/add"]');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        fetch('/cart/add.js', {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((err) => {
                throw err;
              });
            }
            return response.json();
          })
          .then(async (data) => {
            console.log('Before dispatching event:', data);
            const comparePrice = document.querySelector('[data-compare-price]')?.textContent.trim();
            const event = new CustomEvent('product:added', {
              bubbles: true,
              detail: {
                product: {
                  title: data.product_title,
                  price: data.price,
                  compare_at_price: comparePrice || data.compare_at_price,
                  untranslated_product_title: data.product_title,
                },
                image: {
                  url: data.featured_image?.url || data.image,
                },
              },
            });
            console.log('Dispatching event:', event);
            window.dispatchEvent(event);
          })
          .catch((error) => {
            console.error('Error adding to cart:', error);
            alert('Eroare la adăugarea produsului în coș. Vă rugăm încercați din nou.');
          });
      });
    }
  }
}

customElements.define('px-add-to-cart', PxAddToCart);
