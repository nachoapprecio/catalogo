import React, { useState } from "react";
import "./index.css";
import CountryButton from "./components/CountryButton";
import CategorySection from "./components/CategorySection";
import CategorySelector from "./components/CategorySelector";
import { giftcardsByCountry } from "./data";

const App = () => {
  const defaultCountry = "Chile";
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const data = giftcardsByCountry[selectedCountry] || [];

  // Extraer categorías únicas
  const categories = Array.from(
    new Set(data.map((entry) => entry.category))
  );

  // Agrupar por categoría
  const groupedByCategory = categories.map((cat) => ({
    id: cat.toLowerCase().replace(/\s+/g, "-"),
    name: cat,
    cards: data.filter((entry) => entry.category === cat),
  }));

  // Si hay categoría seleccionada, filtrar
  const visibleCategories = selectedCategory
    ? groupedByCategory.filter((c) => c.name === selectedCategory)
    : groupedByCategory;

  return (
    <div className="p-4 font-montserrat bg-white">
      <div className="flex gap-2 flex-wrap mb-4">
        {Object.keys(giftcardsByCountry).map((country) => (
          <CountryButton
            key={country}
            country={country}
            selected={country === selectedCountry}
            onClick={() => {
              setSelectedCountry(country);
              setSelectedCategory(null);
            }}
          />
        ))}
      </div>

      <CategorySelector
        categories={categories}
        activeCategory={selectedCategory}
        setActiveCategory={setSelectedCategory}
      />

      {visibleCategories.map((category, index) => (
        <CategorySection
          key={category.id}
          category={category}
          searchTerm=""
          delay={index * 100}
        />
      ))}
    </div>
  );
};

export default App;
