(() => {
  const ready = (fn) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  };

  ready(() => {
    const nav = document.querySelector('[data-site-nav]');
    if (nav) {
      const setScrolled = () => nav.classList.toggle('is-scrolled', window.scrollY > 60);
      setScrolled();
      window.addEventListener('scroll', setScrolled, { passive: true });
    }

    const toggle = document.querySelector('[data-nav-toggle]');
    const mobileNav = document.querySelector('[data-mobile-nav]');
    const searchTrigger = document.querySelector('pagefind-modal-trigger.search-icon-button');

    const hydrateEmailLinks = () => {
      document.querySelectorAll('[data-email-link][data-email]').forEach((link) => {
        if (link.dataset.emailLoaded) return;
        try {
          const email = window.atob(link.dataset.email || '');
          link.href = `mailto:${email}`;
          const label = link.querySelector('[data-email-text]');
          if (label) label.textContent = email;
          link.dataset.emailLoaded = 'true';
        } catch {
          link.removeAttribute('href');
        }
      });
    };

    document.querySelectorAll('[data-email-link]').forEach((link) => {
      link.addEventListener('focus', hydrateEmailLinks, { once: true });
      link.addEventListener('pointerenter', hydrateEmailLinks, { once: true });
    });

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(hydrateEmailLinks);
    } else {
      window.setTimeout(hydrateEmailLinks, 500);
    }

    const isEditableTarget = (target) => {
      if (!target || !(target instanceof HTMLElement)) {
        return false;
      }

      const tag = target.tagName;
      return (
        target.isContentEditable ||
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT'
      );
    };

    document.addEventListener('keydown', (event) => {
      const isSearchShortcut =
        (event.metaKey || event.ctrlKey) &&
        !event.shiftKey &&
        !event.altKey &&
        event.key.toLowerCase() === 'k';

      if (!isSearchShortcut || isEditableTarget(event.target)) {
        return;
      }

      event.preventDefault();
      searchTrigger?.click();
    });

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

      toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
      mobileNav.addEventListener('click', (event) => {
        if (event.target.closest('a')) setOpen(false);
      });
    }

    document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const id = (link.getAttribute('href') || '').replace(/^\/?#/, '');
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
    if (revealItems.length && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: '0px 0px -80px 0px' }
      );
      revealItems.forEach((item) => observer.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add('is-visible'));
    }

    const search = document.getElementById('search');
    if (search) {
      const status = document.getElementById('search-status');
      if (typeof PagefindUI === 'undefined') {
        if (status) status.hidden = false;
        return;
      }
      new PagefindUI({
        element: '#search',
        showImages: false,
        processResult: (result) => {
          const meta = result?.meta || {};
          if (meta.source_url) result.url = meta.source_url;
          if (meta.title) result.title = meta.site ? `${meta.title} | ${meta.site}` : meta.title;
          if (meta.description) result.excerpt = meta.description;
          return result;
        }
      });
    }
  });
})();
