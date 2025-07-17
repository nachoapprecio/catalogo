# 🚀 Guía de Implementación - Módulo Avanzado

## **PASO 1: Crear Módulo en HubSpot**

### 1.1 Acceder a Design Manager
- Ve a `Marketing > Files and Templates > Design Manager`
- Click en `Create` → `Module`
- **Nombre:** `Catálogo Gift Cards Avanzado`

## **PASO 2: Template HTML**

Copia y pega este código en el campo "Template":

```html
<!-- Catálogo Gift Cards - Módulo Avanzado -->
<div class="catalogo-gift-cards-advanced" 
     data-module-id="{{ module.id }}"
     data-pais-defecto="{{ module.pais_por_defecto }}">
  
  {% if module.mostrar_titulo %}
    <{{ module.titulo_tag }} class="catalogo-title">
      {{ module.titulo }}
    </{{ module.titulo_tag }}>
  {% endif %}
  
  {% if module.mostrar_subtitulo and module.subtitulo %}
    <p class="catalogo-subtitle">{{ module.subtitulo }}</p>
  {% endif %}
  
  <!-- Contenedor de la aplicación React -->
  <div id="root-{{ module.id }}" class="catalogo-container"></div>
  
  {% if module.mostrar_texto_pie and module.texto_pie %}
    <div class="catalogo-footer">
      {{ module.texto_pie }}
    </div>
  {% endif %}
</div>

<!-- CSS externo del catálogo -->
<link rel="stylesheet" href="https://estudios.apprecio.com/hubfs/catalogo-gift-cards/css/catalogo-gift-cards.css">
<link rel="stylesheet" href="https://estudios.apprecio.com/hubfs/catalogo-gift-cards/css/index-CR-atBO3.css">

<!-- JavaScript principal del catálogo -->
<script src="https://estudios.apprecio.com/hubfs/catalogo-gift-cards/js/index-hhtijjlH.js" defer></script>
```

## **PASO 3: CSS Personalizable**

En la pestaña "CSS", copia este código:

```css
/* Estilos personalizables del módulo */
.catalogo-gift-cards-advanced {
  width: 100%;
  max-width: {{ module.ancho_maximo }}px;
  margin: {{ module.margen_vertical }}px auto;
  padding: {{ module.padding }}px;
  background-color: {{ module.color_fondo.color }};
  border-radius: {{ module.border_radius }}px;
  {% if module.mostrar_sombra %}
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  {% endif %}
}

/* Título personalizable */
.catalogo-title {
  font-family: {{ module.fuente_titulo.font }}, 'Montserrat', sans-serif;
  font-size: {{ module.titulo_tamano }}px;
  font-weight: {{ module.titulo_peso }};
  color: {{ module.color_titulo.color }};
  text-align: {{ module.titulo_alineacion }};
  margin-bottom: {{ module.titulo_margen_inferior }}px;
}

/* Subtítulo */
.catalogo-subtitle {
  font-size: {{ module.subtitulo_tamano }}px;
  color: {{ module.color_subtitulo.color }};
  text-align: {{ module.titulo_alineacion }};
  margin-bottom: 24px;
  line-height: 1.6;
}

/* Contenedor principal */
.catalogo-container {
  min-height: {{ module.altura_minima }}px;
  max-height: {{ module.altura_maxima }}px;
  overflow-y: auto;
  background-color: {{ module.color_fondo_catalogo.color }};
  border-radius: 8px;
}

/* Texto del pie */
.catalogo-footer {
  margin-top: 24px;
  padding: 16px;
  background-color: #f8f9fa;
  color: #666;
  text-align: center;
  font-size: 14px;
  border-radius: 8px;
}

/* Personalización de botones */
{% if module.personalizar_botones %}
.catalogo-gift-cards-advanced button {
  background-color: {{ module.color_boton_primario.color }} !important;
  color: {{ module.color_texto_boton.color }} !important;
}

.catalogo-gift-cards-advanced button:hover {
  background-color: {{ module.color_boton_hover.color }} !important;
  transform: translateY(-2px);
}
{% endif %}

/* Responsive */
@media (max-width: 768px) {
  .catalogo-gift-cards-advanced {
    padding: {{ module.padding_mobile }}px;
    margin: {{ module.margen_vertical_mobile }}px auto;
  }
  
  .catalogo-title {
    font-size: {{ module.titulo_tamano_mobile }}px;
  }
}
```

