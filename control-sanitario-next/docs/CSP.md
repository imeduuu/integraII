# Content Security Policy (CSP) — control-sanitario-next

Resumen
- Se añadió un header `Content-Security-Policy` global en `next.config.js` para mitigar XSS y reducir riesgo de carga de recursos no autorizados.
- Las directivas están en `next.config.js` y deben ajustarse a los orígenes reales utilizados (APIs, CDNs, fonts, analytics, mapas, etc.).

Pruebas rápidas (desarrollo)
- Levantar dev server:
  - PowerShell: `npm run dev`
- Ver header via curl (PowerShell incluye curl):
  - `curl -I http://localhost:3000/`
- Ver en navegador:
  - Abrir DevTools → pestaña Network → seleccionar la petición de la página → pestaña Headers → Response Headers → Content-Security-Policy
  - También revisar consola por errores de violación de CSP (CSP violations).

Ajustes recomendados
- Reemplazar `https://api.example.com`, `https://images.unsplash.com`, `https://fonts.googleapis.com`, etc. por los dominios reales que use la app.
- Evitar `'unsafe-inline'` y `'unsafe-eval'` en `script-src` y `style-src` en producción si es posible; migrar a nonces o hashes para estilos/scripts inline.
- Si usas analytics, mapas o widgets (Google Maps, Leaflet CDN, Sentry, etc.), añadir sus dominios a las directivas correspondientes.

Propósito
- CSP ayuda a prevenir ejecución de scripts no autorizados (XSS) y controla de dónde se pueden cargar recursos (scripts, estilos, imágenes, conexiones).

Notas
- Cambios en CSP pueden romper funcionalidades si faltan dominios autorizados; revisar consola y Network para ajustar.