# 🚀 Instrucciones Específicas para HubSpot Setup

## 🎯 Opciones de Implementación

**Tienes 2 opciones para implementar el catálogo:**

### 📄 **Opción 1: Template Completo** (implementación actual)
- ✅ Control total de la página
- ✅ Página dedicada solo al catálogo
- ❌ No se puede insertar en páginas existentes

### 🧩 **Opción 2: Módulo Personalizado** (⭐ RECOMENDADO)
- ✅ Se puede insertar en cualquier página existente
- ✅ Reutilizable en múltiples páginas
- ✅ Configurable por instancia
- ✅ Combinar con otros contenidos
- 📁 **Archivos:** Ver carpeta `hubspot-module/` y guía `HUBSPOT-MODULE-SETUP.md`

---

## ✅ Archivos que Necesitas Subir Ahora (Para ambas opciones)

Basado en tu estructura de URLs `https://estudios.apprecio.com/hubfs/catalogo-gift-cards/`, necesitas subir estos archivos:

### 📁 JavaScript (NUEVO ARCHIVO):
**🔴 IMPORTANTE: Sube el nuevo archivo JS con hash actualizado**
- **Archivo:** `dist/assets/index-hhtijjlH.js`
- **Destino:** `/catalogo-gift-cards/js/index-hhtijjlH.js`
- **URL final:** `https://estudios.apprecio.com/hubfs/catalogo-gift-cards/js/index-hhtijjlH.js`

### 📁 CSS (Si no están subidos):
- **Archivo:** `dist/assets/index-CR-atBO3.css`
- **Destino:** `/catalogo-gift-cards/css/index-CR-atBO3.css` 
- **URL final:** `https://estudios.apprecio.com/hubfs/catalogo-gift-cards/css/index-CR-atBO3.css`

## 🔧 Template HubSpot Actualizado

Usa este contenido para tu template en Design Manager:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% if page_meta.html_title %}{{ page_meta.html_title }}{% else %}Catálogo de Gift Cards{% endif %}</title>
    <meta name="description" content="{% if page_meta.meta_description %}{{ page_meta.meta_description }}{% else %}Explora nuestro catálogo completo de gift cards para países de LATAM. Filtra por país y categoría.{% endif %}">
    
    <!-- HubSpot Meta Tags -->
    {{ standard_header_includes }}
    
    <!-- Preload Critical Resources -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- CSS Assets - URLs FINALES PARA ESTUDIOS.APPRECIO.COM -->
    <link rel="stylesheet" href="https://estudios.apprecio.com/hubfs/catalogo-gift-cards/css/catalogo-gift-cards.css">
    <link rel="stylesheet" href="https://estudios.apprecio.com/hubfs/catalogo-gift-cards/css/index-CR-atBO3.css">
</head>
<body>
    <!-- HubSpot Tracking -->
    {{ standard_footer_includes }}
    
    <!-- React App Container -->
    <div id="root"></div>
    
    <!-- JavaScript - URL FINAL ACTUALIZADA -->
    <script src="https://estudios.apprecio.com/hubfs/catalogo-gift-cards/js/index-hhtijjlH.js"></script>
</body>
</html>
```

## 🎯 Checklist de Setup:

### Paso 1: File Manager
- [ ] Ir a `Marketing > Files and Templates > File Manager`
- [ ] Navegar a `/catalogo-gift-cards/js/`
- [ ] ✅ Subir `dist/assets/index-hhtijjlH.js` (NUEVO ARCHIVO)
- [ ] Verificar que la URL sea accesible: `https://estudios.apprecio.com/hubfs/catalogo-gift-cards/js/index-hhtijjlH.js`

### Paso 2: Design Manager  
- [ ] Ir a `Marketing > Files and Templates > Design Manager`
- [ ] Editar tu template `Catálogo Gift Cards Template`
- [ ] Reemplazar el contenido con el HTML de arriba
- [ ] ✅ Guardar template

### Paso 3: Página
- [ ] Ir a `Marketing > Website > Website Pages`
- [ ] Editar tu página del catálogo
- [ ] ✅ Republicar la página

## 🧪 Testing

### URLs para Probar:
- **Página base:** `https://estudios.apprecio.com/catalogo-gift-cards`
- **Con filtros:** `https://estudios.apprecio.com/catalogo-gift-cards?country=peru&category=ecommerce`
- **Móvil:** Probar responsive design

### Funcionalidades a Verificar:
- [ ] ✅ Página carga correctamente
- [ ] ✅ Filtros por país funcionan
- [ ] ✅ Filtros por categoría funcionan (incluyendo `ecommerce`)  
- [ ] ✅ URL parameters se actualizan
- [ ] ✅ Fuente Montserrat se carga
- [ ] ✅ Responsive design en móvil
- [ ] ✅ Badges de países aparecen

## 🚨 Notas Importantes:

1. **NUEVO JavaScript:** El hash cambió de `index-hdJtNkDO.js` a `index-hhtijjlH.js` - ¡DEBES subir el nuevo archivo!

2. **URL Parameters:** Ahora funcionan correctamente con:
   - `country=peru` (o cualquier país)
   - `category=ecommerce` (funciona sin guión)
   - `category=e-commerce` (también funciona con guión)

3. **Cache:** Si ves problemas, es posible que sea cache del navegador. Usa Ctrl+F5 o Cmd+Shift+R para hard refresh.

---

¡Con estos pasos tu catálogo estará completamente funcional en HubSpot! 🎉
