/**
 * Utility validators reutilizables
 */
/**
 * Valida si una cadena tiene formato de email razonable.
 * Nota: esta función usa una comprobación práctica, no exhaustiva.
 * @param email string
 * @returns boolean
 * @example
 * isEmail('juan@ejemplo.com') // true
 */
export function isEmail(email: string): boolean {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

/**
 * Valida que un campo no sea vacío (trimmed)
 * @param value string | undefined | null
 */
export function isRequired(value?: string | null): boolean {
  if (value === undefined || value === null) return false;
  return value.toString().trim().length > 0;
}

/**
 * Valida una contraseña "fuerte" mínima.
 * Reglas por defecto: al menos 8 caracteres, una letra y un número.
 * @param pass string
 */
export function isPasswordStrong(pass: string): boolean {
  if (!pass) return false;
  const minLength = 8;
  const hasLetter = /[A-Za-z]/.test(pass);
  const hasNumber = /[0-9]/.test(pass);
  return pass.length >= minLength && hasLetter && hasNumber;
}

/**
 * Normaliza espacios y corta texto a longitud si se solicita.
 */
export function normalizeText(s?: string, maxLen?: number): string {
  if (!s) return '';
  const t = s.trim().replace(/\s+/g, ' ');
  return maxLen ? t.slice(0, maxLen) : t;
}

export default {
  isEmail,
  isRequired,
  isPasswordStrong,
  normalizeText,
};
// (fin de archivo)
