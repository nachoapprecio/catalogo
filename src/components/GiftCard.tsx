import { Card, CardContent } from "@/components/ui/card";

interface GiftCardData {
  id: string;
  name: string;
  image: string;
  alt: string;
}

interface GiftCardProps {
  card: GiftCardData;
  delay: number;
}

export const GiftCard = ({ card, delay }: GiftCardProps) => {
  return (
    <div
      className="animate-scale-in group cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Card className="relative overflow-hidden bg-gradient-card border-0 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-105">
        <CardContent className="p-0">
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-secondary">
            <img
              src={card.image}
              alt={card.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop";
              }}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
          
          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-foreground text-sm leading-tight mb-2 line-clamp-2">
              {card.name}
            </h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};