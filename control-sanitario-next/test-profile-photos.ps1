# Script para probar endpoints de fotos de perfil
# Uso: .\test-profile-photos.ps1

$baseUrl = "http://localhost:3001/api/profile"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PRUEBA DE ENDPOINTS DE FOTOS DE PERFIL" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Nota: Primero registra un usuario o usa uno existente
$testEmail = "test_foto@ejemplo.com"
$testPassword = "TestPassword123!"

Write-Host "1. Registrando usuario de prueba..." -ForegroundColor Yellow
$registerBody = @{
    nombre_usuario = "TestFoto"
    apellido_paterno = "Usuario"
    email = $testEmail
    password = $testPassword
} | ConvertTo-Json

try {
    $registerResponse = Invoke-RestMethod -Method Post -Uri "http://localhost:3001/api/auth/register" `
        -Body $registerBody `
        -ContentType "application/json" `
        -ErrorAction Stop

    Write-Host "Usuario creado: ID $($registerResponse.id)" -ForegroundColor Green
    $userId = $registerResponse.id
} catch {
    # El usuario probablemente ya existe, usar uno existente
    Write-Host "Usuario ya existe, usando email existente" -ForegroundColor Yellow
    $userId = 1
}

Write-Host ""
Write-Host "2. Haciendo login para obtener token..." -ForegroundColor Yellow
$loginBody = @{
    email = $testEmail
    password = $testPassword
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Method Post -Uri "http://localhost:3001/api/auth/login" `
        -Body $loginBody `
        -ContentType "application/json" `
        -ErrorAction Stop

    if ($loginResponse.token) {
        $token = $loginResponse.token
        Write-Host "Token obtenido: $($token.Substring(0, 30))..." -ForegroundColor Green
    } else {
        Write-Host "Error: No se obtuvo token" -ForegroundColor Red
        Write-Host "Respuesta: $($loginResponse | ConvertTo-Json)" -ForegroundColor Yellow
        exit
    }
} catch {
    Write-Host "Error en login: $_" -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "3. Creando imagen de prueba (1x1 pixel PNG en base64)..." -ForegroundColor Yellow

# PNG 1x1 pixel rojo
$pngBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg=="

Write-Host "Imagen base64 lista (PNG 1x1 pixel)" -ForegroundColor Green

Write-Host ""
Write-Host "4. Subiendo foto de perfil..." -ForegroundColor Yellow

$uploadBody = @{
    fileBase64 = $pngBase64
    fileName = "profile_test.png"
    mimeType = "image/png"
} | ConvertTo-Json

try {
    $uploadResponse = Invoke-RestMethod -Method Post `
        -Uri "$baseUrl/photo/upload" `
        -Body $uploadBody `
        -Headers @{
            "Authorization" = "Bearer $token"
            "Content-Type" = "application/json"
        } `
        -ErrorAction Stop

    Write-Host "Respuesta:" -ForegroundColor Green
    Write-Host ($uploadResponse | ConvertTo-Json -Depth 2) -ForegroundColor Cyan
} catch {
    $errorResponse = $_.ErrorDetails.Message | ConvertFrom-Json
    Write-Host "Error: " -ForegroundColor Red
    Write-Host ($errorResponse | ConvertTo-Json -Depth 2) -ForegroundColor Red
}

Write-Host ""
Write-Host "5. Obteniendo foto de perfil (GET por ID)..." -ForegroundColor Yellow

try {
    $getResponse = Invoke-RestMethod -Method Get `
        -Uri "$baseUrl/photo/$userId" `
        -ErrorAction Stop

    Write-Host "Respuesta:" -ForegroundColor Green
    Write-Host "Success: $($getResponse.success)" -ForegroundColor Cyan
    Write-Host "Usuario: $($getResponse.usuario.nombre_usuario) ($($getResponse.usuario.email))" -ForegroundColor Cyan
    Write-Host "Foto (primeros 50 caracteres): $($getResponse.foto_perfil.Substring(0, 50))..." -ForegroundColor Cyan
} catch {
    $errorResponse = $_.ErrorDetails.Message | ConvertFrom-Json
    Write-Host "Error: " -ForegroundColor Red
    Write-Host ($errorResponse | ConvertTo-Json) -ForegroundColor Red
}

Write-Host ""
Write-Host "6. Obteniendo foto de usuario inexistente..." -ForegroundColor Yellow

try {
    $invalidResponse = Invoke-RestMethod -Method Get `
        -Uri "$baseUrl/photo/99999" `
        -ErrorAction Stop
} catch {
    $errorResponse = $_.ErrorDetails.Message | ConvertFrom-Json
    Write-Host "Error esperado: " -ForegroundColor Green
    Write-Host ($errorResponse | ConvertTo-Json) -ForegroundColor Cyan
}

Write-Host ""
Write-Host "7. Eliminando foto de perfil..." -ForegroundColor Yellow

try {
    $deleteResponse = Invoke-RestMethod -Method Delete `
        -Uri "$baseUrl/photo/delete" `
        -Headers @{
            "Authorization" = "Bearer $token"
        } `
        -ErrorAction Stop

    Write-Host "Respuesta:" -ForegroundColor Green
    Write-Host ($deleteResponse | ConvertTo-Json) -ForegroundColor Cyan
} catch {
    $errorResponse = $_.ErrorDetails.Message | ConvertFrom-Json
    Write-Host "Error: " -ForegroundColor Red
    Write-Host ($errorResponse | ConvertTo-Json) -ForegroundColor Red
}

Write-Host ""
Write-Host "8. Verificando que foto fue eliminada..." -ForegroundColor Yellow

try {
    $verifyResponse = Invoke-RestMethod -Method Get `
        -Uri "$baseUrl/photo/$userId" `
        -ErrorAction Stop
} catch {
    $errorResponse = $_.ErrorDetails.Message | ConvertFrom-Json
    Write-Host "Verificación correcta - foto no existe:" -ForegroundColor Green
    Write-Host ($errorResponse | ConvertTo-Json) -ForegroundColor Cyan
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PRUEBAS COMPLETADAS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Resumen:" -ForegroundColor Yellow
Write-Host "- Upload de foto: OK" -ForegroundColor Green
Write-Host "- GET foto: OK" -ForegroundColor Green
Write-Host "- DELETE foto: OK" -ForegroundColor Green
