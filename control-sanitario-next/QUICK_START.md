# ⚡ Quick Start - Sistema de Historial Médico

## 🎯 En 5 Minutos

### Paso 1: Iniciar el Proyecto
```bash
cd control-sanitario-next
npm run dev
```
✅ Espera: `ready - started server on 0.0.0.0:3001`

### Paso 2: Abrir en Navegador
```
http://localhost:3001/medicalHistory/new
```

### Paso 3: Prueba Rápida
1. ✅ Ves lista de animales
2. ✅ Escribes en búsqueda
3. ✅ Haces clic en "Agregar Historial"
4. ✅ Ves detalles del animal
5. ✅ Completas formulario
6. ✅ Creas historial

---

## 📍 Ubicación de Archivos

```
Página de selección:    /src/pages/medicalHistory/new.tsx
Página de creación:     /src/pages/medicalHistory/[animalId]/new.tsx
API de animales:        /src/pages/api/animals/
Hook personalizado:     /src/hooks/useMedicalHistory.ts
```

---

## 🔍 Lo Nuevo en Esta Sesión

### ✨ 4 Mejoras Principales

1. **Búsqueda Avanzada**
   - Busca por nombre o ID del animal
   - En tiempo real

2. **Filtrado por Zona**
   - Selector dropdown con zonas disponibles
   - Combina con búsqueda

3. **Información Visual del Animal**
   - Card azul mostrando datos del animal
   - En la página de creación de historial

4. **Nuevo Endpoint API**
   - `/api/animals/[id]` - Obtiene un animal específico
   - Incluye: nombre, estado, zona, especie, estado de salud

---

## 🧪 Tests Rápidos

### Test 1: ¿Se cargan animales?
```javascript
// En DevTools Console (F12):
fetch('/api/animals')
  .then(r => r.json())
  .then(d => console.log(d))
```

### Test 2: ¿Funciona búsqueda?
```
1. Ir a /medicalHistory/new
2. Escribir en campo de búsqueda
3. Debe filtrar en tiempo real
```

### Test 3: ¿Se crea historial?
```
1. Seleccionar animal
2. Completar formulario (solo fecha y tipo eventos)
3. Click "Crear Historial"
4. Debe navegar a lista de historiales
```

---

## 📝 Campos del Formulario

**Requeridos** ⭐
- Fecha evento
- Tipo evento

**Opcionales** (pueden dejarse en blanco)
- Diagnóstico
- Detalles
- Nombre veterinario

---

## 🎨 Interfaz de Usuario

### Página de Selección (`/medicalHistory/new`)
```
┌─────────────────────────────────────┐
│  Selecciona un Animal      [Volver] │
├─────────────────────────────────────┤
│ Buscar por nombre o ID              │
│ [_____________________________]      │
│                                     │
│ Filtrar por zona                    │
│ [Todas las zonas ▼]                 │
├─────────────────────────────────────┤
│  Mostrando 5 de 10 animales         │
│                                     │
│ ┌──────┐  ┌──────┐  ┌──────┐       │
│ │ 🐾   │  │ 🐾   │  │ 🐾   │       │
│ │ Max  │  │ Luna │  │ Simba│       │
│ │ID: 1 │  │ID: 2 │  │ID: 3 │       │
│ │ ... │  │ ... │  │ ... │       │
│ └──────┘  └──────┘  └──────┘       │
└─────────────────────────────────────┘
```

### Página de Creación (`/medicalHistory/[id]/new`)
```
┌─────────────────────────────────────┐
│ Nuevo historial   [Cambiar] [Volver]│
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ 🐾 Max                          │ │
│ │ 🆔 ID: 1  📊 Activo  📍 Zona A │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ Fecha evento                        │
│ [🗓️ 2024-01-15 14:30         ]     │
│                                     │
│ Tipo evento                         │
│ [vacuna             ]              │
│                                     │
│ [Crear Historial]                   │
└─────────────────────────────────────┘
```

---

## 🚨 Si Algo No Funciona

| Problema | Solución |
|----------|----------|
| No se ven animales | Verificar BD está poblada: `SELECT COUNT(*) FROM animal;` |
| Error en búsqueda | Abrir DevTools (F12) > Console > Ver error |
| No se crea historial | Rellenar campos requeridos y verificar API responde |
| Animal no muestra en formulario | Verificar `/api/animals/[id]` responde correctamente |

---

## 📚 Documentación Completa

- **Técnica**: `MEDICAL_HISTORY_IMPLEMENTATION.md`
- **Cambios**: `SESSION_IMPROVEMENTS.md`
- **Testing**: `TESTING_GUIDE.md`
- **Índice**: `MEDICAL_HISTORY_INDEX.md`

---

## 💡 Tips

1. **Búsqueda rápida**: Digita el número del animal (ej: "1")
2. **Filtrar por zona**: Útil si hay muchos animales
3. **Combinar filtros**: Busca + zona funcionan juntos
4. **Cambiar animal**: Usa botón "Cambiar animal", no vuelvas atrás
5. **Verificar API**: Usa DevTools > Network para debuguear

---

## ✅ Checklist Rápido

```
- [ ] npm run dev funcionando
- [ ] Página carga en localhost:3001
- [ ] Se ven animales
- [ ] Búsqueda filtra
- [ ] Se puede seleccionar animal
- [ ] Formulario muestra animal
- [ ] Se puede crear historial
- [ ] No hay errores en console
```

---

## 🎓 Flujo Simplificado

```
START
  ↓
/medicalHistory/new
  ↓
  Buscar/Filtrar ← Usuario
  ↓
Hace clic "Agregar"
  ↓
/medicalHistory/[id]/new
  ↓
Completa formulario ← Usuario
  ↓
Crea historial
  ↓
/medicalHistory/[id] (lista)
  ↓
END
```

---

## 📞 Soporte Rápido

**¿Dónde está [X]?**
- Búsqueda: `/src/pages/medicalHistory/new.tsx` línea 28
- API de animal único: `/src/pages/api/animals/[id].ts`
- Custom hook: `/src/hooks/useMedicalHistory.ts`

**¿Cómo [X]?**
- Agregar campo: Edita `/src/pages/medicalHistory/[animalId]/new.tsx`
- Cambiar estilos: Edita CSS module o inline styles
- Agregar validación: En el formulario o en el API endpoint

---

## 🚀 Desplegado y Listo

```
✅ TypeScript sin errores
✅ APIs funcionando
✅ Búsqueda optimizada
✅ UI responsiva
✅ Documentación completa
```

**Estado**: ✅ PRODUCCIÓN
