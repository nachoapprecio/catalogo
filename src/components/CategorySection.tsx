import React from "react";
import { Badge } from "@/components/ui/badge";
import { GiftCard } from "./GiftCard";

interface GiftCardData {
  id: string;
  name: string;
  image: string;
  alt: string;
}

interface Category {
  id: string;
  name: string;
  cards: GiftCardData[];
}

interface CategorySectionProps {
  category: Category;
  searchTerm: string;
  delay: number;
}

export const CategorySection = ({ category, searchTerm, delay }: CategorySectionProps) => {
  const filteredCards = Array.isArray(category.cards)
    ? category.cards.filter(card =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (filteredCards.length === 0) return null;

  return (
    <div className="animate-fade-in" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-center gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {category.name}
          </h2>
          <Badge variant="secondary" className="text-sm">
            {filteredCards.length} {filteredCards.length === 1 ? "opción" : "opciones"}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {filteredCards.map((card, index) => (
          <GiftCard
            key={`${category.id}-${card.id}-${index}`}
            card={card}
            delay={delay + index * 50}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
