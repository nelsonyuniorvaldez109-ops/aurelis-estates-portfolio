const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const navigation = document.querySelector('[data-nav]');
const form = document.querySelector('.inquiry-form');
const formNote = document.querySelector('.form-note');

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 40);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton.addEventListener('click', () => {
  const isOpen = header.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  header.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

const parallaxImages = document.querySelectorAll('[data-parallax]');
function updateParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  parallaxImages.forEach(image => {
    const box = image.getBoundingClientRect();
    const offset = (box.top + box.height / 2 - window.innerHeight / 2) * -0.045;
    image.style.transform = `scale(1.06) translateY(${offset}px)`;
  });
}
window.addEventListener('scroll', updateParallax, { passive: true });
updateParallax();

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    formNote.textContent = 'Please complete the required fields.';
    return;
  }
  formNote.textContent = 'Thank you. This demo form does not send data.';
  form.reset();
});
