# Ejemplos Prácticos de Integración

> Copiar y adaptar estos ejemplos a tu aplicación

---

## EJEMPLO 1: Integrar en un formulario

```tsx
import { notificationService } from '../services/notificationService';

export function FormularioAvistamiento() {
  const handleSubmit = async (data) => {
    try {
      // Enviar datos al servidor
      const response = await fetch('/api/avistamientos', {
        method: 'POST',
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // ✅ Notificación de éxito (toast + push)
        await notificationService.success(
          'Avistamiento Reportado',
          `Gracias por reportar el avistamiento de ${data.animal}`,
          true  // mostrar push
        );

        // También notificar usando el método específico del dominio
        await notificationService.notifyNewSighting(
          data.animal,
          data.ubicacion
        );
      }
    } catch (error) {
      // ❌ Notificación de error
      await notificationService.error(
        'Error al Reportar',
        'No se pudo enviar el reporte. Por favor intenta de nuevo.',
        true
      );
    }
  };

  return <form>{/* tu JSX */}</form>;
}
```

---

## EJEMPLO 2: Integrar con WebSocket

```tsx
import { useEffect } from 'react';
import { notificationService } from '../services/notificationService';
import io from 'socket.io-client';

export function useRealtimeNotifications() {
  useEffect(() => {
    // Conectar a WebSocket
    const socket = io('http://localhost:3001');

    // Escuchar eventos en tiempo real
    socket.on('nuevo-avistamiento', (data) => {
      notificationService.notifyNewSighting(
        data.animal,
        data.ubicacion
      );
    });

    socket.on('caso-actualizado', (data) => {
      notificationService.notifyCaseUpdate(
        data.casoId,
        data.nuevoEstado
      );
    });

    socket.on('mensaje-privado', (data) => {
      notificationService.notifyNewMessage(
        data.remitente,
        data.mensaje
      );
    });

    // Cleanup
    return () => socket.disconnect();
  }, []);
}
```

---

## EJEMPLO 3: Página de configuración

```tsx
import { useState } from 'react';
import { PushNotificationManager } from '../components/PushNotificationManager';

export function ConfiguracionPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Configuración</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Notificaciones</h2>
        
        <PushNotificationManager
          showStatus={true}
          autoRequest={false}
          onPermissionChange={(permission) => {
            setNotificationsEnabled(permission === 'granted');
            console.log('Estado de notificaciones:', permission);
          }}
        />
        
        {notificationsEnabled && (
          <div className="mt-4 p-4 bg-green-50 rounded">
            <p className="text-green-800">
              ✅ Recibirás notificaciones sobre eventos importantes
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## EJEMPLO 4: Hook personalizado

```tsx
import { useCallback } from 'react';
import { usePushNotifications } from '../hooks/usePushNotifications';

export function useAppNotifications() {
  const { permission, success, error, info } = usePushNotifications();

  // Notificaciones específicas de tu app
  const notifyReportSubmitted = useCallback(() => {
    success(
      'Reporte Enviado',
      'Tu reporte está siendo revisado por el equipo',
      permission === 'granted'
    );
  }, [success, permission]);

  const notifyReportApproved = useCallback((reportId: string) => {
    success(
      'Reporte Aprobado',
      `Tu reporte #${reportId} ha sido aprobado y publicado`,
      true
    );
  }, [success]);

  const notifyReportRejected = useCallback((reason: string) => {
    error(
      'Reporte Rechazado',
      `Motivo: ${reason}`,
      true
    );
  }, [error]);

  return {
    notifyReportSubmitted,
    notifyReportApproved,
    notifyReportRejected
  };
}
```

---

## EJEMPLO 5: Notificaciones programadas

```tsx
import { notificationService } from '../services/notificationService';

export function RecordatoriosSistema() {
  const programarRecordatorio = async () => {
    // Recordatorio en 1 hora
    await notificationService.scheduleNotification({
      title: '⏰ Recordatorio',
      body: 'Es hora de revisar los casos pendientes',
      showPush: true,
      type: 'info',
      url: '/casos'
    }, 60 * 60 * 1000);  // 1 hora en milisegundos

    // Confirmar programación
    await notificationService.info(
      'Recordatorio Programado',
      'Te avisaremos en 1 hora',
      false  // solo toast
    );
  };

  const recordatoriosDiarios = () => {
    // Recordatorio diario a las 9am
    const ahora = new Date();
    const proximaNotificacion = new Date();
    proximaNotificacion.setHours(9, 0, 0, 0);
    
    if (proximaNotificacion <= ahora) {
      proximaNotificacion.setDate(proximaNotificacion.getDate() + 1);
    }

    const delay = proximaNotificacion.getTime() - ahora.getTime();

    notificationService.scheduleNotification({
      title: '🌅 Buenos días',
      body: 'Tienes 5 casos nuevos para revisar',
      showPush: true,
      type: 'info'
    }, delay);
  };

  return null;
}
```

---

## EJEMPLO 6: Integrar en componente existente

```tsx
import { useState, useEffect } from 'react';
import { notificationService } from '../services/notificationService';

