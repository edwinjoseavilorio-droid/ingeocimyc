// ========================================
// SCRIPT PRINCIPAL - Carga de componentes
// ========================================

async function loadFragment(id, url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    
    const html = await res.text();
    
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  } catch (err) {
    console.warn('Error cargando:', url, err);
  }
}

function showToast(msg) {
  let toast = document.querySelector('.toast');
  
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  
  toast.textContent = msg;
  toast.classList.add('show');
  
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

async function loadProducts() {
  try {
    const res = await fetch('data/products.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    
    const products = await res.json();
    
    const container = document.querySelector('.grid.cards');
    if (!container) return;
    
    container.innerHTML = '';
    
    products.forEach(product => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <img class="product-img" src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <p class="product-price">$${Number(product.price).toLocaleString('es-CO')}</p>
        <button class="btn primary">Más info</button>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error('Error cargando productos:', err);
  }
}

function initUI() {
  const menuBtn = document.querySelector('.menu-btn');
  const mainNav = document.querySelector('.main-nav');
  
  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
  }

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Mensaje enviado!');
      contactForm.reset();
    });
  }

  loadProducts();
}

// ========================================
// LISTA DE COMPONENTES A CARGAR
// ========================================
const components = [
  { id: 'site-header', url: 'components/header/header.html' },
  { id: 'site-hero', url: 'components/hero/hero.html' },
  { id: 'site-cert', url: 'components/cert/cert.html' },
  { id: 'site-services', url: 'components/services/services.html' },
  { id: 'site-projects', url: 'components/projects/projects.html' },
  { id: 'site-contact', url: 'components/contact/contact.html' },
  { id: 'site-clients', url: 'components/clients/clients.html' },
  { id: 'site-footer', url: 'components/footer/footer.html' }
];

document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all(components.map(c => loadFragment(c.id, c.url)));
  
  initUI();
});

