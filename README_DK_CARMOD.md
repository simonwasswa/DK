# DK Car Modification - Premium Website

A modern, fully responsive car modification company website built with React, TypeScript, Tailwind CSS, Framer Motion, and Supabase.

## Features

### Frontend
- **Responsive Design**: Mobile-first approach with optimized layouts for all device sizes
- **Animated Backgrounds**: Dynamic, rotating background images with smooth transitions on every page
- **Framer Motion Animations**: Smooth, professional animations and micro-interactions
- **Modern UI/UX**: Clean, premium design with proper spacing, typography, and color hierarchy
- **Dark Theme**: Professional dark color scheme with amber accents
- **Touch-Friendly**: Optimized touch targets (44px minimum) for mobile devices

### Pages
1. **Home** - Hero section, featured services, testimonials, and CTA
2. **Services** - Complete service catalog, process workflow, and FAQs
3. **About** - Company story, team showcase, values, and achievements
4. **Portfolio** - Project gallery with filtering capabilities
5. **Contact** - Contact form integrated with Supabase database

### Database Integration (Supabase)
- **Services Table**: Manage all car modification services
- **Bookings Table**: Store customer service bookings with status tracking
- **Testimonials Table**: Manage customer reviews and ratings
- **Contact Submissions**: Store and track contact form submissions
- **Service Categories**: Organize services by category

### Security
- **Row Level Security (RLS)**: Implemented on all tables
- **Public Read Access**: Services and published testimonials are publicly readable
- **Service Role Access**: Only service accounts can manage bookings and contacts
- **Insert Policies**: Anyone can submit bookings and contact forms

## Responsive Design

### Mobile (< 640px)
- Simplified navigation menu (hamburger menu)
- Single-column layouts
- Optimized font sizes and padding
- Touch-friendly buttons and inputs

### Tablet (641px - 1024px)
- Tablet-optimized layouts
- 2-column grids
- Responsive imagery
- Balanced spacing

### Desktop (> 1024px)
- Full navigation menu
- Multi-column grids
- Enhanced animations
- Optimized whitespace

## Booking System

- **Modal Dialog**: Beautiful, responsive booking modal
- **Form Validation**: Email, date, and required field validation
- **Loading States**: Visual feedback during submission
- **Success Messages**: Confirmation after successful booking
- **Error Handling**: User-friendly error messages

## Contact Form

- **Supabase Integration**: All submissions stored in database
- **Validation**: Email and required field validation
- **Loading States**: Shows loading spinner during submission
- **Success/Error Messages**: Clear user feedback

## Animations

- **Page Transitions**: Smooth fade-in animations
- **Background Transitions**: Rotating images with scaling effects
- **Floating Particles**: Subtle particle effects for depth
- **Scroll Animations**: Elements animate into view
- **Hover States**: Interactive feedback on buttons and cards
- **Mobile Optimization**: Respects `prefers-reduced-motion`

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env` file with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── AnimatedBackground.tsx    # Animated background component
│   ├── BookingModal.tsx          # Booking form modal
│   ├── Button.tsx                # Reusable button component
│   ├── FAQItem.tsx               # FAQ accordion item
│   ├── Footer.tsx                # Footer component
│   ├── Header.tsx                # Navigation header
│   ├── ServiceCard.tsx           # Service display card
│   └── TestimonialCard.tsx       # Testimonial display card
├── pages/
│   ├── About.tsx                 # About page
│   ├── Contact.tsx               # Contact page with form
│   ├── Home.tsx                  # Home/landing page
│   ├── Portfolio.tsx             # Portfolio gallery page
│   └── Services.tsx              # Services listing page
├── hooks/
│   └── useAPI.ts                 # API/Database hooks
├── lib/
│   └── supabase.ts               # Supabase client setup
├── App.tsx                       # Main app component
├── index.css                     # Global styles
└── main.tsx                      # React entry point
```

## Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Custom Components**: Reusable Tailwind component classes
- **Dark Mode**: Default dark theme with amber accents
- **Responsive Utilities**: Mobile-first breakpoints
- **Animations**: Framer Motion for complex animations

## Supabase Tables

### Services
```sql
- id (uuid, PK)
- name (text)
- description (text)
- long_description (text)
- category_id (uuid, FK)
- image_url (text)
- price_range (text)
- duration_hours (integer)
- is_featured (boolean)
- order_index (integer)
- created_at (timestamptz)
- updated_at (timestamptz)
```

### Bookings
```sql
- id (uuid, PK)
- customer_name (text)
- customer_email (text)
- customer_phone (text)
- service_id (uuid, FK)
- service_name (text)
- booking_date (date)
- booking_time (time)
- vehicle_description (text)
- special_requests (text)
- status (text: pending|confirmed|completed|cancelled)
- notes (text)
- created_at (timestamptz)
- updated_at (timestamptz)
```

### Contact Submissions
```sql
- id (uuid, PK)
- name (text)
- email (text)
- phone (text)
- subject (text)
- message (text)
- service_interest (text)
- status (text: new|read|replied|closed)
- created_at (timestamptz)
- updated_at (timestamptz)
```

### Testimonials
```sql
- id (uuid, PK)
- author_name (text)
- author_title (text)
- author_image (text)
- content (text)
- rating (integer: 1-5)
- service_id (uuid, FK)
- is_featured (boolean)
- is_published (boolean)
- created_at (timestamptz)
- updated_at (timestamptz)
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

- **Code Splitting**: Automatic with Vite
- **Image Optimization**: Lazy loading for images
- **CSS Optimization**: Tailwind purges unused styles
- **Bundle Size**: ~480KB uncompressed, ~140KB gzipped

## Accessibility

- **Semantic HTML**: Proper heading hierarchy and landmark regions
- **ARIA Labels**: Descriptive labels for interactive elements
- **Keyboard Navigation**: Full keyboard support
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Touch Targets**: Minimum 44px touch targets on mobile
- **Reduced Motion**: Respects `prefers-reduced-motion` preference

## Future Enhancements

- [ ] Admin dashboard for managing services and bookings
- [ ] Customer authentication and booking history
- [ ] Email notifications for bookings
- [ ] Payment integration (Stripe)
- [ ] Blog/News section
- [ ] Gallery lightbox for portfolio
- [ ] Service booking calendar
- [ ] Customer review system

## License

MIT License - see LICENSE file for details

## Support

For support and inquiries, contact: info@dkcarmod.com

---

Built with ❤️ using React, TypeScript, Tailwind CSS, Framer Motion, and Supabase