export function ListaCasos() {
  const [casos, setCasos] = useState([]);

  // Polling para nuevos casos
  useEffect(() => {
    const checkNewCases = async () => {
      const response = await fetch('/api/casos/nuevos');
      const nuevosCasos = await response.json();

      if (nuevosCasos.length > 0) {
        // Notificar nuevos casos
        await notificationService.info(
          'Casos Nuevos',
          `Hay ${nuevosCasos.length} casos nuevos para revisar`,
          true
        );

        setCasos(prev => [...nuevosCasos, ...prev]);
      }
    };

    // Verificar cada 2 minutos
    const interval = setInterval(checkNewCases, 2 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleCaseUpdate = async (casoId, nuevoEstado) => {
    try {
      await fetch(`/api/casos/${casoId}`, {
        method: 'PATCH',
        body: JSON.stringify({ estado: nuevoEstado })
      });

      // Notificar actualización
      await notificationService.notifyCaseUpdate(casoId, nuevoEstado);
      
      // Limpiar notificaciones antiguas de este caso
      await notificationService.clearNotificationsByTag(`caso-${casoId}`);
      
    } catch (error) {
      await notificationService.error(
        'Error',
        'No se pudo actualizar el caso',
        false
      );
    }
  };

  return <div>{/* tu JSX */}</div>;
}
```

---

## EJEMPLO 7: Notificaciones de adopción

```tsx
import { notificationService } from '../services/notificationService';

export function SolicitudAdopcion({ animalId, animalName }) {
  const handleSubmit = async (formData) => {
    try {
      const response = await fetch('/api/adopciones', {
        method: 'POST',
        body: JSON.stringify({
          animalId,
          ...formData
        })
      });

      if (response.ok) {
        // Notificar al usuario
        await notificationService.success(
          '🎉 Solicitud Enviada',
          `Tu solicitud para adoptar a ${animalName} ha sido enviada`,
          true,
          '/mis-adopciones'
        );

        // Notificar a los administradores (simulado)
        await notificationService.notifyAdoptionRequest(
          animalName,
          formData.nombreSolicitante
        );
      }
    } catch (error) {
      await notificationService.error(
        'Error',
        'No se pudo enviar la solicitud',
        true
      );
    }
  };

  return <form>{/* tu JSX */}</form>;
}
```

---

## EJEMPLO 8: Sistema de alertas críticas

```tsx
import { useEffect } from 'react';
import { notificationService } from '../services/notificationService';

export function MonitoreoSistema() {
  useEffect(() => {
    // Monitorear estado del sistema
    const checkSystemHealth = async () => {
      try {
        const response = await fetch('/api/health');
        const health = await response.json();

        if (health.status === 'critical') {
          // Alerta crítica
          await notificationService.notifySystemAlert(
            `⚠️ ${health.message}`,
            true  // crítico
          );
        } else if (health.status === 'warning') {
          // Advertencia
          await notificationService.notifySystemAlert(
            health.message,
            false
          );
        }
      } catch (error) {
        console.error('Error checking system health:', error);
      }
    };

    // Verificar cada 5 minutos
    const interval = setInterval(checkSystemHealth, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return null; // Componente invisible de monitoreo
}
```

---

## EJEMPLO 9: Limpiar notificaciones

```tsx
import { useEffect } from 'react';
import { notificationService } from '../services/notificationService';

export function MensajesPage() {
  useEffect(() => {
    // Cuando el usuario abre la página de mensajes,
    // limpiar las notificaciones de mensajes no leídos
    notificationService.clearNotificationsByTag('mensajes');
    
    return () => {
      // Opcional: Limpiar al salir
      // notificationService.clearAllNotifications();
    };
  }, []);

  return <div>{/* tu JSX */}</div>;
}
```

---

## EJEMPLO 10: Inicialización en _app.tsx

```tsx
import { useEffect } from 'react';
import { notificationService } from '../services/notificationService';

export function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Inicializar servicio de notificaciones
    const init = async () => {
      const initialized = await notificationService.initialize();
      
      if (initialized) {
        console.log('✅ Sistema de notificaciones listo');
        
        // Opcional: Solicitar permisos después de 10 segundos
        // setTimeout(() => {
        //   notificationService.requestPermission();
        // }, 10000);
      }
    };

    init();
  }, []);

  return <Component {...pageProps} />;
}
```

---

## TIPS Y MEJORES PRÁCTICAS

### 1. SIEMPRE mostrar toast, OPCIONALMENTE mostrar push
```
✅ success('Título', 'Mensaje', true)
❌ No confiar solo en push (puede estar desactivado)
```

### 2. Usar tags para notificaciones relacionadas
```
✅ tag: `caso-${casoId}` (reemplaza notificaciones del mismo caso)
```

### 3. URLs para navegar al hacer clic
```
✅ url: '/casos/123' (navega al caso específico)
```

### 4. Duración apropiada
- Success: 3-5 segundos
- Error: 5-7 segundos
- Warning: 4-6 segundos
- Info: 3-5 segundos

### 5. No abusar de notificaciones
```
❌ Notificar cada click
✅ Notificar eventos importantes
```

### 6. Limpiar notificaciones antiguas
```
✅ clearNotificationsByTag() al resolver un caso
✅ clearAllNotifications() al cerrar sesión
```

### 7. Solicitar permisos en el contexto correcto
```
❌ Inmediatamente al cargar la página
✅ Después de una acción del usuario
✅ Al habilitar una función que requiere notificaciones
```

### 8. Proporcionar valor antes de pedir permisos
```
✅ Mostrar qué tipo de notificaciones recibirán
✅ Explicar los beneficios
```

### 9. Respetar la privacidad
```
❌ Enviar datos sensibles en notificaciones
✅ Usar mensajes genéricos con link para detalles
```

### 10. Testing
```
✅ Probar con permisos granted/denied/default
✅ Probar en diferentes navegadores
✅ Probar en móvil y desktop
```
