# Implementación de Autenticación - Login y Register

## Estado Actual ✅

Ambos endpoints **login** y **register** están completamente implementados con validaciones reales en backend.

---

## 📋 Endpoints Disponibles

### 1. POST `/api/auth/register`
**Registra un nuevo usuario en la base de datos**

#### Request
```json
{
  "nombre_usuario": "string (requerido, min 3 caracteres)",
  "apellido_paterno": "string (opcional)",
  "email": "string (requerido, formato válido)",
  "password": "string (requerido, min 6 caracteres)"
}
```

#### Response (Éxito - 201)
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "id": 5
}
```

#### Response (Error - 400/409)
```json
{
  "success": false,
  "message": "El email ya está registrado" | "Faltan campos requeridos"
}
```

#### Validaciones Backend
- ✅ Email único (valida contra BD)
- ✅ Formato de email válido
- ✅ Campos requeridos presentes
- ✅ Contraseña hasheada con bcrypt (salt rounds: 10)
- ✅ Usuario creado como activo por defecto
- ✅ Rol asignado como usuario estándar (id_rol: 1)

---

### 2. POST `/api/auth/login`
**Autentica usuario y retorna JWT token**

#### Request
```json
{
  "email": "string (requerido)",
  "password": "string (requerido)"
}
```

#### Response (Éxito - 200)
```json
{
  "success": true,
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Response (Error - 400/401/403)
```json
{
  "success": false,
  "message": "Credenciales inválidas" | "Usuario desactivado" | "Email y contraseña son requeridos"
}
```

#### Validaciones Backend
- ✅ Usuario existe en BD
- ✅ Usuario está activo
- ✅ Contraseña coincide (bcrypt.compare)
- ✅ JWT generado correctamente (24h expiry)
- ✅ Fecha de último login actualizada

---

## 🔐 Seguridad

### Contraseñas
- Hash: `bcryptjs` con 10 salt rounds
- Nunca se devuelve la contraseña en respuestas
- Comparación segura con `bcrypt.compare()`

### JWT
- Algoritmo: HS256
- Expiración: 24 horas
- Secret: `process.env.JWT_SECRET` (cambiar en producción)
- Payload incluye: `id_usuario`, `email`, `iat`, `exp`

### Validación HTTP
- Solo acepta `POST`
- Rechaza `GET` con mensaje instructivo (200)
- Rechaza otros métodos con 405

---

## 📱 Frontend Integration

### Páginas Actualizadas
- `src/pages/register.tsx` - Formulario con integración API
- `src/pages/login.tsx` - Formulario con integración API

### Flujo de Registro
1. Usuario completa formulario
2. Submit → POST `/api/auth/register` con JSON
3. Backend valida y crea usuario en BD
4. Respuesta con ID de usuario o error
5. Toast notification muestra resultado

### Flujo de Login
1. Usuario completa formulario
2. Submit → POST `/api/auth/login` con JSON
3. Backend valida credenciales
4. Si OK: retorna JWT token
5. Frontend guarda token en localStorage
6. Redirige a home tras 1 segundo

### Almacenamiento Token
```typescript
localStorage.setItem('token', result.token);
localStorage.setItem('email', data.email);
```

---

## 🧪 Pruebas

### Script Automático
Ejecutar pruebas completas:
```powershell
cd "C:\Users\domin\OneDrive\Desktop\animal\integraII\control-sanitario-next"
powershell -ExecutionPolicy Bypass -File test-auth-api.ps1
```

### Pruebas Manuales

#### 1. Ver instrucciones (GET)
```powershell
Invoke-RestMethod -Method Get -Uri "http://localhost:3001/api/auth/login"
```

#### 2. Registrar usuario
```powershell
$body = @{
  nombre_usuario = "Juan"
  apellido_paterno = "Pérez"
  email = "juan@ejemplo.com"
  password = "MiPassword123"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "http://localhost:3001/api/auth/register" `
  -Body $body -ContentType "application/json"
```

#### 3. Hacer login
```powershell
$body = @{
  email = "juan@ejemplo.com"
  password = "MiPassword123"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "http://localhost:3001/api/auth/login" `
  -Body $body -ContentType "application/json"
```

---

## 🛠️ Próximos Pasos (Opcionales)

### Mejoras Futuras
- [ ] Implementar 2FA (Two-Factor Authentication)
- [ ] Email de verificación de cuenta
- [ ] Recuperación de contraseña
- [ ] Refresh tokens
- [ ] Rate limiting para login
- [ ] Auditoría de intentos de login fallidos
- [ ] Integración con Google OAuth
- [ ] Cambio de contraseña

---

## 📚 Archivos Relacionados

```
src/pages/api/auth/
├── login.ts          ← Endpoint login completamente funcional
├── register.ts       ← Endpoint register completamente funcional
├── logout.ts         
├── verify.ts         
├── change-password.ts
├── forgot-password.ts
└── reset-password.ts

src/pages/
├── login.tsx         ← Formulario login con API integration
└── register.tsx      ← Formulario register con API integration

src/utils/
└── jwtUtils.ts       ← Utilidades JWT (generar, verificar tokens)

test-auth-api.ps1    ← Script de pruebas automatizadas
```

---

## ✅ Verificación

Última actualización: 17 Nov 2025

- [x] Endpoint `/api/auth/register` implementado
- [x] Endpoint `/api/auth/login` implementado
- [x] Validaciones backend completas
- [x] JWT token generado correctamente
- [x] Páginas frontend integradas con API
- [x] Script de pruebas creado
- [x] Documentación completada

