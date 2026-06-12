# DK Car Modification - Deployment Guide

## Pre-Deployment Checklist

Before deploying, make sure:

- [x] All tests pass (`npm run lint` and `npm run typecheck`)
- [x] Build succeeds (`npm run build`)
- [x] Environment variables are set
- [x] Supabase database is configured
- [x] All forms tested locally
- [x] Responsive design verified
- [x] Performance optimized

## Deployment Options

### Option 1: Vercel (Recommended)

**Easiest option with automatic deployments**

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub, GitLab, or Bitbucket

2. **Import Project**
   - Click "New Project"
   - Select your repository
   - Configure build settings (should auto-detect Vite)

3. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add:
     ```
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

4. **Deploy**
   - Click "Deploy"
   - Visit your live site!

### Option 2: Netlify

**Git-based hosting with CI/CD**

1. **Create Netlify Account**
   - Go to https://netlify.com
   - Sign up with GitHub

2. **Connect Repository**
   - Click "New site from Git"
   - Select your repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

3. **Add Environment Variables**
   - Go to Site Settings → Build & Deploy → Environment
   - Add your Supabase keys

4. **Deploy**
   - Netlify auto-deploys on push to main!

### Option 3: GitHub Pages

**Free hosting directly from GitHub**

1. **Update vite.config.ts**
   ```typescript
   export default defineConfig({
     base: '/repository-name/',
     // ... rest of config
   });
   ```

2. **Create GitHub Action** (`.github/workflows/deploy.yml`)
   ```yaml
   name: Deploy
   on:
     push:
       branches: [main]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
         - run: npm install
         - run: npm run build
         - uses: JamesIves/github-pages-deploy-action@v4
           with:
             branch: gh-pages
             folder: dist
   ```

3. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Select `gh-pages` branch
   - Your site is live!

### Option 4: Traditional Web Host

**FTP/SFTP to any web server**

1. **Build Project**
   ```bash
   npm run build
   ```

2. **Upload `dist/` Folder**
   - Use FTP client (FileZilla)
   - Upload all files from `dist/`
   - Ensure `.env` is NOT uploaded

3. **Set Environment Variables**
   - Add to hosting environment variables panel
   - OR create `.env.production`
   - Rebuild with production values

## Domain Configuration

### Point Domain to Hosting

**Vercel/Netlify**:
- Add custom domain in hosting dashboard
- Update DNS records per instructions
- Usually just one CNAME record

**GitHub Pages**:
- Go to Settings → Pages
- Add custom domain
- Update DNS A records

## Environment Variables

### Production Variables
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key
```

**Security Tips**:
- Never commit `.env` file
- Use hosting provider's secrets manager
- Rotate keys periodically
- Monitor for unauthorized access

## Post-Deployment

### Verify Installation
1. Visit your live URL
2. Test all pages load correctly
3. Submit test booking
4. Submit test contact form
5. Check Supabase for submissions
6. Test on mobile/tablet

### Monitor Performance
```
Website Performance Checklist:
- [ ] Page loads in < 3 seconds
- [ ] Animations are smooth (60fps)
- [ ] Forms submit successfully
- [ ] No console errors
- [ ] Mobile responsive
- [ ] All images load
```

### Setup Monitoring
- Google Analytics
- Sentry (error tracking)
- Uptime monitoring
- Performance monitoring

## Troubleshooting

### Build Fails on Deployment

**Solution**:
1. Check build logs
2. Run `npm run build` locally
3. Ensure all dependencies installed
4. Check Node version (16+ required)

### Environment Variables Not Working

**Solution**:
1. Verify in hosting dashboard
2. Rebuild/redeploy
3. Clear browser cache
4. Check browser console for errors

### Database Connections Failing

**Solution**:
1. Verify Supabase URL and key
2. Check RLS policies
3. Ensure service role has permissions
4. Check Supabase dashboard for issues

### Forms Not Submitting

**Solution**:
1. Check browser console for errors
2. Verify Supabase keys in environment
3. Check RLS INSERT policies enabled
4. Verify network request succeeds

## Scaling & Optimization

### Database Optimization
- Add indexes as needed
- Archive old bookings/submissions
- Clean up unused data
- Monitor query performance

### Frontend Optimization
- Compress images further
- Use CDN for static assets
- Enable GZIP compression
- Minimize CSS/JS bundles

### Security Hardening
- Enable HTTPS (automatic)
- Add security headers
- Configure CORS properly
- Regular security audits

## Maintenance

### Regular Tasks

**Weekly**:
- Check form submissions
- Review error logs
- Monitor uptime

**Monthly**:
- Review analytics
- Check performance
- Update dependencies
- Backup database

**Quarterly**:
- Security audit
- Performance optimization
- Accessibility check
- User feedback review

### Update Dependencies
```bash
npm update
npm audit fix
npm run build
```

## Rollback Plan

If something goes wrong:

1. **Keep Previous Build**
   - Save working dist/ folder
   - Tag working commits in git

2. **Quick Rollback**
   - Redeploy previous version
   - Revert git commit
   - Check logs for errors

3. **Post-Incident**
   - Document what went wrong
   - Fix issues locally
   - Test thoroughly before redeploying

## Production Checklist

Before going live:

- [ ] All pages tested and working
- [ ] Forms tested (submit data to Supabase)
- [ ] Responsive design verified
- [ ] Performance acceptable
- [ ] Security measures in place
- [ ] Environment variables set
- [ ] Backup strategy planned
- [ ] Monitoring configured
- [ ] Team trained on updates
- [ ] Domain configured correctly

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Supabase Docs**: https://supabase.com/docs
- **React Docs**: https://react.dev

## Success Criteria

Your deployment is successful when:

✅ Website loads without errors  
✅ All pages accessible  
✅ Forms submit and save data  
✅ Mobile layout responsive  
✅ Animations smooth  
✅ Database connected  
✅ Performance good  
✅ No security warnings  

---

**Deployment Date**: [Your Date]  
**Live URL**: [Your URL]  
**Status**: ✅ LIVE

Good luck with your launch! 🚀
