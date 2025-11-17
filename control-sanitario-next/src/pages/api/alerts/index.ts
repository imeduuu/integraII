import { NextApiRequest, NextApiResponse } from "next";

let alerts: any[] = [
  { id: 1, title: "Alerta de prueba", message: "Ejemplo", active: true }
];

function verifyAdmin(req: NextApiRequest) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  return token === "admin-token"; 
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(alerts);
  }

  if (req.method === "POST") {
    if (!verifyAdmin(req)) {
      return res.status(401).json({ error: "Acceso no autorizado" });
    }

    const newAlert = {
      id: alerts.length + 1,
      title: req.body.title,
      message: req.body.message,
      active: true,
      created_at: new Date(),
    };

    alerts.push(newAlert);

    return res.status(201).json(newAlert);
  }

  return res.status(405).json({ error: "Método no permitido" });
}
