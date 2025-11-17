# Endpoints de Autenticación

Este documento describe todos los endpoints de autenticación disponibles en la API.

## Estructura Base

**URL Base**: `http://localhost:3000/api/auth`

## Endpoints

### 1. POST /register

Registra un nuevo usuario en el sistema.

**Request:**
```json
{
  "nombre_usuario": "string",
  "apellido_paterno": "string",
  "apellido_materno": "string",
  "id_sexo": "number (opcional)",
  "fecha_nacimiento": "string (ISO 8601, opcional)",
  "telefono": "string (opcional)",
  "email": "string",
  "password_hash": "string",
  "id_ciudad": "number (opcional)"
}
```

**Response Success (201):**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "id": 123
}
```

**Response Error:**
```json
{
  "success": false,
  "message": "El email ya está registrado"
}
```

---

### 2. POST /login

Autentica un usuario y retorna un JWT.

**Request:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response Success (200) - Sin 2FA:**
```json
{
  "success": true,
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response Success (200) - Con 2FA requerido:**
```json
{
  "success": true,
  "requires2FA": true,
  "message": "Se requiere verificación de 2FA",
  "email": "user@example.com"
}
```

**Response Error:**
```json
{
  "success": false,
  "message": "Credenciales inválidas"
}
```

---

### 3. POST /verify-2fa

Verifica el código 2FA y retorna un JWT.

**Request:**
```json
{
  "email": "string",
  "code": "string (6 dígitos)"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Verificación 2FA exitosa",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response Error:**
```json
{
  "success": false,
  "message": "Código de 2FA inválido"
}
```

---

### 4. POST /logout

Cierra la sesión del usuario.

**Headers:**
```
Authorization: Bearer <token>
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Sesión cerrada exitosamente"
}
```

**Response Error:**
```json
{
  "success": false,
  "message": "Token inválido o expirado"
}
```

---

### 5. GET /verify

Verifica que el token sea válido y retorna datos del usuario.

**Headers:**
```
Authorization: Bearer <token>
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Token válido",
  "user": {
    "id_usuario": 123,
    "email": "user@example.com",
    "nombre_usuario": "john",
    "apellido_paterno": "doe",
    "apellido_materno": "smith"
  }
}
```

**Response Error:**
```json
{
  "success": false,
  "message": "Token inválido o expirado"
}
```

---

### 6. POST /forgot-password

Inicia el proceso de recuperación de contraseña.

**Request:**
```json
{
  "email": "string"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Si el email existe, recibirá instrucciones para resetear la contraseña"
}
```

**Nota**: Por seguridad, el endpoint siempre retorna success=true incluso si el email no existe.

---

### 7. POST /reset-password

Resetea la contraseña usando el token enviado por email.

**Request:**
```json
{
  "token": "string (enviado por email)",
  "newPassword": "string (mín. 8 caracteres)"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Contraseña actualizada exitosamente"
}
```

**Response Error:**
```json
{
  "success": false,
  "message": "Token inválido o expirado"
}
```

---

### 8. POST /toggle-2fa

Habilita o deshabilita la autenticación de dos factores.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "enable": "boolean"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Autenticación 2FA habilitada",
  "has_2fa": true
}
```

**Response Error:**
```json
{
  "success": false,
  "message": "Token inválido o expirado"
}
```

---

### 9. POST /change-password

Cambia la contraseña del usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "currentPassword": "string",
  "newPassword": "string (mín. 8 caracteres)"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Contraseña actualizada exitosamente"
}
```

**Response Error:**
```json
{
  "success": false,
  "message": "Contraseña actual es incorrecta"
}
```

---

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | OK - Operación exitosa |
| 201 | Created - Recurso creado exitosamente |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - Credenciales inválidas o token expirado |
| 403 | Forbidden - Acceso denegado |
| 404 | Not Found - Recurso no encontrado |
| 405 | Method Not Allowed - Método HTTP no permitido |
| 409 | Conflict - El recurso ya existe |
| 500 | Internal Server Error - Error del servidor |

## Autenticación con JWT

Los endpoints protegidos requieren un token JWT en el header `Authorization`:

```
Authorization: Bearer <token>
```

El token tiene una duración de **24 horas**.

## Variables de Entorno Requeridas

```env
JWT_SECRET=your-secret-key-change-in-production
NEXT_PUBLIC_APP_URL=http://localhost:3000
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password
SMTP_FROM=noreply@example.com
```

## Ejemplos de Uso

### Registrar un usuario
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_usuario": "john",
    "email": "john@example.com",
    "password_hash": "mypassword123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "mypassword123"
  }'
```

### Verificar token
```bash
curl -X GET http://localhost:3000/api/auth/verify \
  -H "Authorization: Bearer <token>"
```

### Cambiar contraseña
```bash
curl -X POST http://localhost:3000/api/auth/change-password \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "currentPassword": "oldpassword",
    "newPassword": "newpassword123"
  }'
```
