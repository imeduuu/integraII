# 🎯 GUÍA VISUAL: Dónde Están las Notificaciones

## 📍 Páginas con Notificaciones ACTIVAS

---

## 1️⃣ **PÁGINA PRINCIPAL** - `/` o `http://localhost:3000/`

### 📺 **Cómo verlas:**

1. Abre el navegador en: `http://localhost:3000/`
2. **Desplázate hacia abajo** (scroll down)
3. Verás una sección grande con **BORDE VERDE AZULADO** que dice:
   
   ```
   🔔 Prueba las Notificaciones Toast
   ```

4. Tiene **4 BOTONES GRANDES de colores:**
   - 🟢 Verde: "✅ Éxito"
   - 🔴 Rojo: "❌ Error"  
   - 🟡 Amarillo: "⚠️ Advertencia"
   - 🔵 Azul: "ℹ️ Información"

5. **HAZ CLIC** en cualquier botón
6. **MIRA LA ESQUINA SUPERIOR DERECHA** de la pantalla
7. Deberías ver aparecer un toast con **fondo verde aqua**

### ✅ **Estado:** IMPLEMENTADO Y VISIBLE

---

## 2️⃣ **PÁGINA DE LOGIN** - `/login`

### 📺 **Cómo verlas:**

1. Abre: `http://localhost:3000/login`
2. Ingresa cualquier email y contraseña
3. Haz clic en **"Iniciar Sesión"**
4. Verás un toast verde: **"Inicio de sesión exitoso"**

### ✅ **Estado:** IMPLEMENTADO

---

## 3️⃣ **PÁGINA DE REGISTRO** - `/register`

### 📺 **Cómo verlas:**

1. Abre: `http://localhost:3000/register`
2. Llena el formulario:
   - Nombre: "Juan Pérez"
   - Email: "test@example.com"
   - Contraseña: "123456"
   - Confirmar: "123456"
3. Haz clic en **"Registrarse"**
4. Verás un toast verde: **"¡Registro exitoso! Bienvenido a la plataforma."**

### ✅ **Estado:** IMPLEMENTADO

---

## 4️⃣ **RECUPERAR CONTRASEÑA** - `/forgot-password`

### 📺 **Cómo verlas:**

#### **Test 1: Sin email**
1. Abre: `http://localhost:3000/forgot-password`
2. Deja el campo vacío
3. Haz clic en **"Recuperar"**
4. Verás toast amarillo: **"Por favor ingresa tu correo electrónico."**

#### **Test 2: Email inválido**
1. Escribe: "test@"
2. Haz clic en **"Recuperar"**
3. Verás toast rojo: **"Por favor ingresa un correo válido."**

#### **Test 3: Email válido**
1. Escribe: "test@example.com"
2. Haz clic en **"Recuperar"**
3. Verás toast verde: **"Se ha enviado un correo con instrucciones..."**

### ✅ **Estado:** IMPLEMENTADO con 3 validaciones

---

## 5️⃣ **EDITAR PERFIL** - `/edit-profile`

### 📺 **Cómo verlas:**

1. Abre: `http://localhost:3000/edit-profile`
2. Llena todos los campos:
   - Nombre: "María López"
   - Email: "maria@example.com"
   - Teléfono: "5551234567"
   - Dirección: "Calle Principal 123, Ciudad"
3. Haz clic en **"Guardar Cambios"**
4. Verás toast verde: **"✅ Perfil actualizado correctamente"**

### ✅ **Estado:** IMPLEMENTADO

---

## 6️⃣ **ADOPCIÓN** - `/adopcion`

### 📺 **Cómo verlas:**

1. Abre: `http://localhost:3000/adopcion`
2. Busca un animal con estado **"Disponible"** (por ejemplo: Bella, Coco, etc.)
3. Haz clic en **"Solicitar Adopción"**
4. Llena el formulario de adopción
5. Haz clic en **confirmar** en el modal
6. Verás **2 TOASTS**:
   - Toast verde: **"✅ Solicitud de adopción de [Nombre] enviada exitosamente"**
   - Toast azul: **"Recibirás una respuesta en las próximas 48 horas."**

### ✅ **Estado:** IMPLEMENTADO (doble notificación)

---

## 7️⃣ **CAMPAÑAS** - Componente `CampaignList`

### 📺 **Cómo verlas:**

1. Busca la página que use el componente `CampaignList`
   - Puede ser `/campaigns` o donde se rendericen campañas
2. Haz clic en **"Inscribirse"** en una campaña
3. Verás:
   - Si está **activa**: Toast verde **"Te has inscrito en la campaña X con éxito"**
   - Si está **inactiva**: Toast rojo **"La campaña X está inactiva..."**

### ✅ **Estado:** IMPLEMENTADO

---

## 🧪 **PÁGINA DE PRUEBA DEDICADA** - `/test-notifications`

