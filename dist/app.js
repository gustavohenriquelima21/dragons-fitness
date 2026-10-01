'use strict';
const content = window.DRAGON_CONTENT;
const contactDialog = document.querySelector('#contact-dialog');
const icon = (id) => id === 'wa'
  ? '<svg class="icon icon-whatsapp" aria-hidden="true" focusable="false"><use href="#i-whatsapp"/></svg>'
  : `<svg class="icon" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

function whatsappLink(unit, context, plan) {
  const messages = {
    conhecer: `Olá! Quero conhecer a Dragon’s Fitness, unidade ${unit.name}.`,
    visita: `Olá! Gostaria de visitar a Dragon’s Fitness, unidade ${unit.name}. Como posso conhecer a academia?`,
    plano: `Olá! Quero saber mais sobre o plano ${plan || ''} da Dragon’s Fitness, unidade ${unit.name}.`,
    wellhub: `Olá! Quero treinar com Wellhub Basic na Dragon’s Fitness, unidade ${unit.name}. Como funciona?`,
    beneficios: `Olá! Quero saber mais sobre Wellhub Basic e TotalPass TP1 na Dragon’s Fitness, unidade ${unit.name}. Como funciona?`,
    horarios: `Olá! Quais são os horários de funcionamento da Dragon’s Fitness, unidade ${unit.name}?`
  };
  return `https://wa.me/${unit.phone}?text=${encodeURIComponent(messages[context] || messages.conhecer)}`;
}

function showContact(context, plan) {
  const options = document.querySelector('#contact-options');
  options.replaceChildren();
  document.querySelector('#contact-description').textContent = context === 'plano'
    ? `Escolha uma unidade para consultar o plano ${plan}.`
    : context === 'beneficios'
      ? 'Escolha uma unidade para saber mais sobre Wellhub Basic e TotalPass TP1.'
      : 'Escolha uma unidade para falar com a equipe no WhatsApp.';
  content.units.forEach((unit) => {
    const link = document.createElement('a');
    link.className = 'contact-option';
    link.href = whatsappLink(unit, context, plan);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.innerHTML = `${icon('wa')}<span><strong></strong><small></small></span>${icon('arrow')}`;
    link.querySelector('strong').textContent = unit.name;
    link.querySelector('small').textContent = unit.address;
    options.append(link);
  });
  contactDialog.showModal();
}

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-contact]');
  if (trigger && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey && event.button === 0) {
    event.preventDefault();
    showContact(trigger.dataset.contact, trigger.dataset.plan);
  }
  const close = event.target.closest('[data-close]');
  if (close) close.closest('dialog').close();
});

contactDialog.addEventListener('click', (event) => {
  if (event.target !== contactDialog) return;
  const box = contactDialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) contactDialog.close();
});

content.units.forEach((unit) => {
  const element = document.querySelector(`[data-unit="${unit.id}"]`);
  if (!element) return;
  element.querySelector('.unit-label').textContent = unit.label;
  element.querySelector('h3').textContent = unit.name;
  const address = element.querySelector('.unit-address span');
  address.replaceChildren(document.createTextNode(unit.address), document.createElement('br'), document.createTextNode(unit.name));
  const contact = element.querySelector('.unit-whatsapp');
  contact.href = whatsappLink(unit, 'conhecer');
  contact.setAttribute('aria-label', `Falar com esta unidade: ${unit.name}, no WhatsApp (abre em nova aba)`);
  const route = element.querySelector('.route-link');
  route.href = unit.maps;
  route.setAttribute('aria-label', `Como chegar à unidade ${unit.name} (abre em nova aba)`);
});

document.querySelectorAll('a[href*="instagram.com"]').forEach((link) => { link.href = content.instagram; });
const plans = document.querySelectorAll('.plan');
content.plans.forEach((plan) => {
  const element = [...plans].find((card) => card.dataset.planId === plan.id);
  if (!element) return;
  element.querySelector('.plan-name').textContent = plan.name;
  element.querySelector('.plan-price p').textContent = plan.condition;
  const price = currency.format(plan.amount).split(',');
  const decimal = document.createElement('span');
  decimal.textContent = `,${price[1]}`;
  element.querySelector('.plan-price strong').replaceChildren(document.createTextNode(price[0]), decimal);
});

