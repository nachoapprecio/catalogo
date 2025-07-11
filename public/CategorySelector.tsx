
import React from "react";

type Props = {
  categories: string[];
  activeCategory: string | null;
  setActiveCategory: (cat: string | null) => void;
};

const CategorySelector: React.FC<Props> = ({ categories, activeCategory, setActiveCategory }) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setActiveCategory(value === "all" ? null : value);
  };

  return (
    <div className="my-4 flex flex-wrap gap-2 items-center">
      {isMobile ? (
        <select
          onChange={handleChange}
          className="border-2 border-[#fa345e] text-[#fa345e] font-bold p-2 font-montserrat"
        >
          <option value="all">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      ) : (
        <>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
              className={\`
                font-montserrat px-4 py-2 border 
                \${activeCategory === null || activeCategory === cat
                  ? "border-[#fa345e] text-[#fa345e] font-bold active"
                  : "border-black text-black inactive"}
              \`}
            >
              {cat}
            </button>
          ))}
        </>
      )}
    </div>
  );
};

export default CategorySelector;
