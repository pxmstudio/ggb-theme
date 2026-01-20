interface TabsConfig {
  triggers: HTMLElement;
  content: HTMLElement;
}

interface NumberInputConfig {
  container: HTMLElement;
  input: HTMLInputElement;
  decrementButton: HTMLButtonElement;
  incrementButton: HTMLButtonElement;
  max?: number;
  min?: number;
  onChange?: (value: number) => void;
}

class NumberInput {
  private config: NumberInputConfig;
  private currentValue: number;

  constructor(config: NumberInputConfig) {
    this.config = config;
    this.currentValue = parseInt(this.config.input.value) || 0;
    this.init();
  }

  private init(): void {
    this.config.decrementButton.addEventListener('click', () => this.decrement());
    this.config.incrementButton.addEventListener('click', () => this.increment());
    this.config.input.addEventListener('input', () => this.handleInputChange());
    this.config.input.addEventListener('blur', () => this.validateInput());
  }

  private handleInputChange(): void {
    const value = parseInt(this.config.input.value) || 0;
    this.updateValue(value);
  }

  private validateInput(): void {
    const min = this.config.min ?? 1;
    const max = this.config.max;
    let value = parseInt(this.config.input.value) || min;

    value = Math.max(min, value);
    if (max !== undefined) {
      value = Math.min(max, value);
    }

    this.updateValue(value);
  }

  private decrement(): void {
    const min = this.config.min ?? 1;
    this.updateValue(Math.max(min, this.currentValue - 1));
  }

  private increment(): void {
    const max = this.config.max;
    const newValue = this.currentValue + 1;
    this.updateValue(max !== undefined ? Math.min(max, newValue) : newValue);
  }

  private updateValue(value: number): void {
    this.currentValue = value;
    this.config.input.value = value.toString();
    this.config.onChange?.(value);

    // Update button states
    this.config.decrementButton.disabled = value <= (this.config.min ?? 1);
    if (this.config.max !== undefined) {
      this.config.incrementButton.disabled = value >= this.config.max;
    }
  }
}

class Tabs {
  private triggers: HTMLElement;
  private content: HTMLElement;
  private activeValue: string | null = null;

  constructor(config: TabsConfig) {
    this.triggers = config.triggers;
    this.content = config.content;
    this.init();
  }

  private init(): void {
    // Set initial state
    const activeElement = this.triggers.querySelector<HTMLElement>('[data-active="true"]');
    if (activeElement) {
      this.activeValue = activeElement.dataset.value ?? null;
      this.updateContentVisibility();
    }

    this.triggers.addEventListener('click', (event) => this.handleClick(event));

    // Add keyboard navigation
    this.triggers.addEventListener('keydown', (event) => this.handleKeyboardNavigation(event));
  }

  private handleKeyboardNavigation(event: KeyboardEvent): void {
    if (!(event.target instanceof HTMLElement)) return;
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

    const buttons = Array.from(this.triggers.querySelectorAll<HTMLButtonElement>('button'));
    const currentIndex = buttons.indexOf(event.target as HTMLButtonElement);
    let nextIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
        nextIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
        break;
      case 'ArrowRight':
        nextIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = buttons.length - 1;
        break;
    }

