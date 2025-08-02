# 🔗 TinyURL Client

The React frontend application for the TinyURL service, built with Vite, TypeScript, and Chart.js.

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
bun install

# Run development server
bun run dev

# Open http://localhost:5173
```

## 🎨 Features

- **📊 Dashboard**: Beautiful interface for managing short links
- **📈 Analytics**: Real-time click tracking with Chart.js visualizations
- **🔗 Link Creation**: Easy form to create new short links
- **📋 Copy to Clipboard**: One-click copying of short URLs
- **📱 Responsive Design**: Works perfectly on all devices
- **🔄 Real-time Updates**: Automatic refresh when new links are created

## 🏗️ Project Structure

```
client/
├── src/
│   ├── components/           # React components
│   │   ├── LinksTable.tsx    # Table displaying all links
│   │   ├── CreateLinkForm.tsx # Form for creating new links
│   │   └── ClickAnalyticsChart.tsx # Chart.js analytics
│   ├── api.ts               # API client functions
│   ├── App.tsx              # Main application component
│   ├── App.css              # Application styles
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
└── vite.config.ts           # Vite configuration
```

## 🔧 Configuration

### Environment Variables

| Variable       | Default                 | Description          |
| -------------- | ----------------------- | -------------------- |
| `VITE_API_URL` | `http://localhost:3000` | Backend API base URL |

### API Integration

The client communicates with the backend through the `api.ts` module:

```typescript
// Create a new short link
const result = await createShortLink('https://example.com')

// Fetch all links
const links = await fetchLinks()

// Get short URL for a link
const shortUrl = getShortUrl('abc123')
```

## 🧪 Testing

```bash
# Run tests
bun test

# Run with coverage
bun test --coverage
```

## 📦 Dependencies

### Core Dependencies

- **React 19**: Modern React with hooks and concurrent features
- **Vite**: Fast build tool and dev server
- **TypeScript**: Type safety throughout the application
- **Chart.js**: Beautiful charts for analytics
- **react-chartjs-2**: React wrapper for Chart.js

### Development Dependencies

- **ESLint**: Code linting and formatting
- **TypeScript ESLint**: TypeScript-specific linting rules

## 🎨 Styling

The application uses modern CSS with:

- **Responsive Design**: Mobile-first approach
- **CSS Grid & Flexbox**: Modern layout techniques
- **Custom Properties**: CSS variables for theming
- **Smooth Animations**: Hover effects and transitions
- **Accessibility**: High contrast and keyboard navigation

## 🔒 Security

- **Input Validation**: Client-side URL validation
- **XSS Protection**: Proper escaping of user input
- **CORS Handling**: Proper API communication setup

## 🚀 Deployment

### Static Deployment

```bash
# Build for production
bun run build

# Deploy dist/ folder to any static hosting service:
# - Netlify
# - Vercel
# - GitHub Pages
# - Cloudflare Pages
```

### Cloud Platforms

- **Vercel**: Zero-config deployment with automatic builds
- **Netlify**: Drag-and-drop deployment with form handling
- **GitHub Pages**: Free hosting for open source projects
- **Cloudflare Pages**: Global CDN with edge functions

## 📱 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Progressive Enhancement**: Graceful degradation for older browsers

## 🔧 Development Scripts

```bash
# Development
bun run dev          # Start development server
bun run build        # Build for production
bun run preview      # Preview production build
bun run lint         # Run ESLint

# Testing
bun test             # Run tests
bun test --watch     # Run tests in watch mode
```

## 🤝 Contributing

1. Follow the existing code style
2. Add tests for new features
3. Ensure responsive design works
4. Test on multiple browsers
5. Update documentation as needed

## 📄 License

This project is licensed under the MIT License.
