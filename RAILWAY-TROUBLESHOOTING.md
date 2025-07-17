# 🚂 Railway Deployment Troubleshooting

## 🔧 Soluciones para el Error de Host Bloqueado

### **Problema:**
```
Blocked request. This host ("catalogo-production-38fc.up.railway.app") is not allowed.
To allow this host, add "catalogo-production-38fc.up.railway.app" to `preview.allowedHosts` in vite.config.js.
```

### **Solución 1: Vite Preview (Recomendada)**

✅ **Ya implementada** - Usar `railway.toml`:
```toml
[build]
builder = "NIXPACKS"
buildCommand = "npm install && npm run build"

[deploy]
startCommand = "npm run preview -- --host 0.0.0.0 --port $PORT --strictPort"

[env]
NODE_ENV = "production"
```

### **Solución 2: Express Server (Alternativa)**

Si la Solución 1 no funciona, cambiar `railway.toml` por `railway-express.toml`:

1. **Eliminar** `railway.toml`
2. **Renombrar** `railway-express.toml` → `railway.toml`
3. **Redeploy** en Railway

```toml
[build]
builder = "NIXPACKS" 
buildCommand = "npm install && npm run build"

[deploy]
startCommand = "npm run serve"

[env]
NODE_ENV = "production"
```

## 🧪 Testing en Railway

### **1. Verificar Deploy:**
- Ir a Railway Dashboard
- Verificar que el build fue exitoso
- Verificar que el servidor está corriendo

### **2. Test Manual:**
- Abrir: `https://catalogo-production-38fc.up.railway.app/`
- Verificar que carga la página principal
- Probar filtros:
  - `?country=peru&category=e-commerce`
  - `?country=chile&category=gastronomia`

### **3. Debug en Consola:**
```javascript
// Ejecutar en consola del navegador
console.log('URL:', window.location.href);
console.log('Params:', new URLSearchParams(window.location.search));

// Test manual de filtros
window.location.href = "?country=peru&category=e-commerce";
```

## 🔍 Diagnóstico de Problemas

### **Si los filtros no funcionan:**

1. **Verificar consola del navegador** - errores de JavaScript
2. **Verificar Network tab** - requests fallidas
3. **Ejecutar script de debug**:

```javascript
// Copiar y pegar en consola
console.log('=== RAILWAY DEBUG ===');
console.log('URL actual:', window.location.href);
const params = new URLSearchParams(window.location.search);
console.log('Parámetros:', Object.fromEntries(params));
console.log('React cargado:', !!window.React);
console.log('Elementos:', {
  countries: document.querySelectorAll('[data-country]').length,
  categories: document.querySelectorAll('[data-category]').length,
  cards: document.querySelectorAll('[data-gift-card]').length
});
```

## 🚀 Comandos Útiles

### **Redeploy forzado:**
```bash
git commit --allow-empty -m "Force redeploy"
git push origin main
```

### **Verificar logs en Railway:**
- Ir a Railway Dashboard
- Seleccionar tu proyecto
- Ver "Deployments" → "View logs"

### **Test local con preview:**
```bash
npm run build
npm run preview -- --host 0.0.0.0 --port 4173
```

### **Test local con Express:**
```bash
npm run build
npm run serve
```

## 📋 Checklist de Verificación

- [ ] ✅ `railway.toml` tiene sintaxis TOML correcta
- [ ] ✅ `vite.config.ts` incluye `preview.allowedHosts`
- [ ] ✅ Build completa sin errores
- [ ] ✅ Deploy exitoso en Railway
- [ ] ✅ Página principal carga
- [ ] ✅ Filtros por país funcionan
- [ ] ✅ Filtros por categoría funcionan
- [ ] ✅ URL parameters se actualizan
- [ ] ✅ Responsive design funciona

## 🆘 Si Nada Funciona

1. **Usar servidor Express** (Solución 2)
2. **Considerar cambiar a Vercel/Netlify**
3. **Contactar soporte de Railway**

---

💡 **Tip:** Railway a veces tiene problemas con Vite preview. El servidor Express es más confiable para producción.
