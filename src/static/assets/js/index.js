const nav = document.querySelector('[data-site-nav]');
const toggle = document.querySelector('[data-nav-toggle]');
const mobileNav = document.querySelector('[data-mobile-nav]');

const setScrolled = () => {
  if (!nav) return;
  nav.classList.toggle('is-scrolled', window.scrollY > 60);
};

setScrolled();
window.addEventListener('scroll', setScrolled, { passive: true });

if (toggle && mobileNav) {
  const openLabel = toggle.querySelector('.nav-toggle__open');
  const closeLabel = toggle.querySelector('.nav-toggle__close');

  const setOpen = (isOpen) => {
    toggle.setAttribute('aria-expanded', String(isOpen));
    mobileNav.classList.toggle('is-open', isOpen);
    if (openLabel && closeLabel) {
      openLabel.hidden = isOpen;
      closeLabel.hidden = !isOpen;
    }
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  });

  mobileNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
}

document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href') || '';
    const id = href.replace(/^\/?#/, '');
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
  });
});

document.querySelectorAll('[data-choice-group]').forEach((group) => {
  group.addEventListener('click', (event) => {
    const choice = event.target.closest('[data-choice]');
    if (!choice) return;
    group.querySelectorAll('[data-choice]').forEach((item) => item.classList.remove('is-active'));
    choice.classList.add('is-active');
  });
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -80px 0px' }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

window.openVideoModal = function openVideoModal(el) {
  const modal = document.getElementById('customVideoModal');
  const modalBody = document.getElementById('v-modal-body');
  if (!modal || !modalBody) return;
  const videoId = el.getAttribute('data-video-id');
  const connector = videoId.includes('?') ? '&' : '?';
  modalBody.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}${connector}autoplay=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  modal.classList.add('is-active');
  document.body.style.overflow = 'hidden';
};

window.closeVideoModal = function closeVideoModal() {
  const modal = document.getElementById('customVideoModal');
  const modalBody = document.getElementById('v-modal-body');
  if (!modal || !modalBody) return;
  modal.classList.remove('is-active');
  modalBody.innerHTML = '';
  document.body.style.overflow = '';
};

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') window.closeVideoModal?.();
});
