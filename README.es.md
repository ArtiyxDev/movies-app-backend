# API Backend de Películas

Una API RESTful para gestionar películas, actores, directores y géneros construida con Express, TypeScript y Sequelize.

## 🚀 Características

- **Operaciones CRUD completas** para Géneros, Actores, Directores y Películas
- **Relaciones muchos-a-muchos** entre películas y géneros/actores/directores
- **TypeScript** para seguridad de tipos
- **Sequelize ORM** con PostgreSQL
- **Diseño de API RESTful**
- **CORS habilitado** para integración con frontend
- **Bien documentado** con comentarios en línea

## 📋 Prerrequisitos

- Node.js (v16 o superior)
- Base de datos PostgreSQL
- Gestor de paquetes pnpm

## 🛠️ Instalación

1. Clonar el repositorio:

```bash
git clone <url-del-repositorio>
cd movies-app-backend
```

2. Instalar dependencias:

```bash
pnpm install
```

3. Crear un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

4. Configurar las variables de entorno en `.env`:

```env
PORT=3000
NODE_ENV=development

# Desarrollo local
DB_HOST=localhost
DB_PORT=5432
DB_NAME=movies_db
DB_USER=postgres
DB_PASSWORD=tu_contraseña

# Producción (Render.com proporcionará esto)
# DATABASE_URL=postgres://usuario:contraseña@host:puerto/base_de_datos
```

## 🏃 Ejecutar la Aplicación

### Modo Desarrollo

```bash
pnpm dev
```

### Modo Producción

```bash
pnpm build
pnpm start
```

### Sincronizar Base de Datos (Desarrollo)

Para crear/actualizar las tablas de la base de datos:

```bash
pnpm db:sync
```

## 📚 Documentación de la API

URL Base: `http://localhost:3000`

### Géneros

| Método | Endpoint      | Descripción               | Body                   |
| ------ | ------------- | ------------------------- | ---------------------- |
| GET    | `/genres`     | Obtener todos los géneros | -                      |
| GET    | `/genres/:id` | Obtener género por ID     | -                      |
| POST   | `/genres`     | Crear género              | `{ "name": "Action" }` |
| PUT    | `/genres/:id` | Actualizar género         | `{ "name": "Action" }` |
| DELETE | `/genres/:id` | Eliminar género           | -                      |

### Actores

| Método | Endpoint      | Descripción               | Body      |
| ------ | ------------- | ------------------------- | --------- |
| GET    | `/actors`     | Obtener todos los actores | -         |
| GET    | `/actors/:id` | Obtener actor por ID      | -         |
| POST   | `/actors`     | Crear actor               | Ver abajo |
| PUT    | `/actors/:id` | Actualizar actor          | Ver abajo |
| DELETE | `/actors/:id` | Eliminar actor            | -         |

**Body de Actor:**

```json
{
  "first_name": "Leonardo",
  "last_name": "DiCaprio",
  "nationality": "American",
  "image": "https://example.com/image.jpg",
  "birthday": "1974-11-11"
}
```

### Directores

| Método | Endpoint         | Descripción                  | Body      |
| ------ | ---------------- | ---------------------------- | --------- |
| GET    | `/directors`     | Obtener todos los directores | -         |
| GET    | `/directors/:id` | Obtener director por ID      | -         |
| POST   | `/directors`     | Crear director               | Ver abajo |
| PUT    | `/directors/:id` | Actualizar director          | Ver abajo |
| DELETE | `/directors/:id` | Eliminar director            | -         |

**Body de Director:**

```json
{
  "first_name": "Christopher",
  "last_name": "Nolan",
  "nationality": "British",
  "image": "https://example.com/image.jpg",
  "birthday": "1970-07-30"
}
```

### Películas