    buttons[nextIndex]?.focus();
    event.preventDefault();
  }

  private handleClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.tagName !== 'BUTTON') return;

    const value = target.dataset.value;
    if (!value) return;

    const isActive = target.dataset.active === 'true';

    if (isActive) {
      this.deactivateTab(target);
    } else {
      this.activateTab(target);
    }

    // Dispatch custom event for external listeners
    this.triggers.dispatchEvent(
      new CustomEvent('tab-change', {
        detail: { value: this.activeValue },
        bubbles: true,
      })
    );
  }

  private deactivateTab(trigger: HTMLElement): void {
    trigger.setAttribute('data-active', 'false');
    trigger.setAttribute('aria-selected', 'false');
    this.activeValue = null;
    this.updateContentVisibility();
  }

  private activateTab(trigger: HTMLElement): void {
    this.setAllTriggersFalse();

    trigger.setAttribute('data-active', 'true');
    trigger.setAttribute('aria-selected', 'true');
    this.activeValue = trigger.dataset.value ?? null;

    this.updateContentVisibility();
  }

  private updateContentVisibility(): void {
    const allContent = this.content.querySelectorAll('[data-value]');
    allContent.forEach((element) => {
      const isActive = element.getAttribute('data-value') === this.activeValue;
      element.classList.toggle('hidden', !isActive);
      if (element instanceof HTMLElement) {
        element.setAttribute('aria-hidden', (!isActive).toString());
      }
    });
  }

  private setAllTriggersFalse(): void {
    this.triggers.querySelectorAll('[data-active="true"]').forEach((trigger) => {
      trigger.setAttribute('data-active', 'false');
      trigger.setAttribute('aria-selected', 'false');
    });
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize number inputs
  document.querySelectorAll<HTMLElement>('[pxm-input="number"]').forEach((container) => {
    const input = container.querySelector<HTMLInputElement>('input');
    const [decrementButton, incrementButton] = Array.from(container.querySelectorAll<HTMLButtonElement>('button'));

    if (input && decrementButton && incrementButton) {
      new NumberInput({
        container,
        input,
        decrementButton,
        incrementButton,
        max: input.getAttribute('max') ? parseInt(input.getAttribute('max')!) : undefined,
        min: input.getAttribute('min') ? parseInt(input.getAttribute('min')!) : 1,
        onChange: (value) => {
          // Dispatch custom event for external listeners
          container.dispatchEvent(
            new CustomEvent('quantity-change', {
              detail: { value },
              bubbles: true,
            })
          );
        },
      });
    }
  });

  // Initialize tabs
  document.querySelectorAll<HTMLElement>('[pxm-tabs="triggers"]').forEach((triggersElement) => {
    console.log('triggersElement', triggersElement);

    const contentElement = triggersElement.parentElement?.querySelector<HTMLElement>('[pxm-tabs="content"]');
    if (contentElement) {
      new Tabs({ triggers: triggersElement, content: contentElement });
    }
  });

  // Recently viewed products
  const recentlyViewedProductsElement = document.getElementById('recently-viewed-products');

  if (!recentlyViewedProductsElement) {
    console.warn(recentlyViewedProductsElement);
    return;
  }

  let recentlyViewedProducts = getCookie('recentlyViewedProducts');

  if (!recentlyViewedProducts) {
    setCookie('recentlyViewedProducts', '', 7);
    recentlyViewedProducts = getCookie('recentlyViewedProducts');
  }

  const productHandle = recentlyViewedProductsElement.dataset.productHandle as string;
  if (!productHandle) {
    console.warn('Product ID was not found.');
    return;
  }

  const newRecentlyViewedProducts = addRecentlyViewedProduct(productHandle, recentlyViewedProducts);
  setCookie('recentlyViewedProducts', newRecentlyViewedProducts, 7);

  // Display recently viewed products
  const products = recentlyViewedProducts.split(',');

  for (const handle of products) {
    const product = await productAPI.getProduct(handle);
    if (product) {
      const productHtml = `
        <a href="${product.url}" class="w-full h-full group" pxm-product="item">
          <div class="w-full aspect-square relative rounded-2xl overflow-hidden border border-border-primary">
            <img
              src="${product.featured_image}"
              width="auto"
              height="300"
              class="absolute top-0 bottom-0 left-0 right-0 object-cover object-center w-full h-full group-hover:scale-110 global-transition"
              pxm-product="image"
            >
            ${
              product.compare_at_price > product.price
                ? `
              <span
                class="absolute top-0 left-0 bg-error-red text-white px-2 py-1 rounded-br-2xl text-sm font-medium"
                pxm-product="discount"
              >
                Reducere ${Math.round(((product.compare_at_price - product.price) * 100.0) / product.compare_at_price)}%
              </span>
              `
                : ''
            }
          </div>
          <div class="pt-4">
            <h3 class="text-text-primary lg:text-lg font-semibold leading-normal mb-2" pxm-product="title line-clamp-3">
              ${product.title}
            </h3>
            <div class="flex items-center gap-4">
              <p class="text-text-secondary lg:text-lg font-semibold line-through" pxm-product="compare-price">
                 ${productAPI.formatMoneyWithoutTrailingZeros(product.compare_at_price)} ${(window as any).shopCurrency}
              </p>
              <p
                class="${
                  product.compare_at_price > product.price ? 'text-error-red' : 'text-text-primary'
                } font-semibold lg:text-lg"
                pxm-product="price"
              >
                ${productAPI.formatMoneyWithoutTrailingZeros(product.price)} ${(window as any).shopCurrency}
              </p>
            </div>
          </div>
        </a>
      `;

      recentlyViewedProductsElement.innerHTML += productHtml;
    }
  }
});

function addRecentlyViewedProduct(productHandle: string, recentlyViewedProducts: string) {
  const MAX_RECENTLY_VIEWED_PRODUCTS = 6;

  const newRecentlyViewedProducts: string[] = recentlyViewedProducts.split(',').filter((product) => product !== '');
  // const id = productId.split('gid://shopify/Product/')[1];

  if (newRecentlyViewedProducts.includes(productHandle)) {
    newRecentlyViewedProducts.splice(newRecentlyViewedProducts.indexOf(productHandle), 1);
  }

  newRecentlyViewedProducts.unshift(productHandle);

  if (newRecentlyViewedProducts.length > MAX_RECENTLY_VIEWED_PRODUCTS) {
    newRecentlyViewedProducts.pop();
  }

  return newRecentlyViewedProducts.join(',');
}

const productAPI = {
  getProduct: async (handle: string) => {
    try {
      const productResponse = await fetch(`/products/${handle}.js`);
      const product = await productResponse.json();

      if (!productResponse.ok) throw new Error('Network response was not ok');

      return product;
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  },
  formatMoneyWithoutTrailingZeros: (amount: any) => {
    const formatted = (amount / 100).toFixed(2);
    return formatted.endsWith('.00') ? formatted.slice(0, -3) : formatted;
  },
};

function getCookie(cname: string) {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function setCookie(name: string, value: any, days: number) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }

  document.cookie = `${name}=${value ?? ''}; ${expires}; path=/`;
}
