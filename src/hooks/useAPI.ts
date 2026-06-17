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

  const getStoryVideo = async () => {
  setLoading(true);
  setError(null);
  try {
    const { data, error: fetchError } = await supabase
      .from('about_content')
      .select('title, video_url, video_thumbnail_url, body')
      .eq('section', 'story')
      .eq('is_published', true)
      .maybeSingle();
    if (fetchError) throw fetchError;
    if (!data?.video_url) return null;

    // Auto-convert any YouTube URL format to embed
    const convertToEmbed = (url: string): string => {
      // Already an embed URL — return as is
      if (url.includes('youtube.com/embed/')) return url;
      // youtu.be/VIDEO_ID
      const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
      if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
      // youtube.com/watch?v=VIDEO_ID
      const watchMatch = url.match(/[?&]v=([^?&]+)/);
      if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
      // Not a YouTube URL (e.g. direct MP4) — return as is
      return url;
    };

    // Auto-generate thumbnail from video ID if thumbnail is missing or wrong
    const extractVideoId = (url: string): string | null => {
      const embedMatch = url.match(/embed\/([^?&]+)/);
      if (embedMatch) return embedMatch[1];
      const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
      if (shortMatch) return shortMatch[1];
      const watchMatch = url.match(/[?&]v=([^?&]+)/);
      if (watchMatch) return watchMatch[1];
      return null;
    };

    const embedUrl = convertToEmbed(data.video_url);
    const videoId = extractVideoId(data.video_url);
    const thumbnail =
      data.video_thumbnail_url && !data.video_thumbnail_url.includes('watch?v=')
        ? data.video_thumbnail_url
        : videoId
        ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        : null;

    return {
      title: data.title,
      url: embedUrl,
      thumbnail_url: thumbnail,
      description: null,
    };
  } catch (err) {
    setError(err instanceof Error ? err.message : 'An error occurred');
    return null;
  } finally {
    setLoading(false);
  }
};

  const getAboutContent = async (section?: string) => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('about_content')
        .select('*')
        .eq('is_published', true);
      if (section) {
        query = query.eq('section', section);
      }
      const { data, error: fetchError } = await query;
      if (fetchError) throw fetchError;
      // If a specific section was requested return the single object, otherwise return all
      if (section) return data?.[0] || null;
      return data || [];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return section ? null : [];
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
    getStoryVideo,
    getAboutContent,
  };
};