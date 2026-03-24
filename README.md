# INGEOCIMYC - Laboratorio de Geotecnia y Concretos

Sistema web educativo modularizado con autenticación, carga dinámica de componentes y gestión de productos.

## ⚠️ Nota Importante - SOLO EDUCATIVO

**Esta es una aplicación educativa.** Las credenciales están almacenadas en el código (hardcodeadas) y **NO es segura para producción**. 

En un entorno real, debe implementar:
- Servidor backend con validación segura
- Tokens JWT o sesiones seguras
- HTTPS obligatorio
- Protección contra ataques (CSRF, XSS, etc.)

## 📋 Credenciales Demo

```
Usuario: admin
Contraseña: 1234
```

## 🎯 Características Principales

### 1. **Autenticación (Login)**

Sistema de login simple con protección de ruta:

- Página `login.html` con formulario básico
- Archivo `auth.js` maneja la lógica de autenticación
- Protección: Si no está autenticado, redirige a login
- Almacena token en `localStorage`

**Archivos:**
- `login.html` - Formulario de inicio de sesión
- `auth.js` - Lógica de autenticación

**Cómo funciona:**
```javascript
// auth.js
function login(username, password) {
  if (username === 'admin' && password === '1234') {
    localStorage.setItem('loggedIn', 'true');
    return true;
  }
  return false;
}
```

### 2. **Fragmentos Reutilizables (HTML Fragments)**

Los fragmentos son archivos HTML que se cargan dinámicamente en la página principal sin recargarla.

```
components/
├── header/header.html       → Logo y navegación principal
├── footer/footer.html       → Derechos reservados
├── sidebar/sidebar.html     → Menú lateral
├── hero/hero.html          → Sección principal
├── services/services.html   → Servicios ofrecidos
├── projects/projects.html   → Proyectos realizados
├── clients/clients.html     → Clientes trabajados
├── cert/cert.html          → Certificaciones
└── contact/contact.html     → Formulario de contacto
```

**Ventajas de fragmentos:**
- ✅ Reutilización de código
- ✅ Separación de responsabilidades
- ✅ Más fácil de mantener
- ✅ Carga dinámica sin recarga de página

**Implementación:**
```javascript
// script.js
async function loadFragment(id, url) {
  const res = await fetch(url);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

// Cargar todos en paralelo
await Promise.all(components.map(c => loadFragment(c.id, c.url)));
```

### 3. **Plantillas HTML (`<template>`)**

Las plantillas definen estructura reutilizable para productos.

```html
<template id="product-template">
  <article class="card">
    <img src="" alt="">
    <h3></h3>
    <p class="product-desc"></p>
    <p class="product-price"></p>
    <button class="btn primary">Más info</button>
  </article>
</template>
```

**Características:**
- No se renderiza hasta usarse
- Se clona múltiples veces
- Rápido y eficiente

### 4. **Carga de Datos Externos (Fetch API)**

Los productos se cargan dinámicamente desde `data/products.json`:

```javascript
async function loadProducts() {
  const res = await fetch('data/products.json');
  const products = await res.json();
  
  products.forEach(product => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>$${product.price}</p>
    `;
    container.appendChild(card);
  });
}
```

**Archivo:** `data/products.json`

Contiene 3 servicios principales:
1. Ensayo de Suelos
2. Control de Calidad - Concreto
3. Mezclas Asfálticas

### 5. **Web Components (Extensible)**

El proyecto está estructurado para permitir Web Components personalizadas:

```javascript
class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  // Encapsulación de estilos y estructura
}
customElements.define('product-card', ProductCard);
```

## 📁 Estructura del Proyecto

```
ingeocimyc/
├── index.html              → Página principal
├── login.html              → Página de autenticación
├── script.js               → Script principal (carga componentes)
├── auth.js                 → Lógica de autenticación
├── styles.css              → Estilos globales
├── README.md               → Este archivo
├── components/             → Fragmentos HTML
│   ├── header/
│   │   └── header.html
│   ├── footer/
│   │   └── footer.html
│   ├── sidebar/
│   │   └── sidebar.html
│   ├── hero/
│   ├── services/
│   ├── projects/
│   ├── clients/
│   ├── cert/
│   └── contact/
├── data/
│   └── products.json       → Datos de productos
└── assets/                 → Imágenes y recursos
```

## 🔄 Flujo de Autenticación

```
1. Usuario accede a http://localhost/index.html
   ↓
2. auth.js verifica localStorage['loggedIn']
   ↓
3. ¿Está autenticado? 
   ├─ NO  → Redirige a login.html
   └─ SÍ  → Carga script.js
   ↓
4. Usuario ingresa usuario: admin | contraseña: 1234
   ↓
5. ¿Credenciales válidas?
   ├─ NO  → Muestra error
   └─ SÍ  → localStorage['loggedIn'] = 'true' → Redirige a index.html
```

## 📊 Flujo de Carga de Página Principal

```
1. index.html carga en navegador
   ↓
2. Cargan auth.js y script.js
   ↓
3. auth.js verifica autenticación
   ↓
4. script.js ejecuta al DOMContentLoaded:
   ├─ Carga todos los fragmentos en paralelo (Promise.all)
   ├─ Inicializa eventos (menú móvil, formularios)
   ├─ Carga productos desde data/products.json
   └─ Renderiza en la página
