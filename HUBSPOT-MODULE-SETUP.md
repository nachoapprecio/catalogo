# 🧩 Catálogo Gift Cards - Módulo HubSpot

## 📋 Configuración del Módulo

### 1. **Crear Módulo Personalizado**

1. **Ir a Design Manager:**
   - `Marketing > Files and Templates > Design Manager`

2. **Crear nuevo módulo:**
   - Click en `Create` → `Module`
   - Nombre: `Catálogo Gift Cards`
   - Tipo: `Custom module`

### 2. **Archivos del Módulo**

#### **📄 module.html** (Template del módulo)
```html
<!-- Catálogo Gift Cards Module -->
<div class="catalogo-gift-cards-module" data-module-id="{{ module.id }}">
  <div id="root-{{ module.id }}"></div>
</div>

<!-- CSS - Cargar solo una vez por página -->
{% if !page.catalogo_css_loaded %}
  <link rel="stylesheet" href="https://estudios.apprecio.com/hubfs/catalogo-gift-cards/css/catalogo-gift-cards.css">
  <link rel="stylesheet" href="https://estudios.apprecio.com/hubfs/catalogo-gift-cards/css/index-CR-atBO3.css">
  {% set page.catalogo_css_loaded = true %}
{% endif %}

<!-- JavaScript - Cargar solo una vez por página -->
{% if !page.catalogo_js_loaded %}
  <script>
    // Configuración global para el módulo
    window.CATALOGO_CONFIG = window.CATALOGO_CONFIG || {
      modules: [],
      initialized: false
    };
    
    // Agregar este módulo a la lista
    window.CATALOGO_CONFIG.modules.push('{{ module.id }}');
  </script>
  
  <script src="https://estudios.apprecio.com/hubfs/catalogo-gift-cards/js/index-hhtijjlH.js" defer></script>
  
  <script>
    // Inicializar módulos cuando el JS esté listo
    document.addEventListener('DOMContentLoaded', function() {
      if (window.ReactDOM && window.React && !window.CATALOGO_CONFIG.initialized) {
        // Inicializar cada instancia del módulo
        window.CATALOGO_CONFIG.modules.forEach(function(moduleId) {
          const container = document.getElementById('root-' + moduleId);
          if (container && window.CatalogoApp) {
            window.ReactDOM.render(window.React.createElement(window.CatalogoApp), container);
          }
        });
        window.CATALOGO_CONFIG.initialized = true;
      }
    });
  </script>
  
  {% set page.catalogo_js_loaded = true %}
{% endif %}
```

#### **📄 fields.json** (Configuración del módulo)
```json
[
  {
    "id": "titulo",
    "name": "título",
    "label": "Título del catálogo",
    "required": false,
    "locked": false,
    "type": "text",
    "default": "Catálogo de Gift Cards"
  },
  {
    "id": "mostrar_titulo",
    "name": "mostrar_titulo", 
    "label": "Mostrar título",
    "required": false,
    "locked": false,
    "type": "boolean",
    "default": true
  },
  {
    "id": "pais_por_defecto",
    "name": "pais_por_defecto",
    "label": "País por defecto",
    "required": false,
    "locked": false,
    "type": "choice",
    "choices": [
      ["all", "Todos los países"],
      ["chile", "Chile"],
      ["peru", "Perú"],
      ["colombia", "Colombia"],
      ["mexico", "México"],
      ["ecuador", "Ecuador"]
    ],
    "default": "all"
  },
  {
    "id": "altura_maxima",
    "name": "altura_maxima",
    "label": "Altura máxima (px)",
    "required": false,
    "locked": false,
    "type": "number",
    "default": 800
  }
]
```

#### **📄 meta.json** (Metadatos del módulo)
```json
{
  "label": "Catálogo Gift Cards",
  "css_assets": [],
  "external_js": [],
  "global": false,
  "help_text": "Módulo para mostrar el catálogo interactivo de gift cards con filtros por país y categoría.",
  "host_template_types": ["PAGE", "BLOG_POST", "LANDING_PAGE"],
  "module_id": 12345,
  "no_wrapper": false,
  "smart_type": "NOT_SMART",
  "tags": ["catalogo", "gift-cards", "ecommerce"],
  "is_available_for_new_content": true
}
```

## 🔧 Versión Simplificada (Alternativa)

Si prefieres una versión más simple sin configuraciones:

#### **📄 module-simple.html**
```html
<!-- Catálogo Gift Cards - Versión Simple -->
<div class="catalogo-gift-cards-wrapper">
  {% if module.mostrar_titulo %}
    <h2>{{ module.titulo }}</h2>
  {% endif %}
  
  <div id="root"></div>
</div>

<style>
  .catalogo-gift-cards-wrapper {
    width: 100%;
    max-height: {{ module.altura_maxima }}px;
    overflow-y: auto;
  }
</style>

<link rel="stylesheet" href="https://estudios.apprecio.com/hubfs/catalogo-gift-cards/css/catalogo-gift-cards.css">
<link rel="stylesheet" href="https://estudios.apprecio.com/hubfs/catalogo-gift-cards/css/index-CR-atBO3.css">

<script src="https://estudios.apprecio.com/hubfs/catalogo-gift-cards/js/index-hhtijjlH.js"></script>
```

## 📁 Estructura Final en HubSpot

```
/Design Manager/
└── Modules/
    └── Catalogo Gift Cards/
        ├── module.html
        ├── fields.json
        └── meta.json
```

## 🎯 Cómo Usar el Módulo

### 1. **En el Page Editor:**
- Editar cualquier página existente
- Buscar "Catálogo Gift Cards" en los módulos disponibles
- Arrastrar y soltar donde quieras el catálogo

### 2. **Configuración del Módulo:**
- **Título:** Personalizar el título mostrado
- **País por defecto:** Seleccionar país inicial
- **Altura máxima:** Controlar altura del contenedor

### 3. **En Landing Pages:**
- Funciona perfectamente en drag & drop builder
- Se puede combinar con otros módulos
- Mantiene toda la funcionalidad de filtros

## ✅ Ventajas del Módulo vs Template

| Característica | Módulo | Template Completo |
|----------------|--------|-------------------|
| **Reutilizable** | ✅ | ❌ |
| **Insertar en páginas existentes** | ✅ | ❌ |
| **Combinar con otros contenidos** | ✅ | ❌ |
| **Configuración por instancia** | ✅ | ❌ |
| **Control total de la página** | ❌ | ✅ |

## 🚀 Próximos Pasos

1. **Crear el módulo** en Design Manager
2. **Subir los archivos** (module.html, fields.json, meta.json)
3. **Publicar el módulo**
4. **Agregar a cualquier página** desde el editor

¿Te gustaría que proceda con alguna de estas configuraciones específicas?
