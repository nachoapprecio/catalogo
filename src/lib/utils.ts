import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Agrupa giftcards planas por categoría
export function mapGiftCardsJsonToCategories(
  json: any[]
): Array<{
  id: string;
  name: string;
  cards: Array<{
    id: string;
    name: string;
    image: string;
    alt: string;
  }>;
}> {
  const categoriesMap: Record<string, any[]> = {};

  json.forEach((card) => {
    const categoryName = card.Categoria || card.category || "Sin categoría";
    if (!categoriesMap[categoryName]) {
      categoriesMap[categoryName] = [];
    }
    categoriesMap[categoryName].push({
      id: card["posición"] || card["position"] || card["nombre"] || card["name"] || "",
      name: card["nombre"] || card["name"] || "",
      image: card["Fuente imagen"] || card["image_url"] || "",
      alt: card["nombre"] || card["name"] || "Gift Card",
    });
  });

  return Object.entries(categoriesMap).map(([name, cards]) => ({
    id: name.toLowerCase().replace(/\s+/g, "-"),
    name,
    cards,
  }));
}
