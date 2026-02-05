# Hostinger Deployment Guide

## Quick Start

This guide will help you deploy your Next.js application to Hostinger Cloud Startup.

## Prerequisites

- [ ] Hostinger Cloud Startup account
- [ ] Production Directus instance URL
- [ ] Git repository (GitHub/GitLab)
- [ ] Domain name configured

## Step-by-Step Deployment

### 1. Set Up Production Directus

You need a production Directus instance. Choose one FREE option:

**Option A: Railway.app (Easiest & Free)**
- Go to https://railway.app
- Sign up with GitHub (free tier available)
- Deploy Directus template from marketplace
- Copy your project URL
- Free tier: 500 hours/month, 1GB RAM

**Option B: Render.com (Free)**
- Go to https://render.com
- Sign up for free account
- Deploy Directus using Docker
- Free tier: 750 hours/month

**Option C: Self-Hosted VPS (Free Trial)**
- DigitalOcean: $200 credit for 60 days
- Linode: $100 credit for 60 days
- Install Directus following official docs
- Configure database and CORS

**Option D: Hostinger VPS (If you have budget)**
- Use your Hostinger account to create VPS
- Install Directus manually
- Full control over configuration

### 2. Configure Environment Variables

1. Copy `.env.production` and update with your Directus URL:
   ```env
   NEXT_PUBLIC_DIRECTUS_URL=https://your-actual-directus-url.com
   DIRECTUS_URL=https://your-actual-directus-url.com
   ```

2. Update `next.config.mjs` line 24-29 with your production Directus domain:
   ```javascript
   {
       protocol: 'https',
       hostname: 'your-actual-directus-url.com',
       pathname: '/assets/**',
   },
   ```

### 3. Test Production Build Locally

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test the build
npm start
```

Visit http://localhost:3000 to verify everything works.

### 4. Push to Git Repository

```bash
git add .
git commit -m "Prepare for Hostinger deployment"
git push origin main
```

### 5. Deploy to Hostinger

#### Via Hostinger Control Panel:

1. **Login to Hostinger**
   - Go to hPanel
   - Navigate to "Node.js"

2. **Create New Application**
   - Click "Create Application"
   - Select Node.js version: **20.x**
   - Application mode: **Production**

3. **Configure Git Deployment**
   - Connect your GitHub/GitLab account
   - Select repository: `solisinverterindonesia`
   - Branch: `main`

4. **Build Settings**
   - Build command: `npm run build`
   - Start command: `node .next/standalone/server.js`
   - Application root: `/` (or your project folder)

5. **Environment Variables**
   Add these in the control panel:
   ```
   NEXT_PUBLIC_DIRECTUS_URL=https://your-directus-url.com
   DIRECTUS_URL=https://your-directus-url.com
   NODE_ENV=production
   ```

6. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be available at the assigned URL

### 6. Configure Custom Domain

1. In Hostinger panel, go to "Domains"
2. Add your domain
3. Point domain to your Node.js app
4. Enable SSL certificate (free Let's Encrypt)

### 7. Verify Deployment

Check these after deployment:
- [ ] Homepage loads correctly
- [ ] Product pages display with images
- [ ] Category filtering works
- [ ] Pagination functions properly
- [ ] Mobile view is responsive
- [ ] SSL certificate is active
- [ ] WhatsApp button works

## Troubleshooting

### Build Fails

**Error: Module not found**
```bash
# Solution: Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**Error: Out of memory**
```bash
# Solution: Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Images Not Loading

1. Check Directus URL in environment variables
2. Verify CORS settings in Directus:
   ```
   CORS_ENABLED=true
   CORS_ORIGIN=https://yourdomain.com
   ```
3. Confirm remotePatterns in next.config.mjs

### App Won't Start

1. Check Node.js version (should be 20.x)
2. Verify entry point: `.next/standalone/server.js`
3. Review application logs in Hostinger panel

## Performance Tips

With your Cloud Startup plan (4 GB RAM, 100 PHP workers):

1. **Enable Caching**
   - Next.js automatically caches static pages
   - Use ISR for product pages

2. **Optimize Images**
   - Directus images are optimized via Next.js Image component
   - Consider using Cloudflare CDN

3. **Monitor Performance**
   - Use Hostinger analytics
   - Set up uptime monitoring

## Maintenance

### Updating the Site

```bash
# Make changes locally
git add .
git commit -m "Update description"
git push origin main

# Hostinger will auto-deploy if configured
# Or manually trigger deployment in panel
```

### Database Backups

- Set up automatic backups for Directus database
- Export product data regularly
- Keep local development database in sync

## Support

- Hostinger Support: 24/7 via panel
- Next.js Docs: https://nextjs.org/docs
- Directus Docs: https://docs.directus.io

## Checklist Before Going Live

- [ ] Production Directus is running
- [ ] All environment variables are set
- [ ] Domain is configured with SSL
- [ ] Test all pages and features
- [ ] Set up monitoring and backups
- [ ] Configure SEO settings
- [ ] Test contact forms
- [ ] Verify mobile responsiveness
