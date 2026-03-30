(function () {
  "use strict";

  var COUNTRY_CONFIG = {
    chile: {
      label: "Chile",
      url: "https://estudios.apprecio.com/hubfs/catalogo-gift-cards/json/giftcards_chile.json"
    },
    peru: {
      label: "Peru",
      url: "https://estudios.apprecio.com/hubfs/catalogo-gift-cards/json/giftcards_peru.json"
    },
    colombia: {
      label: "Colombia",
      url: "https://estudios.apprecio.com/hubfs/catalogo-gift-cards/json/giftcards_colombia.json"
    },
    ecuador: {
      label: "Ecuador",
      url: "https://estudios.apprecio.com/hubfs/catalogo-gift-cards/json/giftcards_ecuador.json"
    },
    mexico: {
      label: "Mexico",
      url: "https://estudios.apprecio.com/hubfs/catalogo-gift-cards/json/giftcards_mexico.json"
    }
  };

  var COUNTRY_ORDER = ["chile", "peru", "colombia", "mexico", "ecuador"];

  var CATEGORY_DEFINITIONS = [
    { slug: "todas_las_categorias", label: "Todas las categorias" },
    { slug: "supermercados_y_minimarket", label: "Supermercados y Minimarket" },
    { slug: "grandes_tiendas", label: "Grandes Tiendas" },
    { slug: "e_commerce", label: "E-commerce" },
    { slug: "deporte", label: "Deporte" },
    { slug: "gastronomia", label: "Gastronomia" },
    { slug: "salud_belleza_y_bienestar", label: "Salud, Belleza y Bienestar" },
    { slug: "moda_y_accesorios", label: "Moda y Accesorios" },
    { slug: "entretenimiento_y_tiempo_libre", label: "Entretenimiento y Tiempo Libre" },
    { slug: "automotriz", label: "Automotriz" },
    { slug: "servicios", label: "Servicios" },
    { slug: "vuelos_y_experiencias", label: "Vuelos y Experiencias" },
    { slug: "farmacia_y_salud", label: "Farmacia y Salud" },
    { slug: "jugueteria", label: "Jugueteria" },
    { slug: "online", label: "Online" },
    { slug: "movilidad", label: "Movilidad" },
    { slug: "mascotas", label: "Mascotas" },
    { slug: "diseno_y_decoracion", label: "Diseno y Decoracion" },
    { slug: "tiendas_especializadas", label: "Tiendas Especializadas" },
    { slug: "educacion", label: "Educacion" },
    { slug: "deportes", label: "Deportes" },
    { slug: "recargas_celulares", label: "Recargas Celulares" }
  ];

  var CATEGORY_LABEL_BY_SLUG = CATEGORY_DEFINITIONS.reduce(function (acc, item) {
    acc[item.slug] = item.label;
    return acc;
  }, {});

  var CATEGORY_INDEX_BY_SLUG = CATEGORY_DEFINITIONS.reduce(function (acc, item, index) {
    acc[item.slug] = index;
    return acc;
  }, {});

  var EXCLUDED_IMAGE_URLS = {
    "https://storage.googleapis.com/cdnbw/cdn/dcanje.mx/giftcards/30.png": true,
    "https://storage.googleapis.com/cdnbw/cdn/dcanje.mx/giftcards/30.jpg": true
  };

  var EXCLUDED_CARD_NAMES = {
    "via uno chile": true,
    "viaunochile": true
  };

  function normalizeSlug(value) {
    if (!value) return "";
    return String(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/&/g, "y")
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .replace(/_+/g, "_");
  }

  function mapCategoryAlias(slug) {
    var aliases = {
      todas_las_categorias: "todas_las_categorias",
      ecommerce: "e_commerce",
      e_commerce: "e_commerce",
      salud_y_belleza: "salud_belleza_y_bienestar",
      salud_belleza_y_bienestar: "salud_belleza_y_bienestar",
      vestuario_calzado_y_accesorios: "moda_y_accesorios",
      moda: "moda_y_accesorios",
      entretencion_y_tiempo_libre: "entretenimiento_y_tiempo_libre",
      farmacia: "farmacia_y_salud",
      supermercados_minimarket: "supermercados_y_minimarket"
    };
    return aliases[slug] || slug;
  }

  function safeParseJSON(value, fallback) {
    if (!value) return fallback;
    try {
      return JSON.parse(value);
    } catch (_err) {
      return fallback;
    }
  }

  function ensureArray(value) {
    if (Array.isArray(value)) return value;
    if (value === null || typeof value === "undefined" || value === "") return [];
    return [value];
  }

  function rgbaFromHex(hexColor, opacityPercent) {
    if (!hexColor) return "rgba(255,255,255,1)";
    var clean = String(hexColor).replace("#", "");
    if (clean.length !== 6) return "rgba(255,255,255,1)";
    var r = parseInt(clean.substring(0, 2), 16);
    var g = parseInt(clean.substring(2, 4), 16);
    var b = parseInt(clean.substring(4, 6), 16);
    var alpha = Math.max(0, Math.min(100, Number(opacityPercent || 100))) / 100;
    return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
  }

  function parseGradientDirection(sideOrCorner) {
    if (!sideOrCorner) return "to bottom";
    var vertical = sideOrCorner.verticalSide ? String(sideOrCorner.verticalSide).toLowerCase() : "";
    var horizontal = sideOrCorner.horizontalSide ? String(sideOrCorner.horizontalSide).toLowerCase() : "";

    if (vertical && horizontal) {
      return "to " + vertical + " " + horizontal;
    }
    if (vertical) {
      return "to " + vertical;
    }
    if (horizontal) {
      return "to " + horizontal;
    }
    return "to bottom";
  }

  function gradientToCss(gradientConfig) {
    if (!gradientConfig || !Array.isArray(gradientConfig.colors) || gradientConfig.colors.length === 0) {
      return "none";
    }

    var direction = parseGradientDirection(gradientConfig.side_or_corner);
    var colorStops = gradientConfig.colors
      .map(function (entry) {
        if (!entry || !entry.color) return null;
        var c = entry.color;
        var alpha = typeof c.a === "number" ? c.a : 1;
        return "rgba(" + Number(c.r || 0) + "," + Number(c.g || 0) + "," + Number(c.b || 0) + "," + alpha + ")";
      })
      .filter(Boolean);

    if (colorStops.length === 0) {
      return "none";
    }

    return "linear-gradient(" + direction + ", " + colorStops.join(", ") + ")";
  }

  function buildBackgroundLayers(options, colorLayer, gradientLayer, imageUrl) {
    var hasColor = options.indexOf("color") !== -1;
    var hasGradient = options.indexOf("gradient") !== -1;
    var hasImage = options.indexOf("img") !== -1 && imageUrl;

    var layers = [];
    if (hasImage) layers.push("url('" + imageUrl + "')");
    if (hasGradient && gradientLayer !== "none") layers.push(gradientLayer);

    return {
      color: hasColor ? colorLayer : "transparent",
      image: layers.length ? layers.join(",") : "none",
      hasImage: !!hasImage
    };
  }

  function toCard(rawCard, countryCode) {
    var name = rawCard.nombre || rawCard.name || rawCard.giftcard_name || "Gift card";
    var image = rawCard["Fuente imagen"] || rawCard.image_url || rawCard.image || "";
    var safeName = String(name || "").trim();
    var normalizedName = normalizeSlug(safeName).replace(/_/g, " ");
    if (!safeName || !image) return null;
    if (EXCLUDED_IMAGE_URLS[image]) return null;
    if (EXCLUDED_CARD_NAMES[normalizedName]) return null;

    return {
      id: rawCard.posicion || rawCard["posicion"] || rawCard["posición"] || safeName,
      name: safeName,
      image: image,
      country: countryCode
    };
  }

  function mapCountryJson(countryCode, jsonArray) {
    if (!Array.isArray(jsonArray)) return [];

    return jsonArray
      .map(function (entry) {
        var rawCategory = entry.Categoria || entry.category || "Sin categoria";
        var slug = mapCategoryAlias(normalizeSlug(rawCategory));
        var cards = (entry["Gift Cards"] || entry.giftcards || [])
          .map(function (card) {
            return toCard(card, countryCode);
          })
          .filter(Boolean);

        return {
          slug: slug,
          label: CATEGORY_LABEL_BY_SLUG[slug] || rawCategory,
          cards: cards
        };
      })
      .filter(function (category) {
        return category.cards.length > 0;
      });
  }

  function mergeCategories(categoryBlocks) {
    var map = {};

    categoryBlocks.forEach(function (category) {
      if (!map[category.slug]) {
        map[category.slug] = {
          slug: category.slug,
          label: category.label,
          cards: []
        };
      }
      map[category.slug].cards = map[category.slug].cards.concat(category.cards);
    });

    return Object.keys(map)
      .map(function (slug) {
        return map[slug];
      })
      .sort(function (a, b) {
        var indexA = typeof CATEGORY_INDEX_BY_SLUG[a.slug] === "number" ? CATEGORY_INDEX_BY_SLUG[a.slug] : 999;
        var indexB = typeof CATEGORY_INDEX_BY_SLUG[b.slug] === "number" ? CATEGORY_INDEX_BY_SLUG[b.slug] : 999;
        if (indexA !== indexB) return indexA - indexB;
        return a.label.localeCompare(b.label);
      });
  }

  function createPill(label, value, isActive, onClick) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "catalogo-pill" + (isActive ? " is-active" : "");
    button.textContent = label;
    button.dataset.value = value;
    button.addEventListener("click", onClick);
    return button;
  }

  function withCacheQuery(url, cacheKey) {
    if (!cacheKey) return url;
    return url + (url.indexOf("?") === -1 ? "?" : "&") + encodeURIComponent(cacheKey);
  }

  function applyModuleBackground(root) {
    var shell = root.querySelector("[data-catalogo-shell]");
    if (!shell) return;

    var bgOptions = ensureArray(safeParseJSON(root.dataset.bgOpt, []));
    var normalizedOptions = bgOptions
      .map(function (item) {
          return normalizeSlug(item);
        });

    var bgColor = rgbaFromHex(root.dataset.bgColor || "#ffffff", root.dataset.bgOpacity || 100);
    var bgGradient = gradientToCss(safeParseJSON(root.dataset.bgGradient, {}));
    var bgImage = root.dataset.bgImage || "";

    var layers = buildBackgroundLayers(normalizedOptions, bgColor, bgGradient, bgImage);

    shell.style.backgroundColor = layers.color;
    shell.style.backgroundImage = layers.image;
    shell.style.backgroundRepeat = layers.hasImage ? "no-repeat,no-repeat" : "no-repeat";
    shell.style.backgroundSize = layers.hasImage ? "cover,100% 100%" : "100% 100%";

    var hsPosition = root.dataset.bgPosition || "middle_center";
    var positionMap = {
      top_left: "left top",
      top_center: "center top",
      top_right: "right top",
      middle_left: "left center",
      middle_center: "center center",
      middle_right: "right center",
      bottom_left: "left bottom",
      bottom_center: "center bottom",
      bottom_right: "right bottom"
    };

    var sizeMap = {
      cover: "cover",
      contain: "contain",
      auto: "auto"
    };

    var imagePosition = positionMap[normalizeSlug(hsPosition)] || "center center";
    var imageSize = sizeMap[normalizeSlug(root.dataset.bgSize || "cover")] || "cover";

    if (layers.hasImage) {
      shell.style.backgroundPosition = imagePosition + ",center center";
      shell.style.backgroundSize = imageSize + ",100% 100%";
    }

    var loadColor = rgbaFromHex(root.dataset.loadBgColor || "#ffffff", root.dataset.loadBgOpacity || 100);
    root.style.setProperty("--catalogo-load-bg", loadColor);
  }

  function initializeModule(root) {
    applyModuleBackground(root);

    var state = {
      moduleCountry: normalizeSlug(root.dataset.moduleCountry || "todos"),
      selectedCountry: "todos",
      selectedCategory: "all",
      allowedCategories: [],
      dataByCountry: {}
    };

    var countryFilterWrap = root.querySelector("[data-country-filter]");
    var countryButtonsWrap = root.querySelector("[data-country-buttons]");
    var categoryButtonsWrap = root.querySelector("[data-category-buttons]");
    var categorySelectEl = root.querySelector("[data-category-select]");
    var contentWrap = root.querySelector("[data-catalogo-content]");
    var loader = root.querySelector("[data-catalogo-loader]");
    var categoryTpl = root.querySelector("template[data-template-category]");
    var cardTpl = root.querySelector("template[data-template-card]");
    var emptyTpl = root.querySelector("template[data-template-empty]");

    if (!countryButtonsWrap || !categoryButtonsWrap || !contentWrap || !loader || !categoryTpl || !cardTpl || !emptyTpl) {
      return;
    }

    if (categorySelectEl) {
      categorySelectEl.addEventListener("change", function () {
        state.selectedCategory = categorySelectEl.value;
        categorySelectEl.classList.toggle("is-active", state.selectedCategory !== "all");
        render();
      });
    }

    var selectedCategoriesRaw = ensureArray(safeParseJSON(root.dataset.moduleCategories, []));
    var selectedCategories = selectedCategoriesRaw
      .map(function (item) {
          return mapCategoryAlias(normalizeSlug(item));
        })
      .filter(Boolean);

    var hasAllCategories = selectedCategories.length === 0 || selectedCategories.indexOf("todas_las_categorias") !== -1;
    state.allowedCategories = hasAllCategories ? [] : selectedCategories;

    var countriesToLoad = [];
    if (state.moduleCountry === "todos") {
      countriesToLoad = COUNTRY_ORDER.slice();
      state.selectedCountry = "todos";
      countryFilterWrap.hidden = false;
    } else {
      countriesToLoad = COUNTRY_CONFIG[state.moduleCountry] ? [state.moduleCountry] : COUNTRY_ORDER.slice();
      state.selectedCountry = countriesToLoad[0] || "todos";
      countryFilterWrap.hidden = true;
    }

    function getMergedCategories() {
      var blocks = [];
      var countries = state.selectedCountry === "todos" ? COUNTRY_ORDER : [state.selectedCountry];
      countries.forEach(function (code) {
        blocks = blocks.concat(state.dataByCountry[code] || []);
      });

      var merged = mergeCategories(blocks);
      if (state.allowedCategories.length > 0) {
        merged = merged.filter(function (category) {
          return state.allowedCategories.indexOf(category.slug) !== -1;
        });
      }

      if (state.selectedCategory !== "all") {
        merged = merged.filter(function (category) {
          return category.slug === state.selectedCategory;
        });
      }

      return merged;
    }

    function renderCountryButtons() {
      countryButtonsWrap.innerHTML = "";
      if (state.moduleCountry !== "todos") {
        return;
      }

      countryButtonsWrap.appendChild(
        createPill("Todos", "todos", state.selectedCountry === "todos", function () {
          state.selectedCountry = "todos";
          state.selectedCategory = "all";
          render();
        })
      );

      COUNTRY_ORDER.forEach(function (code) {
        var conf = COUNTRY_CONFIG[code];
        countryButtonsWrap.appendChild(
          createPill(conf.label, code, state.selectedCountry === code, function () {
            state.selectedCountry = code;
            state.selectedCategory = "all";
            render();
          })
        );
      });
    }

    function renderCategoryButtons(availableCategories) {
      categoryButtonsWrap.innerHTML = "";

      categoryButtonsWrap.appendChild(
        createPill("Todas", "all", state.selectedCategory === "all", function () {
          state.selectedCategory = "all";
          render();
        })
      );

      availableCategories.forEach(function (category) {
        categoryButtonsWrap.appendChild(
          createPill(category.label, category.slug, state.selectedCategory === category.slug, function () {
            state.selectedCategory = category.slug;
            render();
          })
        );
      });

      if (categorySelectEl) {
        categorySelectEl.innerHTML = "";
        var defaultOption = document.createElement("option");
        defaultOption.value = "all";
        defaultOption.textContent = "Todas las categorias";
        categorySelectEl.appendChild(defaultOption);

        availableCategories.forEach(function (category) {
          var option = document.createElement("option");
          option.value = category.slug;
          option.textContent = category.label;
          categorySelectEl.appendChild(option);
        });

        categorySelectEl.value = state.selectedCategory;
        categorySelectEl.classList.toggle("is-active", state.selectedCategory !== "all");
      }
    }

    function renderContent(categories) {
      contentWrap.innerHTML = "";

      if (!categories.length) {
        contentWrap.appendChild(emptyTpl.content.cloneNode(true));
        return;
      }

      categories.forEach(function (category) {
        var categoryNode = categoryTpl.content.cloneNode(true);
        var titleNode = categoryNode.querySelector(".catalogo-category-title");
        var gridNode = categoryNode.querySelector(".catalogo-grid");
        if (!titleNode || !gridNode) return;

        titleNode.textContent = category.label;

        category.cards.forEach(function (card) {
          var cardNode = cardTpl.content.cloneNode(true);
          var img = cardNode.querySelector(".catalogo-card-image");
          var title = cardNode.querySelector(".catalogo-card-title");
          var countryBadge = cardNode.querySelector(".catalogo-card-country");

          if (img) {
            img.src = card.image;
            img.alt = card.name;
          }

          if (title) {
            title.textContent = card.name;
          }

          if (countryBadge) {
            var showCountryBadge = state.selectedCountry === "todos";
            if (showCountryBadge) {
              countryBadge.hidden = false;
              countryBadge.textContent = COUNTRY_CONFIG[card.country] ? COUNTRY_CONFIG[card.country].label : card.country;
            } else {
              countryBadge.hidden = true;
            }
          }

          gridNode.appendChild(cardNode);
        });

        contentWrap.appendChild(categoryNode);
      });
    }

    function render() {
      renderCountryButtons();

      var availableCategories = mergeCategories(
        (state.selectedCountry === "todos"
          ? COUNTRY_ORDER
          : [state.selectedCountry]
        ).reduce(function (acc, code) {
          return acc.concat(state.dataByCountry[code] || []);
        }, [])
      );

      if (state.allowedCategories.length > 0) {
        availableCategories = availableCategories.filter(function (category) {
          return state.allowedCategories.indexOf(category.slug) !== -1;
        });
      }

      renderCategoryButtons(availableCategories);
      renderContent(getMergedCategories());
    }

    Promise.all(
      countriesToLoad.map(function (countryCode) {
        var config = COUNTRY_CONFIG[countryCode];
        if (!config) {
          state.dataByCountry[countryCode] = [];
          return Promise.resolve();
        }

        var endpoint = withCacheQuery(config.url, root.dataset.cacheToday || "");

        return fetch(endpoint, { cache: "no-store" })
          .then(function (response) {
            if (!response.ok) {
              throw new Error("No se pudo cargar " + countryCode);
            }
            return response.json();
          })
          .then(function (json) {
            state.dataByCountry[countryCode] = mapCountryJson(countryCode, json);
          })
          .catch(function () {
            state.dataByCountry[countryCode] = [];
          });
      })
    )
      .then(function () {
        render();
      })
      .finally(function () {
        loader.hidden = true;
      });
  }

  function bootstrap() {
    var roots = document.querySelectorAll("[id^='root-catalogo-']");
    if (!roots.length) return;

    roots.forEach(function (root) {
      initializeModule(root);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
  } else {
    bootstrap();
  }
})();
