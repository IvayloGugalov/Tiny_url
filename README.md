# 🔗 TinyURL - URL Shortener with Analytics

A modern, full-stack URL shortening service built with Bun, Hono, React, and TypeScript. Create short links, track clicks, and visualize analytics in a beautiful dashboard.

![TinyURL Dashboard](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-Full%20Stack-blue)

## ✨ Features

- **🔗 URL Shortening**: Create short, memorable links from long URLs
- **📊 Click Analytics**: Track and visualize click statistics
- **🎨 Modern Dashboard**: Beautiful React interface with real-time updates
- **🚀 High Performance**: Built with Bun runtime for speed
- **🔒 Type Safety**: Full TypeScript support across the stack
- **📱 Responsive Design**: Works perfectly on desktop and mobile
- **🔄 Auto-cleanup**: Automatic removal of expired links

## 🏗️ Architecture

- **Frontend**: React 18 + Vite + TypeScript
- **Backend**: Hono + Bun + TypeScript
- **Database**: SQLite with Drizzle ORM
- **Charts**: Chart.js with react-chartjs-2

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh) (latest version)
- Node.js 18+ (for some tooling)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd TinyURL

# Install dependencies for all workspaces
bun install
```

### Development

```bash
# Run everything in development mode
bun run dev

# Or run individual parts
bun run dev:shared  # Watch and compile shared types
bun run dev:server  # Run the Hono backend (http://localhost:3000)
bun run dev:client  # Run the Vite dev server (http://localhost:5173)
```

### Building

```bash
# Build everything
bun run build

# Or build individual parts
bun run build:shared  # Build the shared types package
bun run build:server  # Build the server
bun run build:client  # Build the React frontend
```

## 📁 Project Structure

```
TinyURL/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── LinksTable.tsx
│   │   │   ├── CreateLinkForm.tsx
│   │   │   └── ClickAnalyticsChart.tsx
│   │   ├── api.ts         # API client functions
│   │   └── App.tsx        # Main application component
│   └── package.json
├── server/                 # Hono backend API
│   ├── src/
│   │   ├── db/
│   │   │   └── schema.ts  # Database schema
│   │   └── index.ts       # API routes and server setup
│   ├── migrations/        # Database migrations
│   └── package.json
├── shared/                 # Shared TypeScript types
│   ├── src/types/
│   │   └── index.ts       # Common type definitions
│   └── package.json
└── package.json           # Root workspace configuration
```

## 🔧 Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `LINK_TTL_DAYS` | `90` | Days before links are automatically deleted |
| `VITE_API_URL` | `http://localhost:3000` | API base URL for the frontend |

### Database

The application uses SQLite with automatic migrations. The database file is created automatically at `server/tiny_url.sqlite`.

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/links` | Create a new short link |
| `GET` | `/api/links` | Get all links with analytics |
| `GET` | `/:id` | Redirect to target URL (increments clicks) |

### Example API Usage

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

## 🧪 Testing

```bash
# Run all tests
bun test

# Run server tests
cd server && bun test

# Run client tests
cd client && bun test
```

## 📈 Analytics Features

- **Real-time Click Tracking**: Every visit increments the click counter
- **Visual Analytics**: Chart.js bar chart showing top 10 most clicked links
- **Link Management**: View all links with creation dates and click counts
- **Copy to Clipboard**: One-click copying of short URLs

## 🔒 Security Features

- **Input Validation**: All URLs are validated before processing
- **SQL Injection Protection**: Using Drizzle ORM with parameterized queries
- **CORS Configuration**: Proper CORS setup for API access

## 🚀 Deployment Options

### Traditional Deployment
- **Frontend**: Deploy React build to CDN (Netlify, Vercel, etc.)
- **Backend**: Deploy Bun binary to any server
- **Database**: Use SQLite or migrate to PostgreSQL/MySQL

### Cloud Platforms
- **Vercel**: Deploy frontend and backend functions
- **Netlify**: Deploy frontend with serverless functions
- **Railway**: Full-stack deployment
- **Render**: Backend deployment with database

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Bun](https://bun.sh) for incredible performance
- [Hono](https://hono.dev) for the lightweight web framework
- [Drizzle ORM](https://orm.drizzle.team) for type-safe database operations
- [React](https://react.dev) for the user interface
- [Chart.js](https://www.chartjs.org) for beautiful analytics
