const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.querySelector('.back-to-top');
const activitiesGrid = document.getElementById('activities-grid');
const slidesEmbed = document.getElementById('slides-embed');
const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

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

async function renderActivities() {
  if (!activitiesGrid) return;

  try {
    const response = await fetch('/api/activities');
    const data = await response.json();

    data.items?.forEach((item) => {
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
    console.error('Unable to load activities', err);
  }
}

async function renderSlides() {
  if (!slidesEmbed) return;

  try {
    const response = await fetch('/api/slides');
    const data = await response.json();

    if (data.embedHtml) {
      slidesEmbed.innerHTML = data.embedHtml;
    } else {
      slidesEmbed.innerHTML = '<p class="slides__placeholder">Add your Google Slides embed code in data/slides.json.</p>';
    }
  } catch (err) {
    console.error('Unable to load slides', err);
    slidesEmbed.innerHTML = '<p class="slides__placeholder error">Unable to load the slideshow right now.</p>';
  }
}

async function submitContact(event) {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const payload = Object.fromEntries(formData.entries());

  contactStatus.textContent = 'Sending...';
  contactStatus.classList.remove('error');

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Unable to send message');
    }

    contactStatus.textContent = 'Message received — we will reply soon!';
    contactForm.reset();
  } catch (err) {
    console.error(err);
    contactStatus.textContent = 'Something went wrong. Please try again.';
    contactStatus.classList.add('error');
  }
}

renderActivities();
renderSlides();

if (contactForm) {
  contactForm.addEventListener('submit', submitContact);
}
