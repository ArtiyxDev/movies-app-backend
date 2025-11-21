# Movies API Backend

A RESTful API for managing movies, actors, directors, and genres built with Express, TypeScript, and Sequelize.

## 🚀 Features

- **Complete CRUD operations** for Genres, Actors, Directors, and Movies
- **Many-to-many relationships** between movies and genres/actors/directors
- **TypeScript** for type safety
- **Sequelize ORM** with PostgreSQL
- **RESTful API** design
- **CORS enabled** for frontend integration
- **Well-documented** with inline comments

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- pnpm package manager

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd movies-app-backend
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:

```env
PORT=3000
NODE_ENV=development

# Local development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=movies_db
DB_USER=postgres
DB_PASSWORD=your_password

# Production (Render.com will provide this)
# DATABASE_URL=postgres://user:password@host:port/database
```

## 🏃 Running the Application

### Development Mode

```bash
pnpm dev
```

### Production Mode

```bash
pnpm build
pnpm start
```

### Sync Database (Development)

To create/update database tables:

```bash
pnpm db:sync
```

## 🧪 Testing

The project includes comprehensive integration tests for all API endpoints.

### Run Tests

```bash
pnpm test
```

### Test Configuration

- **Test Database:** Uses a separate `movies_test_db` database
- **Test Framework:** Jest with TypeScript support via @swc/jest
- **Test Files:** Located in `test/` directory
- **Coverage:** Currently at 82.36% (models at 100%)

### Test Suite

- ✅ **Genres:** 4 tests (GET, POST, PUT, DELETE)
- ✅ **Actors:** 4 tests (GET, POST, PUT, DELETE)
- ✅ **Directors:** 4 tests (GET, POST, PUT, DELETE)
- ✅ **Movies:** 7 tests (CRUD + associations with genres/actors/directors)

**Total:** 19 passing tests

### Environment Variables for Testing

Add to your `.env` file:

```env
TEST_DB_NAME=movies_test_db
TEST_DB_USER=postgres
TEST_DB_PASSWORD=postgres
TEST_DB_HOST=localhost
TEST_DB_PORT=5432
```

## 📚 API Documentation

Base URL: `http://localhost:3000`

### Genres

| Method | Endpoint      | Description     | Body                   |
| ------ | ------------- | --------------- | ---------------------- |
| GET    | `/genres`     | Get all genres  | -                      |
| GET    | `/genres/:id` | Get genre by ID | -                      |
| POST   | `/genres`     | Create genre    | `{ "name": "Action" }` |
| PUT    | `/genres/:id` | Update genre    | `{ "name": "Action" }` |
| DELETE | `/genres/:id` | Delete genre    | -                      |

### Actors

| Method | Endpoint      | Description     | Body      |
| ------ | ------------- | --------------- | --------- |
| GET    | `/actors`     | Get all actors  | -         |
| GET    | `/actors/:id` | Get actor by ID | -         |
| POST   | `/actors`     | Create actor    | See below |
| PUT    | `/actors/:id` | Update actor    | See below |
| DELETE | `/actors/:id` | Delete actor    | -         |

**Actor Body:**

```json
{
  "first_name": "Leonardo",
  "last_name": "DiCaprio",
  "nationality": "American",
  "image": "https://example.com/image.jpg",
  "birthday": "1974-11-11"
}
```

### Directors

| Method | Endpoint         | Description        | Body      |
| ------ | ---------------- | ------------------ | --------- |
| GET    | `/directors`     | Get all directors  | -         |
| GET    | `/directors/:id` | Get director by ID | -         |
| POST   | `/directors`     | Create director    | See below |
| PUT    | `/directors/:id` | Update director    | See below |
| DELETE | `/directors/:id` | Delete director    | -         |

**Director Body:**

```json
{
  "first_name": "Christopher",
  "last_name": "Nolan",
  "nationality": "British",
  "image": "https://example.com/image.jpg",
  "birthday": "1970-07-30"
}
```

