'use strict';

(() => {
  const root = document.querySelector('[data-modality-carousel]');
  if (!root) return;

  const viewport = root.querySelector('.carousel-viewport');
  const track = root.querySelector('.carousel-track');
  const slides = [...track.children];
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const status = root.querySelector('[data-carousel-status]');
  const pagination = root.querySelector('[data-carousel-dots]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const count = slides.length;
  const wrap = (index) => (index + count) % count;
  const dots = slides.map((slide, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'carousel-dot';
    button.dataset.carouselDot = index;
    button.setAttribute('aria-label', `Ver foto de ${slide.dataset.modality}, ${index + 1} de ${count}`);
    button.setAttribute('aria-controls', slide.id);
    button.addEventListener('click', () => select(index));
    button.addEventListener('keydown', (event) => {
      let target;
      if (event.key === 'ArrowRight') target = wrap(index + 1);
      if (event.key === 'ArrowLeft') target = wrap(index - 1);
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = count - 1;
      if (target === undefined) return;
      event.preventDefault();
      dots[target].focus({ preventScroll: true });
      select(target);
    });
    pagination.append(button);
    return button;
  });
  let current = 0;
  let desired = 0;
  const cloneCount = 2;
  let position = cloneCount;
  let moving = false;
  let timer;
  let motionFrame;
  let dragFrame;
  let drag = null;
  let fade;

  // Inert copies let both boundaries animate in the same direction as any other slide.
  const clone = (slide) => {
    const copy = slide.cloneNode(true);
    ['id', 'role', 'aria-labelledby', 'tabindex'].forEach((name) => copy.removeAttribute(name));
    copy.setAttribute('aria-hidden', 'true');
    copy.inert = true;
    copy.dataset.clone = 'true';
    return copy;
  };
  // Two copies at each edge keep both neighboring previews visible through the loop.
  const before = slides.slice(-cloneCount).map(clone);
  const after = slides.slice(0, cloneCount).map(clone);
  track.prepend(...before);
  track.append(...after);

  const transform = (offset = 0) => {
    track.style.transform = `translate3d(calc(${-position * 100}% - var(--carousel-gap) * ${position} + ${offset}px), 0, 0)`;
  };

  const loadImage = (slide) => {
    const img = slide.querySelector('img');
    if (img.dataset.src) {
      img.src = img.dataset.src;
      delete img.dataset.src;
    }
    img.loading = 'eager';
    return img;
  };

  const prepare = (index) => {
    const image = loadImage(slides[index]);
    loadImage(slides[wrap(index - 1)]);
    loadImage(slides[wrap(index + 1)]);
    if (index === 0 || index === count - 1) {
      before.forEach(loadImage);
      after.forEach(loadImage);
    }
    return image.decode ? image.decode().catch(() => {}) : Promise.resolve();
  };

  const render = () => {
    tabs.forEach((tab, index) => {
      tab.setAttribute('aria-selected', String(index === current));
      tab.tabIndex = index === current ? 0 : -1;
      if (index === current) dots[index].setAttribute('aria-current', 'true');
      else dots[index].removeAttribute('aria-current');
    });
    slides.forEach((slide, index) => {
      slide.setAttribute('aria-hidden', String(index !== current));
      slide.inert = index !== current;
      slide.tabIndex = index === current ? 0 : -1;
    });
    [...track.children].forEach((slide) => {
      slide.classList.toggle('is-current', slide.dataset.modality === slides[current].dataset.modality);
    });
  };

  const announce = () => {
    status.textContent = `${slides[current].dataset.modality}, imagem ${current + 1} de ${count}.`;
  };

  function finish() {
    if (!moving) return;
    clearTimeout(timer);
    cancelAnimationFrame(motionFrame);
    track.classList.remove('is-moving');
    position = current + cloneCount;
    transform();
    moving = false;
    announce();
    if (desired !== current) requestAnimationFrame(run);
  }

  function animateTo(nextPosition) {
    position = nextPosition;
    if (reducedMotion.matches) {
      finish();
      return;
    }
    motionFrame = requestAnimationFrame(() => {
      if (!moving) return;
      track.classList.add('is-moving');
      transform();
      timer = setTimeout(finish, 350);
    });
  }

  function run() {
    if (moving || drag || desired === current) return;
    moving = true;
    fade?.cancel();
    const next = desired;
    // Neighbors are prefetched; image decoding must not block a swipe.
    prepare(next);
    const old = current;
    current = next;
    render();

    // Direct selections skip intervening images; arrows and swipes move one image at a time.
    const adjacent = next === wrap(old + 1) || next === wrap(old - 1);
    if (!adjacent || reducedMotion.matches) {
      finish();
      if (!reducedMotion.matches) {
        fade = viewport.animate([{ opacity: .45 }, { opacity: 1 }], { duration: 220, easing: 'ease-out' });
      }
      return;
    }
    const nextPosition = old === count - 1 && next === 0 ? count + cloneCount
      : old === 0 && next === count - 1 ? cloneCount - 1 : next + cloneCount;
    animateTo(nextPosition);
  }

  function select(index) {
    desired = wrap(index);
    run();
  }

  root.querySelector('[data-carousel-prev]').addEventListener('click', () => select(desired - 1));
  root.querySelector('[data-carousel-next]').addEventListener('click', () => select(desired + 1));

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', (event) => {
      let target;
      if (event.key === 'ArrowRight') target = wrap(index + 1);
      if (event.key === 'ArrowLeft') target = wrap(index - 1);
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = count - 1;
      if (target === undefined) return;
      event.preventDefault();
      tabs[target].focus({ preventScroll: true });
      select(target);
    });
  });
  viewport.addEventListener('keydown', (event) => {
    if (event.target.closest('button')) return;
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    // Focus the persistent control so the outgoing panel never retains hidden focus.
    const target = wrap(desired + (event.key === 'ArrowRight' ? 1 : -1));
    dots[target].focus({ preventScroll: true });
    select(target);
  });
  track.addEventListener('transitionend', (event) => {
    if (event.target === track && event.propertyName === 'transform') finish();
  });

  function resetDrag() {
    if (!drag) return null;
    const gesture = drag;
    cancelAnimationFrame(dragFrame);
    dragFrame = null;
    if (gesture.horizontal) transform(gesture.delta);
    drag = null;
    viewport.classList.remove('is-dragging');
    if (viewport.hasPointerCapture(gesture.id)) viewport.releasePointerCapture(gesture.id);
    return gesture;
  }

  function snapBack() {
    moving = true;
    animateTo(current + cloneCount);
  }

  function interruptMotion(step) {
    if (!moving) return 0;
    let x = new DOMMatrixReadOnly(getComputedStyle(track).transform).m41;
    // Rebase boundary copies without changing the visible image during a new gesture.
    if (position >= count + cloneCount) x += count * step;
    else if (position < cloneCount) x -= count * step;
    clearTimeout(timer);
    cancelAnimationFrame(motionFrame);
    track.classList.remove('is-moving');
    moving = false;
    desired = current;
    position = current + cloneCount;
    const offset = x + position * step;
    transform(offset);
    return offset;
  }

  function updateGesture(event) {
    const dx = event.clientX - drag.x;
    drag.samples.push({ x: event.clientX, time: event.timeStamp });
    while (drag.samples.length > 2 && drag.samples[1].time < event.timeStamp - 80) drag.samples.shift();
    const first = drag.samples[0];
    const elapsed = event.timeStamp - first.time;
    drag.velocity = elapsed > 0 ? (event.clientX - first.x) / elapsed : 0;
    drag.travel = dx;
    drag.delta = Math.max(-drag.width * .95, Math.min(drag.width * .95, drag.baseOffset + dx));
  }

  viewport.addEventListener('pointerdown', (event) => {
    if (drag || !event.isPrimary || event.button !== 0 || event.target.closest('button')) return;
    fade?.cancel();
    const width = track.getBoundingClientRect().width;
    const step = width + parseFloat(getComputedStyle(track).columnGap);
    const offset = interruptMotion(step);
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, delta: offset, baseOffset: offset, width, horizontal: false, travel: 0, velocity: 0, samples: [{ x: event.clientX, time: event.timeStamp }] };
    if (event.pointerType === 'mouse') viewport.setPointerCapture(event.pointerId);
  });
  viewport.addEventListener('pointermove', (event) => {
    if (!drag || event.pointerId !== drag.id) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (!drag.horizontal) {
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) {
        cancelDrag();
        return;
      }
      if (Math.abs(dx) < 6 || Math.abs(dx) < Math.abs(dy) * 1.05) return;
      drag.horizontal = true;
      viewport.setPointerCapture(event.pointerId);
      viewport.classList.add('is-dragging');
    }
    if (event.cancelable) event.preventDefault();
    updateGesture(event);
    if (!dragFrame) dragFrame = requestAnimationFrame(() => {
      dragFrame = null;
      if (drag) transform(drag.delta);
    });
  }, { passive: false });
  viewport.addEventListener('pointerup', (event) => {
    if (!drag || event.pointerId !== drag.id) return;
    if (drag.horizontal) updateGesture(event);
    const gesture = resetDrag();
    if (!gesture.horizontal) {
      if (Math.abs(gesture.baseOffset) > .5) snapBack();
      return;
    }
    const flick = Math.abs(gesture.velocity) > .35 && Math.abs(gesture.travel) >= 12;
    if (Math.abs(gesture.delta) >= Math.min(48, gesture.width * .16) || flick) {
      const projected = gesture.delta + gesture.velocity * 120;
      select(current + (projected < 0 ? 1 : -1));
    } else snapBack();
  });
  function cancelDrag() {
    const gesture = resetDrag();
    if (gesture && (gesture.horizontal || Math.abs(gesture.baseOffset) > .5)) snapBack();
  }
  viewport.addEventListener('pointercancel', cancelDrag);
  viewport.addEventListener('lostpointercapture', cancelDrag);
  window.addEventListener('resize', cancelDrag);
  reducedMotion.addEventListener('change', () => {
    fade?.cancel();
    if (moving) finish();
  });

  transform();
  render();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        prepare(current);
        observer.disconnect();
      }
    }, { rootMargin: '200px' });
    observer.observe(root);
  } else prepare(current);
})();
