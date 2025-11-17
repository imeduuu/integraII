# 🔐 GUÍA RÁPIDA - AUTENTICACIÓN LOGIN/REGISTER

## Estado: ✅ COMPLETAMENTE IMPLEMENTADO

Tu sistema de autenticación ahora funciona correctamente con:
- Backend real (Node.js + Prisma + PostgreSQL)
- Validaciones completas
- Contraseñas seguras (bcrypt)
- JWT tokens
- Frontend integrado

---

## 🚀 Probar Ahora Mismo

### Opción 1: Desde la Web (Recomendado)

1. **Inicia el servidor**
   ```powershell
   npm run dev
   ```

2. **Abre en navegador**
   - Registrate: `http://localhost:3001/register`
   - Login: `http://localhost:3001/login`

3. **Prueba el flujo completo**
   - Rellena el formulario de registro
   - Verás el resultado en tiempo real
   - Luego intenta hacer login con esas credenciales
   - El token se guardará en `localStorage`

---

### Opción 2: Con Script PowerShell (Automatizado)

```powershell
cd "C:\Users\domin\OneDrive\Desktop\animal\integraII\control-sanitario-next"
powershell -ExecutionPolicy Bypass -File test-auth-api.ps1
```

**Qué hace:**
- ✅ Prueba GET endpoints (instrucciones)
- ✅ Registra un usuario nuevo
- ✅ Intenta login con ese usuario
- ✅ Prueba error con credenciales inválidas
- ✅ Muestra tokens y respuestas en color

---

### Opción 3: Peticiones Manuales con curl

**Registrar usuario:**
```bash
curl -X POST "http://localhost:3001/api/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"nombre_usuario\":\"Juan\",\"apellido_paterno\":\"Perez\",\"email\":\"juan@test.com\",\"password\":\"Test123456\"}"
```

**Hacer login:**
```bash
curl -X POST "http://localhost:3001/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"juan@test.com\",\"password\":\"Test123456\"}"
```

---

## 📊 Flujo Completo

```
REGISTRO                           LOGIN
├─ Formulario registro    ────────> ├─ Formulario login
├─ POST /api/auth/register        ├─ POST /api/auth/login
├─ Valida & crea en BD            ├─ Valida credenciales
├─ Retorna ID usuario             ├─ Retorna JWT token
├─ Toast éxito                     ├─ Guarda en localStorage
└─ Listo para login                └─ Redirige a home
```

---

## 🔍 Qué Valida el Backend

### En REGISTER
- ✅ Email único (no puede repetirse)
- ✅ Formato email válido
- ✅ Contraseña mínimo 6 caracteres
- ✅ Nombre usuario requerido
- ✅ Contraseña hasheada con bcrypt

### En LOGIN
- ✅ Usuario existe en BD
- ✅ Usuario está activo
- ✅ Contraseña es correcta (bcrypt compare)
- ✅ Genera JWT válido (24h expiry)
- ✅ Actualiza fecha último login

---

## 💾 Dónde Se Guarda El Token

### En el Frontend
```typescript
localStorage.setItem('token', result.token);
localStorage.setItem('email', data.email);
```

El token contiene: `id_usuario`, `email`, `iat`, `exp`

---

## 📝 Ejemplos de Respuestas

### ✅ Registro Exitoso
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "id": 5
}
```

### ✅ Login Exitoso
```json
{
  "success": true,
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### ❌ Credenciales Inválidas
```json
{
  "success": false,
  "message": "Credenciales inválidas"
}
```

---

## 🛡️ Seguridad

- Contraseñas: bcryptjs (10 salt rounds)
- JWT: HS256, 24h expiry
- Validaciones backend y frontend
- Tokens guardados en localStorage
- HTTPS recomendado en producción

---

## ✅ Checklist

- [x] Endpoints `/api/auth/register` y `/api/auth/login` funcionan
- [x] Páginas de registro y login visibles
- [x] Token se guarda en localStorage
- [x] Validaciones en backend
- [x] Contraseñas hasheadas
- [x] Script de pruebas disponible

---

**Última actualización**: 17 Nov 2025 ✅
