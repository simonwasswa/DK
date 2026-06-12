import { motion } from 'framer-motion';
import { ArrowRight, Loader } from 'lucide-react';
import { useState, useEffect } from 'react';
import AnimatedBackground from '../components/AnimatedBackground';
import { useAPI } from '../hooks/useAPI';

export default function Portfolio() {
  const [projects, setProjects] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const { getPortfolio, loading } = useAPI();

  useEffect(() => {
    getPortfolio().then(setProjects);
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered = activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-slate-900">
      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <AnimatedBackground
          images={[
            'https://images.pexels.com/photos/3625517/pexels-photo-3625517.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3625585/pexels-photo-3625585.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3625629/pexels-photo-3625629.jpeg?auto=compress&cs=tinysrgb&w=1200',
          ]}
          duration={10}
          overlayOpacity={0.7}
        >
          <div className="max-w-7xl mx-auto text-center relative z-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Our <span className="gradient-text">Portfolio</span></h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">Showcase of exceptional vehicle transformations and modifications</p>
            </motion.div>
          </div>
        </AnimatedBackground>
      </section>

      {/* Filter — dynamic categories from DB */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 border-b border-amber-400/20 overflow-hidden">
        <AnimatedBackground
          images={[
            'https://images.pexels.com/photos/3625600/pexels-photo-3625600.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3625605/pexels-photo-3625605.jpeg?auto=compress&cs=tinysrgb&w=1200',
          ]}
          duration={11}
          overlayOpacity={0.8}
        >
          <div className="max-w-7xl mx-auto relative z-20">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded font-semibold text-sm transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-amber-400 text-slate-900'
                      : 'border-2 border-amber-400/30 text-gray-300 hover:border-amber-400 hover:text-amber-400'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </AnimatedBackground>
      </section>

      {/* Portfolio Grid — live from Supabase */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader size={40} className="animate-spin text-amber-400" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: (index % 3) * 0.1 }}
                  className="group bg-slate-800/50 border border-amber-400/20 hover:border-amber-400/50 rounded-lg overflow-hidden backdrop-blur-sm cursor-pointer"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent"></div>
                    <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }} className="absolute inset-0 flex items-center justify-center">
                      <motion.div whileHover={{ scale: 1.1 }} className="w-14 h-14 bg-amber-400/20 border-2 border-amber-400 rounded-full flex items-center justify-center group-hover:bg-amber-400 group-hover:text-slate-900 transition-all duration-300">
                        <ArrowRight size={24} />
                      </motion.div>
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <span className="text-amber-400 text-xs font-bold tracking-widest">{project.category}</span>
                    <h3 className="text-xl font-bold text-white mb-2 mt-2">{project.title}</h3>
                    <p className="text-gray-400 text-sm">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <AnimatedBackground
          images={[
            'https://images.pexels.com/photos/3625610/pexels-photo-3625610.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3587620/pexels-photo-3587620.jpeg?auto=compress&cs=tinysrgb&w=1200',
          ]}
          duration={12}
          overlayOpacity={0.8}
        >
          <div className="max-w-7xl mx-auto relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {[
                { number: '5000+', label: 'Projects Completed' },
                { number: '500+', label: 'Luxury Vehicles' },
                { number: '50+', label: 'Exotic Cars' },
                { number: '98%', label: 'Client Satisfaction' },
              ].map((stat, index) => (
                <motion.div key={index} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.1 }}>
                  <h3 className="text-4xl font-black bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent mb-2">{stat.number}</h3>
                  <p className="text-gray-400">{stat.label}</p>
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
            'https://images.pexels.com/photos/3625629/pexels-photo-3625629.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3625517/pexels-photo-3625517.jpeg?auto=compress&cs=tinysrgb&w=1200',
          ]}
          duration={10}
          overlayOpacity={0.85}
        >
          <div className="max-w-4xl mx-auto text-center relative z-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to Transform Your Vehicle?</h2>
              <p className="text-lg text-gray-300 mb-8">Let our experts create your perfect automotive vision</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button className="btn-primary text-lg font-bold">START YOUR PROJECT</button>
              </motion.div>
            </motion.div>
          </div>
        </AnimatedBackground>
      </section>
    </div>
  );
}
