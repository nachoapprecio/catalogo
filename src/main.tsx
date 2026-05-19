import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import React from 'react'
import { GiftCardCatalog } from './components/GiftCardCatalog'

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}

// Exportar componentes a la ventana global para uso externo
declare global {
  interface Window {
    React: typeof React;
    ReactDOM: any;
    CatalogoGiftCards: typeof GiftCardCatalog;
  }
}

if (typeof window !== 'undefined') {
  window.React = React;
  // Compatibilidad con React 17 render method
  window.ReactDOM = {
    render: (element: any, container: any) => {
      if (container) {
        const root = createRoot(container);
        root.render(element);
      }
    }
  };
  window.CatalogoGiftCards = GiftCardCatalog;
}
