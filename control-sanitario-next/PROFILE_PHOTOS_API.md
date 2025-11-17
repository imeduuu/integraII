# 📸 Fotos de Perfil - Endpoints API

## Descripción General

Sistema completo para manejar fotos de perfil de usuarios:
- **Upload**: Subir o reemplazar foto de perfil
- **Get**: Obtener foto de un usuario
- **Delete**: Eliminar foto de perfil

---

## 🔐 Endpoints Implementados

### 1. POST `/api/profile/photo/upload`
**Sube o reemplaza la foto de perfil del usuario autenticado**

#### Requiere Autenticación
- Header: `Authorization: Bearer <JWT_TOKEN>`

#### Request (Content-Type: application/json)
```json
{
  "fileBase64": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "fileName": "mi_foto.png",
  "mimeType": "image/png"
}
```

#### Response (Éxito - 200)
```json
{
  "success": true,
  "message": "Foto de perfil actualizada exitosamente",
  "foto_url": "data:image/png;base64,iVBORw0KGgo...",
  "id_usuario": 5
}
```

#### Response (Error - 400/401/404)
```json
{
  "success": false,
  "message": "El archivo es muy grande (máximo 5MB)" | "Token inválido"
}
```

#### Validaciones
- ✅ Token JWT requerido y válido
- ✅ Usuario debe existir en BD
- ✅ Solo imágenes (JPEG, PNG, GIF, WebP)
- ✅ Tamaño máximo 5MB
- ✅ Reemplaza foto anterior automáticamente

---

### 2. GET `/api/profile/photo/:id`
**Obtiene la foto de perfil de un usuario**

#### Parámetros
- `id` (URL): ID del usuario (no requiere autenticación)

#### Request
```
GET /api/profile/photo/5
```

#### Response (Éxito - 200)
```json
{
  "success": true,
  "message": "Foto de perfil obtenida exitosamente",
  "foto_perfil": "data:image/png;base64,iVBORw0KGgo...",
  "usuario": {
    "id_usuario": 5,
    "nombre_usuario": "Juan",
    "email": "juan@ejemplo.com"
  }
}
```

#### Response (Error - 404)
```json
{
  "success": false,
  "message": "Este usuario no tiene foto de perfil"
}
```

#### Validaciones
- ✅ ID usuario debe ser válido (número)
- ✅ Usuario debe existir
- ✅ No requiere autenticación (público)

---

### 3. DELETE `/api/profile/photo/delete`
**Elimina la foto de perfil del usuario autenticado**

#### Requiere Autenticación
- Header: `Authorization: Bearer <JWT_TOKEN>`

#### Request
```
DELETE /api/profile/photo/delete
```

#### Response (Éxito - 200)
```json
{
  "success": true,
  "message": "Foto de perfil eliminada exitosamente",
  "id_usuario": 5
}
```

#### Response (Error - 401/404)
```json
{
  "success": false,
  "message": "Token inválido" | "El usuario no tiene foto de perfil"
}
```

#### Validaciones
- ✅ Token JWT requerido y válido
- ✅ Usuario debe existir
- ✅ Usuario debe tener foto para eliminar

---

## 🧪 Ejemplos de Uso

### Ejemplo 1: Upload de Foto (PowerShell)

```powershell
# Leer imagen y convertir a base64
$imagePath = "C:\Users\usuario\Desktop\foto.jpg"
$imageBytes = [System.IO.File]::ReadAllBytes($imagePath)
$base64String = [Convert]::ToBase64String($imageBytes)

# Preparar request
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
$body = @{
  fileBase64 = $base64String
  fileName = "foto.jpg"
  mimeType = "image/jpeg"
} | ConvertTo-Json

# Hacer request
Invoke-RestMethod -Method Post `
  -Uri "http://localhost:3001/api/profile/photo/upload" `
  -Headers @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
  } `
  -Body $body
```

### Ejemplo 2: Obtener Foto (GET)

```powershell
# Obtener foto de usuario con ID 5
Invoke-RestMethod -Method Get `
  -Uri "http://localhost:3001/api/profile/photo/5"
```

### Ejemplo 3: Eliminar Foto (DELETE)

```powershell
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

Invoke-RestMethod -Method Delete `
  -Uri "http://localhost:3001/api/profile/photo/delete" `
  -Headers @{
    "Authorization" = "Bearer $token"
  }
```

---

## 💾 Almacenamiento

### Opción Actual: Base64 en BD
- Foto guardada como `data:image/png;base64,<contenido>`
- Ventaja: No requiere filesystem
- Desventaja: Aumenta tamaño de BD
- Máximo: 5MB por imagen

### Alternativa: Filesystem
Puedes modificar los endpoints para guardar en:
```
public/uploads/profiles/{id_usuario}_{timestamp}.jpg
```

---

## 🔐 Seguridad

- **Autenticación**: JWT requerido para upload/delete
- **Validación tipo**: Solo imágenes permitidas
- **Límite tamaño**: 5MB máximo
- **MIME types**: JPEG, PNG, GIF, WebP
- **Autorización**: Solo puedes modificar tu propia foto

---

## 📊 Campos en BD

Agregado a tabla `usuario`:
```sql
foto_perfil VARCHAR(500) NULL
```

Almacena:
- `data:image/jpeg;base64,<contenido>` (base64)
- O ruta: `/uploads/profiles/user_5.jpg` (filesystem)
- O NULL si no hay foto

---

## 🛠️ Próximos Pasos

### Mejoras Opcionales
- [ ] Comprimir imágenes antes de guardar
- [ ] Generar thumbnails
- [ ] Cambiar a almacenamiento en S3/CDN
- [ ] Caché de fotos (Redis)
- [ ] Validar dimensiones mínimas
- [ ] Crop/resize de imagen

### Integración Frontend
- [ ] Componente React para upload
- [ ] Preview de imagen
- [ ] Drag & drop
- [ ] Progreso de upload

---

## ✅ Checklist

- [x] Endpoint upload implementado
- [x] Endpoint get implementado
- [x] Endpoint delete implementado
- [x] Validaciones en backend
- [x] Documentación completada
- [ ] Tests automatizados
- [ ] Componente React frontend
- [ ] Migración Prisma ejecutada

---

**Última actualización**: 17 Nov 2025 ✅
**Estado**: Endpoints listos para usar

