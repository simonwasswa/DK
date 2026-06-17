import { motion } from 'framer-motion';
import { Users, Award, Zap, Heart, Loader, Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import AnimatedBackground from '../components/AnimatedBackground';
import { useAPI } from '../hooks/useAPI';
import { supabase } from '../lib/supabase';

export default function About() {
  const [team, setTeam] = useState<any[]>([]);
  const [storyVideo, setStoryVideo] = useState<any>(null);
  const [videoLoading, setVideoLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const { getTeamMembers, getStoryVideo, loading } = useAPI();

  useEffect(() => {
    // Initial data fetch
    getTeamMembers().then(setTeam);
    getStoryVideo().then((video) => {
      setStoryVideo(video);
      setVideoLoading(false);
    });

    // Real-time subscription on videos table
    const channel = supabase
  .channel('about-content-realtime')
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'about_content',
      filter: 'section=eq.story',
    },
    async () => {
      const updated = await getStoryVideo();
      setStoryVideo(updated);
      setIsPlaying(false); // reset player on video change
    }
  )
  .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const stats = [
    { number: '5000+', label: 'Vehicles Transformed' },
    { number: '98%', label: 'Customer Satisfaction' },
    { number: '15+', label: 'Years of Experience' },
    { number: '24/7', label: 'Support Available' },
  ];

  const values = [
    { icon: <Award size={32} />, title: 'Excellence', description: 'Committed to the highest quality workmanship in every project' },
    { icon: <Heart size={32} />, title: 'Passion', description: 'We love what we do and it shows in the dedication to every vehicle' },
    { icon: <Zap size={32} />, title: 'Innovation', description: 'Constantly exploring new techniques and technologies for better results' },
    { icon: <Users size={32} />, title: 'Trust', description: 'Building lasting relationships based on honesty and integrity' },
  ];

  const isEmbedUrl = (url: string) =>
    url?.includes('youtube.com/embed') || url?.includes('player.vimeo.com');

  return (
    <div className="bg-slate-900">
      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <AnimatedBackground
          images={[
            'https://images.pexels.com/photos/3625517/pexels-photo-3625517.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3625585/pexels-photo-3625585.jpeg?auto=compress&cs=tinysrgb&w=1200',
          ]}
          duration={10}
          overlayOpacity={0.7}
        >
          <div className="max-w-7xl mx-auto text-center relative z-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
                About <span className="gradient-text">DK Car Modification</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Transforming vehicles and exceeding expectations since 2009
              </p>
            </motion.div>
          </div>
        </AnimatedBackground>
      </section>

      {/* Stats */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-y border-amber-400/20">
        <AnimatedBackground
          images={[
            'https://images.pexels.com/photos/3625600/pexels-photo-3625600.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3625605/pexels-photo-3625605.jpeg?auto=compress&cs=tinysrgb&w=1200',
          ]}
          duration={11}
          overlayOpacity={0.8}
        >
          <div className="max-w-7xl mx-auto relative z-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div key={index} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.1 }} className="text-center">
                  <h3 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent mb-2">{stat.number}</h3>
                  <p className="text-gray-300 font-semibold">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedBackground>
      </section>

      {/* Story — real-time video */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <AnimatedBackground
          images={[
            'https://images.pexels.com/photos/3625517/pexels-photo-3625517.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3625629/pexels-photo-3625629.jpeg?auto=compress&cs=tinysrgb&w=1200',
          ]}
          duration={12}
          overlayOpacity={0.75}
        >
          <div className="max-w-7xl mx-auto relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

              {/* Video Player */}
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                {videoLoading ? (
                  <div className="flex items-center justify-center h-96 rounded-lg bg-slate-800/50 border border-amber-400/20">
                    <Loader size={40} className="animate-spin text-amber-400" />
                  </div>
                ) : storyVideo ? (
                  <div className="relative rounded-lg overflow-hidden shadow-2xl shadow-amber-400/20 h-96 bg-black">
                    {isEmbedUrl(storyVideo.url) ? (
                      <iframe
                        src={`${storyVideo.url}?autoplay=0&rel=0&modestbranding=1`}
                        title={storyVideo.title}
                        className="w-full h-full"
                        style={{ border: 0 }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : isPlaying ? (
                      <video
                        src={storyVideo.url}
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        poster={storyVideo.thumbnail_url}
                      />
                    ) : (
                      <div className="relative w-full h-full cursor-pointer group" onClick={() => setIsPlaying(true)}>
                        <img
                          src={storyVideo.thumbnail_url || 'https://images.pexels.com/photos/3625517/pexels-photo-3625517.jpeg?auto=compress&cs=tinysrgb&w=600'}
                          alt={storyVideo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                          <motion.div
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center w-20 h-20 rounded-full bg-amber-400 text-slate-900 shadow-xl shadow-amber-400/40"
                          >
                            <Play size={32} fill="currentColor" />
                          </motion.div>
                        </div>
                        {storyVideo.description && (
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                            <p className="text-white text-sm font-medium">{storyVideo.description}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Fallback: no video in DB yet — shows a waiting indicator */
                  <div className="flex flex-col items-center justify-center h-96 rounded-lg bg-slate-800/50 border border-dashed border-amber-400/40 gap-4">
                    <Play size={48} className="text-amber-400/50" />
                    <p className="text-gray-400 text-sm text-center px-6">
                      Video will appear here once uploaded to the database
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Story Text */}
              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <h2 className="section-title mb-6">Our Story</h2>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  DK Car Modification was founded in 2009 with a simple vision: to provide world-class automotive modification and detailing services. What started as a small garage has grown into a premier automotive destination, trusted by thousands of car enthusiasts.
                </p>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Our founder brought his passion for automobiles and meticulous attention to detail to create a company that stands apart.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Today, we're proud to have transformed over 5,000 vehicles and maintained a 98% customer satisfaction rate.
                </p>
              </motion.div>
            </div>
          </div>
        </AnimatedBackground>
      </section>

      {/* Values */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <AnimatedBackground
          images={[
            'https://images.pexels.com/photos/3625610/pexels-photo-3625610.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3587620/pexels-photo-3587620.jpeg?auto=compress&cs=tinysrgb&w=1200',
          ]}
          duration={10}
          overlayOpacity={0.8}
        >
          <div className="max-w-7xl mx-auto relative z-20">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-16">
              <span className="text-amber-400 font-bold tracking-widest text-sm">OUR VALUES</span>
              <h2 className="section-title">What Drives Us</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div key={index} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.1 }} className="bg-slate-800/50 border border-amber-400/20 rounded-lg p-8 text-center hover:border-amber-400/50 transition-colors duration-300">
                  <motion.div whileHover={{ scale: 1.1, rotate: 10 }} className="inline-block text-amber-400 mb-4">{value.icon}</motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400 text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedBackground>
      </section>

      {/* Team — live from Supabase */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <AnimatedBackground
          images={[
            'https://images.pexels.com/photos/3625605/pexels-photo-3625605.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3625600/pexels-photo-3625600.jpeg?auto=compress&cs=tinysrgb&w=1200',
          ]}
          duration={11}
          overlayOpacity={0.75}
        >
          <div className="max-w-7xl mx-auto relative z-20">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-16">
              <span className="text-amber-400 font-bold tracking-widest text-sm">OUR TEAM</span>
              <h2 className="section-title">Meet the <span className="gradient-text">Experts</span></h2>
              <p className="section-subtitle">Dedicated professionals with a passion for excellence</p>
            </motion.div>
            {loading ? (
              <div className="flex justify-center py-10">
                <Loader size={40} className="animate-spin text-amber-400" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member, index) => (
                  <motion.div key={member.id} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.1 }} className="group bg-slate-800/50 border border-amber-400/20 rounded-lg overflow-hidden hover:border-amber-400/50 transition-colors duration-300">
                    <div className="relative h-64 overflow-hidden">
                      <img src={member.image_url} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                      <p className="text-amber-400 font-semibold text-sm mb-3">{member.title}</p>
                      <p className="text-gray-400 text-sm">{member.bio}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </AnimatedBackground>
      </section>

      {/* Why Choose Us */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <AnimatedBackground
          images={[
            'https://images.pexels.com/photos/3625585/pexels-photo-3625585.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3625629/pexels-photo-3625629.jpeg?auto=compress&cs=tinysrgb&w=1200',
          ]}
          duration={12}
          overlayOpacity={0.8}
        >
          <div className="max-w-7xl mx-auto relative z-20">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-16">
              <h2 className="section-title">Why Choose DK?</h2>
              <p className="section-subtitle">Leading the industry with innovation and integrity</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                'Certified technicians with 15+ years experience',
                'State-of-the-art equipment and facilities',
                'Comprehensive warranty on all services',
                '24/7 customer support available',
                'Premium quality materials only',
                'Custom solutions for unique projects',
                'Transparent pricing with no hidden fees',
                'Quick turnaround times without compromising quality',
              ].map((reason, index) => (
                <motion.div key={index} initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: (index % 2) * 0.2 }} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-6 w-6 rounded-md bg-amber-400 text-slate-900">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-300">{reason}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedBackground>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden border-y border-amber-400/20">
        <AnimatedBackground
          images={[
            'https://images.pexels.com/photos/3625517/pexels-photo-3625517.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3625610/pexels-photo-3625610.jpeg?auto=compress&cs=tinysrgb&w=1200',
          ]}
          duration={9}
          overlayOpacity={0.85}
        >
          <div className="max-w-4xl mx-auto text-center relative z-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Experience the DK Difference</h2>
              <p className="text-lg text-gray-300 mb-8">Join thousands of satisfied customers and transform your vehicle today</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button className="btn-primary text-lg font-bold rounded-3xl">GET IN TOUCH</button>
              </motion.div>
            </motion.div>
          </div>
        </AnimatedBackground>
      </section>
    </div>
  );
}