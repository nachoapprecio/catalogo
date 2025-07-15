import React from "react";
import { GiftCard } from "./GiftCard";

interface GiftCardData {
  id: string;
  name: string;
  image: string;
  alt: string;
}

interface Category {
  id: string;
  icon?: React.ComponentType<{ className?: string }>;
  name: string;
  cards: GiftCardData[];
}

interface CategorySectionProps {
  category: Category;
  searchTerm: string;
  delay: number;
}

export const CategorySection = ({ category, searchTerm, delay }: CategorySectionProps) => {
  const filteredCards = category.cards.filter(card =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredCards.length === 0) return null;

  // Fallback: si no hay icono, no renderizar el div del icono
  const IconComponent = category.icon;

  return (
    <div 
      className="animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Category Header */}
      <div className="flex items-center gap-4 mb-6">
        {IconComponent ? (
          <div 
            className="flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg"
            style={{ backgroundColor: '#FA345E' }}
          >
            <IconComponent className="w-8 h-8 text-white" />
          </div>
        ) : null}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {category.name}
          </h2>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {filteredCards.map((card, index) => (
          <GiftCard
            key={category.id + '-' + card.id + '-' + index}
            card={card}
            delay={delay + (index * 50)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
