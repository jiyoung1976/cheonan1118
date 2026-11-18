(() => {
  'use strict';
  const slides = [...document.querySelectorAll('.slide')];
  const navigation = [...document.querySelectorAll('[data-go]')];
  const prev = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');
  const count = document.getElementById('slideCounter');
  const headerCount = document.getElementById('headerIndex');
  const progress = document.getElementById('progressFill');
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const video = document.getElementById('promoVideo');
  let current = 0;
  let wheelAt = 0;
  let touchY = null;
  const two = number => String(number).padStart(2, '0');
  function setSlide(target, updateHash = true) {
    const index = Math.max(0, Math.min(slides.length - 1, target));
    if (index === current && slides[index].classList.contains('current')) return;
    if (video && current === 5 && index !== current) video.pause();
    slides.forEach((slide, i) => {
      slide.classList.toggle('current', i === index);
      slide.classList.toggle('previous', i < index);
      slide.setAttribute('aria-hidden', String(i !== index));
      if (i === index) slide.scrollTop = 0;
    });
    current = index;
    navigation.forEach(button => {
      const active = Number(button.dataset.go) === index;
      button.classList.toggle('active', active);
      if (active) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    prev.disabled = index === 0;
    next.disabled = index === slides.length - 1;
    count.innerHTML = `${two(index + 1)} <span>/ ${two(slides.length)}</span>`;
    headerCount.textContent = `${two(index + 1)} / ${two(slides.length)}`;
    progress.style.width = `${(index + 1) / slides.length * 100}%`;
    document.title = `${slides[index].dataset.title} | 천안시 민원서비스`;
    if (updateHash) history.replaceState(null, '', `#slide-${index + 1}`);
    mobileNav.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
  }
  prev.addEventListener('click', () => setSlide(current - 1));
  next.addEventListener('click', () => setSlide(current + 1));
  navigation.forEach(button => button.addEventListener('click', () => setSlide(Number(button.dataset.go))));
  menuToggle.addEventListener('click', () => {
    mobileNav.hidden = !mobileNav.hidden;
    menuToggle.setAttribute('aria-expanded', String(!mobileNav.hidden));
  });
  document.addEventListener('click', event => {
    if (!mobileNav.hidden && !mobileNav.contains(event.target) && !menuToggle.contains(event.target)) {
      mobileNav.hidden = true; menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', event => {
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName ?? '')) return;
    if (event.target.closest('video')) return;
    if (['ArrowRight', 'PageDown'].includes(event.key)) {event.preventDefault();setSlide(current + 1);}
    if (['ArrowLeft', 'PageUp'].includes(event.key)) {event.preventDefault();setSlide(current - 1);}
    if (event.key === 'Home') {event.preventDefault();setSlide(0);}
    if (event.key === 'End') {event.preventDefault();setSlide(slides.length - 1);}
    if (event.key === 'Escape') {mobileNav.hidden = true;menuToggle.setAttribute('aria-expanded','false');}
  });
  document.addEventListener('wheel', event => {
    if (event.target.closest('video')) return;
    if (Math.abs(event.deltaY) < 15) return;
    const el = slides[current];
    const canScroll = el.scrollHeight > el.clientHeight + 5;
    if (canScroll && ((event.deltaY > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 6) || (event.deltaY < 0 && el.scrollTop > 6))) return;
    const now = Date.now();
    if (now - wheelAt < 760) return;
    wheelAt = now;
    setSlide(current + (event.deltaY > 0 ? 1 : -1));
  }, {passive:true});
  document.addEventListener('touchstart', event => {
    if (event.target.closest('video')) return;
    touchY = event.changedTouches[0]?.screenY ?? null;
  }, {passive:true});
  document.addEventListener('touchend', event => {
    if (touchY === null || event.target.closest('video')) return;
    const delta = touchY - event.changedTouches[0].screenY;
    touchY = null;
    if (Math.abs(delta) < 70) return;
    const el = slides[current];
    const canScroll = el.scrollHeight > el.clientHeight + 5;
    if (canScroll && ((delta > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 6) || (delta < 0 && el.scrollTop > 6))) return;
    setSlide(current + (delta > 0 ? 1 : -1));
  }, {passive:true});
  window.addEventListener('hashchange', () => {
    const matched = location.hash.match(/^#slide-([1-6])$/);
    if (matched) setSlide(Number(matched[1]) - 1, false);
  });
  const initial = location.hash.match(/^#slide-([1-6])$/);
  slides.forEach(slide => slide.setAttribute('aria-hidden','true'));
  slides[0].classList.remove('current');
  setSlide(initial ? Number(initial[1]) - 1 : 0, false);
})();
