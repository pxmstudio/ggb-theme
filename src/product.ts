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

interface ProductGalleryConfig {
  container: HTMLElement;
  mainImage: HTMLImageElement;
  thumbnailButtons: NodeListOf<HTMLButtonElement>;
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

class ProductGallery {
  private config: ProductGalleryConfig;
  private activeButton: HTMLButtonElement | null = null;

  constructor(config: ProductGalleryConfig) {
    this.config = config;
    this.init();
  }

  private init(): void {
    // Set initial active button
    this.activeButton = this.config.thumbnailButtons[0] || null;
    
    // Add click listeners to thumbnail buttons
    this.config.thumbnailButtons.forEach(button => {
      button.addEventListener('click', () => this.handleThumbnailClick(button));
      
      // Set initial active state
      if (button.dataset.active === 'true') {
        this.activeButton = button;
      }
    });

    // Add keyboard navigation
    this.config.container.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
  }

  private handleThumbnailClick(button: HTMLButtonElement): void {
    if (this.activeButton === button) return;

    // Update active states
    this.setActiveButton(button);

    // Update main image
    const thumbnailImg = button.querySelector('img');
    if (thumbnailImg) {
      const newSrc = this.getFullSizeUrl(thumbnailImg.src);
      this.updateMainImage(newSrc, thumbnailImg.alt);
    }
  }

  private handleKeyboardNavigation(event: KeyboardEvent): void {
    if (!this.activeButton || !['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;

    const buttons = Array.from(this.config.thumbnailButtons);
    const currentIndex = buttons.indexOf(this.activeButton);
    let nextIndex = currentIndex;

    switch (event.key) {
      case 'ArrowUp':
        nextIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
        break;
      case 'ArrowDown':
        nextIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = buttons.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const nextButton = buttons[nextIndex];
    if (nextButton) {
      nextButton.focus();
      this.handleThumbnailClick(nextButton);
    }
  }

  private setActiveButton(newActiveButton: HTMLButtonElement): void {
    // Remove active state from current button
    if (this.activeButton) {
      this.activeButton.setAttribute('data-active', 'false');
      this.activeButton.setAttribute('aria-selected', 'false');
    }

    // Set new active button
    this.activeButton = newActiveButton;
    newActiveButton.setAttribute('data-active', 'true');
    newActiveButton.setAttribute('aria-selected', 'true');

    // Dispatch custom event
    this.config.container.dispatchEvent(new CustomEvent('gallery-change', {
      detail: { 
        button: newActiveButton,
        index: Array.from(this.config.thumbnailButtons).indexOf(newActiveButton)
      },
      bubbles: true
    }));
  }

  private updateMainImage(src: string, alt: string): void {
    // Add loading state
    this.config.mainImage.style.opacity = '0.5';
    
    // Create new image to preload
    const newImage = new Image();
    newImage.onload = () => {
      this.config.mainImage.src = src;
      this.config.mainImage.alt = alt;
      this.config.mainImage.style.opacity = '1';
    };
    newImage.src = src;
  }

  private getFullSizeUrl(thumbnailUrl: string): string {
    // Convert thumbnail URL to full-size URL by replacing width parameter
    return thumbnailUrl.replace(/width=\d+/, 'width=1000');
  }
}

document.addEventListener('DOMContentLoaded', () => {
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
    const contentElement = triggersElement.parentElement?.querySelector<HTMLElement>('[pxm-tabs="content"]');
    if (contentElement) {
      new Tabs({ triggers: triggersElement, content: contentElement });
    }
  });

  // Initialize product image galleries
  document.querySelectorAll<HTMLElement>('[pxm-product="image-gallery"]').forEach(container => {
    const mainImage = container.querySelector<HTMLImageElement>('[pxm-product="image-gallery-img"]');
    const thumbnailButtons = container.querySelectorAll<HTMLButtonElement>('[pxm-product="image-gallery-btn"]');

    if (mainImage && thumbnailButtons.length > 0) {
      new ProductGallery({
        container,
        mainImage,
        thumbnailButtons
      });
    }
  });
});
