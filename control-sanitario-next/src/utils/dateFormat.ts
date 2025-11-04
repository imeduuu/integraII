/**
 * Funciones de formateo de fecha reutilizables
 */

/**
 * Formatea una fecha a DD/MM/YYYY
 * @param date Date | string | number
 */
export function formatDDMMYYYY(date: Date | string | number): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return '';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Devuelve ISO string (yyyy-mm-dd) o vacío si inválido
 */
export function toISO(date: Date | string | number): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString();
}

/**
 * Parse a Date object, retornando null si inválido
 */
export function parseDate(value: string | number | Date): Date | null {
  const d = new Date(value as any);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

export default {
  formatDDMMYYYY,
  toISO,
  parseDate,
};
