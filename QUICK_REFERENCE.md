# DK Car Modification - Quick Reference Guide

## Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Type checking
npm run typecheck
```

## Key Files to Edit

| What | File | Line |
|------|------|------|
| Company name & logo | `src/components/Header.tsx` | 25-35 |
| Navigation menu | `src/components/Header.tsx` | 15-22 |
| Footer links | `src/components/Footer.tsx` | 40-85 |
| Home hero text | `src/pages/Home.tsx` | 150-170 |
| Services list | `src/pages/Home.tsx` | 8-45 |
| Team members | `src/pages/About.tsx` | 24-42 |
| Contact info | `src/pages/Contact.tsx` | 70-90 |
| Colors & theme | `tailwind.config.js` | 5-25 |
| Global styles | `src/index.css` | 1-60 |

## API Endpoints

All data flows through Supabase:

```typescript
// Contact form
supabase.from('contact_submissions').insert([data])

// Create booking
supabase.from('bookings').insert([data])

// Get services
supabase.from('services').select('*')

// Get testimonials
supabase.from('testimonials').select('*').eq('is_published', true)
```

## Environment Variables

```env
# Required in .env file
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Component Props

### ServiceCard
```typescript
icon: React.ReactNode
title: string
description: string
image: string
```

### BookingModal
```typescript
isOpen: boolean
onClose: () => void
serviceName?: string
serviceId?: string
```

### AnimatedBackground
```typescript
images: string[]
children?: React.ReactNode
duration?: number (default: 8)
overlay?: boolean (default: true)
overlayOpacity?: number (default: 0.5)
```

## Database Schema Reference

### Services Table
```sql
SELECT * FROM services WHERE is_featured = true ORDER BY order_index;
```

### Bookings Table
```sql
SELECT * FROM bookings WHERE customer_email = 'user@example.com';
```

### Contact Submissions
```sql
SELECT * FROM contact_submissions WHERE status = 'new' ORDER BY created_at DESC;
```

## Common Tasks

### Add a New Service

1. Add to database via Supabase Dashboard
2. Or insert via SQL:
```sql
INSERT INTO services (name, description, category_id, image_url, price_range, is_featured)
VALUES ('Service Name', 'Description', category_id, 'image_url', '$100-$500', true);
```

### Update Home Page Hero Text
Edit `src/pages/Home.tsx` lines 140-170

### Change Brand Colors
Edit `tailwind.config.js` colors section

### Add New Page
1. Create new file in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/Header.tsx`

### Deploy to Production
1. Build: `npm run build`
2. Upload `dist/` folder to hosting
3. Set environment variables in host

## Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 640px) { }

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) { }

/* Desktop */
@media (min-width: 1025px) { }
```

## Tailwind Utilities Used

```
Layout: grid, flex, absolute, relative, sticky
Spacing: px-4, py-3, gap-4, mb-6, pt-8
Colors: bg-slate-900, text-white, border-amber-400
Typography: text-lg, font-bold, tracking-widest
Hover: hover:bg-amber-500, hover:text-white
Responsive: md:text-2xl, lg:flex, sm:gap-4
```

## Testing Checklist

### Mobile (iPhone/Android)
- [ ] Navigation menu opens/closes
- [ ] Forms are easy to fill
- [ ] Buttons are touchable (44px+)
- [ ] Images load correctly
- [ ] Text is readable

### Tablet (iPad)
- [ ] 2-column layouts work
- [ ] Navigation visible
- [ ] Forms fill width properly
- [ ] Spacing looks good

### Desktop
- [ ] All animations smooth
- [ ] Hover states work
- [ ] 3-column layouts optimal
- [ ] Menu visible

### Forms
- [ ] Contact form submits
- [ ] Booking modal opens/closes
- [ ] Validation works
- [ ] Success message shows
- [ ] Error handling works

## Performance Tips

1. **Images**: Use compressed, modern formats
2. **Code**: Keep component files < 500 lines
3. **Animations**: Use Framer Motion's `whileInView`
4. **Database**: Use indexes on frequently queried columns
5. **CSS**: Tailwind removes unused styles automatically

## Debugging

```bash
# Check for TypeScript errors
npm run typecheck

# Run ESLint
npm run lint

# Check bundle size
npm run build -- --report-compressed-size
```

## Useful Links

- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)
- [Tailwind Docs](https://tailwindcss.com)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

## File Sizes

- HTML: 0.70 kB (gzip: 0.38 kB)
- CSS: 23.55 kB (gzip: 4.94 kB)
- JS: 480.77 kB (gzip: 140.82 kB)
- **Total**: 504 kB (gzip: 145 kB)

## Browser Compatibility

- Chrome/Edge: ✅ Latest
- Firefox: ✅ Latest
- Safari: ✅ Latest
- Mobile browsers: ✅ All modern

## Security Checklist

- ✅ RLS enabled on all tables
- ✅ Environment variables in .env
- ✅ No hardcoded secrets
- ✅ Input validation on forms
- ✅ HTTPS recommended for production
- ✅ CORS configured in Supabase

---

**Need help?** Check the full documentation in README_DK_CARMOD.md or SETUP_GUIDE.md