# start-servers.ps1
# Script para levantar Backend y Frontend de NeonPulse Salon

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  INICIANDO NEONPULSE SALON - HITO 2" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que estamos en el directorio correcto
if (-not (Test-Path "backend") -or -not (Test-Path "frontend")) {
    Write-Host "ERROR: No se encuentran las carpetas backend y frontend" -ForegroundColor Red
    Write-Host "Asegurate de ejecutar este script desde la raiz del proyecto" -ForegroundColor Yellow
    Write-Host "Ejemplo: C:\laragon\www\neonpulse-salon\" -ForegroundColor Yellow
    exit 1
}

# Obtener la ruta actual
$CurrentPath = Get-Location

# Iniciar Backend en una nueva ventana
Write-Host "Iniciando BACKEND (puerto 3000)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$CurrentPath\backend'; Write-Host 'BACKEND SERVER' -ForegroundColor Green; Write-Host '=================' -ForegroundColor Green; Write-Host ''; npm run dev" -WindowStyle Normal

# Esperar 2 segundos para que el backend comience
Start-Sleep -Seconds 2

# Iniciar Frontend en una nueva ventana
Write-Host "Iniciando FRONTEND (puerto 5173)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$CurrentPath\frontend'; Write-Host 'FRONTEND SERVER' -ForegroundColor Yellow; Write-Host '=================' -ForegroundColor Yellow; Write-Host ''; npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "SERVIDORES INICIADOS CORRECTAMENTE" -ForegroundColor Green
Write-Host ""
Write-Host "ACCESOS:" -ForegroundColor Cyan
Write-Host "   Backend:  http://localhost:3000" -ForegroundColor White
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "COMANDOS UTILES:" -ForegroundColor Cyan
Write-Host "   Health Check: http://localhost:3000/health" -ForegroundColor White
Write-Host "   API Servicios: http://localhost:3000/api/servicios" -ForegroundColor White
Write-Host ""
Write-Host "Presiona Ctrl+C en cada ventana para detener el servidor" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Presiona cualquier tecla para cerrar esta ventana..."
Read-Host