import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategorySection } from "./CategorySection";
import { CountryButton } from "./CountryButton";
import { useIsMobile } from "@/hooks/use-mobile";
import { giftcardsByCountry, countryList } from "@/data/giftcardsByCountry";
import { mapGiftCardsJsonToCategories } from "@/lib/utils";
import { ShoppingCart, Utensils, Plane, Dumbbell, Shirt, Heart, Gamepad2, Wrench, Globe, Smartphone, Store, LucideIcon, 
  Building2, Palette, Stethoscope, Car, Sparkles, Trophy, GraduationCap, Home, PaintBucket, Music, 
  Glasses, Zap, Gem, Sandwich, Book, Phone, Scissors, Baby, FileText, Wine } from "lucide-react";

interface Category {
  id: string;
  name: string;
  cards: Array<{
    id: string;
    name: string;
    image: string;
    alt: string;
  }>;
  icon?: LucideIcon;
}

// Mapeo de iconos por nombre de categoría
const iconMap: Record<string, LucideIcon> = {
  "Supermercados y Minimarket": ShoppingCart,
  "Grandes Tiendas": Store,
  "Gastronomía": Utensils,
  "Vuelos y Experiencias": Plane,
  "Deportes": Dumbbell,
  "Moda y Accesorios": Shirt,
  "Moda": Shirt,
  "Salud y Belleza": Heart,
  "Salud Belleza y Bienestar": Heart,
  "Entretenimiento y Tiempo Libre": Gamepad2,
  "Entretenimiento": Gamepad2,
  "Servicios": Wrench,
  "E-commerce": Globe,
  "Ecommerce": Globe,
  "Recargas Celulares": Smartphone,
  "Juguetería": Baby,
  "Ferretería": Wrench,
  "Educación": GraduationCap,
  "Farmacia": Stethoscope,
  "Diseño y Decoración": Palette,
  "Diseño": Palette,
  "Decoración": Home,
  "Música": Music,
  "Óptica": Glasses,
  "Electrónica": Zap,
  "Joyería": Gem,
  "Panadería": Sandwich,
  "Librería": Book,
  "Librerías": Book,
  "Telefonía": Phone,
  "Peluquería": Scissors,
  "Veterinaria": Heart,
  "Papelería": FileText,
  "Automotriz": Car,
  "Vestuario, Calzado y Accesorios": Shirt,
  "Tiendas Especializadas": Store,
  "Mascotas": Heart,
  "Vinos": Wine,
  "Otros": Sparkles,
  "Gaming": Gamepad2,
};

interface GiftCardCatalogProps {
  country?: string;
  hideCountryFilters?: boolean;
  singleCountryMode?: boolean;
  customTitle?: string;
  customSubtitle?: string;
  language?: "spanish" | "english";
}

type CatalogLanguage = "spanish" | "english";

const countryNameByLanguage: Record<CatalogLanguage, Record<string, string>> = {
  spanish: {
    all: "Todos los paises",
    chile: "Chile",
    peru: "Peru",
    colombia: "Colombia",
    ecuador: "Ecuador",
    mexico: "Mexico",
    spain: "España",
  },
  english: {
    all: "All countries",
    chile: "Chile",
    peru: "Peru",
    colombia: "Colombia",
    ecuador: "Ecuador",
    mexico: "Mexico",
    spain: "Spain",
  },
};

const categoryNameByLanguage: Record<string, string> = {
  "supermercados y minimarket": "Supermarkets and Mini-markets",
  "grandes tiendas": "Department Stores",
  gastronomia: "Food and Dining",
  "vuelos y experiencias": "Flights and Experiences",
  deportes: "Sports",
  "moda y accesorios": "Fashion and Accessories",
  moda: "Fashion",
  "salud y belleza": "Health and Beauty",
  "salud belleza y bienestar": "Health, Beauty and Wellness",
  "entretenimiento y tiempo libre": "Entertainment and Leisure",
  entretenimiento: "Entertainment",
  servicios: "Services",
  "e-commerce": "E-commerce",
  ecommerce: "E-commerce",
  "recargas celulares": "Mobile Top-ups",
  jugueteria: "Toys",
  ferreteria: "Hardware",
  educacion: "Education",
  farmacia: "Pharmacy",
  "diseno y decoracion": "Design and Decor",
  diseno: "Design",
  decoracion: "Decor",
  musica: "Music",
  optica: "Optics",
  electronica: "Electronics",
  joyeria: "Jewelry",
  panaderia: "Bakery",
  libreria: "Bookstore",
  librerias: "Bookstores",
  telefonia: "Telephony",
  peluqueria: "Hair Salon",
  veterinaria: "Veterinary",
  papeleria: "Stationery",
  automotriz: "Automotive",
  "vestuario, calzado y accesorios": "Fashion, Footwear and Accessories",
  "tiendas especializadas": "Specialty Stores",
  mascotas: "Pets",
  vinos: "Wines",
  otros: "Others",
  gaming: "Gaming",
};

