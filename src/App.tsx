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

  const categories = Array.from(
    new Set(data.map((entry) => entry.category))
  );

  const filteredData = selectedCategory
    ? data.filter((entry) => entry.category === selectedCategory)
    : data;

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

      <CategorySection
        country={selectedCountry}
        giftCards={filteredData}
      />
    </div>
  );
};

export default App;
