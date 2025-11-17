import { NextApiRequest, NextApiResponse } from "next";

// Simulación de envío push
function sendPushSimulation() {
  return {
    success: true,
    message: "Notificación push enviada (simulada)",
    timestamp: new Date()
  };
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const result = sendPushSimulation();

  return res.status(200).json(result);
}
