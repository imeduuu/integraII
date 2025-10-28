// src/utils/sanitize.ts
// Funciones para limpiar y validar datos de formularios
// Evita inyecciones, XSS y caracteres no deseados

/**
 * Limpiar una cadena eliminando espacios extra,caracteres peligrosos
 */
export function sanitizeInput(value: string): string {
  if (!value) return "";
  let clean = value.trim(); // quita espacios al inicio y final
  clean = clean.replace(/<[^>]*>?/gm, ""); // elimina etiquetas HTML
  clean = clean.replace(/[{}$<>;]/g, ""); // elimina caracteres peligrosos
  return clean;
}

/**
 * Sanitiza todos los valores de un objeto (como los datos de un formulario)
 */
export function sanitizeFormData<T extends Record<string, any>>(formData: T): T {
  const sanitized: Record<string, any> = {};
  for (const key in formData) {
    const value = formData[key];
    sanitized[key] = typeof value === "string" ? sanitizeInput(value) : value;
  }
  return sanitized as T;
}

/**
 * Valida que un email sea válido
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Valida longitud mínima (por ejemplo, para contraseñas o nombres)
 */
export function minLength(value: string, length: number): boolean {
  return value.trim().length >= length;
}
