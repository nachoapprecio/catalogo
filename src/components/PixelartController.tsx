import React, { useState } from "react";
import { Button } from "./ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type PixelartStyle = 'none' | 'basic' | 'alt' | 'retro';

interface PixelartControllerProps {
  onStyleChange: (style: PixelartStyle) => void;
  currentStyle: PixelartStyle;
}

export const PixelartController = ({ onStyleChange, currentStyle }: PixelartControllerProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Estilo de íconos:</span>
        <Select value={currentStyle} onValueChange={(value: PixelartStyle) => onStyleChange(value)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Normal</SelectItem>
            <SelectItem value="basic">Pixelart Básico</SelectItem>
            <SelectItem value="alt">Pixelart + Filtros</SelectItem>
            <SelectItem value="retro">Retro 8-bit</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export const getPixelartClassName = (style: PixelartStyle): string => {
  switch (style) {
    case 'basic':
      return 'pixelart-icon';
    case 'alt':
      return 'pixelart-icon-alt';
    case 'retro':
      return 'pixelart-icon-retro';
    default:
      return '';
  }
};
