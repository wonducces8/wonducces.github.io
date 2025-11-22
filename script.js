const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.querySelector('.back-to-top');
const modal = document.querySelector('.modal');
const modalImage = document.querySelector('.modal__image');
const modalCaption = document.querySelector('.modal__caption');
const modalClose = document.querySelector('.modal__close');
const activitiesGrid = document.getElementById('activities-grid');
const activitiesData = document.getElementById('activities-data');

// Mobile navigation toggle
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Smooth scroll for nav links
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target?.scrollIntoView({ behavior: 'smooth' });
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Back to top button
window.addEventListener('scroll', () => {
  const show = window.scrollY > 400;
  backToTop.classList.toggle('show', show);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Gallery modal
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    const full = item.getAttribute('data-full');
    const caption = item.querySelector('figcaption')?.textContent || '';
    modalImage.src = full;
    modalCaption.textContent = caption;
    modal.classList.add('open');
  });
});

modalClose.addEventListener('click', () => {
  modal.classList.remove('open');
  modalImage.src = '';
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.remove('open');
    modalImage.src = '';
  }
});

// Render activities from the JSON block for easy editing
if (activitiesGrid && activitiesData?.textContent) {
  try {
    const parsed = JSON.parse(activitiesData.textContent);
    parsed.items?.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'card';

      const title = document.createElement('h3');
      title.textContent = item.title;

      const description = document.createElement('p');
      description.textContent = item.description;

      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = item.badge;

      card.append(title, description, badge);
      activitiesGrid.appendChild(card);
    });
  } catch (err) {
    console.error('Unable to parse activities data', err);
  }
}