const uiTextByLanguage: Record<CatalogLanguage, {
  defaultTitle: string;
  defaultSubtitleSingleCountry: string;
  defaultSubtitleMultiCountry: string;
  searchPlaceholder: string;
  allCategoriesLabel: string;
  categorySelectPlaceholder: string;
  emptyStateLine1: string;
  emptyStateLine2: string;
  emptyStateLine3: string;
}> = {
  spanish: {
    defaultTitle: "Catalogo de Gift Cards",
    defaultSubtitleSingleCountry: "Descubre las mejores gift cards disponibles",
    defaultSubtitleMultiCountry: "Explora y filtra por pais y categoria",
    searchPlaceholder: "Buscar gift cards...",
    allCategoriesLabel: "Todas las categorias",
    categorySelectPlaceholder: "Selecciona una categoria",
    emptyStateLine1: "Ups! Parece que aqui no hay nada...",
    emptyStateLine2: "No te preocupes.",
    emptyStateLine3: "Cada mes nuevas Gift Cards para ti!",
  },
  english: {
    defaultTitle: "Gift Card Catalog",
    defaultSubtitleSingleCountry: "Discover the best gift cards available",
    defaultSubtitleMultiCountry: "Browse and filter by country and category",
    searchPlaceholder: "Search gift cards...",
    allCategoriesLabel: "All categories",
    categorySelectPlaceholder: "Select a category",
    emptyStateLine1: "Oops! There is nothing here yet...",
    emptyStateLine2: "No worries.",
    emptyStateLine3: "New Gift Cards are added every month!",
  },
};

