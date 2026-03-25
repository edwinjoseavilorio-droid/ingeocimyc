# 📚 GUÍA DE ESTUDIO - Código Comentado

## 🔐 SISTEMA DE AUTENTICACIÓN

### 1. **index.html** - Bloqueo de Acceso
```javascript
// Este código ejecuta ANTES de cargar cualquier contenido
if (localStorage.getItem('loggedIn') !== 'true') {
  window.location.replace('./components/login/login.html');
}
```
**¿Qué hace?**
- Verifica si el usuario está autenticado
- Si NO → Lo redirige al login
- Si SÍ → Le permite ver la página

---

### 2. **components/login/login.html** - Validación de Credenciales
```javascript
const VALID_USER = 'admin';
const VALID_PASS = '1234';

// Si usuario y contraseña son correctas...
if (username === VALID_USER && password === VALID_PASS) {
  // Guardar en localStorage que está autenticado
  localStorage.setItem('loggedIn', 'true');
  
  // Ir a la página principal
  window.location.replace('../../index.html');
}
```
**¿Qué hace?**
- Compara credenciales ingresadas
- Si son correctas → Guarda sesión y redirige
- Si son incorrectas → Muestra error

---

### 3. **auth.js** - Cerrar Sesión
```javascript
function logout() {
  localStorage.removeItem('loggedIn');  // Borra la sesión
  window.location.replace('./components/login/login.html');  // Va a login
}
```
**¿Qué hace?**
- Elimina la autenticación
- Redirige al login

---

## 📄 FUNCIONES PRINCIPALES

### **loadFragment()** - Cargar componentes HTML
```javascript
async function loadFragment(id, url) {
  const res = await fetch(url);  // Obtiene el archivo
  const html = await res.text();  // Lo convierte a texto
  document.getElementById(id).innerHTML = html;  // Lo inserta en la página
}
```

### **loadProducts()** - Cargar productos desde JSON
```javascript
const products = await res.json();  // Lee los productos
products.forEach(product => {
  // Crea una tarjeta por cada producto
});
```

### **showToast()** - Notificaciones temporales
```javascript
showToast('Mensaje enviado!');  // Muestra un mensaje por 3 segundos
```

---

## 🎯 FLUJO COMPLETO

```
1. Usuario abre index.html
   ↓
2. Script verifica: ¿localStorage.loggedIn === 'true'?
   ↓
   - NO → Redirige a login
   - SÍ → Carga la página
   ↓
3. Si va a login:
   - Ingresa admin / 1234
   - Se valida
   - Se guarda en localStorage
   - Redirige a index
   ↓
4. Ahora sí puede ver todo el contenido
```

---

## 📌 CONCEPTOS CLAVE

| Concepto | Explicación |
|----------|------------|
| **localStorage** | Almacenamiento en el navegador que persiste |
| **fetch()** | Obtiene archivos del servidor |
| **window.location.replace()** | Redirige sin guardar en el historial |
| **e.preventDefault()** | Evita que se recargue la página |
| **Promise.all()** | Ejecuta múltiples tareas a la vez |
| **async/await** | Para usar funciones que tardan tiempo |

---

## ✅ DIFERENCIAS

### Antes (Código sin comentarios)
```javascript
if (localStorage.getItem('loggedIn') !== 'true') {
  window.location.replace('./components/login/login.html');
}
```

### Después (Código comentado para estudio)
```javascript
// Si el usuario NO está autenticado, redirige al login
if (localStorage.getItem('loggedIn') !== 'true') {
  // window.location.replace() redirige sin guardar en el historial
  window.location.replace('./components/login/login.html');
}
```

---

## 🗑️ PARA ENTREGAR AL PROFESOR

Simplemente **elimina todos los comentarios** antes de presentar:
- Mantén solo el código
- Los comentarios explicativos se quitan
- El código sigue funcionando igual

