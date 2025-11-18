# 📸 IMPLEMENTACIÓN DE FOTOS DE PERFIL - GUÍA DE INSTALACIÓN

## ✅ Archivos Creados

### Backend Endpoints
```
src/pages/api/profile/photo/
├── upload.ts     - POST /api/profile/photo/upload
├── index.ts      - GET /api/profile/photo/:id
└── delete.ts     - DELETE /api/profile/photo/delete
```

### Documentación
- `PROFILE_PHOTOS_API.md` - Documentación detallada de endpoints
- `test-profile-photos.ps1` - Script de pruebas

---

## 🚀 Pasos de Instalación

### Paso 1: Actualizar Schema de Prisma
El archivo `prisma/schema.prisma` ya fue actualizado con:
```prisma
foto_perfil String? @db.VarChar(500)  // Agregado al modelo usuario
```

### Paso 2: Ejecutar Migración de Prisma

```powershell
cd "C:\Users\domin\OneDrive\Desktop\animal\integraII\control-sanitario-next"

# Generar cliente Prisma actualizado
npx prisma generate

# Ejecutar migración (crear tabla en BD)
npx prisma migrate dev --name add_profile_photo
```

**Nota**: Si la migración falla porque el campo ya existe, ejecuta:
```powershell
npx prisma db push
```

### Paso 3: Reiniciar Servidor Dev

```powershell
npm run dev
```

---

## 🧪 Probar Endpoints

### Opción 1: Script Automatizado
```powershell
powershell -ExecutionPolicy Bypass -File test-profile-photos.ps1
```

### Opción 2: Peticiones Manuales

#### A) Registrar Usuario
```powershell
$body = @{
  nombre_usuario = "Juan"
  email = "juan@test.com"
  password = "Test123456"
} | ConvertTo-Json

$reg = Invoke-RestMethod -Method Post -Uri "http://localhost:3001/api/auth/register" `
  -Body $body -ContentType "application/json"

Write-Host "Usuario ID: $($reg.id)"
```

#### B) Hacer Login
```powershell
$body = @{
  email = "juan@test.com"
  password = "Test123456"
} | ConvertTo-Json

$login = Invoke-RestMethod -Method Post -Uri "http://localhost:3001/api/auth/login" `
  -Body $body -ContentType "application/json"

$token = $login.token
Write-Host "Token: $token"
```

#### C) Subir Foto
```powershell
# Leer imagen
$imageBytes = [System.IO.File]::ReadAllBytes("C:\ruta\foto.jpg")
$base64 = [Convert]::ToBase64String($imageBytes)

$uploadBody = @{
  fileBase64 = $base64
  fileName = "mi_foto.jpg"
  mimeType = "image/jpeg"
} | ConvertTo-Json

$upload = Invoke-RestMethod -Method Post `
  -Uri "http://localhost:3001/api/profile/photo/upload" `
  -Headers @{ "Authorization" = "Bearer $token" } `
  -Body $uploadBody `
  -ContentType "application/json"

Write-Host "Upload exitoso: $($upload.message)"
```

#### D) Obtener Foto
```powershell
$get = Invoke-RestMethod -Method Get `
  -Uri "http://localhost:3001/api/profile/photo/1"

Write-Host "Foto obtenida"
Write-Host "Usuario: $($get.usuario.nombre_usuario)"
```

#### E) Eliminar Foto
```powershell
$delete = Invoke-RestMethod -Method Delete `
  -Uri "http://localhost:3001/api/profile/photo/delete" `
  -Headers @{ "Authorization" = "Bearer $token" }

Write-Host "Foto eliminada: $($delete.message)"
```

---

## 📊 Estructura de Datos

### En Base de Datos
```sql
-- Campo agregado a tabla usuario
ALTER TABLE usuario ADD COLUMN foto_perfil VARCHAR(500);

-- Ejemplo de contenido
UPDATE usuario SET foto_perfil = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABA...' WHERE id_usuario = 1;
```

### En API Response
```json
{
  "success": true,
  "message": "Foto de perfil actualizada exitosamente",
  "foto_url": "data:image/jpeg;base64,/9j/4AAQSkZJRgABA...",
  "id_usuario": 5
}
```

---

## 🔐 Seguridad

### Validaciones Implementadas
- ✅ Autenticación JWT para upload/delete
- ✅ Validación de tipo MIME (solo imágenes)
- ✅ Límite de tamaño (5MB máximo)
- ✅ Validación de ID usuario (GET)

### Tipos Permitidos
- image/jpeg (JPG)
- image/png (PNG)
- image/gif (GIF)
- image/webp (WebP)

---

## 🛠️ Solución de Problemas

### Error: "Cannot find module 'fs'"
```
Solución: Este es un módulo built-in de Node.js, no requiere instalación
```

### Error: "Prisma Client not generated"
```powershell
npx prisma generate
```

### Error: "Column 'foto_perfil' does not exist"
```powershell
npx prisma migrate dev --name add_profile_photo
# O
npx prisma db push
```

### Error: "Token inválido"
```
Asegúrate de:
1. Enviar header: Authorization: Bearer <token>
2. El token no está expirado (24h expiry)
3. El JWT_SECRET en .env es correcto
```

### Error: "El archivo es muy grande"
```
Máximo permitido: 5MB
Si necesitas imágenes más grandes, comprime antes de enviar
```

---

## 📝 Notas Importantes

### Base64 en BD
- Las imágenes se guardan como base64 en la BD
- Ventaja: No requiere filesystem
- Desventaja: Aumenta tamaño de BD
- Para 100 usuarios con fotos: ~50MB de BD

### Alternativa: Filesystem
Si prefieres guardar en archivos:
1. Reemplaza `foto_perfil` en schema por una ruta
2. Crea carpeta `public/uploads/profiles/`
3. Guarda archivo en servidor

---

## ✅ Checklist de Instalación

- [ ] `npx prisma generate` ejecutado
- [ ] `npx prisma migrate dev` ejecutado
- [ ] Servidor reiniciado (`npm run dev`)
- [ ] Script `test-profile-photos.ps1` ejecutado exitosamente
- [ ] Foto subida correctamente
- [ ] Foto recuperada correctamente
- [ ] Foto eliminada correctamente

---

## 📚 Endpoints Resumidos

```
POST   /api/profile/photo/upload     - Subir/actualizar foto (autenticado)
GET    /api/profile/photo/:id        - Obtener foto por ID usuario (público)
DELETE /api/profile/photo/delete     - Eliminar foto (autenticado)
```

---

**Última actualización**: 17 Nov 2025  
**Estado**: Listos para instalar y probar ✅

