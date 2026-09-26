'use strict';
const content = window.DRAGON_CONTENT;
const contactDialog = document.querySelector('#contact-dialog');
const imageDialog = document.querySelector('#image-dialog');
const icon = (id) => `<svg class="icon" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

function whatsappLink(unit, context, plan) {
  const messages = {
    conhecer: `Olá! Quero conhecer a Dragon’s Fitness, unidade ${unit.name}.`,
    visita: `Olá! Gostaria de visitar a Dragon’s Fitness, unidade ${unit.name}. Como posso conhecer a academia?`,
    plano: `Olá! Quero saber mais sobre o plano ${plan || ''} da Dragon’s Fitness, unidade ${unit.name}.`,
    wellhub: `Olá! Quero treinar com Wellhub Basic na Dragon’s Fitness, unidade ${unit.name}. Como funciona?`,
    horarios: `Olá! Quais são os horários de funcionamento da Dragon’s Fitness, unidade ${unit.name}?`
  };
  return `https://wa.me/${unit.phone}?text=${encodeURIComponent(messages[context] || messages.conhecer)}`;
}

function showContact(context, plan) {
  const options = document.querySelector('#contact-options');
  options.replaceChildren();
  document.querySelector('#contact-description').textContent = context === 'plano'
    ? `Escolha uma unidade para consultar o plano ${plan}.`
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
  const imageTrigger = event.target.closest('[data-image]');
  if (imageTrigger) {
    const expanded = document.querySelector('#expanded-image');
    expanded.src = imageTrigger.dataset.image;
    expanded.alt = imageTrigger.dataset.imageAlt;
    imageDialog.showModal();
  }
  const close = event.target.closest('[data-close]');
  if (close) close.closest('dialog').close();
});

[contactDialog, imageDialog].forEach((dialog) => {
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
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
content.plans.forEach((plan, index) => {
  const element = plans[index];
  if (!element) return;
  element.querySelector('h3').textContent = plan.name;
  element.querySelector('.plan-price p').textContent = plan.condition;
  const price = currency.format(plan.amount).split(',');
  const decimal = document.createElement('span');
  decimal.textContent = `,${price[1]}`;
  element.querySelector('.plan-price strong').replaceChildren(document.createTextNode(price[0]), decimal);
  const link = element.querySelector('[data-plan]');
  link.dataset.plan = plan.name;
  link.setAttribute('aria-label', `Consultar plano ${plan.name}`);
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
  document.querySelectorAll('.section-heading, .gallery').forEach((element) => {
    element.classList.add('reveal-ready'); observer.observe(element);
  });
}
