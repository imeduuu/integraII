import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRE = '24h';
const REFRESH_TOKEN_EXPIRE = '7d';

export interface JWTPayload {
  id_usuario: number;
  email: string;
  iat?: number;
  exp?: number;
}

/**
 * Genera un token JWT
 */
export function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
}

/**
 * Verifica y decodifica un token JWT
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Extrae el token del header Authorization
 */
export function extractTokenFromHeader(authHeader?: string): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.slice(7);
}

/**
 * Middleware para verificar token
 */
export function validateAuthToken(authHeader?: string): JWTPayload | null {
  const token = extractTokenFromHeader(authHeader);
  if (!token) return null;
  return verifyToken(token);
}
