# Deployment Guide

This guide covers different ways to deploy your dental clinic website.

## 🚀 Quick Deploy Options

### 1. Vercel (Recommended for Frontend)

Vercel is perfect for React applications and offers automatic deployments from GitHub.

1. **Connect to GitHub**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account
   - Import your `dental-clinic-website` repository

2. **Configure Environment Variables**
   - Add `DATABASE_URL` in Vercel dashboard
   - Set build command: `npm run build`
   - Set output directory: `dist`

3. **Deploy**
   - Vercel will automatically deploy on every push to main branch

### 2. Railway (Full-Stack)

Railway supports both frontend and backend deployment.

1. **Connect Repository**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository

2. **Add PostgreSQL Database**
   - Create a new PostgreSQL service
   - Copy the connection string to `DATABASE_URL`

3. **Configure Build**
   - Set build command: `npm run build`
   - Set start command: `npm start`

### 3. Render (Full-Stack)

Render provides free hosting for full-stack applications.

1. **Create New Web Service**
   - Go to [render.com](https://render.com)
   - Connect your GitHub repository

2. **Configure Service**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Add environment variable: `DATABASE_URL`

3. **Add PostgreSQL Database**
   - Create a new PostgreSQL service
   - Link it to your web service

### 4. Heroku (Full-Stack)

Heroku is a classic choice for Node.js applications.

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku App**
   ```bash
   heroku create your-dental-clinic-app
   ```

3. **Add PostgreSQL**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

## 🔧 Environment Variables

Set these environment variables in your hosting platform:

```bash
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=production
PORT=3000
```

## 📊 Database Setup

### PostgreSQL (Recommended for Production)

1. **Create Database**
   - Use your hosting platform's PostgreSQL service
   - Or set up a managed PostgreSQL service (Supabase, Neon, etc.)

2. **Run Migrations**
   ```bash
   npm run db:push
   ```

### SQLite (Development Only)

For local development, you can use SQLite:
```bash
export DATABASE_URL="sqlite:./local.db"
npm run db:push
```

## 🛠️ Build Commands

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

## 🔍 Troubleshooting

### Common Issues

1. **Port Issues**
   - Make sure your hosting platform uses the `PORT` environment variable
   - The app listens on `0.0.0.0` to accept external connections

2. **Database Connection**
   - Verify your `DATABASE_URL` is correct
   - Ensure your database is accessible from your hosting platform

3. **Build Failures**
   - Check that all dependencies are in `package.json`
   - Ensure TypeScript compilation passes: `npm run check`

### Performance Optimization

1. **Enable Compression**
   - Most hosting platforms enable gzip compression automatically

2. **CDN Setup**
   - Use a CDN for static assets
   - Consider using Vercel's edge network

3. **Database Optimization**
   - Use connection pooling for PostgreSQL
   - Consider read replicas for high traffic

## 📈 Monitoring

### Health Check Endpoint

Add a health check endpoint to monitor your application:

```typescript
// In server/routes.ts
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
```

### Logging

The application includes basic logging for API requests. For production, consider:

- Structured logging with Winston or Pino
- Error tracking with Sentry
- Performance monitoring with New Relic or DataDog

## 🔒 Security

### Environment Variables
- Never commit sensitive data to git
- Use environment variables for all secrets
- Rotate database passwords regularly

### HTTPS
- Most hosting platforms provide HTTPS automatically
- Ensure your domain uses HTTPS in production

### Database Security
- Use connection strings with SSL enabled
- Restrict database access to your application's IP
- Regularly update dependencies for security patches
