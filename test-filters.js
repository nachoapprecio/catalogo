// Test de filtros - Ejecutar en la consola del navegador
// Abrir http://localhost:8081 y ejecutar estos tests

console.log('🧪 Iniciando tests de filtros...');

// Test 1: Verificar datos de Perú
const testPeru = () => {
  console.log('📍 Test 1: Verificando datos de Perú');
  // Simular selección de Perú
  window.location.href = 'http://localhost:8081/?country=peru';
  setTimeout(() => {
    const categories = document.querySelectorAll('[data-category]');
    console.log('Categorías encontradas para Perú:', categories.length);
  }, 1000);
};

// Test 2: Verificar filtro Perú + E-commerce
const testPeruEcommerce = () => {
  console.log('📍 Test 2: Verificando Perú + E-commerce');
  window.location.href = 'http://localhost:8081/?country=peru&category=e-commerce';
  setTimeout(() => {
    const giftCards = document.querySelectorAll('[data-gift-card]');
    console.log('Gift cards encontradas para Perú + E-commerce:', giftCards.length);
    
    const emptyState = document.querySelector('[alt="No hay resultados"]');
    if (emptyState) {
      console.log('❌ Se muestra estado vacío incorrectamente');
    } else {
      console.log('✅ No se muestra estado vacío');
    }
  }, 1000);
};

// Test 3: Verificar filtro Chile + Gastronomía
const testChileGastronomia = () => {
  console.log('📍 Test 3: Verificando Chile + Gastronomía');
  window.location.href = 'http://localhost:8081/?country=chile&category=gastronomia';
  setTimeout(() => {
    const giftCards = document.querySelectorAll('[data-gift-card]');
    console.log('Gift cards encontradas para Chile + Gastronomía:', giftCards.length);
  }, 1000);
};

// Test 4: Verificar búsqueda
const testSearch = () => {
  console.log('📍 Test 4: Verificando búsqueda');
  window.location.href = 'http://localhost:8081/?search=starbucks';
  setTimeout(() => {
    const giftCards = document.querySelectorAll('[data-gift-card]');
    console.log('Gift cards encontradas para búsqueda "starbucks":', giftCards.length);
  }, 1000);
};

// Ejecutar tests
console.log('Ejecuta manualmente:');
console.log('testPeru()');
console.log('testPeruEcommerce()');
console.log('testChileGastronomia()');
console.log('testSearch()');

window.testPeru = testPeru;
window.testPeruEcommerce = testPeruEcommerce;
window.testChileGastronomia = testChileGastronomia;
window.testSearch = testSearch;
