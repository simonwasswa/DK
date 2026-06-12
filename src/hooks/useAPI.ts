import { useState } from 'react';
import { supabase, type Database } from '../lib/supabase';

export const useAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitContact = async (data: Database['public']['Tables']['contact_submissions']['Insert']) => {
    setLoading(true);
    setError(null);
    try {
      const { error: submitError } = await supabase
        .from('contact_submissions')
        .insert([data]);
      if (submitError) throw submitError;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (data: Database['public']['Tables']['bookings']['Insert']) => {
    setLoading(true);
    setError(null);
    try {
      const { data: booking, error: submitError } = await supabase
        .from('bookings')
        .insert([data])
        .select()
        .maybeSingle();
      if (submitError) throw submitError;
      return booking;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('services')
        .select('*')
        .order('order_index', { ascending: true });
      if (fetchError) throw fetchError;
      return data || [];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getFeaturedServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('services')
        .select('*')
        .eq('is_featured', true)
        .order('order_index', { ascending: true });
      if (fetchError) throw fetchError;
      return data || [];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getTestimonials = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_published', true)
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(6);
      if (fetchError) throw fetchError;
      return data || [];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getPortfolio = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('portfolio')
        .select('*')
        .eq('is_published', true)
        .order('order_index', { ascending: true });
      if (fetchError) throw fetchError;
      return data || [];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getTeamMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_published', true)
        .order('order_index', { ascending: true });
      if (fetchError) throw fetchError;
      return data || [];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    submitContact,
    createBooking,
    getServices,
    getFeaturedServices,
    getTestimonials,
    getPortfolio,
    getTeamMembers,
  };
};
