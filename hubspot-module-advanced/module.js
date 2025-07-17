// JavaScript del módulo Catálogo Gift Cards
// Personalizable desde el editor de HubSpot

(function() {
  'use strict';

  // Configuración del módulo desde variables HubL
  var moduleConfig = {
    moduleId: '{{ module.id }}',
    paisPorDefecto: '{{ module.pais_por_defecto }}',
    mostrarBusqueda: {{ module.mostrar_busqueda }},
    mostrarFiltros: {{ module.mostrar_filtros }},
    animacionCarga: '{{ module.animacion_carga }}',
    duracionAnimacion: {{ module.duracion_animacion }},
    colorPrimario: '{{ module.color_boton_primario.color }}',
    colorSecundario: '{{ module.color_boton_hover.color }}',
    trackingGA: {{ module.activar_tracking }},
    trackingHubSpot: {{ module.activar_tracking_hubspot }}
  };

  // Funciones de tracking personalizables
  function trackEvent(action, category, label) {
    {% if module.activar_tracking %}
    // Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        'event_category': category,
        'event_label': label
      });
    }
    {% endif %}

    {% if module.activar_tracking_hubspot %}
    // HubSpot Tracking
    if (typeof _hsq !== 'undefined') {
      _hsq.push(['trackEvent', {
        id: 'catalogo_gift_cards_' + action,
        value: label
      }]);
    }
    {% endif %}

    {% if module.debug_mode %}
    console.log('Track Event:', action, category, label);
    {% endif %}
  }

  // Personalización de colores dinámicos
  function aplicarColoresPersonalizados() {
    {% if module.personalizar_botones %}
    var style = document.createElement('style');
    style.textContent = `
      .catalogo-gift-cards-advanced-${moduleConfig.moduleId} button {
        --color-primario: {{ module.color_boton_primario.color }};
        --color-hover: {{ module.color_boton_hover.color }};
        --color-texto: {{ module.color_texto_boton.color }};
      }
    `;
    document.head.appendChild(style);
    {% endif %}
  }

  // Configuración de filtros iniciales
  function configurarFiltrosIniciales() {
    var container = document.getElementById('root-' + moduleConfig.moduleId);
    if (container) {
      // Aplicar configuración inicial
      container.setAttribute('data-pais-inicial', moduleConfig.paisPorDefecto);
      container.setAttribute('data-mostrar-busqueda', moduleConfig.mostrarBusqueda);
      container.setAttribute('data-mostrar-filtros', moduleConfig.mostrarFiltros);

      {% if module.categoria_por_defecto and module.categoria_por_defecto != 'all' %}
      container.setAttribute('data-categoria-inicial', '{{ module.categoria_por_defecto }}');
      {% endif %}
    }
  }

  // Animación de entrada personalizable
  function aplicarAnimacionEntrada() {
    {% if module.activar_animaciones %}
    var container = document.querySelector('.catalogo-gift-cards-advanced[data-module-id="{{ module.id }}"]');
    if (container) {
      container.style.animation = '{{ module.animacion_entrada }} {{ module.duracion_animacion }}s ease-in-out';
    }
    {% endif %}
  }

  // Handlers de eventos personalizados
  function configurarEventHandlers() {
    document.addEventListener('catalogoFilterChange', function(e) {
      if (e.detail.moduleId === moduleConfig.moduleId) {
        trackEvent('filter_change', 'catalogo', e.detail.filtro);
        
        {% if module.callback_filtro_cambio %}
        // Callback personalizado cuando cambia filtro
        if (typeof {{ module.callback_filtro_cambio }} === 'function') {
          {{ module.callback_filtro_cambio }}(e.detail);
        }
        {% endif %}
      }
    });

    document.addEventListener('catalogoCardClick', function(e) {
      if (e.detail.moduleId === moduleConfig.moduleId) {
        trackEvent('card_click', 'catalogo', e.detail.cardName);
        
        {% if module.callback_card_click %}
        // Callback personalizado cuando se hace click en card
        if (typeof {{ module.callback_card_click }} === 'function') {
          {{ module.callback_card_click }}(e.detail);
        }
        {% endif %}
      }
    });
  }

  // Configuración de scroll personalizable
  function configurarScroll() {
    {% if module.scroll_suave %}
    var container = document.getElementById('root-' + moduleConfig.moduleId);
    if (container) {
      container.style.scrollBehavior = 'smooth';
    }
    {% endif %}
  }

  // Integración con CRM/Lead Forms
  function configurarLeadTracking() {
    {% if module.activar_lead_tracking %}
    document.addEventListener('catalogoInteraction', function(e) {
      // Enviar datos a HubSpot para lead scoring
      if (typeof _hsq !== 'undefined') {
        _hsq.push(['identify', {
          catalogo_interes_pais: e.detail.pais,
          catalogo_interes_categoria: e.detail.categoria,
          catalogo_tiempo_interaccion: e.detail.tiempoInteraccion
        }]);
      }
    });
    {% endif %}
  }

  // Configuración responsive personalizable
  function configurarResponsive() {
    {% if module.breakpoint_personalizado %}
    var breakpoint = {{ module.breakpoint_mobile }};
    var mediaQuery = window.matchMedia('(max-width: ' + breakpoint + 'px)');
    
    function handleResponsive(mq) {
      var container = document.querySelector('.catalogo-gift-cards-advanced[data-module-id="{{ module.id }}"]');
      if (container) {
        if (mq.matches) {
          container.classList.add('mobile-view');
          {% if module.ocultar_filtros_mobile %}
          container.setAttribute('data-mobile-hide-filters', 'true');
          {% endif %}
        } else {
          container.classList.remove('mobile-view');
          container.removeAttribute('data-mobile-hide-filters');
        }
      }
    }
    
    mediaQuery.addListener(handleResponsive);
    handleResponsive(mediaQuery);
    {% endif %}
  }

  // Inicialización del módulo
  function inicializarModulo() {
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        aplicarColoresPersonalizados();
        configurarFiltrosIniciales();
        aplicarAnimacionEntrada();
        configurarEventHandlers();
        configurarScroll();
        configurarLeadTracking();
        configurarResponsive();
      });
    } else {
      aplicarColoresPersonalizados();
      configurarFiltrosIniciales();
      aplicarAnimacionEntrada();
      configurarEventHandlers();
      configurarScroll();
      configurarLeadTracking();
      configurarResponsive();
    }
  }

  // Auto-inicializar
  inicializarModulo();

  // Exposer configuración global para debugging
  {% if module.debug_mode %}
  window.CatalogoModuleConfig = window.CatalogoModuleConfig || {};
  window.CatalogoModuleConfig['{{ module.id }}'] = moduleConfig;
  {% endif %}

})();
