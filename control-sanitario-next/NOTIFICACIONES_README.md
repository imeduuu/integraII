# 🔔 Sistema de Notificaciones Push - Guía Rápida

## 🚀 Inicio Rápido

### 1. Crear Iconos (IMPORTANTE)

Antes de probar, crea estos archivos en `public/`:

```
public/
├── icon-192x192.png  (192x192 pixels)
├── icon-512x512.png  (512x512 pixels)
└── badge-72x72.png   (72x72 pixels, opcional)
```

Puedes usar cualquier imagen relacionada con tu app o generar iconos en:
- https://www.pwabuilder.com/imageGenerator
- https://realfavicongenerator.net/

### 2. Iniciar y Probar

```bash
# Iniciar servidor
npm run dev

# Abrir página de demo
http://localhost:3000/demo-notificaciones
```

### 3. Uso Básico en tu Código

```typescript
// Opción 1: Usar el servicio (RECOMENDADO)
import { notificationService } from '../services/notificationService';

await notificationService.success('¡Éxito!', 'Operación completada', true);
await notificationService.notifyNewSighting('Perro', 'Parque Central');

// Opción 2: Usar el hook
import { usePushNotifications } from '../hooks/usePushNotifications';

function MiComponente() {
  const { success, showNotification } = usePushNotifications();
  
  const handleClick = () => {
    success('Título', 'Mensaje', true); // true = mostrar push
  };
  
  return <button onClick={handleClick}>Notificar</button>;
}

// Opción 3: Componente de configuración
import { PushNotificationManager } from '../components/PushNotificationManager';

function Config() {
  return <PushNotificationManager showStatus={true} />;
}
```

## 📦 ¿Qué se implementó?

### Archivos Creados

```
control-sanitario-next/
├── public/
│   ├── manifest.json                    # Configuración PWA
│   └── sw.js                            # Service Worker
├── src/
│   ├── components/
│   │   └── PushNotificationManager.tsx  # UI de configuración
│   ├── hooks/
│   │   └── usePushNotifications.ts      # Hook principal
│   ├── services/
│   │   └── notificationService.ts       # Servicio centralizado
│   └── pages/
│       ├── _app.tsx                     # ✏️ Actualizado
│       ├── _document.tsx                # ✏️ Actualizado
│       └── demo-notificaciones.tsx      # Página de prueba
└── docs/
    └── NOTIFICACIONES_PUSH.md           # Documentación completa
```

### Características

✅ **Toast Notifications** (siempre funcionan)  
✅ **Push Notifications** (nativas del OS)  
✅ **PWA Support** (app instalable)  
✅ **Service Worker** (funciona offline)  
✅ **Fallback automático** (toast si no hay permisos)  
✅ **Notificaciones programadas**  
✅ **Vibración personalizada**  
✅ **Acciones interactivas**  

## 🎯 Casos de Uso Comunes

### 1. Notificación Simple
```typescript
await notificationService.success('Guardado', 'Datos guardados', true);
```

### 2. Notificación de Evento del Sistema
```typescript
// Cuando se crea un nuevo avistamiento
await notificationService.notifyNewSighting(
  data.animal,
  data.ubicacion
);

// Cuando se actualiza un caso
await notificationService.notifyCaseUpdate(
  data.id,
  data.nuevoEstado
);
```

### 3. Notificación Programada
```typescript
// Recordatorio en 5 minutos
await notificationService.scheduleNotification({
  title: 'Recordatorio',
  body: 'Revisa los casos pendientes',
  showPush: true
}, 5 * 60 * 1000);
```

### 4. Integración con WebSocket
```typescript
socket.on('nuevo-evento', (data) => {
  notificationService.info('Nuevo evento', data.mensaje, true);
});
```

## 🔧 API Rápida

### notificationService

```typescript
// Métodos básicos
await notificationService.success(titulo, mensaje, mostrarPush, url?);
await notificationService.error(titulo, mensaje, mostrarPush, url?);
await notificationService.warning(titulo, mensaje, mostrarPush, url?);
await notificationService.info(titulo, mensaje, mostrarPush, url?);

// Métodos del dominio
await notificationService.notifyNewSighting(animal, ubicacion);
await notificationService.notifyCaseUpdate(id, estado);
await notificationService.notifyNewMessage(remitente, preview);
await notificationService.notifyAdoptionRequest(animal, usuario);
await notificationService.notifySystemAlert(mensaje, critico);

// Utilidades
await notificationService.scheduleNotification(payload, delayMs);
await notificationService.clearAllNotifications();
```

### usePushNotifications Hook

```typescript
const {
  permission,              // 'default' | 'granted' | 'denied'
  isSupported,            // boolean
  isServiceWorkerReady,   // boolean
  requestPermission,      // () => Promise<permission>
  showNotification,       // (options) => Promise<boolean>
  success,                // (title, body, showPush) => void
  error,                  // (title, body, showPush) => void
  warning,                // (title, body, showPush) => void
  info                    // (title, body, showPush) => void
} = usePushNotifications();
```

## 📱 Testing

### Desktop
1. Abre Chrome/Firefox/Edge
2. Ve a `/demo-notificaciones`
3. Activa notificaciones
4. Prueba los diferentes botones

### Mobile
```bash
# 1. Encuentra tu IP
ipconfig  # Windows
ifconfig  # Mac/Linux

# 2. Accede desde tu móvil
http://TU-IP:3000/demo-notificaciones

# 3. Activa notificaciones y prueba
```

### PWA
1. En Chrome: Menú → "Instalar app"
2. Cierra la app
3. Las notificaciones seguirán funcionando

## 🐛 Problemas Comunes

| Problema | Solución |
|----------|----------|
| "No soportado" | Actualiza el navegador o usa Chrome/Firefox |
| Service Worker no registra | Usa HTTPS o localhost |
| Permisos denegados | Configuración del navegador → Permisos → Notificaciones |
| Iconos no aparecen | Crea `icon-192x192.png` y `icon-512x512.png` en `public/` |
| Notificaciones no llegan | Verifica: permisos, SW activo, modo "No molestar" |

## 🌐 Compatibilidad

| Navegador | Soporte |
|-----------|---------|
| Chrome 50+ | ✅ Completo |
| Firefox 44+ | ✅ Completo |
| Safari 16+ | ✅ Básico |
| Edge 79+ | ✅ Completo |
| Opera 42+ | ✅ Completo |
| IE | ❌ No soportado |

## 📚 Más Información

Para documentación completa, ver: `docs/NOTIFICACIONES_PUSH.md`

- Arquitectura detallada
- Todos los métodos y opciones
- Mejores prácticas
- Troubleshooting avanzado
- Más ejemplos

## ✅ Checklist

- [ ] Crear iconos PWA en `public/`
- [ ] Probar en `/demo-notificaciones`
- [ ] Verificar permisos
- [ ] Probar en mobile
- [ ] Integrar en tu código
- [ ] Testing en producción

---

**¿Dudas?** Revisa `docs/NOTIFICACIONES_PUSH.md` o la página `/demo-notificaciones`
