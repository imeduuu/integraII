# 🧪 Guía de Prueba - Sistema de Historial Médico

## 🚀 Inicio Rápido

### Paso 1: Iniciar Servidor
```bash
cd control-sanitario-next
npm run dev
```

Espera a ver: `ready - started server on 0.0.0.0:3001`

### Paso 2: Abrir en Navegador
```
http://localhost:3001/medicalHistory/new
```

## ✅ Test 1: Ver Lista de Animales

**Objetivo**: Verificar que los animales se cargan correctamente

**Pasos**:
1. Ir a `http://localhost:3001/medicalHistory/new`
2. Esperar a que carguen los animales
3. Debe aparecer un mensaje: "Mostrando X de Y animales"
4. Debe haber tarjetas en grid

**Esperado**:
- ✅ Tarjetas con nombre, ID, estado, zona
- ✅ Cada tarjeta tiene botón "Agregar Historial"
- ✅ Sin errores en consola
- ✅ Sin mensajes de error en pantalla

**Debugging**:
- Si no aparecen animales: Verificar que la BD está poblada
- Si aparece error: Abrir DevTools > Network y ver respuesta de `/api/animals`

---

## ✅ Test 2: Búsqueda por Nombre

**Objetivo**: Verificar que la búsqueda funciona en tiempo real

**Pasos**:
1. En la página de selección
2. Escribir en el campo "Buscar por nombre o ID"
3. Escribir parte del nombre de un animal (ej: "Max")
4. Ver que se filtran los resultados

**Esperado**:
- ✅ Se actualizan resultados mientras escribo
- ✅ Mostrando solo animales que coinciden
- ✅ El contador dice "1 de Y" o similar
- ✅ Cuando borro el texto, vuelven todos

**Debugging**:
```javascript
// En la consola del navegador:
// Verificar que el valor se actualiza
const input = document.querySelector('input[type="text"]');
console.log(input.value); // Debe mostrar lo que escribiste
```

---

## ✅ Test 3: Filtrado por Zona

**Objetivo**: Verificar que el filtrado por zona funciona

**Pasos**:
1. En la página de selección
2. Abrir dropdown "Filtrar por zona"
3. Seleccionar una zona (ej: "Zona A")
4. Ver que se filtran solo los animales de esa zona

**Esperado**:
- ✅ Solo aparecen animales de la zona seleccionada
- ✅ El contador actualiza correctamente
- ✅ Funciona en combinación con búsqueda

**Prueba Combinada**:
1. Filtrar por zona
2. Buscar por nombre
3. Ambos filtros deben aplicarse juntos

---

## ✅ Test 4: Seleccionar Animal

**Objetivo**: Verificar que se puede seleccionar un animal

**Pasos**:
1. Desde la página de selección
2. Hacer clic en "Agregar Historial" de cualquier animal
3. Esperar carga

**Esperado**:
- ✅ Se navega a `/medicalHistory/[id]/new` (donde [id] es el número)
- ✅ La página carga rápido
- ✅ Sin errores en consola

---

## ✅ Test 5: Ver Detalles del Animal Seleccionado

**Objetivo**: Verificar que se muestra info del animal en el formulario

**Pasos**:
1. Desde la página de creación (`/medicalHistory/[id]/new`)
2. Esperar a que cargue
3. Ver la tarjeta azul arriba del formulario

**Esperado**:
- ✅ Tarjeta azul con borde azul
- ✅ Muestra: 🐾 Nombre del animal
- ✅ Muestra ID, estado general, zona
- ✅ Emoji 🐾 en el nombre

**Debugging**:
- Si no aparece info: Verificar que `/api/animals/[id]` responde (DevTools > Network)
- Si falta algún campo: Puede ser null en la BD

---

## ✅ Test 6: Crear Historial Médico

**Objetivo**: Verificar que se puede crear un historial

**Pasos**:
1. En la página de creación (`/medicalHistory/[id]/new`)
2. Llenar campos requeridos:
   - **Fecha evento**: Click en campo, seleccionar fecha/hora
   - **Tipo evento**: Escribir "vacuna" o "control"
3. Campos opcionales (pueden dejar en blanco):
   - Diagnóstico
   - Detalles
   - Nombre veterinario
4. Click en botón "Crear Historial"
5. Esperar

**Esperado**:
- ✅ Botón cambia a "Guardando..."
- ✅ Se navega a `/medicalHistory/[id]` después
- ✅ Se ve el historial recién creado en la lista

**Validación**:
- Si deja campos requeridos vacíos: Debe mostrar alerta
- Si hay error: Ver DevTools > Network para ver respuesta de API

---

## ✅ Test 7: Cambiar Animal

