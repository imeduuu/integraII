// services/auth.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "1h";
const RESET_TOKEN_EXPIRES_MS = Number(process.env.RESET_TOKEN_EXPIRES_MS ?? 1000 * 60 * 60);

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  nombre_usuario: z.string().min(1).optional(),
  id_rol: z.number().optional().nullable(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1),
  newPassword: z.string().min(8),
});

async function hashPassword(p: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(p, salt);
}

async function comparePassword(p: string, hash: string) {
  return bcrypt.compare(p, hash);
}

function signJwt(payload: object, opts?: jwt.SignOptions) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN, ...(opts ?? {}) });
}

function verifyJwt(token: string) {
  return jwt.verify(token, JWT_SECRET) as any;
}

const blacklistedTokens = new Set<string>();

export async function registerUser(input: unknown) {
  const data = registerSchema.parse(input);
  const email = data.email.toLowerCase();

  const existing = await prisma.usuario.findUnique({ where: { email } });
  if (existing) throw new Error("Email already registered");

  const password_hash = await hashPassword(data.password);

  const user = await prisma.usuario.create({
    data: {
      email,
      password_hash,
      nombre_usuario: data.nombre_usuario ?? "",
      id_rol: data.id_rol ?? null,
      fecha_creacion: new Date(),
      activo: true,
    },
  });

  // @ts-ignore
  const { password_hash: _ph, ...safe } = user;
  return safe;
}

export async function loginUser(input: unknown) {
  const data = loginSchema.parse(input);
  const email = data.email.toLowerCase();

  const user = await prisma.usuario.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const ok = await comparePassword(data.password, user.password_hash);
  if (!ok) throw new Error("Invalid credentials");

  await prisma.usuario.update({
    where: { id_usuario: user.id_usuario },
    data: { fecha_ultimo_login: new Date() },
  });

  const payload: any = { sub: user.id_usuario, email: user.email, id_rol: user.id_rol ?? null };
  if ((user as any).tokenVersion !== undefined) payload.tv = (user as any).tokenVersion;

  const token = signJwt(payload);

  // @ts-ignore
  const { password_hash: _ph, ...safe } = user;
  return { token, user: safe };
}

export async function logoutUser(opts: { userId?: number; token?: string }) {
  const { userId, token } = opts;

  if (userId) {
    const user = await prisma.usuario.findUnique({ where: { id_usuario: Number(userId) } });
    if (!user) throw new Error("User not found");

    if ((user as any).tokenVersion !== undefined) {
      const updated = await prisma.usuario.update({
        where: { id_usuario: Number(userId) },
        data: { tokenVersion: { increment: 1 } as any },
      });
      // @ts-ignore
      const { password_hash: _ph, ...safe } = updated;
      return { ok: true, method: "db-tokenVersion", user: safe };
    } else {
      if (token) {
        blacklistedTokens.add(token);
        return { ok: true, method: "memory-blacklist" };
      } else {
        await prisma.usuario.update({
          where: { id_usuario: Number(userId) },
          data: { fecha_ultimo_login: new Date() },
        });
        return { ok: true, method: "fecha_ultimo_login-updated" };
      }
    }
  }

  if (token) {
    blacklistedTokens.add(token);
    return { ok: true, method: "memory-blacklist" };
  }

  throw new Error("userId or token required to logout");
}

export async function verifyToken(token: string) {
  if (!token) throw new Error("Token required");
  if (blacklistedTokens.has(token)) throw new Error("Token invalidated");

  let payload: any;
  try {
    payload = verifyJwt(token);
  } catch (err) {
    throw new Error("Invalid token");
  }

  const userId = payload.sub;
  if (!userId) throw new Error("Invalid token payload");

  const user = await prisma.usuario.findUnique({ where: { id_usuario: Number(userId) } });
  if (!user) throw new Error("User not found");

  if (typeof (user as any).tokenVersion !== "undefined") {
    if (typeof payload.tv === "undefined" || payload.tv !== (user as any).tokenVersion) {
      throw new Error("Token has been invalidated (tokenVersion mismatch)");
    }
  }

  // @ts-ignore
  const { password_hash: _ph, ...safe } = user;
  return { payload, user: safe };
}

export async function forgotPassword(input: unknown) {
  const data = forgotPasswordSchema.parse(input);
  const email = data.email.toLowerCase();

  const user = await prisma.usuario.findUnique({ where: { email } });
  if (!user) {
    return { ok: true };
  }

  const resetToken = jwt.sign({ sub: user.id_usuario, type: "reset" }, JWT_SECRET, {
    expiresIn: Math.floor(RESET_TOKEN_EXPIRES_MS / 1000) + "s",
  });

  const expiresAt = new Date(Date.now() + RESET_TOKEN_EXPIRES_MS);

  await prisma.password_reset.create({
    data: {
      id_usuario: user.id_usuario,
      token: resetToken,
      expires_at: expiresAt,
      used: false,
    },
  });

  return { ok: true, resetToken, expiresAt };
}

export async function resetPassword(input: unknown) {
  const data = resetPasswordSchema.parse(input);

  const record = await prisma.password_reset.findUnique({ where: { token: data.token } });
  if (!record) throw new Error("Invalid or expired reset token");
  if (record.used) throw new Error("Reset token already used");
  if (record.expires_at < new Date()) throw new Error("Reset token expired");

  const user = await prisma.usuario.findUnique({ where: { id_usuario: Number(record.id_usuario) } });
  if (!user) throw new Error("User not found");

  const newHash = await hashPassword(data.newPassword);

  await prisma.usuario.update({
    where: { id_usuario: Number(user.id_usuario) },
    data: { password_hash: newHash, fecha_ultimo_login: new Date() },
  });

  await prisma.password_reset.update({ where: { id_reset: record.id_reset }, data: { used: true } });

  return { ok: true };
}

export function extractBearer(authHeader?: string | null) {
  if (!authHeader) return null;
  const m = authHeader.match(/Bearer\s+(.+)/i);
  return m ? m[1] : null;
}

export default {
  registerUser,
  loginUser,
  logoutUser,
  verifyToken,
  forgotPassword,
  resetPassword,
  extractBearer,
};
