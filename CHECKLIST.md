# ✅ Checklist de Despliegue a Vercel

## Pre-Despliegue

### Código

- [x] Proyecto compilado sin errores (`pnpm build`)
- [x] CORS habilitado en `src/app.ts`
- [x] Archivo `api/index.ts` creado para Vercel
- [x] `vercel.json` configurado correctamente
- [x] `.gitignore` actualizado (excluye `.env`, `.vercel`)
- [x] Dependencias actualizadas en `package.json`

### Documentación

- [x] `DEPLOYMENT.md` - Guía completa de despliegue
- [x] `VERCEL_READY.md` - Resumen de cambios
- [x] `README.md` y `README.es.md` actualizados
- [x] `.env.production.example` con template de variables
- [x] Scripts de despliegue (`deploy.sh`, `deploy.ps1`)

### Git

- [ ] Código commiteado
- [ ] Push a GitHub realizado
- [ ] Rama `main` actualizada

## Configuración de Base de Datos

### Seleccionar Proveedor

- [ ] **Vercel Postgres** (Recomendado para principiantes)
- [ ] **Neon** (https://neon.tech - Gratis, 10GB)
- [ ] **Supabase** (https://supabase.com - Gratis + Auth)
- [ ] **Railway** (https://railway.app - Gratis con límites)

### Obtener Connection String

- [ ] Database creada
- [ ] Connection string copiado
- [ ] Verificar que incluye `?sslmode=require`
- [ ] Ejemplo: `postgresql://user:pass@host:5432/db?sslmode=require`

## Configuración en Vercel

### Importar Proyecto

- [ ] Login en https://vercel.com
- [ ] Click "Add New..." → "Project"
- [ ] Repositorio importado
- [ ] Framework: **Other**
- [ ] Root directory: `./` (o carpeta específica si es monorepo)

### Variables de Entorno

- [ ] `DATABASE_URL` agregado
- [ ] `NODE_ENV` = `production`
- [ ] Variables verificadas

### Deploy

- [ ] Click en "Deploy"
- [ ] Build exitoso (sin errores)
- [ ] Deployment completado
- [ ] URL del proyecto copiada

## Post-Despliegue

### Verificación

- [ ] Health check funciona: `GET https://tu-proyecto.vercel.app/`
- [ ] Endpoint géneros: `GET https://tu-proyecto.vercel.app/genres`
- [ ] Endpoint actores: `GET https://tu-proyecto.vercel.app/actors`
- [ ] Endpoint directores: `GET https://tu-proyecto.vercel.app/directors`
- [ ] Endpoint películas: `GET https://tu-proyecto.vercel.app/movies`

### Testing con Frontend

- [ ] Variable `VITE_API_URL` actualizada en frontend
- [ ] Frontend puede hacer requests al backend
- [ ] CORS funciona correctamente
- [ ] Operaciones CRUD funcionan

### Monitoreo

- [ ] Logs verificados en Vercel Dashboard
- [ ] No hay errores en consola
- [ ] Database conectada correctamente
- [ ] Auto-deploy configurado

## Comandos Útiles

### Testing Local

```bash
# Verificar que todo funciona localmente
pnpm dev

# Compilar
pnpm build

# Probar versión compilada
pnpm start
```

### Testing Producción

```bash
# Health check
curl https://tu-proyecto.vercel.app/

# Obtener géneros (debe devolver array, aunque esté vacío)
curl https://tu-proyecto.vercel.app/genres

# Crear género (probar POST)
curl -X POST https://tu-proyecto.vercel.app/genres \
  -H "Content-Type: application/json" \
  -d '{"name": "Action"}'
```

### Vercel CLI

```bash
# Ver logs en tiempo real
vercel logs

# Listar deployments
vercel ls

# Ver detalles
vercel inspect
```

## Troubleshooting

### ❌ Error: "Database connection failed"

- [ ] Verificar `DATABASE_URL` en Vercel Dashboard
- [ ] Asegurar que incluye `?sslmode=require`
- [ ] Verificar que la base de datos permite conexiones SSL
- [ ] Revisar que las credenciales son correctas

### ❌ Error: "Module not found"

- [ ] Ejecutar `pnpm install` localmente
- [ ] Verificar que todas las dependencias están en `package.json`
- [ ] Asegurar que `api/index.ts` existe
- [ ] Verificar que `vercel.json` apunta a `api/index.ts`

### ❌ Error: "Function timeout"

- [ ] Optimizar queries de base de datos
- [ ] Agregar índices en tablas grandes
- [ ] Considerar upgrade a Vercel Pro (60s timeout)

### ❌ CORS Error en Frontend

- [ ] Verificar que `cors` está habilitado en `src/app.ts`
- [ ] Usar URL correcta del backend (sin barra final)
- [ ] Verificar que el frontend usa HTTPS si el backend usa HTTPS

### ❌ Error: "Build failed"

- [ ] Revisar logs de build en Vercel
- [ ] Verificar que `pnpm build` funciona localmente
- [ ] Asegurar que `tsconfig.json` es correcto
- [ ] Verificar que no hay errores de TypeScript

## Recursos

### Documentación

- 📖 [DEPLOYMENT.md](./DEPLOYMENT.md) - Guía completa
- 📖 [VERCEL_READY.md](./VERCEL_READY.md) - Resumen de cambios
- 📖 [Vercel Docs](https://vercel.com/docs)
- 📖 [Vercel Node.js](https://vercel.com/docs/functions/runtimes/node-js)

### Bases de Datos

- 🗄️ [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- 🗄️ [Neon](https://neon.tech/docs/introduction)
- 🗄️ [Supabase](https://supabase.com/docs)
- 🗄️ [Railway](https://docs.railway.app/)

### Soporte

- 💬 [Vercel Community](https://github.com/vercel/vercel/discussions)
- 💬 [Vercel Support](https://vercel.com/support)
- 📊 [Vercel Status](https://www.vercel-status.com/)

## 🎉 ¡Éxito!

Si todos los items están marcados, tu API está desplegada correctamente en Vercel.

**URL de tu API:** `https://_____________________.vercel.app`

**Próximos pasos:**

1. Conectar tu frontend
2. Poblar la base de datos con datos iniciales
3. Configurar dominio personalizado (opcional)
4. Configurar monitoring y alertas
5. Agregar autenticación (opcional)

---

**Recuerda:** Auto-deploy está activado. Cada push a `main` desplegará automáticamente.

```bash
git add .
git commit -m "feat: your changes"
git push origin main
# Vercel desplegará automáticamente
```
