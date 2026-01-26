// Universal countdown for Black Friday / Black Week / Luna Cadourilor / Promotii
(() => {
  function initializeCountdown() {
    const headerElement = document.querySelector(
      '.header-black-friday, .header-luna-cadourilor, .header-promotii'
    );
    if (!headerElement) return;

    const countdownContainer = headerElement.querySelector('[data-countdown="timer"]');
    if (!countdownContainer) return;

    const numberElements = {
      days: countdownContainer.querySelector('[data-countdown-part="days"] [data-countdown-value]'),
      hours: countdownContainer.querySelector('[data-countdown-part="hours"] [data-countdown-value]'),
      minutes: countdownContainer.querySelector('[data-countdown-part="minutes"] [data-countdown-value]'),
      seconds: countdownContainer.querySelector('[data-countdown-part="seconds"] [data-countdown-value]'),
    };

    if (!numberElements.days) return;

    // Which template is active?
    const template = headerElement.dataset.template || '';

    // Date sources
    const bfStart = headerElement.dataset.bfStart || '';
    const bfEnd   = headerElement.dataset.bfEnd || '';
    const bwStart = headerElement.dataset.bwStart || '';
    const bwEnd   = headerElement.dataset.bwEnd || '';
    const lcStart = headerElement.dataset.lcStart || '';
    const lcEnd   = headerElement.dataset.lcEnd  || '';
    const proStart = headerElement.dataset.proStart || '';
    const proEnd   = headerElement.dataset.proEnd  || '';

    // Texts
    const beforeText = headerElement.dataset.beforeText || '';
    const duringText = headerElement.dataset.duringText || '';
    const messageEl = headerElement.querySelector('[data-countdown-message]');

    function parseISO(str) {
      if (!str) return null;
      const d = new Date(str);
      return isNaN(d.getTime()) ? null : d;
    }

    function getPhase() {
      let start = null;
      let end = null;

      // PRIORITY BASED ON TEMPLATE
      if (template === 'black-friday') {
        start = parseISO(bfStart);
        end = parseISO(bfEnd);
      } else if (template === 'black-week') {
        start = parseISO(bwStart);
        end = parseISO(bwEnd);
      } else if (template === 'luna-cadourilor') {
        start = parseISO(lcStart);
        end   = parseISO(lcEnd);
      } else if (template === 'promotii') {
        start = parseISO(proStart);
        end   = parseISO(proEnd);
      }

      const now = new Date();

      if (start && now < start) {
        return { target: start, label: beforeText };
      }
      if (end && now < end) {
        return { target: end, label: duringText };
      }

      return { target: null, label: '' };
    }

    let phase = getPhase();
    if (messageEl) messageEl.textContent = phase.label;

    let intervalId = null;

    function pad2(n) {
      return String(n).padStart(2, '0');
    }

    function updateCountdown() {
      const newPhase = getPhase();

      // If phase changed (before → during)
      if (newPhase.target !== phase.target) {
        phase = newPhase;
        if (messageEl) messageEl.textContent = phase.label;
      }

      if (!phase.target) {
        numberElements.days.textContent = '00';
        numberElements.hours.textContent = '00';
        numberElements.minutes.textContent = '00';
        numberElements.seconds.textContent = '00';
        return;
      }

      const now = Date.now();
      const distance = phase.target - now;

      if (distance <= 0) {
        numberElements.days.textContent = '00';
        numberElements.hours.textContent = '00';
        numberElements.minutes.textContent = '00';
        numberElements.seconds.textContent = '00';
        return;
      }

      const days = Math.floor(distance / 86400000);
      const hours = Math.floor((distance % 86400000) / 3600000);
      const minutes = Math.floor((distance % 3600000) / 60000);
      const seconds = Math.floor((distance % 60000) / 1000);

      numberElements.days.textContent = pad2(days);
      numberElements.hours.textContent = pad2(hours);
      numberElements.minutes.textContent = pad2(minutes);
      numberElements.seconds.textContent = pad2(seconds);
    }

    updateCountdown();
    intervalId = setInterval(updateCountdown, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCountdown);
  } else {
    initializeCountdown();
  }
})();