**Objetivo**: Verificar que se puede volver atrás para seleccionar otro animal

**Pasos**:
1. En la página de creación
2. Click en botón "Cambiar animal"
3. Debe volver a la página de selección

**Esperado**:
- ✅ Se navega a `/medicalHistory/new`
- ✅ La lista de animales está ahí
- ✅ Puede seleccionar otro animal
- ✅ Los datos del formulario anterior se limpian

---

## ✅ Test 8: Botones de Navegación

**Objetivo**: Verificar que todos los botones funcionan

**En Página de Selección**:
- ✅ "Volver" - debe ir a página anterior
- ✅ "Agregar Historial" - debe ir a creación

**En Página de Creación**:
- ✅ "Cambiar animal" - debe ir a selección
- ✅ "Volver" - debe ir a página anterior
- ✅ "Crear Historial" - debe crear y navegar

---

## 🔍 Verificación de Errores

### Abrir DevTools
1. Presionar `F12` o `Ctrl+Shift+I` (Windows) o `Cmd+Option+I` (Mac)
2. Ir a pestaña "Console"

### Qué NO debe haber
- ❌ Errores rojos (Errors)
- ❌ Advertencias de TypeScript
- ❌ `PrismaClient is unable to run in this browser environment`
- ❌ `Cannot read property 'map' of undefined`

### Qué SÍ puede haber
- ⚠️ Advertencias (Warnings) - generalmente están bien
- ℹ️ Mensajes de info
- 📡 Log de requests

---

## 📡 Pruebas de API

### Verificar `/api/animals`

En la consola del navegador:
```javascript
fetch('/api/animals')
  .then(r => r.json())
  .then(data => console.log(data))
```

Debe mostrar array de animales con estructura:
```json
[
  {
    "id_animal": 1,
    "nombre_animal": "Max",
    "estado_general": "Activo",
    "zona": "Zona A",
    "estado_salud": { "estado_salud": "Saludable" }
  },
  ...
]
```

### Verificar `/api/animals/[id]`

Reemplazar `[id]` con un número real (ej: 1):
```javascript
fetch('/api/animals/1')
  .then(r => r.json())
  .then(data => console.log(data))
```

Debe retornar:
```json
{
  "id_animal": 1,
  "nombre_animal": "Max",
  "estado_general": "Activo",
  "zona": "Zona A",
  "estado_salud": { "estado_salud": "Saludable" },
  "especie": { "especie": "Perro" }
}
```

---

## 🎯 Checklist Final

- [ ] Los animales se cargan en `/medicalHistory/new`
- [ ] Búsqueda por nombre funciona
- [ ] Búsqueda por ID funciona
- [ ] Filtro por zona funciona
- [ ] Se pueden combinar búsqueda + filtro
- [ ] Clic en "Agregar Historial" navega correctamente
- [ ] La página de creación muestra info del animal
- [ ] Se puede completar el formulario
- [ ] Se puede crear un historial
- [ ] Se navega a lista después de crear
- [ ] Se ve el historial recién creado
- [ ] No hay errores en consola
- [ ] Las URLs son correctas

---

## 🆘 Si Algo No Funciona

### Los animales no aparecen
```bash
# 1. Verificar BD
psql -h 186.64.121.58 -U postgres -d control_sanitario -c "SELECT COUNT(*) FROM animal;"

# 2. Ver respuesta API
curl http://localhost:3001/api/animals

# 3. Revisar logs del servidor
# (La ventana de npm run dev debe mostrar errores)
```

### El animal seleccionado no muestra en formulario
```bash
# 1. Probar endpoint
curl http://localhost:3001/api/animals/1

# 2. Ver en DevTools > Network
# Abrir request a /api/animals/1
# Ver respuesta en pestaña "Response"
```

### No se crea el historial
```bash
# 1. Verificar campos requeridos están llenos
# 2. Ver respuesta de API en Network
# 3. Revisar consola del servidor (npm run dev)
# 4. Verificar permisos en BD
```

---

## 📞 Reportar Problema

Si encuentras un bug, proporciona:
1. URL donde ocurrió el problema
2. Qué hiciste exactamente
3. Qué esperabas que pasara
4. Qué pasó en cambio
5. Captura de pantalla o video si es posible
6. Contenido de la consola (F12 > Console)

---

## 📚 Recursos

- Documentación Técnica: `/MEDICAL_HISTORY_IMPLEMENTATION.md`
- Resumen de Cambios: `/SESSION_IMPROVEMENTS.md`
- Código del Hook: `/src/hooks/useMedicalHistory.ts`
- Archivos API: `/src/pages/api/animals/`

---

**¡Listo para probar!** 🚀
