// ========================================
// SCRIPT PRINCIPAL - Carga de componentes
// ========================================

// Cargar archivos HTML de componentes dinámicamente
// Esto permite tener componentes separados y mantener el código más organizado
async function loadFragment(id, url) {
  try {
    // Fetch obtiene el archivo HTML del componente
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    
    // Convierte la respuesta a texto (HTML)
    const html = await res.text();
    
    // Busca el elemento con el id especificado e inserta el HTML
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  } catch (err) {
    console.warn('Error cargando:', url, err);
  }
}

// Mostrar notificaciones temporales en la pantalla
function showToast(msg) {
  let toast = document.querySelector('.toast');
  
  // Si no existe, crea el elemento del toast
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  
  // Muestra el mensaje y lo anima
  toast.textContent = msg;
  toast.classList.add('show');
  
  // Oculta el toast después de 3 segundos
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Cargar productos desde el archivo JSON
async function loadProducts() {
  try {
    const res = await fetch('data/products.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    
    // Convierte JSON a array de productos
    const products = await res.json();
    
    // Busca el contenedor donde van los productos
    const container = document.querySelector('.grid.cards');
    if (!container) return;
    
    // Limpia el contenedor antes de agregar nuevos items
    container.innerHTML = '';
    
    // Recorre cada producto y crea una tarjeta
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

// Inicializar elementos interactivos de la página
function initUI() {
  // Menú móvil - Toggle del menú en pantallas pequeñas
  const menuBtn = document.querySelector('.menu-btn');
  const mainNav = document.querySelector('.main-nav');
  
  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('open');  // Abre/cierra el menú
    });
  }

  // Formulario de contacto - Captura el envío
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();  // Previene recarga de página
      showToast('Mensaje enviado!');
      contactForm.reset();  // Limpia los campos
    });
  }

  // Cargar los productos a la página
  loadProducts();
}

// ========================================
// LISTA DE COMPONENTES A CARGAR
// ========================================
// Cada componente está en su propia carpeta y .html
// Se cargan dinámicamente al iniciar la página
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

// Cuando cargue el HTML, ejecuta las funciones de inicialización
document.addEventListener('DOMContentLoaded', async () => {
  // Carga todos los componentes en paralelo (Promise.all es más rápido que secuencial)
  await Promise.all(components.map(c => loadFragment(c.id, c.url)));
  
  // Después de cargar, inicializa los eventos interactivos
  initUI();
});

