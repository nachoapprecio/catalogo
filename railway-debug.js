// Railway Debug Script
// Ejecutar en la consola del navegador en https://catalogo-production-38fc.up.railway.app/

console.log('🔍 RAILWAY DEBUG - Iniciando diagnóstico de filtros...');

// 1. Verificar URL actual
console.log('📍 URL actual:', window.location.href);
console.log('📍 Search params:', window.location.search);

// 2. Verificar si los parámetros se leen correctamente
const urlParams = new URLSearchParams(window.location.search);
console.log('📍 Parámetros detectados:');
console.log('   - country:', urlParams.get('country'));
console.log('   - category:', urlParams.get('category'));
console.log('   - search:', urlParams.get('search'));

// 3. Verificar si React está funcionando
if (window.React) {
  console.log('✅ React está cargado');
} else {
  console.log('❌ React NO está cargado');
}

// 4. Verificar si el DOM contiene elementos esperados
const countryButtons = document.querySelectorAll('[data-country]');
const categoryButtons = document.querySelectorAll('[data-category]');
const giftCards = document.querySelectorAll('[data-gift-card]');

console.log('📍 Elementos encontrados:');
console.log('   - Botones de país:', countryButtons.length);
console.log('   - Botones de categoría:', categoryButtons.length);
console.log('   - Gift cards:', giftCards.length);

// 5. Verificar errores en consola
const errors = [];
const originalError = console.error;
console.error = function(...args) {
  errors.push(args);
  originalError.apply(console, args);
};

setTimeout(() => {
  console.log('📍 Errores capturados:', errors);
}, 2000);

// 6. Test manual de filtros
console.log('🧪 Para testear manualmente:');
console.log('   window.location.href = "?country=peru&category=e-commerce"');

// 7. Verificar localStorage/sessionStorage
console.log('📍 Storage:');
console.log('   - localStorage:', Object.keys(localStorage));
console.log('   - sessionStorage:', Object.keys(sessionStorage));
