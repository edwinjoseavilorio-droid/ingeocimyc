// ========================================
// AUTENTICACIÓN - Funciones de sesión
// ========================================

// Función para cerrar sesión
function logout() {
  localStorage.removeItem('loggedIn');
  window.location.replace('./components/login/login.html');
}

