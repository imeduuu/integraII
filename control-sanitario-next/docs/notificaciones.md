Sistema de Notificaciones (Toasts)
Este documento explica cómo utilizar el sistema de notificaciones global en la aplicación.

Cómo funciona
El sistema se basa en un Contexto de React (NotificationContext) que provee una función para mostrar notificaciones tipo "toast" desde cualquier componente envuelto en él. Se ha implementado un hook personalizado useNotification para facilitar su uso.

Tipos de Notificaciones
Existen tres tipos de notificaciones, cada una con un estilo visual diferente:

success: Para mensajes de éxito (ej. "Perfil guardado correctamente").

error: Para mensajes de error (ej. "No se pudo conectar al servidor").

warning: Para advertencias o información (ej. "Tu contraseña está a punto de expirar").

Cómo usar el sistema
Para mostrar una notificación desde cualquier componente de la aplicación, sigue estos pasos:

Importa el hook useNotification:
Asegúrate de que el componente desde donde quieres llamar la notificación esté dentro del NotificationProvider (lo cual se configura por defecto en _app.tsx).

import { useNotification } from '../hooks/useNotification';

Obtén la función addToast del hook:
Dentro de tu componente funcional, llama al hook para obtener acceso a la función que crea los toasts.

const MyComponent = () => {
  const { addToast } = useNotification();
  // ...
};

Llama a addToast con tu mensaje y el tipo:
Puedes llamar a esta función como respuesta a un evento, como el clic de un botón o la finalización de una llamada a la API.

const handleClick = () => {
  // Para un mensaje de éxito
  addToast('¡Operación realizada con éxito!', 'success');

  // Para un mensaje de error
  addToast('Hubo un problema al procesar tu solicitud.', 'error');

  // Para una advertencia
  addToast('Por favor, revisa los campos del formulario.', 'warning');
};

Ejemplo completo en un componente
import React from 'react';
import { useNotification } from '../hooks/useNotification';

const ExampleComponent = () => {
  const { addToast } = useNotification();

  const handleSuccess = () => {
    addToast('¡Todo salió bien!', 'success');
  };

  const handleError = () => {
    addToast('Algo salió mal.', 'error');
  };

  return (
    <div>
      <h2>Ejemplo de Notificaciones</h2>
      <button onClick={handleSuccess}>Mostrar Éxito</button>
      <button onClick={handleError}>Mostrar Error</button>
    </div>
  );
};

export default ExampleComponent;

Las notificaciones aparecerán automáticamente en la esquina inferior derecha de la pantalla y desaparecerán después de 5 segundos.