## **PASO 4: Configuración (Fields)**

En la pestaña "Fields", copia este JSON:

```json
[
  {
    "id": "titulo",
    "name": "titulo",
    "label": "Título del catálogo",
    "type": "text",
    "default": "Catálogo de Gift Cards"
  },
  {
    "id": "mostrar_titulo",
    "name": "mostrar_titulo",
    "label": "Mostrar título",
    "type": "boolean",
    "default": true
  },
  {
    "id": "titulo_tag",
    "name": "titulo_tag",
    "label": "Etiqueta HTML del título",
    "type": "choice",
    "choices": [
      ["h1", "H1"],
      ["h2", "H2"],
      ["h3", "H3"]
    ],
    "default": "h2"
  },
  {
    "id": "subtitulo",
    "name": "subtitulo",
    "label": "Subtítulo",
    "type": "text",
    "default": ""
  },
  {
    "id": "mostrar_subtitulo",
    "name": "mostrar_subtitulo",
    "label": "Mostrar subtítulo",
    "type": "boolean",
    "default": false
  },
  {
    "id": "pais_por_defecto",
    "name": "pais_por_defecto",
    "label": "País por defecto",
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
    "id": "ancho_maximo",
    "name": "ancho_maximo",
    "label": "Ancho máximo (px)",
    "type": "number",
    "default": 1200
  },
  {
    "id": "altura_maxima",
    "name": "altura_maxima",
    "label": "Altura máxima (px)",
    "type": "number",
    "default": 800
  },
  {
    "id": "padding",
    "name": "padding",
    "label": "Padding interno (px)",
    "type": "number",
    "default": 24
  },
  {
    "id": "margen_vertical",
    "name": "margen_vertical",
    "label": "Margen vertical (px)",
    "type": "number",
    "default": 32
  },
  {
    "id": "color_fondo",
    "name": "color_fondo",
    "label": "Color de fondo",
    "type": "color",
    "default": {
      "color": "#ffffff"
    }
  },
  {
    "id": "color_titulo",
    "name": "color_titulo",
    "label": "Color del título",
    "type": "color",
    "default": {
      "color": "#1a1a1a"
    }
  },
  {
    "id": "fuente_titulo",
    "name": "fuente_titulo",
    "label": "Fuente del título",
    "type": "font",
    "default": {
      "font": "Montserrat"
    }
  },
  {
    "id": "titulo_tamano",
    "name": "titulo_tamano",
    "label": "Tamaño título (px)",
    "type": "number",
    "default": 40
  },
  {
    "id": "titulo_peso",
    "name": "titulo_peso",
    "label": "Peso del título",
    "type": "choice",
    "choices": [
      ["400", "Normal"],
      ["600", "SemiBold"],
      ["700", "Bold"]
    ],
    "default": "700"
  },
  {
    "id": "titulo_alineacion",
    "name": "titulo_alineacion",
    "label": "Alineación",
    "type": "choice",
    "choices": [
      ["left", "Izquierda"],
      ["center", "Centro"],
      ["right", "Derecha"]
    ],
    "default": "center"
  },
  {
    "id": "personalizar_botones",
    "name": "personalizar_botones",
    "label": "Personalizar botones",
    "type": "boolean",
    "default": false
  },
  {
    "id": "color_boton_primario",
    "name": "color_boton_primario",
    "label": "Color botón primario",
    "type": "color",
    "default": {
      "color": "#8b5cf6"
    }
  },
  {
    "id": "color_boton_hover",
    "name": "color_boton_hover",
    "label": "Color botón hover",
    "type": "color",
    "default": {
      "color": "#7c3aed"
    }
  }
]
```

## **PASO 5: Publicar y Usar**

1. **Guardar** todos los archivos
2. **Publicar** el módulo
3. **Ir a cualquier página** → Editor
4. **Buscar** "Catálogo Gift Cards Avanzado" en módulos
5. **Arrastrar y soltar** donde quieras
6. **Personalizar** desde el panel lateral

## ✅ **Resultado:**

- ✅ Control de colores, fuentes, tamaños
- ✅ Configuración por instancia
- ✅ Filtros por URL funcionando
- ✅ Responsive automático
- ✅ Insertar en cualquier página

¿Quieres que continue con más configuraciones avanzadas?
