# Script de despliegue rápido a Vercel (Windows)

Write-Host "🚀 Desplegando Movies API Backend a Vercel..." -ForegroundColor Green
Write-Host ""

# Verificar que estamos en la rama correcta
$branch = git branch --show-current
Write-Host "📍 Rama actual: $branch" -ForegroundColor Cyan
Write-Host ""

# Verificar cambios sin commitear
$status = git status -s
if ($status) {
    Write-Host "⚠️  Tienes cambios sin commitear. ¿Deseas continuar? (y/n)" -ForegroundColor Yellow
    $response = Read-Host
    if ($response -ne "y") {
        Write-Host "❌ Despliegue cancelado" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "💾 Commiteando cambios..." -ForegroundColor Cyan
    git add .
    git commit -m "feat: prepare for vercel deployment"
}

# Push a GitHub
Write-Host "📤 Pusheando a GitHub..." -ForegroundColor Cyan
git push origin $branch

Write-Host ""
Write-Host "✅ Código subido a GitHub!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Ve a https://vercel.com y haz login"
Write-Host "2. Click en 'Add New...' → 'Project'"
Write-Host "3. Importa tu repositorio: movies-app-backend"
Write-Host "4. Framework Preset: Other"
Write-Host "5. Configura variables de entorno:"
Write-Host "   - DATABASE_URL: postgresql://user:pass@host:5432/db?sslmode=require"
Write-Host "   - NODE_ENV: production"
Write-Host "6. Click 'Deploy'"
Write-Host ""
Write-Host "💡 Necesitas una base de datos PostgreSQL. Opciones:" -ForegroundColor Cyan
Write-Host "   - Vercel Postgres: https://vercel.com/docs/storage/vercel-postgres"
Write-Host "   - Neon (Gratis): https://neon.tech"
Write-Host "   - Supabase (Gratis): https://supabase.com"
Write-Host ""
Write-Host "📖 Para más detalles, consulta: DEPLOYMENT.md" -ForegroundColor Cyan
Write-Host ""
