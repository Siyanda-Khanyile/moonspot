# Deployment Guide

## GitHub Pages Setup

To enable automatic deployment to GitHub Pages, follow these steps:

### 1. Enable GitHub Pages

**IMPORTANT: You must enable GitHub Pages manually first:**

1. Go to your repository on GitHub: https://github.com/Siyanda-Khanyile/moonspot
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions** (NOT "Deploy from a branch")
5. Click **Save**

**Alternative: The workflow will attempt to enable Pages automatically, but manual setup is more reliable.**

### 2. Enable GitHub Actions

1. Go to the **Actions** tab in your repository
2. If prompted, click **I understand my workflows, go ahead and enable them**
3. The workflows will now run automatically on push/PR events

### 3. Deployment URLs

Once set up, your app will be available at:

- **Production**: https://siyanda-khanyile.github.io/moonspot/
- **Staging**: https://siyanda-khanyile.github.io/moonspot-staging/ (when develop branch is pushed)

## Manual Deployment

If you need to deploy manually:

```bash
# Build the application
npm run build

# Deploy to GitHub Pages (requires gh-pages package)
npm install -g gh-pages
gh-pages -d dist
```

## Environment Configuration

### Production Environment Variables

The following environment variables are automatically set during production builds:

- `NODE_ENV=production`
- `VITE_APP_ENV=production`

### Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public/` directory with your domain
2. Update the workflows to include your domain
3. Configure DNS settings with your domain provider

Example CNAME file:
```
moonspot.yourdomain.com
```

## Monitoring

### Health Check

The application includes a health check endpoint at `/health.json` for monitoring purposes.

### Build Status

Monitor build status through GitHub Actions:
- Go to the **Actions** tab in your repository
- View workflow runs and their status
- Check logs for any deployment issues

## Troubleshooting

### Troubleshooting

### Common Issues

1. **"Get Pages site failed" Error**: 
   - Go to repository Settings → Pages
   - Ensure Source is set to "GitHub Actions" (not "Deploy from a branch")
   - If Pages is disabled, enable it first
   - Wait a few minutes and retry the workflow

2. **404 on GitHub Pages**: Ensure the base path in `vite.config.ts` matches your repository name

3. **Build Failures**: Check the Actions logs for specific error messages

4. **Assets Not Loading**: Verify the base URL configuration for production

### Debug Steps

1. Check the Actions tab for failed workflows
2. Review the build logs for specific errors
3. Ensure all dependencies are properly installed
4. Verify TypeScript compilation passes locally

## Security

### Dependency Updates

- Automated dependency updates run weekly via GitHub Actions
- Security audits are performed on every PR
- Critical vulnerabilities trigger immediate notifications

### Secrets Management

No secrets are required for basic GitHub Pages deployment. If you need to add secrets:

1. Go to repository **Settings** > **Secrets and variables** > **Actions**
2. Add repository secrets as needed
3. Reference them in workflows using `${{ secrets.SECRET_NAME }}`

## Performance

### Bundle Analysis

To analyze bundle size:

```bash
npm run build:analyze
```

### Optimization

The build is configured with:
- Code splitting for vendor and UI libraries
- Source maps for debugging
- Asset optimization through Vite
- Gzip compression (handled by GitHub Pages)

## Rollback

To rollback a deployment:

1. Go to the **Actions** tab
2. Find the last successful deployment
3. Click **Re-run jobs** to redeploy that version

Or manually:

```bash
git revert <commit-hash>
git push origin main
```