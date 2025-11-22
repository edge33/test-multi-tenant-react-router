# Multi-tenant-test

A modern, production-ready React Router application with multi-tenant subdomain routing.

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🌐 **Multi-tenant subdomain routing**
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Subdomain Routing

This application implements multi-tenant subdomain routing. Different subdomains can serve different content:

### How it Works

- **Root domain** (`yourapp.com` or `localhost:5173`): Serves the main landing page
- **Subdomains** (`tenant1.yourapp.com`): Serve tenant-specific dashboards

### Testing Subdomains Locally

#### Option 1: Using localhost subdomains (Recommended for Development)

Modern browsers support `*.localhost` subdomains without configuration:

1. Start the dev server: `npm run dev`
2. Access different subdomains:
   - Main site: `http://localhost:5173`
   - Tenant 1: `http://tenant1.localhost:5173`
   - Tenant 2: `http://tenant2.localhost:5173`

#### Option 2: Using /etc/hosts

Add entries to your `/etc/hosts` file (requires sudo):

```bash
sudo nano /etc/hosts
```

Add these lines:

```
127.0.0.1  tenant1.localhost
127.0.0.1  tenant2.localhost
127.0.0.1  demo.localhost
```

Then access:

- `http://tenant1.localhost:5173`
- `http://tenant2.localhost:5173`

#### Option 3: Using ngrok or similar tunneling tools

For testing with real subdomains:

```bash
ngrok http 5173
# Then configure wildcard DNS to point *.your-ngrok-domain.ngrok.io to your tunnel
```

### Routes

#### Root Domain Routes

- `/` - Landing page

#### Subdomain Routes

- `/` - Subdomain home page
- `/dashboard` - Subdomain dashboard

### Implementation Details

The subdomain detection logic is in `app/utils/getSubdomain.ts` and:

- Extracts subdomain from the `Host` header
- Supports `*.localhost` for local development
- Filters out `www` subdomain by default
- Works in both development and production

The routing logic in `app/layouts/layout.tsx`:

- Detects subdomain in the loader
- Redirects to appropriate routes based on subdomain presence
- Passes subdomain context to child routes

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
