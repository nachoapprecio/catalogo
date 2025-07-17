# 🧩 Módulo Avanzado - Catálogo Gift Cards HubSpot

## 🎯 Descripción

Este módulo avanzado te permite insertar el catálogo de gift cards en cualquier página de HubSpot con **control total** desde el editor visual. No necesitas tocar código - todo se configura desde la interfaz de HubSpot.

## ✨ Características Principales

### 🎨 **Personalización Visual Completa**
- **Colores:** Fondo, títulos, botones, bordes, sombras
- **Tipografía:** Fuentes, tamaños, pesos, alineación
- **Espaciado:** Padding, márgenes, alturas
- **Bordes:** Radius, grosor, estilos
- **Sombras:** Offset, blur, colores, intensidad

### ⚙️ **Configuración Funcional**
- **Filtros:** País y categoría por defecto
- **Elementos:** Mostrar/ocultar búsqueda, filtros
- **Responsive:** Configuración específica para móvil
- **Animaciones:** Entrada, hover, transiciones

### 📊 **Tracking y Analytics**
- **Google Analytics:** Eventos automáticos
- **HubSpot:** Lead tracking y scoring
- **Callbacks:** Funciones personalizadas JS
- **Debug Mode:** Para desarrollo

## 📁 Archivos del Módulo

```
hubspot-module-advanced/
├── module.html     # Template principal con variables HubL
├── module.css      # Estilos personalizables desde CMS
├── module.js       # JavaScript con configuraciones dinámicas
├── fields.json     # Configuración del editor (10 grupos)
└── meta.json       # Metadatos del módulo
```

## 🚀 Instalación en HubSpot

### **Paso 1: Crear Módulo**
1. Ir a `Marketing > Files and Templates > Design Manager`
2. Click `Create` → `Module`
3. Nombre: `Catálogo Gift Cards (Avanzado)`

### **Paso 2: Subir Archivos**
1. **Template:** Copiar contenido de `module.html`
2. **CSS:** Copiar contenido de `module.css`
3. **JavaScript:** Copiar contenido de `module.js`
4. **Fields:** Copiar contenido de `fields.json`
5. **Meta:** Copiar contenido de `meta.json`

### **Paso 3: Publicar Módulo**
1. Guardar todos los archivos
2. Click `Publish`
3. El módulo aparecerá en el editor

## 🎛️ Configuración desde el Editor

### **📋 Configuración General**
- ✅ Título y subtítulo
- ✅ Mostrar/ocultar elementos
- ✅ Etiquetas HTML (H1, H2, H3, H4)

### **⚙️ Configuración Funcional** 
- ✅ País por defecto (Chile, Perú, Colombia, etc.)
- ✅ Categoría por defecto (E-commerce, Gastronomía, etc.)
- ✅ Mostrar/ocultar búsqueda y filtros

### **🎨 Estilos Generales**
- ✅ Ancho máximo (px)
- ✅ Altura mínima/máxima (px)
- ✅ Padding y márgenes (px)

### **🌈 Colores**
- ✅ Fondo principal
- ✅ Fondo del catálogo
- ✅ Título y subtítulo
- ✅ Botones (primario, hover, texto)

### **📝 Tipografía**
- ✅ Fuente del título (selector de Google Fonts)
- ✅ Tamaño y peso del título
- ✅ Alineación (izquierda, centro, derecha)

### **🔘 Botones**
- ✅ Personalizar colores
- ✅ Efectos hover (agrandar, elevar, reducir)
- ✅ Colores de texto y fondo

### **🎭 Bordes y Sombras**
- ✅ Radio del borde
- ✅ Grosor y color del borde
- ✅ Sombra (offset, blur, color)

### **✨ Animaciones**
- ✅ Activar/desactivar
- ✅ Tipo: Fade In Up, Slide In Left, Zoom In
- ✅ Duración en segundos

### **📱 Responsive**
- ✅ Padding móvil
- ✅ Tamaño título móvil
- ✅ Ocultar filtros en móvil

### **📊 Tracking**
- ✅ Google Analytics
- ✅ HubSpot tracking
- ✅ Lead tracking automático

### **📄 Contenido Adicional**
- ✅ Texto del pie (rich text)
- ✅ Enlaces personalizados

### **⚡ Configuración Avanzada**
- ✅ Modo debug
- ✅ Callbacks JavaScript personalizados

## 💡 Ejemplos de Uso

### **Landing Page de Producto**
```html
<!-- El módulo se inserta desde el editor visual -->
Configuración sugerida:
- País: "peru" 
- Categoría: "e-commerce"
- Título: "Gift Cards para E-commerce"
- Colores: Brand colors de la empresa
```

### **Página de Servicios**
```html
Configuración sugerida:
- País: "all"
- Mostrar filtros: true
- Título: "Explora Nuestro Catálogo"
- Animación: "fadeInUp"
```

### **Blog Post**
```html
Configuración sugerida:
- Altura máxima: 600px
- Mostrar título: false
- Padding: 16px
- Responsive optimizado
```

## 🔧 Funcionalidades Avanzadas

### **🎯 URL Parameters Automáticos**
El módulo mantiene toda la funcionalidad de filtros por URL:
- `?country=peru&category=ecommerce`
- `?search=amazon`
- Compatible con compartir enlaces directos

### **📊 Events Tracking**
```javascript
// Eventos automáticos enviados:
- catalogoFilterChange: Cuando cambia filtro
- catalogoCardClick: Click en tarjeta
- catalogoInteraction: Interacciones generales
```

### **🎨 CSS Custom Properties**
```css
/* Variables CSS generadas automáticamente: */
--color-primario: {valor desde CMS}
--color-hover: {valor desde CMS}
--fuente-titulo: {valor desde CMS}
```

### **📱 Responsive Breakpoints**
- Breakpoint personalizable desde editor
- Comportamiento diferente en móvil
- Ocultar elementos específicos

## ✅ Ventajas vs Módulo Simple

| Característica | Módulo Simple | Módulo Avanzado |
|----------------|---------------|-----------------|
| **Configuración visual** | ❌ | ✅ |
| **Control de colores** | ❌ | ✅ |
| **Tipografía personalizable** | ❌ | ✅ |
| **Animaciones configurables** | ❌ | ✅ |
| **Tracking avanzado** | ❌ | ✅ |
| **Responsive personalizable** | ❌ | ✅ |
| **Callbacks JavaScript** | ❌ | ✅ |
| **Facilidad de uso** | ✅ | ✅ |
| **Tamaño** | Pequeño | Mediano |

## 🎯 Casos de Uso Ideales

### ✅ **Usar Módulo Avanzado cuando:**
- Necesitas control total de la apariencia
- Quieres matching con brand colors
- Tienes diferentes configuraciones por página
- Necesitas tracking detallado
- Quieres animaciones personalizadas

### ✅ **Usar Módulo Simple cuando:**
- Implementación rápida
- Diseño estándar está bien
- No necesitas personalización visual
- Páginas simples o blogs

## 🚀 Próximos Pasos

1. **Subir archivos** del módulo avanzado a HubSpot
2. **Probar configuración** en una página de prueba
3. **Personalizar colores** según tu brand
4. **Configurar tracking** si es necesario
5. **Implementar** en páginas de producción

---

¡Con este módulo avanzado tienes control total del catálogo desde el CMS de HubSpot! 🎉