if (content.units.some((unit) => Array.isArray(unit.hours) && unit.hours.length)) {
  const container = document.querySelector('#hours-content');
  container.replaceChildren();
  const grid = document.createElement('div');
  grid.className = 'hours-grid';
  content.units.forEach((unit) => {
    const section = document.createElement('section');
    const title = document.createElement('h4');
    title.textContent = unit.name;
    section.append(title);
    if (Array.isArray(unit.hours) && unit.hours.length) {
      const list = document.createElement('dl');
      unit.hours.forEach((hour) => {
        const row = document.createElement('div'); row.className = 'hours-row';
        const days = document.createElement('dt'); days.textContent = hour.days;
        const time = document.createElement('dd'); time.textContent = hour.time;
        row.append(days, time); list.append(row);
      });
      section.append(list);
    } else {
      const link = document.createElement('a');
      link.textContent = 'Consultar horários'; link.href = whatsappLink(unit, 'horarios');
      link.target = '_blank'; link.rel = 'noopener noreferrer'; section.append(link);
    }
    grid.append(section);
  });
  container.append(grid);
}

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: .08 });
  document.querySelectorAll('.section-heading').forEach((element) => {
    element.classList.add('reveal-ready'); observer.observe(element);
  });
}

// Plan selection ships with the main script so it cannot be omitted from deployment.
(() => {
  const root = document.querySelector('[data-plan-carousel]');
  if (!root) return;
  const list = root.querySelector('.plan-list');
  const cards = [...list.querySelectorAll('.plan')];
  const selectors = cards.map((card) => card.querySelector('[data-plan-select]'));
  const pagination = root.querySelector('[data-plan-dots]');
  const dots = cards.map((card, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'carousel-dot';
    button.dataset.planDot = index;
    button.setAttribute('aria-label', `Ver plano ${selectors[index].textContent.trim()}, ${index + 1} de ${cards.length}`);
    button.setAttribute('aria-controls', 'plan-list');
    button.addEventListener('click', () => { interacted = true; select(index); });
    pagination.append(button);
    return button;
  });
  const currentLabel = root.querySelector('[data-plan-current]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  let current = Math.max(0, cards.findIndex((card) => card.classList.contains('is-active')));
  let centers = [];
  let overflow = false;
  let pending = null;
  let frame;
  let settleTimer;
  let drag = null;
  let suppressClick = false;
  let hoverAfter = 0;
  let interacted = false;
  const initial = current;

  const clamp = (index) => Math.max(0, Math.min(cards.length - 1, index));

  function render(index) {
    current = clamp(index);
    cards.forEach((card, i) => {
      card.classList.toggle('is-active', i === current);
      selectors[i].setAttribute('aria-pressed', String(i === current));
      if (i === current) dots[i].setAttribute('aria-current', 'true');
      else dots[i].removeAttribute('aria-current');
    });
    currentLabel.textContent = `Plano ${selectors[current].textContent.trim()}, ${current + 1} de ${cards.length}.`;
  }

  function measure() {
    const width = list.clientWidth;
    overflow = list.scrollWidth > width + 2;
    centers = cards.map((card) => card.offsetLeft + card.offsetWidth / 2 - width / 2);
  }

  function nearest() {
    const left = list.scrollLeft;
    return centers.reduce((best, center, index) =>
      Math.abs(center - left) < Math.abs(centers[best] - left) ? index : best, 0);
  }

  function select(index, behavior = reducedMotion.matches ? 'instant' : 'smooth') {
    const target = clamp(index);
    render(target);
    if (!overflow) return;
    pending = target;
    list.scrollTo({ left: centers[target], behavior });
    if (behavior === 'instant') pending = null;
  }

  function settle() {
    if (drag || !overflow) return;
    pending = null;
    const index = nearest();
    if (index !== current) render(index);
  }

  list.addEventListener('scroll', () => {
    if (!frame) frame = requestAnimationFrame(() => {
      frame = null;
      if (overflow && pending === null && !drag) {
        const index = nearest();
        if (index !== current) render(index);
      }
    });
    clearTimeout(settleTimer);
    settleTimer = setTimeout(settle, 150);
  }, { passive: true });
  list.addEventListener('scrollend', settle);

  cards.forEach((card, index) => {
    selectors[index].addEventListener('click', () => { interacted = true; select(index); });
    card.addEventListener('pointerenter', () => {
      if (finePointer.matches && !overflow && !drag && performance.now() > hoverAfter) {
        interacted = true;
        render(index);
      }
    });
    card.addEventListener('focusin', () => {
      if (!drag) {
        interacted = true;
        select(index);
      }
    });
  });
  root.addEventListener('keydown', (event) => {
    let target;
    if (event.key === 'ArrowLeft') target = current - 1;
    if (event.key === 'ArrowRight') target = current + 1;
    if (event.key === 'Home') target = 0;
    if (event.key === 'End') target = cards.length - 1;
    if (target === undefined) return;
    event.preventDefault();
    interacted = true;
    const controls = pagination.contains(event.target) ? dots : selectors;
    controls[clamp(target)].focus({ preventScroll: true });
    select(target);
  });

  // Touch uses the browser's native momentum and scroll snap on narrow screens.
  // Mouse dragging, and touch on a fully visible desktop row, use the same choices.
  list.addEventListener('pointerdown', (event) => {
    interacted = true;
    pending = null;
    suppressClick = false;
    if (event.button !== 0 || drag || (event.pointerType !== 'mouse' && overflow)) return;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY,
      left: list.scrollLeft, index: current, delta: 0, horizontal: false };
  });
  list.addEventListener('pointermove', (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (!drag.horizontal) {
      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { drag = null; return; }
      if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      drag.horizontal = true;
      list.classList.add('is-dragging');
      list.setPointerCapture(event.pointerId);
    }
    if (event.cancelable) event.preventDefault();
    drag.delta = dx;
    if (overflow) list.scrollLeft = drag.left - dx;
  }, { passive: false });

  function endDrag(event, canceled = false) {
    if (!drag || (event && event.pointerId !== drag.id)) return;
    const gesture = drag;
    drag = null;
    if (gesture.horizontal) hoverAfter = performance.now() + 500;
    if (list.hasPointerCapture(gesture.id)) list.releasePointerCapture(gesture.id);
    list.classList.remove('is-dragging');
    if (!gesture.horizontal) return;
    suppressClick = true;
    let target = overflow ? nearest() : gesture.index;
    if (canceled) target = gesture.index;
    else if (Math.abs(gesture.delta) > 50 && target === gesture.index) {
      target += gesture.delta < 0 ? 1 : -1;
    }
    select(target);
  }
  list.addEventListener('pointerup', (event) => endDrag(event));
  list.addEventListener('pointercancel', (event) => endDrag(event, true));
  list.addEventListener('lostpointercapture', (event) => endDrag(event, true));
  window.addEventListener('pointerup', (event) => endDrag(event));
  list.addEventListener('click', (event) => {
    if (!suppressClick || event.detail === 0) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, true);

  function resize() {
    endDrag(null, true);
    measure();
    select(current, 'instant');
  }
  new ResizeObserver(resize).observe(list);
  reducedMotion.addEventListener('change', () => select(current, 'instant'));
  measure();
  select(initial, 'instant');
  const alignInitial = () => {
    if (interacted) return;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (interacted) return;
      measure();
      select(initial, 'instant');
    }));
  };
  document.fonts?.ready.then(alignInitial);
  window.addEventListener('pageshow', alignInitial);
  window.addEventListener('load', alignInitial, { once: true });
  list.addEventListener('wheel', () => { interacted = true; }, { passive: true });
})();
