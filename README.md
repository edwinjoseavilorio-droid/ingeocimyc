
**Proyecto**: INGEOCIMYC — Maquetado de la página principal
- **Descripción**: Versión estática de la página principal para el laboratorio de geotecnia y concretos INGEOCIMYC, creada tomando como guía el sitio oficial `https://ingeocimyc.com.co/`. Incluye secciones: inicio, servicios, proyectos, contacto y clientes.

**Archivos principales**
- `index.html`: estructura y contenido de la página.
- `styles.css`: estilos globales del sitio.
- `script.js`: script de interacción (menú, lightbox, formularios y enlaces de contacto).
- `assets/`: imágenes y recursos usados por la página.

**Características implementadas**
- Enlaces de contacto rápidos (teléfono, correo, Instagram, Facebook, WhatsApp).
- Botón flotante de WhatsApp (`.whatsapp-fab`).
- Lightbox para ver imágenes de proyectos.
- Formulario de contacto con notificación rápida (toast).

**Cómo probar localmente**
- Abrir `index.html` directamente en el navegador (prueba rápida).
- O servir desde un servidor local para evitar problemas con rutas y seguridad (recomendado):

```powershell
# desde la carpeta del proyecto
# si tienes Python 3 instalado
python -m http.server 8000
# luego abrir http://localhost:8000
```

**Editar el número de WhatsApp / mensaje**
- En `script.js` hay una constante para el número y el mensaje (formato internacional sin `+`). Busca `WHATSAPP_NUMBER` y `WHATSAPP_MESSAGE` y cámbialos por tus valores.
- Ejemplo: `const WHATSAPP_NUMBER = '5730XXXXXXXX';`

Si prefieres que el botón “Llámanos” abra WhatsApp en vez de iniciar una llamada telefónica, cambia el `href="tel:3013517044"` en `index.html` por un enlace tipo `https://wa.me/5730XXXXXXXX?text=Tu%20mensaje%20aqui`.

**Créditos y referencia**
- Esta maqueta fue desarrollada tomando como guía la información pública disponible en `https://ingeocimyc.com.co/` (servicios, datos de contacto y certificaciones).

**Siguientes pasos sugeridos**
- Mover estilos del aviso de WhatsApp a `styles.css` para mantener consistencia.
- Añadir validación y envío real para el formulario (backend o servicio de terceros).
- Preparar instrucciones de despliegue si quieres publicar la maqueta.

