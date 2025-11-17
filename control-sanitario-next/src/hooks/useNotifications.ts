import { useCallback } from 'react';
import useToast from './useToast';

export interface Notification {
  id_mensaje: number;
  contenido: string;
  fecha_envio: string; // ISO date
  id_remitente: number;
  id_destinatario: number;
  remitente?: any;
  destinatario?: any;
}

export interface UseNotificationsOptions {
  autoToast?: boolean; // mostrar toasts automáticamente en éxitos/errores
}

export type CreateNotificationInput = {
  contenido: string;
  id_remitente: number;
  id_destinatario: number;
};

export type UpdateNotificationInput = Partial<CreateNotificationInput>;

const API_BASE = '/api/notifications';

export default function useNotifications(opts: UseNotificationsOptions = {}) {
  const { autoToast = true } = opts;
  const toast = useToast();

  const list = useCallback(async (filters?: { remitente?: number; destinatario?: number }) => {
    try {
      const params = new URLSearchParams();
      if (filters?.remitente) params.set('remitente', String(filters.remitente));
      if (filters?.destinatario) params.set('destinatario', String(filters.destinatario));
      const url = params.toString() ? `${API_BASE}?${params.toString()}` : API_BASE;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Error al obtener notificaciones: ${res.status}`);
      const data: Notification[] = await res.json();
      return data;
    } catch (error: any) {
      if (autoToast) toast.error(`No se pudieron cargar notificaciones: ${error.message || error}`);
      throw error;
    }
  }, [autoToast, toast]);

  const getById = useCallback(async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error('Notificación no encontrada');
        throw new Error(`Error al obtener notificación: ${res.status}`);
      }
      const data: Notification = await res.json();
      return data;
    } catch (error: any) {
      if (autoToast) toast.error(`No se pudo obtener la notificación: ${error.message || error}`);
      throw error;
    }
  }, [autoToast, toast]);

  const create = useCallback(async (input: CreateNotificationInput) => {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error(`Error al crear notificación: ${res.status}`);
      const data: Notification = await res.json();
      if (autoToast) toast.success('Notificación creada');
      return data;
    } catch (error: any) {
      if (autoToast) toast.error(`No se pudo crear la notificación: ${error.message || error}`);
      throw error;
    }
  }, [autoToast, toast]);

  const update = useCallback(async (id: number, input: UpdateNotificationInput) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error(`Error al actualizar notificación: ${res.status}`);
      const data: Notification = await res.json();
      if (autoToast) toast.success('Notificación actualizada');
      return data;
    } catch (error: any) {
      if (autoToast) toast.error(`No se pudo actualizar la notificación: ${error.message || error}`);
      throw error;
    }
  }, [autoToast, toast]);

  const remove = useCallback(async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Error al eliminar notificación: ${res.status}`);
      if (autoToast) toast.success('Notificación eliminada');
      return true;
    } catch (error: any) {
      if (autoToast) toast.error(`No se pudo eliminar la notificación: ${error.message || error}`);
      throw error;
    }
  }, [autoToast, toast]);

  return {
    list,
    getById,
    create,
    update,
    remove,
  } as const;
}
