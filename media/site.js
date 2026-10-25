document.querySelectorAll('[data-menu-toggle]').forEach((button) => {
  const menu = document.getElementById(button.getAttribute('aria-controls'));

  const setMenuOpen = (isOpen) => {
    button.setAttribute('aria-expanded', String(isOpen));
    button.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    button.innerHTML = `<i data-lucide="${isOpen ? 'x' : 'menu'}" class="w-5 h-5"></i>`;
    menu.classList.toggle('hidden', !isOpen);
    menu.classList.toggle('flex', isOpen);
    lucide.createIcons();
  };

  button.addEventListener('click', () => {
    setMenuOpen(button.getAttribute('aria-expanded') !== 'true');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      button.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (button.getAttribute('aria-expanded') === 'true' && !button.contains(event.target) && !menu.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && button.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
    }
  });
});