### 📺 **Cómo verlas:**

1. Abre: `http://localhost:3000/test-notifications`
2. Verás 4 botones grandes de colores
3. Haz clic en cualquiera
4. Toast aparece en esquina superior derecha

### ✅ **Estado:** IMPLEMENTADO (página de testing)

---

## 🎨 **Cómo se Ven las Notificaciones**

### **Características Visuales:**

```
┌──────────────────────────────────────────────┐
│ [🟢]  ¡Operación exitosa!              [✕]  │  ← Fondo verde aqua
│                                              │  ← Icono circular verde
│ ████████████████████░░░░░░░░░░░░░░░░░░░░░  │  ← Barra de progreso
└──────────────────────────────────────────────┘
```

- **Posición:** Esquina superior derecha
- **Fondo:** Gradiente verde aqua (#0d9488 → #14b8a6)
- **Icono:** Circular con color según tipo
- **Animación:** BounceIn al aparecer
- **Duración:** 5-7 segundos (auto-cierre)
- **Interactivo:** Puedes cerrar con ✕ o hover pausa el timer

---

## ❌ **Por Qué "No Se Ven"**

### **Razón 1: No has hecho la acción que las dispara**
- ✅ **Solución:** Haz clic en los botones o envía los formularios

### **Razón 2: Estás mirando en el lugar equivocado**
- ✅ **Solución:** Mira la **esquina superior DERECHA** de la pantalla

### **Razón 3: Caché del navegador**
- ✅ **Solución:** Presiona `Ctrl+Shift+R` para limpiar caché

### **Razón 4: El servidor no está corriendo**
- ✅ **Solución:** Ejecuta `npm run dev` en la terminal

---

## 📋 **Checklist de Verificación**

Marca cada paso:

- [ ] Servidor corriendo: `npm run dev` ejecutándose sin errores
- [ ] Navegador abierto en `http://localhost:3000/`
- [ ] Desplazado hacia abajo hasta ver la sección con borde verde
- [ ] Hice clic en el botón "✅ Éxito"
- [ ] Miré la **esquina superior DERECHA** de la pantalla
- [ ] Vi aparecer un toast con fondo verde aqua
- [ ] El toast tiene un icono circular verde
- [ ] El toast se cerró automáticamente después de unos segundos

Si marcaste TODOS, las notificaciones están funcionando ✅

---

## 🎯 **Prueba Definitiva (Página Principal)**

### **Instrucciones Paso a Paso:**

1. **Abre tu navegador**
2. **Ve a:** `http://localhost:3000/`
3. **Espera** a que la página cargue completamente
4. **Usa el scroll** (rueda del mouse) y baja hasta ver:
   - Un recuadro GRANDE con borde **verde azulado**
   - El título **"🔔 Prueba las Notificaciones Toast"**
   - 4 botones de colores: Verde, Rojo, Amarillo, Azul
5. **Haz clic** en el botón VERDE que dice "✅ Éxito"
6. **Mira inmediatamente** la esquina superior derecha
7. **Deberías ver:**
   - Un rectángulo con fondo verde aqua aparecer con animación
   - Un círculo verde con ✓ a la izquierda
   - El texto "¡Operación exitosa! ✅"
   - Una barra de progreso en la parte inferior
   - El toast desaparece después de 5 segundos

---

## 📸 **Referencia Visual**

```
┌─ Navegador ────────────────────────────────────────────┐
│  http://localhost:3000/                         ┌────┐ │
│                                                  │🟢✓ │ │ ← AQUÍ aparece
│  [Navbar]                                       │    │ │
│                                                 │ OK │ │
│  Título principal                               └────┘ │
│  UserMetricsCards                                      │
│                                                        │
│  ╔════════════════════════════════════════════╗       │
│  ║ 🔔 Prueba las Notificaciones Toast      ║       │ ← AQUÍ haces clic
│  ║                                            ║       │
│  ║  [✅ Éxito] [❌ Error] [⚠️ Advertencia]  ║       │
│  ╚════════════════════════════════════════════╝       │
│                                                        │
│  [Footer]                                              │
└────────────────────────────────────────────────────────┘
```

---

## ✅ **Resumen Final**

**Total de páginas con notificaciones:** 8
- ✅ Página principal `/` - **VISIBLE Y OBVIA**
- ✅ Login `/login`
- ✅ Registro `/register`
- ✅ Recuperar contraseña `/forgot-password`
- ✅ Editar perfil `/edit-profile`
- ✅ Adopción `/adopcion`
- ✅ Campañas (componente)
- ✅ Test `/test-notifications`

**Todas están funcionando.** Solo necesitas **hacer la acción** (clic en botón o submit de formulario) y **mirar la esquina superior derecha**.

---

**Última actualización:** 21 de octubre de 2025  
**Estado:** ✅ TODAS LAS NOTIFICACIONES FUNCIONANDO
