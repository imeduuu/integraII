# Script para probar endpoints de auth (login y register)
$baseUrl = "http://localhost:3001/api/auth"
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$testEmail = "test_$timestamp@ejemplo.com"
$testPassword = "TestPassword123!"
$testUsername = "TestUser_$timestamp"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PRUEBA DE ENDPOINTS DE AUTH" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Prueba GET en login
Write-Host "1. Probando GET en /api/auth/login" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Method Get -Uri "$baseUrl/login" -ContentType "application/json" -ErrorAction Stop
    Write-Host "Respuesta:" -ForegroundColor Green
    Write-Host ($response | ConvertTo-Json -Depth 3) -ForegroundColor Cyan
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""

# 2. Prueba GET en register
Write-Host "2. Probando GET en /api/auth/register" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Method Get -Uri "$baseUrl/register" -ContentType "application/json" -ErrorAction Stop
    Write-Host "Respuesta:" -ForegroundColor Green
    Write-Host ($response | ConvertTo-Json -Depth 3) -ForegroundColor Cyan
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""

# 3. Registrar un nuevo usuario
Write-Host "3. Registrando nuevo usuario..." -ForegroundColor Yellow
Write-Host "   Email: $testEmail" -ForegroundColor Gray
Write-Host "   Usuario: $testUsername" -ForegroundColor Gray
$registerSuccess = $false
try {
    $registerBody = @{
        nombre_usuario = $testUsername
        apellido_paterno = "Test"
        email = $testEmail
        password = $testPassword
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Method Post -Uri "$baseUrl/register" `
        -Body $registerBody `
        -ContentType "application/json" `
        -ErrorAction Stop

    Write-Host "Registro exitoso:" -ForegroundColor Green
    Write-Host ($response | ConvertTo-Json -Depth 3) -ForegroundColor Cyan
    $registerSuccess = $true
} catch {
    Write-Host "Error en registro: $_" -ForegroundColor Red
}
Write-Host ""

# 4. Intentar login con las credenciales registradas
if ($registerSuccess) {
    Write-Host "4. Intentando login..." -ForegroundColor Yellow
    try {
        $loginBody = @{
            email = $testEmail
            password = $testPassword
        } | ConvertTo-Json

        $loginResponse = Invoke-RestMethod -Method Post -Uri "$baseUrl/login" `
            -Body $loginBody `
            -ContentType "application/json" `
            -ErrorAction Stop

        Write-Host "Login exitoso:" -ForegroundColor Green
        Write-Host ($loginResponse | ConvertTo-Json -Depth 3) -ForegroundColor Cyan

        if ($loginResponse.token) {
            Write-Host "Token obtenido correctamente" -ForegroundColor Green
        }
    } catch {
        Write-Host "Error en login: $_" -ForegroundColor Red
    }
}
Write-Host ""

# 5. Probar login con credenciales invalidas
Write-Host "5. Probando login con credenciales invalidas..." -ForegroundColor Yellow
try {
    $invalidLoginBody = @{
        email = "invalid@ejemplo.com"
        password = "wrongpassword"
    } | ConvertTo-Json

    $invalidResponse = Invoke-RestMethod -Method Post -Uri "$baseUrl/login" `
        -Body $invalidLoginBody `
        -ContentType "application/json" `
        -ErrorAction Stop
} catch {
    $errorResponse = $_.ErrorDetails.Message | ConvertFrom-Json
    Write-Host "Error esperado:" -ForegroundColor Green
    Write-Host ($errorResponse | ConvertTo-Json -Depth 3) -ForegroundColor Cyan
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PRUEBAS COMPLETADAS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
