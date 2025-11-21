# Despliegue en Dokploy

Esta guía te ayudará a desplegar tu aplicación Movies API en Dokploy.

## 📋 Requisitos Previos

- Cuenta en Dokploy
- Repositorio Git (GitHub, GitLab, etc.) con el código
- Acceso a tu panel de Dokploy

## 🚀 Pasos de Despliegue

### 1. Preparar el Repositorio

Asegúrate de que estos archivos estén en tu repositorio:

- ✅ `Dockerfile` - Configuración de Docker
- ✅ `.dockerignore` - Archivos a excluir del build
- ✅ `docker-compose.prod.yml` - Configuración de producción con PostgreSQL
- ✅ `.env.production.example` - Plantilla de variables de entorno

### 2. Crear Proyecto en Dokploy

1. Accede a tu panel de Dokploy
2. Haz clic en **"Create New Project"**
3. Asigna un nombre (ej: `movies-api`)

### 3. Configurar el Servicio

#### Opción A: Despliegue con Docker Compose (Recomendado)

1. Selecciona **"Docker Compose"**
2. Conecta tu repositorio Git
3. Selecciona el branch (ej: `main`)
4. Especifica el archivo: `docker-compose.prod.yml`

#### Opción B: Despliegue con Dockerfile Simple

1. Selecciona **"Dockerfile"**
2. Conecta tu repositorio Git
3. Selecciona el branch (ej: `main`)
4. Dokploy detectará automáticamente el `Dockerfile`

### 4. Configurar Variables de Entorno

En la sección de **Environment Variables** de Dokploy, agrega:

```env
NODE_ENV=production
PORT=3000

# Base de datos PostgreSQL
DB_HOST=postgres
DB_PORT=5432
DB_NAME=movies_db
DB_USER=tu_usuario_db
DB_PASSWORD=tu_password_seguro

# O usa DATABASE_URL si prefieres (sobrescribe las anteriores)
DATABASE_URL=postgresql://user:password@host:5432/movies_db
```

### 5. Configurar la Base de Datos

#### Si usas Docker Compose:
- PostgreSQL se creará automáticamente como servicio
- Usa `DB_HOST=postgres` (nombre del servicio)

#### Si usas Dockerfile solo:
1. En Dokploy, ve a **"Databases"**
2. Crea un nuevo servicio PostgreSQL
3. Copia la URL de conexión
4. Úsala en `DATABASE_URL` o configura las variables individuales

### 6. Configurar Puerto y Dominio

1. En **Port Mappings**, mapea el puerto `3000`
2. Dokploy asignará un dominio automáticamente
3. Opcionalmente configura tu dominio personalizado

### 7. Desplegar

1. Haz clic en **"Deploy"**
2. Dokploy ejecutará:
   - Build de la imagen Docker
   - Creación de contenedores
   - Inicio de servicios
   - Health checks

### 8. Sincronizar la Base de Datos

Una vez desplegado, necesitas sincronizar las tablas:

**Opción 1: Ejecutar comando en el contenedor**
```bash
docker exec -it movies_api pnpm db:sync
```

**Opción 2: Desde Dokploy Console**
1. Ve al servicio desplegado
2. Abre la **Terminal/Console**
3. Ejecuta: `pnpm db:sync`

### 9. Verificar el Despliegue

Visita los siguientes endpoints:

- `https://tu-dominio.dokploy.app/health` - Health check
- `https://tu-dominio.dokploy.app/` - API info
- `https://tu-dominio.dokploy.app/genres` - Test endpoint

## 🔧 Configuración Adicional

### Auto-Deploy en Push

Dokploy puede redesplegar automáticamente cuando hagas push:

1. Ve a **Settings** del proyecto
2. Activa **"Auto Deploy"**
3. Cada push al branch configurado activará un redespliegue

### Logs y Monitoreo

- **Logs**: Ve a la sección "Logs" en Dokploy para ver logs en tiempo real
- **Métricas**: Revisa CPU, memoria y tráfico en el dashboard

### Escalado

Si necesitas más recursos:
1. Ve a **Settings** → **Resources**
2. Ajusta CPU y memoria asignada
3. Guarda y redespliega

## 🐛 Troubleshooting

### Error de Conexión a Base de Datos

- Verifica que las variables de entorno estén correctas
- Asegúrate de que el servicio PostgreSQL esté corriendo
- Revisa los logs: `docker logs movies_api`

### Puerto ya en uso

- Cambia el puerto externo en Dokploy
- Asegúrate de que la variable `PORT` coincida

### Build falla

- Revisa los logs de build en Dokploy
- Verifica que `pnpm-lock.yaml` esté en el repo
- Asegúrate de que todas las dependencias estén en `package.json`

## 📚 Recursos

- [Documentación de Dokploy](https://docs.dokploy.com)
- [Dockerfile Reference](https://docs.docker.com/engine/reference/builder/)
- [PostgreSQL en Docker](https://hub.docker.com/_/postgres)

## 🔄 Actualizar el Despliegue

Para actualizar tu aplicación:

1. Haz commit y push de tus cambios
2. Si tienes auto-deploy activado, se desplegará automáticamente
3. Si no, ve a Dokploy y haz clic en **"Redeploy"**

---

¡Tu Movies API estará lista en minutos! 🎬