```

## 🎨 Colores de Marca

```css
--primary: #034f84       /* Azul principal */
--accent: #012a4a        /* Azul oscuro */
--bg: #f7f9fb           /* Fondo claro */
--card: #ffffff         /* Tarjetas */
--muted: #6b7280        /* Texto gris */
```

## ✅ Buenas Prácticas Aplicadas

### Naming (Nomenclatura)
- ✅ camelCase para variables y funciones: `loadProducts()`
- ✅ kebab-case para clases CSS: `product-card`
- ✅ PascalCase para clases JS: `ProductCard`
- ✅ SCREAMING_SNAKE_CASE para constantes: `VALID_USER`

### Estructura de Código
- ✅ Funciones pequeñas y reutilizables
- ✅ Un archivo, una responsabilidad
- ✅ Comentarios en secciones complejas
- ✅ Sin código duplicado (DRY)

### Accesibilidad (A11y)
- ✅ Labels asociados a inputs
- ✅ Aria-live para mensajes dinámicos
- ✅ Atributos alt en imágenes
- ✅ Navegación con teclado

### Responsive Design
- ✅ Media queries para móviles
- ✅ Menú hamburguesa adaptativo
- ✅ Layouts flexibles con Flexbox/Grid

### Seguridad
- ⚠️ Credenciales hardcodeadas (SOLO EDUCATIVO)
- ⚠️ Sin validación de servidor
- ⚠️ Sin protección CSRF
- 📌 Nota: Implementar en producción

## 🚀 Cómo Usar

### Acceso Local

1. Abre tu navegador
2. Ve a `login.html`
3. Ingresa las credenciales:
   - Usuario: `admin`
   - Contraseña: `1234`
4. Serás redirigido a `index.html`

### Servir Localmente

**Opción 1: Python 3**
```bash
cd ingeocimyc
python -m http.server 8000
# Accede a http://localhost:8000/login.html
```

**Opción 2: Node.js (http-server)**
```bash
npm install -g http-server
http-server
```

**Opción 3: VS Code Live Server**
- Click derecho en `login.html`
- "Open with Live Server"

## 📚 Explicación de Conceptos

### **¿Qué son Fragmentos?**
Fragmentos son archivos HTML independientes que se cargan dinámicamente:
- Se cargan con `fetch()`
- Se insertan en el DOM con `innerHTML`
- No requieren recargar la página
- Facilita mantenimiento

**Ejemplo:**
```javascript
// Carga components/header/header.html en <div id="site-header">
await loadFragment('site-header', 'components/header/header.html');
```

### **¿Qué son Plantillas?**
Bloques HTML que definen estructura reutilizable:
- Se guardan en `<template>` 
- Se clonan múltiples veces
- Contienen contenido que se rellena dinamicamente
- Ideal para listas de productos

**Ejemplo:**
```html
<template id="product-template">
  <article class="card">...</article>
</template>
```

### **¿Qué son Web Components?**
Elementos HTML personalizados con encapsulación:
- **Shadow DOM:** Aislamiento de estilos
- **Custom Elements:** Tags propios (ej: `<product-card>`)
- **HTML Templates:** Reutilización de estructura
- Estándar web moderno

**Ejemplo:**
```javascript
class ProductCard extends HTMLElement {
  // Lógica propia encapsulada
}
customElements.define('product-card', ProductCard);

// Uso:
// <product-card name="Producto" price="1000"></product-card>
```

## 🔐 Seguridad - IMPORTANTE

**NUNCA usar en producción:**
```javascript
// ❌ INSEGURO - Credenciales en el cliente
const VALID_USER = 'admin';
const VALID_PASS = '1234';
```

**En producción, usar:**
```javascript
// ✅ SEGURO - Validación en servidor
const response = await fetch('/api/login', {
  method: 'POST',
  body: JSON.stringify({ username, password })
});
// Recibir JWT token del servidor
```

## 💡 Posibles Mejoras

- [ ] Implementar logout funcional
- [ ] Agregar más validaciones en login
- [ ] Incluir animaciones de carga
- [ ] Mejorar diseño con Bootstrap o Tailwind
- [ ] Agregar más servicios/productos
- [ ] Implementar carrito de compras
- [ ] Conectar con backend real
- [ ] Agregar gestor de imágenes

## 🛠️ Tecnologías Utilizadas

| Tecnología | Uso |
|-----------|-----|
| HTML5 | Estructura |
| CSS3 | Estilos y responsive |
| JavaScript ES6+ | Lógica interactiva |
| Fetch API | Cargar datos |
| LocalStorage | Persistencia de sesión |
| Font Awesome | Iconos |

## 👥 Trabajo en Equipo

**Este proyecto demuestra:**
- ✅ Modularización del código
- ✅ Separación de responsabilidades
- ✅ Componentes reutilizables
- ✅ Buenas prácticas de desarrollo
- ✅ Estructura escalable

**Para colaboración:**
```bash
# Crear rama para nueva característica
git checkout -b feature/nueva-funcionalidad

# Hacer commits descriptivos
git commit -m "feat: agregar validación de email"

# Push y crear Pull Request
git push origin feature/nueva-funcionalidad
```

## 📝 Notas Finales

Este proyecto es una base educativa para entender:
- Cómo organizar código en componentes
- Cómo cargar datos dinámicamente
- Cómo implementar autenticación simple
- Buenas prácticas de desarrollo web

Para producción, requiere mejoras significativas en seguridad y arquitectura.

---

**Proyecto:** INGEOCIMYC - Laboratorio de Geotecnia y Concretos  
**Tipo:** Aplicación Web Educativa  
**Última actualización:** Marzo 2026  
**Licencia:** Educativa

