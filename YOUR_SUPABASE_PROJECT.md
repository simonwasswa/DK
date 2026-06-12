# Your Supabase Project Configuration

## Project Information

- **Project Name**: DK Car Modification
- **Project ID**: `pcquwfdzdogfinrsfpgj`
- **Project URL**: https://supabase.com/dashboard/project/pcquwfdzdogfinrsfpgj
- **Database URL**: https://pcquwfdzdogfinrsfpgj.supabase.co

## Environment Variables

Your `.env` file has been updated with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://pcquwfdzdogfinrsfpgj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjcXV3ZmR6ZG9nZmluUnNmcGdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3OTczNjAsImV4cCI6MjA1MzM3MzM2MH0.EZSppDJB39R5BI7CMI1K5xPqk-7t4mAo-EuXrHfuqbo
```

## What's Next: Create Your Tables

Follow these steps to set up your database:

### Option 1: Copy-Paste SQL (Easiest)

1. Open: https://supabase.com/dashboard/project/pcquwfdzdogfinrsfpgj
2. Click **SQL Editor** (left sidebar)
3. Click **New Query**
4. Read `SQL_INSTRUCTIONS.md` for the complete SQL to copy
5. Paste the SQL code
6. Click **Run**

### Option 2: Use the SQL File

The SQL file is available at:
```
supabase/sql/001_create_dk_carmod_schema.sql
```

Copy the entire contents and paste into Supabase SQL Editor.

## Tables That Will Be Created

After running the SQL, you'll have these 5 tables:

### 1. service_categories
Organizes your services into categories

**Columns:**
- `id` (UUID) - Unique identifier
- `name` (Text) - Category name (e.g., "Detailing")
- `description` (Text) - Category description
- `icon` (Text) - Emoji or icon
- `order_index` (Integer) - Display order
- `created_at` (Timestamp) - Auto-generated

**Default Categories Inserted:**
- ✨ Detailing
- ⚡ Performance
- 🔧 Repairs
- 🎨 Customization
- 🛡️ Maintenance

### 2. services
Your car modification services/products

**Columns:**
- `id` (UUID) - Unique identifier
- `name` (Text) - Service name
- `description` (Text) - Short description
- `long_description` (Text) - Full description
- `category_id` (UUID) - References service_categories
- `image_url` (Text) - Service image
- `price_range` (Text) - Price range (e.g., "$200-$500")
- `duration_hours` (Integer) - Service duration
- `is_featured` (Boolean) - Show on home page
- `order_index` (Integer) - Display order
- `created_at` (Timestamp) - Auto-generated
- `updated_at` (Timestamp) - Auto-updated

**3 Sample Services Will Be Inserted:**
1. Exterior Detailing ($200-$500, 4 hours)
2. Interior Detailing ($150-$400, 3 hours)
3. Paint Correction ($300-$800, 6 hours)

### 3. bookings
Customer service booking requests

**Columns:**
- `id` (UUID) - Booking ID
- `customer_name` (Text) - Customer's name
- `customer_email` (Text) - Customer's email
- `customer_phone` (Text) - Customer's phone
- `service_id` (UUID) - References services
- `service_name` (Text) - Service name
- `booking_date` (Date) - Requested date
- `booking_time` (Time) - Requested time
- `vehicle_description` (Text) - Vehicle details
- `special_requests` (Text) - Special requests
- `status` (Text) - pending, confirmed, completed, cancelled
- `notes` (Text) - Internal notes
- `created_at` (Timestamp) - When submitted
- `updated_at` (Timestamp) - Last updated

**RLS Policies:**
- Service role can manage all bookings
- Anyone can insert new bookings

### 4. contact_submissions
Contact form submissions

**Columns:**
- `id` (UUID) - Submission ID
- `name` (Text) - Sender's name
- `email` (Text) - Sender's email
- `phone` (Text) - Sender's phone
- `subject` (Text) - Message subject
- `message` (Text) - Message content
- `service_interest` (Text) - Service interested in
- `status` (Text) - new, read, replied, closed
- `created_at` (Timestamp) - When submitted
- `updated_at` (Timestamp) - Last updated

**RLS Policies:**
- Service role can manage all submissions
- Anyone can insert new submissions

### 5. testimonials
Customer reviews and testimonials

**Columns:**
- `id` (UUID) - Testimonial ID
- `author_name` (Text) - Customer name
- `author_title` (Text) - Customer title/role
- `author_image` (Text) - Customer photo URL
- `content` (Text) - Testimonial text
- `rating` (Integer) - 1-5 star rating
- `service_id` (UUID) - References services
- `is_featured` (Boolean) - Show on home page
- `is_published` (Boolean) - Make visible to public
- `created_at` (Timestamp) - When created
- `updated_at` (Timestamp) - Last updated

**RLS Policies:**
- Everyone can read published testimonials
- Service role can manage all testimonials

## Security Features

✅ **Row Level Security (RLS)** enabled on all tables

✅ **Public read access** for:
- service_categories
- services
- published testimonials

✅ **Insert-only access** for:
- bookings (visitors can submit)
- contact_submissions (visitors can submit)

✅ **Service role access** for:
- Full management of all data
- Used by admin/support team

## How to Access Your Data

### View Bookings
1. Go to Supabase Dashboard
2. Click **Table Editor**
3. Select **bookings**
4. See all booking submissions

### View Contact Submissions
1. Go to Supabase Dashboard
2. Click **Table Editor**
3. Select **contact_submissions**
4. See all contact form submissions

### Manage Services
1. Go to Supabase Dashboard
2. Click **Table Editor**
3. Select **services**
4. Add, edit, or delete services

### View Website Activity
1. Check **bookings** table for appointment requests
2. Check **contact_submissions** table for inquiries

## Testing the Connection

After creating tables:

1. Start development server:
   ```bash
   npm run dev
   ```

2. Test Contact Form:
   - Go to Contact page
   - Fill and submit form
   - Check Supabase Dashboard → contact_submissions

3. Test Booking System:
   - Go to Home page
   - Click "Book Appointment"
   - Fill and submit booking
   - Check Supabase Dashboard → bookings

## Important URLs

| Resource | URL |
|----------|-----|
| **Dashboard** | https://supabase.com/dashboard/project/pcquwfdzdogfinrsfpgj |
| **SQL Editor** | https://supabase.com/dashboard/project/pcquwfdzdogfinrsfpgj/sql |
| **Table Editor** | https://supabase.com/dashboard/project/pcquwfdzdogfinrsfpgj/editor |
| **Database URL** | https://pcquwfdzdogfinrsfpgj.supabase.co |
| **API Reference** | https://supabase.com/dashboard/project/pcquwfdzdogfinrsfpgj/api |

## Managing Data

### Add a Service
```sql
INSERT INTO services (
  name, 
  description, 
  category_id, 
  image_url, 
  price_range, 
  duration_hours, 
  is_featured
) VALUES (
  'Engine Tune Up',
  'Performance engine tuning',
  (SELECT id FROM service_categories WHERE name = 'Performance'),
  'https://image-url.jpg',
  '$400 - $1000',
  2,
  true
);
```

### Add a Testimonial
```sql
INSERT INTO testimonials (
  author_name,
  author_title,
  author_image,
  content,
  rating,
  is_published
) VALUES (
  'John Smith',
  'Car Enthusiast',
  'https://image-url.jpg',
  'Amazing service! Highly recommend DK Car Modification.',
  5,
  true
);
```

### Update Booking Status
```sql
UPDATE bookings 
SET status = 'confirmed', notes = 'Confirmed appointment'
WHERE id = 'booking-uuid-here';
```

## Documentation Files

| File | Purpose |
|------|---------|
| SQL_INSTRUCTIONS.md | Step-by-step SQL setup guide |
| SUPABASE_SETUP.md | Detailed Supabase setup guide |
| YOUR_SUPABASE_PROJECT.md | This file - project overview |
| README_DK_CARMOD.md | Complete feature documentation |
| SETUP_GUIDE.md | Website setup guide |

## Troubleshooting

### Tables Not Appearing
1. Check SQL Editor for error messages
2. Verify you're in the correct project (pcquwfdzdogfinrsfpgj)
3. Try running the SQL again

### Forms Not Saving
1. Check if tables exist in Table Editor
2. Verify .env file has correct credentials
3. Clear browser cache (Ctrl+Shift+Delete)
4. Check browser console for errors (F12)

### Connection Error
1. Verify VITE_SUPABASE_URL in .env
2. Verify VITE_SUPABASE_ANON_KEY in .env
3. Restart dev server (npm run dev)

## Next Steps

1. ✅ Read `SQL_INSTRUCTIONS.md`
2. ✅ Run the SQL in Supabase SQL Editor
3. ✅ Verify tables appear in Table Editor
4. ✅ Test forms (contact and booking)
5. ✅ Add your own services
6. ✅ Deploy to production

## Support

Need help?
- Check `SQL_INSTRUCTIONS.md` for SQL setup
- Check `SUPABASE_SETUP.md` for detailed guide
- See `README_DK_CARMOD.md` for features
- Review `QUICK_REFERENCE.md` for commands

---

**Your project is ready to go!** 

Run the SQL and start using your database. 🚀