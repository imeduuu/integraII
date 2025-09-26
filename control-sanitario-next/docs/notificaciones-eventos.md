# Eventos que Disparan Notificaciones

Este documento describe los eventos del backend que deben activar notificaciones automáticas en el sistema.

### 1. Creación de un Nuevo Reporte (Avistamiento)

* **Evento:** Se crea un nuevo `avistamiento` en la base de datos.
* **Disparador:** Un usuario envía un nuevo reporte a través del formulario de la aplicación.
* **Acción:** El sistema debe enviar una notificación para confirmar que el reporte ha sido recibido.
* **Destinatario:** El `usuario` que ha creado el reporte.
* **Mensaje de ejemplo:** "Tu reporte ha sido enviado con éxito. ¡Gracias por tu colaboración!"

### 2. Cambio de Estado de un Reporte (Avistamiento)

* **Evento:** El campo `id_estado_avistamiento` de un `avistamiento` existente es actualizado.
* **Disparador:** Un administrador cambia el estado de un reporte (ej: de "Pendiente" a "En Progreso" o "Resuelto").
* **Acción:** El sistema debe notificar al usuario sobre la actualización de su reporte.
* **Destinatario:** El `usuario` que creó el reporte original.
* **Mensaje de ejemplo:** "El estado de tu reporte ha sido actualizado a: 'En Progreso'."