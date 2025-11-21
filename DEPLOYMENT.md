# Despliegue en Vercel - Movies API Backend

## 📝 Guía de Despliegue

### 1. Preparar Base de Datos PostgreSQL

Vercel no incluye base de datos. Necesitas usar un servicio externo como:

#### Opción A: Vercel Postgres (Recomendado)

1. Ve a tu proyecto en Vercel Dashboard
2. Pestaña "Storage" → "Create Database" → "Postgres"
3. Copia el `POSTGRES_URL` que se genera automáticamente

#### Opción B: Neon (Gratis)

1. Regístrate en [neon.tech](https://neon.tech)
2. Crea un nuevo proyecto
3. Copia el connection string (DATABASE_URL)

#### Opción C: Supabase (Gratis)

1. Regístrate en [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Ve a Settings → Database
4. Copia el connection string en modo "URI"

#### Opción D: Railway (Gratis con límites)

1. Regístrate en [railway.app](https://railway.app)
2. New Project → Provision PostgreSQL
3. Copia el DATABASE_URL

### 2. Desplegar en Vercel

#### Método 1: Desde GitHub (Recomendado)

1. **Sube tu código a GitHub:**

   ```bash
   git add .
   git commit -m "feat: prepare for vercel deployment"
   git push origin main
   ```

2. **Importa en Vercel:**

   - Ve a [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Importa tu repositorio de GitHub
   - Framework Preset: **Other**
   - Root Directory: `./` (o si es monorepo, la carpeta del backend)

3. **Configura Variables de Entorno:**
   En la sección "Environment Variables", agrega:

   ```env
   DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
   NODE_ENV=production
   ```

4. **Deploy:**
   - Click "Deploy"
   - Espera a que termine el build (2-3 minutos)
   - Tu API estará disponible en: `https://tu-proyecto.vercel.app`

#### Método 2: Desde CLI de Vercel

1. **Instala Vercel CLI:**

   ```bash
   pnpm add -g vercel
   ```

2. **Login:**

   ```bash
   vercel login
   ```

3. **Despliega:**

   ```bash
   vercel
   ```

4. **Configura variables de entorno:**

   ```bash
   vercel env add DATABASE_URL
   # Pega tu connection string cuando te lo pida

   vercel env add NODE_ENV
   # Escribe: production
   ```

5. **Despliega a producción:**
   ```bash
   vercel --prod
   ```

### 3. Verificar Despliegue

Una vez desplegado, prueba estos endpoints:

```bash
# Health check
curl https://tu-proyecto.vercel.app/

# Obtener géneros
curl https://tu-proyecto.vercel.app/genres

# Obtener películas
curl https://tu-proyecto.vercel.app/movies
```

### 4. Variables de Entorno Requeridas

| Variable       | Descripción                  | Ejemplo                                               |
| -------------- | ---------------------------- | ----------------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db?sslmode=require` |
| `NODE_ENV`     | Entorno de ejecución         | `production`                                          |

### 5. Configuración de CORS para Frontend

El backend ahora tiene CORS habilitado para todos los orígenes (`origin: "*"`).

Si quieres restringir a tu frontend específico, edita `src/app.ts`:

```typescript
app.use(
  cors({
    origin: "https://tu-frontend.vercel.app",
  })
);
```

O múltiples orígenes:

```typescript
app.use(
  cors({
    origin: [
      "https://tu-frontend.vercel.app",
      "http://localhost:5173", // para desarrollo local
    ],
  })
);
```

### 6. Conectar Frontend

En tu frontend, actualiza la variable de entorno:

```env
# .env o .env.production
VITE_API_URL=https://tu-proyecto-backend.vercel.app
```

### 7. Auto-Deploy en Git Push

Vercel detecta automáticamente los push a tu rama principal y despliega:

```bash
git add .
git commit -m "feat: add new feature"
git push origin main
# Vercel desplegará automáticamente
```

### 8. Comandos Útiles de Vercel CLI

```bash
# Ver logs en tiempo real
vercel logs

# Ver lista de despliegues
vercel ls

# Ver detalles del proyecto
vercel inspect

# Eliminar un despliegue
vercel remove [deployment-url]
```

### 9. Troubleshooting

#### Error: "Database connection failed"

- Verifica que `DATABASE_URL` esté correctamente configurado
- Asegúrate de que incluye `?sslmode=require` al final
- Verifica que la base de datos permita conexiones SSL

#### Error: "Module not found"

- Ejecuta `pnpm install` localmente
- Verifica que todas las dependencias estén en `package.json`, no solo en `devDependencies`
- Asegúrate de que `vercel.json` apunte a `api/index.ts`

#### Error: "Function timeout"

- Vercel Free tiene límite de 10 segundos
- Optimiza consultas de base de datos
- Considera upgrade a Vercel Pro si necesitas más tiempo

#### CORS Error en Frontend

- Verifica que `cors` esté habilitado en `src/app.ts`
- Usa la URL correcta del backend (sin barra final)

### 10. Monitoreo y Logs

1. **Ver logs:**

   - Vercel Dashboard → Tu proyecto → Deployments → Click en deployment → "Logs"

2. **Métricas:**
   - Vercel Dashboard → Tu proyecto → Analytics
   - Ver requests, errores, performance

### 11. Límites del Plan Gratuito

- ✅ 100 GB bandwidth/mes
- ✅ Deployments ilimitados
- ✅ Serverless Functions: 100 GB-Hrs
- ✅ 10 segundos máximo por función
- ❌ No incluye base de datos (usa servicio externo)

### 12. Tips de Optimización

1. **Caché de queries:**

   ```typescript
   // Agregar caché a queries frecuentes
   app.get("/genres", async (req, res) => {
     res.set("Cache-Control", "public, max-age=300"); // 5 min
     // ... tu código
   });
   ```

2. **Índices en base de datos:**

   ```sql
   CREATE INDEX idx_movies_name ON movies(name);
   CREATE INDEX idx_movies_year ON movies(release_year);
   ```

3. **Lazy loading de relaciones:**
   ```typescript
   // Solo incluir relaciones cuando sean necesarias
   Movie.findAll({ include: req.query.include ? [...] : undefined })
   ```

### 13. Seguridad

1. **Variables sensibles:**

   - NUNCA subas `.env` a GitHub
   - Usa Vercel Environment Variables
   - Rota credenciales periódicamente

2. **Rate limiting:**

   ```bash
   pnpm add express-rate-limit
   ```

   ```typescript
   import rateLimit from "express-rate-limit";

   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutos
     max: 100, // límite de requests
   });

   app.use("/api/", limiter);
   ```

## ✅ Checklist Final

- [ ] Código en GitHub
- [ ] Base de datos PostgreSQL configurada
- [ ] Variables de entorno en Vercel
- [ ] Primer deploy exitoso
- [ ] Health check funciona: `GET /`
- [ ] Endpoints funcionan: `GET /movies`, `GET /genres`, etc.
- [ ] CORS configurado correctamente
- [ ] Frontend conectado y funcionando
- [ ] Auto-deploy configurado

## 📞 Soporte

Si tienes problemas:

1. Revisa los logs en Vercel Dashboard
2. Verifica variables de entorno
3. Consulta [Vercel Docs](https://vercel.com/docs)
4. Revisa [Vercel Status](https://www.vercel-status.com/)

---

**¡Listo! Tu API está ahora en producción en Vercel** 🚀
