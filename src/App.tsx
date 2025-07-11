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

  const categories = data.map((entry) => entry.category);

  const filteredData = selectedCategory
    ? data.filter((entry) => entry.category === selectedCategory)
    : data;

  return (
    <div className="p-4 font-montserrat bg-white">
      {/* Country Buttons */}
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

      {/* Category Selector */}
      <CategorySelector
        categories={categories}
        activeCategory={selectedCategory}
        setActiveCategory={setSelectedCategory}
      />

      {/* Category Sections */}
      {filteredData.map((categoryData, index) => (
        <CategorySection
          key={`${selectedCountry}-${categoryData.category}`}
          category={{
            id: `${selectedCountry}-${categoryData.category}`,
            name: categoryData.category,
            cards: categoryData.cards,
          }}
          searchTerm=""
          delay={index * 100}
        />
      ))}
    </div>
  );
};

export default App;
