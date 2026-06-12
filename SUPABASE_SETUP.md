# Supabase Setup Guide for DK Car Modification

Your Supabase Project: **pcquwfdzdogfinrsfpgj**

## Step 1: Access Your Supabase Dashboard

1. Go to: https://supabase.com/dashboard/project/pcquwfdzdogfinrsfpgj
2. Log in with your Supabase account
3. You should see your project dashboard

## Step 2: Go to SQL Editor

1. Click on **SQL Editor** in the left sidebar
2. Click **New Query** button (top right)

## Step 3: Copy and Run the Schema SQL

1. Open the file: `supabase/sql/001_create_dk_carmod_schema.sql`
2. Copy **all the SQL code**
3. Paste it into the Supabase SQL Editor
4. Click **Run** button (or press Ctrl+Enter)

**Wait** for the query to complete (usually takes 5-10 seconds)

## Step 4: Verify Tables Were Created

Go to **Table Editor** in the left sidebar and verify you see these tables:

✓ `service_categories`  
✓ `services`  
✓ `testimonials`  
✓ `bookings`  
✓ `contact_submissions`  

If all 5 tables appear, **you're done!**

## Step 5: Update Your Environment Variables

Your `.env` file has already been updated with:

```env
VITE_SUPABASE_URL=https://pcquwfdzdogfinrsfpgj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjcXV3ZmR6ZG9nZmluUnNmcGdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3OTczNjAsImV4cCI6MjA1MzM3MzM2MH0.EZSppDJB39R5BI7CMI1K5xPqk-7t4mAo-EuXrHfuqbo
```

## Step 6: Test the Connection

```bash
npm run dev
```

Visit your site and test:
- Try submitting the **Contact Form** (Check Supabase Dashboard → contact_submissions table)
- Try opening the **Booking Modal** (Click "Book Appointment" on Home page)

Submit test data and verify it appears in your Supabase tables!

## Database Tables Explained

### service_categories
Organizes services into groups

| Column | Type | Example |
|--------|------|---------|
| id | uuid | auto-generated |
| name | text | "Detailing" |
| description | text | "Professional detailing services" |
| icon | text | "✨" |
| order_index | integer | 1 |

### services
Your available services/products

| Column | Type | Example |
|--------|------|---------|
| id | uuid | auto-generated |
| name | text | "Exterior Detailing" |
| description | text | "Professional exterior detailing..." |
| category_id | uuid | references service_categories |
| image_url | text | "https://..." |
| price_range | text | "$200 - $500" |
| is_featured | boolean | true |

### bookings
Customer service bookings

| Column | Type | Example |
|--------|------|---------|
| id | uuid | auto-generated |
| customer_name | text | "John Doe" |
| customer_email | text | "john@example.com" |
| service_id | uuid | references services |
| booking_date | date | "2026-06-15" |
| booking_time | time | "14:00" |
| status | text | "pending" |
| created_at | timestamptz | auto-generated |

### contact_submissions
Contact form submissions

| Column | Type | Example |
|--------|------|---------|
| id | uuid | auto-generated |
| name | text | "Jane Smith" |
| email | text | "jane@example.com" |
| message | text | "I have a question..." |
| status | text | "new" |
| created_at | timestamptz | auto-generated |

### testimonials
Customer reviews and testimonials

| Column | Type | Example |
|--------|------|---------|
| id | uuid | auto-generated |
| author_name | text | "Client Name" |
| author_image | text | "https://..." |
| content | text | "Great service!" |
| rating | integer | 5 |
| is_published | boolean | true |

## Security (Row Level Security - RLS)

**What's Enabled:**

✓ **service_categories**: Everyone can read  
✓ **services**: Everyone can read  
✓ **testimonials**: Everyone can read published only  
✓ **bookings**: Service role can manage, anyone can insert  
✓ **contact_submissions**: Service role can manage, anyone can insert  

This means:
- Your website visitors can view services
- Anyone can submit contact forms and bookings
- Only your admin (service role) can manage the data
- No one can accidentally delete data

## Adding Sample Data

Your SQL already includes 3 sample services. To add more:

**Option 1: Via Supabase UI**
1. Go to **Table Editor**
2. Click on **services** table
3. Click **Insert Row**
4. Fill in the details
5. Click **Save**

**Option 2: Via SQL**
```sql
INSERT INTO public.services (
  name, 
  description, 
  category_id, 
  image_url, 
  price_range, 
  duration_hours, 
  is_featured
) VALUES (
  'Engine Tune Up',
  'Performance engine tuning and optimization',
  (SELECT id FROM public.service_categories WHERE name = 'Performance'),
  'https://images.pexels.com/photos/3625629/pexels-photo-3625629.jpeg',
  '$400 - $1000',
  2,
  true
);
```

## Checking Your Data

### View Contact Form Submissions
1. Go to Supabase Dashboard
2. Click **Table Editor**
3. Select **contact_submissions**
4. You'll see all form submissions here

### View Bookings
1. Click **Table Editor**
2. Select **bookings**
3. You'll see all booking requests here

### Manage Services
1. Click **Table Editor**
2. Select **services**
3. Add, edit, or delete services

## Troubleshooting

### SQL Error: "already exists"
- This is normal if you've already run the SQL
- Just run it again, it checks for existing tables

### "Permission denied" error
- Make sure you're in your own project
- Check project ID matches: `pcquwfdzdogfinrsfpgj`

### Forms not saving data
1. Check if tables exist in Table Editor
2. Verify environment variables in `.env`
3. Clear browser cache and try again
4. Check browser console for errors (F12)

### Data not appearing in table
1. Submit the form again
2. Refresh the page
3. Check Supabase for recent entries
4. Check RLS policies are correct

## Next Steps

1. ✅ Run the SQL to create tables
2. ✅ Verify tables appear in Table Editor
3. ✅ Test forms with sample data
4. ✅ Add your own services
5. ✅ Customize service details
6. ✅ Deploy your site!

## Getting Help

If you encounter issues:
1. Check the Supabase logs (see bottom of SQL editor)
2. Verify your project ID: `pcquwfdzdogfinrsfpgj`
3. Check environment variables match
4. Review the error message for details

---

**Your project is ready!** Once you run the SQL, your website will be fully functional with database integration.

Happy coding! 🚀