import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategorySection } from "./CategorySection";
import { CountryButton } from "./CountryButton";
import { useIsMobile } from "@/hooks/use-mobile";
import { giftcardsByCountry, countryList } from "@/data/giftcardsByCountry";
import { mapGiftCardsJsonToCategories } from "@/lib/utils";
import { ShoppingCart, Utensils, Plane, Dumbbell, Shirt, Heart, Gamepad2, Wrench, Globe, Smartphone, Store, LucideIcon } from "lucide-react";

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
  "Salud y Belleza": Heart,
  "Entretenimiento y Tiempo Libre": Gamepad2,
  "Servicios": Wrench,
  "E-commerce": Globe,
  "Recargas Celulares": Smartphone,
};

export const GiftCardCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const isMobile = useIsMobile();

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
      const urlParams = new URLSearchParams(window.location.search);
      const country = urlParams.get("country") || "all";
      const category = urlParams.get("category");
      const search = urlParams.get("search") || "";
      
      console.log('🔍 Loading from URL params:', { country, category, search });
      
      setSelectedCountry(country);
      setSelectedCategory(category);
      setSearchTerm(search);
    } catch (error) {
      console.warn('Error loading URL params:', error);
      // Fallback a valores por defecto
      setSelectedCountry("all");
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
      const countryInfo = countryList.find(c => c.code === countryCode);
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
  }, []);

  // Categorías del país seleccionado
  const countryCategories = useMemo(() => {
    if (selectedCountry === "all") return allCategories;
    const json = giftcardsByCountry[selectedCountry as keyof typeof giftcardsByCountry];
    const mapped = json ? mapGiftCardsJsonToCategories(json) : [];
    const countryInfo = countryList.find(c => c.code === selectedCountry);
    
    return mapped.map((cat) => ({
      ...cat,
      icon: iconMap[cat.name] || undefined,
      cards: cat.cards.map(card => ({
        ...card,
        countryCode: selectedCountry,
        countryFlag: countryInfo?.image
      }))
    }));
  }, [selectedCountry, allCategories]);

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
    return allCategories.map((cat) => ({ id: cat.id, name: cat.name }));
  }, [allCategories]);

  // Mensaje si no hay resultados
  const showEmpty = filteredCategories.length === 0;

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4 animate-fade-in">
              Catálogo de Gift Cards
            </h1>
            <p className="text-xl opacity-90 animate-fade-in">
              Explora y filtra por país y categoría
            </p>
          </div>
          {/* Search */}
          <div className="max-w-md mx-auto relative animate-scale-in">
            <Input
              placeholder="Buscar gift cards..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 bg-card border-0 shadow-lg"
            />
          </div>
        </div>
      </div>
      {/* Country Filters */}
      <div className="container mx-auto px-4 pt-8">
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {countryList.map((country) => (
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
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent className="bg-white border-[3px] border-black shadow-lg font-montserrat">
                <SelectItem 
                  value="all"
                  className={`font-montserrat ${selectedCategory === null ? 'bg-[#fa345e] text-white' : 'text-black hover:bg-gray-100'}`}
                >
                  Todas las categorías
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
              Todas las categorías
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
              <img src="/empty-state.svg" alt="No hay resultados" className="mx-auto mb-6 w-24 h-24 opacity-70" />
              <p>¡Ups! Parece que aquí no hay nada...<br />No te preocupes.<br />¡Cada mes nuevas Gift Cards para ti!</p>
            </div>
          ) : (
            filteredCategories.map((category, index) => (
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