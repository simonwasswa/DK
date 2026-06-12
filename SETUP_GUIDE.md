# DK Car Modification - Setup Guide

## Prerequisites

- Node.js 16 or higher
- npm or yarn package manager
- A Supabase account (free tier available)

## Step 1: Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd dk-car-modification

# Install dependencies
npm install
```

## Step 2: Supabase Setup

### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Wait for the project to be initialized
5. Go to Project Settings → API Keys
6. Copy your `Project URL` and `anon public key`

### Add Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Run Database Migrations

The database schema will be automatically created when you first run the migrations:

1. Go to Supabase Dashboard → SQL Editor
2. Create a new query and run the migration SQL (see `001_create_initial_schema` in the migrations)
3. Or use the Supabase CLI to run migrations

## Step 3: Database Configuration

### Tables Overview

The following tables are created automatically:

- **service_categories**: Service organization
- **services**: Available car modification services
- **bookings**: Customer service bookings
- **testimonials**: Customer reviews
- **contact_submissions**: Contact form submissions

### Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:

- **Services & Testimonials**: Public read access
- **Bookings & Contact**: Service role and insert-only access

## Step 4: Local Development

### Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory

## Step 5: Testing

### Mobile Testing

1. **Using Chrome DevTools**:
   - Open DevTools (F12)
   - Click the device toggle icon
   - Select various devices to test

2. **Using Your Phone**:
   - Find your local IP address
   - Access `http://YOUR_IP:5173` from your phone

### Forms Testing

1. **Contact Form**:
   - Navigate to Contact page
   - Fill in the form and submit
   - Check Supabase Dashboard → contact_submissions table

2. **Booking Form**:
   - Click "Book Appointment" on Home page
   - Fill in booking details
   - Submit and verify in Supabase Dashboard → bookings table

## Step 6: Customization

### Update Company Information

1. **Header & Footer**: Edit `src/components/Header.tsx` and `Footer.tsx`
2. **Services**: Add/edit in `src/pages/Services.tsx` and update database
3. **Testimonials**: Add to database via Supabase Dashboard
4. **Team**: Update `src/pages/About.tsx`
5. **Contact Info**: Update in `src/pages/Contact.tsx`

### Customize Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      amber: { /* your colors */ },
      slate: { /* your colors */ }
    }
  }
}
```

### Update Images

Replace Pexels URLs with your own images in:
- Home page hero sections
- Service cards
- Portfolio projects
- Team member photos

## Deployment

### Deploy to Vercel

```bash
npm install -g vercel

# Login and deploy
vercel

# Add environment variables in Vercel dashboard
```

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your GitHub repo to Netlify
3. Add environment variables in Netlify dashboard
4. Deploy

### Environment Variables for Production

Make sure to add these in your hosting provider:

```
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_anon_key
```

## Troubleshooting

### Issue: Database connection errors

**Solution**:
- Verify Supabase URL and key in `.env`
- Check RLS policies are not blocking access
- Ensure service role key is used for admin operations

### Issue: Booking/Contact form not submitting

**Solution**:
- Open browser console to check for errors
- Verify Supabase connection in Network tab
- Check RLS INSERT policies are enabled
- Clear browser cache and try again

### Issue: Images not loading

**Solution**:
- Verify image URLs are accessible
- Check CORS settings if using external CDN
- Use direct image URLs instead of local paths

### Issue: Animations choppy on mobile

**Solution**:
- Reduce animation complexity for smaller screens
- Check device performance in browser DevTools
- Disable animations for users with `prefers-reduced-motion`

## Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Supabase Documentation](https://supabase.com/docs)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review documentation links
3. Create an issue on GitHub
4. Contact: info@dkcarmod.com

## Next Steps

1. ✅ Install dependencies
2. ✅ Setup Supabase
3. ✅ Configure environment variables
4. ✅ Run migrations
5. ✅ Start development server
6. ✅ Test forms and functionality
7. ✅ Customize content
8. ✅ Deploy to production

Good luck! 🚀