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
  image?: string;
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
    "GASTRONOMÍA": "Gastronomía",
    "VUELOS Y EXPERIENCIAS": "Vuelos y Experiencias",
    "DEPORTES": "Deportes",
    "MODA Y ACCESORIOS": "Moda y Accesorios",
    "VESTUARIO, CALZADO Y ACCESORIOS": "Moda y Accesorios",
    "MODA": "Moda y Accesorios",
    "SALUD Y BELLEZA": "Salud, Belleza y Bienestar",
    "SALUD BELLEZA Y BIENESTAR": "Salud, Belleza y Bienestar",
    "ENTRETENIMIENTO Y TIEMPO LIBRE": "Entretenimiento y Tiempo Libre",
    "ENTRETENCIÓN Y TIEMPO LIBRE": "Entretenimiento y Tiempo Libre",
    "ENTRETENIMIENTO": "Entretenimiento",
    "GAMING": "Gaming",
    "TECNOLOGÍA": "Tecnología",
    "SERVICIOS": "Servicios",
    "E-COMMERCE": "E-commerce",
    "ECOMMERCE": "E-commerce",
    "OTROS": "Otros",
    "JUGUETERÍA": "Juguetería",
    "JUGUETERIA": "Juguetería",
    "FERRETERÍA": "Ferretería",
    "FERRETERIA": "Ferretería",
    "EDUCACIÓN": "Educación",
    "EDUCACION": "Educación",
    "FARMACIA": "Farmacia",
    "LIBRERÍAS": "Librerías",
    "LIBRERIAS": "Librerías",
    "DISEÑO Y DECORACIÓN": "Diseño y Decoración",
    "DISEÑO Y DECORACION": "Diseño y Decoración",
    "DISENO Y DECORACION": "Diseño y Decoración",
    "DISEÑO": "Diseño",
    "DISENO": "Diseño",
    "DECORACIÓN": "Decoración",
    "DECORACION": "Decoración",
    "MÚSICA": "Música",
    "MUSICA": "Música",
    "ÓPTICA": "Óptica",
    "OPTICA": "Óptica",
    "ELECTRÓNICA": "Electrónica",
    "ELECTRONICA": "Electrónica",
    "JOYERÍA": "Joyería",
    "JOYERIA": "Joyería",
    "PANADERÍA": "Panadería",
    "PANADERIA": "Panadería",
    "LIBRERÍA": "Librería",
    "LIBRERIA": "Librería",
    "TELEFONÍA": "Telefonía",
    "TELEFONIA": "Telefonía",
    "PELUQUERÍA": "Peluquería",
    "PELUQUERIA": "Peluquería",
    "VETERINARIA": "Veterinaria",
    "PAPELERÍA": "Papelería",
    "PAPELERIA": "Papelería",
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
  // URLs de imagen a filtrar (no mostrar estas gift cards)
  const EXCLUDED_IMAGE_URLS = [
    "https://storage.googleapis.com/cdnbw/cdn/dcanje.mx/giftcards/30.png",
    "https://storage.googleapis.com/cdnbw/cdn/dcanje.mx/giftcards/30.jpg"
  ];
  
  // Nombres de gift cards problemáticas por país
  const EXCLUDED_GIFT_CARDS_BY_COUNTRY = {
    colombia: ["Via Uno Chile", "VIAUNOCHILE"],
    chile: [],
    peru: [],
    ecuador: [],
    mexico: []
  };
  
  return json.map((cat) => {
    // Compatibilidad: acepta claves en español o inglés
    const catName = cat.Categoria || cat.category;
    const cardsArr = cat["Gift Cards"] || cat.giftcards || [];
    const formattedCatName = formatCategoryName(catName || "");
    
    return {
      id: formattedCatName ? formattedCatName.toLowerCase().replace(/\s+/g, "-") : "unknown",
      name: formattedCatName,
      cards: cardsArr
        .filter((card: GiftCardItem) => {
          // Filtrar gift cards con imagen específica que no debe mostrarse
          const imageUrl = card["Fuente imagen"] || card["image_url"] || (card as any)["image"] || "";
          const cardName = card["nombre"] || card["name"] || "";
          const giftCardCode = card["giftcard_name"] || "";
          
          // Filtrar por URL de imagen
          if (EXCLUDED_IMAGE_URLS.includes(imageUrl)) {
            return false;
          }
          
          // Filtrar gift cards problemáticas (Como Via Uno Chile en Colombia)
          const problematicNames = ["Via Uno Chile", "VIAUNOCHILE"];
          if (problematicNames.some(name => 
            cardName.includes(name) || giftCardCode.includes(name)
          )) {
            return false;
          }
          
          return true;
        })
        .map((card: GiftCardItem) => ({
          id: card["posición"] || card["position"] || card["nombre"] || card["name"] || "",
          name: formatGiftCardName(card["nombre"] || card["name"] || ""),
          image: card["Fuente imagen"] || card["image_url"] || (card as any)["image"] || "",
          alt: formatGiftCardName(card["nombre"] || card["name"] || "Gift card"),
        })),
    };
  });
}
