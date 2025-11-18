import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";

export function getUserFromToken(req: NextApiRequest) {
  try {
    const auth = req.headers.authorization;
    if (!auth) return null;

    const token = auth.split(" ")[1];
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded as { id_usuario: number; email: string };
  } catch (error) {
    return null;
  }
}
