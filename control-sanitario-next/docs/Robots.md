---

## 🌐 Archivo robots.txt

**Ubicación:** `public/robots.txt`

**Función:**  
Este archivo indica a los motores de búsqueda (Google, Bing, etc.) qué partes del sitio pueden o no pueden ser rastreadas.  
En este proyecto se configuró para **permitir el rastreo de todas las páginas públicas** y **se incluye la ubicación del sitemap**.

**Contenido actual:**
```txt
# Permitir que todos los motores de búsqueda rastreen el sitio
User-agent: *
Allow: /

# Sitemap temporal (cambiar por la URL final cuando el sitio esté hosteado)
Sitemap: https://www.ejemplo-prueba.com/sitemap.xml
    