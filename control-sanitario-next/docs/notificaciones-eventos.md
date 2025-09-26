# Eventos que Disparan Notificaciones

Este documento describe los eventos del backend que activan notificaciones automáticas en el sistema.

## 1. Creación de un Nuevo Reporte (Avistamiento)

-   **Evento:** Se crea un nuevo reporte de avistamiento en la base de datos.
-   **Disparador:** Un usuario envía un nuevo reporte a través del formulario de la aplicación.
-   **Acción:** El sistema envía una notificación para confirmar que el reporte ha sido recibido.
-   **Destinatario:** El usuario que ha creado el reporte.
-   **Mensaje de ejemplo:** "Tu reporte ha sido enviado con éxito. ¡Gracias por tu colaboración!"

## 2. Cambio de Estado de un Reporte

-   **Evento:** El estado de un reporte de avistamiento existente es actualizado.
-   **Disparador:** Un administrador cambia el estado de un reporte (por ejemplo, de "pendiente" a "en progreso" o "resuelto").
-   **Acción:** El sistema envía una notificación para informar al usuario sobre la actualización de su reporte.
-   **Destinatario:** El usuario que creó el reporte original.
-   **Mensaje de ejemplo:** "El estado de tu reporte ha sido actualizado a: 'En Progreso'."

## 3. Nueva Solicitud de Adopción

-   **Evento:** Se registra una nueva solicitud de adopción.
-   **Disparador:** Un usuario completa y envía el formulario para adoptar un animal.
-   **Acción:** El sistema notifica al usuario que su solicitud ha sido recibida y está siendo procesada.
-   **Destinatario:** El usuario que ha solicitado la adopción.
-   **Mensaje de ejemplo:** "Tu solicitud de adopción para [Nombre del Animal] ha sido recibida."

## 4. Actualización del Estado de una Adopción

-   **Evento:** El estado de una solicitud de adopción cambia.
-   **Disparador:** Un administrador aprueba o rechaza una solicitud de adopción.
-   **Acción:** El sistema informa al usuario sobre el resultado de su solicitud.
-   **Destinatario:** El usuario que solicitó la adopción.
-   **Mensaje de ejemplo:** "¡Felicidades! Tu solicitud de adopción para [Nombre del Animal] ha sido aprobada."