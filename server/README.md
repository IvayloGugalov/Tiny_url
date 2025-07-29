# 🔗 TinyURL Server

The backend API server for the TinyURL application, built with Hono, Bun, and SQLite.

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
bun install

# Run in development mode
bun run dev

# Open http://localhost:3000
```

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/links` | Create a new short link (anonymous or authenticated) |
| `GET` | `/api/links` | Get user-specific links with analytics (requires auth) |
| `GET` | `/:id` | Redirect to target URL (increments clicks) |
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/login` | Authenticate user |
| `GET` | `/api/hello` | Health check endpoint |

### Example Usage

```bash
# Create a short link
curl -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -d '{"target": "https://example.com/very-long-url"}'

# Get all links
curl http://localhost:3000/api/links

# Visit a short link (redirects and increments clicks)
curl -L http://localhost:3000/abc123
```

## 🗄️ Database

The server uses SQLite with Drizzle ORM. The database file is automatically created at `tiny_url.sqlite`.

### Schema

```sql
CREATE TABLE links (
  id TEXT PRIMARY KEY NOT NULL,
  target TEXT NOT NULL,
  clicks INTEGER DEFAULT 0 NOT NULL,
  createdAt INTEGER DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

### Migrations

```bash
# Generate new migration
bun run drizzle-kit generate

# Apply migrations
bun run drizzle-kit migrate
```

## 🔧 Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `LINK_TTL_DAYS` | `90` | Days before links are automatically deleted |

## 🧪 Testing

### Unit Tests
```bash
# Run tests
bun test

# Run with coverage
bun test --coverage
```

### Integration Test Scripts

| Script | Purpose |
|--------|---------|
| `test-redirect.js` | Tests URL shortening and redirect functionality |
| `test-user-links.js` | Tests user authentication and user-specific link analytics |
| `test-login-debug.js` | Debug script for authentication token validation |

```bash
# Run integration tests (server must be running)
node test-redirect.js
node test-user-links.js
node test-login-debug.js
```

## 📁 Project Structure

```
server/
├── src/
│   ├── db/
│   │   └── schema.ts      # Database schema definition
│   └── index.ts           # Main server file with routes
├── migrations/            # Database migration files
├── package.json           # Dependencies and scripts
└── drizzle.config.ts      # Drizzle ORM configuration
```

## 🔒 Security Features

- **Input Validation**: All URLs are validated before processing
- **SQL Injection Protection**: Using Drizzle ORM with parameterized queries
- **CORS Configuration**: Proper CORS setup for API access
- **Error Handling**: Comprehensive error handling and logging

## 🚀 Deployment

### Traditional Deployment

```bash
# Build the application
bun run build

# Run the compiled binary
bun run start
```

### Cloud Platforms

- **Railway**: Easy deployment with database
- **Render**: Backend deployment with persistent storage
- **Vercel**: Serverless functions deployment
- **Netlify**: Serverless functions with edge functions

## 📈 Features

- **URL Shortening**: Generate unique short codes for long URLs
- **Click Tracking**: Automatically increment click counters
- **Analytics API**: Provide click data for the frontend dashboard
- **Auto-cleanup**: Scheduled removal of expired links
- **Health Checks**: Built-in health check endpoint
