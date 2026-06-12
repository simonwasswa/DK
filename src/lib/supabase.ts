import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      service_categories: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          icon: string | null;
          order_index: number;
          created_at: string;
          updated_at: string;
        };
      };
      services: {
        Row: {
          id: string;
          name: string;
          description: string;
          long_description: string | null;
          category_id: string | null;
          image_url: string | null;
          price_range: string | null;
          duration_hours: number | null;
          is_featured: boolean;
          order_index: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          description: string;
          long_description?: string;
          category_id?: string;
          image_url?: string;
          price_range?: string;
          duration_hours?: number;
          is_featured?: boolean;
          order_index?: number;
        };
        Update: {
          name?: string;
          description?: string;
          long_description?: string;
          category_id?: string;
          image_url?: string;
          price_range?: string;
          duration_hours?: number;
          is_featured?: boolean;
          order_index?: number;
        };
      };
      bookings: {
        Row: {
          id: string;
          customer_name: string;
          customer_email: string;
          customer_phone: string | null;
          service_id: string | null;
          service_name: string;
          booking_date: string;
          booking_time: string | null;
          vehicle_description: string | null;
          special_requests: string | null;
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          customer_name: string;
          customer_email: string;
          customer_phone?: string;
          service_id?: string;
          service_name: string;
          booking_date: string;
          booking_time?: string;
          vehicle_description?: string;
          special_requests?: string;
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          notes?: string;
        };
        Update: {
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          notes?: string;
        };
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string | null;
          message: string;
          service_interest: string | null;
          status: 'new' | 'read' | 'replied' | 'closed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          email: string;
          phone?: string;
          subject?: string;
          message: string;
          service_interest?: string;
        };
        Update: {
          status?: 'new' | 'read' | 'replied' | 'closed';
        };
      };
      testimonials: {
        Row: {
          id: string;
          author_name: string;
          author_title: string | null;
          author_image: string | null;
          content: string;
          rating: number;
          service_id: string | null;
          is_featured: boolean;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          author_name: string;
          author_title?: string;
          author_image?: string;
          content: string;
          rating: number;
          service_id?: string;
          is_featured?: boolean;
          is_published?: boolean;
        };
        Update: {
          is_published?: boolean;
          is_featured?: boolean;
        };
      };
      portfolio: {
        Row: {
          id: string;
          title: string;
          category: string;
          image_url: string;
          description: string | null;
          is_published: boolean;
          order_index: number;
          created_at: string;
          updated_at: string;
        };
      };
      team_members: {
        Row: {
          id: string;
          name: string;
          title: string;
          image_url: string | null;
          bio: string | null;
          order_index: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
};