### Movies

| Method | Endpoint                | Description                                   | Body        |
| ------ | ----------------------- | --------------------------------------------- | ----------- |
| GET    | `/movies`               | Get all movies with genres, actors, directors | -           |
| GET    | `/movies/:id`           | Get movie by ID                               | -           |
| POST   | `/movies`               | Create movie                                  | See below   |
| PUT    | `/movies/:id`           | Update movie                                  | See below   |
| DELETE | `/movies/:id`           | Delete movie                                  | -           |
| POST   | `/movies/:id/genres`    | Set movie genres                              | `[1, 2, 3]` |
| POST   | `/movies/:id/actors`    | Set movie actors                              | `[1, 2, 3]` |
| POST   | `/movies/:id/directors` | Set movie directors                           | `[1, 2]`    |

**Movie Body:**

```json
{
  "name": "Inception",
  "image": "https://example.com/inception.jpg",
  "synopsis": "A thief who steals corporate secrets...",
  "release_year": 2010
}
```

**Setting Relationships:**

The POST endpoints for genres, actors, and directors expect an array of IDs:

```json
[1, 2, 3]
```

These endpoints will:

- Replace all existing associations
- Return the updated list of associated items

## 🌐 Database Schema

### Tables

**genres**

- id (PK)
- name
- createdAt
- updatedAt

**actors**

- id (PK)
- first_name
- last_name
- nationality
- image
- birthday
- createdAt
- updatedAt

**directors**

- id (PK)
- first_name
- last_name
- nationality
- image
- birthday
- createdAt
- updatedAt

**movies**

- id (PK)
- name
- image
- synopsis
- release_year
- createdAt
- updatedAt

**Junction Tables:**

- movie_genres (movie_id, genre_id)
- movie_actors (movie_id, actor_id)
- movie_directors (movie_id, director_id)

## 🚢 Deployment to Vercel

> **✅ This project is configured and ready to deploy on Vercel**

### Quick Deploy (5 minutes)

1. **Push your code to GitHub:**

   ```bash
   git add .
   git commit -m "feat: ready for vercel"
   git push origin main
   ```

2. **Go to Vercel:**

   - https://vercel.com → Login with GitHub
   - Click "Add New..." → "Project"
   - Import your `movies-app-backend` repository
   - Framework Preset: **Other**

3. **Setup PostgreSQL Database:**

   Recommended options (all free):

   - **Vercel Postgres**: Integrated, easy to setup
   - **Neon**: https://neon.tech (Free, 10GB)
   - **Supabase**: https://supabase.com (Free, includes Auth)

4. **Add Environment Variables:**

   ```env
   DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require
   NODE_ENV=production
   ```

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your API is live! 🎉

### Using Deploy Script

For Windows (PowerShell):

```powershell
.\deploy.ps1
```

For Linux/Mac:

```bash
chmod +x deploy.sh
./deploy.sh
```

### Complete Documentation

For detailed instructions, check:

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete step-by-step guide
- **[VERCEL_READY.md](./VERCEL_READY.md)** - Summary of changes made

### Alternative Deployment: Render.com

If you prefer Render.com over Vercel:

