#!/bin/bash
# Script de despliegue rápido a Vercel

echo "🚀 Desplegando Movies API Backend a Vercel..."
echo ""

# Verificar que estamos en la rama correcta
BRANCH=$(git branch --show-current)
echo "📍 Rama actual: $BRANCH"
echo ""

# Verificar cambios sin commitear
if [[ -n $(git status -s) ]]; then
    echo "⚠️  Tienes cambios sin commitear. ¿Deseas continuar? (y/n)"
    read -r response
    if [[ "$response" != "y" ]]; then
        echo "❌ Despliegue cancelado"
        exit 1
    fi
    
    echo "💾 Commiteando cambios..."
    git add .
    git commit -m "feat: prepare for vercel deployment"
fi

# Push a GitHub
echo "📤 Pusheando a GitHub..."
git push origin $BRANCH

echo ""
echo "✅ Código subido a GitHub!"
echo ""
echo "📋 Próximos pasos:"
echo ""
echo "1. Ve a https://vercel.com y haz login"
echo "2. Click en 'Add New...' → 'Project'"
echo "3. Importa tu repositorio: movies-app-backend"
echo "4. Framework Preset: Other"
echo "5. Configura variables de entorno:"
echo "   - DATABASE_URL: postgresql://user:pass@host:5432/db?sslmode=require"
echo "   - NODE_ENV: production"
echo "6. Click 'Deploy'"
echo ""
echo "💡 Necesitas una base de datos PostgreSQL. Opciones:"
echo "   - Vercel Postgres: https://vercel.com/docs/storage/vercel-postgres"
echo "   - Neon (Gratis): https://neon.tech"
echo "   - Supabase (Gratis): https://supabase.com"
echo ""
echo "📖 Para más detalles, consulta: DEPLOYMENT.md"
echo ""
