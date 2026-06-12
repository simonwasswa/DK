import { motion } from 'framer-motion';
import { Zap, Shield, Wrench, Settings, AlertCircle, Gauge, Loader } from 'lucide-react';
import { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';
import FAQItem from '../components/FAQItem';
import AnimatedBackground from '../components/AnimatedBackground';
import BookingModal from '../components/BookingModal';
import { useAPI } from '../hooks/useAPI';

const iconMap: Record<string, JSX.Element> = {
  'Exterior Detailing': <Zap size={24} />,
  'Interior Detailing': <Shield size={24} />,
  'Paint Correction': <Zap size={24} />,
  'Engine Diagnostics': <Shield size={24} />,
  'Electrical Repairs': <Wrench size={24} />,
  'Suspension & Brakes': <Gauge size={24} />,
  'Custom Modifications': <Settings size={24} />,
  'Maintenance & Service': <AlertCircle size={24} />,
};

const faqs = [
  { question: 'How long does a typical detailing service take?', answer: 'A comprehensive detailing service typically takes 4-8 hours depending on the vehicle condition and service level.' },
  { question: 'Are all your services covered by warranty?', answer: 'Yes, all our services come with comprehensive warranties. Paint corrections have a 2-year warranty, detailing services have a 1-year warranty, and mechanical work comes with a 12-month or 12,000-mile warranty.' },
  { question: 'Do you offer mobile detailing services?', answer: 'Yes, we offer mobile detailing services for select service packages. Our mobile units are fully equipped to handle most exterior detailing and maintenance services at your preferred location.' },
  { question: 'What is ceramic coating and why should I get it?', answer: 'Ceramic coating is a liquid polymer that bonds to your car paint, creating a protective layer that lasts up to 3 years.' },
  { question: 'Can you handle exotic car modifications?', answer: 'Absolutely! Our team has extensive experience with exotic and luxury vehicles.' },
  { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, bank transfers, and cash payments. We also offer financing options for larger projects.' },
];

export default function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [bookingModal, setBookingModal] = useState({ isOpen: false, serviceName: '', serviceId: '' });
  const { getServices, loading } = useAPI();

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  const openBooking = (name: string, id: string) => setBookingModal({ isOpen: true, serviceName: name, serviceId: id });
  const closeBooking = () => setBookingModal({ isOpen: false, serviceName: '', serviceId: '' });

  return (
    <div className="bg-slate-900">
      <BookingModal isOpen={bookingModal.isOpen} onClose={closeBooking} serviceName={bookingModal.serviceName} serviceId={bookingModal.serviceId} />

      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <AnimatedBackground
          images={[
            'https://images.pexels.com/photos/3625517/pexels-photo-3625517.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3625629/pexels-photo-3625629.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3587620/pexels-photo-3587620.jpeg?auto=compress&cs=tinysrgb&w=1200',
          ]}
          duration={10}
          overlayOpacity={0.7}
        >
          <div className="max-w-7xl mx-auto text-center relative z-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Our <span className="gradient-text">Services</span></h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">Comprehensive automotive solutions from performance tuning to aesthetic enhancements</p>
            </motion.div>
          </div>
        </AnimatedBackground>
      </section>

      {/* Services Grid — live from Supabase */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader size={40} className="animate-spin text-amber-400" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  icon={iconMap[service.name] || <Zap size={24} />}
                  title={service.name}
                  description={service.description}
                  image={service.image_url || 'https://images.pexels.com/photos/3587620/pexels-photo-3587620.jpeg?auto=compress&cs=tinysrgb&w=600'}
                  priceRange={service.price_range}
                  onBook={() => openBooking(service.name, service.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Process */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <AnimatedBackground
          images={[
            'https://images.pexels.com/photos/3625600/pexels-photo-3625600.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3625585/pexels-photo-3625585.jpeg?auto=compress&cs=tinysrgb&w=1200',
          ]}
          duration={12}
          overlayOpacity={0.75}
        >
          <div className="max-w-7xl mx-auto relative z-20">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-16">
              <span className="text-amber-400 font-bold tracking-widest text-sm">OUR PROCESS</span>
              <h2 className="section-title">How We Work</h2>
              <p className="section-subtitle">A streamlined approach to exceptional results</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: 1, title: 'Consultation', description: 'Discuss your needs and goals with our experts' },
                { step: 2, title: 'Assessment', description: 'Thorough inspection and detailed analysis' },
                { step: 3, title: 'Execution', description: 'Professional implementation of your project' },
                { step: 4, title: 'Delivery', description: 'Quality assurance and customer satisfaction' },
              ].map((item, index) => (
                <motion.div key={index} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.1 }} className="relative">
                  <div className="bg-slate-800/50 border border-amber-400/20 rounded-lg p-6 h-full flex flex-col">
                    <div className="w-12 h-12 bg-amber-400 text-slate-900 rounded-full flex items-center justify-center font-bold text-xl mb-4">{item.step}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                  {index < 3 && <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2"><div className="w-8 h-0.5 bg-gradient-to-r from-amber-400 to-transparent"></div></div>}
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedBackground>
      </section>

      {/* FAQ */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <AnimatedBackground
          images={[
            'https://images.pexels.com/photos/3625605/pexels-photo-3625605.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3625610/pexels-photo-3625610.jpeg?auto=compress&cs=tinysrgb&w=1200',
          ]}
          duration={11}
          overlayOpacity={0.8}
        >
          <div className="max-w-4xl mx-auto relative z-20">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-16">
              <span className="text-amber-400 font-bold tracking-widest text-sm">HAVE QUESTIONS?</span>
              <h2 className="section-title">Frequently Asked Questions</h2>
            </motion.div>
            <div className="bg-slate-800/30 border border-amber-400/20 rounded-lg p-8 backdrop-blur-sm">
              {faqs.map((faq, index) => <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />)}
            </div>
          </div>
        </AnimatedBackground>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden border-y border-amber-400/20">
        <AnimatedBackground
          images={[
            'https://images.pexels.com/photos/3625629/pexels-photo-3625629.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3587620/pexels-photo-3587620.jpeg?auto=compress&cs=tinysrgb&w=1200',
          ]}
          duration={9}
          overlayOpacity={0.85}
        >
          <div className="max-w-4xl mx-auto text-center relative z-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to Get Started?</h2>
              <p className="text-lg text-gray-300 mb-8">Contact our team today for a free consultation and competitive quote</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button onClick={() => openBooking('Service', '')} className="btn-primary inline-flex items-center gap-2 text-lg">
                  SCHEDULE A CONSULTATION
                </button>
              </motion.div>
            </motion.div>
          </div>
        </AnimatedBackground>
      </section>
    </div>
  );
}
