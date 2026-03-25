# Sistema de Autenticación - INGEOCIMYC

## ¿Cómo funciona?

El login es **100% obligatorio** para acceder a cualquier contenido de la página.

### Flujo de acceso:

```
1. Usuario abre index.html
   ↓
2. Script en el <head> verifica: ¿localStorage.loggedIn === 'true'?
   ↓
   NO → Redirige a ./components/login/login.html
   SÍ → Carga la página principal
   ↓
3. Usuario ve el formulario de login
   ↓
4. Ingresa credenciales: admin / 1234
   ↓
5. Sistema valida credenciales
   ↓
   ✅ Si son correctas:
      - Guarda loggedIn: 'true' en localStorage
      - Redirige a index.html
      - Página se carga correctamente
   
   ❌ Si son incorrectas:
      - Muestra error
      - Limpia campos
      - Usuario intenta de nuevo
```

## Credenciales

- **Usuario:** `admin`
- **Contraseña:** `1234`

## Cómo funciona la seguridad

1. **Bloqueo en `index.html`**: Antes de cargar CUALQUIER cosa, verifica autenticación
2. **localStorage**: Guarda sesión en el navegador
3. **Redirección con `replace()`**: No permite volver atrás en el historial

## Para probar

1. **Abre DevTools** (F12)
2. **Ve a Application → LocalStorage**
3. **Elimina la entrada `loggedIn`**
4. **Recarga la página**
5. Deberías ver el login
6. Ingresa: `admin` / `1234`
7. ✅ Acceso a la página

## Cerrar sesión

Usa la función en JavaScript:

```javascript
logout() // Borra autenticación y vuelve a login
```

O elimina manualmente en DevTools el localStorage.
