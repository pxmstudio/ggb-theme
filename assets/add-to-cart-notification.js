class AddToCartNotification extends HTMLElement {
  constructor() {
    super();

    this.notification = this.querySelector('[data-notification]');
    this.closeBtn = this.notification.querySelector('[data-close]');
    this.productName = this.notification.querySelector('[data-product-name]');
    this.productImage = this.notification.querySelector('img');
    this.compareAtPrice = this.notification.querySelector('[data-compare-at-price]');
    this.price = this.notification.querySelector('[data-price]');

    // Bind event listeners
    this.handleProductAdded = this.handleProductAdded.bind(this);
    this.closeBtn.addEventListener('click', this.hide.bind(this));
    window.addEventListener('product:added', this.handleProductAdded);
  }

  handleProductAdded(event) {
    console.log('Product added event:', event);
    if (this.productImage && event.detail.image) {
      this.productImage.src = event.detail.image.url;
    }
    if (this.productName) {
      this.productName.textContent = event.detail.product.title;
    }
    if (this.compareAtPrice) {
      this.compareAtPrice.textContent = event.detail.product.compare_at_price
        ? `${event.detail.product.compare_at_price} `
        : '';
    }
    if (this.price) {
      this.price.textContent = `${event.detail.product.price} lei`;
    }
    this.show();
  }

  show() {
    this.notification.classList.remove('hidden');
    gsap.fromTo(this.notification, { opacity: 0, y: 20 }, { duration: 0.3, opacity: 1, y: 0 });
    setTimeout(() => this.hide(), 5000);
  }

  hide() {
    gsap.to(this.notification, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      onComplete: () => this.notification.classList.add('hidden'),
    });
  }

  disconnectedCallback() {
    window.removeEventListener('product:added', this.handleProductAdded);
  }
}

// Initialize the notification
customElements.define('add-to-cart-notification', AddToCartNotification);