function normalizeCategoryKey(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export const GiftCardCatalog = ({ 
  country = "all", 
  hideCountryFilters = false, 
  singleCountryMode = false,
  customTitle,
  language = "spanish",
  customSubtitle
}: GiftCardCatalogProps = {}) => {
  const safeLanguage: CatalogLanguage = language === "english" ? "english" : "spanish";
  const uiText = uiTextByLanguage[safeLanguage];
  const effectiveSingleCountryMode = singleCountryMode && hideCountryFilters;
  const defaultCountry = country || "all";
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>(defaultCountry);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const getCountryLabel = (countryCode: string, fallback: string): string => {
    return countryNameByLanguage[safeLanguage][countryCode] || fallback;
  };

  const getCategoryLabel = (categoryName: string): string => {
    if (safeLanguage === "spanish") return categoryName;
    const key = normalizeCategoryKey(categoryName);
    return categoryNameByLanguage[key] || categoryName;
  };

  const localizedCountryList = useMemo(() => {
    return countryList.map((entry) => ({
      ...entry,
      name: getCountryLabel(entry.code, entry.name),
    }));
  }, [safeLanguage]);

  // Función para actualizar URL con parámetros de consulta
  const updateURLParams = (country: string, category: string | null, search: string) => {
    // Solo actualizar URL en el navegador, no en SSR
    if (typeof window === 'undefined') return;
    
    try {
      const url = new URL(window.location.href);
      const params = new URLSearchParams();
      
      if (country !== "all") params.set("country", country);
      if (category) params.set("category", category);
      if (search.trim()) params.set("search", search.trim());
      
      // Usar pushState en lugar de replaceState para mejor compatibilidad
      const newUrl = params.toString() ? `${url.pathname}?${params.toString()}` : url.pathname;
      
      // Verificar si la URL realmente cambió para evitar loops
      if (newUrl !== window.location.pathname + window.location.search) {
        window.history.replaceState({}, "", newUrl);
      }
    } catch (error) {
      console.warn('Error updating URL params:', error);
    }
  };

  // Función para leer parámetros de URL al cargar la página
  const loadFromURLParams = () => {
    // Solo leer URL en el navegador, no en SSR
    if (typeof window === 'undefined') return;
    
    try {
      // En modo de país único, usar el país pasado como prop
      if (effectiveSingleCountryMode) {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get("category");
        const search = urlParams.get("search") || "";
        
        console.log('🔍 Loading from URL params (single country mode):', { country, category, search });
        
        setSelectedCountry(defaultCountry);
        setSelectedCategory(category);
        setSearchTerm(search);
        return;
      }
      
      // Modo normal - leer país desde URL
      const urlParams = new URLSearchParams(window.location.search);
      const urlCountry = urlParams.get("country") || defaultCountry;
      const category = urlParams.get("category");
      const search = urlParams.get("search") || "";
      
      console.log('🔍 Loading from URL params:', { country: urlCountry, category, search });
      
      setSelectedCountry(urlCountry);
      setSelectedCategory(category);
      setSearchTerm(search);
    } catch (error) {
      console.warn('Error loading URL params:', error);
      // Fallback a valores por defecto
      setSelectedCountry(defaultCountry);
      setSelectedCategory(null);
      setSearchTerm("");
    }
  };

  // Cargar filtros desde URL al montar el componente
  useEffect(() => {
    loadFromURLParams();
  }, []);

  // Actualizar URL cuando cambien los filtros
  useEffect(() => {
    updateURLParams(selectedCountry, selectedCategory, searchTerm);
  }, [selectedCountry, selectedCategory, searchTerm]);

  // Funciones para manejar cambios de filtros
  const handleCountryChange = (country: string) => {
    // En modo de país único, no permitir cambios de país
    if (effectiveSingleCountryMode) return;
    
    setSelectedCountry(country);
    setSelectedCategory(null); // Reset category when changing country
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
  };

  // Agrupa todas las categorías de todos los países (sin duplicados por nombre)
  const allCategories = useMemo(() => {
    const all = Object.entries(giftcardsByCountry).flatMap(([countryCode, countryData]) => {
      const countryInfo = localizedCountryList.find(c => c.code === countryCode);
      return mapGiftCardsJsonToCategories(countryData).map(cat => ({
        ...cat,
        countryCode,
        countryFlag: countryInfo?.image
      }));
    });
    
    const unique: Record<string, any> = {};
    all.forEach((cat) => {
      if (!unique[cat.name]) {
        unique[cat.name] = { 
          ...cat, 
          cards: cat.cards.map((card: any) => ({
            ...card,
            countryCode: cat.countryCode,
            countryFlag: cat.countryFlag
          }))
        };
      } else {
        unique[cat.name].cards.push(...cat.cards.map((card: any) => ({
          ...card,
          countryCode: cat.countryCode,
          countryFlag: cat.countryFlag
        })));
      }
    });
    
    // Asigna icono si existe
    return Object.values(unique).map((cat: any) => ({
      ...cat,
      icon: iconMap[cat.name] || undefined,
    }));
  }, [localizedCountryList]);

  // Categorías del país seleccionado
  const countryCategories = useMemo(() => {
    if (selectedCountry === "all") return allCategories;
    const json = giftcardsByCountry[selectedCountry as keyof typeof giftcardsByCountry];
    const mapped = json ? mapGiftCardsJsonToCategories(json) : [];
    const countryInfo = localizedCountryList.find(c => c.code === selectedCountry);
    
    return mapped.map((cat) => ({
      ...cat,
      icon: iconMap[cat.name] || undefined,
      cards: cat.cards.map(card => ({
        ...card,
        countryCode: selectedCountry,
        countryFlag: countryInfo?.image
      }))
    }));
  }, [selectedCountry, allCategories, localizedCountryList]);

  // Categorías a mostrar según filtro
  const categories = countryCategories.filter((cat) =>
    !selectedCategory || cat.id === selectedCategory
  );

  // Gift cards filtradas por búsqueda
  const filteredCategories = categories
    .map((cat) => ({
      ...cat,
      cards: cat.cards.filter((card) =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((cat) => cat.cards.length > 0);

  // Todas las categorías únicas para los botones de filtro
  const allCategoryList = useMemo(() => {
    return allCategories.map((cat) => ({ id: cat.id, name: getCategoryLabel(cat.name) }));
  }, [allCategories, safeLanguage]);

  const localizedFilteredCategories = useMemo(() => {
    return filteredCategories.map((cat) => ({
      ...cat,
      name: getCategoryLabel(cat.name),
    }));
  }, [filteredCategories, safeLanguage]);

  // Mensaje si no hay resultados
  const showEmpty = filteredCategories.length === 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="catalogo-title text-5xl font-bold mb-4 animate-fade-in">
              {customTitle || uiText.defaultTitle}
            </h2>
            <p className="catalogo-subtitle text-xl opacity-90 animate-fade-in">
              {customSubtitle || (effectiveSingleCountryMode 
                ? uiText.defaultSubtitleSingleCountry 
                : uiText.defaultSubtitleMultiCountry)
              }
            </p>
          </div>
          {/* Search */}
          <div className="max-w-md mx-auto relative animate-scale-in">
            <Input
              placeholder={uiText.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 bg-card border-0 shadow-lg"
            />
          </div>
        </div>
      </div>
      {/* Country Filters - Solo mostrar si no está en modo oculto */}
      {!hideCountryFilters && (
        <div className="container mx-auto px-4 pt-8">
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {localizedCountryList.map((country) => (
              <CountryButton
                key={country.code}
                code={country.code}
                name={country.name}
                image={country.image}
                selected={selectedCountry === country.code}
                onClick={() => {
                  handleCountryChange(country.code);
                }}
              />
            ))}
          </div>
        </div>
      )}
      {/* Container para el resto del contenido */}
      <div className="container mx-auto px-4 pt-8">
        {/* Category Filters */}
        {isMobile ? (
          // Vista móvil - Select dropdown
          <div className="mb-8 max-w-xs mx-auto">
            <Select
              value={selectedCategory || "all"}
              onValueChange={(value) => handleCategoryChange(value === "all" ? null : value)}
            >
              <SelectTrigger 
                className={`
                  w-full font-montserrat font-semibold border-[3px] border-black rounded-2xl
                  ${selectedCategory ? 'bg-[#fa345e] text-white' : 'bg-white text-black'}
                `}
              >
                <SelectValue placeholder={uiText.categorySelectPlaceholder} />
              </SelectTrigger>
              <SelectContent className="bg-white border-[3px] border-black shadow-lg font-montserrat">
                <SelectItem 
                  value="all"
                  className={`font-montserrat ${selectedCategory === null ? 'bg-[#fa345e] text-white' : 'text-black hover:bg-gray-100'}`}
                >
                  {uiText.allCategoriesLabel}
                </SelectItem>
                {allCategoryList.map((category) => (
                  <SelectItem 
                    key={category.id} 
                    value={category.id}
                    className={`font-montserrat ${selectedCategory === category.id ? 'bg-[#fa345e] text-white' : 'text-black hover:bg-gray-100'}`}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          // Vista desktop - Badges
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <button
              className={`
                px-4 py-2 rounded-2xl border-[3px] border-black font-montserrat font-semibold transition-all hover:scale-105 text-xs
                ${selectedCategory === null 
                  ? 'bg-[#fa345e] text-white' 
                  : 'bg-white text-black hover:bg-gray-50'
                }
              `}
              onClick={() => handleCategoryChange(null)}
            >
              {uiText.allCategoriesLabel}
            </button>
            {allCategoryList.map((category) => (
              <button
                key={category.id}
                className={`
                  px-4 py-2 rounded-2xl border-[3px] border-black font-montserrat font-semibold transition-all hover:scale-105 text-xs
                  ${selectedCategory === category.id 
                    ? 'bg-[#fa345e] text-white' 
                    : 'bg-white text-black hover:bg-gray-50'
                  }
                `}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
        {/* Categories */}
        <div className="space-y-12">
          {showEmpty ? (
            <div className="text-center py-24 text-xl text-muted-foreground animate-fade-in">
              <img src="/empty-state.svg" alt={uiText.emptyStateLine1} className="mx-auto mb-6 w-24 h-24 opacity-70" />
              <p>{uiText.emptyStateLine1}<br />{uiText.emptyStateLine2}<br />{uiText.emptyStateLine3}</p>
            </div>
          ) : (
            localizedFilteredCategories.map((category, index) => (
              <CategorySection
                key={category.id}
                category={category}
                searchTerm={searchTerm}
                delay={index * 100}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};