| Método | Endpoint                | Descripción                                                  | Body        |
| ------ | ----------------------- | ------------------------------------------------------------ | ----------- |
| GET    | `/movies`               | Obtener todas las películas con géneros, actores, directores | -           |
| GET    | `/movies/:id`           | Obtener película por ID                                      | -           |
| POST   | `/movies`               | Crear película                                               | Ver abajo   |
| PUT    | `/movies/:id`           | Actualizar película                                          | Ver abajo   |
| DELETE | `/movies/:id`           | Eliminar película                                            | -           |
| POST   | `/movies/:id/genres`    | Asignar géneros a la película                                | `[1, 2, 3]` |
| POST   | `/movies/:id/actors`    | Asignar actores a la película                                | `[1, 2, 3]` |
| POST   | `/movies/:id/directors` | Asignar directores a la película                             | `[1, 2]`    |

**Body de Película:**

```json
{
  "name": "Inception",
  "image": "https://example.com/inception.jpg",
  "synopsis": "Un ladrón que roba secretos corporativos...",
  "release_year": 2010
}
```

**Asignando Relaciones:**

Los endpoints POST para géneros, actores y directores esperan un array de IDs:

```json
[1, 2, 3]
```

Estos endpoints:

- Reemplazan todas las asociaciones existentes
- Retornan la lista actualizada de elementos asociados

## 🌐 Esquema de Base de Datos

### Tablas

**genres (géneros)**

- id (PK)
- name
- createdAt
- updatedAt

**actors (actores)**

- id (PK)
- first_name
- last_name
- nationality
- image
- birthday
- createdAt
- updatedAt

**directors (directores)**

- id (PK)
- first_name
- last_name
- nationality
- image
- birthday
- createdAt
- updatedAt

**movies (películas)**

- id (PK)
- name
- image
- synopsis
- release_year
- createdAt
- updatedAt

**Tablas de Unión:**

- movie_genres (movie_id, genre_id)
- movie_actors (movie_id, actor_id)
- movie_directors (movie_id, director_id)

## 🚢 Despliegue en Render.com

### 1. Crear una Base de Datos PostgreSQL