1. Go to [Render.com](https://render.com)
2. Create PostgreSQL Database
3. Create Web Service connected to your repo
4. Build Command: `pnpm install && pnpm build`
5. Start Command: `pnpm start`
6. Add `DATABASE_URL` variable

### Verify Deployment

Once deployed, your API will be available at:

```
https://your-project.vercel.app
```

Test the endpoints:

```bash
# Health check
curl https://your-project.vercel.app/

# Get movies
curl https://your-project.vercel.app/movies

# Get genres
curl https://your-project.vercel.app/genres
```

## 📝 Example Usage

### Creating a Complete Movie

1. Create genres:

```bash
POST /genres
{ "name": "Sci-Fi" }
# Returns: { "id": 1, "name": "Sci-Fi" }
```

2. Create actors:

```bash
POST /actors
{
  "first_name": "Leonardo",
  "last_name": "DiCaprio",
  "nationality": "American",
  "image": "https://example.com/leo.jpg",
  "birthday": "1974-11-11"
}
# Returns: { "id": 1, ... }
```

3. Create directors:

```bash
POST /directors
{
  "first_name": "Christopher",
  "last_name": "Nolan",
  "nationality": "British",
  "image": "https://example.com/nolan.jpg",
  "birthday": "1970-07-30"
}
# Returns: { "id": 1, ... }
```

4. Create movie:

```bash
POST /movies
{
  "name": "Inception",
  "image": "https://example.com/inception.jpg",
  "synopsis": "A thief who steals corporate secrets through dream-sharing technology...",
  "release_year": 2010
}
# Returns: { "id": 1, ... }
```

5. Associate genres:

```bash
POST /movies/1/genres
[1]
# Returns: [{ "id": 1, "name": "Sci-Fi" }]
```

6. Associate actors:

```bash
POST /movies/1/actors
[1]
# Returns: [{ "id": 1, "first_name": "Leonardo", ... }]
```

7. Associate directors:

```bash
POST /movies/1/directors
[1]
# Returns: [{ "id": 1, "first_name": "Christopher", ... }]
```

8. Get complete movie:

```bash
GET /movies/1
# Returns movie with all genres, actors, and directors
```

## 🔧 Project Structure

```
movies-app-backend/
├── src/
│   ├── config/
│   │   └── database.ts          # Database configuration
│   ├── controllers/
│   │   ├── actorController.ts   # Actor CRUD logic
│   │   ├── directorController.ts # Director CRUD logic
│   │   ├── genreController.ts   # Genre CRUD logic
│   │   └── movieController.ts   # Movie CRUD + associations
│   ├── models/
│   │   ├── Actor.ts             # Actor model
│   │   ├── Director.ts          # Director model
│   │   ├── Genre.ts             # Genre model
│   │   ├── Movie.ts             # Movie model
│   │   └── index.ts             # Model associations
│   ├── routes/
│   │   ├── actorRoutes.ts       # Actor routes
│   │   ├── directorRoutes.ts    # Director routes
│   │   ├── genreRoutes.ts       # Genre routes
│   │   ├── movieRoutes.ts       # Movie routes
│   │   └── index.ts             # Route aggregation
│   ├── scripts/
│   │   └── syncDatabase.ts      # Database sync script
│   ├── app.ts                   # Express app setup
│   └── index.ts                 # Server entry point
├── test/
│   ├── actors.test.ts           # Actor endpoint tests
│   ├── directors.test.ts        # Director endpoint tests
│   ├── genres.test.ts           # Genre endpoint tests
│   ├── movies.test.ts           # Movie endpoint tests
│   └── testSetup.ts             # Test configuration
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
├── jest.config.ts               # Jest configuration
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
└── README.md                    # This file
```

## 🧪 Testing with Frontend

To connect with the provided frontend:

1. Start the backend:

```bash
pnpm dev
```

2. In the frontend `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

3. Start the frontend and test all CRUD operations

## ⚙️ Environment Variables

| Variable       | Description                    | Default       |
| -------------- | ------------------------------ | ------------- |
| `PORT`         | Server port                    | `3000`        |
| `NODE_ENV`     | Environment mode               | `development` |
| `DB_HOST`      | Database host                  | `localhost`   |
| `DB_PORT`      | Database port                  | `5432`        |
| `DB_NAME`      | Database name                  | `movies_db`   |
| `DB_USER`      | Database user                  | `postgres`    |
| `DB_PASSWORD`  | Database password              | -             |
| `DATABASE_URL` | Full database URL (production) | -             |

## 📄 License

ISC

## 👤 Author

Your Name

---

**Note:** This API follows REST best practices and includes proper error handling, validation, and TypeScript types for maintainability.
