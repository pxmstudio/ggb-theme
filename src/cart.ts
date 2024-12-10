document.addEventListener('DOMContentLoaded', async () => {
  const removeItemFromCartElements = document.querySelectorAll('[data-pxm-remove-item-from-cart]');
  const decreaseQuantityElements = document.querySelectorAll('[data-pxm-decrease-quantity]');
  const increaseQuantityElements = document.querySelectorAll('[data-pxm-increase-quantity]');
  const inputQuantityElements = document.getElementsByName('updates[]');

  if (removeItemFromCartElements && removeItemFromCartElements.length > 0) {
    removeItemFromCartElements.forEach((button) => {
      button.addEventListener('click', (e) => {
        const variantId = (e.currentTarget as HTMLElement).dataset.pxmVariantId;

        if (!variantId) return;

        removeItemFromCart(variantId);
      });
    });
  }

  if (decreaseQuantityElements && decreaseQuantityElements.length > 0) {
    decreaseQuantityElements.forEach((button) => {
      button.addEventListener('click', (e) => {
        const inputId = (e.currentTarget as HTMLElement).dataset.pxmInputId as string;
        updateQuantity(inputId, 'decrease');
      });
    });
  }

  if (increaseQuantityElements && increaseQuantityElements.length > 0) {
    increaseQuantityElements.forEach((button) => {
      button.addEventListener('click', (e) => {
        const inputId = (e.currentTarget as HTMLElement).dataset.pxmInputId as string;
        updateQuantity(inputId, 'increase');
      });
    });
  }

  if (inputQuantityElements && inputQuantityElements.length > 0) {
    inputQuantityElements.forEach((input) => {
      input.addEventListener('change', () => {
        updateQuantity(input.id, 'input');
      });
    });
  }
});

async function removeItemFromCart(variantId: string) {
  try {
    const response = await fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: variantId,
        quantity: 0,
      }),
    });

    if (!response.ok) throw new Error('Network response was not ok');

    const cart = await response.json();
    console.log(cart);

    // Refresh the page to show updated cart
    window.location.reload();
  } catch (error) {
    console.error('Error deleting item from cart:', error);
  }
}

function updateQuantity(inputId: string, action: 'increase' | 'decrease' | 'input') {
  const input = document.getElementById(inputId) as HTMLInputElement;
  const currentValue = parseInt(input?.value) || 0;
  const min = parseInt(input?.min) || 0;
  const max = parseInt(input?.max);
  let newValue = currentValue;

  switch (action) {
    case 'increase':
      // Only increase if there's no max or if current value is less than max
      if (!max || currentValue < max) {
        newValue = currentValue + 1;
      } else {
        console.warn('Cannot exceed maximum inventory:', max);
        return;
      }
      break;
    case 'decrease':
      if (currentValue > min) {
        newValue = currentValue - 1;
      } else {
        newValue = 0;
      }
      break;
    case 'input':
      // For direct input, ensure the value doesn't exceed max
      if (max && currentValue > max) {
        newValue = max;
      } else {
        newValue = currentValue;
      }
      break;
  }

  // Set the new value
  input.value = newValue.toString();

  // Only update cart if this is a cart quantity input
  if (input.name === 'updates[]') {
    updateCart(input);
  }
}

async function updateCart(input: HTMLInputElement) {
  const quantity = parseInt(input.value);
  const cartItemEl = input.closest('li');

  if (!cartItemEl) return;

  try {
    // Show loading state
    cartItemEl.style.opacity = '0.5';

    const response = await fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: input.id,
        quantity: quantity,
      }),
    });

    if (!response.ok) throw new Error('Network response was not ok');

    // Refresh the page to show updated cart
    window.location.reload();
  } catch (error) {
    console.error('Error updating cart:', error);
    // Revert the input value on error
    input.value = input.defaultValue;
  } finally {
    // Remove loading state
    cartItemEl.style.opacity = '1';
  }
}
