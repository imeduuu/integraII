# Feedback visual implementado

Resumen rápido

Se implementaron y mejoraron varios mecanismos de retroalimentación visual para acciones de usuario (guardar, eliminar, enviar, inscribirse) en formularios y botones principales. Los cambios buscan asegurar feedback inmediato y comprensible: estados de carga (loaders), toasts para éxito/error y mensajes inline cuando aplica.

Componentes modificados

- `src/components/ui/Button.tsx`
  - Nuevo prop `isLoading?: boolean`.
  - Cuando `isLoading` es true, el botón se deshabilita y muestra un spinner inline junto al contenido.
  - Añade clases para indicar estado visual (opacity y cursor).

- `src/components/AdoptionForm.tsx`
  - Ya integraba `useNotification` y `Loader`. Se mantiene: muestra `Loader` dentro del botón al enviar y lanza `addToast` con éxito/error.

- `src/components/CommentSection.tsx`
  - Añadido `useNotification` para mostrar toasts en: comentario vacío (error), comentario agregado (success), comentario eliminado (success), comentario actualizado (success).
  - Estados locales: `isAdding`, `deletingId`, `savingId` para mostrar texto de estado (`Enviando...`, `Eliminando...`, `Guardando...`) y deshabilitar botones durante la acción.
  - Acciones simuladas con `setTimeout` para emular llamadas async y permitir que el usuario vea el estado de carga.

- `src/components/CampaignList.tsx`
  - Añadido `registeringId` para indicar registro en progreso por campaña.
  - Botón `Inscribirse` muestra `Inscribiendo...` y se deshabilita durante el proceso.
  - Muestra toasts de error si la campaña está inactiva, o success al completar la inscripción.

- `src/components/UserDetail.tsx`
  - Integrado `useNotification` y `Button` con `isLoading` para la acción de guardar.
  - Se muestra toast de éxito y mensaje inline cuando se completan los cambios.

Qué tipos de feedback implementamos

- Toasts (globales): mensajes breves y no bloqueantes para éxito, error e información. Uso: `addToast(message, type)`.
- Estados de carga (loaders): en botones de acción se muestra un spinner inline y el botón queda deshabilitado.
- Mensajes inline: cuando aplica (por ejemplo `UserDetail` muestra texto de confirmación en el formulario).

Por qué estas elecciones

- Los toasts son adecuados para notificaciones transitorias que no requieren la atención inmediata del usuario.
- Los loaders en botones evitan que el usuario vuelva a hacer la misma acción y comunican que la acción está en curso.
- Los mensajes inline son útiles para validar campos y mostrar confirmación persistente dentro del contexto del formulario.

Siguientes pasos recomendados

- Reemplazar simulaciones (`setTimeout`) por llamadas reales a la API y mapear errores para mostrar mensajes más detallados.
- Añadir tests unitarios que verifiquen que `addToast` se llama cuando corresponde y que los botones muestran estado `isLoading`.
- Evaluar accesibilidad: asegurar que los toasts sean anunciados por lectores de pantalla (role=alert/aria-live ya implementado en `Toast`).

Archivos tocados (resumen)

- `src/components/ui/Button.tsx` (añadido isLoading)
- `src/components/CommentSection.tsx` (toasts, loaders)
- `src/components/CampaignList.tsx` (toasts, loaders)
- `src/components/UserDetail.tsx` (toasts, loaders)
- `src/components/AdoptionForm.tsx` (ya integraba feedback)

Verificación

- Ejecutar la suite de tests: `npm test` — Todos los tests pasan tras los cambios.

Notas

- Si prefieres un diseño de toasts diferente (posición, duración, estilos), puedo extraer la configuración a un módulo central y exponer opciones globales.

