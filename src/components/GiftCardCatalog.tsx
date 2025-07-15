import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CategorySection } from "./CategorySection";
import { CountryButton } from "./CountryButton";
import { giftcardsByCountry, countryList } from "@/data/giftcardsByCountry";
import { mapGiftCardsJsonToCategories } from "@/lib/utils";
import { ShoppingCart, Utensils, Plane, Dumbbell, Shirt, Heart, Gamepad2, Wrench, Globe, Smartphone } from "lucide-react";

// Mapeo de iconos por nombre de categoría
const iconMap: Record<string, any> = {
  "SUPERMERCADOS Y MINIMARKET": ShoppingCart,
  "GRANDES TIENDAS": ShoppingCart,
  "GASTRONOMIA": Utensils,
  "GASTRONOMÍA": Utensils,
  "VUELOS Y EXPERIENCIAS": Plane,
  "DEPORTES": Dumbbell,
  "MODA Y ACCESORIOS": Shirt,
  "SALUD Y BELLEZA": Heart,
  "ENTRETENIMIENTO Y TIEMPO LIBRE": Gamepad2,
  "ENTRETENCIÓN Y TIEMPO LIBRE": Gamepad2,
  "SERVICIOS": Wrench,
  "E-COMMERCE": Globe,
  "ECOMMERCE": Globe,
  "Recargas Celulares": Smartphone,
};

export const GiftCardCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Agrupa todas las categorías de todos los países (sin duplicados por nombre)
  const allCategories = useMemo(() => {
    const all = Object.values(giftcardsByCountry).flatMap(mapGiftCardsJsonToCategories);
    const unique: Record<string, any> = {};
    all.forEach((cat) => {
      if (!unique[cat.name]) unique[cat.name] = { ...cat, cards: [...cat.cards] };
      else unique[cat.name].cards.push(...cat.cards);
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
    return mapped.map((cat: any) => ({
      ...cat,
      icon: iconMap[cat.name] || undefined,
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
  const showEmpty =
    selectedCategory &&
    (!countryCategories.find((cat) => cat.id === selectedCategory) || filteredCategories.length === 0);

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
              onChange={(e) => setSearchTerm(e.target.value)}
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
                setSelectedCountry(country.code);
                setSelectedCategory(null);
              }}
            />
          ))}
        </div>
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <Badge
            variant={selectedCategory === null ? "default" : "secondary"}
            className="cursor-pointer px-4 py-2 transition-smooth hover:scale-105"
            onClick={() => setSelectedCategory(null)}
          >
            Todas las categorías
          </Badge>
          {allCategoryList.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "secondary"}
              className="cursor-pointer px-4 py-2 transition-smooth hover:scale-105"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
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