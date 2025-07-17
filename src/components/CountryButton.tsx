import React from "react";

interface CountryButtonProps {
  code: string;
  name: string;
  image: string;
  selected: boolean;
  onClick: () => void;
}

export const CountryButton: React.FC<CountryButtonProps> = ({ code, name, image, selected, onClick }) => {
  // Determinar el ancho según el tipo de botón
  const getWidthClass = () => {
    if (code === 'all') {
      return 'w-auto min-w-[6rem]'; // "Todos los países" se adapta por sí solo
    } else if (code === 'colombia') {
      return 'w-auto min-w-[5rem]'; // Colombia define el ancho base
    } else {
      return 'w-[5.5rem]'; // Otros países siguen un ancho fijo basado en Colombia
    }
  };

  return (
    <button
      className={`
        flex flex-col items-center px-4 py-3 rounded-2xl border-[3px] border-black 
        transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
        font-montserrat font-semibold h-20 ${getWidthClass()}
        ${selected 
          ? 'bg-[#fa345e] text-white' 
          : 'bg-white text-black hover:bg-gray-50'
        }
      `}
      onClick={onClick}
      aria-pressed={selected}
      type="button"
    >
      <img 
        src={image} 
        alt={name} 
        className={`w-7 h-7 mb-1 object-contain ${selected && code === 'all' ? 'filter brightness-0 invert' : ''}`} 
      />
      <span className="text-xs text-center">{name}</span>
    </button>
  );
};

export default CountryButton;
