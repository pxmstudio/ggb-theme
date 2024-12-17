document.addEventListener('DOMContentLoaded', async () => {
  console.log('Script loaded');
  const warrantyForm = document.getElementById('warranty-form') as HTMLFormElement;

  if (!warrantyForm) {
    console.warn('Warranty for does not exist');
    return;
  }

  warrantyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = 'https://gogobaby-api.pixelmakers.workers.dev/';

    const formData = new FormData(warrantyForm);
    const responseMessage = document.getElementById('response-message');
    if (!responseMessage) {
      console.warn('Response message does not exist');
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // @ts-ignore
        responseMessage.textContent =
          'Formularul a fost trimis cu succes. Vă vom contacta în cel mai scurt timp posibil.';
        warrantyForm.remove();
      } else {
        // @ts-ignore
        responseMessage.textContent =
          'A fost o eroare și nu s-a putut trimite formularul. Vă rugăm să incercați mai târziu.';
        warrantyForm.remove();
      }
    } catch (error: any) {
      console.log('Warranty: ', error.message);
    }
  });
});
