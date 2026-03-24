/**
 * auth.js - Autenticación simple
 * NOTA: Credenciales quemadas solo para fines educativos
 */

const VALID_USER = 'admin';
const VALID_PASS = '1234';

// Proteger página principal
if (window.location.pathname.includes('index.html') && !isAuthenticated()) {
  window.location.href = 'login.html';
}

function isAuthenticated() {
  return localStorage.getItem('loggedIn') === 'true';
}

function login(username, password) {
  if (username === VALID_USER && password === VALID_PASS) {
    localStorage.setItem('loggedIn', 'true');
    return true;
  }
  return false;
}

function logout() {
  localStorage.removeItem('loggedIn');
  window.location.href = 'login.html';
}

// Formulario de login
if (document.getElementById('login-form')) {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const errorMsg = document.getElementById('error-msg');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      if (login(username, password)) {
        window.location.href = 'index.html';
      } else {
        errorMsg.textContent = 'Usuario o contraseña incorrectos';
      }
    });
  });
}

