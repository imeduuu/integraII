import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// Simulador de un servicio de notificaciones
const sendNotification = (userId: number, message: string) => {
  console.log(`Enviando notificación al usuario ${userId}: "${message}"`);
  // En una aplicación real, aquí se integraría un servicio de notificaciones
  // como Firebase Cloud Messaging, un servicio de email, o websockets.
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Lógica para crear un nuevo reporte y notificar
    try {
      const { descripcion, ubicacion, latitud, longitud, userId } = req.body;

      // Aquí asumimos que 'userId' se envía en el cuerpo de la solicitud.
      // En una aplicación real, obtendrías el ID del usuario de la sesión de autenticación.
      const newReport = await prisma.avistamiento.create({
        data: {
          descripcion,
          ubicacion,
          latitud,
          longitud,
          // Ejemplo: conectar con un usuario y estado de avistamiento existentes
          id_usuario: userId || 1, // Usar el userId del cuerpo o un valor por defecto para pruebas
          id_estado_avistamiento: 1, // Asumimos '1' como estado "Pendiente"
          id_especie: 1, // Asumimos '1' como una especie por defecto
          id_estado_salud: 1, // Asumimos '1' como estado de salud "Sano"
        },
      });

      // Disparar la notificación después de crear el reporte
      sendNotification(newReport.id_usuario, 'Tu reporte ha sido enviado con éxito. ¡Gracias por tu colaboración!');

      res.status(201).json(newReport);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el reporte' });
    }
  } else if (req.method === 'PUT') {
    // Lógica para actualizar el estado de un reporte y notificar
    try {
      const { reportId, newStatusId } = req.body;

      const updatedReport = await prisma.avistamiento.update({
        where: { id_avistamiento: reportId },
        data: { id_estado_avistamiento: newStatusId },
        include: { estado_avistamiento: true },
      });

      // Disparar notificación sobre el cambio de estado
      const message = `El estado de tu reporte ha sido actualizado a: '${updatedReport.estado_avistamiento.estado_avistamiento}'`;
      sendNotification(updatedReport.id_usuario, message);

      res.status(200).json(updatedReport);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el reporte' });
    }
  } else {
    // Manejar otros métodos HTTP
    res.setHeader('Allow', ['POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}