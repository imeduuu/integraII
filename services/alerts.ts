import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { fileURLToPath } from "url";

type ID = string;

export interface Alert {
    id: ID;
    title: string;
    description?: string;
    location?: string;
    userId: string;
    createdAt: string;
    updatedAt?: string;
}

// calcular ruta relativa al archivo (compatible con ES modules)
const __filename = fileURLToPath(import.meta.url);
const DATA_DIR = path.resolve(path.dirname(__filename), "../data");
const DATA_FILE = path.join(DATA_DIR, "alerts.json");

async function ensureDataFile(): Promise<void> {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        await fs.access(DATA_FILE);
    } catch {
        await fs.writeFile(DATA_FILE, "[]", "utf8");
    }
}

async function loadAll(): Promise<Alert[]> {
    await ensureDataFile();
    const raw = await fs.readFile(DATA_FILE, "utf8");
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed as Alert[] : [];
    } catch {
        return [];
    }
}

async function saveAll(alerts: Alert[]): Promise<void> {
    await ensureDataFile();
    await fs.writeFile(DATA_FILE, JSON.stringify(alerts, null, 2), "utf8");
}

/**
 * Listar todas las alertas registradas.
 */
export async function listAlerts(): Promise<Alert[]> {
    return await loadAll();
}

/**
 * Obtener detalles de una alerta específica por id.
 */
export async function getAlert(id: ID): Promise<Alert | null> {
    const alerts = await loadAll();
    return alerts.find(a => a.id === id) ?? null;
}

/**
 * Crear una nueva alerta.
 * Se requiere: title y userId.
 */
export async function createAlert(data: {
    title: string;
    description?: string;
    location?: string;
    userId: string;
}): Promise<Alert> {
    if (!data.title || !data.userId) {
        throw new Error("title y userId son obligatorios");
    }

    const alerts = await loadAll();
    const now = new Date().toISOString();
    const alert: Alert = {
        id: randomUUID(),
        title: data.title,
        description: data.description,
        location: data.location,
        userId: data.userId,
        createdAt: now
    };

    alerts.push(alert);
    await saveAll(alerts);
    return alert;
}

/**
 * Actualizar la información de una alerta existente.
 */
export async function updateAlert(id: ID, updates: {
    title?: string;
    description?: string | null;
    location?: string | null;
    userId?: string;
}): Promise<Alert> {
    const alerts = await loadAll();
    const idx = alerts.findIndex(a => a.id === id);
    if (idx === -1) throw new Error("Alerta no encontrada");

    const existing = alerts[idx];

    const merged: Alert = {
        ...existing,
        title: updates.title ?? existing.title,
        description: updates.description === undefined ? existing.description : updates.description ?? undefined,
        location: updates.location === undefined ? existing.location : updates.location ?? undefined,
        userId: updates.userId ?? existing.userId,
        updatedAt: new Date().toISOString()
    };

    alerts[idx] = merged;
    await saveAll(alerts);
    return merged;
}

/**
 * Eliminar una alerta por id.
 */
export async function deleteAlert(id: ID): Promise<boolean> {
    const alerts = await loadAll();
    const idx = alerts.findIndex(a => a.id === id);
    if (idx === -1) return false;
    alerts.splice(idx, 1);
    await saveAll(alerts);
    return true;
}

export default {
    listAlerts,
    getAlert,
    createAlert,
    updateAlert,
    deleteAlert
};