import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GiftCardItem {
  posición?: string;
  position?: string;
  nombre?: string;
  name?: string;
  "Fuente imagen"?: string;
  image_url?: string;
}

interface CategoryData {
  Categoria?: string;
  category?: string;
  "Gift Cards"?: GiftCardItem[];
  giftcards?: GiftCardItem[];
}

// Función para formatear nombres de categorías según las reglas establecidas
function formatCategoryName(name: string): string {
  if (!name) return "Sin categoría";
  
  // Mapeo de categorías del formato antiguo al nuevo
  const categoryMapping: Record<string, string> = {
    "SUPERMERCADOS Y MINIMARKET": "Supermercados y Minimarket",
    "GRANDES TIENDAS": "Grandes Tiendas", 
    "GASTRONOMIA": "Gastronomía",
    "GASTRONOMÍA": "Gastronomía",
    "VUELOS Y EXPERIENCIAS": "Vuelos y Experiencias",
    "DEPORTES": "Deportes",
    "MODA Y ACCESORIOS": "Moda y Accesorios",
    "SALUD Y BELLEZA": "Salud y Belleza",
    "ENTRETENIMIENTO Y TIEMPO LIBRE": "Entretenimiento y Tiempo Libre",
    "ENTRETENCIÓN Y TIEMPO LIBRE": "Entretenimiento y Tiempo Libre",
    "SERVICIOS": "Servicios",
    "E-COMMERCE": "E-commerce",
    "ECOMMERCE": "E-commerce",
    "Recargas Celulares": "Recargas Celulares"
  };
  
  // Si existe en el mapeo, usar el formato correcto
  if (categoryMapping[name]) {
    return categoryMapping[name];
  }
  
  // Para nombres que no están en el mapeo, aplicar reglas generales
  const words = name.toLowerCase().split(/\s+/);
  const formattedWords = words.map((word, index) => {
    // Conectores y preposiciones en minúscula (excepto si es la primera palabra)
    const prepositions = ['y', 'de', 'del', 'la', 'el', 'en', 'con', 'para', 'por', 'a', 'al'];
    if (index > 0 && prepositions.includes(word)) {
      return word;
    }
    // Primera letra mayúscula, resto minúscula
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  
  return formattedWords.join(' ');
}

// Función para formatear nombres de gift cards
function formatGiftCardName(name: string): string {
  if (!name) return "";
  
  // Reemplazar "Gift Card" por "Gift card"
  return name.replace(/Gift\s+Card/gi, 'Gift card');
}

// Utilidad para transformar el JSON de giftcards al formato de categorías y tarjetas esperado por los componentes
export function mapGiftCardsJsonToCategories(
  json: CategoryData[]
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
    const catName = cat.Categoria || cat.category;
    const cardsArr = cat["Gift Cards"] || cat.giftcards || [];
    const formattedCatName = formatCategoryName(catName || "");
    
    return {
      id: catName ? catName.toLowerCase().replace(/\s+/g, "-") : "unknown",
      name: formattedCatName,
      cards: cardsArr.map((card: GiftCardItem) => ({
        id: card["posición"] || card["position"] || card["nombre"] || card["name"] || "",
        name: formatGiftCardName(card["nombre"] || card["name"] || ""),
        image: card["Fuente imagen"] || card["image_url"] || "",
        alt: formatGiftCardName(card["nombre"] || card["name"] || "Gift card"),
      })),
    };
  });
}
