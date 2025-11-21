# 🚨 SOLUCIÓN A ERROR 500 - Vercel Deployment

## ✅ Cambios Aplicados

1. ✅ Agregado `.npmrc` para configurar pnpm correctamente
2. ✅ Simplificado `api/index.ts` para usar imports directos
3. ✅ Removido script `vercel-build` problemático
4. ✅ Instalado `@vercel/node` como devDependency

## 🔧 Configuración Requerida en Vercel

### 1. Variables de Entorno (CRÍTICO)

Ve a tu proyecto en Vercel Dashboard → Settings → Environment Variables

**Variables REQUERIDAS:**

```env
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
NODE_ENV=production
```

**⚠️ IMPORTANTE:**

- El `DATABASE_URL` DEBE incluir `?sslmode=require` al final
- Si no tienes base de datos configurada, ese es el problema

### 2. Opciones de Base de Datos

#### Opción A: Vercel Postgres (Más Fácil)

1. En tu proyecto Vercel → Storage tab
2. Create Database → Postgres
3. Vercel configurará `DATABASE_URL` automáticamente

#### Opción B: Neon (Gratis)

1. Ve a https://neon.tech
2. Create New Project
3. Copia el connection string
4. Agrégalo como `DATABASE_URL` en Vercel

#### Opción C: Supabase (Gratis)

1. Ve a https://supabase.com
2. New Project
3. Settings → Database → Connection String (URI mode)
4. Agrégalo como `DATABASE_URL` en Vercel

### 3. Verificar Build Settings

En Vercel Dashboard → Settings → General:

- **Framework Preset:** Other
- **Build Command:** (dejar vacío o `pnpm build`)
- **Output Directory:** (dejar vacío)
- **Install Command:** `pnpm install`
- **Node Version:** 18.x o 20.x

### 4. Re-deployar

Después de configurar las variables de entorno:

1. Ve a Deployments tab
2. Click en los 3 puntos del último deployment
3. Click "Redeploy"

O simplemente push a GitHub:

```bash
git commit --allow-empty -m "trigger rebuild"
git push origin main
```

## 🐛 Troubleshooting

### Si aún ves "Please install pg package manually"

Esto significa que pnpm no está instalando las dependencias correctamente.

**Solución:**

1. Ve a Vercel Dashboard → Project Settings
2. Environment Variables → Add
3. Agrega: `NPM_FLAGS=--legacy-peer-deps`

### Si ves "Database connection failed"

**Causas comunes:**

- ❌ `DATABASE_URL` no configurado en Vercel
- ❌ Connection string sin `?sslmode=require`
- ❌ Base de datos no acepta conexiones SSL
- ❌ Credenciales incorrectas

**Verificar:**

```bash
# Probar connection string localmente
psql "postgresql://user:pass@host:5432/db?sslmode=require"
```

### Si ves "Function timeout"

El timeout de Vercel Free es 10 segundos.

**Solución:**

- Optimizar queries de base de datos
- Remover `sequelize.sync()` en producción
- Usar migraciones en su lugar

### Si ves "Module not found"

**Solución:**

```bash
# Localmente
rm -rf node_modules pnpm-lock.yaml
pnpm install
git add pnpm-lock.yaml
git commit -m "fix: update lockfile"
git push
```

## 📊 Verificar Deployment

Una vez desplegado exitosamente:

```bash
# Health check
curl https://tu-proyecto.vercel.app/

# Debería devolver:
{
  "message": "Movies API",
  "version": "1.0.0",
  "endpoints": {...}
}
```

## 🆘 Si Nada Funciona

1. **Revisa los logs en tiempo real:**

   ```bash
   vercel logs tu-proyecto --follow
   ```

2. **Verifica las variables de entorno:**

   - Vercel Dashboard → Settings → Environment Variables
   - Asegúrate de que `DATABASE_URL` esté configurado

3. **Re-crea el proyecto:**

   - A veces Vercel cachea configuración incorrecta
   - Delete el proyecto en Vercel
   - Vuelve a importar desde GitHub

4. **Prueba localmente con las mismas variables:**

   ```bash
   # En .env local
   DATABASE_URL=tu_connection_string_de_vercel
   NODE_ENV=production

   # Probar
   pnpm dev
   ```

## ✅ Checklist Final

- [ ] Variables de entorno configuradas en Vercel
- [ ] `DATABASE_URL` incluye `?sslmode=require`
- [ ] Base de datos PostgreSQL creada y accesible
- [ ] Build completa sin errores
- [ ] Logs no muestran errores de conexión
- [ ] Endpoint raíz responde: `curl https://tu-proyecto.vercel.app/`

---

**Si sigues teniendo problemas, comparte:**

1. Los logs completos del deployment
2. Las variables de entorno que configuraste (sin valores sensibles)
3. El mensaje de error específico