1. Ir a [Render.com](https://render.com)
2. Hacer clic en "New +" → "PostgreSQL"
3. Configurar la base de datos:
   - Nombre: `movies-db`
   - Región: Elegir la más cercana a tus usuarios
   - Plan: El nivel gratuito está bien para pruebas
4. Hacer clic en "Create Database"
5. Copiar la **URL de Base de Datos Interna**

### 2. Crear Servicio Web

1. Hacer clic en "New +" → "Web Service"
2. Conectar tu repositorio de GitHub
3. Configurar:

   - **Nombre:** `movies-api`
   - **Región:** La misma que la base de datos
   - **Branch:** `main`
   - **Root Directory:** `movies-app-backend` (si está en un monorepo)
   - **Environment:** `Node`
   - **Build Command:** `pnpm install && pnpm build`
   - **Start Command:** `pnpm start`
   - **Plan:** Gratuito

4. Agregar Variables de Entorno:

   - `NODE_ENV`: `production`
   - `DATABASE_URL`: Pegar la URL de Base de Datos Interna del paso 1

5. Hacer clic en "Create Web Service"

### 3. Auto-Despliegue en Git Push

Render despliega automáticamente cuando haces push a tu rama conectada.

### 4. Probar tu API

Una vez desplegada, tu API estará disponible en:

```
https://nombre-de-tu-servicio.onrender.com
```

Probar el endpoint de salud:

```bash
curl https://nombre-de-tu-servicio.onrender.com
```

## 📝 Ejemplo de Uso

### Crear una Película Completa

1. Crear géneros:

```bash
POST /genres
{ "name": "Sci-Fi" }
# Retorna: { "id": 1, "name": "Sci-Fi" }
```

2. Crear actores:

```bash
POST /actors
{
  "first_name": "Leonardo",
  "last_name": "DiCaprio",
  "nationality": "American",
  "image": "https://example.com/leo.jpg",
  "birthday": "1974-11-11"
}
# Retorna: { "id": 1, ... }
```

3. Crear directores:

```bash
POST /directors
{
  "first_name": "Christopher",
  "last_name": "Nolan",
  "nationality": "British",
  "image": "https://example.com/nolan.jpg",
  "birthday": "1970-07-30"
}
# Retorna: { "id": 1, ... }
```

4. Crear película:

```bash
POST /movies
{
  "name": "Inception",
  "image": "https://example.com/inception.jpg",
  "synopsis": "Un ladrón que roba secretos corporativos a través de tecnología de sueños compartidos...",
  "release_year": 2010
}
# Retorna: { "id": 1, ... }
```

5. Asociar géneros:

```bash
POST /movies/1/genres
[1]
# Retorna: [{ "id": 1, "name": "Sci-Fi" }]
```

6. Asociar actores:

```bash
POST /movies/1/actors
[1]
# Retorna: [{ "id": 1, "first_name": "Leonardo", ... }]
```

7. Asociar directores:

```bash
POST /movies/1/directors
[1]
# Retorna: [{ "id": 1, "first_name": "Christopher", ... }]
```

8. Obtener película completa:

```bash
GET /movies/1
# Retorna la película con todos sus géneros, actores y directores
```

## 🔧 Estructura del Proyecto

```
movies-app-backend/
├── src/
│   ├── config/
│   │   └── database.ts          # Configuración de base de datos
│   ├── controllers/
│   │   ├── actorController.ts   # Lógica CRUD de actores
│   │   ├── directorController.ts # Lógica CRUD de directores
│   │   ├── genreController.ts   # Lógica CRUD de géneros
│   │   └── movieController.ts   # Lógica CRUD de películas + asociaciones
│   ├── models/
│   │   ├── Actor.ts             # Modelo de Actor
│   │   ├── Director.ts          # Modelo de Director
│   │   ├── Genre.ts             # Modelo de Género
│   │   ├── Movie.ts             # Modelo de Película
│   │   └── index.ts             # Asociaciones de modelos
│   ├── routes/
│   │   ├── actorRoutes.ts       # Rutas de actores
│   │   ├── directorRoutes.ts    # Rutas de directores
│   │   ├── genreRoutes.ts       # Rutas de géneros
│   │   ├── movieRoutes.ts       # Rutas de películas
│   │   └── index.ts             # Agregación de rutas
│   ├── scripts/
│   │   └── syncDatabase.ts      # Script de sincronización de BD
│   ├── app.ts                   # Configuración de la app Express
│   └── index.ts                 # Punto de entrada del servidor
├── .env.example                 # Plantilla de variables de entorno
├── .gitignore                   # Reglas de Git ignore
├── package.json                 # Dependencias
├── tsconfig.json                # Configuración de TypeScript
└── README.md                    # Este archivo
```

## 🧪 Pruebas con el Frontend

Para conectar con el frontend proporcionado:

1. Iniciar el backend:

```bash
pnpm dev
```

2. En el archivo `.env` del frontend:

```env
VITE_API_URL=http://localhost:3000
```

3. Iniciar el frontend y probar todas las operaciones CRUD

## ⚙️ Variables de Entorno

| Variable       | Descripción                     | Por Defecto   |
| -------------- | ------------------------------- | ------------- |
| `PORT`         | Puerto del servidor             | `3000`        |
| `NODE_ENV`     | Modo de entorno                 | `development` |
| `DB_HOST`      | Host de la base de datos        | `localhost`   |
| `DB_PORT`      | Puerto de la base de datos      | `5432`        |
| `DB_NAME`      | Nombre de la base de datos      | `movies_db`   |
| `DB_USER`      | Usuario de la base de datos     | `postgres`    |
| `DB_PASSWORD`  | Contraseña de la base de datos  | -             |
| `DATABASE_URL` | URL completa de BD (producción) | -             |

## 📄 Licencia

ISC

## 👤 Autor

Tu Nombre

---

**Nota:** Esta API sigue las mejores prácticas REST e incluye manejo adecuado de errores, validación y tipos TypeScript para mantenibilidad.
