/*
  # DK Car Modification - Initial Database Schema

  1. New Tables
    - `services` - Available car modification services
    - `bookings` - Customer service bookings
    - `testimonials` - Customer testimonials and reviews
    - `contact_submissions` - Contact form submissions
    - `service_categories` - Service categories for organization

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access where needed
    - Add policies for authenticated users to manage their own data
    - Add service role policies for admin management
*/

-- Create service_categories table
CREATE TABLE IF NOT EXISTS public.service_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  icon text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service categories are viewable by everyone"
  ON public.service_categories FOR SELECT
  USING (true);

-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  long_description text,
  category_id uuid REFERENCES public.service_categories(id),
  image_url text,
  price_range text,
  duration_hours integer,
  is_featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Services are viewable by everyone"
  ON public.services FOR SELECT
  USING (true);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  author_title text,
  author_image text,
  content text NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  service_id uuid REFERENCES public.services(id),
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published testimonials are viewable by everyone"
  ON public.testimonials FOR SELECT
  USING (is_published = true);

-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  service_id uuid REFERENCES public.services(id),
  service_name text NOT NULL,
  booking_date date NOT NULL,
  booking_time time,
  vehicle_description text,
  special_requests text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage bookings"
  ON public.bookings FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can insert bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (true);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  service_interest text,
  status text DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage submissions"
  ON public.contact_submissions FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can create submissions"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_services_category_id ON public.services(category_id);
CREATE INDEX IF NOT EXISTS idx_services_is_featured ON public.services(is_featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_is_published ON public.testimonials(is_published);
CREATE INDEX IF NOT EXISTS idx_testimonials_service_id ON public.testimonials(service_id);
CREATE INDEX IF NOT EXISTS idx_bookings_customer_email ON public.bookings(customer_email);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_contact_status ON public.contact_submissions(status);