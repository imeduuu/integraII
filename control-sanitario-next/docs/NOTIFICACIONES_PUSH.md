# 🔔 Sistema de Notificaciones Push - Documentación Completa

## 📋 Índice

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Componentes Implementados](#componentes-implementados)
4. [Guía de Uso](#guía-de-uso)
5. [API Reference](#api-reference)
6. [Configuración PWA](#configuración-pwa)
7. [Compatibilidad](#compatibilidad)
8. [Ejemplos de Uso](#ejemplos-de-uso)
9. [Troubleshooting](#troubleshooting)
10. [Mejores Prácticas](#mejores-prácticas)

---

## 🎯 Resumen Ejecutivo

Se ha implementado un sistema completo de notificaciones push que combina:

- **Toast Notifications**: Notificaciones visuales en pantalla (siempre disponibles)
- **Web Push Notifications**: Notificaciones nativas del sistema operativo
- **PWA Support**: Soporte para Progressive Web App
- **Service Worker**: Manejo de notificaciones en segundo plano
- **Fallback Strategy**: Sistema de respaldo cuando no hay permisos

### Características Principales

✅ Notificaciones en tiempo real  
✅ Soporte para escritorio y móvil  
✅ Funciona sin conexión (offline)  
✅ Notificaciones programadas  
✅ Gestión de permisos integrada  
✅ Múltiples tipos de notificaciones  
✅ Acciones interactivas  
✅ Vibración personalizada  

---

## 🏗️ Arquitectura del Sistema

### Diagrama de Flujo

```
┌─────────────────┐
│   Usuario       │
└────────┬────────┘
         │
         ├──────> Solicita permiso
         │
    ┌────▼─────────────────┐
    │  usePushNotifications │  (Hook Principal)
    │  - Gestión de permisos│
    │  - Estado del sistema │
    └────┬─────────────────┘
         │
         ├──────> Muestra Toast (ToastContainer)
         │
         ├──────> Muestra Push (Web Notifications API)
         │
         └──────> Registra Service Worker
                  │
                  ├──────> Maneja notificaciones en background
                  │
                  └──────> Cache y offline support
```

### Stack Tecnológico

- **Frontend**: React + Next.js + TypeScript
- **Notifications**: Web Notifications API + Service Workers
- **Toast System**: react-toastify (ya integrado)
- **PWA**: Manifest.json + Service Worker
- **Estado**: React Hooks + Context API

---

## 📦 Componentes Implementados

### 1. Manifest PWA (`public/manifest.json`)

**Propósito**: Configuración de la aplicación como PWA instalable.

**Características**:
- Define iconos y colores de la app
- Habilita modo standalone
- Configura permisos necesarios
- Soporte para instalación en home screen

### 2. Service Worker (`public/sw.js`)

**Propósito**: Manejo de notificaciones en segundo plano y cacheo.

**Funcionalidades**:
- Cache de recursos estáticos
- Estrategia Network First
- Manejo de eventos push
- Gestión de clics en notificaciones
- Soporte offline

### 3. Hook `usePushNotifications`

**Ubicación**: `src/hooks/usePushNotifications.ts`

**Propósito**: Hook principal para gestionar notificaciones.

**Retorna**:
```typescript
{
  permission: NotificationPermission,      // Estado de permisos
  isSupported: boolean,                    // Soporte del navegador
  isServiceWorkerReady: boolean,           // Estado del SW
  requestPermission: () => Promise<...>,   // Solicitar permisos
  showNotification: (options) => ...,      // Mostrar push
  notify: (title, body, type, push) => ...,// Notificación combinada
  success: (title, body, push) => ...,     // Método de conveniencia
  error: (title, body, push) => ...,       // Método de conveniencia
  warning: (title, body, push) => ...,     // Método de conveniencia
  info: (title, body, push) => ...         // Método de conveniencia
}
```

### 4. Componente `PushNotificationManager`

**Ubicación**: `src/components/PushNotificationManager.tsx`

**Propósito**: UI para gestionar configuración de notificaciones.

**Props**:
```typescript
interface PushNotificationManagerProps {
  showStatus?: boolean;         // Mostrar estado del sistema
  autoRequest?: boolean;        // Solicitar permisos automáticamente
  onPermissionChange?: (permission) => void;  // Callback
}
```

### 5. Servicio `notificationService`

**Ubicación**: `src/services/notificationService.ts`

**Propósito**: Servicio singleton centralizado para notificaciones.

**Métodos Principales**:
- `initialize()`: Inicializar servicio y SW
- `send(payload)`: Enviar notificación
- `success/error/warning/info()`: Métodos de conveniencia
- `notifyNewSighting()`: Notificación de avistamiento
- `notifyCaseUpdate()`: Actualización de caso
- `notifyNewMessage()`: Mensaje nuevo
- `notifyAdoptionRequest()`: Solicitud de adopción
- `notifySystemAlert()`: Alerta del sistema
- `scheduleNotification()`: Programar notificación
- `clearAllNotifications()`: Limpiar todas

### 6. Página de Demo

**Ubicación**: `src/pages/demo-notificaciones.tsx`

**Acceso**: `http://localhost:3000/demo-notificaciones`

**Características**:
- Panel de configuración
- Estado del sistema en tiempo real
- Pruebas de todos los tipos
- Notificaciones personalizadas
- Notificaciones programadas
- Simulación de eventos del dominio

---

## 🚀 Guía de Uso

### Paso 1: Verificar Instalación

Todos los archivos necesarios ya están creados. Verifica que existan:

```bash
control-sanitario-next/
├── public/
│   ├── manifest.json          ✅
│   └── sw.js                  ✅
├── src/
│   ├── components/
│   │   └── PushNotificationManager.tsx  ✅
│   ├── hooks/
│   │   └── usePushNotifications.ts      ✅
│   ├── services/
│   │   └── notificationService.ts       ✅
│   └── pages/
│       ├── _app.tsx           ✅ (actualizado)
│       ├── _document.tsx      ✅ (actualizado)
│       └── demo-notificaciones.tsx      ✅
```

### Paso 2: Crear Iconos PWA

Crea los siguientes iconos en `public/`:

- `icon-192x192.png` (192x192px)
- `icon-512x512.png` (512x512px)
- `badge-72x72.png` (72x72px, opcional)

Puedes usar cualquier imagen relacionada con tu aplicación.

### Paso 3: Probar el Sistema

1. Inicia el servidor de desarrollo:
```bash
npm run dev
```

2. Abre la página de demo:
```
http://localhost:3000/demo-notificaciones
```

3. Sigue las instrucciones en pantalla para:
   - Activar notificaciones
   - Probar diferentes tipos
   - Ver el estado del sistema

### Paso 4: Integrar en tu Aplicación

#### Opción A: Usar el Hook Directamente

```typescript
import { usePushNotifications } from '../hooks/usePushNotifications';

function MiComponente() {
  const { success, error, showNotification } = usePushNotifications();

  const handleAction = async () => {
    // Mostrar toast + push
    success('¡Éxito!', 'Operación completada', true);
    
    // Solo push nativa
    await showNotification({
      title: 'Título',
      body: 'Mensaje',
      tag: 'mi-notificacion'
    });
  };

  return <button onClick={handleAction}>Notificar</button>;
}
```

#### Opción B: Usar el Servicio

```typescript
import { notificationService } from '../services/notificationService';

// En cualquier parte de tu código
await notificationService.notifyNewSighting('Perro', 'Parque Central');
await notificationService.notifyCaseUpdate('123', 'Resuelto');
await notificationService.success('Título', 'Mensaje', true);
```

#### Opción C: Agregar Gestor de Permisos

```typescript
import { PushNotificationManager } from '../components/PushNotificationManager';

function ConfigPage() {
  return (
    <div>
      <h1>Configuración</h1>
      <PushNotificationManager 
        showStatus={true}
        autoRequest={false}
        onPermissionChange={(permission) => {
          console.log('Permiso:', permission);
        }}
      />
    </div>
  );
}
```

---

## 📖 API Reference

### `usePushNotifications()`

Hook principal para gestión de notificaciones.

#### Retorna

```typescript
{
  // Estado
  permission: 'default' | 'granted' | 'denied',
  isSupported: boolean,
  isServiceWorkerReady: boolean,
  
  // Métodos
  requestPermission: () => Promise<NotificationPermission>,
  showNotification: (options: NotificationOptions) => Promise<boolean>,
  notify: (title, body, type, showPush) => void,
  success: (title, body, showPush) => void,
  error: (title, body, showPush) => void,
  warning: (title, body, showPush) => void,
  info: (title, body, showPush) => void
}
```

#### NotificationOptions

```typescript
interface NotificationOptions {
  title: string;                    // Título de la notificación
  body: string;                     // Cuerpo del mensaje
  icon?: string;                    // URL del icono
  badge?: string;                   // URL del badge
  tag?: string;                     // Identificador único
  requireInteraction?: boolean;     // No cerrar automáticamente
  silent?: boolean;                 // Sin sonido
  vibrate?: number[];              // Patrón de vibración
  data?: any;                       // Datos adicionales
  actions?: Array<{                // Acciones interactivas
    action: string;
    title: string;
    icon?: string;
  }>;
}
```

### `notificationService`

Servicio singleton para notificaciones.

#### Métodos Principales

```typescript
// Inicialización
await notificationService.initialize();

// Envío básico
await notificationService.send({
  title: 'Título',
  body: 'Mensaje',
  showPush: true,
  type: 'success'
});

// Métodos de conveniencia
await notificationService.success('Título', 'Mensaje', true, '/url');
await notificationService.error('Título', 'Mensaje', true);
await notificationService.warning('Título', 'Mensaje', true);
await notificationService.info('Título', 'Mensaje', true);

// Notificaciones del dominio
await notificationService.notifyNewSighting(animal, ubicacion);
await notificationService.notifyCaseUpdate(id, estado);
await notificationService.notifyNewMessage(remitente, preview);
await notificationService.notifyAdoptionRequest(animal, usuario);
await notificationService.notifySystemAlert(mensaje, critico);

// Programación
await notificationService.scheduleNotification(payload, delayMs);

// Gestión
await notificationService.clearNotificationsByTag('tag');
await notificationService.clearAllNotifications();

// Estado
const isSupported = notificationService.isSupported();
const permission = notificationService.getPermission();
```

---

## 🔧 Configuración PWA

### Manifest.json

El archivo `public/manifest.json` configura tu app como PWA:

```json
{
  "name": "Control Sanitario Animal",
  "short_name": "Control Sanitario",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#10b981",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ],
  "permissions": ["notifications", "geolocation"]
}
```

### Instalación en Dispositivos

#### Desktop (Chrome/Edge)

1. Visita tu aplicación
2. Busca el ícono de instalación en la barra de direcciones
3. Haz clic en "Instalar"

#### iOS (Safari)

1. Abre Safari
2. Toca el botón "Compartir"
3. Selecciona "Agregar a la pantalla de inicio"

#### Android (Chrome)

1. Abre Chrome
2. Toca el menú (⋮)
3. Selecciona "Agregar a la pantalla de inicio"

---

## 🌐 Compatibilidad

### Navegadores Soportados

| Navegador | Versión | Web Notifications | Service Workers | PWA |
|-----------|---------|-------------------|-----------------|-----|
| Chrome | 50+ | ✅ | ✅ | ✅ |
| Firefox | 44+ | ✅ | ✅ | ✅ |
| Safari | 16+ | ✅ | ✅ | ⚠️ |
| Edge | 79+ | ✅ | ✅ | ✅ |
| Opera | 42+ | ✅ | ✅ | ✅ |

**Notas**:
- Safari en iOS: Soporte limitado de PWA, pero notificaciones básicas funcionan
- Internet Explorer: No soportado
- Navegadores móviles: Funcionalidad completa en Chrome/Firefox Android

### Sistemas Operativos

- **Windows 10/11**: Soporte completo, notificaciones en Action Center
- **macOS**: Soporte completo, notificaciones en Notification Center
- **Linux**: Soporte completo según el entorno de escritorio
- **Android 5+**: Soporte completo
- **iOS 16.4+**: Soporte básico, mejorando en versiones nuevas

---

## 💡 Ejemplos de Uso

### Ejemplo 1: Notificación Simple

```typescript
import { notificationService } from '../services/notificationService';

// En cualquier función async
await notificationService.success(
  'Guardado',
  'Los cambios se guardaron correctamente',
  true  // showPush
);
```

### Ejemplo 2: Notificación con URL

```typescript
await notificationService.send({
  title: 'Nuevo comentario',
  body: 'Juan comentó en tu publicación',
  showPush: true,
  url: '/posts/123',  // Navega aquí al hacer clic
  type: 'info'
});
```

### Ejemplo 3: Notificación Programada

```typescript
// Notificar en 5 minutos
await notificationService.scheduleNotification({
  title: 'Recordatorio',
  body: 'No olvides revisar los casos pendientes',
  showPush: true,
  type: 'info'
}, 5 * 60 * 1000);  // 5 minutos en ms
```

### Ejemplo 4: Notificación Crítica

```typescript
await notificationService.notifySystemAlert(
  '⚠️ URGENTE: Servidor con alta carga',
  true  // crítico = no se cierra automáticamente
);
```

### Ejemplo 5: Flujo Completo

```typescript
import { usePushNotifications } from '../hooks/usePushNotifications';
import { notificationService } from '../services/notificationService';

function FormularioReporte() {
  const { permission, requestPermission } = usePushNotifications();
  
  const handleSubmit = async (data) => {
    try {
      // Procesar datos
      await api.crearReporte(data);
      
      // Notificación de éxito (siempre toast)
      await notificationService.success(
        'Reporte creado',
        'Tu reporte se creó exitosamente',
        false  // solo toast
      );
      
      // Si tiene permisos, enviar push adicional
      if (permission === 'granted') {
        await notificationService.notifyNewSighting(
          data.animal,
          data.ubicacion
        );
      } else {
        // Sugerir activar notificaciones
        const granted = await requestPermission();
        if (granted === 'granted') {
          await notificationService.info(
            'Notificaciones activadas',
            'Ahora recibirás alertas importantes',
            true
          );
        }
      }
      
    } catch (error) {
      // Notificación de error
      await notificationService.error(
        'Error',
        'No se pudo crear el reporte. Intenta de nuevo.',
        false
      );
    }
  };
  
  return (/* ... */);
}
```

### Ejemplo 6: Integración con WebSocket

```typescript
import { notificationService } from '../services/notificationService';

// Escuchar eventos en tiempo real
socket.on('nuevo-avistamiento', (data) => {
  notificationService.notifyNewSighting(
    data.animal,
    data.ubicacion
  );
});

socket.on('mensaje-nuevo', (data) => {
  notificationService.notifyNewMessage(
    data.remitente,
    data.preview
  );
});

socket.on('caso-actualizado', (data) => {
  notificationService.notifyCaseUpdate(
    data.casoId,
    data.nuevoEstado
  );
});
```

---

## 🔧 Troubleshooting

### Problema 1: "Notificaciones no soportadas"

**Causa**: Navegador antiguo o incompatible.

**Solución**:
- Actualiza el navegador
- Usa Chrome, Firefox, Edge o Safari 16+
- El sistema fallará graciosamente a toast

### Problema 2: "Service Worker no se registra"

**Causa**: HTTPS requerido (excepto localhost).

**Solución**:
```bash
# En desarrollo, usa localhost
npm run dev

# En producción, asegúrate de tener HTTPS
# El Service Worker solo funciona en HTTPS
```

### Problema 3: "Permisos denegados"

**Causa**: Usuario bloqueó notificaciones.

**Solución**:
1. Ir a configuración del navegador
2. Buscar configuración de sitios
3. Encontrar tu sitio
4. Cambiar permisos de notificación a "Permitir"
5. Recargar la página

### Problema 4: "Notificaciones no aparecen"

**Checklist**:
- ✅ Permisos concedidos: `permission === 'granted'`
- ✅ Service Worker activo: `isServiceWorkerReady === true`
- ✅ Navegador compatible: `isSupported === true`
- ✅ Sistema de notificaciones del OS habilitado
- ✅ Modo "No molestar" desactivado

### Problema 5: "Iconos no se muestran"

**Solución**:
```typescript
// Usar URLs absolutas
await notificationService.send({
  title: 'Test',
  body: 'Mensaje',
  icon: window.location.origin + '/icon-192x192.png',
  showPush: true
});
```

---

## ✨ Mejores Prácticas

### 1. Solicitar Permisos en el Momento Adecuado

❌ **Mal**: Solicitar permisos inmediatamente al cargar la página

```typescript
// NO HACER ESTO
useEffect(() => {
  requestPermission();  // Molesto para el usuario
}, []);
```

✅ **Bien**: Solicitar después de una acción del usuario

```typescript
// MEJOR
<button onClick={handleActivateNotifications}>
  Activar Notificaciones
</button>
```

### 2. Proporcionar Contexto

✅ **Bien**: Explicar por qué necesitas permisos

```typescript
<PushNotificationManager 
  showStatus={true}  // Muestra beneficios
/>
```

### 3. Siempre Tener Fallback

✅ **Bien**: Toast como respaldo

```typescript
// El sistema automáticamente muestra toast si no hay permisos
notify('Título', 'Mensaje', 'success', true);
```

### 4. No Abusar de las Notificaciones

❌ **Mal**: Notificación por cada acción

```typescript
// Demasiadas notificaciones
onClick={() => {
  success('Click 1', '', true);
  success('Click 2', '', true);
  success('Click 3', '', true);
}}
```

✅ **Bien**: Notificaciones significativas

```typescript
// Solo eventos importantes
onCaseResolved={() => {
  success('Caso resuelto', 'El caso #123 fue cerrado', true);
}}
```

### 5. Usar Tags para Agrupar

✅ **Bien**: Tags únicos por tipo

```typescript
await notificationService.send({
  title: 'Mensaje nuevo',
  body: 'Tienes 3 mensajes sin leer',
  tag: 'mensajes',  // Reemplaza notificaciones anteriores con el mismo tag
  showPush: true
});
```

### 6. Limpiar Notificaciones Antiguas

✅ **Bien**: Limpiar al cambiar de vista

```typescript
useEffect(() => {
  // Limpiar notificaciones de mensajes al abrir la bandeja
  notificationService.clearNotificationsByTag('mensajes');
}, []);
```

### 7. Probar en Múltiples Dispositivos

✅ **Checklist de Testing**:
- [ ] Chrome Desktop (Windows/Mac/Linux)
- [ ] Firefox Desktop
- [ ] Safari Desktop (Mac)
- [ ] Chrome Mobile (Android)
- [ ] Firefox Mobile (Android)
- [ ] Safari Mobile (iOS)
- [ ] Modo oscuro/claro
- [ ] Con/sin conexión

---

## 📱 Simulación de Flujo Móvil

### Cómo Probar en Móvil

1. **Desde Chrome DevTools**:
   - F12 → Toggle Device Toolbar
   - Seleccionar dispositivo móvil
   - Probar notificaciones

2. **En Dispositivo Real**:
   ```bash
   # Encuentra tu IP local
   ipconfig  # Windows
   ifconfig  # Mac/Linux
   
   # Accede desde móvil
   http://TU-IP:3000/demo-notificaciones
   ```

3. **Testing PWA**:
   - Instalar la app en el dispositivo
   - Cerrar el navegador
   - Probar notificaciones en segundo plano

### Comportamiento en Móvil

- **Android**: Notificaciones aparecen en la barra de notificaciones
- **iOS 16.4+**: Notificaciones limitadas, mejor usar toast
- **PWA Instalada**: Funcionalidad completa, incluso con app cerrada

---

## 🎓 Recursos Adicionales

### Documentación Oficial

- [Web Notifications API](https://developer.mozilla.org/es/docs/Web/API/Notifications_API)
- [Service Workers](https://developer.mozilla.org/es/docs/Web/API/Service_Worker_API)
- [PWA](https://web.dev/progressive-web-apps/)

### Herramientas de Testing

- [Chrome DevTools - Application Panel](https://developer.chrome.com/docs/devtools/)
- [PWA Builder](https://www.pwabuilder.com/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

## 📝 Changelog

### v1.0.0 (Octubre 2025)

✨ **Nuevas Características**:
- Sistema completo de notificaciones push
- Soporte PWA con manifest y service worker
- Hook `usePushNotifications` con API completa
- Servicio centralizado `notificationService`
- Componente `PushNotificationManager` para UI
- Página de demostración completa
- Notificaciones programadas
- Soporte offline
- Fallback a toast automático

🔧 **Mejoras**:
- Integración con sistema toast existente
- Gestión inteligente de permisos
- Estrategias de cache optimizadas
- Documentación completa

---

## 🤝 Soporte

Si encuentras problemas o tienes preguntas:

1. Revisa la sección [Troubleshooting](#troubleshooting)
2. Verifica la [página de demo](#paso-3-probar-el-sistema)
3. Consulta los [ejemplos de uso](#ejemplos-de-uso)
4. Revisa la consola del navegador para errores

---

## ✅ Checklist de Implementación

- [x] Crear manifest.json
- [x] Implementar Service Worker
- [x] Crear hook usePushNotifications
- [x] Crear componente PushNotificationManager
- [x] Crear servicio notificationService
- [x] Integrar en _app.tsx y _document.tsx
- [x] Crear página de demo
- [x] Documentar sistema completo
- [ ] Crear iconos PWA (192x192, 512x512)
- [ ] Probar en diferentes navegadores
- [ ] Probar en dispositivos móviles
- [ ] Integrar con eventos reales de la aplicación

---

**🎉 ¡Sistema de Notificaciones Push completamente implementado y documentado!**
