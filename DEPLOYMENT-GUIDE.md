# 🚀 Guía de Despliegue - HubSpot CMS Hub

## 📁 Archivos Necesarios

### 1. **Archivos del Build** (ya generados)
- `dist/assets/index-D9dCSfc7.css` → CSS compilado
- `dist/assets/index-C6qJ8fcH.js` → JavaScript compilado (ACTUALIZADO)
- `dist/index.html` → Referencia de estructura

### 2. **Archivos HubSpot** (creados)
- `hubspot-template.html` → Template HubL para HubSpot
- `hubspot-assets/catalogo-gift-cards.css` → CSS adicional optimizado

### 3. **Assets de Imágenes**
- `public/empty-state.svg`
- `public/favicon.ico`
- `public/placeholder.svg`
- Todas las imágenes de gift cards en `src/data/`

## 🔧 Pasos de Implementación

### **Paso 1: Subir Assets a HubSpot**

1. **Ir a File Manager:**
   - En tu portal HubSpot: `Marketing > Files and Templates > File Manager`

2. **Crear estructura de carpetas:**
   ```
   /catalogo-gift-cards/
   ├── css/
   │   ├── index-D9dCSfc7.css
   │   └── catalogo-gift-cards.css
   ├── js/
   │   └── index-B3yQ0gro.js
   └── images/
       ├── empty-state.svg
       ├── favicon.ico
       └── placeholder.svg
   ```

3. **Subir archivos:**
   - Sube `dist/assets/index-D9dCSfc7.css` a `/catalogo-gift-cards/css/`
   - Sube `dist/assets/index-C6qJ8fcH.js` a `/catalogo-gift-cards/js/` (ACTUALIZADO)
   - Sube `hubspot-assets/catalogo-gift-cards.css` a `/catalogo-gift-cards/css/`
   - Sube todas las imágenes de `public/` a `/catalogo-gift-cards/images/`

### **Paso 2: Crear Template en Design Manager**

1. **Ir a Design Manager:**
   - `Marketing > Files and Templates > Design Manager`

2. **Crear nuevo template:**
   - Click en `Create` → `Website page template`
   - Nombre: `Catálogo Gift Cards Template`

3. **Configurar template:**
   - Copia el contenido de `hubspot-template.html`
   - Actualiza las URLs de assets con las rutas correctas de tu File Manager

### **Paso 3: Actualizar URLs en el Template**

Reemplaza estas líneas en tu template con las URLs correctas:

```html
<!-- Antes -->
<link rel="stylesheet" href="{{ get_asset_url('./css/catalogo-gift-cards.css') }}">
<link rel="stylesheet" href="{{ get_asset_url('./css/index-D9dCSfc7.css') }}">
<script src="{{ get_asset_url('./js/index-C6qJ8fcH.js') }}"></script>

<!-- Después (ejemplo con tus URLs reales) -->
<link rel="stylesheet" href="https://your-portal.hs-sites.com/hubfs/catalogo-gift-cards/css/catalogo-gift-cards.css">
<link rel="stylesheet" href="https://your-portal.hs-sites.com/hubfs/catalogo-gift-cards/css/index-D9dCSfc7.css">
<script src="https://your-portal.hs-sites.com/hubfs/catalogo-gift-cards/js/index-C6qJ8fcH.js"></script>
```

### **Paso 4: Crear Página**

1. **Crear nueva página:**
   - `Marketing > Website > Website Pages`
   - Click en `Create` → `Website page`

2. **Configurar página:**
   - Nombre: `Catálogo de Gift Cards`
   - URL slug: `catalogo-gift-cards`
   - Template: Selecciona tu template creado

3. **Configurar SEO:**
   - Title: `Catálogo de Gift Cards | Tu Empresa`
   - Meta description: `Explora nuestro catálogo completo de gift cards para países de LATAM. Filtra por país y categoría.`

### **Paso 5: Publicar**

1. **Preview y test:**
   - Usa el preview para verificar que todo funciona
   - Prueba filtros, búsqueda y responsividad

2. **Publicar:**
   - Click en `Publish` cuando esté listo

## 🔍 Verificación Post-Despliegue

### **Checklist:**
- [ ] ✅ Página carga correctamente
- [ ] ✅ Filtros por país funcionan
- [ ] ✅ Filtros por categoría funcionan
- [ ] ✅ Búsqueda funciona
- [ ] ✅ URL parameters se actualizan
- [ ] ✅ Responsive design en móvil
- [ ] ✅ Animaciones funcionan
- [ ] ✅ Fuente Montserrat se carga
- [ ] ✅ Tracking de HubSpot activo

## 🎯 URLs Finales

- **Página pública:** `https://tu-dominio.com/catalogo-gift-cards`
- **Con filtros:** `https://tu-dominio.com/catalogo-gift-cards?country=CL&category=gastronomia`

## 📊 Analytics

HubSpot automáticamente trackea:
- Page views
- Time on page
- Traffic sources
- Device usage
- Geographic data

## 🔧 Mantenimiento

Para actualizar el catálogo:
1. Modifica el código local
2. Ejecuta `npm run build`
3. Sube los nuevos assets a File Manager
4. Actualiza las URLs en el template si cambió el hash

---

¡Tu catálogo estará live en HubSpot CMS! 🎉
