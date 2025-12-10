document.addEventListener('DOMContentLoaded', function(){
  const menuBtn = document.querySelector('.menu-btn');
  const mainNav = document.querySelector('.main-nav');
  if (menuBtn) {
    menuBtn.addEventListener('click', function(){
      mainNav.classList.toggle('open');
      const open = mainNav.classList.contains('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  function showToast(msg){
    let toast = document.querySelector('.toast');
    if(!toast){
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    if(window._toastTimer) clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(()=>{
      toast.classList.remove('show');
    }, 3000);
  }

  const contactForm = document.querySelector('.contact-form');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      showToast('te contactare muy pronto');
      contactForm.reset();
    });
  }

  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="Cerrar">×</button>
      <img src="" alt="">
    </div>`;
  document.body.appendChild(lightbox);

  const lbImg = lightbox.querySelector('img');
  const lbClose = lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('.lightbox-trigger').forEach(img => {
    img.addEventListener('click', (e) => {
      const src = img.dataset.src || img.src;
      lbImg.src = src;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });

  lbClose.addEventListener('click', () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
  });

  lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox) {
      lbClose.click();
    }
  });

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape'){
      if(lightbox.classList.contains('open')) lbClose.click();
      if(mainNav.classList.contains('open')) mainNav.classList.remove('open');
    }
  });
});
