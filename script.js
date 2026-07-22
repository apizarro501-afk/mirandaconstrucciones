// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Contact form → redirect to WhatsApp
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const servicio = document.getElementById('servicio').value;
  const mensaje = document.getElementById('mensaje').value;
  const telefono = document.getElementById('telefono').value;

  let text = `Hola, mi nombre es *${nombre}*.`;
  if (servicio) text += ` Me interesa: *${servicio}*.`;
  if (mensaje) text += ` ${mensaje}`;
  if (telefono) text += ` Mi teléfono es ${telefono}.`;

  window.open(`https://wa.me/56995374842?text=${encodeURIComponent(text)}`, '_blank');
});

// Smooth reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.servicio-card, .porto-card, .stat').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Lightbox gallery
const galleries = {
  'casa-el-retiro-olmue': {
    name: 'Casa El Retiro — Olmué',
    images: [
      'WhatsApp Image 2026-06-16 at 20.18.37.jpeg',
      'WhatsApp Image 2026-06-16 at 20.18.37 (1).jpeg',
      'WhatsApp Image 2026-06-16 at 20.18.37 (2).jpeg',
      'WhatsApp Image 2026-06-16 at 20.18.38.jpeg',
      'WhatsApp Image 2026-06-16 at 20.18.38 (1).jpeg',
    ]
  },
  'casa-quebrada-alvarado-200m2': {
    name: 'Casa Quebrada Alvarado — 200 m²',
    images: [
      'WhatsApp Image 2026-06-16 at 20.18.28.jpeg',
      'WhatsApp Image 2026-06-16 at 20.18.28 (1).jpeg',
      'WhatsApp Image 2026-06-16 at 20.18.28 (2).jpeg',
      'WhatsApp Image 2026-06-16 at 20.18.28 (3).jpeg',
      'WhatsApp Image 2026-06-16 at 20.18.29.jpeg',
    ]
  },
  'casa-ojos-buenos-140m2': {
    name: 'Casa Ojos Buenos — Olmué 140 m²',
    images: [
      'WhatsApp Image 2026-06-16 at 20.22.32.jpeg',
      'WhatsApp Image 2026-06-16 at 20.22.32 (1).jpeg',
      'WhatsApp Image 2026-06-16 at 20.22.32 (2).jpeg',
      'WhatsApp Image 2026-06-16 at 20.22.32 (3).jpeg',
      'WhatsApp Image 2026-06-16 at 20.22.32 (4).jpeg',
    ]
  },
  'las-encinas-limache-p1': {
    name: 'Condominio Las Encinas — Limache (Parte 1)',
    images: [
      'WhatsApp Image 2026-06-16 at 20.32.27.jpeg',
      'WhatsApp Image 2026-06-16 at 20.32.27 (1).jpeg',
      'WhatsApp Image 2026-06-16 at 20.32.28.jpeg',
      'WhatsApp Image 2026-06-16 at 20.32.28 (1).jpeg',
      'WhatsApp Image 2026-06-16 at 20.32.28 (2).jpeg',
    ]
  },
  'las-encinas-limache-p2': {
    name: 'Condominio Las Encinas — Limache (Parte 2)',
    images: [
      'WhatsApp Image 2026-06-16 at 20.36.51.jpeg',
      'WhatsApp Image 2026-06-16 at 20.36.52.jpeg',
      'WhatsApp Image 2026-06-16 at 20.36.52 (1).jpeg',
      'WhatsApp Image 2026-06-16 at 20.36.52 (2).jpeg',
      'WhatsApp Image 2026-06-16 at 20.36.52 (3).jpeg',
    ]
  },
  'mini-condominio-ojos-buenos': {
    name: 'Mini Condominio 4 Casas — Ojos Buenos, Olmué',
    images: [
      'WhatsApp Image 2026-06-16 at 20.59.37.jpeg',
      'WhatsApp Image 2026-06-16 at 20.59.37 (1).jpeg',
      'WhatsApp Image 2026-06-16 at 20.59.37 (2).jpeg',
      'WhatsApp Image 2026-06-16 at 20.59.37 (3).jpeg',
      'WhatsApp Image 2026-06-16 at 20.59.38.jpeg',
    ]
  },
  'casa-los-pinos-renaca-221m2': {
    name: 'Casa Los Pinos — Reñaca 221 m² (en construcción)',
    images: [
      'WhatsApp Image 2026-06-16 at 20.24.24.jpeg',
      'WhatsApp Image 2026-06-16 at 20.24.25.jpeg',
      'WhatsApp Image 2026-06-16 at 20.24.25 (1).jpeg',
      'WhatsApp Image 2026-06-16 at 20.24.25 (2).jpeg',
      'WhatsApp Image 2026-06-16 at 20.24.26.jpeg',
    ]
  }
};

let currentGallery = null;
let currentIndex = 0;

function openGallery(key) {
  currentGallery = galleries[key];
  currentIndex = 0;
  showPhoto();
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function showPhoto() {
  const img = document.getElementById('lbImg');
  const caption = document.getElementById('lbCaption');
  const file = currentGallery.images[currentIndex];
  const folder = Object.keys(galleries).find(k => galleries[k] === currentGallery);
  img.src = `images/${folder}/${file}`;
  img.alt = currentGallery.name;
  caption.textContent = `${currentGallery.name} — ${currentIndex + 1} / ${currentGallery.images.length}`;
}

function changePhoto(dir) {
  currentIndex = (currentIndex + dir + currentGallery.images.length) % currentGallery.images.length;
  showPhoto();
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (!document.getElementById('lightbox').classList.contains('active')) return;
  if (e.key === 'ArrowRight') changePhoto(1);
  if (e.key === 'ArrowLeft') changePhoto(-1);
  if (e.key === 'Escape') closeLightbox();
});
