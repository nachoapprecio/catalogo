import React from "react";

interface CategorySelectorProps {
  categories: string[];
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
}

const CategorySelector = ({
  categories,
  activeCategory,
  setActiveCategory,
}: CategorySelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        className={`px-4 py-2 border rounded-full ${
          activeCategory === null
            ? "border-primary text-primary font-bold"
            : "border-black text-black font-normal"
        }`}
        onClick={() => setActiveCategory(null)}
      >
        Todas
      </button>
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 border rounded-full ${
            activeCategory === category
              ? "border-primary text-primary font-bold"
              : "border-black text-black font-normal"
          }`}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
