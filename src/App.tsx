import React, { useState } from "react";
import "./index.css";
import CountryButton from "./components/CountryButton";
import CategorySection from "./components/CategorySection";
import CategorySelector from "./components/CategorySelector";
import data from "./data/giftcards.json";

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState("México");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const countryList = Object.keys(data);
  const allCategories = Array.from(
    new Set(
      countryList.flatMap((country) =>
        data[country].map((card) => card.category)
      )
    )
  );

  const filteredGiftCards = data[selectedCountry].filter((card) =>
    selectedCategory ? card.category === selectedCategory : true
  );

  return (
    <div className="p-4 font-montserrat bg-white">
      <div className="flex gap-2 flex-wrap mb-4">
        {countryList.map((country) => (
          <CountryButton
            key={country}
            country={country}
            selected={country === selectedCountry}
            onClick={() => setSelectedCountry(country)}
          />
        ))}
      </div>

      <CategorySelector
        categories={allCategories}
        activeCategory={selectedCategory}
        setActiveCategory={setSelectedCategory}
      />

      <CategorySection
        country={selectedCountry}
        giftCards={filteredGiftCards}
      />
    </div>
  );
};

export default App;

