import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utilidad para transformar el JSON de giftcards al formato de categorías y tarjetas esperado por los componentes
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
  return json.map((cat) => {
    // Compatibilidad: acepta claves en español o inglés
    const catName = cat.Categoria || cat.category || "Sin categoría";
    const cardsArr = cat["Gift Cards"] || cat.giftcards || [];

    return {
      id: catName.toLowerCase().replace(/\s+/g, "-"),
      name: catName,
      cards: Array.isArray(cardsArr)
        ? cardsArr.map((card: any) => ({
            id: card["posición"] || card["position"] || card["nombre"] || card["name"] || "",
            name: card["nombre"] || card["name"] || "",
            image: card["Fuente imagen"] || card["image_url"] || "",
            alt: card["nombre"] || card["name"] || "Gift Card",
          }))
        : [], // fallback en caso de que giftcards no sea array
    };
  });
}
