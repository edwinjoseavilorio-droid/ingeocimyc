# Estructura de CSS - INGEOCIMYC

## Descripción
Se ha reestructurado el CSS del proyecto para separar estilos por componente, manteniendo el código más organizado y mantenible.

## Estructura de Archivos

```
styles.css (principal)
├── components/
│   ├── global.css           (variables y estilos base)
│   ├── header/header.css    (estilos del header)
│   ├── hero/hero.css        (estilos de la sección hero)
│   ├── services/services.css (estilos de servicios/cards)
│   ├── projects/projects.css (estilos de proyectos)
│   ├── contact/contact.css  (estilos del formulario de contacto)
│   ├── clients/clients.css  (estilos de grid de clientes)
│   ├── footer/footer.css    (estilos del footer)
│   ├── sidebar/sidebar.css  (estilos de sidebar)
│   ├── cert/cert.css        (estilos de certificados)
│   └── testimonials/testimonials.css (estilos de testimonios)
└── login.css (estilos de login)
```

## Cómo Funciona

- El archivo `styles.css` principal ahora solo contiene importaciones (`@import`) de todos los demás archivos CSS
- Todos los HTML siguen vinculando únicamente a `styles.css`, que automáticamente carga todos los estilos necesarios
- Las variables globales y estilos base están centralizados en `components/global.css`

## Ventajas

✅ Mejor organización del código  
✅ Fácil mantenimiento de estilos por componente  
✅ Escalabilidad para nuevos componentes  
✅ Separación de responsabilidades  

## Cómo Añadir Nuevos Estilos

1. **Para un componente existente**: Edita el archivo CSS dentro de `components/nombre/`
2. **Para un nuevo componente**: 
   - Crea la carpeta `components/nuevo-componente/`
   - Crea `nuevo-componente.css`
   - Añade el import en `styles.css`: `@import url('./components/nuevo-componente/nuevo-componente.css');`

## Notas
- No es necesario modificar los archivos HTML
- Los estilos se cargan automáticamente a través de los imports
