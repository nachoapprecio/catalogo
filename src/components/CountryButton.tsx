import React from "react";

interface CountryButtonProps {
  code: string;
  name: string;
  image: string;
  selected: boolean;
  onClick: () => void;
}

export const CountryButton: React.FC<CountryButtonProps> = ({ code, name, image, selected, onClick }) => (
  <button
    className={`flex flex-col items-center px-3 py-2 rounded-lg border transition-all shadow-sm hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 ${selected ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground'}`}
    onClick={onClick}
    aria-pressed={selected}
    type="button"
  >
    <img src={image} alt={name} className="w-7 h-7 mb-1 object-contain" />
    <span className="text-xs font-semibold">{name}</span>
  </button>
);


export default CountryButton;
