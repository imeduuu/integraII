Sistema de Notificaciones

Este proyecto incluye un sistema de toasts/notificaciones reutilizables que permite mostrar mensajes de éxito, error y advertencia desde cualquier parte de la aplicación.

 Cómo funciona

El sistema está implementado mediante un Contexto Global (NotificationProvider) y un hook (useNotification).
Esto permite disparar notificaciones fácilmente sin importar en qué componente se encuentre el usuario.

✅ Tipos soportados: success, error, warning

✅ Reutilizable: se puede invocar en cualquier componente.

✅ Estilos con Tailwind CSS para colores y diseño.

📦 Configuración inicial

El NotificationProvider ya envuelve la aplicación en _app.tsx, por lo que no necesitas configurarlo manualmente.

Ejemplo en _app.tsx:

import { NotificationProvider } from "../components/NotificationProvider";

function MyApp({ Component, pageProps }) {
  return (
    <NotificationProvider>
      <Component {...pageProps} />
    </NotificationProvider>
  );
}

export default MyApp;

🛠 Uso en componentes

Importa el hook useNotification:

import { useNotification } from "../components/NotificationProvider";


Obtén la función showNotification:

const { showNotification } = useNotification();


Dispara una notificación con el mensaje y el tipo:

// Éxito
showNotification("Operación realizada con éxito ✅", "success");

// Error
showNotification("Algo salió mal ❌", "error");

// Advertencia
showNotification("Revisa los datos ingresados ⚠️", "warning");

🎨 Ejemplo completo
import { useNotification } from "../components/NotificationProvider";

export default function ExampleButton() {
  const { showNotification } = useNotification();

  const handleClick = () => {
    showNotification("Guardado correctamente", "success");
  };

  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      onClick={handleClick}
    >
      Guardar
    </button>
  );
}


Cuando el usuario hace clic en el botón, aparecerá una notificación verde de éxito.

📌 Notas

Actualmente el sistema muestra una notificación a la vez. Si disparas otra, reemplazará la anterior.

Se puede extender para permitir múltiples notificaciones en cola.

Se recomienda mejorar la UX con animaciones (ej. framer-motion o transiciones de Tailwind).ola