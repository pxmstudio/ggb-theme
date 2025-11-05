// Countdown for Black Friday header to 2025-11-07 23:59:59 (local time)
(() => {
  function initializeCountdown() {
    const headerElement = document.querySelector('.header-black-friday');
    if (!headerElement) return;

    const countdownContainer = headerElement.querySelector('[data-countdown="timer"]');
    if (!countdownContainer) return;

    const numberElements = {
      days: countdownContainer.querySelector('[data-countdown-part="days"] [data-countdown-value]'),
      hours: countdownContainer.querySelector('[data-countdown-part="hours"] [data-countdown-value]'),
      minutes: countdownContainer.querySelector('[data-countdown-part="minutes"] [data-countdown-value]'),
      seconds: countdownContainer.querySelector('[data-countdown-part="seconds"] [data-countdown-value]'),
    };

    if (!numberElements.days || !numberElements.hours || !numberElements.minutes || !numberElements.seconds) {
      return;
    }

    // Months are 0-based: 10 = November
    const endDate = new Date(2025, 10, 6, 23, 59, 59);

    let intervalId = null;

    function pad2(value) {
      return String(value).padStart(2, '0');
    }

    function updateCountdown() {
      const now = Date.now();
      const distance = endDate.getTime() - now;

      if (distance <= 0) {
        numberElements.days.textContent = '00';
        numberElements.hours.textContent = '00';
        numberElements.minutes.textContent = '00';
        numberElements.seconds.textContent = '00';
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      numberElements.days.textContent = pad2(days);
      numberElements.hours.textContent = pad2(hours);
      numberElements.minutes.textContent = pad2(minutes);
      numberElements.seconds.textContent = pad2(seconds);
    }

    // Initial update and start interval
    updateCountdown();
    intervalId = setInterval(updateCountdown, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCountdown);
  } else {
    initializeCountdown();
  }
})();
