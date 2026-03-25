// ========================================
// AUTENTICACIÓN - Funciones de sesión
// ========================================

// Función para cerrar sesión
// Elimina la sesión del usuario y lo redirige al login
function logout() {
  localStorage.removeItem('loggedIn');  // Elimina la autenticación guardada
  window.location.replace('./components/login/login.html');  // Redirige al login
}

