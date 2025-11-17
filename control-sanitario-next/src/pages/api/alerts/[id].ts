import { NextApiRequest, NextApiResponse } from "next";

let alerts: any[] = [
  { id: 1, title: "Alerta de prueba", message: "Ejemplo", active: true }
];

function verifyAdmin(req: NextApiRequest) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  return token === "admin-token";
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id);
  const alert = alerts.find((a) => a.id === id);

  if (!alert) {
    return res.status(404).json({ error: "Alerta no encontrada" });
  }

  if (req.method === "GET") {
    return res.status(200).json(alert);
  }

  if (req.method === "PUT") {
    if (!verifyAdmin(req)) {
      return res.status(401).json({ error: "Acceso no autorizado" });
    }

    alert.title = req.body.title ?? alert.title;
    alert.message = req.body.message ?? alert.message;
    alert.active = req.body.active ?? alert.active;

    return res.status(200).json(alert);
  }

  if (req.method === "DELETE") {
    if (!verifyAdmin(req)) {
      return res.status(401).json({ error: "Acceso no autorizado" });
    }

    alerts = alerts.filter((a) => a.id !== id);
    return res.status(200).json({ message: "Alerta eliminada" });
  }

  return res.status(405).json({ error: "Método no permitido" });
}
