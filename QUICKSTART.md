# 🚀 INICIO RÁPIDO - Desplegar en Vercel en 5 Minutos

## Paso 1: Subir a GitHub (1 min)

```bash
git add .
git commit -m "feat: ready for vercel"
git push origin main
```

## Paso 2: Crear Base de Datos (2 min)

### Opción Recomendada: Neon (Gratis)

1. Ve a https://neon.tech
2. Sign Up con GitHub
3. Click "Create a project"
4. Nombre: `movies-db`
5. **Copia el connection string** (empieza con `postgresql://...`)

> Ejemplo: `postgresql://user:pass@ep-xxx.region.aws.neon.tech/movies?sslmode=require`

## Paso 3: Desplegar en Vercel (2 min)

1. Ve a https://vercel.com
2. Login con GitHub
3. Click "Add New..." → "Project"
4. Selecciona tu repo `movies-app-backend`
5. Framework Preset: **Other**
6. **Agrega Variables de Entorno:**
   - `DATABASE_URL`: Pega el connection string de Neon
   - `NODE_ENV`: Escribe `production`
7. Click **"Deploy"**
8. Espera 2-3 minutos ⏳

## ¡Listo! 🎉

Tu API está en línea en: `https://tu-proyecto.vercel.app`

### Probar tu API

```bash
# Health check
curl https://tu-proyecto.vercel.app/

# Crear un género
curl -X POST https://tu-proyecto.vercel.app/genres \
  -H "Content-Type: application/json" \
  -d '{"name": "Action"}'

# Ver géneros
curl https://tu-proyecto.vercel.app/genres
```

## Conectar con Frontend

En tu frontend, actualiza el `.env`:

```env
VITE_API_URL=https://tu-proyecto.vercel.app
```

---

## 🆘 ¿Problemas?

### Error de conexión a base de datos

- Verifica que copiaste el connection string completo
- Debe incluir `?sslmode=require` al final

### Error de CORS en frontend

- CORS ya está habilitado, verifica que uses la URL correcta
- No agregues `/` al final de la URL

### Build failed

- Revisa los logs en Vercel Dashboard
- Asegúrate de que `pnpm build` funciona localmente

---

## 📚 Más Información

- **[CHECKLIST.md](./CHECKLIST.md)** - Checklist completo
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Guía detallada
- **[VERCEL_READY.md](./VERCEL_READY.md)** - Resumen técnico

## 🔄 Auto-Deploy

Cada vez que hagas push a `main`, Vercel desplegará automáticamente:

```bash
git add .
git commit -m "feat: new feature"
git push origin main
# ✨ Vercel despliega automáticamente
```

## 💡 Tips

### Ver logs en tiempo real

```bash
vercel logs --follow
```

### Eliminar deployment

Vercel Dashboard → Deployments → Click en los 3 puntos → Delete

### Dominio personalizado

Vercel Dashboard → Settings → Domains → Add Domain

---

**¡Felicitaciones! Tu API está en producción** 🚀
