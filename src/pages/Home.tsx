import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Users, Phone, Loader } from 'lucide-react';
import { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard';
import AnimatedBackground from '../components/AnimatedBackground';
import BookingModal from '../components/BookingModal';
import { useAPI } from '../hooks/useAPI';

type Service = {
  id: string;
  name: string;
  description: string;
  image_url: string | null;
};

type Testimonial = {
  id: string;
  author_name: string;
  author_title: string | null;
  author_image: string | null;
  content: string;
  rating: number;
};

export default function Home() {
  const [bookingModal, setBookingModal] = useState({ isOpen: false, serviceName: '', serviceId: '' });
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const { getFeaturedServices, getTestimonials, loading } = useAPI();

  useEffect(() => {
    getFeaturedServices().then(setServices);
    getTestimonials().then(setTestimonials);
  }, []);

  const openBooking = (serviceName: string, serviceId: string = '') => {
    setBookingModal({ isOpen: true, serviceName, serviceId });
  };
  const closeBooking = () => {
    setBookingModal({ isOpen: false, serviceName: '', serviceId: '' });
  };

  const features = [
    { icon: <Zap className="w-8 h-8" />, title: 'Expert Technicians', description: 'Certified professionals with years of experience' },
    { icon: <Shield className="w-8 h-8" />, title: '24/7 Support', description: 'Always available for your automotive needs' },
    { icon: <Users className="w-8 h-8" />, title: 'Premium Quality', description: 'Only the best materials and equipment used' },
  ];

  return (
    <div className="bg-slate-900 mt-[-50px]">
      <BookingModal
        isOpen={bookingModal.isOpen}
        onClose={closeBooking}
        serviceName={bookingModal.serviceName}
        serviceId={bookingModal.serviceId}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden mt-[-50px]">
        <AnimatedBackground
          images={[
            'https://i.pinimg.com/736x/cc/4b/0a/cc4b0a0eec06a4e3d996a2e08f2a91c7.jpg',
            'https://i.pinimg.com/736x/64/f8/4c/64f84c32dfec15897b646e0068cefa92.jpg',
            'https://i.pinimg.com/736x/6e/03/3a/6e033a3a8acc73ac35335a3f1e7dd18b.jpg',
          ]}
          duration={20}
          overlay={true}
          overlayOpacity={1.5}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center md:text-left md:max-w-2xl"
            >
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-4">
                <span className="text-amber-400 font-bold tracking-widest text-sm">DRIVE WITH CONFIDENCE</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
              >
                Premium Car <span className="text-amber-400">Modification</span> & Repair Solutions
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-gray-300 mb-8 leading-relaxed"
              >
                Transform your vehicle with our expert team. From performance tuning to aesthetic enhancements, we deliver excellence at every turn.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start"
              >
                <button
                  onClick={() => openBooking('Service')}
                  className="btn-primary text-base sm:text-lg rounded-3xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-amber-400/50"
                >
                  BOOK APPOINTMENT <ArrowRight size={18} />
                </button>
                <Link to="/services" className="btn-secondary text-base sm:text-lg rounded-3xl font-bold flex items-center justify-center gap-2">
                  EXPLORE SERVICES
                </Link>
              </motion.div>
            </motion.div>
          </div>
          
            <div className="w-6 h-10  justify-center p-2">
              
            </div>
        
        </AnimatedBackground>
      </section>

      {/* Features Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden h-auto  mt-[-50px]">
        <AnimatedBackground
          images={[
            'https://i.pinimg.com/736x/7a/83/60/7a836086ac64a68e54c6ddf6142adee1.jpg',
            'https://i.pinimg.com/originals/db/82/3d/db823dbff6c5a1be6035b7714a74c322.gif',
          ]}
          duration={20}
          overlayOpacity={1.5}
        >
          <div className="max-w-7xl mx-auto relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <motion.div whileHover={{ scale: 1.1, rotate: 10 }} className="inline-block text-amber-400 mb-4 p-4 bg-amber-400/10 rounded-lg">
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedBackground>
      </section>

      {/* Services Section — live from Supabase */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <AnimatedBackground
          images={[
            'https://images.pexels.com/photos/3625610/pexels-photo-3625610.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3625605/pexels-photo-3625605.jpeg?auto=compress&cs=tinysrgb&w=1200',
          ]}
          duration={12}
          overlayOpacity={0.8}
        >
          <div className="max-w-7xl mx-auto relative z-20">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-center mb-16">
              <span className="text-amber-400 font-bold tracking-widest text-sm">OUR SERVICES</span>
              <h2 className="section-title">Delivering Superior Car <span className="gradient-text">Modification</span> Solutions</h2>
              <p className="section-subtitle">Complete automotive care from performance to aesthetics</p>
            </motion.div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader size={40} className="animate-spin text-amber-400" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <ServiceCard
                    key={service.id}
                    icon={<Zap size={24} />}
                    title={service.name}
                    description={service.description}
                    image={service.image_url || 'https://images.pexels.com/photos/3587620/pexels-photo-3587620.jpeg?auto=compress&cs=tinysrgb&w=600'}
                    onBook={() => openBooking(service.name, service.id)}
                  />
                ))}
              </div>
            )}

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center mt-12">
              <Link to="/services" className="btn-primary inline-flex items-center gap-2  rounded-3xl text-lg">
                VIEW ALL SERVICES <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </AnimatedBackground>
      </section>

      {/* About Preview */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <AnimatedBackground
          images={[
            'https://images.pexels.com/photos/3803517/pexels-photo-3803517.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3625517/pexels-photo-3625517.jpeg?auto=compress&cs=tinysrgb&w=1200',
          ]}
          duration={10}
          overlayOpacity={0.75}
        >
          <div className="max-w-7xl mx-auto relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <img src="https://images.pexels.com/photos/3803517/pexels-photo-3803517.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Professional Team" className="rounded-lg shadow-2xl shadow-amber-400/20 object-cover h-96 w-full" />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <span className="text-amber-400 font-bold tracking-widest text-sm">WHO WE ARE</span>
                <h2 className="section-title mb-6">Car Modification & Repair Services You Can Rely On</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">With over 15 years of experience in the automotive industry, DK Car Modification has become a trusted name for premium car modifications and repair services.</p>
                <p className="text-gray-300 mb-8 leading-relaxed">We're committed to excellence and customer satisfaction. From performance tuning to aesthetic enhancements, every project receives our full attention and expertise.</p>
                <Link to="/about" className="btn-secondary inline-flex items-center gap-2 rounded-3xl">
                  LEARN MORE <ArrowRight size={20} />
                </Link>
              </motion.div>
            </div>
          </div>
        </AnimatedBackground>
      </section>

      {/* Testimonials — live from Supabase */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <AnimatedBackground
          images={[
            'https://images.pexels.com/photos/3625629/pexels-photo-3625629.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3587620/pexels-photo-3587620.jpeg?auto=compress&cs=tinysrgb&w=1200',
          ]}
          duration={9}
          overlayOpacity={0.8}
        >
          <div className="max-w-7xl mx-auto relative z-20">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-center mb-16">
              <span className="text-amber-400 font-bold tracking-widest text-sm">CLIENT SATISFACTION</span>
              <h2 className="section-title">What Our Customers Say</h2>
              <p className="section-subtitle">Trusted by automotive enthusiasts across the region</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, index) => (
                <TestimonialCard
                  key={t.id}
                  name={t.author_name}
                  title={t.author_title || ''}
                  image={t.author_image || ''}
                  text={t.content}
                  rating={t.rating}
                />
              ))}
            </div>
          </div>
        </AnimatedBackground>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden border-y border-amber-400/20">
        <AnimatedBackground
          images={[
            'https://images.pexels.com/photos/3625600/pexels-photo-3625600.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3625605/pexels-photo-3625605.jpeg?auto=compress&cs=tinysrgb&w=1200',
          ]}
          duration={11}
          overlayOpacity={0.85}
        >
          <div className="max-w-4xl mx-auto text-center relative z-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to Transform Your Vehicle?</h2>
              <p className="text-lg text-gray-300 mb-8">Get in touch with our expert team today for a free consultation.</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2 text-lg rounded-3xl">
                  <Phone size={20} /> CONTACT US NOW
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </AnimatedBackground>
      </section>
    </div>
  );
}
