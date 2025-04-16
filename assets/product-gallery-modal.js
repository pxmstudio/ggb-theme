import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';
import { gsap } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js';

(function () {
  if (!customElements.get('px-product-gallery-modal')) {
    customElements.define(
      'px-product-gallery-modal',
      class extends HTMLElement {
        constructor() {
          super();
          console.log('[GalleryModal] Constructor called');
          this.modal = this;
          this.swiper = null;
          this.isOpen = false;

          // Bind methods
          this.openModal = this.openModal.bind(this);
          this.closeModal = this.closeModal.bind(this);
          this.handleKeydown = this.handleKeydown.bind(this);
        }

        connectedCallback() {
          console.log('[GalleryModal] Connected to DOM');
          // Initialize gallery triggers
          // Use the correct data attribute selector
          const galleryTriggers = document.querySelectorAll('[data-gallery-item]');
          console.log(`[GalleryModal] Found ${galleryTriggers.length} gallery trigger items`);

          galleryTriggers.forEach((item) => {
            // Nu mai avem nevoie de 'index' aici
            // Indexul este acum setat direct în HTML prin data-index
            // item.dataset.index = index;
            item.style.cursor = 'pointer'; // Ensure pointer cursor is set
            item.addEventListener('click', (e) => {
              // console.log('[GalleryModal] Trigger item clicked:', e.currentTarget);
              const clickedIndex = parseInt(e.currentTarget.dataset.index);
              // console.log('[GalleryModal] Opening modal for index:', clickedIndex);
              this.openModal(clickedIndex);
            });
          });

          // Add close button listener
          const closeButton = this.querySelector('[data-modal-close]');
          if (closeButton) {
            console.log('[GalleryModal] Close button found');
            closeButton.addEventListener('click', this.closeModal);
          } else {
            console.warn('[GalleryModal] Close button not found');
          }

          // Add background click listener
          const modalBackground = this.querySelector('[data-modal-background]');
          if (modalBackground) {
            console.log('[GalleryModal] Background element found');
            modalBackground.addEventListener('click', this.closeModal);
          } else {
            console.warn('[GalleryModal] Background element not found');
          }

          // Initialize Swiper
          const swiperElement = this.querySelector('.swiper');
          if (swiperElement) {
            console.log('[GalleryModal] Initializing Swiper on element:', swiperElement);
            try {
              this.swiper = new Swiper(swiperElement, {
                // Removed Navigation module import, check if needed
                // modules: [Navigation], // This might cause issues if Navigation wasn't imported correctly
                navigation: {
                  nextEl: '.gallery-next',
                  prevEl: '.gallery-prev',
                },
                loop: true,
                initialSlide: 0, // Start at the first slide by default
              });
              console.log('[GalleryModal] Swiper initialized:', this.swiper);
            } catch (error) {
              console.error('[GalleryModal] Error initializing Swiper:', error);
            }
          } else {
            console.error('[GalleryModal] Swiper container (.swiper) not found inside modal.');
          }
        }

        openModal(index = 0) {
          console.log(`[GalleryModal] openModal called with index: ${index}`);
          if (isNaN(index)) {
            console.warn('[GalleryModal] Invalid index passed to openModal. Defaulting to 0.');
            index = 0;
          }

          if (this.isOpen) {
            console.log('[GalleryModal] Modal already open');
            return;
          }
          this.isOpen = true;

          // Add stop-scroll class
          // document.getElementById('smooth-content')?.classList.add('stop-scroll');
          console.log('[GalleryModal] Added stop-scroll (commented out)');

          // Add keyboard listener
          document.addEventListener('keydown', this.handleKeydown);
          console.log('[GalleryModal] Added keydown listener');

          // Show modal with GSAP animation
          console.log('[GalleryModal] Showing modal with GSAP');
          gsap.set(this.modal, { display: 'flex' });
          gsap.fromTo(this.modal, { opacity: 0 }, { opacity: 1, duration: 0.3 });

          // Slide to the clicked image
          if (this.swiper) {
            console.log(`[GalleryModal] Swiper sliding to index: ${index}`);
            this.swiper.slideToLoop(index, 0); // Use slideToLoop for loop mode
          } else {
            console.error('[GalleryModal] Swiper not initialized, cannot slide.');
          }
        }

        closeModal() {
          console.log('[GalleryModal] closeModal called');
          if (!this.isOpen) {
            console.log('[GalleryModal] Modal already closed');
            return;
          }

          // Remove keyboard listener
          document.removeEventListener('keydown', this.handleKeydown);
          console.log('[GalleryModal] Removed keydown listener');

          // Hide modal with GSAP animation
          console.log('[GalleryModal] Hiding modal with GSAP');
          gsap.to(this.modal, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              console.log('[GalleryModal] Hide animation complete');
              gsap.set(this.modal, { display: 'none' });
              this.isOpen = false;
            },
          });
        }

        handleKeydown(e) {
          if (e.key === 'Escape') {
            console.log('[GalleryModal] Escape key pressed');
            this.closeModal();
          }
        }
      }
    );
  }
})();
